---
layout: blog-post
title: "안녕하세요, 비살입니다"
date: 2026-07-14 12:00:00 +0900
lang: ko
translation_key: hello-from-bishal
tags:
  - introduction
  - research
excerpt: "영상과 시계열을 넘나든 4년간의 실험에서 배운 견고한 학습의 원리와 앞으로 나눌 내용을 소개합니다."
comments: true
---

<div class="blog-intro-profile">
  <img src="{{ '/images/bishal2.jpg' | relative_url }}" alt="비살 스와인" width="1080" height="1080">
  <div>
    <p>안녕하세요. <strong>비살(Bishal, ବିଶାଳ, 丕薩)</strong>입니다. 저는 한 가지 질문에 관심을 가진 컴퓨터 비전 연구자입니다. <strong>학습 시스템이 마주하는 환경이 변해도 어떻게 안정적인 성능을 유지할 수 있을까?</strong></p>
    <p>인도에서 컴퓨터 과학을 공부하고 국립대기연구소와 인도과학원에서 연구한 뒤, 대한민국 정부초청장학생으로 한국에 왔습니다. 현재 국립금오공과대학교에서 고재필 교수님의 지도 아래 박사과정 연구를 수행하고 있습니다.</p>
  </div>
</div>

## 4년, 하나의 반복되는 질문

박사과정 4년 동안 저는 주말을 포함해 하루도 쉬지 않고 매일 아침부터 밤까지 연구했습니다. 이것을 생산성 공식으로 말하려는 것은 아닙니다. 베이스라인 재현, 라벨 검토, 어블레이션 설계, 불안정한 학습 추적, 실패 후 재시작이 이 글들 뒤에 얼마나 깊이 쌓여 있는지 설명하기 위해서입니다.

연구는 의료 영상과 철강 미세조직에서 산업 검사, 기상 레이더, 일반 시계열까지 확장되었습니다. 그 결과는 MIDL, MICCAI, WACV, CVPR, ICANN의 연구로 이어졌지만, 다시 활용할 수 있는 교훈은 논문에 들어가지 못한 실험에서 더 자주 나왔습니다.

<div class="blog-visual-grid" aria-label="의료 영상, 재료 현미경, 기상 레이더 연구 사례">
  <figure>
    <img src="{{ '/images/projects/rhinitis/thumb.png' | relative_url }}" alt="초기 의료 영상 프로젝트에서 사용한 비강 내시경 영상" width="1008" height="572" loading="lazy">
    <figcaption>의료 영상</figcaption>
  </figure>
  <figure>
    <img src="{{ '/images/projects/steel/thumb.png' | relative_url }}" alt="모호한 텍스처와 상을 보여주는 철강 미세조직 영상" width="2048" height="996" loading="lazy">
    <figcaption>재료 현미경 영상</figcaption>
  </figure>
  <figure>
    <img src="{{ '/images/projects/klimax/klimax_thumb.png' | relative_url }}" alt="강우 예측에 사용된 기상 레이더 데이터" width="848" height="440" loading="lazy">
    <figcaption>레이더와 시계열</figcaption>
  </figure>
</div>

분야가 달라도 반복되는 구조는 놀랄 만큼 비슷했습니다.

<div class="blog-research-map" role="img" aria-label="연구 흐름: 영상과 시계열에서 분포 변화, 부족한 라벨, 모호성의 문제를 발견하고 맥락, 기억, 피드백을 연구합니다">
  <div class="blog-research-map__node">
    <span>데이터</span>
    <strong>영상 + 시계열</strong>
  </div>
  <span class="blog-research-map__arrow" aria-hidden="true">→</span>
  <div class="blog-research-map__node">
    <span>현실의 제약</span>
    <strong>분포 변화 + 부족한 라벨 + 모호성</strong>
  </div>
  <span class="blog-research-map__arrow" aria-hidden="true">→</span>
  <div class="blog-research-map__node">
    <span>연구 방향</span>
    <strong>맥락 + 기억 + 피드백</strong>
  </div>
</div>

그래서 저는 **분포 변화 상황에서의 학습**, 특히 해마와 대뇌피질의 상호작용에서 영감을 얻은 메모리 기반 모델을 연구합니다. 입력이 병리 영상이든 변화하는 신호이든 같은 질문으로 돌아갑니다. *모델은 무엇을 기억해야 하며, 그 기억은 다음 판단을 어떻게 바꿔야 하는가?*

## 독자가 얻을 수 있는 것

- **결과보다 의사결정:** 베이스라인 선택, 어블레이션 구성, 오해를 부르는 성능 향상을 발견하는 방법
- **남길 가치가 있는 실패:** 무엇이 실패했고, 원인을 어떻게 해석했으며, 다음 실험이 어떻게 달라졌는지
- **견고한 학습의 통찰:** 분포 변화, 연상 메모리, Liquid Neural Network, 분할, 파운데이션 모델 적응에서 얻은 실용적 교훈
- **도메인을 넘는 판단:** 의료·재료·산업·시계열 데이터 사이에서 무엇이 전이되고 무엇이 전이되지 않는지

측정 결과와 해석을 구분하고, 가정과 부정적 근거를 보여주며, 하나의 평균 점수를 넘어 평가하겠습니다. 목표는 단순합니다. 독자가 더 나은 다음 실험을 설계하도록 돕는 것입니다.

## 실험 너머의 활동

현재 **MICCAI Student Board 부회장**을 맡고 있으며, 이전에는 Social Events Officer로 활동했습니다. ICML 2026 Gold Reviewer 선정을 포함한 학회 리뷰와 한국에서의 지역사회 활동에도 꾸준히 참여해 왔습니다. TOPIK 5급의 언어 경험을 바탕으로 유용한 글은 영어와 한국어로 함께 나누겠습니다.

전체 이력은 [연구 및 프로젝트]({{ '/research/' | relative_url }}), [학력 및 학술 활동]({{ '/academics/' | relative_url }}), [교외 활동]({{ '/co-curriculars/' | relative_url }}) 페이지에 있습니다. 이 블로그에서는 그 결과 뒤의 판단과 과정을 설명하겠습니다.

여러분의 실험이 논문에서 기대한 대로 작동하지 않는다면, 이곳에서 함께 이유를 찾아보겠습니다.
