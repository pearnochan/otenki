// // const list=[10,20,30];
// // const[x,y,z]=list;//x=10,y=20,z=30
// // const[a,b]=list;//a=10,b=20
// // const[i,j,k,l]=list;//i=10,j=20,k=30,l=undefined
// // const[m,,n]=list;//m=10,n=30
// // const[one,...rest]=list;//one=10,rest[20,30]

// const member1={
//     name:'Tom',
//     gender:'male',
//     age:20,
// };

// const{name1,gender,memo='---'}=member1;//name=

// const{gender:sex}=member1;

// const{name2, ...rest}=member1;

// const member={
//     name:'Tom',
//     address:{
//         prefecture:'東京都',
//         city:'江東区',
//     },
// };
// const{address,address:{city}}=member;
// console.log(address);//{prefecture:'東京都',city:江東区}
// console.log(city);//江東区

// function sum(...nums){
//     let result=0;
//     for (const num of nums){
//         result += num;
//     }
//     return result;
// }
// console.log(sum(10,25,5));//40

// const nums =[10,25,5];
// console.log(sum(nums));//意図した結果にならない
// console.log(sum(...nums))//40

// function greet({name,age}){
//     console.log(`Hello my name is ${name},${age}years old.`);
// }
// const member ={name:'Tom',gender:'male',age:20};
// greet(member);

// const str ="かわいい";
// // console.log(str.substring(1));

// if(str !== null && str !== undefined){
//     console.log(str.substring(1));
// }

// console.log(str?.substring(1));

// // null合体演算子
// let value = null;
// console.log(value ?? '既定値');//既定値

// Null合体演算子複合代入演算子
// let value = null;
// value ??= '既定値';
// console.log(value);//既定値

// let obj ={
//     property1:'Hello',
//     property2:function(){
//         console.log(this.property1+'zzz')
//     },
//     property3:{
//         bye:'Bye'
//     }
// }

// console.log(obj["property1"]);

// 配列の宣言
// const fruits =[];
// let numbers=new Array();

// // 初期化（値を入れて宣言）
// const colors =["Red","Green","Blue"];

// // 値の代入変更
// const fruits1=["Apple","Banana"];
// fruits1[1]="Orange";
// console.log(fruits);

// fruits.push("Melon");
// console.log(fruits);


// const fruits =["Apple","Banana","Orange"];
// // 方法１
// for(let i =0; i<fruits.length;i++){
//     console.log(fruits[i]);
// }

// // 方法２
// fruits.forEach((fruit,index)=>{
//     console.log(index,fruit);
// });

// // 方法３
// for(const fruit of fruits){
//     console.log(fruit);
// }

// map 各要素を変換して新しい配列を作る
// const numbers=[1,2,3];
// const doubled=numbers.map(num=>num*2);
// console.log(doubled);

// // filter:条件に合うものだけ残す
// const numbers =[1,2,3,4,5];
// const even = numbers.filter(num=>num%2===0);
// console.log(even);//[2,4]

// const numbers=[1,2,3,4];
// const even=numbers.reduce((accumulator,current)=>accmulator+current,0);
// console.log(sum);//→10

// let a = 2;
// function fn1(){
//     let b=1;
//     function fn2(){
//         let c=3;
//     }
//     fn2();
// }
// fn1();

// let a =1;
// function fn1(){
//     let a =2;
//     function fn2(){
        
//         console.log(a);
//     }
//     fn2();
// }
// fn1();

// let result =(function(name){
//     return "こんにちは"+name;
// })("えり");

// console.log(result);

// function a(){
//     console.log('called');
// }
// a();
// (a)();

// let a =(function(){
//     let privateVal=0;
//     let publicVal=10;
//     function privateFunction(){
//         console.log('private function is called.')
//     }
//     function publicFunction(){
//         console.log('public function is called.')
//     }

//     return{publicVal,publicFunction}
// })();

// a.publicFunction();
// console.log(a.publicVal);

// function printTypeAndValue(val){
//     console.log(typeof val,val);
// }
// let a=0;
// printTypeAndValue(a);//number0
// let b='1'+a;
// printTypeAndValue(b);//string10
// let c=15-b;
// printTypeAndValue(c);
// let d=c- null;
// printTypeAndValue(d);
// let e =d-true;
// printTypeAndValue(e);

// let a =1;
// console.log(Boolean(a));
// let b='';
// console.log(Boolean(b));
// let c=0n;
// console.log(Boolean(c));
// let d=null;
// console.log(Boolean(d));
// let e=parseInt("");
// console.log(Boolean(e));
// let f;
// console.log(Boolean(f));

// function fn(a,b=1){
//     console.log(arguments);
// }
// fn(1,2,3);//0のみでデフォルト引数はない

// function fn(){
//     console.log(arguments[0]);//a
//     console.log(arguments)
// }

// function fn(){
//     console.log('fn!');
// }
// fn.prop=0;
// fn.method=function(){
//     console.log('method!');
// }
// fn();
// fn.method();
// console.log(fn.prop);
// function hello() {
//     console.log('HELLO');
// }
// function fn(callback) {
//     // 何らかの処理
//     callback('Tom');
// }
// fn(hello);
// fn(function(name) {
//     console.log('Hello ' + name);
// });
// setTimeout(hello, 3000); // JSエンジンによって用意されるもの

// const person={
//     name:"Tom",
//     hello:function(){
//         console.log('Hello'+this.name);
//     }
// }
// person.hello();


// window.name='Bob';
// const person={
//     name:'Tom',
//     hello:function(){
//         console.log('Hello'+this.name);
//     }
// }
// function fn(callback){
//     callback();
// }
// fn(person.hello);

// window.name='Bob';
// const person={
//     name:'Tom',
//     hello:function(){
//         console.log('Hello'+this.name);
//     }
// }
// const helloTom=person.hello.bind(person);
// function fn(callback){
//     callback();
// }
// fn(helloTom);

