import Layout from 'components/layout'
import PrintableLink from 'components/printable-link'
import Tags from 'components/tags'
import * as items from 'data/about'
import { Fragment } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import genPageTitle from 'utils/genPageTitle'

export function Head() {
  return <title>{genPageTitle('About')}</title>
}

export default function () {
  return (
    <Layout>
      <article className='center-content text-xl'>
        <h1 className='text-4xl font-bold text-center mb-14'>
          <span className='print:hidden'>About</span>
          <span className='hidden print:inline-block'>김반석 기술 이력서</span>
        </h1>
        <section className='mb-10 flex flex-col gap-y-3'>
          <p>
            독학으로 개발자가 된 김반석입니다. 다른 백그라운드를 갖고 있지만,
            HCI(Human-computer Interaction)에 대한 관심으로 프론트엔드 개발을
            시작하게 되었습니다.
          </p>
          <p>
            이커머스와 교육 분야에서 경험을 쌓았고 스타트업에서 근무하며 애자일
            업무 환경에 능숙합니다. Next.js로 SSG와 SSR을 대응할 수 있으며
            테스트와 스토리북을 활용하여 컴포넌트를 개발할 수 있습니다. 웹 성능
            개선에 대한 경험이 있고, GTM에 대한 이해도를 갖추고 있어서
            효과적으로 트래킹에 대응할 수 있습니다.
          </p>
        </section>

        <section>
          <SectionTitle title='Work Experience' />
          <CompanyIntro
            name='코드스테이츠'
            duration='2022.10 ~ 2023.08, 희망퇴직'
            desc='부트캠프 지원자들의 인입부터 선발까지의 제품을 개발했습니다.'
          />
          <Items items={items.codestates} />
          <Hr />
          <CompanyIntro
            name='오픈링크시스템'
            duration='2022.07 ~ 2022.10'
            desc='실험 참여자의 폼 데이터를 수집하고 문의 게시판을 제공합니다.
            풀스택으로 개발, 배포, 운영을 수행했습니다.'
          />
          <Items items={items.openlinksystem} />
          <Hr />
          <CompanyIntro
            name='비컨'
            duration='2021.03 ~ 2022.07'
            desc='사용자의 두피 문진과 진단기기 측정을 AI 분석하여 맞춤형
            헤어제품을 추천하고 판매하는 서비스입니다.'
          />
          <Items items={items.becon} />
        </section>

        <Hr />

        <section>
          <SectionTitle title='Projects' />
          <Items items={items.projects} />
        </section>

        <Hr />

        <section>
          <SectionTitle title='Skills' />
          <Items items={items.skills} />
        </section>

        <Hr />

        <section>
          <SectionTitle title='Education' />
          <table>
            <tbody>
              <tr className='flex flex-col gap-x-10 xl:flex-row'>
                <th className='shrink-0 font-bold text-left'>
                  2018.09 - 2020.08
                </th>
                <td className='grow'>
                  홍익대학교 국제디자인전문대학원 | 스마트디자인엔지니어링
                  석사졸
                </td>
              </tr>
              <tr className='flex flex-col gap-x-10 xl:flex-row mt-2'>
                <th className='shrink-0 font-bold text-left'>
                  2009.03 - 2013.08
                </th>
                <td className='grow'>서울대학교 | 기계항공공학부 학사졸</td>
              </tr>
            </tbody>
          </table>
        </section>

        <Hr />

        <section>
          <SectionTitle title='Contact' />
          <address className='not-italic'>
            <div>
              <span className='font-bold pr-10'>이메일</span>
              <a href='mailto:devzoeykim@gmail.com'>devzoeykim@gmail.com</a>
            </div>
            <div>
              <span className='font-bold pr-10'>깃허브</span>
              <a href='https://github.com/cozyzoey' target='_blank'>
                https://github.com/cozyzoey
              </a>
            </div>
            <div>
              <span className='font-bold pr-10'>블로그</span>
              <a href='https://cozyzoey.kr' target='_blank'>
                https://cozyzoey.kr
              </a>
            </div>
          </address>
        </section>
      </article>
    </Layout>
  )
}

const Hr = () => {
  return <hr className='w-full h-px border-none bg-slate-200 my-10' />
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className='text-4xl font-extrabold text-blue-800 mt-16 mb-8 dark:text-blue-600'>
      {title}
    </h2>
  )
}

const CompanyIntro = ({
  name,
  duration,
  desc,
}: {
  name: string
  duration: string
  desc: string
}) => {
  return (
    <>
      <p className='text-2xl font-extrabold mb-2 text-blue-800 dark:text-blue-600'>
        {name} <span className='text-xl'>({duration})</span>
      </p>
      <p className='mb-4'>{desc}</p>
    </>
  )
}

const Items = ({ items }: { items: items.Item[] }) => {
  return items.map(({ title, coworkers, outcomes, techs, github }, idx) => (
    <Fragment key={idx}>
      <h3 className='text-2xl font-semibold mt-10 mb-2 flex items-center gap-x-2'>
        {title}
        {coworkers && <span>({coworkers}명)</span>}
        {github && (
          <PrintableLink
            href={github}
            displayName={<AiFillGithub className='w-[1.1em] h-[1.1em]' />}
          />
        )}
      </h3>
      {outcomes && (
        <ol className='list-decimal list-inside'>
          {outcomes.map((outcome, idx) => (
            <li key={idx}>{outcome}</li>
          ))}
        </ol>
      )}
      {techs && <Tags tags={techs} className='mt-2' />}
    </Fragment>
  ))
}
