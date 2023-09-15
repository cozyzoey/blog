import dayjs from 'dayjs'
import { ReactNode } from 'react'

import ContentRenderer, { ContentRendererProps } from './content-renderer'

export default function ({
  content,
  date,
  contentComponent,
  tags,
  title,
}: {
  content: ReactNode
  date: string
  contentComponent?: ({ content }: ContentRendererProps) => JSX.Element
  tags: ReadonlyArray<string | null>
  title: string
}) {
  const ContentComponent = contentComponent || ContentRenderer
  return (
    <div className='center-content'>
      <section className='text-center'>
        <div className='text-xl font-light mb-3 text-slate-500 dark:text-slate-300'>
          <time>{dayjs(date).format('MMM D, YYYY')}</time>
          {tags && <> &mdash; {tags.join(', ')}</>}
        </div>
        <h1 className='text-4xl font-bold mb-20 dark:text-white'>{title}</h1>
      </section>
      <ContentComponent content={content} />
    </div>
  )
}
