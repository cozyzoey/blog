---
templateKey: blog-post
title: React Server Components
tags:
  - React
date: 2023-09-08T05:12:31.291Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/c_fit,h_400,w_600/v1689170017/992762435A33213D25_gpijt4.jpg
---
## 들어가며
`React Server Components(RSC)`라는 용어는 두 가지 의미로 사용된다.
1. 서버에서만 실행되는 리액트 컴포넌트
2. 기존의 리액트 컴포넌트를 서버에서 실행시켜주는 프레임웍이나 환경

RSC는 리액트 팀이 리액트가 서버에서 실행될 때 어떻게 동작할 지를 정의한 것이다. Next.js같은 특정 프레임웍이나 메서드에 국한된 것이 아니라 일반적인 개념이다.

리액트 코드가 실행되는 시점에 따라 세 가지로 구분할 수 있다.

1. `SSG(Static Site Generatiion)` 앱을 빌드할 때 실행되며 결과물로 정적 페이지를 만든다.
2. `SSR(Server-Side Rendering)` 요청이 있을 때 실행되며 결과물은 이후 요청을 위해 캐시될 수 있다.
3. `CSR(Client-Side Renering)` 리액트 코드가 브라우저에 보내지고 브라우저에서 컨텐츠를 만든다.

RSC를 실행하면 기본적으로 SSG로 동작한다. 그런데 브라우저에서 정적 페이지의 소스 코드를 살펴보면 원본 페이지에는 자바스크립트가 전혀 없는데도 자바스크립트 코드가 많이 보인다. 이 코드들의 정체는 뭘까?

## 가상 돔
이는 해당 정적 페이지의 가상 돔(Virtual DOM)에 해당하는 코드다. **RSC는 정적 컨텐츠와 가상 돔을 모두 만들어서 보내준다.** 정적 컨텐츠가 있는데 왜 가상 돔이 필요할까? 

<u>동적으로 DOM을 업데이트 해주기</u> 위해서 별도로 가상 돔을 관리하는 것이다. 페이지를 업데이트 해야 할 때 기존의 페이지를 새로운 페이지와 비교해서 효율적으로 업데이트해줄 수 있게 된다.

예를 들어 클라이언트 컴포넌트를 런타임 시점에 어디에 삽입해야 할지 알 수 있게 되고, 라우팅이 바뀔 때 페이지에서 바뀐 부분만 업데이트해 줄 수도 있다.


페이지가 로드할 때 리액트는 가상 돔과 서버에서 받은 실제 정적 돔을 비교하는 작업을 한다. 만약 이들이 서로 다르다면 콘솔 에러를 던질 것이다. 가상 돔이 맞지 않다면 돔을 정확하기 업데이트하기 불가능하기 때문이다.

## 클라이언트 컴포넌트
컴포넌트에 인터랙션이나 useState같은 훅이 있다면 이들은 브라우저에서 실행될 것으로 여겨진다. RSC는 기본적으로 컴포넌트를 서버 컴포넌트로 취급하기 때문에 이들을 클라이언트 컴포넌트로 여기도록 선택해야 한다.

그런데 클라이언트 컴포넌트로 만들어진 페이지의 소스 코드를 보면, html이 텅 비어있지 않고 정적 컨텐츠로 채워져 있다! 클라이언트 컴포넌트라고 하지 않았던가?

이는 기본적으로 클라이언트 컴포넌트는 서버에서 프리렌더되고 이들 html이 정적 산출물에 포함되기 때문이다. 이것만 놓고 보면 SSR이지만 RSC와는 다르다. 좀 더 자세히 알아보자.

### Hydration
클라이언트 컴포넌트는 가상 돔에서 html이 아니라 원래 위치를 알려주는 참조 위치로 존재한다. 가상 돔과 정적 돔을 비교하는 단계에서 리액트는 이를 보고 정적 돔의 일부가 클라이언트 컴포넌트의 SSR이라는 것을 알게 된다. 리액트는 해당 시점에 클라이언트 컴포넌트를 렌더하여 원래의 SSR된 정적 html과 바꿔준다.

이처럼 정적인 SSR html을 동적인 CSR html로 전환하는 것을 `hydration`이라고 한다.

`hydration` static SSR html → dynamic CSR html

그러고 나서 리액트는 서버에서 받은 SSR html과 브라우저에서 hydration을 거친 CSR html이 동일한 지 비교한다. 만일 서로가 불일치해서 hydration 에러가 생기면, 리액트는 가상 돔 정보를 가지고 전체 페이지를 리렌더한다.

### 클라이언트 컴포넌트에서 SSR 비활성화하기
다시 말해 클라이언트 컴포넌트는 서버에서 프리렌더, 즉 SSR 과정을 거친다. Next.js 13에서 `'use client'` 지시자를 넣어도 마찬가지다.

그렇지만 의도적으로 SSR을 비활성화해야 하는 경우도 있다. 예를 들어 특정 마감 시점에 대한 카운트다운 시간을 실시간으로 보여주는 타이머 컴포넌트를 생각해보자. 서버에서 프리렌더하며 계산된 카운트다운 시간과 브라우저에서 렌더링한 카운트다운 시간이 달라서 hydration 에러가 생길 것이다. 이는 의도한 동작이 아니며 카운트다운 시간은 서버에서 프리렌더가 불필요하다.

이러한 경우에 사용할 수 있는 것이 **Next.js의 next/dynamic과 ssr 옵션**이다. ([Skipping SSR](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr))

```
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

```

1. `next/dynamic` React.lazy()와 Suspense의 합성이다.
2. `ssr:false` 클라이언트 컴포넌트의 프리렌더를 비활성 시킨다.



## 참조
- [Demystifying React Server Components
with NextJS 13 App Router](https://demystifying-rsc.vercel.app/)