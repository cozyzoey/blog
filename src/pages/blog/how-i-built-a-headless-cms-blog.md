---
templateKey: blog-post
title: Headless CMS 블로그 개발기 (Decap CMS + Gatsby)
tags:
  - Gatsby
  - Headless CMS
date: 2023-09-12T12:32:20.798Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit,h_400,w_600/v1694233352/blog/decap-cms_tpulmd.png
---
티스토리에 블로그를 작성하면서 편리하기도 하지만 커스텀에 제한이 있다는 점, 포스팅한 자료가 모두 티스토리에 종속된다는 점이 아쉽게 느껴지곤 했다. 때문에 항상 개인 블로그를 만들고 싶었다. 하지만 바닥부터 블로그를 만드는 일은 간단한 일이 아니다. 그래도 Headless CMS에 컨텐츠 관리를 위임하고 MVC로 구현한 후에 복잡한 기능들은 점차 붙여나가면 해볼만 하지 않을까?

기술 스택을 정하기 위해서 블로그에 필요한 기능들을 생각해보았다.

**🚀 블로그 요구사항**

1. 무료 플랜으로 운영할 수 있어야 한다.
2. 플랫폼에 종속되지 않고 다른 플랫폼으로 옮기는 것이 가능해야 한다.
3. wysiwyg 에디터 UI가 글쓰기에 편해야 한다. (ex 노션) 
4. 에디터가 한글을 지원해야 한다. (지원하지 않는 에디터도 있다!)
5. 블로그 포스트는 정적 페이지로 SEO를 지원해야 한다.

## Headless CMS

Headless CMS는 프론트엔드 개발자에게 날개를 달아주는 서비스다. 백엔드를 걱정하지 않고도 컨텐츠를 관리할 수 있고 프론트엔드는 커스텀하게 만들 수 있다. 

Headless CMS는 크게 API Driven 방식과 Git-based 방식으로 나뉜다. 전자는 컨텐츠에 관한 CRUD API를 제공하고, 후자는 깃 버전 관리와 연동하여 컨텐츠를 `.md`나 `.mdx` 포맷으로 리모트 리포에 저장한다. 

