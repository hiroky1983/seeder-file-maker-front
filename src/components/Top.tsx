'use client'

import axios, { isAxiosError } from 'axios'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'
import type { IFormInput } from '@/screens/TopScreen'

const isLoading = atom({
  key: 'isLoading',
  default: false,
})

const error = atom({
  key: 'error',
  default: '',
})

export const Top = (props: IFormInput) => {
  const { setPrompt } = props
  const { register, handleSubmit } = useForm<IFormInput>()
  const [load, setLoad] = useRecoilState(isLoading)
  const [err, setErr] = useRecoilState(error)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoad(true)
      setErr('')
      const res = await axios.post(
        `${appUrl}/prompt`,
        {
          prompt: data.prompt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      // error handling
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      const resData = await res.data
      setPrompt(resData.prompt)
      setLoad(false)
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        console.log(error.response.data)
        setErr(error.response.data.message)
        setLoad(false)
      }
    }
  }

  return (
    <div className="gap-3 w-full" data-testid="top-component">
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
            disabled={load}
            value={load ? 'loading...' : '送信'}
            type="submit"
          />
        </div>
        {err && <p className="text-red-500">{err}</p>}
      </form>
    </div>
  )
}
