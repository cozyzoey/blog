import { ReactNode } from 'react'

export interface ContentRendererProps {
  content: ReactNode
}

const prose =
  'prose prose-lg max-w-none prose-slate prose-code:before:hidden prose-code:after:hidden'

export default function ({ content }: ContentRendererProps) {
  return <div className={prose}>{content}</div>
}

export const HTMLContentRenderer = ({ content }: ContentRendererProps) => (
  <div
    className={prose}
    dangerouslySetInnerHTML={{ __html: content as string }}
  />
)
