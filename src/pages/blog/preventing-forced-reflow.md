---
templateKey: blog-post
title: Preventing Forced Reflow
tags:
  - Performance
  - Web Vitals
date: 2023-09-15T08:02:51.591Z
featuredimage: https://res.cloudinary.com/dftuawd1d/image/upload/v1694765950/blog/bottleneck_lckryb.webp
---
## Forced Reflow란?

강제 리플로우(Forced Reflow 혹은 Layout Thrashing)는 병목을 일으켜서 웹성능을 저하시키는 주된 요인이다. 이는 돔(DOM)을 변경(mutation)한 다음에 돔을 측정(measurement)할 때 발생한다.

브라우저는 JS, HTML, CSS 파일을 받아서 렌더링 사이클을 반복하여 화면을 그린다. 일반적인 Critical Rendering Path(CRP)는 아래와 같다.

JavaScript > Style > Layout > Paint > Composite

그런데 자바스크립트 단계에서 스타일과 레이아웃 계산을 수행하는 경우가 있다. 자바스크립트 작업을 마치고 나면 나머지 작업을 처리한다. 이에 따라 스타일과 레이아웃 계산을 이중으로 처리하게 되고 자바스크립트 실행시간도 길어진다. 이를 Forced Reflow라고 한다.

## 강제 리플로우는 어떻게 발생할까?

리플로우는 자바스크립트가 돔을 변경한 다음에 돔을 측정할 때 발생한다. 예를 들어 아래처럼 돔 요소의 너비를 변경한 다음에 해당 요소의 너비 값을 측정하는 경우다.

```javascript
  elem.classList.add('large-width');
  console.log(elem.clientWidth);
```

돔의 사이즈나 위치를 알아내려고 하면 대개는 이전에 계산해둔 값을 참조하게 된다. 그런데 돔을 변경하면(ex 요소 삽입, 사이즈나 위치 수정) 브라우저는 이전에 계산한 레이아웃 캐시(layout cache)가 더이상 유효하지 않은 것으로 판단하고 재계산(recalculation)을 예약한다. 단지 돔 요소의 사이즈를 알아내려고 했을 뿐인데 브라우저는 전체 돔을 재계산해야 되는 것이다. 이것이 리플로우다.

돔 측정은 이밖에도 박스 모델 측정(`elem.getBoundingClientRect`), 스크롤 관련(`elem.scrollIntoView()`), 윈도우 측정(`window.scrollY`) 등이 있다. 상세한 내용은 [여기](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)에 잘 정리돼 있다.

## 강제 리플로우를 방지하려면?
동일한 CRP 안에서 돔 변경 후에 돔 측정을 하지 않으면 된다. 예를 들어 순서를 바꿔서 먼저 측정을 하고 이후에 변경할 수 있다.

그런데 무조건 돔을 변경한 후에 측정이 필요한 경우도 있을 것이다. 그러한 경우에는 `setTimeout`이나 `requestAnimationFrame`을 사용하여 돔 측정을 돔 변경과 다른 CRP에서 수행하도록 지연시킬 수 있다.

## 참조
- [What forces layout](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)