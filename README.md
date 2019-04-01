# Street Paper
# Introduction

**Street Paper**는 길을 가던 중 자신의 흔적을 남기고싶거나, 특정 장소에 문구를 남기고 싶을 때 사용자가 닉네임을 입력하여 자신의 현재 위치에 간단한 쪽지를 남길 수 있고, 다른 사람들이 익명으로 남긴 쪽지들도 볼 수 있는 서비스입니다.

<img width="200" src="https://user-images.githubusercontent.com/38285577/55359701-6d685280-550d-11e9-9e9d-3d5478e5a474.png">

## Prerequisites
- Node.js 설치

## Installation
```
git clone https://github.com/hyerinOh/street-paper.git
cd street-paper
npm install
npm run dev
```
## Features
- geolocation을 이용하여 현재위치에 쪽지 생성 기능
- mongoDB 쿼리 중 near를 사용하여 반경 1km 내의 쪽지 불러오기 기능
- Mapbox를 이용하여 지도와 마커 생성 기능 구현
- 닉네임 값을 리덕스에 저장시켜 쪽지생성 form에서 불러오기

## Client-side
- Babel을 통한 모던 자바스크립트 (ES2015+)
- React를 사용한 컴포넌트 베이스 UI 아키텍처 구현
- Redux 라이브러리를 사용한 state 관리

## Server
- 자바스크립트 엔진(V8 engine)기반의 서버사이드 플랫폼 Node.js
- 서버사이드에서는 Node.js가 권장하는 ES2015+
- Node.js 웹 어플리케이션 프레임워크 Express
- 대표적인 NoSQL 데이터베이스, MongoDB
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose
- MongoDB 호스팅 플랫폼인 mlab

## Test
- 자바스크립트 테스트 프레임워크 Jest, Enzyme

## Deployment
### Server
-  AWS Elastic Beanstalk

## Version control
- Branch, Pull Request 기반 개발 진행

## Images
### Sign In Page
<img width="200" src="https://user-images.githubusercontent.com/38285577/55359701-6d685280-550d-11e9-9e9d-3d5478e5a474.png">

### Map page
<img width="200" src="https://user-images.githubusercontent.com/38285577/55359883-e7004080-550d-11e9-924f-b406d46ca417.png">

### Creating a new paper
<img width="200" src="https://user-images.githubusercontent.com/38285577/55360249-c2f12f00-550e-11e9-942d-08d0c244ca5b.png">

### Displaying existed papers
<img width="200" src="https://user-images.githubusercontent.com/38285577/55360325-faf87200-550e-11e9-9026-4c33b37db478.png">
