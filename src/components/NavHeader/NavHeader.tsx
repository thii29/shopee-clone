import { Link } from "react-router-dom";
import Popover from "../Popover ";
import { useContext } from "react";
import path from "src/constants/path";
import { AppContext } from "src/contexts/app.context";
import authApi from "src/api/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseStatus } from "src/constants/purchase";
import { getAvatarURL } from "src/utils/utils";

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { mutate: requestLogout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({queryKey: ['purchases', {status: purchaseStatus.inCart}]})
    }
  })

  const handleLogout = () => {
    requestLogout()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-white/70 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 px-3'>
              <button className='py-2 px-3 hover:text-orange'>Vietnamese</button>
              <button className='py-2 px-3 hover:text-orange'>English</button>
            </div>
          </div>
        }
      >
        <div className='flex items-center py-1 hover:text-white/70 cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <div className='mx-1'>English</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex items-center py-2 hover:text-gray-300 cursor-pointer ml-4'
          renderPopover={
            <div className='bg-white shadow-md rounded-sm border border-gray-200'>
              <Link to={path.profile} className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                My account
              </Link>
              <Link to='/' className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                My purchase
              </Link>
              <button
                onClick={handleLogout}
                className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'
              >
                Logout
              </button>
            </div>
          }
        >
          <div className='w-5 h-5 flex-shrink-0'>
            <img
              src={getAvatarURL(profile?.avatar)}
              alt='avatar'
              className='w-ful h-full object-cover rounded-full'
            />
          </div>
          <div className='ml-2'>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Register
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Login
          </Link>
        </div>
      )}
    </div>
  )
}
