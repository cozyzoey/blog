# CozyZoey's Blog

![Gatsby](https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

Headless CMS 기반의 개인 블로그입니다.
[View Demo](https://cozyzoey.kr)

## 특징

- [Decap CMS](https://decapcms.org/)(Headless CMS)를 사용한 git 기반의 컨텐츠 관리 (`.md` 파일)
- Netlify의 [Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)로 웹사이트에서 컨텐츠를 관리하고, 업데이트된 `.md` 파일은 자동으로 깃헙 커밋으로 반영됨
- Gatsby로 정적 페이지 생성 및 Netlify 배포
- TailwindCSS를 사용한 미니멀 디자인
- Light / Dark Mode
- SEO(Sitemap, OpenGraph tags, Twitter tags)

## 설치 및 시작

Node 18 버전(`.nvmrc`)이 필요합니다. 패키지 매니저로 `yarn`을 사용합니다.

```zsh
yarn install
yarn dev
```
