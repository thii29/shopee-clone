import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({onChange}:Props) {
  const fileInput = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromlocal = event.target.files?.[0]
    if (fileFromlocal && (fileFromlocal.size >= config.maxSideUploadAvatar || !fileFromlocal.type.includes('image'))) {
      toast.error('File không đúng định dạng được quy định', {
        position: 'top-center'
      })
    } else {
      onChange?.(fileFromlocal)
    }
  }

  const handleUpload = () => {
    fileInput.current?.click()
  }
  return (
    <Fragment>
      <input
        type='file'
        name=''
        id=''
        accept='.jpg, .jpeg, .png'
        className='hidden'
        ref={fileInput}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white text-sm px-6 text-gray-600 shadow-sm hover:border-orange'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
