
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

## 1) 등록 페이지 만들기



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

## 2) 폼데이터 주고 받기 


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

## 3) 폼(form) 데이터, Ajax로 주고 받기
#### 미션

폼 데이터를 Ajax 방식으로 서버에 전달하여,

해당 데이터의 로그를 확인하시오.(JSON 데이터 잘 받아오는지)

#### 개념

__⭐️ Ajax 무엇, 왜씀?__

JS를 사용한 비동기적 통신 기법. 이를 Ajax라 한다. Ajax를 사용하면,
 신속한 데이터 변경이 가능하다. 가령 1만줄짜리 웹페이지 중, 단 한 데이터가
 바뀌는 상황이라 하자. Ajax를 사용하면, 정확히 해당 데이터만 바꿀 수 있다.
 반면, 일반 웹페이지 요청은 전체 페이지를 읽는 낭비가 발생한다.

__⭐️ JSON__

Ajax 통신 시, 데이터는 JSON 형식으로 주고 받게 된다.
JSON(JavaScript Object Notation)이란, 데이터를 자바스크립트 객체로 표현한 것이다.

```javascript
// article 객체 표현 예
{
    author: "송우기",
    title: "오늘은...",
    content: "치킨을 뜯고 싶어라..!"
}
```
__⭐️ API 컨트롤러__

서버 데이터를 JSON에 담아 API로 주고 받는 컨트롤러. 이를 API 컨트롤러, 다른 표현으로 REST 컨트롤러라 한다.
이를 위한 어노테이션이 @RestController이다.

#### 튜토리얼

__⭐️ 뷰 페이지__

1) 페이지 수정 : "articles/new"
```html
{{>layouts/header}}
<div class="jumbotron">
    <h1>Article 등록</h1>
    <hr>
    <p>articles/new.mustache</p>
</div>
<!-- Form 태그,
    기존 속성 method와 action을 삭제!
    왜? JS로 보낼거니까!
-->
<form class="container">
    <div class="form-group">
        <label for="author">작성자</label>
        <!-- name="author" 추가, DTO의 필드명과 일치해야함! -->
        <input name="author" type="text" class="form-control" id="article-author" placeholder="작성자를 입력하세요">
    </div>
    <div class="form-group">
        <label for="title">제목</label>
        <!-- name="title" 추가, DTO의 필드명과 일치해야함! -->
        <input name="title" type="text" class="form-control" id="article-title" placeholder="제목을 입력하세요">
    </div>

    <div class="form-group">
        <label for="content">내용</label>
        <!-- name="content" 추가, DTO의 필드명과 일치해야 함! -->
        <textarea name="content" class="form-control" id="article-content" placeholder="내용을 입력하세요" rows="3"></textarea>
    </div>

    <button type="submit" class="btn btn-primary" id="article-create-btn">제출</button>

</form>
<script>
    //++++++++++++++++++++++++++
    // article 객체 생성
    //++++++++++++++++++++++++++
    var article = {

        //----------------------
        // 초기화(이벤트 등록) 메소드
        //----------------------
        init: function (){

            //----------------------
            // 스코프 충돌 방지!
            //----------------------
            var _this = this;

            //----------------------
            // 생성 버튼 선택
            //----------------------
            const createBtn = document.querySelector('#article-create-btn');

            //----------------------
            // 생성 버튼 클릭 시, 동작 할 메소드 연결
            //----------------------
            createBtn.addEventListener('click',_this.create);
        }

        //----------------------
        // article 생성 메소드
        //----------------------
        ,create: function (){

            //----------------------
            // form 데이터를 JSON으로 만듦
            //----------------------
            var data = {
                author: document.querySelector('#article-author').value,
                title: document.querySelector('#article-title').value,
                content: document.querySelector('#article-content').value,
            }

            //----------------------
            // 데이터 생성 요청을 보냄
            // fetch(URL, HTTP_REQUEST
            //----------------------
            fetch('/api/articles',{
                method:'POST', // POST 방식으로, HTTP 요청.
                body:JSON.stringify(data), // 위에서 만든 폼 데이터(data)를 함꼐 보냄.
                headers:{'Content-Type':'application/json'}
            }).then(function (response){ // 응답 처리!

                //----------------------
                // 요청 성공!
                //----------------------
                if(response.ok){
                    alert('게시글이 작성되었습니다.');
                    window.location.href='/articles'; // 해당 URL로 브라우저를 새로고침!
                }else{ // 요청 실패..
                    alert('게시글 작성에 문제가 생겼습니다.');
                }
            })
        }
    }
    //----------------------
    // 객체 초기화
    //----------------------
    article.init();

</script>

{{>layouts/footer}}
```

