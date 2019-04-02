# Webpack Configuration
## 웹팩의 필요성
* 자바스크립트 코드가 많아지면 한 파일로 관리하기가 어려워짐
* 기능에 따라 여러 자바스크립트 파일로 분리할 경우 브라우저에서 로딩이 필요하고, 네트워크 비용이 발생
* 각 파일이 서로의 스코프를 침범할 위험도 존재
    * IIFE(즉시실행함수)를 이용해서 모듈 생성
    * CommonJS나 AMD 스타일의 모듈 시스템을 사용하면 파일별로 모듈을 관리할 수 있음
    
모듈을 IIFE 형태로 변경해주고, 하나의 파일로 묶어(bundle) 네트워크 비용을 최소화하는 과정이 필요

## 웹팩의 주요개념
웹팩에서는 자바스크립트, CSS, Image 등 모든 것을 모듈로 인식하여 로딩해서 사용

### entry
의존성 그래프의 시작점
* 자바스크립트가 로딩하는 모듈이 많아질수록, 모듈 간의 의존성(=복잡도) 증가
* 엔트리를 통해 필요한 모듈을 로딩하고, 하나의 파일로 묶음

```js
// webpack.config.js
module.exports = {
    entry: {
        main: '.src/main.js',
    },
}
```
html 파일에서 로딩할 자바스크립트 파일의 시작점, 여기에서는 `src/main.js`로 설정

### output
하나로 번들된 결과물을 저장할 위치
```js
// webpack.config.js
module.exports = {
    // ...
    output: {
        filename: 'bundle.js',
        path: './dist',
    },
}
```
`dist` 폴더의 `bundle.js` 파일로 결과를 저장, html 파일에서는 `bundle.js`를 로딩해서 사용

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

`main.js`에서 `Util.js` 파일의 코드를 가져와서 사용하고 싶을 때는 다음과 같이 코드를 작성
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

    $ webpack

### loader
웹팩은 모든 자원을 모듈로 인식하지만, 자바스크립트밖에 모르기 때문에 비 자바스크립트 파일을 웹팩이 이해하게끔 변경해주는 역할을 로더가 수행
* `test` : 로딩할 파일을 지정
* `use` : 적용할 로더를 설정

#### babel-loader
대표적인 웹팩 로더, ES6를 ES5로 트랜스컴파일해주는 로더
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

### plugin

## CSS
필요한 모듈은 `css-loader`와 `style-loader`

    npm install --save-dev css-loader style-loader
  
* `css-loader` : 
* `style-loader` : 


***
## 참고링크
* [요즘 잘나가는 프론트엔드 개발 환경 만들기(2018): Webpack](https://meetup.toast.com/posts/153)
* [웹팩의 기본 개념](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)
