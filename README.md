# Kiosk ADMIN 페이지 

- 기간 : 2024.02 ~ 2024.04
- 배포 URL : https://admin-khaki-delta.vercel.app/
- Test ID : 전체 관리 - test / 일반 관리 - test1, test2, test3
- Test PW : 0000

<br /><br />

## 프로젝트 소개 

  - Kiosk ADMIN은 키오스크가 설치되는 지점과 메뉴들을 관리하는 사이트 입니다.
  - 이전 만두집 장사 할 때 내가 본사면서 체인점을 낸다면 이런식으로 관리 해볼수 있었을까? 라는 생각으로 만든 페이지 입니다.
  - 전체관리, 각 지점 일반관리 권한으로 나눠 각 권한에 따라서 관리 할 수 있게 만들었습니다.
  - 관리 페이지에서 메뉴를 수정 Kiosk 메뉴에 반영됩니다.
  - Kiosk에서 주문시 해당 지점의 관리페이지에서 주문을 확인, 접수 할 수 있습니다.
  
<br /><br />

## 1. 개발 환경
- Front : NextJS, ,Typescript, Tailwind CSS, Recoil
- Back-end : NextJS API Routes Server
- DB : FireStore
- 버전 및 이슈관리 : Github, Github Issues
- 배포 환경 : Vercel


<br /><br />

## 2. 사용 기술과 브랜치 전략

### Next.js
 -  파일 기반 라우팅, API Routes 등 편리한 기능을 사용하여 개발 생산성을 높일 수 있다는점과  특히 API Routes 기능을 통해 API를 쉽게 작성하고 관리할 수 있어 선택했습니다.

### Typescript
 - 코드에서 잠재적인 오류를 미리 발견 할 수 있고 

### TailwindCSS 
- CSS를 직접 작성하지 않고도  `text-center`나 `bg-blue-500` 같은 미리 정의된 클래스를 사용하여 빠르게 스타일을 적용해 생산성을 향상 시킬 수있어 선택했습니다.

### Recoil 
- React와 호환성이 좋고, 기존 useState 훅을 사용하는 방식과 유사하다는 점과, Redux보다 사용법이 간단하다는 점에서 선택했습니다. 

### Firebase 
- Firestore와 Cloud Storage를 사용해 실시간 데이터베이스 통해 데이터를 저장, 동기화 하고 사용자가 올린 이미지 파일을 저장하기 위해 선택 했습니다.  


### 브랜치 전략
- 기능별 Github Issue를 생성한뒤 생성된 Issue 번호로 브랜치를 만들고, 해당 브랜치의 작업이 끝나면 PR을 올려 Main 브랜치에 merge 하는 방식으로 개발 했습니다.

<br /><br />

## 3.프로젝트 구조
<details>
  
  ```
📦src
 ┣ 📂app
 ┃ ┣ 📂addStore
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂chart
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂menu
 ┃ ┃ ┃ ┣ 📂[slug]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┣ 📂date
 ┃ ┃ ┃ ┃ ┗ 📂[slug]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂[slug]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂sales
 ┃ ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂sort
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂store
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂atoms
 ┃ ┃ ┣ 📜calendar-atom.ts
 ┃ ┃ ┣ 📜modal-atom.ts
 ┃ ┃ ┗ 📜RecoilWrapper.tsx
 ┃ ┣ 📂chart
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂Components
 ┃ ┃ ┣ 📂animations
 ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┗ 📜NoSales.tsx
 ┃ ┃ ┣ 📂aside
 ┃ ┃ ┃ ┣ 📜Admin.tsx
 ┃ ┃ ┃ ┣ 📜Aside.tsx
 ┃ ┃ ┃ ┗ 📜Super.tsx
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📜Admin.tsx
 ┃ ┃ ┃ ┣ 📜Card.tsx
 ┃ ┃ ┃ ┗ 📜Super.tsx
 ┃ ┃ ┣ 📂chart
 ┃ ┃ ┃ ┣ 📜Chart.tsx
 ┃ ┃ ┃ ┗ 📜ChartBoard.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📂popup
 ┃ ┃ ┃ ┃ ┗ 📜AddFoodPopup.tsx
 ┃ ┃ ┃ ┣ 📜Alert.tsx
 ┃ ┃ ┃ ┣ 📜Confirm.tsx
 ┃ ┃ ┃ ┣ 📜GlobalComponent.tsx
 ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜LoginPage.tsx
 ┃ ┃ ┣ 📜Management.tsx
 ┃ ┃ ┣ 📜Sales.tsx
 ┃ ┃ ┗ 📜Table.tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useUserInfo.ts
 ┃ ┣ 📂management
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂sales
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂service
 ┃ ┃ ┣ 📜axios.ts
 ┃ ┃ ┣ 📜base64.ts
 ┃ ┃ ┣ 📜chart.ts
 ┃ ┃ ┣ 📜firebase.ts
 ┃ ┃ ┣ 📜foods.ts
 ┃ ┃ ┣ 📜login.ts
 ┃ ┃ ┣ 📜order.ts
 ┃ ┃ ┣ 📜sales.ts
 ┃ ┃ ┗ 📜store.ts
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┗ 📂types
 ┃ ┣ 📜allTypes.d.ts
 ┃ ┣ 📜enum.ts
 ┃ ┗ 📜service.ts
```
</details>



<br /><br />

## 4. 주요 기능 

  - 첫 페이지 로그인 기능 ( 로그인 권한별 페이지 분기 )
  - 지점 관리
  - 메뉴 관리
  - 지점 추가
  - 매출 확인

<br /><br />
## 5. 페이지 별 기능 

### 초기화면
- 초기 화면으로 로그인 페이지가 나타납니다.
  - 로그인이 되어있는경우 : /dashboard 페이지로 이동
  - 로그인이 안 되어있는 경우 : 로그인 페이지
- 로그인 버튼 클릭시
  - 아이디, 비밀번호가 없거나 틀릴시 각각에 대한 에러메시지를 경고창으로 띄워 줍니다.
  - 아이디 입력란에 한글을 입력하면 입력창 하단에 문구가 경고 문구가 나타납니다.

