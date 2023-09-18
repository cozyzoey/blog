import PrintableLink from 'components/printable-link'
import { ReactNode } from 'react'

export type Tech =
  | 'Next.js'
  | 'Typescript'
  | 'React'
  | 'React Query'
  | 'Zustand'
  | 'Styled Components'
  | 'Storybook'
  | 'MSW'
  | 'Sass'
  | 'Vercel'
  | 'Strapi'
  | 'Redux'
  | 'Redux Toolkit'
  | 'SWR'
  | 'Redux-saga'
  | 'AWS'
  | 'Firebase'
  | 'Decap CMS'
  | 'Gatsby'
  | 'Tailwind CSS'
  | 'Netlify'

export type Item = {
  title: ReactNode
  coworkers?: number
  outcomes?: ReactNode[]
  techs?: Tech[]
  github?: string
}

export const codestates: Item[] = [
  {
    title: '메인 웹사이트 개발',
    coworkers: 5,
    outcomes: [
      '웹 성능 최적화로 성능 점수 모바일 22%, 데스크탑 4% 개선(이미지 최적화, 번들 사이즈 감소, Forced Reflow 개선)',
      '깃헙 워크플로우 CI/CD 기반 구축, 트렁크 기반 브랜치 전략 도입하여 DX 개선',
      '부트캠프 CMS로 활용하는 노션 API 클라이언트 고도화로 안정성 향상(유닛 테스트 도입, 응답 파서 적용, Rate Limit 적용)',
      <>
        <PrintableLink
          href='https://www.codestates.com/help'
          displayName='자주 하는 질문'
        />{' '}
        페이지 전체 설계 및 개발
      </>,
    ],
    techs: [
      'Next.js',
      'Typescript',
      'React Query',
      'Zustand',
      'Styled Components',
      'Storybook',
      'MSW',
    ],
  },
  {
    title: '선발심사 어드민 개발',
    coworkers: 4,
    outcomes: [
      'React Query, Zustand를 사용한 선발심사 관련 복잡한 상태 관리',
      '심사를 위한 질문지 폼 솔루션(SurveyJs) 연동',
    ],
    techs: [
      'React',
      'Typescript',
      'React Query',
      'Zustand',
      'Sass',
      'Storybook',
    ],
  },
]

export const openlinksystem: Item[] = [
  {
    title: '고객센터 개발',
    coworkers: 1,
    outcomes: [
      'Node.js 백엔드 개발(Headless CMS Strapi 사용)',
      'AWS 데브옵스 환경 구축(Elastic Beanstalk, EC2, RDS MariaDB, AWS Load Balancer, Nginx, AWS S3)',
    ],
    techs: ['Next.js', 'SWR', 'Vercel', 'Strapi', 'AWS'],
  },
]

export const becon: Item[] = [
  {
    title: (
      <>
        <PrintableLink
          href='https://withbecon.com'
          displayName='이커머스 웹사이트'
        />{' '}
        개발
      </>
    ),
    coworkers: 1,
    outcomes: [
      '카카오로그인 연동한 계정 작업(회원가입, 로그인, 자동로그인, 토큰, 마이페이지)',
      '아임포트 결제 및 정기구독 로직 처리',
      'GTM으로 이벤트 트래킹 구축 및 마케팅 협업, 랜딩페이지 A/B 테스트 진행',
      '이커머스 어드민 유지보수',
    ],
    techs: ['React', 'Typescript', 'Redux Toolkit', 'SWR', 'Sass'],
  },
  {
    title: '웹뷰 개발',
    coworkers: 2,
    outcomes: [
      '안드로이드 및 iOS 웹뷰 개발',
      '웹뷰 초기 로딩속도 4.2초 단축 경험(코드 스플리팅, 폰트 최적화 등)',
      'i18n 다국어(한국어, 영어, 일본어) 대응',
      '22단계의 멀티스텝 문진 폼 상태 관리',
    ],
    techs: ['React', 'Redux-saga', 'Sass'],
  },
]

export const projects: Item[] = [
  {
    title: (
      <PrintableLink href='http://cozyzoey.kr' displayName='개인 블로그' />
    ),
    coworkers: 1,
    outcomes: [
      <>
        git 기반의 Headless CMS(Decap CMS)로 컨텐츠 관리(
        <PrintableLink
          href='http://cozyzoey.kr/blog/how-i-built-a-headless-cms-blog/'
          displayName='블로그 개발기'
        />
        )
      </>,
      'Light / Dark Mode 지원',
    ],
    techs: ['Decap CMS', 'Gatsby', 'Tailwind CSS', 'Netlify'],
    github: 'https://github.com/cozyzoey/blog',
  },
  {
    title: (
      <PrintableLink href='https://onbitclinic.com' displayName='온빛 의원' />
    ),
    coworkers: 1,
    outcomes: [
      'Firebase로 앱 레이어 구성(Firebase Authentication, Cloud Firestore, Clound Functions, Hosting)',
      'SEO 향상을 위해서 Next.js 13 및 App 라우터로 마이그레이션 진행 중',
    ],
    techs: ['Firebase', 'React', 'Redux', 'Sass'],
    github: 'https://github.com/cozyzoey/onbit',
  },
]

export const skills: Item[] = [
  {
    title: 'Soft Skills',
    outcomes: [
      '디자이너, 백엔드 개발자, 마케터 등과 원활하게 소통할 수 있습니다.',
      '기획과 요구사항에서 구현에 필요한 세부사항이 누락되지 않게끔 사전에 확인하고 꼼꼼히 개발합니다.',
    ],
  },
  {
    title: 'Web',
    outcomes: [
      '크로스 브라우징과 반응형 디자인에 능숙합니다.',
      '웹 표준과 접근성을 준수합니다.',
    ],
  },
  {
    title: 'JavaScript',
    outcomes: ['ES6 문법에 익숙합니다.', '타입스크립트를 작성할 수 있습니다.'],
  },
]
