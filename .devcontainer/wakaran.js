// 何でこの順番で実行されるのかわからない
// htmlからボタン要素を取ってきてる
const btn = document.querySelector('button');
// 取ってきたボタンをクリックそたら何をするか
btn.addEventListener('click', function task2() {
    console.log('task2 done');
});
// a関数の定義
function a() {
    // ４秒後に１引く数をじこう
    setTimeout(function task1() {
        console.log('task1 done');
    }, 4000);
    // ２秒間待つ　待ってから実行
    const startTime = new Date();
    while(new Date() - startTime < 2000);
    console.log('fn a done');
}
a();

// ４タスクキューが後回し
setTimeout(function task1() {
    console.log('task1');
});

new Promise(function promise(resolve) {
    console.log('promise');
    resolve();
    // ３のジョブキューが優先
}).then(function job1() {
    console.log('job1');
});
console.log('global end');



new Promise(function promise(resolve) {
    console.log('promise');

    setTimeout(function task1() {
        console.log('task1');
        resolve();
    });

    // ジョブキューに入ってるもの全部実行
}).then(function job1() {
    console.log('job1');
    setTimeout(function task2() {
        console.log('task2');
    });

    queueMicrotask(function job4() {
        console.log('job4');
    });
}).then(function job2() {
    console.log('job2');
}).then(function job3() {
    console.log('job3');
});
console.log('global end');