// function sleep(ms) {//sleep変数にmsを入れてる
//     const startTime = new Date();//潜在時刻をstarttimeに入れてる
//     while(new Date() - startTime < ms);
//     //２行目で記録したshorttimeを引き算する、
//     // これでスタートしてから何ミリ秒経ったかが計算できる、
//     // その時間が目標のmsより小さい間は後ろのセミコロン（なにもしない）を実行し続ける
//     // 何秒間とめたいって処理
//     //5000より小さいと、ずっと処理が続く
//     console.log('sleep done');
//     //whileが終わったら、consoleで出力
// }
// const btn = document.querySelector('button');
// // htmlの中にあるbuttonタグを探し出して、
// // javascriptの中でbtnという名前で扱えるようにします
// btn.addEventListener('click', function() {
//     console.log('button clicked');
// });
// // ボタンを押された時に　イベントをはっかする　クリックしたタイミングで

// sleep(5000);//ミリビョウ 1000で1秒



// // setTimeout(function(){
// //     sleep(5000);
// // },2000)
// // // 2秒後にsleep(5000)を動かしてねという予約
// //htmlのボタンをbtn定数にいれる
// const btn = document.querySelector('button');
// // addeventkisner クリックイベントをbtnに入れて、ボタン押すとtaskdoneって出るようにする
// btn.addEventListener('click', function task2() {
//     console.log('task2 done');
// });
// // a関数を実装　
// function a() {
//     // 優先順位があと　自分の処理が残ってても次の処理に行くから非同期処理
//     // 4秒待った後に第一引数を実行　
//     setTimeout(function task1() {
//         console.log('task1 done');
//     }, 4000);
//     const startTime = new Date();
//     while(new Date() - startTime < 5000);
//     console.log('fn a done');
// }
// a();

// function a(){
// settimeoutの非同期処理だからタスクキューに入れられる
//     setTimeout(function task1(){
//         console.log('task1 done');
//         b();
//     });
// 　同期処理だからそのまま実行
//     console.log('fn a done');
// }
// 　同期処理だからそのまま実行
// function b(){
//     console.log('fn b done');
// }
// a();
// b();
// // 同期処理が終わってから、非同期処理のやつがタスクキューを経由して実行される
// fn a done   fn b done. task 1 done

// function sleep(callback) {
//     setTimeout(function() {
//         console.log('hello');
//         callback();
//     }, 1000);
// }
// sleep(function() {
//     console.log('callback done');
// });


// function sleep(callback,val){
//     setTimeout(function(){
//         console.log(val++);
//         callback(val);
//     },1000);
// }
// sleep(function(val){
//     sleep(function(val){
//         sleep(function(val){

//         },val)
//     },val)
// },0);

// // newでpromiseをインスタンス化
// new Promise(function(resolve,reject){
//     //resolve 成功したとき
//     // reject 失敗した時
//     resolve('hello');//then実行
//     reject('bye');//catch実行
// }).then(function(data){
//     console.log(data);//'hello'
// }).catch(function(){
//     console.log(data)//'bye'
// }).finally(function(){
//     console.log('終了処理');
// });

// new Promise(function(resolve,reject){
//     console.log('promise');
//     resolve();
// }).then(function(){
//     console.log('then1');
// }).then(function(){
//     console.log('then3');
// });
// console.log('global end')

// new Promise(function(resolve, reject) {
//     console.log('promise');
//     reject();
// }).then(function() {
//     console.log('then1');
// }).then(function() {
//     console.log('then2');
// }).then(function() {
//     console.log('then3');
// }).catch(function(){
//     console.log('catch');
// });
// console.log('global end');

// new Promise(function(resolve,reject){
//     console.log('promise');
//     resolve();
// }).then(function(){
//     console.log('then1');
//     throw new Error();
// }).then(function(){
//     console.log('then2');
// }).catch(function(){
//     console.log('catch');
// });
// console.log('global end');

// new Promise(function(resolve,reject){
//     console.log('promise');
//     setTimeout(function(){
//         resolve('hello');
//     },1000);
// }).then(function(data){
//     console.log('then1:'+data);
//     return 'bye';
// }).then(function(data){
//     console.log('then2'+data);
// }).catch(function(data){
//     console.log('catch:'+data);
// }).finally(function(){
//     console.log('finally');
// });
// console.log('global end');

// function sleep(val) {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             console.log(val++);
//             resolve(val);
//         }, val * 500);
//     })
// }
// Promise.all([sleep(2), sleep(3), sleep(4)]).then(function() {
//     console.log('end');
// });

// function sleep (val){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             console.log(val++);
//             resolve(val);
//         },val*500);
//     })
// }
// //raceは同時に実行されるのはかわらない　raceは最初に終わったら、consoleも実行
// Promise.race([sleep(2),sleep(3),sleep(4)]).then(function(data){
//     console.log(data);
// })

// function sleep(val) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             console.log(val++);
//             resolve(val);
//             // reject(val);
//         }, val * 500);
//     })
// }
// // allsettledの方が詳細に
// Promise.allSettled([sleep(2), sleep(3), sleep(4)]).then(function(data) {
//     console.log('--- allSettled ---');
//     console.log(data);
// })

// setTimeout(function task1() {
//     console.log('task1');
// });

// new Promise(function promise(resolve) {
//     console.log('promise');
//     resolve();
// }).then(function job1() {
//     console.log('job1');
// });
// console.log('global end');


// new Promise(function promise(resolve){
//     console.log('promise');

//     // setTimeout=マクロタスク→後回し
//     setTimeout(function task1(){
//         console.log('task1');
//         // resolveが中にあると、resolveの処理終わらせないと、次に行かないらしい
//         resolve();
//     });
// }).then(function job1(){
//     console.log('job1');
//     setTimeout(function task2(){
//         console.log('task2');
//     });

//     queueMicrotask(function job4(){
//         console.log('job4');
//     });
// }).then(function job2(){
//     console.log('job2');
// }).then(function job3(){
//     console.log('job3');
// });
// console.log('global end');

function sleep(val){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(val++);
            resolve(val);
        },1000);
    });
}
// async　がつくと、中身が非同期処理
async function init(){
    // resolve valのvalがここに入る　awaitだから待つ
    let val = await sleep(0);
    console.log(val);
}
init();