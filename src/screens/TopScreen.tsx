'use client'

import { Result } from '@/components/Result'
import { Top } from '@/components/Top'
import GoogleAd from '@/components/googlead'
import { SetterOrUpdater, atom, useRecoilState } from 'recoil'

export type IFormInput = {
  prompt: string
  setPrompt: SetterOrUpdater<string>
}

const formInput = atom({
  key: 'prompt',
  default: '',
})

export default function TopScreen() {
  const [prompt, setPrompt] = useRecoilState(formInput)
  return (
    <div className="flex flex-col gap-4 w-full">
      <Top prompt={prompt} setPrompt={setPrompt} />
      <Result prompt={prompt} />
      <GoogleAd slot="1869410932032409" />
    </div>
  )
}
