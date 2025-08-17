---
title: "Arquitectura en el Frontend: mis problemas con Hexagonal (versión simple con React + TypeScript)"
publishedDate: "2025-08-16T16:29:10.000Z"
updatedDate: "2025-08-16T17:09:31.000Z"
pubDate: "2025-08-16T16:29:10.000Z"
description: "Arquitectura hexagonal en frontend sin sobre‑ingeniería: React + TypeScript, dominio como tipos, APIClient, ejemplo de productos y pruebas con MSW."
tags: ["react", "Programación", "development", "webdeveloment", "desarrollo-web", "hexagonal", "arquitectura", "frontend", "front-end", "johnserrano", "typescript"]
primaryTag: { name: 'Arquitectura', slug: 'arquitectura' }
excerpt: "Arquitectura hexagonal en frontend sin sobre‑ingeniería: React + TypeScript, dominio como tipos, APIClient, ejemplo de productos y pruebas con MSW."
canonicalURL: "https://johnserrano.co/blog/arquitectura-hexagonal-react-typescript"
draft: false
featureImage: "https://download.johnserrano.co/architecture-hexagonal.webp"
---

Inspirado por enfoques pragmáticos: menos capas, más claridad. Aquí no seguimos el “purismo” hexagonal; tomamos lo que aporta valor en UI y evitamos sobre-ingeniería.

Objetivo: que alguien que está aprendiendo pueda aplicarlo en 1 tarde.

### Historia de usuario

“Como usuario quiero entrar a la Home y ver un listado de productos con:
- nombre
- imagen
- precio

Tenemos una API que expone /products.”

Pasemos a código.

### Capas (lo justo y necesario)

- Dominio: tipos y reglas (casi siempre son simples en UI).
- Aplicación: casos de uso (orquestan llamadas).
- Infraestructura: HTTP/SDKs, errores, auth.
- UI: componentes React.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sd4xlyyrju5ii3l68ojq.png)

**Nota importante**:
Si el proyecto crece o necesitas intercambiar fuentes de datos, añades un repositorio como puerto. Más abajo verás un ejemplo de cómo sería el funcionamiento y por qué conviene hacerlo en ese momento **(no antes)**.

### Dominio: ¿tipo o clase?

Regla práctica: empieza con tipos. Si luego necesitas comportamiento/validación compleja, refactorizas a clase.

```typescript
// src/core/products/domain/Product.ts
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
};
```

### Infra: un cliente HTTP pequeño (adapter)

Aísla fetch/axios en un único punto. Centralizas errores y auth. Si cambias fetch por axios, solo tocas aquí.

