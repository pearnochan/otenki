console.log("お天気自動販売機スタート");

// 金額
let currentMoney = 0;

// ボタン取得（HTML読み込み後に安全に実行）
window.addEventListener("DOMContentLoaded", () => {

    // htmlから「お金を入れるボタン」を見つけてきて、buttonというなまえにする
    const button = document.getElementById("intserMoneyBtn");
    // html「商品ボタンを並べるための空っぽの箱」を見つけてきて、containerという名前にする
    const container = document.getElementById("productContainer");
    // htmlから「金額を入力する白いボックス」を見つけてきて、moneyInputという名にする
    const moneyInput = document.getElementById("moneyInput");

    // ちゃんと箱が取得できているか、ブラウザのデベロッパーツール(確認画面)に出力する
    console.log("container:", container); // 確認用

    // 商品データ
    const products = [
        { id: 1, name: "晴れ",          price: 120, stock: 5 },
        { id: 2, name: "雨",            price: 150, stock: 5 },
        { id: 3, name: "曇り",          price: 130, stock: 5 },
        { id: 4, name: "雪",            price: 200, stock: 5 },
        { id: 5, name: "メルティーキッス", price: 500, stock: 1 }
    ];

    // 釣銭用の硬貨在庫(自販機の中に入っている硬貨の枚数)
    // 実際の自販機と同じように、釣銭用の硬貨を管理する
    const changeStock = { 500:5, 100:10, 50:10, 10:20, 5:10, 1:20 };

    // 共通の非同期パーツ:ミリ秒単位で待つプロミス
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 釣銭が作れるかチェックして、作れるなら硬貨在庫を減らす関数
    // 大きい硬貨から順番に使っていく(貪欲法アルゴリズム)
    const makeChange = (amount) => {
        // 釣銭として返すお金をメモする箱
        const result = {};
        // 残りいくら釣銭を作ればいいか
        let remaining = amount;
        // 大きい順に硬貨を試していく
        for (const coin of [500, 100, 50, 10, 5, 1]) {
            // この硬貨を何枚使えるか計算する
            const count = Math.min(Math.floor(remaining / coin), changeStock[coin]);
            if (count > 0) {
                result[coin] = count;
                remaining -= coin * count;
            }
        }
        // 釣銭が作りきれなかった場合はnullを返す
        if (remaining > 0) return null;
        // 釣銭が作れた場合は硬貨在庫を実際に減らす
        for (const coin of Object.keys(result)) {
            changeStock[coin] -= result[coin];
        }
        return result;
    };

    // 非同期関数:お金を計算して画面を更新する処理
    const insertMoneyAsync = async (amount) => {
        // 自販機にお金が吸い込まれるタイムラグを再現
        await sleep(500);
        currentMoney += amount;
        // 画面の金額表示を更新
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        return currentMoney;
    };

    // 非同期関数　商品を購入する処理
    const buyProductAsync = async (product) => {
        // 自販機の中でウィーンと商品を選別しているタイムラグ(1.5秒)を再現
        document.getElementById("consolelog").textContent = "購入中...準備しています";
        await sleep(1500);

        // 在庫チェック
        if (product.stock <= 0) {
            throw new Error("売り切れです");
        }
        // お金が足りない場合のチェック
        if (currentMoney < product.price) {
            // エラーを発生させて、下のcatch側でキャッチしてもらう(本格的な開発の手法です)
            throw new Error("お金が足りません");
        }

        // 釣銭が作れるかチェック
        const change = currentMoney - product.price;
        if (change > 0) {
            const changeResult = makeChange(change);
            // 釣銭が作れない場合はエラー
            if (changeResult === null) {
                throw new Error("釣銭切れです");
            }
        }

        // 金額の引き算
        currentMoney -= product.price;
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        // 在庫を1つ減らす
        product.stock -= 1;

        // 成功メッセージを返す
        return "ゴトン！購入しました！お釣り:" + currentMoney + "円";
    };

    // キャンセル・返金処理
    document.getElementById("cancelBtn").addEventListener("click", () => {
        // お金が入っていない場合は何もしない
        if (currentMoney <= 0) {
            document.getElementById("consolelog").textContent = "お金が入っていません";
            return;
        }
        // 今入っているお金を返金する
        const refund = currentMoney;
        currentMoney = 0;
        document.getElementById("currentMoneyStatus").textContent = currentMoney;
        document.getElementById("consolelog").textContent = refund + "円を返金しました";
    });

    // イベントリスナー　お金投入ボタン
    button.addEventListener("click", async () => {
        // ユーザーが入力した文字(例:500)を計算ができるように本物の数字に変える
        const inputMoney = Number(moneyInput.value);
        // もし入力されたのが数字じゃなかったり(空っぽ)、0円以下なら、ここで処理を終わりにする
        if (isNaN(inputMoney) || inputMoney <= 0) {
            // 履歴結果の欄に警告メッセージを表示する
            document.getElementById("consolelog").textContent = "正しい金額を入力してね";
            // returnを書くと、これより下の処理を実行せずにここで強制終了します
            return;
        }
        document.getElementById("consolelog").textContent = "お金を読み込んでいます...";
        try {
            // 非同期でお金をチャージする関数を呼び出して待つ
            await insertMoneyAsync(inputMoney);
            document.getElementById("consolelog").textContent = inputMoney + "円投入しました！何にする？";
            // お金を自販機の中に吸い込んだので、入力欄の数字を消して空っぽに戻す
            moneyInput.value = "";
        } catch (error) {
            document.getElementById("consolelog").textContent = "エラーが発生しました";
        }
    });

    // 商品ボタン生成
    products.forEach(product => {
        const btn = document.createElement("button");
        btn.textContent = product.name + " " + product.price + "円";
        // style.cssと連動
        btn.classList.add("product-btn");

        // クリックイベント処理全体を非同期にする(async)
        btn.addEventListener("click", async () => {
            try {
                const successMessage = await buyProductAsync(product);
                document.getElementById("consolelog").textContent = successMessage;
                // 売り切れたらボタンを変える
                if (product.stock <= 0) {
                    btn.textContent = product.name + " 売り切れ";
                    btn.disabled = true;
                }
            } catch (error) {
                document.getElementById("consolelog").textContent = error.message;
            }
        });

        // 綺麗に完成したボタンを、htmlにあるproductContainerという商品箱にがっちゃんこと入れる
        container.appendChild(btn);
    });

});