__⭐️ 뷰 페이지__

2) 생성: "api/ArticleApiController"

```java
@Slf4j
@RestController
public class ArticleApiController {

    @PostMapping("/api/articles")// Post 요청이 "/api/articles" url로 온다면, 메소드 수행!
    public Long create(@RequestBody ArticleForm form){ // JSON 데이터를 받아옴!
        log.info(form.toString()); // 받아온 데이터 확인!
        return 0L;
    }
}
```


__⭐️ 확인하기__

3) 데이터 보내기


## 4) JPA 리파지터리, 데이터 저장하기

### 미션

Article을 작성하고, 이를 제출!

그 결과를, 데이터베이스로 확인하시오.


### 개념

__⭐️ JPA와 리파지터리__

데이터를 저장하려면 DB에 넘겨야 한다. 그런데, 직접 데이터를 넘기기가 쉽지 않다.
서로 사용하는 언어가 다르기 때문이다. 이를 위한 라이브러리가 JPA이다.
JPA는 DB와의 소통을 보다 쉽게 한다. 그 핵심이 되는 인터페이스를 리파지터리
라고 한다. 

__⭐️ 엔티티 클래스__

리파지터리가 DB와 데이터를 주고 받으려면, 알맞은 규격이 필요하다.
편지를 보내려면 편지 봉투가 필요하듯. 이를 엔티티(entity)라 한다.

__⭐️ DB 테이블과 레코드__

DB는 데이터를 테이블(table)로 관리한다. 엑셀이라 생각하면 쉽다.
리파지터리에서 엔티티 객체를 보내면, 이를 받아 테이블에 저장한다.
이렇게 엔티티가 테이블로 저장된 것을 레코드(record)라 한다.

__⭐️ SQL__

DB는 데이터를 관리하는데, SQL 언어를 사용한다. SQL의 가장 기본 명령은
4가지가 있다.

    * select: 레코드 조회
    * insert: 레코드 추가
    * update: 레코드 수정
    * delete: 레코드 삭제

### 튜토리얼

__⭐️ 최종 구조__

* api
    + ArticleApiController

* dto
    + ArticleForm

* entity
    + Article

* repository
    + ArticleRepository
    
- resource
    * templates
        + application.yaml


__⭐️ 리파지터리__

1) 인터페이스 생성: "repository/ArticleRepository"

```java
//DB와 소통하는 인터페이스, JPA가 해당 객체를 알아서 만듦!
public interface ArticleRepository

    // <Article, long> 의미? 관리 대상은 article, 대상의 PK는 Long타입!
    extends CrudRepository<Article, Long>{ 
    
}
```

__⭐️ 엔티티 클래스__