```typescript
// src/core/api-client.ts
export class APIClient {
  constructor(
    private readonly baseURL: string,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.fetchImpl(`${this.baseURL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.fetchImpl(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

### Aplicación: caso de uso mínimo

Empieza simple: sin repositorio. Orquesta la llamada y devuelve dominio directamente.

Hay dos enfoques principales:

**Enfoque 1: Auto-contenido**
```typescript
// src/core/products/application/ListProducts.ts
import type { Product } from "../domain/Product";
import { APIClient } from "../../api-client";

export class ListProducts {
  private readonly apiClient: APIClient

  constructor() {
    this.apiClient = new APIClient()
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.apiClient.get<{ products: Product[] }>('/products')
    return response.products
  }
}
```

**Enfoque 2: Inyección de dependencias**
```typescript
// src/application/ListProductsWithDI.ts
import type { Product } from "../domain/Product";
import { APIClient } from "../infrastructure/APIClient";

export class ListProductsWithDI {
  constructor(private readonly api: APIClient) {}

  async execute(): Promise<Product[]> {
    const response = await this.api.get<{ products: Product[] }>("/products");
    return response.products;
  }
}
```

**¿Cuál elegir?**
- **Auto-contenido**: Más simple para prototipos y casos simples. Menos configuración inicial.
- **Inyección**: Más testeable y flexible. Mejor para casos complejos donde necesitas diferentes configuraciones.

### ¿Qué es un DTO y cuándo usarlo?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fsdg1ufopgooom1j3a85.png)

DTO (Data Transfer Object) es un objeto “de transferencia de datos”. Su objetivo es:
- Formatear o adaptar datos para una capa específica (p. ej., la UI).
- Ocultar detalles del dominio que no quieres exponer.
- Combinar/dividir datos que vienen de distintas fuentes.

Cuándo NO usar DTO:
- Si la UI necesita exactamente los mismos campos del dominio, añadir DTO genera ruido y “capas por capas”.

Cuándo SÍ usar DTO:
- Si necesitas cambiar nombres/formatos (p. ej., price en centavos → cadena “$12.99”).
- Si quieres estabilizar la UI frente a cambios del dominio o de la API.
- Si debes ocultar campos sensibles.

Ejemplo con DTO y mapeo en el caso de uso:

```typescript
// src/application/ProductDTO.ts
export type ProductDTO = {
  title: string;          // mantiene el nombre original
  imageUrl: string;       // renombrado desde thumbnail para la UI
  displayPrice: string;   // precio formateado
};
```

```typescript
// src/application/ListProductsWithDTO.ts
import type { Product } from "../domain/Product";
import type { ProductDTO } from "./ProductDTO";
import { APIClient } from "../infrastructure/APIClient";

export class ListProductsWithDTO {
  private readonly apiClient: APIClient

  constructor() {
    this.apiClient = new APIClient()
  }

  async getProducts(): Promise<ProductDTO[]> {
    const response = await this.apiClient.get<{ products: Product[] }>("/products");
    return response.products.map(p => ({
      title: p.title,
      imageUrl: p.thumbnail,
      displayPrice: `$${p.price.toFixed(2)}`,
    }));
  }
}
```

Idea práctica:
- Empieza sin DTO.
- Si la UI empieza a necesitar transformaciones repetidas, crea un DTO y mueve la transformación al caso de uso.

### UI: un componente que llama al caso de uso

Mantén la UI enfocada en presentar datos y gestionar estado/errores.

```tsx
// src/components/products/products-list.tsx
import React, { useEffect, useState } from "react";
import type { Product } from "../../core/products/domain/Product";
import { ListProducts } from "../../core/products/application/ListProducts";

const listProducts = new ListProducts();

export const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listProducts.getProducts();
        if (mounted) setProducts(data.slice(0, 2)); // Solo mostrar 2 productos
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "No se pudo cargar productos");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div>
      <h1>
        Lista de productos ({products.length} productos encontrados)
      </h1>
      <ul>
        {products.map((product, index) => (
          <li key={product.title} data-testid={'product-id-' + index}>
            <div>
              <img src={product.thumbnail} alt={product.title} width={80} height={80} />
              <h3>{product.title}</h3>
              <p>Precio: ${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### ¿Cuándo añadir repositorios (puertos) “hexagonales”?

Añádelos cuando:
- necesites más de una fuente de datos (REST, GraphQL, IndexedDB, memoria),
- quieras desacoplarte fuertemente del backend,
- o quieras tests de aplicación ultra rápidos sin MSW.

**Recuerda la nota de arriba**: “Si el proyecto crece o necesitas intercambiar fuentes de datos, añades un repositorio como puerto.” Aquí abajo verás un ejemplo de cómo sería el funcionamiento.

## Puerto de repositorio (dominio)

```typescript
// src/core/products/domain/ProductRepository.ts
import type { Product } from "./Product";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}
```

## Implementación HTTP del repositorio (infra)

```typescript
// src/infrastructure/HttpProductRepository.ts
import type { Product } from "../core/products/domain/Product";
import type { ProductRepository } from "../core/products/domain/ProductRepository";
import { APIClient } from "../core/api-client";

export class HttpProductRepository implements ProductRepository {
  constructor(private readonly api: APIClient) {}
  
  async getProducts(): Promise<Product[]> {
    const response = await this.api.get<{ products: Product[] }>("/products");
    return response.products;
  }
}
```

## Caso de uso usando el puerto (aplicación)

```typescript
// src/application/ListProductsWithRepo.ts
import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class ListProductsWithRepo {
  constructor(private readonly repo: ProductRepository) {}
  
  async getProducts(): Promise<Product[]> {
    // Si solo delega, cuestiónate si esta capa aporta valor (Middle Man).
    return this.repo.getProducts();
  }
}
```

## Composición (decides la fuente en un único lugar)

```typescript
// src/app/composition.ts
import { APIClient } from "../core/api-client";
import { HttpProductRepository } from "../infrastructure/HttpProductRepository";
import { ListProductsWithRepo } from "../application/ListProductsWithRepo";

const api = new APIClient();
const repo = new HttpProductRepository(api);

// Si quisieras memoria, bastaría con cambiar la implementación del puerto:
// const repo = new InMemoryProductRepository([{ title: "A", thumbnail: "/a.png", price: 10 }]);

export const listProducts = new ListProductsWithRepo(repo);
```

Cómo funciona en la práctica:
- La UI usa listProducts.getProducts().
- Si mañana cambias de REST a GraphQL o a IndexedDB, implementas otro repositorio y no tocas ni UI ni casos de uso (salvo wiring).

### (Mis) Problemas con ejemplos

## No hay suficiente complejidad de dominio

Si tu caso es casi-CRUD y el reto principal está en la UX/estado, no en reglas de negocio, muchas capas añaden fricción sin beneficio.

Ejemplo suficiente para empezar:
```typescript
// src/core/products/application/ListProducts.ts
import type { Product } from "../domain/Product";
import { APIClient } from "../../api-client";

export class ListProducts {
  private readonly apiClient: APIClient

  constructor() {
    this.apiClient = new APIClient()
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.apiClient.get<{ products: Product[] }>('/products')
    return response.products
  }
}
```
- Simple, testeable (stub de APIClient o MSW) y sin “capas por capas”.
- Cuando aparezca complejidad real (paginación, filtros, cacheo, merge de fuentes), puedes introducir repositorios y casos de uso más ricos.

---

## Interfaces inútiles

Crear interfaces “por si acaso” suele ser ruido. La regla práctica:
- Crea una interfaz si y solo si:
  - tendrás 2+ implementaciones, o
  - buscas desacoplarte del backend/cliente HTTP.

Anti‑ejemplo con una interfaz sin valor:
```typescript
// src/domain/UselessProductRepo.ts
import type { Product } from "./Product";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}

