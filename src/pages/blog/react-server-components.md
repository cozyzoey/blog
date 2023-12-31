---
templateKey: blog-post
title: React Server Components
description: 리액트 서버 컴포넌트와 클라이언트 컴포넌트 비교, hydration, Nextjs 13에서 컴포넌트 트리  설계.
tags:
  - React
  - Next.js
date: 2023-09-09T03:37:32.401Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit,h_240,w_360/v1694230551/blog/rsc_arhjd3.png
---

**React Server Components(RSC)** 라는 용어는 두 가지 의미로 사용된다.

1. 서버에서만 실행되는 리액트 컴포넌트
2. 기존의 리액트 컴포넌트를 서버에서 실행시켜주는 프레임웍이나 환경

RSC는 리액트 팀이 리액트가 서버에서 실행될 때 어떻게 동작할 지를 정의한 것이다. Next.js같은 특정 프레임웍이나 메서드에 국한된 것이 아니라 일반적인 개념이다.

### 렌더링 전략

리액트 코드는 실행되는 시점에 따라 세 가지로 구분할 수 있다.

1. **SSG(Static Site Generation)** 앱을 빌드할 때 실행되며 결과물로 정적 페이지를 만든다.
2. **SSR(Server-Side Rendering)** 요청이 있을 때 실행되며 결과물은 이후 요청을 위해 캐시될 수 있다.
3. **CSR(Client-Side Renering)** 리액트 코드가 브라우저에 보내지고 브라우저에서 컨텐츠를 만든다.

**RSC를 실행하면 기본적으로 SSG로 동작한다.** 그런데 브라우저에서 정적 페이지의 소스 코드를 살펴보면 원본 페이지에는 자바스크립트가 전혀 없는데도 자바스크립트 코드가 많이 보인다. 이 코드들의 정체는 뭘까?

## Virtual DOM

이는 해당 정적 페이지의 가상 돔(Virtual DOM)에 해당하는 코드다. **RSC는 정적 컨텐츠와 가상 돔 두 가지 모두를 만든다.** 정적 컨텐츠가 있는데 왜 가상 돔이 필요할까?

<u>동적으로 DOM을 업데이트 해주기에 효율적이기 때문이다.</u> 기존 페이지를 업데이트될 페이지와 비교해서 효율적인 업데이트가 가능하다. 예를 들어 클라이언트 컴포넌트를 런타임 시점에 어디에 삽입해야 할지 알 수 있게 되고, 라우팅이 바뀔 때 페이지에서 바뀐 부분만 업데이트해 줄 수도 있다.

페이지가 로드할 때 리액트는 가상 돔과 서버에서 받은 실제 정적 돔을 비교하는 작업을 한다.(Reconciliation) 만약 이들이 서로 다르다면 콘솔 에러를 던진다. 가상 돔이 정확하지 않다면 돔을 제대로 업데이트할 수 없기 때문이다.

![멘탈 모델](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit/v1694168367/blog/mental-model-3_tuh1s1.png)
출처: https://demystifying-rsc.vercel.app

## Client Component

컴포넌트에 인터랙션이나 useState같은 훅이 있다면 이들은 브라우저에서 실행되는 컴포넌트로 여겨진다. RSC는 기본적으로 컴포넌트를 서버 컴포넌트로 취급하기 때문에 이들을 클라이언트 컴포넌트로 여기도록 해줘야 한다.

그런데 클라이언트 컴포넌트로 만들어진 페이지의 소스 코드를 보면, html이 텅 비어있지 않고 정적 컨텐츠로 채워져 있다! 클라이언트 컴포넌트라고 하지 않았던가?

이는 기본적으로 클라이언트 컴포넌트는 서버에서 프리렌더되고 이들 html이 정적 html에 포함되기 때문이다. 이것만 놓고 보면 SSR이지만 RSC와는 다르다. 좀 더 자세히 알아보자.

### Hydration

클라이언트 컴포넌트는 가상 돔 상에서 렌더된 html이 아니라 삽입될 위치를 알려주는 참조 위치로 존재한다. 가상 돔과 정적 돔을 비교하는 단계에서 리액트는 이를 보고 정적 돔의 일부가 클라이언트 컴포넌트가 프리렌더된 결과라는 것을 알게 된다. 리액트는 해당 시점에 클라이언트 컴포넌트를 렌더하여 프리렌더된 정적 html과 바꿔준다.

이처럼 정적인 SSR html을 동적인 CSR html로 전환하는 것을 `hydration`이라고 한다.

`hydration` static SSR html → dynamic CSR html

그러고 나서 리액트는 서버에서 받은 SSR html과 브라우저에서 hydration을 거친 CSR html이 동일한 지 비교한다. 만일 서로가 불일치해서 hydration 에러가 생기면, 리액트는 가상 돔 정보를 가지고 전체 페이지를 리렌더한다.

![멘탈 모델 with hydration](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit/v1694168367/blog/mental-model-4_fqf3pc.png)
출처: https://demystifying-rsc.vercel.app

### 클라이언트 컴포넌트에서 SSR 비활성화하기

다시 말해 클라이언트 컴포넌트는 서버에서 프리렌더, 즉 SSR 과정을 거친다. Next.js 13에서 `'use client'` 지시자를 넣어도 마찬가지다.

