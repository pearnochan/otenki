console.log("vending.js 読み込み成功！");ß
// コンソールで入力を受け取るための道具(モジュール)を読み込む
const readline = require('readline');
// node.jsが持っているreadlineという名前で使います

// 画面からの入力(input)と、画面への出力(output)を繋ぐ設定をする
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});ß

// 商品データを登録して画面に出す
const products =[
    { id:1,name:'晴れ',price:120},
    { id:2,name:'雨',price:150},
    { id:3,name:'曇り',price:130},
    { id:4,name:'雪',price:200},
    { id:5,name:'アラレ',price:170},
    { id:6,name:'吹雪',price:250},
    { id:7,name:'メルティーキッス',price:350}
];

console.log('---お天気自動販売機へようこそ---');
products.forEach(p => console.log(`${p.id}:${p.name}`));
console.log('-----------------------------\n');

// お金の投入
rl.question('お金を投入してください(円):',(moneyInput)=>{
    // 入力された文字を数字に変換
    const money=parseInt(moneyInput,10);

    // 正しいお金が入ったかチェックする
    if(isNaN(money)||money<=0){
        console.log('正しい金額を入力してください。終了します。');
        rl.close();
        return;
    }

    console.log(`${money}円受け取りました。`);


// 商品を選んでもらい、判定する
rl.question('商品番号を選んでください(1~3):',(productInput)=>{
    const productId = parseInt(productInput,10);//入力された番号を数字に変換

    // 選ばれた番号の商品をメニュー表から探す
    const selectedProduct = products.find(p=>p.id=== productId);

    if(!selectedProduct){
        // 存在しない番号の場合
        console.log('無効な商品番号です。お札、コインを返却します。');
    }else if (money< selectedProduct.price){
        // お金が足りない場合
        console.log(`金額不足です！ ${selectedProduct.name}は${selectedProduct.price}円です。`);
        console.log(`${money}円を返却します。`);
    }else{
        // お金が足りて購入できたとき
        const change =money - selectedProduct.price;//お釣りの計算
        console.log(`\n【ガサゴソ】${selectedProduct.name}を購入しました`);
        console.log(`お釣りは${change}円です。ありがとうございました！`);
    }

    // 全ての処理が終わったので窓口を閉じる
    rl.close();
});
});
