import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function SelectDate({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 1,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange?.(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-wrap mt-2'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh:</div>
      <div className='w-[80%] pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            name='date'
          >
            <option value={value?.getDate() || date.date}>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            name='month'
          >
            <option value={value?.getMonth() || date.month}>Tháng</option>
            {range(1, 13).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            name='year'
          >
            <option value={value?.getFullYear() || date.year}>Năm</option>
            {range(1990, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}
