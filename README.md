# Kiosk ADMIN 페이지 

- 기간 : 2024.02 ~ 2024.04
- 배포 URL : https://admin-khaki-delta.vercel.app/
- Test ID : 전체 관리 - test / 일반 관리 - test1, test2, test3
- Test PW : 0000

<br /><br />

## 💁‍♂️ 프로젝트 소개

  ![만두집_배민](https://github.com/aksen123/admin/assets/126546293/3295b584-0a36-48f2-a441-63b1a0ba862f)

  - Kiosk ADMIN은 키오스크가 설치되는 지점과 메뉴들을 관리하는 사이트 입니다.
  - 이전 만두집 장사 할 때 내가 본사면서 체인점을 낸다면 이런식으로 관리 해볼수 있었을까? 라는 생각을 시작으로 만들 었습니다.
  - 전체관리, 각 지점 일반관리 권한으로 나눠 각 권한에 따라서 관리 할 수 있게 만들었습니다.
  - 관리 페이지에서 메뉴를 수정 Kiosk 메뉴에 반영됩니다.
  - Kiosk에서 주문시 해당 지점의 관리페이지에서 주문을 확인, 접수 할 수 있습니다.

### [Kiosk 페이지 Github](https://github.com/aksen123/kiosk)
  
<br /><br />

## 💻 개발 환경
- Front : NextJS, ,Typescript, Tailwind CSS, Recoil
- Back-end : NextJS API Routes Server
- DB : FireStore
- 버전 및 이슈관리 : Github, Github Issues
- 배포 환경 : Vercel


<br /><br />

## 🧑‍💻 사용 기술과 브랜치 전략

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

## 🗂️ 프로젝트 구조
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

## 💡 주요 기능 

  - 첫 페이지 로그인 기능 ( 로그인 권한별 페이지 분기 )
  - 지점 관리
    - 메뉴 관리
    - 매출 달력
  - 지점 추가

<br /><br />
## 📒 페이지 별 기능 

<br />

### 로그인 페이지
- 초기 화면으로 로그인 페이지가 나타납니다.
  - 로그인이 되어있는경우 : /dashboard 페이지로 이동
  - 로그인이 안 되어있는 경우 : 로그인 페이지
- 로그인 버튼 클릭시
  - 아이디, 비밀번호가 없거나 틀릴시 각각에 대한 에러메시지를 경고창으로 띄워 줍니다.
  - 아이디 입력란에 한글을 입력하면 입력창 하단에 문구가 경고 문구가 나타납니다.

|아이디가 없을시|비밀번호 틀릴시|
|:-----:|:-----:|
|![id](https://github.com/aksen123/admin/assets/126546293/e10b617b-d65b-4d74-8450-cc592416d1d0)|![pw](https://github.com/aksen123/admin/assets/126546293/1ec62660-e240-49b3-9cfc-17029af2ba37)|
|한글 입력시|   |
|![ko](https://github.com/aksen123/admin/assets/126546293/127937b7-41ae-461e-9c03-fb455c4f01f7)|  |

<br />

### 로그인 후 첫 화면 ( 대시보드 )
- 권한별 대시보드 화면으로 넘어오게 됩니다.
  - 전체 관리 : 금일 전체 지점 매출 현황 확인이 가능합니다
  - 일반 관리 : 주문 접수, 확인이 가능합니다
  
|전체 관리|일반 관리|
|-----|-----|
|![all](https://github.com/aksen123/admin/assets/126546293/6eb40b2e-2e56-4e26-a87e-285c07be3d71)|![one](https://github.com/aksen123/admin/assets/126546293/191dd0e4-c978-4014-84ca-3e7488251d4c)|


<br />

### 메뉴관리 페이지

- 메뉴관리 페이지에선 Kiosk에서 보여질 메뉴 `추가/수정/삭제`가 가능하며, 메뉴의 순서도 설정 가능 합니다. ([SortableJS](https://aksen123.github.io/M_W_blog/docs/%EA%B3%B5%EC%B1%85/sortableJS)를 활용했습니다.)
- 메뉴의 품절, 활성화를 설정 할 수 있습니다. 품절 Kiosk에서 품절표시, 비활성화시 Kiosk에서 안보이게 됩니다.
  - 전체 관리 : 기본 메뉴를 관리할 수 있습니다 이곳에서 추가,수정한 메뉴는 전지점 메뉴에 반영 됩니다.
  - 일반 관리 : 기본 메뉴외 지점 만의 메뉴를 추가,수정, 삭제 할 수 있습니다.

<br />

|메뉴 추가|
|:-----:|
|![add](https://github.com/aksen123/admin/assets/126546293/a217502e-1946-4783-875b-295168281ab1)|
|메뉴 위치 수정|
|![correction](https://github.com/aksen123/admin/assets/126546293/569c95e4-974e-443a-9444-f5977b0ce2f5)|
|품절, 활성화|
|![correction](https://github.com/aksen123/admin/assets/126546293/4d16d6d8-0fe3-44d1-af10-1eaeb72a605d)|
|메뉴 삭제|
|![del](https://github.com/aksen123/admin/assets/126546293/2a93f1b2-82a2-477d-b4f3-932f2b60708d)|



### 매출 달력 페이지

- 해당 지점의 매출을 월 단위로 확인 가능한 페이지 입니다.
- 전달 매출과 비교해 변화율도 표시했습니다.
- 원하는 날짜 클릭시 해당 날짜의 주문, 매출을 확인 할 수 있습니다.
  - 해당 날짜의 매출이 없으면 애니메이션을 띄워 줍니다. ([Lottie](https://aksen123.github.io/M_W_blog/docs/%EA%B3%B5%EC%B1%85/Lottie)를 활용했습니다.)

<br />

![calendar](https://github.com/aksen123/admin/assets/126546293/78611cdd-904c-4918-84fe-7866738952f6)


<br />

### 지점 추가 ( 전체 권한 )

- 새로운 지점을 추가하는 페이지 입니다.
- 회원가입은 따로 없이 본점에 서류를 제출하면 본점에서 추가하는 컨셉으로 만들었습니다.
- `react-hook-form`을 활용해 각 항목 유효성 검사 후 모두 통과되면 db에 저장 하는 방식으로 만들었습니다.
- API에서 지점명, 아이디가 중복되면 경고창을 띄워 줍니다.
- 지점이 추가 되면 전체관리로 로그인한 페이지 사이드 바에 추가한 지점이 바로 추가 됩니다.

  ![addstore](https://github.com/aksen123/admin/assets/126546293/85f87437-88db-4f77-9954-09ee219e0cfb)


<br /><br />

## 👨‍🔧 개선해야 할 점 / 기능 고도화

- 데이터 로딩시 Loading Spinner
- 로그인 작동 상태 표시
- 로그아웃 확인 대화상자
- 타임존 불일치 : 매출달력 - 개발환경과 배포 페이지에서 날짜가 다르게 표시됨
- 통계, 차트 페이지 추가
- 지점 추가 페이지 : 주소 API 추가
