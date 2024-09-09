const syncBtn = document.getElementById("sync");
const macroBtn = document.getElementById("macro");
const microBtn = document.getElementById("micro");
const macroMicroBtn = document.getElementById("macro_micro");

// 렌더링은 마이크로 태스크 큐를 실행한 뒤에 렌더링이 일어난다.
// 즉, 마이크로 태스크 큐 작업이 끝날 때 마다 렌더링 기회를 갖는다

// 콜 스택 > 마이크로 태스크 > (렌더링) > 매크로 태스크

// for 문이 모두 끝나면, 렌더링 기회를 얻는다.
syncBtn.addEventListener("click", function () {
  for (let i = 0; i <= 100000; i++) {
    syncBtn.innerHTML = i;
  }
});

// 매 setTimeout 콜백이 큐에 들어가고, 렌더링 기회를 얻는다. +1 씩 순차적으로 렌더링
// macro 태스크 큐가 실행되기 전에 렌더링이 진행되기 때문
macroBtn.addEventListener("click", function () {
  for (let i = 0; i <= 100000; i++) {
    setTimeout(() => {
      macroBtn.innerHTML = i;
    }, i);
  }
});

// 마이크로 태스크 큐도 동기 코드와 마찬가지로 100000 이 다 채워진 후에 한번에 렌더링된다.
// 이미 마이크로 태스크 큐가 다 실행된 상태
microBtn.addEventListener("click", function () {
  for (let i = 0; i <= 100000; i++) {
    Promise.resolve().then(() => {
      microBtn.innerHTML = i;
    });
  }
});

macroMicroBtn.addEventListener("click", function () {
  for (let i = 0; i <= 100000; i++) {
    syncBtn.innerHTML = i;

    setTimeout(() => {
      macroBtn.innerHTML = i;
    }, i);

    Promise.resolve().then(() => {
      microBtn.innerHTML = i;
    });
  }
});

console.log("a");
setTimeout(() => {
  console.log("b");
}, 0);

Promise.resolve().then(() => {
  console.log("c");
});

window.requestAnimationFrame(() => {
  console.log("d");
});

// a c d b
// requestAnimationFrame 처럼 브라우저에 렌더링하는 작업은
// micro > 렌더링 > macro

// micro 큐도 동기 코드처럼 렌더링에 영향을 미칠 수 있다
// 무거운 작업이라면, 어떻게 분리해서 사용자에게 제공할지 고민이 필요하다.
