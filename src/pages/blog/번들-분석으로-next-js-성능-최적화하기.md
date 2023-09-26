---
templateKey: blog-post
title: 번들 분석으로 Next.js 성능 최적화하기
description: 번들 분석을 통한 Next.js 앱 최적화 과정 및 결과. 번들 사이즈를 줄이는 방법.
tags:
  - Performance
  - Next.js
date: 2023-09-26T06:30:17.592Z
updated: 2023-09-26T06:30:17.599Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/v1695710168/blog/blocks_nmd9r3.png
---
webpack이나 vite로 앱을 빌드하면 모듈 파일들을 번들링해준다. 결과물로 나온 번들 파일을 분석하여 번들 사이즈를 줄이고 번들 최적화를 진행할 수 있다. 상용 앱을 대상으로 번들 분석과 최적화를 진행하였고, 공통 번들 사이즈를 **150kB(gzipped) 가량 감소**할 수 있었다. 이 포스트는 그 과정을 회고한 것이다. 앱마다 모듈도 다르고 환경도 달라 동일하게 적용하기는 어렵겠지만 이 글이 아이디어를 얻는 참고가 될 수 있으면 좋겠다.

## Next.js의 번들 분석기

웹팩을 사용하여 빌드된 파일은 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)라는 패키지를 사용해서 트리맵 구조로 시각화하여 분석할 수 있다. 이 패키지를 Next.js 앱에서 사용할 수 있도록 한 것이 Vercel에서 개발한 [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)다.

번들 분석은 사용자에게 전달되어 성능에 영향을 미치는 **클라이언트 번들**만 확인하였다. 번들 파일은 진입점(entrypoint)로 구분된다. 우선적으로 모든 페이지에 공통으로 포함되는 `pages/_app`을 위주로 살펴보고, 차순위로 각 페이지에 해당하는 진입점을 살펴보았다.

분석 방향을 정리하자면 아래와 같다.

1. 과도하게 큰 사이즈를 차지하는 모듈을 확인한다.
2. 불필요한 모듈이 포함되어 있는지 확인한다.

아래는 공통 번들 파일의 모듈 트리맵이다. 번들 분석 및 최적화를 진행하기 전과 후를 비교해보았다. 트리맵의 전체적인 구성이 바뀌었음을 알 수 있다.

### 번들 최적화 전

![번들 최적화 전 트리맵](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1695711471/blog/bundle-map-before_yr0gx0.png)

### 번들 최적화 후

![번들 최적화 후 트리맵](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1695711471/blog/bundle-map-after_wphm6w.png)

## 비즈니스 로직을 서버에서 처리하기

`productsHandler`는 서버에서 가져온 상품 데이터를 필터하고 정렬해주는 비즈니스 로직을 담당하는 함수다. 이 함수가 가공한 데이터는 정적인 페이지를 만드는 데 사용된다. 사실상 클라이언트에서 불필요한 모듈이다.

그런데 각 페이지의 트리맵을 확인해보니 `productsHandler`가 포함돼 있었다. 그 이유는 해당 모듈에서 리액트의 `useEffect` 훅을 임포트하여 사용하고 있었기 때문이다. Next.js는 이러한 경우를 [CSR](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering)로 처리한다.

모듈 자체의 크기가 크지는 않았지만 이 경우는 클라이언트 측에서 자바스크립트 연산을 수행하여 리소스가 낭비되는 것을 의미했다. **`productsHandler`에서 훅을 분리하고 `getStaticProps`로 해당 비즈니스 로직을 옮겼다.** 결과적으로 해당 모듈을 클라이언트 번들에서 제외하였고 필요한 연산이 서버에서 처리되게끔 수정하였다.

## 모듈을 필요한 곳에만 불러오기

페이지 A/B 테스트를 수행하기 위해 써드파티 모듈을 사용하고 있었는데 이 모듈이 공통 번들에 포함된 것을 알게 되었다. 하지만 A/B 테스트는 간헐적으로, 특정 페이지만을 대상으로 이루어지기 때문에 공통 번들에 들어갈 필요가 없었다. 

문제는 이 모듈의 provider가 `_app.page.tsx`에 속해 있었기 때문이다. 이것만 해도 gizip 기준 60kB를 차지하고 있었다. 번들 분석을 하기 전에는 간과하고 있던 모듈인데 분석을 통해 불필요하게 번들에 포함된 것을 발견하게 된 것이다.

해당 모듈을 _app.page.tsx에서 지우고 **HOC로 작성**하여 필요한 페이지에서만 임포트하여 사용할 수 있게끔 리팩토링했다.

## 무거운 라이브러리를 가볍게

이 밖에도 용도에 비해 사이즈가 큰 모듈들에 대해서 리팩토링을 진행했다. 아래에 나열한 모듈들은 gzip 사이즈가 30~80kB 정도 되었다. 순서대로 날짜 포매팅, 유틸 함수, reveal 애니메이션, 로딩 인디케이터에 사용하는 모듈인데 용도에 비해 큰 사이즈를 차지한다고 판단했다. 해결책으로 **더 가벼운 라이브러리로 교체하거나 리팩토링**을 진행했다.

1. moment → dayjs로 변경
2. lodash → lodash-es로 변경
3. [framer-motion 번들링 최적화](https://www.framer.com/motion/guide-reduce-bundle-size/)
4. lottie player 대신 css로 구현

## 최적화 결과

최적화를 진행한 결과 공통 번들의 파일 사이즈를 150kB(gzip) 가량 줄일 수 있었다.

### 최적화 전 번들 사이즈
![최적화 전 공통 번들 사이즈](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1695711470/blog/bundle-size-before_xdsor4.png)

### 최적화 후 번들 사이즈
![최적화 후 공통 번들 사이즈](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1695711470/blog/bundle-size-after_itbefz.png)

또한 특정 비즈니스 로직을 브라우저가 아닌 서버에서 처리하도록 하여 브라우저 렌더링 과정에서 리소스 낭비를 줄일 수 있었다.