// Única implementación y uso en un solo lugar -> poco valor
export class HttpProductRepository implements ProductRepository {
  getProducts(): Promise<Product[]> {
    return fetch("/products").then(r => r.json());
  }
}
```

Alternativa más simple:
```typescript
// src/application/ListProductsSimple.ts
import type { Product } from "../domain/Product";
import { APIClient } from "../infrastructure/APIClient";

export class ListProductsSimple {
  constructor(private readonly api: APIClient) {}
  
  async execute(): Promise<Product[]> {
    const response = await this.api.get<{ products: Product[] }>("/products");
    return response.products;
  }
}
```

---

## Capas estrictas: tipos de retorno y “Middle Man”

- DTO vs Dominio: si Product y ProductDTO tienen los mismos campos, el DTO no aporta valor.
- “Middle Man”: un caso de uso que solo delega al repositorio sin añadir semántica es un code smell.

Anti‑ejemplo (Middle Man):
```typescript
// src/application/ListProductsMiddleMan.ts
import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class ListProductsMiddleMan {
  constructor(private readonly repo: ProductRepository) {}
  execute(): Promise<Product[]> {
    // Indirección sin abstracción: no aporta nada.
    return this.repo.getProducts();
  }
}
```

Cómo aportar valor real en la capa de aplicación:
```typescript
// src/application/ListProductsEnriched.ts
import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class ListProductsEnriched {
  constructor(private readonly repo: ProductRepository) {}
  async execute(query?: { minPrice?: number; sort?: "asc" | "desc" }): Promise<Product[]> {
    let products = await this.repo.getProducts();

    if (query?.minPrice != null) {
      products = products.filter(p => p.price >= query.minPrice!);
    }
    if (query?.sort) {
      products = products.sort((a, b) => query.sort === "asc" ? a.price - b.price : b.price - a.price);
    }
    return products;
  }
}
```

DTO solo cuando transforme algo:
```typescript
// src/application/ListProductsToDTO.ts
import type { Product } from "../domain/Product";
import type { ProductDTO } from "./ProductDTO";
import type { ProductRepository } from "../domain/ProductRepository";

export class ListProductsToDTO {
  constructor(private readonly repo: ProductRepository) {}
  async execute(): Promise<ProductDTO[]> {
    const products = await this.repo.getProducts();
    return products.map(p => ({ 
      title: p.title, 
      imageUrl: p.thumbnail, 
      displayPrice: `$${p.price.toFixed(2)}` 
    }));
  }
}
```

Pros de “saltar capas”:
- Menos indirection.
- Código más fácil de seguir.
Contras:
- Requiere criterio para no perder consistencia.

---

## Repositorios en frontend: cuándo sobran y cómo simplificar

Muchas veces:
- hay una sola fuente (tu API),
- queries simples,
- y el repositorio se usa en un solo punto.

En esos casos, puedes ir directo con un APIClient y mantener testabilidad.

Anti‑ejemplo importando axios en la aplicación:
```typescript
// src/application/ListProductsAxiosInline.ts
import type { Product } from "../domain/Product";
import axios from "axios";

