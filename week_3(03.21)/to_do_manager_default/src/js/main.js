import '../scss/main.scss';

const X_IMAGE = "/x.93083e62.svg";

/*
1. Card Delete
 - X 버튼을 눌렀을 때, 카드가 삭제됨.

2. Category Create
 - 카테고리를 입력하고 + 버튼을 눌렀을 때, 카테고리가 생성됨.
 - 이름을 비워놓았으면 알람, 이미 존재하는 카테고리면 알람

3. Modal Show
 - 카테고리에 있는 + 버튼을 눌렀을 때, 모달을 보여줌

4. Modal Close
 - 모달에서 취소를 눌렀을 때, 모달을 숨김

5. Options Create
 - 모달에서 셀렉트 박스의 옵션을 채워넣기

6. Card Create
 - 모달에서 저장을 했을 때, 카드가 생성됨

7. Category Delete
 - 카테고리 이름을 비웠을 때, 카테고리 삭제
 - 확인 메세지를 통해 삭제 여부 확인

8. LocalStorage Load
 - 로컬스토리지에서 투두리스트 불러오기
 - example) {"개발":[{"title":"자스민 2주차 과제","description":"노마드 코더 메인페이지 클로닝 하기"},{"title":"자스민 1주차 과제","description":"유튜브 메인페이지 클로닝 하기"}],"집안일":[{"title":"장보기","description":"세제, 치약 사기"},{"title":"설거지","description":"라면 포트 설거지하기"},{"title":"청소","description":"화장실 청소하기"}],"업무":[{"title":"프론트 작업","description":"모바일 프론트 작업 및 리팩토링"}]}

9. Event Check
 - 새로 생성되는 객체에 대해 이벤트 달아주기

10. LocalStorage Update
 - 투두리스트에 변경점이 생길 때마다 로컬스토리지를 업데이트

11. Auto Increse Textarea
 - 자동으로 높이가 늘어나는 Textarea
*/


// 코드 시작

// window.onload : js 파일이 포함된 html이 다 로드가 됐을 때 실행
window.onload = () => {
    
    /* 1 */
    //query로 document의 모든 객체를 선택하겠다
    const cardDeleteBtns = document.querySelectorAll(".delete-btn");
    cardDeleteBtns.forEach(cardDeleteBtns => {
        cardDeleteBtns.addEventListener("click", cardDeleteHandler);
    })

    /* 2 */
    const categoryAddBtn = document.querySelector("nav .category-add-btn");
    categoryAddBtn.addEventListener("click", categoryAddHandler);

    /* 3 */
    const cardAddBtns = document.querySelectorAll(".column .add-btn");
    cardAddBtns.forEach(cardAddBtns => {
        cardAddBtns.addEventListener("click", showModalHandler);
    })

    /* 4 */
    const cancelBtn = document.querySelectorAll(".modal .cancel-btn");
    cancelBtn.addEventListener("click", closeModalHandler);
    //이거 안된다


    /* 6 */
    const cardAddBtn = document.querySelector('.modal .save-btn');
    cardAddBtn.addEventListener("click", cardAddHandler);

    /* 7 */
    const cartegoryInputs = document.querySelectorAll('.column .category');
    cartegoryInputs.forEach(categoryInput => {
        // "change"는 input 등에서 값이 변경되었을 때 실행되는 이벤트
        categoryInput.addEventListener("change", changeCategoryHandler);
    })

    /* 8 */
    // 브라우저를 새로고침해도 저장된 정보가 사라지지 않도록 local storage 사용
    loadLocalStorage();

    /* 9 */
    
}
// 자바스크립트는 변수를 뒤에서 선언하더라도, 가장 위에서 선언을 미리 한 다음에 나중에 할당한다. 따라서 굳이 순서를 맞추어서 선언해줄 필요가 없다.
// 그러나 예전 자바스크립트는 이를 지원하지 않으므로, 컨벤션은 선언을 먼저 해주는것이 맞긴하다.

/* 8 여기부터 못만들겠다 그냥 가져오자. */
const loadLocalStorage = () => {
    const todoLists = localStorage().TODO_LISTS;
    todoLists = JSON.parse(todoLists);

    for (var category in todoLists) {
        console.log(category);
        console.log(todoLists[category]);

        const todoList = todoList[category];

        const column = createColumn(category);
        todoList.forEach(todo => {
            const card = createCard(todo.title, todo.description);
            column.appendChild(card);
        })
    }
}

/* 7 */
//인자 하나여서 (event) 대신에 그냥 event만 써줘도 됨
const changeCategoryHandler = event => {
    // 다른 값으로 바꾸는것이 아니라 아예 빈문자열로 뒀을때(컬럼 네임을 아예 없앴을때)만 삭제하도록 만들것임
    if(event.target.value == "" ) {
        // confirm은 yes일때 true, no일때 false 반환
        const deleteConfirm = confirm("정말 카테고리를 삭제하시겠습니까?");

        if (deleteConfirm) {
            const column = findTargetClass(evnet.target, "column");
            column.remove();
        } else {
            // input 태그에 키보드로 입력할 수있게 포커스가 간다.
            event.target.focus();
        }
    }
}

/* 6 */
// card를 만든다
const createCard = (titleValue, DescValue) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const deleteBtn = document.createElement("input");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.src = X_IMAGE;

    const cardTitle = document.createElement("input");
    cardTitle.classList.add("title");
    cardTitle.value = titleValue;

    const divider = document.createElement("div");
    cardTitle.classList.add("divider");

    const cardDescription = document.createElement("textarea");
    cardDescription.classList.add("description");
    cardDescription.value = DescValue;

    card.appendChild(deleteBtn);
    card.appendChild(cardTitle);
    card.appendChild(divider);
    card.appendChild(cardDescription);

    return card;
};

