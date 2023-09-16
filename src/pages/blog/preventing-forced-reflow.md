---
templateKey: blog-post
title: 강제 리플로우 방지
tags:
  - Performance
  - Web Vitals
date: 2023-09-15T08:02:51.591Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/v1694765950/blog/bottleneck_lckryb.webp
---
브라우저 렌더링 과정 중 레이아웃(layout)은 요소의 크기와 페이지 내 위치 등 요소의 기하학적 정보를 파악하는 곳이다. 이 프로세스를 레이아웃 혹은 리플로우라고 한다.

브라우저가 일반적인 경로를 벗어나 레이아웃 프로세스를 강제로 수행하기도 하는데 이를 **강제 리플로우(forced reflow)** 혹은 **forced synchronous layout**이라고 한다. 그리고 강제 리플로우가 빠르게 연속해서 실행되는 것을 **layout thrashing**이라고 한다.

## 가급적 레이아웃을 최소화하자

[우선은 가급적 레이아웃을 피하는 것이 바람직하다](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/#avoid-layout-wherever-possible)는 것을 짚고 넘어가자. 

레이아웃은 인터랙션 지연에 직접적인 영향을 끼친다. 또한 레이아웃은 거의 항상 전체 doument에 스코프되어 있기 때문에 레이아웃이 발생할 때마다 전체 문서를 다시 계산해야 한다. 그래서 가급적이면 레이아웃을 피하는 것이 좋다.

## 강제 리플로우란?

강제 리플로우는 병목을 일으켜서 웹성능을 저하시키는 주된 요인이다. 이는 돔(DOM)을 변경(mutation)한 다음에 돔을 측정(measurement)할 때 발생한다.

브라우저는 JS, HTML, CSS 파일을 받아서 렌더링 사이클을 반복하여 화면을 그린다. 일반적인 경로는 아래와 같다.

![다이어그램](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1694785730/blog/pixel-pipeline_m6v6oh.avif)

출처: https://web.dev/rendering-performance/

그런데 자바스크립트 단계에서 레이아웃 계산을 함께 수행하는 경우가 있다. 이를 강제 리플로우라고 한다. 결과적으로 스타일과 레이아웃 계산을 이중으로 처리하게 되고 자바스크립트 실행시간도 길어진다.

## 강제 리플로우, 왜 생길까?

리플로우는 자바스크립트가 돔을 변경한 다음에 돔을 측정할 때 발생한다. 예를 들어 아래처럼 돔 요소의 너비를 변경한 다음에 해당 요소의 너비 값을 측정하는 경우다.

```javascript
  elem.classList.add('large-width');
  console.log(elem.clientWidth);
```

브라우저는 이전 프레임(frame)에서 계산된 레이아웃 값을 기억하고 있다. 그래서 돔 요소의 사이즈나 위치를 쿼리하면 이전에 캐시된 값을 참조할 수 있게 된다. 그런데 돔을 변경하면(ex 요소 삽입, 사이즈나 위치 수정) 이전에 계산한 레이아웃 캐시가 더이상 유효하지 않게 된다. 이제 정확한 `clientWidth` 값을 알아내려면 업데이트된 돔을 반영하도록 스타일과 레이아웃 계산을 수행해야 하는 것이다. 이것이 강제 리플로우다.

아래 스크린샷을 보면 노란색 자바스크립트 단계에서 보라색으로 표시된 스타일과 레이아웃을 수행하고 있음을 확인할 수 있다.

![스크린샷](https://res.cloudinary.com/dftuawd1d/image/upload/f_auto,q_auto/v1694788648/blog/forced-reflow-screenshot_mysg1l.png "자바스크립트 단계에서 스타일과 레이아웃 수행")

단지 돔 요소의 너비를 알아내려고 했을 뿐인데 브라우저는 전체 돔을 재계산해야 되는 것이다. 불필요할 뿐만 아니라 병목을 일으킬 여지가 있다.

돔을 읽는 동작은 이밖에도 박스 모델 측정(`elem.getBoundingClientRect`), 스크롤 관련(`elem.scrollIntoView()`), 윈도우 측정(`window.scrollY`) 등이 있다. 상세한 내용은 [여기](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)를 참조하면 된다.

## 강제 리플로우를 방지하려면?

이러한 이유로 돔을 먼저 읽은 다음에 쓰기를 수행해야 한다.

그런데 불가피하게 돔을 변경한 후에 측정이 필요한 경우도 있을 것이다. 그러한 경우에는 돔 읽기 동작을 `setTimeout`이나 `requestAnimationFrame`의 콜백으로 등록하여 돔 읽기 태스크를 쓰기 태스크와 분리하는 방법이 있다. 등록한 콜백은 브라우저의 이벤트 루프에서 각각 매크로 태스크 큐와 애니메이션 프레임에 적재된다.

## 참조

* [What forces layout](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
* [Avoid large, complex layouts and layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)