// 指定した秒数(ミリ秒)だけ待つ、基本のパーツ
const delay
 // 　delayって名前で保存するよ　
//  タイマーを自作してるみたいな
=(ms)=>
//    　ms(ミリビョウ)で受け取る関数だよ　
// 　[アロー関数]右側にある処理を実行してね 
    new Promise
    // new:設計図から本物のインスタンス(実体)を作り出す魔法
    // promise型:時間を止めて末路言う機能の設計図
    // 
    (resolve => setTimeout(resolve,ms));

// お湯を沸かす関数(3秒かかる)
async function boilWater () {
    console.log("[湯沸かし]お湯を沸かし始めました...");
    await delay(3000);
    // ３秒待つ
    console.log("[湯沸かし]お湯が沸騰しました！");
}

// 麺を茹でる関数(2秒かかる)
async function cookPasta() {
    console.log("[パスタ]麺を鍋に入れました...");
    await delay(2000);
    // ２秒まつ
    console.log("[パスタ]麺が茹で上がりました！")    
}

// 盛り付け(一瞬で終わる)
function serve(){
    console.log("[完成]お皿に盛り付けて、絶品パスタの完成！イエイ！")
}

// 料理全体の流れをコントロールするメイン関数
async function makeDinner() {
    console.log("--- 料理スタート ---");

    // 1.まずお湯を沸かす(終わるまで待つ)
    await boilWater();

    // 2.お湯が沸いたら、麺を茹でる(終わるまで待つ)
    await cookPasta();

    // 3最後に盛り付け
    serve();

    console.log("--- 料理終了 ---");
    
}

// 実行！
makeDinner();