import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'

export default function SiderBarFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-semibold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='size-6 mr-2'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        All categories
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='size-4 absolute fill-orange top-1 left-[-10px]'
            >
              <path
                fillRule='evenodd'
                d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='relative px-2  '>
            Áo khoác
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='relative px-2  '>
            Áo vest và blazer
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='relative px-2  '>
            Quần jeans
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='relative px-2  '>
            Quần dài
          </Link>
        </li>
      </ul>

      {/* /*Filter*/}
      <Link to={path.home} className='flex items-center font-semibold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='size-4 mr-1 fill-current'
        >
          <path
            fillRule='evenodd'
            d='M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z'
            clipRule='evenodd'
          />
        </svg>
        BỘ LỌC TÌM KIẾM
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div>Khoản giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='From vnd'
              classNameInput='p-1 w-full text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='To vnd'
              classNameInput='p-1 w-full text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center '>
            Apply
          </Button>
        </form>
      </div>
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='size-5 fill-yellow-400 mr-1'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>

        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='size-5 fill-yellow-400 mr-1'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center '>
        Xoá tất cả
      </Button>
    </div>
  )
}