2) 생성: "entity/Article"
```java

@Getter // 게터를 자동 생성!
@ToString // toString() 자동 생성!
@NoArgsConstructor // 디폴트 생성자 넣어 줌!
@Entity // DB 테이블에 저장될 클래스 임!
public class Article {
    
    @ID // 이게 ID임! 즉 사람으로 따지면 주민등록 번호! DB 에서는 PK(Primary Key)라고 함!
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에서 자동 관리. 매 생성 시, 1, 2, ... 증가
    private Long id;

    @Column(length = 10, nullable = false) // 최대 10글자, 비어있으면 안됨! 추후 SQL 학습
    private String author;

    @Column(length = 100, nullable = false) // 최대 100글자, 비어있으면 안됨! 추후 SQL 학습
    private String title;

    @Column(columnDefinition="TEXT", nullable = false) // 텍스트 타입, 비어있으면 안됨! 추후 SQL 학습
    private String content;
    
    @Builder // 빌더 패턴 적용! 추후 설명...!
    public Article(Long id, String author, String title, String content){
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
    }    
}

```

__⭐️ API 컨트롤러__

3) 리파지터리에게 데이터를 저장하게 함: "api/ArticleApiController"

```java

@Slf4j
@RestController
public class ArticleApiController {
    
    @Autowired // 리파지토리 객체를 알아서 가져옴! 자바는 new ArticleRepository() 해야 했음!
    private ArticleRepository articleRepository;
    
    @PostMapping("/api/articles") //Post 요청이 "/api/articles" url로 온다면, 메소드 수행!
    public Long create(@RequestBody ArticleForm form){ // JSON 데이터를 받아옴!
        
        log.info(form.toString()); // 받아온 데이터 확인!
        
        // dto(데이터-전달-객체)를 entity(db-저장-객체)로 변경
        Article article = form.toEntity();
        
        // 리파지터리에게(db-관리-객체) 전달
        Article saved = articleRepository.save(article);
        log.info(saved.toString());
        
        // 저장 엔티티의 id(PK)값 반환!
        return saved.getId();
        
    }
    
}
```

__⭐️ DTO 클래스__

4) 롬복 적용 및 메소드 추가: "dto/ArticleForm"

```java

@Data // 생성자(디폴트, All), 게터, 세터, toString 등 다 만들어 줌!
public class ArticleForm{
    
    private String author;
    private String title;
    private String content;
    
    // 빌더 패턴으로 객체 생성! 생성자의 변형. 입력 순서가 일치하지 않아도 됨. 
    public Article toEntity(){
        return Article.builder()
                .id(null)
                .author(author)
                .title(title)
                .content(content)
                .build();
    }
    
}
```

__⭐️ 확인하기__

5) Article 작성 : localhost:8080/articles/new


6) 로그 확인 : ArticleForm(~,~)
           : Article(id=1,~,~)
   

7) application.yaml 작성 : "application.properties를 변경"

    //  h2 DB, 웹 콘솔 접근 허용

    spring.h2.console.enabled = true

8) h2 콘솔 확인

서버 재시작 후 localhost:8080/h2-console 접속후

JDBC URL: 여기 안에다가 'jdbc:h2:mem:주소' 를 적어준다.

-> connect

9) 데이터베이스 레코드 조회

```h2
select * from article;
```

10) 데이터베이스 레코드 추가
```h2
INSERT INTO article(author, title, content) values ( '장영실','나랑 안맞아','블라블라' );
```

11) 레코드 생성 확인


## 면접 질문

+ DTO와 Entity를 나누는 이유?
  
    리파지토리가 db와 데이터를 주고받으려면, 알맞은 규격이 필요하다.


  
+ JPA 리파지토리란 무엇이고 왜씀?
  
    데이터를 저장하려면 DB에 넘겨야 한다. 그런데 직접 데이터를 넘기기가 쉽지 않다. 
    서로 사용하는 언어가 다르기 때문이다.
    이를 위한 라이브러리가 JPA 이다. JPA 는 DB와의 소통을 보다 쉽게한다.
    그 핵심이 되는 인터페이스를 리파지토리(repository)라 한다.
  

+ 롬복의 장점?
  
    롬복이 있으면 굳이 길게 코딩을 안해도 된다. 생성자 게터세터, toString 다 만들어줌.

  
