/* 1. Variable Declare */
// console.log("\n\n1. Variable Declare\n");

//js
let jsName = "Jasmine";
let jsAge = 25;
let jsObj = {
  name: "Jasmine",
  age: 25,
};

//ts
let tsName: string = "Jasmine";
let tsAge: number = 25;
let tsObj: object = {
  name: tsName,
  age: tsAge,
};
/* end: 1 */
//

/* 2. Variable Interface */
// console.log("\n\n2. Variable Interface\n");

// interface는 설계도, 어떤 형식인지 선언만 한다.
// obj에 관해서 지정해주는 형식이다.
interface Human {
    name: string;
    age: number;
  }
  
  let obj2: Human = {
    name: "jamsine",
    age: 25,
  };

/* end: 2 */
//

/* 3. Function */
// console.log("\n\n4. Function\n");

//js
function jsAdd(x: any, y: any) {
  return x + y;
}

//ts
function tsAdd(x: number, y: number): number {
    return x + y;
  }

//js
const jsAdd2 = (x: any, y: any) => {
  return x + y;
};

//ts
const tsAdd2: (base: number, increase: number) => number = (x, y) => {
    return x + y;
};

let title: string = "Jasmine";

let variable; //any
variable = 123;
variable = "str";


/* end: 3 */
//

/* 4. Function Parameter */
// console.log("\n\n4. Function Parameter\n");

//Default Example
const hello = (name: string, message: string): void => {
  console.log(`Hi! ${name}, ${message}`);
};
// hello("Jasmine", "Let's Coding");

//Optional Parameter
const hello2 = (name: string, message?: string): void => {
    if (message) {
        console.log(`Hi! ${name}, ${message}`);    
    }
    else {
        console.log(`Hi! ${name}, Welcome!`)
    }
};

// hello2("Jasmine");
// hello2("Jasmine", "let's coding!")

//Default-initialized Parameter
const hello3 = (name: string, message: string = "welcome!"): void => {
    console.log(`Hi! ${name}, ${message}`);    
};

// hello3("Jasmine");


//Rest Parameter
// 배열로 한번에 여러 인자를 넘긴다
const hello4 = (name: string, ...messages: string[]): void => {
    console.log(`Hi! ${name}, ${messages.join(" ")}`);    
};

// hello4("Jasmine","어제","술","많이","마셨니?");

/* end: 4 */
//

/* 5. Class Default */
// console.log("\n\n5. Class Default\n");

//Class Declare
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hello(): string {
    return `hello ${this.name}`;
  }
}

const person: Person = new Person("SeongIk");
// console.log(person.name);
// console.log(person.hello());

//Class Extends

class Programmer extends Person {
	//attribute
    github: string;

	//constructor
    constructor(name: string, github: string) {
        super(name);
        this.github = github;
    }

	//methods
    hello(): string {
        return `Hello, My name is ${this.name}. I'm Programmer`;
    }
    coding(): string {
        return `Coding... Check my Github : ${this.github}`;
    }
}

const programmer: Programmer = new Programmer("SeongIk","SeongIkKim");

// console.log(programmer.github);
// console.log(programmer.hello());

/* end: 5 */
//

/* 6. Access Modifier */
// console.log("\n\n6. Access Modifier\n");

class Person2 {

  constructor(public name: string, private age: number, protected gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  //getter
  get getAge(): number {
      return this.age;
  }

  //setter -- 유효성 체크도 할 수 있다
  set setAge(age: number){
      if(age>0){this.age = age;}
      else(console.log("NO!"))
  }

  public introduce(): string {
    return `Hello, I'm a ${this.name}, ${this.age}, ${this.gender}`;
  }
}

const person2 = new Person2("bumsu", 25, "man");

// console.log(person2.name);
// console.log(person2.age);   // error
// console.log(person2.gender);    // error
// console.log(person2.getAge); // private값임에도 불구하고 getter로 불러옴
// person2.setAge = 26; // private값임에도 불구하고 setter로 바로 할당
// person2.setAge = -1; // error

/* end: 6 */
//

/* 7. readonly, static */
// console.log("\n\n7. readonly, static\n");

//readonly
class Person3 {
  public readonly created: Date;    // 클래스 내에 있는건 변수가 아니라 속성이므로 const대신 readonly를 사용한다.
// 변수는 바로 메모리가 할당 되지만, 클래스 내의 attribute는 객체가 생기기 전까지 메모리가 할당되지 않는다.
  constructor(public name: string) {
    this.name = name;
    this.created = new Date();
  }
}


const person3 = new Person3("Jasmine");
// console.log(person3.created);
// person3.created = new Date(); // readonly이기 때문에 불가능!

//static
// 클래스 내의 객체가 아니라 클래스 자체에도 속성을 넣을 수 있다. (예를들어 만들어진 객체 갯수)
class Bungeoppang {
  //static 속성
  private static count: number= 0; // 타입(number)를 지정해주거나 적어도 추론가능하게 해줘야한다.

