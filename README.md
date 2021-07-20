
# 나의 첫 스프링부트!

## 목적
- 스프링 부트로 나만의 홈페이지 만들기!

## 목차
1. 스프링 부트와 MVC 패턴
2. 게시판 만들기
    - 등록(Create)
    - 조회(Read)
    - 수정(Update)
    - 삭제(Delete)
   
## 레이아웃 나누기
1. 레이아웃
   - 화면을 구분하여 배치하는 것. 이를 레이아웃(layout)이라 한다.
     웹 페이지는 반복되는 부분이 존재하는데, 이를 파일로 나누면 좋다.
     이를 통해 코드의 중복을 줄일 수 있다.
     
   -header
   -content
   -footer
   
2. 뷰나누기
   - header 생성 : "templates/layouts/header.mustache"
   - footer 생성 : "templates/layouts/footer.mustache"
   - 기존 파일 변경 : "templates/articles/index.mustache"