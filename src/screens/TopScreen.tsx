'use client'

import { Result } from '@/components/Result'
import { Top } from '@/components/Top'
import { GoogleAdScript } from '@/components/googleads-script'
import { SetterOrUpdater, atom, useRecoilState } from 'recoil'

export type IFormInput = {
  prompt: string
  setPrompt: SetterOrUpdater<string>
}

const FormInput = atom({
  key: 'prompt',
  default: '',
})

export default function TopScreen() {
  const [prompt, setPrompt] = useRecoilState(FormInput)
  return (
    <div className="flex flex-col gap-4 w-full">
      <Top prompt={prompt} setPrompt={setPrompt} />
      <Result prompt={prompt} />
      <GoogleAdScript />
    </div>
  )
}