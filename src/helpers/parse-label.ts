export const parseLabel = (label: string) => {
  const emojiMatch = label.match(
    /^(?:\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*)/u
  )
  const emoji = emojiMatch?.[0] || ''
  const text = emoji ? label.slice(emoji.length).trim() : label
  return { emoji, text }
}