export class ListProductsAxiosInline {
  async execute(): Promise<Product[]> {
    const res = await axios.get<{ products: Product[] }>(`https://dummyjson.com/products`);
    return res.data.products;
  }
}
// Funciona, pero mezclas infraestructura (axios) en aplicación.
```

Mejor: encapsula axios en un adapter y centraliza errores.
```typescript
// src/infrastructure/APIClientAxios.ts
import axios, { AxiosError } from "axios";

export class NotFoundError extends Error {}
export class ApiError extends Error {}

export class APIClientAxios {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    try {
      const res = await axios.get<T>(`${this.baseUrl}${path}`);
      return res.data;
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 404) throw new NotFoundError("Recurso no encontrado");
      throw new ApiError(err.message);
    }
  }

  // more methods: post, put, delete...
}
```

Caso de uso usando el adapter:
```typescript
// src/application/ListProductsWithAPIClientAxios.ts
import type { Product } from "../domain/Product";
import { APIClientAxios } from "../infrastructure/APIClientAxios";

export class ListProductsWithAPIClientAxios {
  constructor(private readonly api: APIClientAxios) {}
  async execute(): Promise<Product[]> {
    const response = await this.api.get<{ products: Product[] }>("/products");
    return response.products;
  }
}
```

Ir “al límite”: instanciar internamente el cliente.
```typescript
// src/application/ProductListSelfContained.ts
import type { Product } from "../domain/Product";
import { APIClientAxios } from "../infrastructure/APIClientAxios";

export class ProductListSelfContained {
  private api = new APIClientAxios(import.meta.env.VITE_API_URL ?? "https://api.example.com");

  execute(): Promise<Product[]> {
    return this.api.get<Product[]>("/products");
  }
}
// Ojo: dependencia oculta -> más difícil de testear y de cambiar en composición.
```

Testing cuando no hay repos:
- Opción A (recomendada): tests sociables con MSW sobre la UI (sección “Testing” al final).
- Opción B: stub del adapter en tests de aplicación.

```typescript 
// src/application/__tests__/ListProductsWithAPIClientAxios.spec.ts
import type { Product } from "../../domain/Product";
import { ListProductsWithAPIClientAxios } from "../ListProductsWithAPIClientAxios";

class FakeAPI {
  constructor(private readonly data: { products: Product[] }) {}
  async get<T>(_path: string): Promise<T> {
    return this.data as unknown as T;
  }
}

test("devuelve productos desde el adapter", async () => {
  const fake = new FakeAPI({ 
    products: [{ title: "A", thumbnail: "/a.png", price: 10 } as Product] 
  });
  const usecase = new ListProductsWithAPIClientAxios(fake as any);
  const result = await usecase.execute();
  expect(result).toHaveLength(1);
});
```

Si más adelante necesitas intercambiar fuentes (REST/IndexedDB/memoria), entonces sí: introduce el puerto ProductRepository y obtendrás tests de aplicación ultrarrápidos con una implementación en memoria.

### Testing

Aplicando hexagonal junto al patrón repositorio te permite crear tests unitarios que cumplan con el acrónimo FIRST:
- Fast: rápidos para obtener feedback veloz.
- Isolated: aislados de DB/red.
- Repeatable: mismo resultado siempre.
- Self-validating: se validan solos (asserts claros).
- Timely: idealmente antes de desarrollar (TDD).

Con el enfoque simplificado propuesto, así cumplo gran parte:

Tipos de tests (filosofía):
- “Write tests. Not too many. Mostly integration” (Kent C. Dodds).
- Yo lo adapto a: “Write tests, mostly sociable tests”.
  - En esta historia de usuario, prefiero tests sociables de UI con un servidor HTTP simulado que devuelva respuestas predefinidas.

Trade-off:
- Al levantar un servidor HTTP simulado, quizá pierdas algo de “F” (velocidad). Lo asumo porque el test es más representativo.

Herramienta:
- MSW (Mock Service Worker): mokea a nivel de red, no tu código.

Cómo testear esta funcionalidad:
- Omito unitarios “puros” de aplicación si no hay lógica (evito tests que solo replican una llamada).
- Escribo tests de UI que cubren el flujo principal y el de error, falseando la API con MSW.
- Para mayor seguridad antes de desplegar: tests E2E happy path en pre con Playwright.

Ejemplo con MSW:

```typescript
// src/tests/App.test.tsx
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import React from "react";
import { ProductsList } from "../components/products/products-list";

