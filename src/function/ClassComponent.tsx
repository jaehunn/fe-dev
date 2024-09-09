import { Component } from "react";

type Props = {
  // ...
};

type State = {
  count: number;
};

class ClassComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  functionCountUp() {
    console.log(this); // undefined

    this.setState(({ count }) => ({ count: count + 1 }));
  }

  arrowFunctionCountUp = () => {
    // 화살표 함수의 this 는 선언 시점에 미리 결정된다.
    // 바벨로 트랜스파일링 해보면, this 를 undefined 로 초기화 함.
    console.log(this); // class component

    this.setState(({ count }) => ({ count: count + 1 }));
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <button type="button" onClick={this.functionCountUp}>
          일반 함수
        </button>

        <button type="button" onClick={this.arrowFunctionCountUp}>
          화살표 함수
        </button>

        <p>Count: {count}</p>
      </div>
    );
  }
}

// 클로저는 함수와 함수가 선언된 어휘적 환경 (Lexical Scope) 의 조합으로 본다.

// 렉시컬 환경이란,
function add() {
  // 범위, add 전체
  const a = 10;

  // 범위, add 전체
  function innerAdd() {
    // 범위, innerAdd
    const b = 20;

    // innerAdd 는 add 내부에 선언되어 있기 때문에, a 를 사용할 수 있다.
    // -> 선언적 렉시컬 환경,
    // 동적으로 결정되는 this 와 달리, 코드가 작성된 순간 정적으로 결정된다.
    console.log(a + b);
  }

  innerAdd();
}

add();

// 스코프란,

// 전역 스콥
// 브라우저 = window.
// Node.js = global

// 함수 스콥
// block, {} 이 결정하는 것이 아니다. js 는 함수 레벨 스콥을 가진다.

// 찾을 수 있는, 가장 가까운 함수 블록의 것을 찾아간다.

let x = 10;

function foo() {
  let x = 100;
  console.log(x); // 100

  function bar() {
    let x = 1000;
    console.log(x); // 1000
  }

  bar();
}

console.log(x); // 10

// 어떻게 활용할까.

function outer() {
  // outer 스콥으로 정의.
  const x = "hello";

  function inner() {
    // inner 가 선언된 렉시컬 환경의 x 에 접근할 수 있다.
    console.log(x);
  }

  return inner;
}

// outer 가 종료되었지만,
// innerF 함수가(=inner) outer 함수의 스코프(변수 x)를 클로저로 기억
const innerF = outer();
innerF(); // hello

// 따라서 inner 는 outer 환경을 기억하는 클로저가 된다.

// 전역 스콥은, 누구나 쓸 수 있다.

// https://ui.dev/

// 클로저로 사용한다 함은.
// 1. 함수 스콥으로 직접 수정을 막는다
// 2. 외부에 노출하는 기능을 제한한다.

// 리액트는 useState() 로 변수를 저장하고,
// useState() 의 변수 접근/수정을 리액트가 관리하는 클로저에서 확인하고,
// 값이 변경되면 렌더링을 하는 식으로 클로저가 짜여져 있을 것이다.

// 리액트에서의 클로저
// useState()

export default ClassComponent;
