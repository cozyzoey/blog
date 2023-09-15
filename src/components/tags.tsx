import clsx from 'clsx'
import { ReactNode } from 'react'

export default function ({
  tags,
  className,
  ...props
}: {
  tags: ReactNode[]
  className?: string
}) {
  return (
    <ul className={clsx('flex gap-1.5 flex-wrap', className)} {...props}>
      {tags.map((tag, idx) => (
        <li
          key={idx}
          className='text-base py-0.5 px-2 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
