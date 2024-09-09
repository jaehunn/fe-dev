// 클래스 = 반복적인 객체를 만들기 위한 템플릿

class Car {
  // 정적 멤버
  static hello() {
    console.log("안녕하세요.");
  }

  // private member
  #name: string;

  constructor(name: string) {
    // 멤버 / 프로퍼티
    this.#name = name;
  }

  get getName() {
    return this.#name;
  }

  set setName(name: string) {
    this.#name = name;
  }

  // 인스턴스 메서드 / 프로토타입 메서드
  hello(): void {
    console.log("hello.");
  }
}

const car = new Car("foo");
console.log(car.getName); // foo
Object.getPrototypeOf(car).hello(); // hello.
console.log(Car.prototype === Object.getPrototypeOf(car)); // true

// __proto__ 는 typeof null === 'object' 처럼 하위 호환성을 위해서만 존재했던 기능이라, Object.getPrototypeOf 를 권장.
// console.log(car.__proto__ === Object.getPrototypeOf(car));

// 자기 자신부터 Object 객체의 메서드까지 훓는데. 이걸 프로토타입 체이닝이라고 한다.
car.hello(); // Car.hello()
car.toString(); // Object.toString()

// 프로토타입 덕분에,
// 직접 선언하지 않은 메서드를 호출할 수 있고,
// 메서드 내부에서 this 도 접근할 수 있게 되는 것.

// 정적 메서드는 인스턴스가 아닌 클래스가 가지는 메서드다. 때문에, this 를 사용할 수 없다.
// 일례로 static getDerivedStateFromProps() 에서는 this.state 에 접근 할 수 없다.
Car.hello();

// 정적 메서드는 인스턴스 생성없이 사용할 수 있다는 점.
// 보통 전역에서 사용하는 유틸 함수를 정적 메서드로 활용한다.

class Truck extends Car {
  constructor(name: string) {
    // 부모 Car 의 constructor 를 호출한다.
    super(name);
  }
}

const truck = new Truck("bar");
truck.hello();

// 클래스는 프로토타입을 십분 활용한다고 볼 수 있다.
// class 키워드는 syntactic sugar 를 할 뿐이다.

export default Car;
