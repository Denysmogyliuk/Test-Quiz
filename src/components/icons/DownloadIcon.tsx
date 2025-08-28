import React from 'react'

type SvgProps = React.SVGProps<SVGSVGElement>

const DownloadIcon: React.FC<SvgProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    focusable={false}
    {...props}
  >
    <path d="M12 3.75a.75.75 0 01.75.75v8.19l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V4.5A.75.75 0 0112 3.75z" />
    <path d="M3.75 18a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-1.5a.75.75 0 00-1.5 0v1.5c0 .414-.336.75-.75.75h-12a.75.75 0 01-.75-.75v-1.5a.75.75 0 00-1.5 0V18z" />
  </svg>
)

export default DownloadIcon
