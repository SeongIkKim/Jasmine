const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];



function deleteToDo(event){
    // event.target을 사용하지 않으면 일어난 event가 정확히 어떤 button에서 호출된 것인지 알 수 없다.
    const btn = event.target;
    const li = btn.parentNode;
    // 이때, HTML화면에서 li만 지우는 것으로, local storage의 정보는 살아있다. 따라서 새로고침 하면 다시 나타남.
    toDoList.removeChild(li);
    /*
    filter함수는 toDos(array) 내의 모든 요소에 대하여 주어진 function을 실행하고,
    true를 리턴한 요소들만을 모아 새로운 array로 만든다.
    */
    // 결과적으로 clenaToDos는 HTML 상에 존재하지 않는 li id(지워놓은 리스트아이디)를 제외한, 즉 del버튼을 누르지 않은 toDo들만을 반환한다.
    const cleanToDos =  toDos.filter(function(toDo){
        // li.id는 int이고, toDo.id는 string이므로 toDo.id를 int로 형변환해서 비교해줄것이다.
        return toDo.id !== parseInt(li.id);
        // 이 시점에서 cleanToDos는 삭제버튼을 누른 Todo를 제외한 ToDo의 리스트.
        // 이 시점에서 ToDos는 삭제되기 전의 모든 ToDo의 리스트.
    });
    // toDos를 재할당하려면 toDos가 const가 아닌 let이어야함
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // 그냥 toDos를 저장하려고 하면 object형식이라 local Storage에서 읽을 수 없다.
    // local Storage는 string 형식만 지원하므로, json.stringfy를 이용해 string으로 변환시키는 트릭을 사용한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text){
    // toDoList를 구성하는 태그들을 하나씩 만들어준다
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1
    delBtn.innerHTML = "X";
    // 삭제 버튼에 이벤트 리스너도 추가해준다
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    // 만든 태그들을 li안에 집어넣어 구조를 만들어준다.
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    // 최종적을 만든 li태그를 toDoList에 집어넣어 화면에 띄운다
    toDoList.appendChild(li);
    // 만들어진 toDo를 저장하기 위해서 object를 먼저 만든다.
    const toDoObj = {
        text: text,
        id: newId
    };
    // 만들어진 obj를 toDos 전역 변수 array에 집어넣는다.
    toDos.push(toDoObj);
    // 저장되어 있는 toDos를 localstorage에 입력시킨다. 따라서 반드시 toDos에 push한 뒤에 이 코드를 넣을것.
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        // 여기서 불러온 loadedToDos는 로컬 스토리지에 있었으므로 string형식이다.
        // 따라서 다시 js object형식으로 넣어주기 위해서는 JSON.parse를 사용해 변환해야한다.
        const parsedToDos = JSON.parse(loadedToDos);

        // object화 된 각각의 ToDo들에 대해 paintToDo함수를 실행하기 위해서 새로운 함수를 사용한다.
        // 새로운 함수의 argument로 toDo라는, parsedToDos내의 각각의 객체를 전달한다.
        parsedToDos.forEach(function(toDo){
            console.log(toDo);
            paintTodo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}


init();