그렇지만 의도적으로 SSR을 비활성화해야 하는 경우도 있다. 예를 들어 특정 마감 시점에 대한 카운트다운 시간을 실시간으로 보여주는 타이머 컴포넌트를 생각해보자. 서버에서 프리렌더하며 계산된 카운트다운 시간과 브라우저에서 렌더링한 카운트다운 시간이 달라서 hydration 에러가 생길 것이다. 이는 의도한 동작이 아니며 카운트다운 시간은 서버에서 프리렌더가 불필요하다.

이러한 경우에 사용할 수 있는 것이 **Next.js의 next/dynamic과 ssr 옵션**이다. ([Skipping SSR](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr))

```typescript
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })
```

1. `next/dynamic` React.lazy()와 Suspense의 합성이다.
2. `ssr:false` 클라이언트 컴포넌트의 프리렌더를 비활성화한다.

클라이언트 컴포넌트가 서버에서 프리렌더되지 않는다면 정적 html에서 해당 자리에 무엇이 들어가게 될까?

[template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) HTML 요소가 들어가게 된다. template은 자바스크립트로 HTML 요소를 만들기 전에는 아무것도 아니다. 정적 돔과 가상 돔을 비교할 때 리액트는 이 자리에 클라이언트 컴포넌트가 들어갈 것을 인지하고 hydration 에러를 발생시키지 않는다.

## Composition

Next.js 13에서 서버 컴포넌트가 등장하면서 클라이언트 컴포넌트와 어떻게 구성해야 하는 지 다소 헤깔린다. 정리하고 넘어가자.

**TL;DR**

- 클라이언트 컴포넌트에서 "Server-Only" 컴포넌트는 임포트할 수 없다.
- 클라이언트 컴포넌트에 임포트된 컴포넌트는 무조건 클라이언트 컴포넌트로 취급된다.
- 클라이언트 컴포넌트는 컴포넌트 트리의 하위에 위치시키자.

### 1. 서버 컴포넌트를 클라이언트 컴포넌트의 자식(or 프랍)으로 ✅

```jsx
<ClientComponent>
  {' '}
  <ServerComponent />{' '}
</ClientComponent>
```

클라이언트 컴포넌트는 그 자식이나 프랍이 어떻게 생겼는지 알 필요가 없다. 컴포넌트는 자기 자신을 렌더하기 위해서 자식 컴포넌트까지 실행하거나 렌더할 필요가 없다. 박스를 만들고 박스 안에 무엇이 들어갈 지(children) 전달받을 뿐이다. 박스를 만드는 것과 박스 안의 내용물은 독립적이다.

### 2. 클라이언트 컴포넌트에서 서버 컴포넌트 임포트하기

클라이언트 컴포넌트에서 무언가를 임포트하는 것은 해당 모듈이 "박스"를 만드는 재료가 된다는 의미다. (1번에서 박스에 무언가를 담는 것과는 다르다.)

**클라이언트 컴포넌트에 임포트된 컴포넌트는 무조건 클라이언트 컴포넌트가 된다.** 이를 바탕으로 정리하면,

- **A)** 서버 컴포넌트가 브라우저에서 실행될 수 있다면 임포트 가능하다. ✅
- **B)** 서버 컴포넌트가 "Server-Only" 기능을 사용한다면 임포트 불가하다. ❌

B 케이스에서 Server-Only 기능이라 함은 파일시스템에 접근하거나 데이터베이스에 연결하는 것 따위다.

![클라이언트 컴포넌트 조립 구성도](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit/v1694168367/blog/mental-model-client-2_gvj4rt.png)
출처: https://demystifying-rsc.vercel.app

Next.js에서 'use client'가 붙지 않은 컴포넌트는 기본적으로 서버 컴포넌트로 동작하지만, 이러한 경우는 클라이언트 컴포넌트로 동작하게 된다. 만일 컴포넌트가 서버에서만 동작하도록 확실히 제한하고 싶다면 [`server-only`](https://www.npmjs.com/package/server-only) 패키지를 사용할 수 있다. 이제 이 컴포넌트를 클라이언트 컴포넌트로 사용하려고 하면 빌드 시 에러를 던진다.

```typescript
import 'server-only'
```

### 3. 클라이언트 컴포넌트는 가능한 하위 트리로

클라이언트 컴포넌트는 컴포넌트 트리의 아래쪽에 위치시키는 것이 좋다. ([Moving Client Components Down the Tree
](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)) 결과적으로 클라이언트에 전달되는 자바스크립트 번들 사이즈를 줄일 수 있다.

앞서 말했듯이 클라이언트 컴포넌트에서 임포트한 컴포넌트는 모두 클라이언트 컴포넌트가 된다. 만약 레이아웃 컴포넌트를 클라이언트 컴포넌트로 취급한다면 하위에 속한 로고나 내비게이션 등 모든 컴포넌트가 클라이언트 컴포너트가 돼버리는 것이다.

그렇게 하는 대신에 인터랙티브 로직은 클라이언트 컴포넌트로 분리하고 레이아웃 컴포넌트는 서버 컴포넌트로 유지하는 것이 좋다.

## 참조

- [Demystifying React Server Components
  with NextJS 13 App Router](https://demystifying-rsc.vercel.app/)
- [Server and Client Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
