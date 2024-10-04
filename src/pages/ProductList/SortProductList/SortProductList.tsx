export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo:</div>
          <button className='h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center'>
            Phổ biến
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-orange/40 text-center'>
            Mới nhất
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-orange/40 text-center'>
            Bán chạy
          </button>
          <select name='' id='' defaultValue='' className='h-8 px-4 capitalize bg-white text-black min-w-[180px] outline-none'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá từ thấp đến cao</option>
            <option value='price:desc'>Giá từ cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm mr-0.5'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path
                  fillRule='evenodd'
                  d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 cursor-not-allowed shadow-sm mr-1'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path
                  fillRule='evenodd'
                  d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