const apiUrl = "https://dummyjson.com/products";
const server = setupServer(
  http.get(`${apiUrl}/products`, () =>
    HttpResponse.json({
      products: [
        { title: "Essence Mascara Lash Princess", thumbnail: "/img0.png", price: 10 },
        { title: "Eyeshadow Palette with Mirror", thumbnail: "/img1.png", price: 15 },
      ]
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("muestra productos al cargar", async () => {
  render(<ProductsList />);
  const items = await screen.findAllByTestId(/product-id-\d+/);
  expect(items).toHaveLength(2);
  expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
  expect(screen.getByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();
});

test("muestra error si la API falla", async () => {
  server.use(http.get(`${apiUrl}/products`, () => HttpResponse.error()));
  render(<ProductsList />);
  const error = await screen.findByText(/No se pudo cargar productos|HTTP Error/);
  expect(error).toBeInTheDocument();
});
```

E2E con Playwright (idea, sin código extenso):
- Crea un test “happy path” que:
  - visita la Home deployada en pre,
  - espera ver el listado real,
  - verifica al menos 1–2 productos.
- Úsalo como smoke test en cada release.

### Screaming Architecture (mini abrebocas)

Que el repo “grite” el dominio. En vez de “components/services/utils”, prefiere por feature:

- src/core/products/domain/Product.ts
- src/core/products/application/ListProducts.ts
- src/core/api-client.ts
- src/components/products/products-list.tsx

Cuando la app crezca, separa por features (products, cart, auth) manteniendo esta idea.

En próximos artículos voy a traer uno sobre Screaming Architecture.

### Checklist para aplicarlo hoy

- Define tipos de dominio (Product).
- Crea un APIClient pequeño para HTTP.
- Escribe 1 caso de uso (ListProducts) que use el APIClient.
- Implementa la HomePage que llama al caso de uso.
- Solo si lo necesitas, añade un ProductRepository y su implementación HTTP (ver ejemplo de funcionamiento arriba).
- Añade tests (lee la sección final “Testing” para decidir qué y cómo probar).

### Conclusión
- Ponemos en el centro el dominio (si lo hay), pero priorizamos simplicidad: no siempre necesitas capas intermedias entre lógica de aplicación, fuente de datos y UI.
- Testea donde más valor aporta: UI sociable con MSW y un E2E de humo con Playwright. Si el dominio crece, añade repositorios y tests unitarios rápidos en memoria.

Puedes encontrar el código completo del ejemplo en [GitHub](https://github.com/johnsi15/tutoriales/tree/main/ia-engineer-context/example-react).

### Glosario (términos clave)

## Middle Man (code smell)
- Qué es: un “intermediario” que solo pasa la llamada a otra capa/objeto sin añadir valor (sin validar, transformar, decidir, ni encapsular reglas). Es “indirección sin abstracción”.
- Por qué es problema: añade complejidad y archivos extra, dificulta navegar el código y no aporta semántica.
- Cómo detectarlo:
  - La clase/método solo delega 1:1 a otra llamada.
  - No hay lógica de negocio, ni transformación de datos, ni control de errores propio.
  - Si lo eliminas y llamas directamente a la dependencia, nada cambia (salvo menos líneas).
- Ejemplo:
```typescript
// src/application/ListProductsMiddleMan.ts
import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export class ListProductsMiddleMan {
  constructor(private readonly repo: ProductRepository) {}
  execute(): Promise<Product[]> {
    return this.repo.getProducts();
  }
}
```
- Alternativas:
  - Eliminar la capa y usar directamente la dependencia.
  - O bien justificarla añadiendo valor (filtrados, orden, mapeos, políticas de reintento, validaciones, etc.).

## E2E de humo (smoke test)
- Qué es: un test end-to-end mínimo y rápido que verifica el camino feliz crítico (la app arranca y la funcionalidad principal no “echa humo” tras un deploy).
- Objetivo: detectar roturas graves en producción o pre-producción con el menor coste.
- Alcance típico:
  - Cargar la Home sin errores.
  - Ver que se lista al menos un producto.
  - Opcional: una interacción clave.
- Cuándo ejecutarlo: en cada build de pre o antes de un deploy (pipeline de CD).
- Relación con otros tests:
  - Complementa a los tests de UI con MSW (rápidos y representativos en local/CI).
  - No reemplaza tests unitarios donde haya lógica compleja: si el dominio crece, añádelos.


