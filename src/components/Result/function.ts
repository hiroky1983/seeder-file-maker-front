export const copyText = async (prompt: string) => {
  await navigator.clipboard.writeText(prompt)
}
