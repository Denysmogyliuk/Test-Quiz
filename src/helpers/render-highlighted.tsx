type Options = {
  tag?: React.ElementType
  className?: string
}

export const renderHighlighted = (
  input: string,
  options: Options = {}
): React.ReactNode => {
  const { tag = 'strong', className } = options

  if (!input || typeof input !== 'string') return input

  const regex = /<([^<>]+)>/g
  const result: React.ReactNode[] = []
  let lastIndex = 0
  let index = 0

  for (const match of input.matchAll(regex)) {
    const start = match.index ?? 0
    const full = match[0]
    const content = match[1]

    if (start > lastIndex) {
      result.push(input.slice(lastIndex, start))
    }

    const Tag = tag as React.ElementType
    result.push(
      <Tag key={`hl-${index++}`} className={className}>
        {content}
      </Tag>
    )

    lastIndex = start + full.length
  }

  if (result.length === 0) return input
  if (lastIndex < input.length) {
    result.push(input.slice(lastIndex))
  }

  return result
}
