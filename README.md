# 암호화폐 정보 조회 사이트

## 프로젝트 구조

기본적으로 컴포넌트(페이지)의 스타일과 기능을 분리했고 토스트 상태 관리를 위해 context를 사용했습니다.<br/>
그리고 반복되는 기능을 줄이기 위해 작성한 커스텀 훅은 별도의 폴더로 분리해서 관리하고 있고 전역적으로 사용되는 타입은 types.ts 파일에서 관리했습니다.

```
├── components
│   │   component
│   │   │   index.ts
│   │   │   Component.css.ts
│   └── └── Component.tsx
├── pages
│   │   page
│   │   │   Page.css.ts
│   └── └── Page.tsx
├── contexts
├── hooks
├── types.ts
└── ...
```

## 실행 방법

```shell
yarn -v // 1.22.19
yarn install
yarn start // http://localhost:5173
```

## 기술 스택

- react
- typescript
- react-router-dom
- react-query (서버 상태를 편하게 관리하기 위해 사용)
- emotion (스타일 관리를 위해 사용)

## 커밋 규칙

| 타입     | 설명        |
| -------- | ----------- |
| feat     | 기능 개발   |
| fix      | 버그 수정   |
| refactor | 기능 개선   |
| chore    | 패키지 관리 |
| docs     | 문서 작업   |
