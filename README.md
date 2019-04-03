# Webpack Configuration
## 웹팩의 필요성
* 자바스크립트 코드가 많아지면 한 파일로 관리하기가 어려워짐
* 기능에 따라 여러 자바스크립트 파일로 분리할 경우 브라우저에서 **로딩이 필요**하고, 네트워크 비용이 발생
* 각 파일이 서로의 **스코프를 침범**할 위험도 존재
    * IIFE(즉시실행함수)를 이용해서 모듈 생성
    * **모듈 시스템**(CommonJS나 AMD 스타일) : 파일별로 모듈을 관리 가능
    * ECMAScript 2015에서부터 import 적용
    
모듈을 IIFE 형태로 변경해주고, 하나의 파일로 묶어(bundle) 네트워크 비용을 최소화하는 과정이 필요

## Webpack 설치하기

    $ npm install --save-dev webpack webpack-cli
      
개발 할 때 필요한 패키지이므로, `--save-dev` 옵션을 주어 설치
* **webpack-cli** : 웹팩 4버전부터는 webpack-cli를 같이 설치해야 커맨드라인에서 webpack 명령어를 사용 가능

## Webpack 설정하기 (feat.핵심개념)
프로젝트의 root에 `webpack.config.js` 파일을 생성
> 웹팩 설정파일 명을 다른 것으로 할 수도 있는데, 이렇게 할 경우 웹팩이 바로 찾을 수 없기 때문에 커맨드라인에서 실행할 때 `webpack --config webpack.config.prod.js` 처럼 config 옵션으로 설정파일 위치를 알려주어야 함

### entry
의존성 그래프의 시작점, 웹팩이 파일을 읽어들이기 시작하는 부분
* 자바스크립트가 로딩하는 모듈이 많아질수록, 모듈 간의 의존성(=복잡도) 증가
* 엔트리를 통해 필요한 모듈을 로딩하고, 하나의 파일로 묶음

```js
// webpack.config.js
module.exports = {
    entry: {
        main: '.src/main.js',
        submain: './src/main2.js',
    },
}
```
html 파일에서 로딩할 자바스크립트 파일의 시작점, 여기에서는 `src/main.js`로 설정
* entry의 key 이름으로 value값 위치의 파일이 변환된 파일이 생성
* entry에 다수의 파일을 (key-value 형태로) 지정할 경우 여러 개의 파일로 분리 가능
* **하나의 엔트리에 여러 파일을 넣고 싶을 때** : value 자리에 파일 경로가 담긴 배열을 전달

```js
{
  entry: {
    app: ['a.js', 'b.js'],
  },
}
```

```js
// 전체 설정파일 예시
const path = require(`path`);
module.exports = {
    mode: "development",
    entry: {
        main: `./src/js/index.js`,
        submain: `./src/js/components/subcomponent/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `dist`),
    },
};
```

### output
하나로 번들된 결과물을 저장할 위치
```js
// webpack.config.js
const path = require(`path`);

module.exports = {
    mode: "development",
    entry: {
        main: `./src/js/index.js`,
        submain: `./src/js/components/subcomponent/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].js`,
        publicPath: `/`,
    },
};

```
`dist` 폴더의 `[key].js` 파일로 결과를 저장, html 파일에서는 `dist` 내의 `main.js`, `submain.js`를 로딩해서 사용

```html
<body>
    <script src="./dist/main.js"></script>
    <script src="./dist/submain.js"></script>
</body>
```

`main.js`에서는 다른 자바스크립트에서 export한 모듈을 import해서 사용
```js
// main.js
import Utils from './Utils'
Utils.log('Hello, webpack');
```

```js
// Util.js
export default class Utils {
    static log(msg) { console.log('LOG ${msg}') } 
}
```

작성한 코드를 바탕으로 웹팩을 빌드하고 싶다면 `webpack` 커맨드로 실행하면 됨

    $ npx webpack
    
* **결과** : output의 path로 지정한 dist 폴더 내에 번들링된 자바스크립트 파일 생성


### loader
트랜스 컴파일링, css 로딩 등 부가적인 기능을 추가할 수 있음

* `test` : 로딩할 파일을 지정
* `use` : 적용할 로더를 설정

> rules나 use 대신 loaders를 쓰고, options 대신 query를 쓰는 곳이 있다면, 웹팩1에 대한 강좌이며, 웹팩2에서 바뀜. 그렇게 사용할 경우 에러가 발생함.

#### babel-loader
대표적인 웹팩 로더, ES6를 ES5로 트랜스컴파일해주는 기능 등이 포함

    $ npm i --save-dev babel-loader babel-core babel-preset-env
      
로더를 사용하기 위해서는 npm으로 설치가 필요
* `test`에 ES6로 작성한 자바스크립트 파일을 지정하고, `use`에 변환작업을 수행할 바벨 로더 지정
* `exclude` : 제외할 파일을 지정

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: 'node_modules',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                },
            },
        }],
    },
}
```
      
#### CSS 파일 번들링: 태그로 삽입
CSS 파일도 자바스크립트로 변환해서 로딩해야하는데, 이 역할을 `css-loader`가 해당 역할을 수행
```js
// 변환된 CSS 파일의 형태
exports.push([module.i, "body {\n background-color: green;\n}\n", ""]);
```

필요한 모듈은 `css-loader`와 `style-loader`

    $ npm install --save-dev css-loader style-loader
  
* `css-loader` : CSS 파일을 읽어줌
* `style-loader` : 읽은 CSS 파일을 `<style>`태그로 만들어 `<head>`태그 안에 넣어줌

> style 태그 대신 css파일로 만들고 싶은 경우에 mini-css-extract-plugin을 사용하면 됨

```js
{
   module: {
      rules: [
         // ..
         {
            test: /\.css/,
            use: ['style-loader', 'css-loader'],
         }
      ]
   }
}
```
entry의 js파일 상단에서 `require('app.css');`를 하면 알아서 읽어서 `<style>` 태그로 만들어줌

### plugin
압축, 핫 리로딩, 파일 복사 등 부수적인 작업을 수행
* 번들된 자바스크립트 난독화
* 특정 텍스트 추출

#### CSS 파일 번들링: 하나의 CSS 파일 생성
```js
{
   module: {
      rules: [{
         test: /\.js?$/,
         loader: `babel-loader`,
         options: {
            presets: [
               `@babel/preset-env`
            ],
         },
         exclude: [`/node_modules`],
      }, {
         test: /\.css$/,
         use: [MiniCssExtractPlugin.loader, `css-loader`],
      }],
   },
   plugins: [
      new MiniCssExtractPlugin({ filename: `app.css` }),
   ]
}
```
style-loader의 역할을 수행하지만, 플러그인이기 때문에 **module**과 **plugins**에 모두 써주어야 함

#### 기타 파일 번들링
작성 중
style-loader의 역할을 수행하지만, 플러그인이기 때문에 **module**과 **plugins**에 모두 써주어야 함

### mode
```js
module.exports = {
   // ...
   mode: "development", 
   // ...
}
```
* **development** : 개발용
* **production** : 배포용, 알아서 최적화가 적용됨

***
## 참고링크
* [요즘 잘나가는 프론트엔드 개발 환경 만들기(2018): Webpack](https://meetup.toast.com/posts/153)
* [웹팩의 기본 개념](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)
* [웹팩4(Webpack) 설정하기](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d)
