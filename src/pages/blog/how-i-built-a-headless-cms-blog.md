---
templateKey: blog-post
title: How I Built a Headless CMS Blog
tags:
  - Gatsby
  - Headless CMS
date: 2023-09-09T04:16:14.851Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit,h_400,w_600/v1694233352/blog/decap-cms_tpulmd.png
---
티스토리에 블로그를 작성하면서 좋기도 하지만 커스텀에 제한이 있다는 점, 포스팅한 데이터가 모두 티스토리에 종속된다는 점이 아쉽게 느껴지곤 했다. 때문에 항상 개인 블로그를 만들고 싶었다. 하지만 바닥부터 블로그를 만드는 일은 간단한 일은 아니다. 그래도 Headless CMS 서비스를 이용하고 MVC로 구현한 후에 복잡한 기능들은 점차 붙여나가면 해볼만 하지 않을까?

기술 스택을 정하기 위해서 블로그에 필요한 기능들을 생각해보았다.

**🚀 블로그 요구사항**

1. 무료 플랜으로 운영할 수 있어야 한다.
2. 플랫폼에 종속되지 않고 다른 플랫폼으로 옮기는 것이 가능해야 한다.
3. wysiwyg 에디터 UI가 글쓰기에 편해야 한다. (ex 노션) 
4. 에디터가 한글을 지원해야 한다. (지원하지 않는 에디터도 있다!)
5. 블로그 포스트는 정적 페이지로 SEO를 지원해야 한다.

## Headless CMS

프론트엔드 개발자라서 그런지 Headless CMS에 자꾸 관심이 간다. 덕분에 백엔드를 개발하지 않고 컨텐츠를 관리할 수 있으면서도 프론트엔드는 자유롭게 구성할 수 있다. Headless CMS는 크게 API Driven 방식과 Git-based 방식으로 나눠진다. 전자는 컨텐츠에 관한 API를 제공하는 것이고 후자는 깃 버전 관리 시스템으로 컨텐츠를 관리하는 것이다. 

다양한 Headless CMS는 [Jamstack](https://jamstack.org/headless-cms/) 사이트에 잘 나와 있다. 유명한 서비스 중에서 먼저 무료 플랜을 지원하는 지 여부로 필터링을 하니 4-5개로 추려졌다.

그 중에서 컨텐츠 관리가 "심플"하고 에디터 UI가 마음에 드는 것으로 최종적으로 Sanity와 Decap CMS를 선택하게 되었다. Sanity는 API Driven 방식이고 자체적인 Portable Text라는 자체 형식으로 rich text를 저장하고 이를 변환하여 사용하는 형식이다. 반면 Decap CMS는 Git-based 방식으로 각 포스트는 md 파일로 깃 리포에 저장된다.

Decap CMS는 치명적인 단점이 있었는데 에디터에서 한글 작성이 안된다는 것이다! 그런데 다행히 얼마 전 [3.0.2](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.0.2) 릴리즈 버전부터 픽스되었다. 마지막 릴리즈 이후 1년 넘게 아무런 소식이 없다가 단비처럼 릴리즈 배포가 된 것이다.🎉

한글 지원 문제도 해결되었고 **Decap CMS**의 컨텐츠 관리 방식이 더 단순하다고 느껴 최종 선택하게 되었다. 아래는 Decap CMS의 에디터 UI다. Sanity와 달리 마크다운을 기본으로 지원한다. 또한 별도의 대시보드 사이트에 접속하지 않고 `https://나의블로그도메인/admin`에 접속하면 바로 컨텐츠 관리를 할 수 있다는 점이 큰 장점으로 여겨졌다.

![Decap CMS 에디터 스크린샷](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit,h_400,w_600/v1694243188/blog/decap-cms-screenshot.png)



## Gatsby



## TailwindCSS
블로그는 UI가 복잡하지 않다. 그에 비해 별도의 CSS 파일을 만드는 것과 CSS-in-JS로 스타일을 작성하는 것 모두 거추장스럽게 느껴졌다. UI 개발 시간도 빠르고 컬러나 사이즈 단위가 정해져 있어서 자연스럽게 디자인 일관성을 유지할 수 있었다.

generate


## Media Library
cloudinary


## tailwindcss/typography
prose


## Dark Theme
useasync