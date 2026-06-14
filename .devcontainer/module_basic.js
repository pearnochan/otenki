import{Article,getTriangle}from'./App.js';

console.log(getTriangle(10,5));//25

const a =new Article();
console.log(a.getAppTitle());//reactアプリ

import { getTriangle as tri } from './App.js';
console.log(tri,10,5);