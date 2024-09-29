import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeHolder?: string
  className?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({ type, errorMessage, placeHolder, className, name, register, rules, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeHolder}
        id=''
        {...register(name, rules)}
        className='p-3 w-full outline-none border border-gray-300
                focus:border-gray-500 rounded-sm focus:shadow-sm'
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