+ @Autowired란?
  
    객체를 알아서 가져옴!
    자바는 new 객체();를 해야함.
  
  
+ 데이터베이스 테이블과 레코드의 차이는?
  
    DB는 데이터를 테이블(table)로 관리한다. 엑셀. 
    리파지토리에서 엔티티 객체를 보내면, 이를 받아 테이블에 저장한다.
    이렇게 엔티티가 테이블로 저장된 것을 레코드라 한다.
  
  
+ SQL이란 무엇인가?

    DB는 데이터를 관리하는데, SQL 언어를 사용한다. SQL의 가장 기본 명령은 4가지이다.
- select : 레코드 조회
- insert : 레코드 추가
- update : 레코드 수정
- delete : 레코드 삭제


### 2. 데이터 조회(read)

## 5) 목록 가져오기 

## 미션

게시글을 작성하고

그 목록을 조회하시오.

## 개념

__⭐️ 진행 흐름__

각 객체의 유기적 동작. 이를 통해 데이터 목록이 조회된다. 컨트롤러는 전체적인 요청을 받아 전체적 명령을,
리파지토리는 DB에서 데이터를 가져오고, 모델은 뷰 페이지로 데이터를 전달한다. 전달된 데이터와 결합한 뷰 페이지.
이는 클라이언트에서 결과 화면으로 나타난다.

__⭐️ 모델__

MVC 패턴 중 하나인 모델. 이는 뷰 페이지에서 사용할 데이터를 관리한다.

```java
// 데이터 articleList 저장! 뷰에서는 "articles"란 이름으로 사용 가능! 
model.addAttributes('articles', articleList);
```

__⭐️ 머스태치 문법, 데이터 사용__

머스태치를 사용하여, 모델 데이터를 사옹할 수 있다.

```html
<!-- 모델 데이터 aaa를 사용 -->
{{#articles}}
...
{{/articles}}
```

## 튜토리얼

__⭐️ 컨트롤러__

1) 코드 추가 및 변경 : "controller/ArticleController"
```java
@Slf4j
@RequiredArgsConstructor // final 필드 값을 알아서 가져옴! (@autowired 대체!)
@Controller
public class ArticleController {
    
    // 리파지토리 객체 자동 삽입 됨! 위에서 @RequiredArgsConstructor 했음!
    private final ArticleRepository articleRepository;
    
    @GetMapping("/articles")
    public String index(Model model) { // 뷰 페이지로 데이터 전달을 위한 Model 객체 자동 삽입 됨!
        // 모든 Article을 가져옴
        // Iterable 인터페이스는 ArrayList의 부모 인터페이스
        Iterable<Article> articleList = articleRepository.findAll();
        
        // 뷰 페이지로 articles 전달!
        model.addAttribute("articles", articleList);
        
        // 뷰 페이지 설정
        return "articles/index";
    }
}
```

__⭐️ 뷰 페이지__

2) 테이블 추가 : "articles/index.mustache"

```html
{{>layout/header}}
<!-- jumbotron -->
<div class="jumbotron">
    <h1>Article 목록</h1>
    <hr>
    <p>articles/index.mustache</p>
    <a href="/articles/new" class="btn btn-primary">글쓰기</a>
</div>

<!-- articles table -->
<table class="table table=hover">
    
    <thead>
        <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
        </tr>
    </thead>
    <tbody>
        <!-- 모델에서 보내준 articles를 사용! 데이터가 여러개라면 반복 출력됨! -->
        {{#articles}}
        <tr>
            <td>{{id}}</td><!-- id 출력 -->
            <td>{{title}}</td><!-- title 출력 -->
            <td>{{author}}</td><!-- author 출력 -->
        </tr>
        {{/articles}}
    </tbody>
</table>
{{>layout/footer}}
```

+ Iterable 인터페이스와 ArrayList 클래스의 관계?

    Iterable 인터페이스는 ArrayList의 부모 인터페이스