시중에 나와 있는 Headless CMS는 [Jamstack](https://jamstack.org/headless-cms/) 사이트에 잘 나와 있다. 유명한 것들 중에서 무료 플랜을 지원하는 것들을 고르니 4-5개로 추려졌다.

그 중에서 컨텐츠 관리가 "심플"하고 에디터 UI가 마음에 드는 것으로 최종적으로 Sanity와 Decap CMS를 선택하게 되었다. Sanity는 API Driven 방식이고 Portable Text라는 자체 형식으로 rich text를 저장하고 이를 클라이언트 단에서 변환하여 사용한다. 반면 Decap CMS는 Git-based 방식으로 각 포스트는 md 파일로 깃 리포에 저장된다.

그런데 Decap CMS가 치명적인 단점이 있었는데 에디터에서 한글 작성이 안된다는 것이다!(실은 이 사실을 어느정도 개발을 진행한 후에 알게 되었다🥲) 운영진이 해당 버그를 픽스할 계획을 공지했기 때문에 릴리즈를 계속 주시하고 있었다. 1년이 지나도록 신규 릴리즈가 없다가 드디어 소식이 전해졌다!🎉🎉 얼마 전에 배포된 [3.0.2](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.0.2) 릴리즈 버전부터는 에디터에서 한글을 지원한다.

한글 지원 문제도 해결되었고 **Decap CMS**의 컨텐츠 관리 방식이 더 단순하다고 느껴 최종 선택하게 되었다. 아래는 Decap CMS의 에디터 UI다. Sanity와 달리 마크다운을 기본으로 지원한다. 또한 별도의 대시보드 사이트에 접속하지 않고 `https://나의블로그도메인/admin`에 접속하면 바로 컨텐츠 관리를 할 수 있는 점이 큰 장점으로 여겨졌다.

![Decap CMS 에디터 스크린샷](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1694243188/blog/decap-cms-screenshot.png)

## Gatsby & Netlify

Gatsby는 리액트 기반의 프레임웍이다. 블로그같은 정적 페이지를 만들기에 적합하고 Decap CMS와 호환성도 좋아서 선택하게 되었다.
Decap CMS와 Gatsby정해지고 나니 배포는 크게 고민하지 않고 이들과 호환성이 좋은 Netlify를 이용하였다.

## Tailwind CSS로 wysiwyg 렌더하기

만들고자 하는 블로그는 UI가 단순하다. UI가 단순한 만큼 스타일도 별도의 CSS 파일을 만들거나 CSS-in-JS를 작성하는 대신 가장 단순한 방법을 원했다. Tailwind CSS에 사전 정의된 클래스명으로도 충분하다고 판단했다. 실제로 Tailwind CSS를 적용하니 UI 개발 시간이 빨랐고, 컬러나 사이즈 등의 단위가 정해져 있어서 자연스럽게 디자인 일관성을 유지할 수 있었다.

고민이 필요한 부분은 wysiwyg였다. 실제 렌더링되는 블로그 포스트와 CMS에서 컨텐츠를 작성할 때 나타나는 프리뷰의 UI를 컨트롤해야한다. Tailwind CSS로 어떻게 wysiwyg을 구현할 수 있을까? 볼드, 헤딩, 기울임 등에 해당하는 HTML 태그마다 CSS를 일일이 정의하는 것보다 깔끔한 방식으로 구현하고 싶었다. 

찾아보니 [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)라는 좋은 대안이 있었다. 이를 블로그 포스트 컨텐츠를 렌더하는 컴포넌트에 적용하였다.

```typescript
// content-renderer.tsx

import { ReactNode } from 'react'

export interface ContentRendererProps {
  content: ReactNode
}

const prose =
  'prose prose-xl max-w-none prose-slate prose-code:before:hidden prose-code:after:hidden dark:prose-invert'

export default function ({ content }: ContentRendererProps) {
  return <div className={prose}>{content}</div>
}
```

이제 Decap CMS 에디터에서 컨텐츠를 작성할 때 나타나는 프리뷰도 실제 포스트와 동일한 UI가 나타나도록 CSS 파일을 주입해주었다. 이를 위해 우선 개발 시에 CSS 파일을 실시간으로 생성하도록 하였다.

```json
// package.json
"generate:css": "npx tailwindcss -i ./src/styles/global.css -o ./static/admin/preview.css --watch"
```

그리고 만들어진 `prewview.css` 파일을 Decap CMS 설정에서 주입해 주었다.

```javascript
// cms.js
CMS.registerPreviewStyle("preview.css");
```

## useSyncExternalStore로 Dark Theme 구현

블로그는 기본적으로 흰색 바탕에 검은색 글자인데 다크모드를 지원하고자 하였다. Tailwind CSS에서 light/dark theme은 기본적으로 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)이라는 CSS 미디어 기능과 연동되어 있다.

만약 토글 버튼처럼 수동으로 theme을 조작하려면 이를 활성화시켜줘야 한다. 그리고 html에 "dark" 클래스명을 넣어주면 dark 모드로 인지하게 된다.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ...
}
```

사용자가 설정한 Dark Theme을 리액트 내부 상태로 관리하는 동시에 브라우저 로컬 스토리지에 저장하여 설정을 유지하도록 하고자 했다. 이를 위해 리액트 18에서 제공하는 `useSyncExternalSore` 훅을 적용했다.

[useSyncExternalSore](https://react.dev/reference/react/useSyncExternalStore) 훅은 세 개의 인자를 받는다.

* `subscribe` 스토어를 구독하여 스토어에 변화가 있을 때 실행되는 콜백 함수
* `getSnapshot` 현재 스토어의 데이터를 포착하여 반환해주는 함수
* `getServerSnapshot(Optional)` 스토어의 초기 상태를 반환하는 함수 . 컴포넌트의 서버 렌더링이나 [hydration](https://www.gatsbyjs.com/docs/conceptual/react-hydration/) 시에만 사용됨.

이를 바탕으로 theme을 관리하는 `themeStore`를 만들어서 관리했다. Gatsby는 빌드 타임에 서버에서 정적 렌더링을 하기 때문에 세 번째 인자인 getServerSnapshot도 입력해줘야 한다. 그렇지 않으면 오류가 발생한다.

```typescript
// themeStore.ts

