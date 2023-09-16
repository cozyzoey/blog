import Tags from 'components/tags'
import { Link } from 'gatsby'
import { HTMLAttributes } from 'react'

export default function ({
  img,
  slug,
  title,
  desc,
  date,
  tags,
  ...props
}: {
  img: string
  slug: string
  title: string
  desc: string
  date: string
  tags: ReadonlyArray<string | null>
} & HTMLAttributes<HTMLLIElement>) {
  return (
    <li className='w-full flex gap-x-4' {...props}>
      <div className='flex-grow'>
        <Link to={slug} className='block mb-2'>
          <h2 className='text-xl font-bold line-clamp-1 mb-1'>{title}</h2>
          <h3 className='text-md text-slate-700 line-clamp-2 dark:text-slate-200'>
            {desc}
          </h3>
        </Link>
        <div className='flex items-center gap-1 flex-wrap'>
          <time className='text-md block text-slate-500 dark:text-slate-200'>
            {date}
          </time>
          &middot;
          <Tags tags={tags.filter((tag) => tag !== null)} />
        </div>
      </div>

      <Link to={slug} className='hidden md:block md:w-[180px] md:flex-shrink-0'>
        <img
          src={img}
          className='w-full rounded-lg aspect-[3/2] object-cover'
        />
      </Link>
    </li>
  )
}
