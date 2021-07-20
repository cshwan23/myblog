
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
   
<span style="color:#348feb">1) 등록 페이지 만들기</span>



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
   
