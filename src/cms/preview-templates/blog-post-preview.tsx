import BlogPostTemplate from '../../components/blog-post-template'

export default function BlogPostPreview({
  entry,
  widgetFor,
}: {
  entry: any
  widgetFor: (name: any) => JSX.Element | null
}) {
  const data = entry.getIn(['data']).toJS()
  return (
    <div className='py-12 px-6'>
      <BlogPostTemplate
        content={widgetFor('body') ?? <></>}
        date={new Date(data.date).toLocaleDateString()}
        tags={data.tags}
        title={data.title}
      />
    </div>
  )
}
