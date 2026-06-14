//変数
const name ="田中";
const age =25;

//文字列の組み立て
console.log(`名前:${name}`);
console.log(`年齢:${age}`);

//関数
function greet (name){
    return `こんにちは、${name}さん！`;
}

console.log(greet("佐藤"));

//配列
const fruits=["りんご","みかん","ぶどう"];
fruits.forEach((fruit)=>{
    console.log(`フルーツ:${fruit}`);
});

//条件分岐
const score=100;
if (score>=80){
    console.log("合格");
}else{
    console.log("不合格");
}

const fn3 =(name)=>{
    return 'hello+name;

}

console.log(fn3('Tom'));