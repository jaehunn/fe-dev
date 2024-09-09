// 동기, 응답이 오면 다음 작업을 수행.
// 비동기, 응답에 상관없이 다음 작업을 수행.

function bar() {
  console.log("bar");
}

function baz() {
  console.log("baz");
}

function foo() {
  console.log("foo");

  bar();
  baz();
}

foo();

// 콜 스택에 적재되고, 실행이 종료되면 콜 스택에서 제거된다.

// foo -> log 실행
// bar -> log 실행 -> bar 종료 제거
// baz -> log 실행 -> baz 종료 제거
// foo 종료 제거

// 이벤트 루프는 콜 스택에 비어있는 지를 확인한다.
// 작업이 있으면, 엔진으로 실행한다.

// 코드를 실행하는 것.
// 호출 스택이 비어있는 지를 확인하는 작업
// 모두 단일 스레드에서 일어난다.
// 확인과 실행이 동시에 일어날 수 없다.

function bar2() {
  console.log("bar2");
}

function baz2() {
  console.log("baz2");
}

function foo2() {
  console.log("foo2");
  setTimeout(bar2, 0);
  baz2();
}

foo2();

// foo2 -> baz2 -> bar2

// foo2 -> log foo2 실행
// setTimeout() -> callback 이 태스크 큐로 적재. -> setTimeout 제거
// baz2 -> log baz2
// baz 종료
// foo 종료
// 호출 스택 비워진 상태.
// 이벤트 루프가 호출 스택을 확인하고, 콜백
// bar2 를 호출 스택으로 push -> log bar2
// bar2 제거

// 태스크 큐는 queue 가 아니라 set 형태로 이루어져 있다.
// 가장 오래된 태스크를 골라내기 위함이다.

// 비동기 함수는 외부에서 수행한다. (노드나 브라우저)
// 외부 별도 스레드에서 태스크 큐에 작업을 할당한다.
// 외부에서 실행되어서 콜백이 태스크 큐에 쌓이는 것.

// 이벤트 루프는 콜 스택이 비어있기를 감지하면서, 태스크 큐에 적재된 태스크를 수행한다.
// 비동기 수행을 자바스크립트 메인 스레드에서만 이루어진다면 절대 작업을 비동기적으로 수행할 수 없다.

// 마이크로 태스크 큐는 기존 태스크 큐와 다른 태스크들을 처리한다.
// 대표적으로 Promise 가 있다.

// 마이크로 태스크 큐는 태스크 큐보다 먼저 실행된다.

setTimeout(() => console.log("foo"), 0);
Promise.resolve().then(() => console.log("bar"));

// bar -> foo
