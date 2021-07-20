
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
   
## 게시판 만들기
   
### 1. 데이터 등록(create)

---

#### 1) 등록 페이지 만들기
<hr>


   __개념 : form 태그__

      - 서버로 데이터를 전송할 때 사용하는 태그. 바로 form 태그다.
      - 폼 태그는 두 핵심 속성을 통해 서버로 데이터를 전송한다.
      - 이들을 어디로 보낼지, 어떻게 보낼지에 대한 정보를 가진다.
   ```html
   <form action="보내질-주소-url" method="보낼-방법">
   ...
   </form>
   ```

   __튜토리얼 : 1. 뷰 페이지__
   1) 등록 페이지 설정 : "articles/new.mustache"
   ```html
   {{>layouts/header}}

   <div class="jumbotron">
      <h1>Article 등록</h1>
      <hr>
      <p>articles/new.mustache</p>
   </div>
   
   <form class="container">
      <div class="form-group">
         <label for="title">제목</label>
         <input type="text" class="form-control" id="article-title" placeholder="제목을 입력하세요">
      </div>
   
      <div class="form-group">
         <label for="content">내용</label>
         <textarea class="form-control" id="article-content" placeholder지="내용을 입력하세요" rows="3">
           </textarea>
      </div>
   
      <button type="submit" class="btn btn-primary">제출</button>
   
   </form>

{{>layouts/footer}}
   ```
__튜토리얼 : 2. 컨트롤러__
2) url 요청과 뷰 페이지를 연결 : "controller/ArticleController#newArticle"
   
```java

@Controller
public class ArticleController {

    ...

    @GetMapping("/articles/new") // GET 요청이 해당 url로 오면, 아래 메소드를 수행!
    public String newArticle(){
        return "articles/new"; // 보여줄 뷰 페이지
    }

}
   ```

__튜토리얼 : 3. 확인하기__
3) 브라우저 접속 : "localhost:8080/articles/new"

---

#### 2) 폼데이터 주고 받기 


#### 미션

데이터 전송 미션! 폼 태그 제출(submit)하고,
그 값을 확인하시오.

#### 개념

__⭐️ HTTP 프로토콜 리뷰__

* GET : 데이터 조회 요청
* POST : 데이터 생성 요청
* PUT/PATCH : 데이터 수정 요청
* DELETE : 데이터 삭제 요청

__⭐️ form 태그 주요 속성__

데이터 전송을 위한 form 태그. 주요 속성은 "method"와 "action"이다.

```html
<!-- method : HTTP의 요청 방식을 결정. get/post 가능 -->
<!-- action : 데이터가 전송될 도착지 URL -->
<form method="post", action="/articles">
   ...
</form>
```

__⭐️ DTO__

폼 데이터를 서버에서 사용하려면, 객체로 만들어야 한다. 이를 위해 DTO(Data Transfer Object)가 필요하다.

__⭐️ 데이터 로그 남기기__  

서버는 24시간 돌아간다. 문제는 언제, 어떤 문제가 발생할 지 모른다는 것. 이러한 이유로 데이터 로깅(logging)은 필수다. 
이는 자동차의 블랙박스와 같다. 문제 발생까지의 상황을 데이터로 기록하는 것이다.
 이를 분석하여 문제 발생 원인과 그 해결책을 마련할 수 있다.


#### 튜토리얼

__⭐️ 사용파일__  
- ArticleController
- ArticleForm
- new.mustache

__⭐️ 뷰페이지__ 
1) form 태그 정보 추가 : articles/new.mustache

```html
{{>layouts/header}}
<div class="jumbotron">
    <h1>Article 등록</h1>
    <hr>
    <p>articles/new.mustache</p>
</div>
<!-- Form 태그, 아래 두 속성을 추가!
    method : HTTP 방식을 설정(GET/POST/...)
    action : 데이터를 보낼 url 주소지
-->
<form class="container" method="post" action="/articles">
    <div class="form-group">
        <label for="author">작성자</label>
        <!-- name="author" 추가, DTO의 필드명과 일치해야함! -->
        <input name="author" type="text" class="form-control" id="article-title" placeholder="작성자를 입력하세요">
    </div>
    <div class="form-group">
        <label for="title">제목</label>
        <!-- name="title" 추가, DTO의 필드명과 일치해야함! -->
        <input name="title" type="text" class="form-control" id="article-title" placeholder="제목을 입력하세요">
    </div>

    <div class="form-group">
        <label for="content">내용</label>
        <!-- name="content" 추가, DTO의 필드명과 일치해야 함! -->
        <textarea name="content" class="form-control" id="article-content" placeholder지="내용을 입력하세요" rows="3"></textarea>
    </div>

    <button type="submit" class="btn btn-primary">제출</button>

</form>

{{>layouts/footer}}
```

__⭐️ 컨트롤러__
2) 폼 태그 처리 메소드 추가: controller/ArticleController

```java
@Slf4j // 로깅(logging) 기능 추가! Lombok 플러그인 설치 필요!
@Controller
public class ArticleController {

    ...

    @PostMapping("/articles") // Post 방식으로 "articles" 요청이 들어오면, 아래 메소드 수행!
    public String create(ArticleForm form) { // 폼 태그의 데이터가 ArticleForm 객체로 만들어 짐!
        log.info(form.toString()); // ArticleForm 객체 정보를 확인!
        return "redirect:/articles"; // 브라우저를 "/articles" url로 보냄!
    }
}
```

__⭐️ DTO__
3) 데이터 전송 객체 만들기: "dto/ArticleForm"

```java
package com.example.myblog.dto;

public class ArticleForm {

    private String author;
    private String title;
    private String content;

    public ArticleForm(String author, String title, String content){
        this.author = author;
        this.title = title;
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "ArticleForm{" +
                "author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}

```


__⭐️ Lombok 플러그인 설치__
4) Ctrl + Shift + A > plugins 


__⭐️ 결과 확인__
5) 폼 데이터 전송(localhost:8080/articles/new)


6) 서버 로그 확인 ArticleForm{author='김영진', title='분양 상담신청', content='연락요망' }


7) 혹시 한글이 깨진다면?__
인텔리제이 VM, 프로젝트 파일 인코딩, 톰캣의 인코딩을 "utf-8"로 적용하자.
   
- 폼 태그의 역할?
    * 서버로 데이터를 전송할 때 사용하는 태그 
    * 폼 태그는 두 핵심 속성(method, action)을 통해 서버로 데이터를 전송한다.
    * 이들을 어디로 보낼지(action), 어떻게 보낼지(method)에 대한 정보를 가진다.

- DTO는 무엇이고 왜 필요한가?
    * form 데이터를 담을 DTO가 필요하다.
    * 폼 데이터를 서버에서 사용하려면, 객체로 만들어야 한다.
    
- 데이터 로깅은 왜 사용?
    * 서버는 24시간 돌아간다. 문제는 어떤 문제가 발생하는지 모른다는 것.
    이러한 이유로 데이터 로깅(logging)은 필수다. 이는 자동차 블랙박스와 같다.
      문제 발생 까지의 상황을 데이터로 기록하는 것이다. 이를 분석하여
      문제 발생 원인과, 그 해결책을 마련할 수 있다.

#### 3) 폼(form) 데이터, Ajax로 주고 받기
#### 미션

폼 데이터를 Ajax 방식으로 서버에 전달하여,

해당 데이터의 로그를 확인하시오.(JSON 데이터 잘 받아오는지)

#### 개념

__⭐️ Ajax 무엇, 왜씀?__

JS