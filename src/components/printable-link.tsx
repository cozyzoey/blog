import { ReactNode } from 'react'

export default function ({
  href,
  displayName,
  ...props
}: {
  href: string
  displayName: ReactNode
} & JSX.IntrinsicElements['a']) {
  return (
    <a
      href={href}
      target='_blank'
      {...props}
      className='inline-flex items-center'
    >
      <span className='underline'>{displayName}</span>
      <span className='hidden print:block'>({href})</span>
    </a>
  )
}
