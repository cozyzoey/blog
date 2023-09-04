import Layout from 'components/layout'
import { Fragment } from 'react'

import * as items from '../../data/about'

const SUBJECT_TITLE = 'text-4xl font-bold text-blue-800 mb-6'
const ITEM_TITLE = 'text-3xl font-medium mb-2'
const COMPANY_NAME = 'text-2xl font-medium'

export default function () {
  return (
    <Layout>
      <div className='center-content text-lg'>
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
        <article>
          <h2 className={SUBJECT_TITLE}>Work Experience</h2>

          <section>
            <p className={COMPANY_NAME}>
              코드스테이츠{' '}
              <span className='text-xl'>(2022.10 ~ 2023.08, 희망퇴직)</span>
            </p>
            <p className='mb-4'>
              부트캠프 지원자들의 인입부터 선발까지의 제품을 개발했습니다.
            </p>
            <Items items={items.codestates} />
          </section>

          <section>
            <p className={COMPANY_NAME}>
              오픈링크시스템{' '}
              <span className='text-xl'>(2022.07 ~ 2022.10)</span>
            </p>
            <p className='mb-4'>
              실험 참여자의 폼 데이터를 수집하고 문의 게시판을 제공합니다.
              풀스택으로 개발, 배포, 운영을 수행했습니다.
            </p>
            <Items items={items.openlinksystem} />
          </section>

          <section>
            <p className={COMPANY_NAME}>
              비컨 <span className='text-xl'>(2021.03 ~ 2022.7)</span>
            </p>
            <p className='mb-4'>
              사용자의 두피 문진과 진단기기 측정 결과를 AI 분석하여 맞춤형
              헤어제품을 추천하고 판매하는 서비스입니다.
            </p>
            <Items items={items.becon} />
          </section>
        </article>
        <article>
          <h2 className={SUBJECT_TITLE}>Projects</h2>
          <Items items={items.projects} />
        </article>
        <article>
          <h2 className={SUBJECT_TITLE}>Skills</h2>
          <Items items={items.skills} />
        </article>
        <article>
          <h2 className={SUBJECT_TITLE}>Education</h2>
          <table>
            <tr>
              <td>2018.09 - 2020.08</td>
              <td>
                홍익대학교 국제디자인전문대학원 | 스마트디자인엔지니어링 석사졸
              </td>
            </tr>
            <tr>
              <td>2009.03 - 2013.08</td>
              <td>서울대학교 | 기계항공공학부 학사졸</td>
            </tr>
          </table>
        </article>
        <article>
          <h2 className={SUBJECT_TITLE}>Contact</h2>
          <table>
            <tr>
              <td>연락처</td>
              <td>010-5025-9204</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>devzoeykim@gmail.com</td>
            </tr>
            <tr>
              <td>깃허브</td>
              <td>https://github.com/cozyzoey</td>
            </tr>
            <tr>
              <td>블로그</td>
              <td>https://cozyzoey.kr</td>
            </tr>
          </table>
        </article>
      </div>
    </Layout>
  )
}

const Items = ({ items }: { items: items.Item[] }) => {
  return items.map(({ title, desc, outcomes, techs }, idx) => (
    <Fragment key={idx}>
      {title && <h3 className={ITEM_TITLE}>{title}</h3>}
      {desc && <p>{desc}</p>}
      {outcomes && (
        <ol>
          {outcomes.map((outcome, idx) => (
            <li key={idx}>{outcome}</li>
          ))}
        </ol>
      )}
      {techs && (
        <ul className='flex gap-4'>
          {techs.map((tech, idx) => (
            <li key={idx}>{tech}</li>
          ))}
          <li>Next.js</li>
        </ul>
      )}
    </Fragment>
  ))
}
