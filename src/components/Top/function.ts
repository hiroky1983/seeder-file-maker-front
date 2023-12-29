import axios from 'axios'
import type { IFormInput } from '@/screens/TopScreen'

export const getSqlSeederPrompt = (
  data: IFormInput,
  appUrl: string | undefined
) => {
  const res = axios.post(
    `${appUrl}/prompt`,
    {
      prompt: data.prompt,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  return res
}
