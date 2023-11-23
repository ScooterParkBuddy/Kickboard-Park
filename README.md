## \[Front-End] 전동킥보드 주차구역 위치 알림 서비스

<p align="center"><img src="https://github.com/ScooterParkBuddy/Kickboard-Park/assets/126869993/7994b49b-d66e-4c4d-a3f3-3d4d99b21343" style="width: 80%" /></p>

</br></br></br>

### 사용자 요구 사항
---
<p align="center"><img src="https://github.com/ScooterParkBuddy/Kickboard-Park/assets/126869993/0aade0b0-5c8b-4a8a-8a8a-3a60b939cd05" style="width: 60%" /> </p>

</br></br></br>

### 구현 기능
---
- `사용자의 현재 위치 저장`

```javascript
import useGeolocation from 'react-hook-geolocation';
const geolocation = useGeolocation();
```
- `네이버지도 API로 지도 생성`
  - 사용자의 현재 위치 정보를 지도의 중심으로 설정
    
- `전체 주차 공간 정보로 마커 생성`
  - 마커 클릭 시 주차 공간 정보창 띄움
    
- `사고 다발 구간 원 생성`
    - 위험도 설정(숫자가 클수록 위험을 의미)
      
- `자전거 레이어 생성`
    - 버튼으로 생성, 삭제 가능
      
- `위치 검색`
  - 검색 결과 클릭 시 지도의 중심이 해당 위치로 이동
    
- `예상 금액, 소요 시간 검색`
  - 예상 거리, 시간 API를 이용해 금액 계산
  - 지쿠터, 킥고잉, 스윙, 알파카, 빔, 다트, 씽씽, 디어 총 8개 업체의 주간 요금을 기준으로 분당 가격을 계산함
    
<p align="center"><img src="https://github.com/ScooterParkBuddy/Kickboard-Park/assets/126869993/4731cf9c-1014-4496-9d14-c647acce14d4" style="width: 50%" /> </p>

- `로그인`

    - 카카오 로그인 구현
    - 닉네임 저장
    - 받은 인가코드를 서버에 넘겨주고 토큰 정보를 받음
    - 받은 AccessToken을 loginAxios의 헤더로 설정(커뮤니티 접근 시 필요)
      
<p align="center"><img src="https://github.com/ScooterParkBuddy/Kickboard-Park/assets/126869993/11aaa860-fd99-41bc-8130-9c1bdc5a3c2e" style="width: 50%" /></p>

- `커뮤니티`

    - 게시판 이동
    - 글 작성
    - 글 수정
    - 글 삭제
    - 댓글 작성

<p align="center"><img src="https://github.com/ScooterParkBuddy/Kickboard-Park/assets/126869993/fa9733db-88d8-4fb5-8cb6-7d68662c37f6" style="width: 80%" /></p>

