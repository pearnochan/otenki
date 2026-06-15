// onsole.log() はブラウザの開発者ツール（コンソール）に文字を出力するもの
// プログラムが動いているか確認するためによく使う
// なくても無問題
console.log("お天気自動販売機スタート");

// 金額：「今いくら投入されているか」を記録する変数を作って、最初は0円にしている
// let → 後で値を変えられる変数を作る
let currentMoney = 0;

// ボタン取得（HTML読み込み後に安全に実行）

// HTMLが全部読み込まれたら、中の処理を実行してという命令
// window → ブラウザ全体を表すオブジェクト
// .addEventListener → 「〇〇が起きたら実行して」と登録するメソッド
// "DOMContentLoaded" → 「HTMLが全部読み込まれた」というイベントの名前
window.addEventListener("DOMContentLoaded", () => {


    // HTMLの中から intserMoneyBtn 「お金を入れるボタン」というIDを持つ要素を見つけてきて、button という名前をつける
    // const → 後で値を変えない変数を作る
    // button → 変数の名前
    // document → HTMLページ全体を表すオブジェクト
    // .getElementById → IDで要素を探すメソッド
    // "intserMoneyBtn" → 探すIDの名前
    const button = document.getElementById("intserMoneyBtn");

    // html「商品ボタンを並べるための空っぽの箱」を見つけてきて、containerという名前にする
    // HTMLの中から productContainer というIDを持つ要素を見つけてきて、container という名前をつける
    // document.getElementById → IDで要素を探すメソッド
    // "productContainer" → 探すIDの名前
    const container = document.getElementById("productContainer");

    
    // htmlから「金額を入力する白いボックス」を見つけてきて、moneyInputという名にする
    // document.getElementById → IDで要素を探すメソッド
    // "moneyInput" → 探すIDの名前
    const moneyInput = document.getElementById("moneyInput");

    // container がちゃんと取得できているかブラウザのコンソールに出力して確認する
    console.log("container:", container); // 確認用

    // 全体： 商品データを配列で作って products という名前をつける
    // const products → 変数の名前 
    // [...] → 配列（複数のデータをまとめて入れる箱）
    // {...} → オブジェクト（1つの商品のデータをまとめたもの）
    const products = [
        // オブジェクトの配列
        // { → オブジェクトの始まり　id: 1 → 商品番号は1　name: "晴れ" → 商品名は晴れ　price: 120 → 値段は120円　stock: 5 → 在庫は5個} → オブジェクトの終わり, → 次の商品データが続くよという区切り
        { id: 1, name: "晴れ",          price: 120, stock: 5 },
        { id: 2, name: "雨",            price: 150, stock: 5 },
        { id: 3, name: "曇り",          price: 130, stock: 5 },
        { id: 4, name: "雪",            price: 200, stock: 5 },
        { id: 5, name: "メルティーキス", price: 500, stock: 1 }
    ];

    // 釣銭用の硬貨在庫(自販機の中に入っている硬貨の枚数)
    // 実際の自販機と同じように、釣銭用の硬貨を管理する
    // 自販機の中にある釣銭用の硬貨の枚数を管理するオブジェクトを作る
    // const changeStock → 変数の名前（釣銭在庫という意味）{...} → オブジェクト　500:5 → 500円玉が5枚...
    const changeStock = { 500:5, 100:10, 50:10, 10:20, 5:10, 1:20 };

    // 共通の非同期パーツ:指定したミリ秒だけ待つ関数を作る
    // const sleep → 変数の名前（眠るという意味）
    // (ms) → 何ミリ秒待つかを受け取る引数（msはmillisecondの略）
    // => → アロー関数
    // new Promise → 非同期処理を扱うための仕組み　正直よくわからん
    // resolve → 待ち終わったら「終わったよ」と知らせる
    // setTimeout(resolve, ms) → ms ミリ秒後に resolve を呼ぶ
    // promise 時間がかかる処理を必ず後で返すよって約束＝時間がかかる処理
    // sleepにpromiseって関数がはいる
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    // 釣銭が作れるかチェックして、作れるなら硬貨在庫を減らす関数
    // 大きい硬貨から順番に使っていく(貪欲法アルゴリズム)

    // 釣銭を計算する関数を作る
    // const makeChange → 変数の名前（釣銭を作るという意味）
    // (amount) → いくら釣銭を作ればいいかを受け取る引数
    // => → アロー関数
    // { → 関数の処理の始まり
    const makeChange = (amount) => {

        // 釣銭として返すお金をメモする箱　結果を返す変数
        const result = {};

        // まだ作れていない残りの釣銭金額を記録する変数を作って、最初はamountと同じ金額にする
        // let → 後で値が変わるので let（const じゃない）
        // remaining → 変数の名前（残りという意味）
        // = amount → 最初の値はamount（釣銭の合計金額）と同じ
        let remaining = amount;

        // 大きい順に硬貨を試していく　500円から1円まで順番に硬貨を1種類ずつ取り出して処理する
        // for...of → 配列の中身を1つずつ取り出して繰り返す
        // const coin → 今取り出している硬貨の金額　
        for (const coin of [500, 100, 50, 10, 5, 1]) {

            // この硬貨を何枚使えるか計算する
            // Math.floor(...) → 小数点以下を切り捨てる（硬貨は整数枚しか使えないので）
            // changeStock[coin] → この硬貨が在庫に何枚あるか
            // Math.min(...) → 2つのうち小さい方を選ぶ
            const count = Math.min(Math.floor(remaining / coin), changeStock[coin]);

            // if (count > 0) → 1枚以上使う場合だけ処理する
            if (count > 0) {
                // result[coin] = count → 結果に「この硬貨を何枚使う」を記録する
                result[coin] = count;
                // remaining / coin → 残り金額をこの硬貨で割る（何枚使えるか）
                // remaining -= coin * count → remainingから使った金額を引く
                remaining -= coin * count;
            }
        }
        // 釣銭が作りきれなかった場合はnullを返す
        if (remaining > 0) return null;

        // 釣銭が作れた場合は硬貨在庫を実際に減らす
        // Object.keys(result) → resultオブジェクトのキー（硬貨の種類）を配列で取り出す
        // for...of → 1種類ずつ順番に処理する
        for (const coin of Object.keys(result)) {

             // changeStock[coin] -= result[coin] → 在庫から使った枚数を引く
            changeStock[coin] -= result[coin];
        }
        //  計算した釣銭の結果を呼び出した場所に返す
        return result;
    };

    // 非同期関数:お金を計算して画面を更新する処理
    // const insertMoneyAsync → 変数の名前（お金を非同期で入れるという意味）
    // async → この関数は非同期処理をしますよという宣言
    // (amount) → いくら投入するかを受け取る引数
    // => → アロー関数
    const insertMoneyAsync = async (amount) => {
        // 自販機にお金が吸い込まれるタイムラグを再現
        // await → Promiseが終わるまでここで待つ
        // sleep(500) → 500ミリ秒待つPromiseを作る
        await sleep(500);
        // 投入した金額を現在の金額に足す
        // currentMoney → 今いくら入っているか
        // += → 今の値に足して上書きする
        // amount → 投入した金額
        currentMoney += amount;
        // 画面の金額表示を更新
        // 
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        return currentMoney;
    };

    // 非同期関数　商品を購入する処理
    // async → 非同期関数の宣言、これで中で await が使える
    const buyProductAsync = async (product) => {
        // 自販機の中でウィーンと商品を選別しているタイムラグ(1.5秒)を再現
        document.getElementById("consolelog").textContent = "購入中...準備しています";
        // 1.5秒待つ（自販機がウィーンと動くタイムラグを再現）
        await sleep(1500);

        // 在庫チェック
        if (product.stock <= 0) {
            // throw を使うと、そこで処理が止まって下の catch に飛ぶ
            throw new Error("売り切れです");
        }
        // お金が足りない場合のチェック
        if (currentMoney < product.price) {
            // エラーを発生させて、下のcatch側でキャッチしてもらう(本格的な開発の手法です)
            throw new Error("お金が足りません");
        }

        // 釣銭が作れるかチェック
        const change = currentMoney - product.price;

        // 釣銭が必要な場合だけ makeChange を呼ぶ
        if (change > 0) {
            const changeResult = makeChange(change);
            // 釣銭が作れない場合はエラー
            if (changeResult === null) {
                throw new Error("釣銭切れです");
            }
        }

        // 金額の引き算
        // 投入金額から商品の値段を引く-= は currentMoney = currentMoney - product.price と同じ意味
        currentMoney -= product.price;
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        // 在庫を1つ減らす
        product.stock -= 1;

        // 成功メッセージを返す
        return "ゴトン！購入しました！お釣り:" + currentMoney + "円";
    };

    // キャンセル・返金処理
    // HTMLから cancelBtn というIDのボタンを見つけて、クリックされたら中の処理を実行する
    document.getElementById("cancelBtn").addEventListener("click", () => {
        // お金が入っていない場合は何もしない
        if (currentMoney <= 0) {
            document.getElementById("consolelog").textContent = "お金が入っていません";
            return;
        }
        // 今入っているお金を返金する
        // 今入っている金額を refund に保存する理由：次の行で currentMoney を0にしてしまうので、先に金額を覚えておく必要がある
        const refund = currentMoney;
        // 投入金額を0円にリセットする
        currentMoney = 0;
        // 画面の金額表示を0円に更新する
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        // 画面に「○○円を返金しました」と表示するrefund を使うのは、currentMoney はもう0になっているから！
        document.getElementById("consolelog").textContent = refund + "円を返金しました";
    });

    // イベントリスナー　お金投入ボタン
    // お金投入ボタンがクリックされたら中の処理を実行する　async → 中で await を使うので非同期にする
    button.addEventListener("click", async () => {
        // ユーザーが入力した文字(例:500)を計算ができるように本物の数字に変える
        // 入力欄の文字を数字に変換して inputMoney に入れる
        const inputMoney = Number(moneyInput.value);
        // もし入力されたのが数字じゃなかったり(空っぽ)、0円以下なら、ここで処理を終わりにする
        if (isNaN(inputMoney) || inputMoney <= 0) {
            // 履歴結果の欄に警告メッセージを表示する
            document.getElementById("consolelog").textContent = "正しい金額を入力してね";
            // returnを書くと、これより下の処理を実行せずにここで強制終了します
            return;
        }
        // 画面の表示を「お金を読み込んでいます...」に書き換える
        // document → HTMLページ全体
        // .getElementById → IDで要素を探すメソッド
        // "consolelog" → 探すIDの名前
        // .textContent → その要素の文字
        // = → 代入
        // "お金を読み込んでいます..." → 表示する文字
        document.getElementById("consolelog").textContent = "お金を読み込んでいます...";
        // エラーが起きるかもしれない処理を試す
        try {
            // 非同期でお金をチャージする関数を呼び出して待つ
            // お金を投入する非同期関数を呼んで、終わるまで待つ
            await insertMoneyAsync(inputMoney);
            // 画面に「○○円投入しました！何にする？」と表示する
            document.getElementById("consolelog").textContent = inputMoney + "円投入しました！何にする？";
            // お金を自販機の中に吸い込んだので、入力欄の数字を消して空っぽに戻す
            moneyInput.value = "";
            // tryの中でエラーが起きたら「エラーが発生しました」と表示する
        } catch (error) {
            document.getElementById("consolelog").textContent = "エラーが発生しました";
        }
    });

    // 商品ボタン生成
    // productsの商品を1つずつ取り出して処理する
    products.forEach(product => {
        //  ボタンのHTML要素を新しく作る
        const btn = document.createElement("button");
        // ボタンに「商品名 値段円」という文字を設定する
        btn.textContent = product.name + " " + product.price + "円";
        // style.cssと連動
        btn.classList.add("product-btn");

        // クリックイベント処理全体を非同期にする(async)
        btn.addEventListener("click", async () => {
            // 商品を購入する非同期関数を呼んで、結果を successMessage に入れる
            // try → エラーが起きるかもしれない処理を試す　
            // const successMessage → 成功メッセージを入れる変数
            // await → 終わるまで待つ
            // buyProductAsync(product) → 商品を購入する非同期関数
            try {
                const successMessage = await buyProductAsync(product);
                document.getElementById("consolelog").textContent = successMessage;
                // 売り切れたらボタンを変える
                // 在庫が0になったらボタンを売り切れ表示にして押せなくする
                if (product.stock <= 0) {
                    btn.textContent = product.name + " 売り切れ";
                    btn.disabled = true;
                }
                // エラーが起きたらそのエラーメッセージを画面に表示する
            } catch (error) {
                document.getElementById("consolelog").textContent = error.message;
            }
        });

        // 綺麗に完成したボタンを、htmlにあるproductContainerという商品箱にがっちゃんこと入れる
        container.appendChild(btn);
    });

});