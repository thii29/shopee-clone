import React, { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  //name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //autoComplete?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    onChange,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  console.log(field)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    //NOTE: dieu kien nay dung cho ca chu va so, neu muon input dung cho nhap only so hoac only text thi phai doi dk
    if (numberCondition || type !== 'number') {
      //cap nhat localvalue state
      setLocalValue(valueFromInput)
      //goi field.onchange de cap nhap vao state react hook from
      field.onChange(valueFromInput)
      //thuc thi onchange callback tu ben ngoai truyen vao props
      onChange?.(event)
    }
  }
  return (
    <div>
      <input className={classNameInput} {...rest} {...field} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