  constructor(private taste: string) {
    this.taste = taste;
    Bungeoppang.count++;    //객체가 생성될 때마다 카운트 1 증가, this를 쓰지않음(객체가 아니라 클래스이기때문에)
    
  }

  //static 메소드 --> static으로 하면 객체가 없어도 클래스 자체에서 호출할 수 있는 메소드가 된다.
  static getCount() {
      return Bungeoppang.count; 
  }
}

const bungeoppang1: Bungeoppang = new Bungeoppang("red bean");
const bungeoppang2: Bungeoppang = new Bungeoppang("cream");
const bungeoppang3: Bungeoppang = new Bungeoppang("sweet potato");

/* end: 7 */
//

/* 8. Abstract Class */
// console.log("\n\n8. Abstract Class\n");

// 추상 클래스는 추상 메서드를 하나 이상 가지고 있는 클래스이다.
// 추상 클래스는 객체를 만들 수 없다.(구현이 덜된 추상 메서드를 가지고 있기 때문에)
abstract class Singer {
  constructor(public name: string) {
    this.name = name;
  }

  // Abstract Method
  // 추상 메서드는 선어만 되고, 구현은 없다. 자식 클래스는 반드시 이 메서드를 반드시 구현해야한다.
  abstract sing(): void;
}

// const singer = new Singer // error

class Ballader extends Singer {
    sing(): void {
        console.log("Oooh~ ooohoh~");
    }
}

const ballader: Ballader = new Ballader("Park Hyo Sin");
// ballader.sing();

class TrotSinger extends Singer {
    sing(): void {
        console.log("쿵짝 쿵짝");
    }
}

const trotSinger: TrotSinger = new TrotSinger("임영웅");
// trotSinger.sing();

const singers: Singer[] = [ballader, trotSinger]; // singers 리스트는 Singer 객체들만 받아오고있다!

// sing이라는 공통의 메서드가 있다면 서로 다른 객체를 묶어서 같은 메서드를 호출할수도 있다.
// singers.forEach((singer) => {
//     singer.sing();
// });
// 굳이 추상클래스가 아니더라도 같은 메서드가 있으면 이런식으로 foreach문을 돌수도 있지만,
// 이렇게 singer가 정확히 어떤 것인지 명시하지 않고도 잘 돌아가는것을 '추상화'라고 한다.

/* end: 8 */
//

/* 9. Interface */
// console.log("\n\np. Interface\n");

//Function Interface
interface Operation {
  (x: number, y: number): number;
}

const add1: Operation = (base:number, increase:number): number =>{
    return base+increase;    
}

const add2: Operation = (base,increase) => {
    return base+increase;   // 여기서는 base와 increase의 타입을 명시하지 않아도 Operation 인터페이스에서 그 정보를 가져와 추론해준다
}

//Class Interface

/*
추상 클래스와 인터페이스의 차이

(추상)클래스는 하나만 상속받을 수 있다.
constructor라는 구현부가 있기 때문에, 여러 추상 클래스를 상속받을 시 메서드나 속성들이 겹치게 된다.
따라서 겹침을 예방하기 위해 애초에 클래스의 상속은 하나로만 정해져있다.

그러나 인터페이스는 구현이 전혀 없기 때문에, n개를 implements할 수 있다.
*/
interface Animal {
  species: string;
  age: number;
  hello:() => void;
}

interface Pet {
    name: string;
    master?: string; // 물음표를 달면 optional이라 없어도 상관없어짐
}

class HouseDog extends Singer implements Animal, Pet {
    constructor(
      public species: string,
      public age: number,
      public name: string,
      public master: string
    ) {
      super(name);
      this.species = species;
      this.age = age;
      this.master = master;
    }
  
    sing(): void {
      console.log("Wal! Wal!");
    }
  
    hello(): void {
      console.log(`Hello i'm ${this.species}`);
    }
  }

/* end: 9 */

/*
제네릭

제네릭은 타입을 선언 시점이 아니라 생성 시점에서 명시해주는 방식.
제네릭 덕분에 어떤 코드를 여러 자료형으로 구현할 수 있다.
예를 들어 큐를 만들때
만약 any타입을 사용한다면 큐에 여러가지 자료형이 섞여 들어와 혼란스러울수 있기 때문에,
제네릭을 사용하여 T를 넘겼다가 생성시점에 자료형을 정하여(ex-string) 해당 자료형만 받는 큐를 만들 수 있다.
*/