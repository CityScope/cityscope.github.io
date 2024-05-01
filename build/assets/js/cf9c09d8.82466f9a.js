"use strict";(self.webpackChunkcityscope_docs=self.webpackChunkcityscope_docs||[]).push([[49],{5431:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>a});var t=i(4848),o=i(8453);const s={id:"Build"},c="Building",r={id:"archive/cityio/Build",title:"Build",description:"From version 3, the Dockerfile inside the repository can be used for",source:"@site/docs/archive/cityio/build.md",sourceDirName:"archive/cityio",slug:"/archive/cityio/Build",permalink:"/archive/cityio/Build",draft:!1,unlisted:!1,editUrl:"https://github.com/CityScope/cityscope.github.io/docs/archive/cityio/build.md",tags:[],version:"current",frontMatter:{id:"Build"},sidebar:"sidebar",previous:{title:"API",permalink:"/archive/cityio/API"},next:{title:"Internal_Note",permalink:"/archive/cityio/Internal_Note"}},d={},a=[];function l(e){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"From version 3, the Dockerfile inside the repository can be used for\neasy deployment through docker."}),"\n",(0,t.jsxs)(n.p,{children:["It is a two step process, ",(0,t.jsx)(n.code,{children:"building"})," and ",(0,t.jsx)(n.code,{children:"running"}),"."]}),"\n",(0,t.jsx)(n.h1,{id:"building",children:"Building"}),"\n",(0,t.jsx)(n.p,{children:"(make sure you have docker in your system)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/CityScope/CS_CityIO cityio\ncd cityio\ndocker build -t cityio .\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This will build the container image to the latest version. ",(0,t.jsx)(n.code,{children:"git pull"})," to\nupdate the code."]}),"\n",(0,t.jsx)(n.h1,{id:"running",children:"Running"}),"\n",(0,t.jsxs)(n.p,{children:["The cityio container assumes that a redis instance is running in\n",(0,t.jsx)(n.code,{children:"127.0.0.1:6379"})," (the default), this can be a docker container itself,\nif redis is running inside a different address or/and port, you can\nchange the what is written in the DockerFile."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"ENV REDIS_ADDR=127.0.0.1\nENV REDIS_PORT=6379\n"})}),"\n",(0,t.jsx)(n.p,{children:"With that, the container can run by the following command."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker run -p 8080:8080 --net=host cityio\n"})}),"\n",(0,t.jsxs)(n.p,{children:["the ",(0,t.jsx)(n.code,{children:"--net=host"})," option is for the container to access the host side\nlocalhosts' ports, to have the container access redis."]}),"\n",(0,t.jsxs)(n.p,{children:["This will output the logs in that session, where we usually run cityio\nin a tmux session for realtime observation. The ",(0,t.jsx)(n.code,{children:"-d"})," option can be added\nto run in deamon mode."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>r});var t=i(6540);const o={},s=t.createContext(o);function c(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);