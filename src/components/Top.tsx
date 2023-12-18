'use client'

import type { IFormInput } from '@/screens/TopScreen'
import { SubmitHandler, useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'

const isLoading = atom({
  key: 'isLoading',
  default: false,
})

export const Top = (props: IFormInput) => {
  const { setPrompt } = props
  const { register, handleSubmit } = useForm<IFormInput>()
  const [load, setLoad] = useRecoilState(isLoading)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // TODO: URLを環境変数にする
    setLoad(true)
    const res = await fetch('http://localhost:8080/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.prompt),
    })
    const resData: IFormInput = await res.json()
    setPrompt(resData.prompt)
    setLoad(false)
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
            rows={10}
          />
          <input
            className="rounded-md bg-lime-500 px-4 py-2 hover:opacity-80 cursor-pointer"
            disabled={load}
            name="submit"
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}
