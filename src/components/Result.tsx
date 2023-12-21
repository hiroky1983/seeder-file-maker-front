'use client'

type Props = {
  prompt: string
}

export const Result = (props: Props) => {
  const { prompt } = props

  return (
    <div className="gap-3 w-full" data-testid="result-component">
      <div className="px-4 py-12 gap-4 bg-gray-600">
        <p>result</p>
        <pre className="bg-gray-800 p-4">
          <code lang="go" className="whitespace-pre-wrap">
            {prompt}
          </code>
        </pre>
      </div>
    </div>
  )
}
