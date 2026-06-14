// const tim={name:'Tim'}
// function a(){
//     console.log('Hello'+this.name);
// }
// const b =a.bind(tim);
// b();//Hello Tim と出力される
// a.call(tim);//Hello Timと出力される
// a.apply(tim);//Hello Tim と出力される


// const tim={name:'Tim'}
// function a(name){
//     console.log('Hello'+name);
// }
// a.call(tim,'Tom');//Hello Tom と出力される

// const ti ={name:'Tim'}
// function a(name1,name2){
//     console.log('Hello'+name1+','+name2);
// }
// a.apply(tim,['Tom','Bob']);//Hello tom,Bobと出力される


// window.name='Bob';
// const person={
//     name:'Tom',
//     hello:function(){
//         console.log('Hello'+this.name);
//     }
// }
// person.hello(); //Hello Tom メソッドとして実行
// const hello=person.hello;
// hello();//hello bob 関数として実行
// const helloTom= person.hello.bind(person);
// helloTom();//hello tom thisの束縛
// person.hello.call(person);//hello Tom thisの束縛：関数として実行
// person.hello.apply(person);//hello tom thisの束縛　＊関数として実行


// // アロー関数３
// window.name='Bob';
// const person={
//     name:'Tom',
//     hello:function(){
//         console.log('Hello'+this.name);
//     },
//     hi:()=>{
//         console.log('Hello'+this.name);
//     }
// }
// person.hello();//Hello Tomと出力される　オブジェクト内のthis
// person.hi();//hello bob と出力　アロー関数はグローバル関数を参照しに行くもの


// // アロー関数２
// window.name='Bob';
// const a=()=>console.log('Bye'+this.name);
// const person ={
//     name:'Tom',
//     hello(){
//         console.log('Hello'+this.name);//Hello Tomと出力
//         a();//Bye Bob と出力される グローバル
//     }
// }
// person.hello();


// // アロー関数３　めんどい
// window.name='Bob';
// const person={
//     name:'Tom',
//     hello(){
//         console.log('Hello'+this.name);
//         const a=()=>console.log('Bye'+this.name);
//         a();
//     }
// }
// person.hello();

///インスタンス関数　大体大文字にする
// function Person(name,age){
//     this.name=name;
//     this.age=age;
// }
// const bob=new Person('Bob',20);

// console.log(bob);

// クラス表記
// class Person {
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
//     hello(){
//         console.log('Hello'+this.name);
//     }
// }

// const person=new Person('Bob',30);

// console.log(person);

class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    hello(){
        console.log('Hello'+this.name);
    }
}

// // personにあるものをjapaneseクラスに引き継ぐ
// class Japanese extends Person{
//     constructor(name,age,gender){
//         SourceBuffer(name,age);//プロパティ
//         this.gender=gender;//プロパティ
//     }
//     hi(){
//         console.log('Hi'+this.name);
//     }
//     bye(){//prototype
//         console.log('Bye'+this.name)};
// }
// const person = new Japanese('Bob',30,'Male');


// ゲッターセッターES６以降
class Person{
    constructor(name,age){
        this._name=name;
        this._age=age;
    }
    get name(){
        return this._name+'!!'
    }
    set name(value){
        this._name=value;
    }
}
const person=new Person('Bob',30);
console.log(person.name);