---
title: "Markdown에서 시작하는 연구 블로그"
date: 2026-07-14
lang: ko
translation_key: markdown-native-research-blog
tags:
  - research workflow
  - reproducibility
excerpt: "연구 노트를 일반 Markdown으로 관리하고, 두 언어 버전을 연결하며, 원문과 가깝게 유지하는 이유를 소개합니다."
---

연구 노트는 고치고, 인용하고, 다시 활용하기 쉬울 때 가장 유용합니다. 이 블로그의 각 글은 저장소 안의 작은 Markdown 파일이므로, 공개된 페이지와 원문이 항상 연결됩니다.

## 간단한 발행 과정

1. `blog-drafts/`의 영어·한국어 초안을 복사합니다.
2. 두 파일에 같은 `translation_key`를 넣고 각각 `_blog/en/`, `_blog/ko/`에 저장합니다.
3. Markdown으로 작성하고 필요한 태그를 추가한 뒤 저장소에 올립니다.

언어 전환기는 이 공통 키를 이용해 반대 언어의 글을 찾습니다. **Markdown 원본 받기** 버튼은 `master` 브랜치를 가리키므로, 글을 내려받아 주석을 달거나 오프라인에서 활용할 수 있습니다.

## 이곳에 적을 수 있는 것

실험에서 내린 결정, 논문을 읽은 경로, 재현성 점검표, 나중에 다시 볼 설명을 짧은 노트로 남겨 보세요. 완성된 논문이 아니어도 보존할 가치가 있는 생각은 많습니다.
