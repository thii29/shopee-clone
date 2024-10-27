import React, { forwardRef, useState } from 'react'
import { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  //name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //autoComplete?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value='',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState(value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //thuc thi onchange callback tu ben ngoai truyen vao props
      onChange?.(event)
      //cap nhat localvalue state
      setLocalValue(value)
    }
  }
  return (
    <div>
      <input className={classNameInput} {...rest} value={value || localValue} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