export type Theme = 'light' | 'dark'

export default {
  subscribe: (callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => {
      window.removeEventListener('storage', callback)
    }
  },
  getSnapShot: (): Theme => (localStorage.getItem('theme') as Theme) ?? 'light',
  getServerSnapshot: (): Theme => 'light',
}
```

themStore는 ThemeToggler라는 HOC 컴포넌트에서 소비하도록 하였다. 

```typescript
// ThemeToggler.tsx

import { useEffect } from 'react'
import { useSyncExternalStore } from 'react'
import themeStore, { Theme } from 'store/themeStore'

interface Props {
  children: (props: {
    theme: Theme
    toggleTheme: (theme: Theme) => void
  }) => JSX.Element
}

export default function ({ children }: Props) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapShot,
    themeStore.getServerSnapshot
  )

  const toggleTheme = () => {
    const newValue = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newValue)
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue })
    )
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children({ theme, toggleTheme })
}
```

위에서 정의한 ThemeProvider 컴포넌트는 Theme 컨트롤 기능에 필요한 곳에 불러와 사용할 수 있다.

```typescript
<ThemeToggler>
  {({ theme, toggleTheme }) => (
    <label className='cursor-pointer text-slate-400 dark:text-slate-300 xl:hover:text-slate-500'>
      <input
        type='checkbox'
        onChange={(e) =>
          toggleTheme(e.target.checked ? 'dark' : 'light')
        }
        checked={theme === 'dark'}
        className='hidden'
      />
      {theme === 'dark' ? (
        <BsSunFill size={24} />
      ) : (
        <BiSolidMoon size={24} />
      )}
    </label>
  )}
</ThemeToggler>
```

## Decap CMS에 Cloudinary 연동하여 이미지 관리

Decap CMS에서 미디어 에셋은 파일 시스템으로 깃헙 리포에 저장된다. 하지만 깃헙 리포 용량 문제도 있고 Cloudinary에서 CDN 같은 최적화된 기능을 활용하고 싶어서 Cloudinary를 적용했다. [netlify-cms-media-library-cloudinary](https://www.npmjs.com/package/netlify-cms-media-library-cloudinary)라는 플러그인을 설치하고 CMS에 관련 설정을 해준다.

```javascript
// cms.js
import CMS from "decap-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";

...
CMS.registerMediaLibrary(cloudinary);
```

Decap CMS의 어드민 설정에 해당하는 `admin/config.yml`에도 설정이 필요하다.
이제 Decap CMS의 에디터에서 이미지 위젯을 클릭하면 Cloudinary 화면 모달이 뜬다. 연동한 클라우드 계정으로 로그인 후에 사용할 수 있다.

```
media_library:
  name: cloudinary
  config:
    cloud_name: cloud_name
    api_key: api_key
```

참고로 위에 들어가는 Cloudinary의 cloud_name과 api_key는 퍼블릭하게 공개되어도 무방하다. ([Security Considerations](https://github.com/decaporg/decap-cms/blob/master/website/content/docs/cloudinary.md#security-considerations)) 어차피 Cloudinary 계정으로 다시 인증을 받는 절차가 있기 때문이다.

## 기술 블로그 기술 스택
결과적으로 블로그를 만드는 데 사용된 기술 스택은 아래와 같이 정리할 수 있겠다. 
- **Decap CMS** 컨텐츠 관리
- **Gatsby** 프론트엔드 프레임워크
- **TailwindCSS** 스타일
- **Cloudinary** 이미지 관리
- **Netlify** 배포