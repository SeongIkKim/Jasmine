
// vue 객체 선언
const app = new Vue({
    // vue 옵션을 여기에 넣는다

    // element로 id가 app인 요소를 넘겨주었다. --> 해당 요소 내에서 vue 문법을 사용할 수 있다.
    el: "#app", 
    data() {
        return {
            // vue 객체 내의 message 변수에 "Jasmine"을 넣을 수 있도록 만들어준다.
            message : "Jasmine", 
            className : "strong",
            isShow: true,
            list: [1, 2, 3],
            isClicked: true,
        };
    }, 
    // 반환할 때 기존 변수를 특정 형식으로 바꾸어주는 메서드를 정의할 수 있다.
    computed: {
        reversedMessage(){
            return this.message.split("").reverse().join("");
        }
    },
    // 이벤트로 적용되는 메서드 정의 
    methods: {
        alertMessage(){
            // app이라는 지금 vue 객체(this) 내의 message 변수를 가져와라!
            alert(this.message);
        },
        clickBtn() {
            this.isClicked = !this.isClicked;
        },
    },

});