// 카드가 들어갈 column을 찾는다
const addToCategory = (categoryValue, card) => {
    const columns = document.querySelectorAll(".column");

    for (var i = 0; i < columns.length; i++){
        // input 태그라서 .value를 바로 쓸 수있음
        const category = columns[i].querySelector(".category").value;
        if (categoryValue == category){
            columns[i].appendChild(card);
            break;
        }
    }
}

const cardAddHandler = () => {
    const selectBox = document.querySelector(".modal select");
    const cardTitleInput = document.querySelector(".modal input");
    const cardDescTextarea = document.querySelector(".modal textarea");

    const card = createCard(cardTitleInput.value, cardDescTextarea.value);

    addToCategory(selectBox.value, card); 
    closeModalHandler();

    // 다음번 모달이 나올 때 값이 깨끗하게 비워져있도록 초기화
    selectBox.value = "";
    cardTitleInput.value = "";
    cardDescTextarea.value = "";
}

/* end 6 */


/* 5 */
const findCategory = (event) => {
    // 이거 작동 방식 자세히 보고 다시 공부할것
    const currentInput = event.target.parentNode.querySelector(".category");
    return currentInput.value;



}

const updateSelectbox = (event) => {
    const selectBox = document.querySelector(".modal select");
    // innerText 초기화하지 않으면 매번 누를때마다 똑같은 option이 중복으로 추가된다.
    selectBox.innerText = "";

    const categories = document.querySelectorAll('.column .category');
    categories.forEach(category => {
        const categoryOption = document.createElement("option");
        // 옵션객체 안에 text부분을 각 category의 value부분으로 넣어줌.
        categoryOption.innerText = category.value;

        selectBox.appendChild(categoryOption);
    })

    //특정 칼럼의 추가버튼을 눌렀을때 해당 칼럼으로 카테고리 첫 선택되어있음
    const currentCategory = findCategory(event);
    selectBox.value = currentCategory;
}

/* 4 */
const closeModalHandler = (event) => {
    const modalContainer = document.querySelector(".modal-container");
    const body = document.querySelector("body");

    // 모달 컨테이너의 클래스중에서 dp-none을 추가한다
    modalContainer.classList.add("dp-none");
    // 모달이 사라지면 다시 스크롤이 되어야 하므로 stop-scroll 삭제
    body.classList.remove("stop-scroll");
};


/* 3 */
const showModalHandler = (event) => {
    const modalContainer = document.querySelector(".modal-container");
    const body = document.querySelector("body");

    // 모달 컨테이너의 클래스중에서 dp-none을 지워야함
    modalContainer.classList.remove("dp-none");
    // 모달이 현재 위치(스크롤)에서 나오도록 하라
    modalContainer.style.top = '$(window.scroolY}px';
    // 모달이 뜨면 바깥쪽이 스크롤되면 안되기때문에 stopscroll 클래스명을 추가함
    body.classList.add("stop-scroll");
};


/* 2 */
const createColumn = (categoryTitle) => {
    const column = document.createElement("div");
    // add("클래스명"): DOM객체에 'class명'이라는 클래스명을 가진 객체를 추가해라.
    column.classList.add("column");

    const todoCategories = document.createElement("div");
    todoCategories.classList.add("todo-category");
    
    const categoryInput = document.createElement("input");
    categoryInput.classList.add("category");
    // value값은 input을 consolelog로 찍어봐도 안나온다.(내부에 숨겨져있다)
    categoryInput.value = categoryTitle;

    const addBtn = document.createElement("img");
    addBtn.classList.add("add-btn");
    addBtn.src = X_IMAGE;

    //위에서 따로따로 만들어진 태그들을 하나의 div안에 합치는 작업
    todoCategory.appendChild(categoryInput);
    todoCategory.appendChild(addBtn);
    console.log(todoCategory);
    
};

const categoryAddHandler = () => {
    // (1) input 값을 가져오기 ()
    const categoryTitle = document.querySelector(".category-title");
    console.log(categoryTitle.value);
    //여기서 안됐는데?

    // (2) 값 검증 : 이름이 없을 때, 중복되는 이름이 있을때
    if (categoryTitle.value == "") {
        alert("카테고리 이름을 작성해주세요.");
        //경고 보낸후 즉시 종료
        return;
    }

    // 개발, 집안일, 업무
    const categories = document.querySelectorAll('.column .category');
    // 이미 존재하는 카테고리명들을 모두 가져와 새로 들어온 값과 같은 것이 있는지 비교.
    for (var i = 0; i < categories.length; i++) {
        if(categories[i].value == categoryTitle.value) {
            alert("이미 존재하는 카테고리입니다.");
            return;
        } 
    }

    // (3) 컬럼 만들기
    const column = createColumn(categoryTitle.value);
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.appendChild(column);

    // (4) 뒷정리
    categoryTitle.value = "";

};

/* 1 */
// 특정 DOM객체(node)와 찾기를 원하는 class(target class)를 받는다
const findTargetClass = (node, targetClass) => {
    // while을 돌면서 node객체가 가지고있는(같은 위치의) class명을 돌면서 원하는 class를 find할때까지 검사(true가 될때까지)
    while(node.classlist.contains(targetClass) == false){
        // 만약 해당 node 내부에 그 class가 없으면 parentNode에서 class를 다시 while문 돌린다.
        node = node.parentNode;
    }
    return node;
};


// x버튼을 누르면(Handler를 실행하면) event 정보를 가져온다.
const cardDeleteHandler = (event) => {
    //event.target은 해당 이벤트가 일어난 DOM객체를 반환한다.
    const card = findTargetClass(event.target, "card");
    //parentNode는 해당 DOM객체의 부모객체를 반환한다.
    event.target.parentNode.remove();
};