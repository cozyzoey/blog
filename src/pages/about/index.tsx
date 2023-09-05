import Layout from 'components/layout'
import * as items from 'data/about'
import { Fragment } from 'react'
import { AiFillGithub } from 'react-icons/ai'

export default function () {
  return (
    <Layout>
      <article className='center-content text-lg break-keep'>
        <h1 className='text-4xl font-bold text-center mb-14'>About</h1>
        <section className='mb-10'>
          <p>
            3년 차 프론트엔드 개발자 김반석입니다. 기계공학과 융합디자인
            백그라운드를 갖고 있으며 HCI(Human-computer Interaction)에 대한
            관심으로 프론트엔드 개발을 하게 됐습니다.
          </p>
          <p>
            이커머스와 교육 스타트업에서 근무하여 애자일 업무환경에 익숙합니다.
            웹 성능 개선 경험이 있으며, GTM을 이해하고 있어서 효과적으로
            트래킹에 대응할 수 있습니다. 고질적이고 반복되는 문제 해결을
            좋아합니다.
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
            desc='사용자의 두피 문진과 진단기기 측정 결과를 AI 분석하여 맞춤형
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
              <tr>
                <th className='w-max font-bold pr-10'>2018.09 - 2020.08</th>
                <td>
                  홍익대학교 국제디자인전문대학원 | 스마트디자인엔지니어링
                  석사졸
                </td>
              </tr>
              <tr>
                <th className='w-max font-bold pr-10'>2009.03 - 2013.08</th>
                <td>서울대학교 | 기계항공공학부 학사졸</td>
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
  return <hr className='w-full h-px border-none bg-slate-100 my-10' />
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className='text-4xl font-extrabold text-blue-700 mt-16 mb-8'>
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
      <p className='text-2xl font-bold mb-2 text-blue-700'>
        {name} <span className='text-xl'>({duration})</span>
      </p>
      <p className='mb-4'>{desc}</p>
    </>
  )
}

const Items = ({ items }: { items: items.Item[] }) => {
  return items.map(({ title, desc, outcomes, techs, github }, idx) => (
    <Fragment key={idx}>
      <h3 className='text-2xl font-semibold mt-10 mb-2 flex items-start gap-x-1.5'>
        {title}
        {github && (
          <a href={github} target='_blank'>
            <AiFillGithub size={28} />
          </a>
        )}
      </h3>{' '}
      {desc && <p>{desc}</p>}
      {outcomes && (
        <ol className='list-decimal list-inside'>
          {outcomes.map((outcome, idx) => (
            <li key={idx}>{outcome}</li>
          ))}
        </ol>
      )}
      {techs && (
        <ul className='flex gap-1.5 flex-wrap mt-2'>
          {techs.map((tech, idx) => (
            <li
              key={idx}
              className='text-base py-0.5 px-2 rounded-full bg-slate-100 text-slate-500'
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  ))
}
