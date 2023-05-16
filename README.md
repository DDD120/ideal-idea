# [ideal idea](https://ideal-idea.vercel.app/)

![Room 페이지](https://user-images.githubusercontent.com/74492479/229423909-d459c87b-ef04-4aa8-8d27-889ebe10be2e.png)

## 프로젝트 소개

최대 4명의 사용자들이 실시간으로 캔버스를 공유하며 이상적인 아이디어를 창출할 수 있는 서비스

- 실시간 캔버스 선, 도형 그리기 기능
- 실시간 채팅 메시지 기능

[Blog 글](https://ddd120.tistory.com/57)

## 기술 스택

### Front-end

Next, TypeScript, Tailwind CSS, Socket IO, Three.js

### Back-end

Nest, Socket IO

### Deploy

GitHub Pages, Github Actions, Google App Engine

## 구현 기능

### Main Page

![Main 페이지](https://user-images.githubusercontent.com/74492479/229423798-23b776a5-a7d8-479a-bbb6-45d1ce7e42f8.png)

- Three.js를 사용한 3D 화면 구성

### Room Page

![Room 페이지](https://user-images.githubusercontent.com/74492479/229423909-d459c87b-ef04-4aa8-8d27-889ebe10be2e.png)

- Socket IO를 이용한 실시간 캔버스, 채팅 기능
- 캔버스 드로잉 기능
  - 도형 (사각형, 원, 직선) 그리기
  - 펜, 지우개, 마커 기능
  - 크기, 색상, 전체 지우기 기능
  - 이미지 저장 기능
- 채팅 메시지 전송 기능
