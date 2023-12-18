'use client'

import type { IFormInput } from '@/screens/TopScreen'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoad(true)
      const res = await axios.post('http://localhost:8080/prompt', {
        prompt: data.prompt,
      })

      // error handling
      if (res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      const resData = await res.data
      setPrompt(resData.prompt)
      setLoad(false)
    } catch (e) {
      console.log(e)
      setLoad(false)
    }
  }

  return (
    <div className="gap-3 w-full">
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
