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
  | 'GraphQL'
  | 'Tailwind CSS'
  | 'Netlify'

export type Item = {
  title: string
  desc?: string
  coworkers?: number
  outcomes?: string[]
  techs?: Tech[]
  github?: string
}

export const codestates: Item[] = [
  {
    title: '메인 웹사이트 개발',
    coworkers: 5,
    outcomes: [
      '웹 성능 최적화로 성능 점수 모바일 22%, 데스크탑 4% 개선',
      '트렁크 기반 브랜치 전략, 깃헙 워크플로우 CI/CD 구축',
      '써드파티 CMS 연동 (노션 API 응답 파서 및 Rate Limit 적용)',
      '브랜드 캠페인, 자주 하는 질문, 부트캠프 랜딩페이지 등',
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
      '선발을 위한 심사로직 클라이언트 개발',
      'SurveyJs 연동한 질문지 관련 도메인 로직 처리',
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
      'Node.js Headless CMS(Strapi)를 사용한 백엔드 개발',
      'AWS 데브옵스 환경 구성',
    ],
    techs: ['Next.js', 'SWR', 'Vercel', 'Strapi', 'AWS'],
  },
]

export const becon: Item[] = [
  {
    title: '이커머스 웹사이트 초기 개발',
    coworkers: 1,
    outcomes: [
      '카카오로그인 연동한 계정 관련 작업(회원가입, 로그인, 자동로그인, 토큰, 마이페이지)',
      '아임포트 결제 및 정기구독 로직 처리',
      'GTM으로 이벤트 트래킹 구축 및 마케팅 지원, 랜딩페이지 A/B 테스트 진행',
      '22단계의 멀티스텝 문진 폼 상태 관리',
    ],
    techs: ['React', 'Redux Toolkit', 'Typescript', 'SWR', 'Sass'],
  },
  {
    title: '웹뷰 개발',
    coworkers: 2,
    outcomes: [
      '안드로이드 및 iOS용 웹뷰 개발',
      '웹뷰 초기 로딩속도 4.2초 단축 경험',
      'i18n 다국어(한국어, 영어, 일본어) 지원 대응',
      '22단계의 멀티스텝 문진 폼 상태 관리',
    ],
    techs: ['React', 'Redux-saga', 'Sass'],
  },
]

export const skills: Item[] = [
  {
    title: 'Soft Skills',
    outcomes: [
      '디자이너, 백엔드 개발자, 마케터 등과 원활하게 소통할 수 있습니다.',
      '협업 툴(Jira, Slack, Notion, Figma, Zeplin)을 활용할 수 있습니다.',
      '기획과 요구사항에서 구현에 필요한 세부사항이 누락되지 않게끔 사전에 확인하고 꼼꼼히 개발합니다.',
      '프로젝트나 문제 상황마다 가장 적합한 해결책을 찾는 ‘엔지니어링’을 선호합니다.',
    ],
  },
  {
    title: 'Web',
    outcomes: [
      '구글 Lighthouse로 웹 성능을 진단하고 개선할 수 있습니다.',
      '크로스 브라우징과 반응형 디자인에 능숙합니다.',
      '웹 표준과 접근성을 준수합니다.',
    ],
  },
  {
    title: 'JavaScript',
    outcomes: ['ES6 문법에 익숙합니다.', '타입스크립트를 작성할 수 있습니다.'],
  },
  {
    title: 'React',
    outcomes: [
      '적절한 툴로 복잡한 상태관리를 할 수 있습니다. (React Query, Redux, Context, Zustand 등)',
      'Nextjs로 SSR을 대응할 수 있습니다.',
      '테스트 코드와 Storybook을 사용하여 컴포넌트를 개발할 수 있습니다.',
      'UI 컴포넌트와 비즈니스 로직을 모듈화해서 재사용할 수 있습니다.',
    ],
  },
  {
    title: 'DevOps',
    outcomes: [
      'AWS 환경을 조작하여 앱 환경을 구성한 경험이 있습니다. (Elastic Beanstalk, EC2, RDS MariaDB, AWS Load Balancer, Nginx, AWS S3 등)',
      'Firebase 환경에서 앱을 서비스할 수 있습니다. (Firestore, Authentication, Functions 등)',
    ],
  },
]

export const projects: Item[] = [
  {
    title: '온빛',
    desc: '지인의 병원 홈페이지입니다. 간단한 공지사항 어드민 기능을 제공합니다. 기존 React 16 기반에서 SEO 향상을 위하여 Next.js 13 및 App 라우터로 마이그레이션을 진행하고 있습니다.',
    techs: ['Firebase', 'React', 'Redux', 'Sass'],
    github: 'https://github.com/cozyzoey/onbit',
  },
  {
    title: '블로그',
    desc: '개인 블로그를 직접 운영하기 위한 초기 작업입니다. Git 기반의 Headless CMS(Decap CMS)를 적용했습니다.',
    techs: ['Decap CMS', 'Gatsby', 'GraphQL', 'Tailwind CSS', 'Netlify'],
    github: 'https://github.com/cozyzoey/blog',
  },
]
