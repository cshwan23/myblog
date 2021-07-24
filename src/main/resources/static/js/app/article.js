//++++++++++++++++++++++++++
// article 객체 생성
//++++++++++++++++++++++++++
var article = {
    // 초기화(이벤트 등록) 메소드
    init: function() {
        // 스코프 충돌 방지! (https://mobicon.tistory.com/189)
        var _this = this;
        // 생성 버튼 선택
        const createBtn = document.querySelector('#article-create-btn');
        const updateBtn = document.querySelector('#article-update-btn');
        // 생성 버튼 클릭 시, 동작 할 메소드를 연결!
        if(createBtn != null) {
            createBtn.addEventListener('click', _this.create);
        }
        if(updateBtn != null){
            updateBtn.addEventListener('click', _this.update);
        }
    },
    // article 생성 메소드
    create: function() {
        // form 데이터를 JSON으로 만듬
        var data = {
            author: document.querySelector('#article-author').value,
            title: document.querySelector('#article-title').value,
            content: document.querySelector('#article-content').value,
        };
        // 데이터 생성 요청을 보냄
        // fetch(URL, HTTP_REQUEST)
        fetch('/api/articles', {
            method: 'POST', // POST 방식으로, HTTP 요청.
            body: JSON.stringify(data), // 위에서 만든 폼 데이터(data)를 함께 보냄.
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) { // 응답 처리!
            // 요청 성공!
            if (response.ok) {
                alert('게시글이 작성 되었습니다.');
                window.location.href='/articles'; // 해당 URL로 브라우저를 새로고침!
            } else { // 요청 실패..
                alert('게시글 작성에 문제가 생겼습니다.');
            }
        });
    },
    // article 생성 메소드
    update: function() {
        // form 데이터를 JSON으로 만듬
        var data = {
            id: document.querySelector('#article-id').value,
            author: document.querySelector('#article-author').value,
            title: document.querySelector('#article-title').value,
            content: document.querySelector('#article-content').value,
        };
        // 데이터 생성 요청을 보냄
        // fetch(URL, HTTP_REQUEST)
        fetch('/api/articles'+data.id, {
            method: 'PUT', // POST 방식으로, HTTP 요청.
            body: JSON.stringify(data), // 위에서 만든 폼 데이터(data)를 함께 보냄.
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) { // 응답 처리!
            // 요청 성공!
            if (response.ok) {
                alert('게시글이 작성 되었습니다.');
                window.location.href='/articles/'+data.id; // 해당 URL로 브라우저를 새로고침!
            } else { // 요청 실패..
                alert('게시글 작성에 문제가 생겼습니다.');
            }
        });
    }
};
//----------------------
// 객체 초기화
//----------------------
article.init();