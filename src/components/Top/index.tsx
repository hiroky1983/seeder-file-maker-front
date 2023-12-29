'use client'

import { isAxiosError } from 'axios'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'
import type { IFormInput } from '@/screens/TopScreen'
import { getSqlSeederPrompt } from './function'

const isLoadingState = atom({
  key: 'isLoading',
  default: false,
})

const errorState = atom({
  key: 'error',
  default: '',
})

export const Top = (props: IFormInput) => {
  const { setPrompt } = props
  const { register, handleSubmit } = useForm<IFormInput>()
  const [isLoading, setisLoading] = useRecoilState(isLoadingState)
  const [error, setError] = useRecoilState(errorState)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setisLoading(true)
      setError('')
      const res = await getSqlSeederPrompt(data, appUrl)

      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      const resData = res.data
      setPrompt(resData.prompt)
      setisLoading(false)
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setError(error.response.data.message)
        setisLoading(false)
      }
    }
  }

  return (
    <div className="max-w-1/2" data-testid="top-component">
      <h1>seederファイルメーカー</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col px-4 py-12 gap-4 bg-gray-600">
          <label>migrationの内容を入力してください</label>
          <textarea
            {...register('prompt', { required: true })}
            className="text-gray-800 p-2 rounded-md resize-none"
            placeholder='CREATE TABLE "todos" (
              "todo_id" varchar PRIMARY KEY,
              "title" varchar NOT NULL,
              "contents" varchar NOT NULL
            )'
            rows={15}
          />
          <input
            className="rounded-md bg-lime-500 px-4 py-2 hover:opacity-80 cursor-pointer"
            disabled={isLoading}
            value={isLoading ? 'loading...' : '送信'}
            type="submit"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
