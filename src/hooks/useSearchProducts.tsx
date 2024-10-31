import useQueryConfig from "./useQueryConfig"
import { createSearchParams, URLSearchParamsInit, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Schema, schema as searchSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import path from "src/constants/path"

type FormData = Pick<Schema, 'name'>

const nameSchema = searchSchema.pick(['name'])
export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config as URLSearchParamsInit).toString()
    })
  })
  return {onSubmitSearch, register}
}
