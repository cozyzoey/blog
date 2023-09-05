import Layout from 'components/layout'
import genPageTitle from 'utils/genPageTitle'

export default function IndexPage() {
  return (
    <Layout>
      <article className='h-5/6 text-center'>
        <h1 className='text-4xl font-bold mb-6'>안녕하세요. 김반석입니다.</h1>
        <section className='text-xl'>
          <p>서울에서 웹 프론트엔드 개발을 하고 있습니다.</p>
          <p>문제 해결이라는 관점에서 '엔지니어'라는 단어를 좋아합니다.</p>
        </section>
      </article>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle()}</title>
}
