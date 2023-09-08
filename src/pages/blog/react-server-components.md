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

RSC는 리액트 팀이 리액트가 서버에서 실행될 때 어떻게 동작할 지를 정의한 것이다. 특정 프레임웍이나 메서드에만 해당하는 아니라 일반적인 개념이다.

리액트 코드가 실행되는 시점에 따라 세 가지로 구분할 수 있다.

1. `SSG(Static Site Generatiion)` 앱을 빌드할 때 실행되며 결과물로 정적 페이지를 만든다.
2. `SSR(Server-Side Rendering)` 요청이 있을 때 실행되며 결과물은 이후 요청을 위해 캐시될 수 있다.
3. `CSR(Client-Side Renering)` 리액트 코드가 브라우저에 보내지고 브라우저에서 컨텐츠를 만든다.

RSC를 실행하면 기본적으로 SSG로 동작한다. 그런데 브라우저에서 정적 페이지의 소스 코드를 살펴보면 원본 페이지에는 자바스크립트가 전혀 없는데도 자바스크립트 코드가 많이 보인다. 이 코드들의 정체는 뭘까?

## 가상 돔
이는 해당 정적 페이지의 가상 돔(Virtual DOM)에 해당하는 코드다. 서버에서 정적 페이지를 만들어서 보내줬는데, 왜 별도의 Virtual DOM이 필요할까? <u>동적으로 DOM을 업데이트 해주기</u> 위해서 별도의 Virtual DOM 정보를 관리하는 것이다. 페이지를 업데이트 해야 할 때 기존의 페이지를 새로운 페이지와 비교해서 효율적으로 업데이트해줄 수 있게 된다.
예를 들어 클라이언트 컴포넌트를 런타임 시점에 어디에 삽입해야 할지 알 수 있게 되고, 라우팅이 바뀔 때 페이지에서 바뀐 부분만 업데이트해 줄 수도 있다.

페이지가 로드할 때 리액트는 Virtual DOM과 서버에서 받은 실제 정적 DOM을 비교하는 작업을 한다. 만약 이들이 서로 다르다면 콘솔 에러를 던질 것이다. Virtual DOM 정보가 맞지 않다면 정확한 돔 업데이트가 불가능하기 때문이다.

## 클라이언트 컴포넌트
컴포넌트에 인터랙션이나 useState같은 훅이 있다면 이들은 브라우저에서 

## 참조
- [Demystifying React Server Components
with NextJS 13 App Router](https://demystifying-rsc.vercel.app/)