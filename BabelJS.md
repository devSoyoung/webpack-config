# BabelJS
ES6^ 문법을 하위 버전의 문법으로 바꿔주어 다양한 브라우저에서 자바스크립트 코드가 동작할 수 있게 해주는 **트랜스 컴파일러**

## 왜 Babel을 사용해야 하는가?
* ECMAScript(자바스크립트의 표준)는 새로운 버전이 계속 등장
* 하지만, 모든 브라우저의 자바스크립트 엔진이 바로바로 새 문법을 지원하지 않음
* 특히 **IE와 같은 구형 브라우저**에서 지원되지 않음
* ES2015+ (ES6 이상 버전) 문법을 구형 브라우저에서 사용하려면 구형 브라우저가 이해 가능한 버전의 문법으로 바꾸어주어야 함

## Babel이 수행하는 기능
* 문법 변환
* target 환경의 polyfill 사용
* 소스코드 변형
* 기타 등등

## Babel 설치

    // 바벨 7버전 이후
    $ npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/preset-stage-2
    
    // 바벨 6버전까지는 아래와 같이 설치하였음
    $ npm install --save-dev babel-cli babel-core babel-preset-env babel-preset-stage-2
    
> 바벨 7버전 이후부터는 모든 바벨 패키지가 @babel이라는 네임스페이스 안으로 속하게 되었음

* `@babel/cli` : 명령 프롬프트/터미널에서 babel 명령어 사용 가능
  * 사용 가능하긴 하지만, npm과 package.json을 사용하여 하는 것이 더 간편
* `@babel/core` :
* `@babel/preset-env` :
* `@babel/preset-stage-2` : 

## Babel 설정
프로젝트의 root 지점에 `babel.config.js` 파일을 생성

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```
> target에 있는 브라우저 목록은 임의로 만든 예시, 지원하고 싶은 브라우저 목록을 적용하면 됨

그리고 아래 명령어를 실행

    $ ./node_modules/.bin/babel src --out-dir lib
    
npm@5.2.0의 npm package runner를 사용하면 `./node_modules/.bin/babel` 부분을 `npx babel`로 수정 가능

***
## 참고링크
* [(ECMAScript) BabelJS(바벨) - 7버전](https://www.zerocho.com/category/ECMAScript/post/57a830cfa1d6971500059d5a)
* [babeljs.io](https://babeljs.io/)
