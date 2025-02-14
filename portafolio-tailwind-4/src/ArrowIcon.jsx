export function ArrowIcon() {
  return (
    <div
      className='absolute right-6 top-6 scale-0 opacity-0 transition duration-75 ease-out group-hover:scale-100 group-hover:opacity-100'
      aria-hidden='true'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='hi-solid hi-arrow-small-right inline-block size-6'
      >
        <path
          fillRule='evenodd'
          d='M3.75 12a.75.75 0 0 1 .75-.75h13.19l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H4.5a.75.75 0 0 1-.75-.75Z'
          clipRule='evenodd'
        />
      </svg>
    </div>
  )
}
