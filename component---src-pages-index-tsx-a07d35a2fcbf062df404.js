"use strict";(self.webpackChunkmergist_online_pdf_merger=self.webpackChunkmergist_online_pdf_merger||[]).push([[691],{2325:function(e,t,n){n.r(t),n.d(t,{default:function(){return de}});var r=n(5861),i=n(7757),a=n.n(i),o=n(7294),u=n(5730),l=n(9326),c=n(8274),s=n(3023),f=n(3364),d=n(5514),m=n(8499),v=n(5590),p=n(6162);function g(){var e=(0,o.useRef)(!1);return(0,p.L)((function(){return e.current=!0,function(){e.current=!1}}),[]),e}var b=n(8944),y=n(7374),h=n(8064),E=function(e){var t=e.children,n=e.initial,r=e.isPresent,i=e.onExitComplete,a=e.custom,u=e.presenceAffectsLayout,l=(0,y.h)(x),c=(0,h.M)(),s=(0,o.useMemo)((function(){return{id:c,initial:n,isPresent:r,custom:a,onExitComplete:function(e){var t,n;l.set(e,!0);try{for(var r=(0,m.XA)(l.values()),a=r.next();!a.done;a=r.next()){if(!a.value)return}}catch(o){t={error:o}}finally{try{a&&!a.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}null==i||i()},register:function(e){return l.set(e,!1),function(){return l.delete(e)}}}}),u?void 0:[r]);return(0,o.useMemo)((function(){l.forEach((function(e,t){return l.set(t,!1)}))}),[r]),o.useEffect((function(){!r&&!l.size&&(null==i||i())}),[r]),o.createElement(b.O.Provider,{value:s},t)};function x(){return new Map}var w=n(3906),R=n(8272),k=function(e){return e.key||""};var C,O=function(e){var t=e.children,n=e.custom,r=e.initial,i=void 0===r||r,a=e.onExitComplete,u=e.exitBeforeEnter,l=e.presenceAffectsLayout,c=void 0===l||l,s=(0,m.CR)(function(){var e=g(),t=(0,m.CR)((0,o.useState)(0),2),n=t[0],r=t[1],i=(0,o.useCallback)((function(){e.current&&r(n+1)}),[n]);return[(0,o.useCallback)((function(){return v.ZP.postRender(i)}),[i]),n]}(),1),f=s[0],d=(0,o.useContext)(w.p).forceRender;d&&(f=d);var b=g(),y=function(e){var t=[];return o.Children.forEach(e,(function(e){(0,o.isValidElement)(e)&&t.push(e)})),t}(t),h=y,x=new Set,C=(0,o.useRef)(h),O=(0,o.useRef)(new Map).current,S=(0,o.useRef)(!0);if((0,p.L)((function(){S.current=!1,function(e,t){e.forEach((function(e){var n=k(e);t.set(n,e)}))}(y,O),C.current=h})),(0,R.z)((function(){S.current=!0,O.clear(),x.clear()})),S.current)return o.createElement(o.Fragment,null,h.map((function(e){return o.createElement(E,{key:k(e),isPresent:!0,initial:!!i&&void 0,presenceAffectsLayout:c},e)})));h=(0,m.ev)([],(0,m.CR)(h),!1);for(var A=C.current.map(k),N=y.map(k),I=A.length,M=0;M<I;M++){var F=A[M];-1===N.indexOf(F)&&x.add(F)}return u&&x.size&&(h=[]),x.forEach((function(e){if(-1===N.indexOf(e)){var t=O.get(e);if(t){var r=A.indexOf(e);h.splice(r,0,o.createElement(E,{key:k(t),isPresent:!1,onExitComplete:function(){O.delete(e),x.delete(e);var t=C.current.findIndex((function(t){return t.key===e}));if(C.current.splice(t,1),!x.size){if(C.current=y,!1===b.current)return;f(),a&&a()}},custom:n,presenceAffectsLayout:c},t))}}})),h=h.map((function(e){var t=e.key;return x.has(t)?e:o.createElement(E,{key:k(e),isPresent:!0,presenceAffectsLayout:c},e)})),o.createElement(o.Fragment,null,x.size?h:h.map((function(e){return(0,o.cloneElement)(e)})))},S=n(7156),A=n(2882),N=((C={})[A.X.SUCCESS]={class:"alert-success",icon:d.chG},C[A.X.WARNING]={class:"alert-warning",icon:d.ik8},C[A.X.ERROR]={class:"alert-error",icon:d.xHz},C);function I(e){var t=e.statusMsg.getSeverity,n=(0,o.useState)(!0),r=n[0],i=n[1];return(0,o.useEffect)((function(){var e=setTimeout((function(){i(!1)}),4e3);return function(){clearTimeout(e)}}),[4e3]),o.createElement(O,null,r&&o.createElement(S.E.div,{layout:!0,className:"alert "+N[t].class+" shadow-md",key:e.statusMsg.getId,initial:{opacity:0,scaleY:0},animate:{opacity:1,scaleY:1},exit:{opacity:0,scaleY:0}},o.createElement("div",null,o.createElement(f.G,{icon:N[t].icon,className:"mr-2 fa-lg"}),o.createElement("span",null,e.statusMsg.getMsg))))}var M=n(2650),F=n(7429),B=n(3075),P=n(4944),j=(0,o.createContext)(null),D=n(5728),G=n(2877);var T=(0,o.forwardRef)((function(e,t){var n=e.children,r=e.as,i=void 0===r?"ul":r,a=e.axis,u=void 0===a?"y":a,l=e.onReorder,c=e.values,s=(0,m._T)(e,["children","as","axis","onReorder","values"]),f=(0,y.h)((function(){return(0,S.E)(i)})),d=[],v=(0,o.useRef)(!1);(0,P.k)(Boolean(c),"Reorder.Group must be provided a values prop");var p={axis:u,registerItem:function(e,t){t&&-1===d.findIndex((function(t){return e===t.value}))&&(d.push({value:e,layout:t[u]}),d.sort(z))},updateOrder:function(e,t,n){if(!v.current){var r=function(e,t,n,r){if(!r)return e;var i=e.findIndex((function(e){return e.value===t}));if(-1===i)return e;var a=r>0?1:-1,o=e[i+a];if(!o)return e;var u=e[i],l=o.layout,c=(0,D.C)(l.min,l.max,.5);return 1===a&&u.layout.max+n>c||-1===a&&u.layout.min+n<c?(0,G.uo)(e,i,i+a):e}(d,e,t,n);d!==r&&(v.current=!0,l(r.map(Z).filter((function(e){return-1!==c.indexOf(e)}))))}}};return(0,o.useEffect)((function(){v.current=!1})),o.createElement(f,(0,m.pi)({},s,{ref:t}),o.createElement(j.Provider,{value:p},n))}));function Z(e){return e.value}function z(e,t){return e.layout.min-t.layout.min}var L=n(4001),U=n(6104);function _(e){var t=(0,y.h)((function(){return(0,L.B)(e)}));if((0,o.useContext)(U._).isStatic){var n=(0,m.CR)((0,o.useState)(e),2)[1];(0,o.useEffect)((function(){return t.onChange(n)}),[])}return t}var Y=n(9836),$=function(e){return function(e){return"object"==typeof e&&e.mix}(e)?e.mix:void 0};function q(e,t){var n=_(t()),r=function(){return n.set(t())};return r(),function(e,t){(0,o.useEffect)((function(){var n=e.map((function(e){return e.onChange(t)}));return function(){return n.forEach((function(e){return e()}))}}))}(e,(function(){return v.ZP.update(r,!1,!0)})),n}function X(e,t,n,r){var i="function"==typeof t?t:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=!Array.isArray(e[0]),r=n?0:-1,i=e[0+r],a=e[1+r],o=e[2+r],u=e[3+r],l=(0,Y.s)(a,o,(0,m.pi)({mixer:$(o[0])},u));return n?l(i):l}(t,n,r);return Array.isArray(e)?K(e,i):K([e],(function(e){var t=(0,m.CR)(e,1)[0];return i(t)}))}function K(e,t){var n=(0,y.h)((function(){return[]}));return q(e,(function(){n.length=0;for(var r=e.length,i=0;i<r;i++)n[i]=e[i].get();return t(n)}))}var H=n(9492);function V(e,t){return void 0===t&&(t=0),(0,H.i)(e)?e:_(t)}var W={Group:T,Item:(0,o.forwardRef)((function(e,t){var n=e.children,r=e.style,i=e.value,a=e.as,u=void 0===a?"li":a,l=e.onDrag,c=e.layout,s=void 0===c||c,f=(0,m._T)(e,["children","style","value","as","onDrag","layout"]),d=(0,y.h)((function(){return(0,S.E)(u)})),v=(0,o.useContext)(j),p={x:V(null==r?void 0:r.x),y:V(null==r?void 0:r.y)},g=X([p.x,p.y],(function(e){var t=(0,m.CR)(e,2),n=t[0],r=t[1];return n||r?1:"unset"})),b=(0,o.useRef)(null);(0,P.k)(Boolean(v),"Reorder.Item must be a child of Reorder.Group");var h=v,E=h.axis,x=h.registerItem,w=h.updateOrder;return(0,o.useEffect)((function(){x(i,b.current)}),[v]),o.createElement(d,(0,m.pi)({drag:E},f,{dragSnapToOrigin:!0,style:(0,m.pi)((0,m.pi)({},r),{x:p.x,y:p.y,zIndex:g}),layout:s,onDrag:function(e,t){var n=t.velocity;n[E]&&w(i,p[E].get(),n[E]),null==l||l(e,t)},onLayoutMeasure:function(e){b.current=e},ref:t}),n)}))},J=n(4942);function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){(0,J.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var te=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],ne=["B","kiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],re=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],ie=["b","kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],ae=function(e,t,n){var r=e;return"string"==typeof t||Array.isArray(t)?r=e.toLocaleString(t,n):!0!==t&&void 0===n||(r=e.toLocaleString(void 0,n)),r};function oe(e,t){if(!Number.isFinite(e))throw new TypeError("Expected a finite number, got ".concat(typeof e,": ").concat(e));var n=(t=ee({bits:!1,binary:!1},t)).bits?t.binary?ie:re:t.binary?ne:te;if(t.signed&&0===e)return" 0 ".concat(n[0]);var r,i=e<0,a=i?"-":t.signed?"+":"";if(i&&(e=-e),void 0!==t.minimumFractionDigits&&(r={minimumFractionDigits:t.minimumFractionDigits}),void 0!==t.maximumFractionDigits&&(r=ee({maximumFractionDigits:t.maximumFractionDigits},r)),e<1)return a+ae(e,t.locale,r)+" "+n[0];var o=Math.min(Math.floor(t.binary?Math.log(e)/Math.log(1024):Math.log10(e)/3),n.length-1);return e/=Math.pow(t.binary?1024:1e3,o),r||(e=e.toPrecision(3)),a+ae(Number(e),t.locale,r)+" "+n[o]}function ue(e){return o.createElement(W.Group,{axis:"y",values:e.fileIds,onReorder:e.onReorder,className:"flex flex-col px-6 py-7 gap-5 bg-base-300 shadow-inner overflow-hidden"},o.createElement(O,null,e.fileIds.map((function(t){return o.createElement(le,{key:t,id:t,name:e.files[t].getName,size:e.files[t].getSize,onRemove:e.onFileRemoved,disabled:e.disabled})}))))}function le(e){var t="bg-base-100 shadow-md flex flex-row justify-between items-center p-2 gap-4 rounded-lg cursor-pointer hover:bg-base-200 "+(e.disabled?"opacity-40":"");return o.createElement(W.Item,Object.assign({key:e.id,value:e.id,className:t},{initial:{scale:0},animate:{scale:1},exit:{scale:0},transition:{duration:.25,scale:{type:"spring",duration:.25,bounce:.25}}}),o.createElement("button",{className:"btn btn-square btn-ghost"},o.createElement(f.G,{icon:d.g$q,className:"fa-lg"})),o.createElement("p",{className:"font-bold overflow-hidden whitespace-nowrap text-ellipsis"},e.name),o.createElement("div",{className:"flex-1"}),o.createElement("p",{className:"whitespace-nowrap"},"(",oe(e.size),")"),o.createElement("div",{className:"card-actions justify-end"},o.createElement("button",{className:"btn btn-square btn-ghost",onClick:function(){return e.onRemove(e.id)}},o.createElement(f.G,{icon:d.g82,className:"fa-lg"}))))}function ce(e){return o.createElement("div",{tabIndex:0,className:"collapse"},o.createElement("div",{className:"flex flex-row justify-between items-center p-6 collapse-title text-lg font-medium"},o.createElement("h5",{className:"pl-4"},e.fileIds.length," file",1!==e.fileIds.length&&"s"," added (",oe(Object.values(e.files).reduce((function(e,t){return e+t.getSize}),0)),")"),o.createElement("div",{className:"flex flex-row gap-2"},o.createElement(M.KZ,{onClick:e.onFileAdded}),o.createElement(M.Sb,{onClick:e.onAllFilesRemoved}))),o.createElement("div",{style:{pointerEvents:e.disabled?"none":"initial"},onClick:e.disabled&&l.$K||void 0,className:"overflow-hidden"},o.createElement(ue,{fileIds:e.fileIds,files:e.files,onReorder:e.onReorder,onFileRemoved:e.onFileRemoved,disabled:e.disabled})))}function se(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return fe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return fe(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function de(){var e=(0,o.useState)([]),t=e[0],n=e[1],i=(0,o.useState)({}),f=i[0],d=i[1],m=(0,o.useState)([]),v=m[0],p=m[1],g=(0,o.useState)(""),b=g[0],y=g[1],h=(0,o.useState)(0),E=h[0],x=h[1],w=(0,l.Zq)(u.Z),R=new l.Rq(w.shortTitle,w.siteUrl);function k(e,t){void 0===t&&(t=null),R.removeMergedFile(b),t&&d(t),n(e),x(0),y("")}var C=(0,o.useCallback)((function(e){var n=R.filterInvalidFiles(f,Array.from(e)),r=n[0],i=n[1];if(r.length>0){for(var a,o=f,u=[],l=se(r);!(a=l()).done;){var c=a.value;u.push(c.id),o[c.id]=c}k(t.concat(u),o)}i.length>0&&p(i)}),[t,f]);function O(){return(O=(0,r.Z)(a().mark((function e(){var n,r,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.createMergedFile(f,t,x);case 2:n=e.sent,r=n[0],i=n[1],""===r&&y(""),y(r),p(i),x(0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return o.createElement(c.Xg,{metadata:w},o.createElement(B.Z,{title:w.shortTitle,url:w.siteUrl},w.description),o.createElement(c.or,null,o.createElement(s.a9,{onFilesAdded:C}),o.createElement(c.$0,{visible:v.length>0,className:"gap-5"},v.map((function(e){return o.createElement(I,{key:e.getId,statusMsg:e})}))),o.createElement("div",{tabIndex:0,className:"collapse collapse-open flex-1 bg-base-100 border border-base-300 rounded-box"},o.createElement(c.$0,{visible:0===t.length,className:"flex-1"},o.createElement(s.Dl,{onFilesAdded:C})),o.createElement(c.$0,{visible:t.length>0},o.createElement(ce,{fileIds:t,files:f,onReorder:function(e){k(e)},onFileAdded:C,onFileRemoved:function(e){var n=f,r=t.filter((function(t){return t!==e}));delete n[e],k(r,n)},onAllFilesRemoved:function(){k([],{})},disabled:E>0}))),o.createElement(c.$0,{visible:t.length>0},o.createElement("div",{className:"flex flex-row justify-center gap-8"},o.createElement(M.Kk,{numOfFiles:t.length,progress:E,downloadUrl:b,onClick:function(){return O.apply(this,arguments)}})))),o.createElement(F.Z,{author:w.author,githubUrl:w.githubUrl,homepageUrl:w.homepageUrl,homepageLabel:w.homepageDomain}))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-a07d35a2fcbf062df404.js.map