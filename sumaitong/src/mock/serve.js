import Mock from 'mockjs';
//引入模拟的数据。图片、json文件等都是默认对外暴露，不用写export，在这儿可以直接引入
import banner from './banner.json';
import floor from './floor.json';

//Mock依赖包对外暴露的是一个Mock对象，这个对象提供的一个mock方法可以模拟数据
//两个参数：请求地址、返回的数据。
//注意:项目当中发请求的接口
//第一种:真实服务器接口 http://39.98.123.211/api/list/xx 
//第二种:mock出来数据接口xxx/mock/banner
//路径当中出现/api 真实接口    /mock 模拟数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});