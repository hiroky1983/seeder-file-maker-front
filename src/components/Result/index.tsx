'use client'
import { TbCopy, TbCheck } from 'react-icons/tb'
import { atom, useRecoilState } from 'recoil'
import { copyText } from './function'

type Props = {
  prompt: string
}

const isCopiedState = atom({
  key: 'isCopied',
  default: false,
})

export const Result = (props: Props) => {
  const { prompt } = props
  const [isCopied, setIsCopied] = useRecoilState(isCopiedState)

  const onClickCopy = () => {
    // 2秒間コピーしたことを表示する
    setIsCopied(true)
    copyText(prompt)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className="gap-3 w-full" data-testid="result-component">
      <div className="px-4 py-12 gap-4 bg-gray-600">
        <p>result</p>
        <pre className="bg-gray-800 p-4">
          <code lang="go" className="whitespace-pre-wrap text-right">
            {prompt && (
              <span onClick={onClickCopy} className="text-cyan-400">
                {isCopied ? <TbCheck /> : <TbCopy />}
              </span>
            )}
            {prompt}
          </code>
        </pre>
      </div>
    </div>
  )
}
