// TopScreen.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import TopScreen from './TopScreen'
import '@testing-library/jest-dom'

describe('TopScreen コンポーネント', () => {
  test('正しくレンダリングされる', () => {
    render(
      <RecoilRoot>
        <TopScreen />
      </RecoilRoot>
    )

    // Top コンポーネントがレンダリングされるか
    expect(screen.getByTestId('top-component')).toBeInTheDocument()

    // Result コンポーネントがレンダリングされるか
    expect(screen.getByTestId('result-component')).toBeInTheDocument()

    // GoogleAd コンポーネントがレンダリングされるか
    expect(screen.getByTestId('googlead-component')).toBeInTheDocument()
  })
})

describe('TopScreen コンポーネント', () => {
  test('初期状態でプロンプトが空であること', () => {
    const { getByPlaceholderText } = render(
      <RecoilRoot>
        <TopScreen />
      </RecoilRoot>
    )
    const textarea = getByPlaceholderText(
      'CREATE TABLE "todos" ( "todo_id" varchar PRIMARY KEY, "title" varchar NOT NULL, "contents" varchar NOT NULL )'
    ) as HTMLTextAreaElement
    expect(textarea.value).toBe('')
  })

  test('テキストエリアに入力するとプロンプトの状態が更新されること', () => {
    const { getByPlaceholderText } = render(
      <RecoilRoot>
        <TopScreen />
      </RecoilRoot>
    )
    const textarea = getByPlaceholderText(
      'CREATE TABLE "todos" ( "todo_id" varchar PRIMARY KEY, "title" varchar NOT NULL, "contents" varchar NOT NULL )'
    ) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '新しいプロンプト' } })
    expect(textarea.value).toBe('新しいプロンプト')
  })
})
