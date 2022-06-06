"use strict";(self.webpackChunkMergist=self.webpackChunkMergist||[]).push([[691],{8930:function(e,t,n){n.r(t),n.d(t,{default:function(){return ae}});var r=n(946),i=n(8215),a=n.n(i),o=n(921),l=n(2802),c=n(2375),s=n(6188),u=n(147),d=n(6043);function f(e){return o.createElement("label",{className:"cursor-pointer "+e.className},o.createElement("input",{className:"hidden",type:"file",accept:"application/pdf",onChange:function(t){(0,c.$K)(t);var n=t.target.files;n&&n.length>0&&e.onFilesAdded(n)},multiple:!0}),e.children)}function m(e){return o.createElement(f,{className:"flex-col flex-1",onFilesAdded:e.onFilesAdded},o.createElement("div",{className:"flex-col justify-center flex-1 m-8 p-8 gap-8 text-center z-20 bg-base-100 border-2 border-dashed rounded-lg hover:bg-base-200"},o.createElement(d.J,{icon:u.b7h,tw:"fa-3x"}),o.createElement("p",{className:"flex-grow-0"},"Drag and drop PDF files here, or click to select files")))}function v(e){var t=(0,o.useState)(!1),n=t[0],r=t[1],i=(0,o.useRef)(0),a=(0,o.useCallback)((function(e){(0,c.$K)(e)}),[]),l=(0,o.useCallback)((function(e){(0,c.$K)(e),i.current++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&r(!0)}),[]),s=(0,o.useCallback)((function(e){(0,c.$K)(e),i.current--,i.current>0||r(!1)}),[]),u=(0,o.useCallback)((function(t){(0,c.$K)(t),r(!1),t.dataTransfer.files&&t.dataTransfer.files.length>0&&(i.current=0,e.onFilesAdded(t.dataTransfer.files),t.dataTransfer.clearData())}),[e.onFilesAdded]);return(0,o.useEffect)((function(){return window.addEventListener("dragenter",l),window.addEventListener("dragleave",s),window.addEventListener("dragover",a),window.addEventListener("drop",u),function(){window.removeEventListener("dragenter",l),window.removeEventListener("dragleave",s),window.removeEventListener("dragover",a),window.removeEventListener("drop",u)}})),o.createElement("div",{className:"fixed inset-0 flex-col justify-center items-center p-16 bg-base-100/50 z-10 "+(n?"":"hidden")})}f.defaultProps={className:""};var p,g=n(6066),b=n(6519),h=n(7136),y=((p={})[h.X.SUCCESS]={class:"alert-success",icon:u.chG},p[h.X.WARNING]={class:"alert-warning",icon:u.ik8},p[h.X.ERROR]={class:"alert-error",icon:u.xHz},p);function E(e){var t=e.statusMsg.getSeverity,n=(0,o.useState)(!0),r=n[0],i=n[1];return(0,o.useEffect)((function(){var e=setTimeout((function(){i(!1)}),4e3);return function(){clearTimeout(e)}}),[4e3]),o.createElement(g.M,null,r&&o.createElement(b.E.div,{layout:!0,className:"alert "+y[t].class+" shadow-md",key:e.statusMsg.getId,initial:{opacity:0,scaleY:0},animate:{opacity:1,scaleY:1},exit:{opacity:0,scaleY:0}},o.createElement("div",null,o.createElement(d.J,{icon:y[t].icon,tw:"mr-2 fa-lg"}),o.createElement("span",null,e.statusMsg.getMsg))))}var x=n(3169),w=n(5594),R=n(2814),F=n(8084),k=n(4363),N=(0,o.createContext)(null),A=n(6898),O=n(8432),M=n(6983);var S=(0,o.forwardRef)((function(e,t){var n=e.children,r=e.as,i=void 0===r?"ul":r,a=e.axis,l=void 0===a?"y":a,c=e.onReorder,s=e.values,u=(0,F._T)(e,["children","as","axis","onReorder","values"]),d=(0,A.h)((function(){return(0,b.E)(i)})),f=[],m=(0,o.useRef)(!1);(0,k.k)(Boolean(s),"Reorder.Group must be provided a values prop");var v={axis:l,registerItem:function(e,t){t&&-1===f.findIndex((function(t){return e===t.value}))&&(f.push({value:e,layout:t[l]}),f.sort(I))},updateOrder:function(e,t,n){if(!m.current){var r=function(e,t,n,r){if(!r)return e;var i=e.findIndex((function(e){return e.value===t}));if(-1===i)return e;var a=r>0?1:-1,o=e[i+a];if(!o)return e;var l=e[i],c=o.layout,s=(0,O.C)(c.min,c.max,.5);return 1===a&&l.layout.max+n>s||-1===a&&l.layout.min+n<s?(0,M.uo)(e,i,i+a):e}(f,e,t,n);f!==r&&(m.current=!0,c(r.map(C).filter((function(e){return-1!==s.indexOf(e)}))))}}};return(0,o.useEffect)((function(){m.current=!1})),o.createElement(d,(0,F.pi)({},u,{ref:t}),o.createElement(N.Provider,{value:v},n))}));function C(e){return e.value}function I(e,t){return e.layout.min-t.layout.min}var j=n(1722),B=n(3287);function D(e){var t=(0,A.h)((function(){return(0,j.B)(e)}));if((0,o.useContext)(B._).isStatic){var n=(0,F.CR)((0,o.useState)(e),2)[1];(0,o.useEffect)((function(){return t.onChange(n)}),[])}return t}var T=n(2395),P=function(e){return function(e){return"object"==typeof e&&e.mix}(e)?e.mix:void 0};var $=n(4636);function L(e,t){var n=D(t()),r=function(){return n.set(t())};return r(),function(e,t){(0,o.useEffect)((function(){var n=e.map((function(e){return e.onChange(t)}));return function(){return n.forEach((function(e){return e()}))}}))}(e,(function(){return $.ZP.update(r,!1,!0)})),n}function Z(e,t,n,r){var i="function"==typeof t?t:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=!Array.isArray(e[0]),r=n?0:-1,i=e[0+r],a=e[1+r],o=e[2+r],l=e[3+r],c=(0,T.s)(a,o,(0,F.pi)({mixer:P(o[0])},l));return n?c(i):c}(t,n,r);return Array.isArray(e)?G(e,i):G([e],(function(e){var t=(0,F.CR)(e,1)[0];return i(t)}))}function G(e,t){var n=(0,A.h)((function(){return[]}));return L(e,(function(){n.length=0;for(var r=e.length,i=0;i<r;i++)n[i]=e[i].get();return t(n)}))}var K=n(2373);function z(e,t){return void 0===t&&(t=0),(0,K.i)(e)?e:D(t)}var U={Group:S,Item:(0,o.forwardRef)((function(e,t){var n=e.children,r=e.style,i=e.value,a=e.as,l=void 0===a?"li":a,c=e.onDrag,s=e.layout,u=void 0===s||s,d=(0,F._T)(e,["children","style","value","as","onDrag","layout"]),f=(0,A.h)((function(){return(0,b.E)(l)})),m=(0,o.useContext)(N),v={x:z(null==r?void 0:r.x),y:z(null==r?void 0:r.y)},p=Z([v.x,v.y],(function(e){var t=(0,F.CR)(e,2),n=t[0],r=t[1];return n||r?1:"unset"})),g=(0,o.useRef)(null);(0,k.k)(Boolean(m),"Reorder.Item must be a child of Reorder.Group");var h=m,y=h.axis,E=h.registerItem,x=h.updateOrder;return(0,o.useEffect)((function(){E(i,g.current)}),[m]),o.createElement(f,(0,F.pi)({drag:y},d,{dragSnapToOrigin:!0,style:(0,F.pi)((0,F.pi)({},r),{x:v.x,y:v.y,zIndex:p}),layout:u,onDrag:function(e,t){var n=t.velocity;n[y]&&x(i,v[y].get(),n[y]),null==c||c(e,t)},onLayoutMeasure:function(e){g.current=e},ref:t}),n)}))},Y=n(4650);function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){(0,Y.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],J=["B","kiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],W=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],H=["b","kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],Q=function(e,t,n){var r=e;return"string"==typeof t||Array.isArray(t)?r=e.toLocaleString(t,n):!0!==t&&void 0===n||(r=e.toLocaleString(void 0,n)),r};function V(e,t){if(!Number.isFinite(e))throw new TypeError("Expected a finite number, got ".concat(typeof e,": ").concat(e));var n=(t=q({bits:!1,binary:!1},t)).bits?t.binary?H:W:t.binary?J:_;if(t.signed&&0===e)return" 0 ".concat(n[0]);var r,i=e<0,a=i?"-":t.signed?"+":"";if(i&&(e=-e),void 0!==t.minimumFractionDigits&&(r={minimumFractionDigits:t.minimumFractionDigits}),void 0!==t.maximumFractionDigits&&(r=q({maximumFractionDigits:t.maximumFractionDigits},r)),e<1)return a+Q(e,t.locale,r)+" "+n[0];var o=Math.min(Math.floor(t.binary?Math.log(e)/Math.log(1024):Math.log10(e)/3),n.length-1);return e/=Math.pow(t.binary?1024:1e3,o),r||(e=e.toPrecision(3)),a+Q(Number(e),t.locale,r)+" "+n[o]}function ee(e){var t="bg-base-100 shadow-md flex-row justify-between p-2 gap-4 rounded-lg cursor-pointer overflow-hidden hover:bg-base-200 "+(e.disabled?"opacity-40":""),n=Object.assign({initial:{scale:0},animate:{scale:1},exit:{scale:0}},c.b$);return o.createElement(U.Item,Object.assign({key:e.id,value:e.id,className:t},n),o.createElement("div",{className:"flex-row items-center overflow-hidden gap-0 sm:gap-2"},o.createElement(x.hU,{icon:u.g$q}),o.createElement("p",{className:"font-bold overflow-hidden whitespace-nowrap text-ellipsis"},e.name)),o.createElement("div",{className:"flex-row flex-none items-center overflow-hidden gap-0 sm:gap-2"},o.createElement("p",{className:"whitespace-nowrap"},"(",V(e.size,{maximumFractionDigits:0}),")"),o.createElement("div",{className:"card-actions justify-end"},o.createElement(x.hU,{icon:u.g82,onClick:function(){return e.onRemove(e.id)}}))))}function te(e){return o.createElement(U.Group,{axis:"y",values:e.fileIds,onReorder:e.onReorder,className:"flex-col px-6 py-7 gap-5 bg-base-300 shadow-inner overflow-hidden"},o.createElement(g.M,null,e.fileIds.map((function(t){return o.createElement(ee,{key:t,id:t,name:e.files[t].getName,size:e.files[t].getSize,onRemove:e.onFileRemoved,disabled:e.disabled})}))))}function ne(e){return o.createElement("div",{tabIndex:0,className:"collapse"},o.createElement("div",{className:"flex-col sm:flex-row justify-between items-center p-6 sm:pl-10 gap-4 collapse-title text-lg font-medium"},o.createElement("h2",null,e.fileIds.length," file",1!==e.fileIds.length&&"s"," added (",V(Object.values(e.files).reduce((function(e,t){return e+t.getSize}),0)),")"),o.createElement("div",{className:"flex-row gap-2 flex-1 sm:flex-none"},o.createElement(f,{onFilesAdded:e.onFileAdded},o.createElement(x.KM,{icon:u.b7h,fake:!0},"Add File")),o.createElement(x.KM,{icon:u.$aW,onClick:e.onAllFilesRemoved},"Remove All"))),o.createElement("div",{style:{pointerEvents:e.disabled?"none":"initial"},onClick:e.disabled&&c.$K||void 0,className:"overflow-hidden"},o.createElement(te,{fileIds:e.fileIds,files:e.files,onReorder:e.onReorder,onFileRemoved:e.onFileRemoved,disabled:e.disabled})))}function re(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return ie(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ie(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ae(){var e=(0,o.useState)([]),t=e[0],n=e[1],i=(0,o.useState)({}),u=i[0],d=i[1],f=(0,o.useState)([]),p=f[0],g=f[1],b=(0,o.useState)(""),h=b[0],y=b[1],F=(0,o.useState)(0),k=F[0],N=F[1],A=(0,c.Zq)(l.Z),O=new c.Rq(A.shortTitle,A.siteUrl);function M(e,t){void 0===t&&(t=null),O.removeMergedFile(h),t&&d(t),n(e),N(0),y("")}var S=(0,o.useCallback)((function(e){var n=O.filterInvalidFiles(u,Array.from(e)),r=n[0],i=n[1];if(r.length>0){for(var a,o=u,l=[],c=re(r);!(a=c()).done;){var s=a.value;l.push(s.id),o[s.id]=s}M(t.concat(l),o)}i.length>0&&g(i)}),[t,u]);function C(){return(C=(0,r.Z)(a().mark((function e(){var n,r,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.createMergedFile(u,t,N);case 2:n=e.sent,r=n[0],i=n[1],""===r&&y(""),y(r),g(i),N(0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return o.createElement(s.Xg,{metadata:A},o.createElement(R.Z,{title:A.shortTitle},A.description),o.createElement(s.or,null,o.createElement(v,{onFilesAdded:S}),o.createElement(s.$0,{visible:p.length>0,className:"gap-5"},p.map((function(e){return o.createElement(E,{key:e.getId,statusMsg:e})}))),o.createElement("div",{tabIndex:0,className:"collapse collapse-open flex-1 bg-base-100 border border-base-300 rounded-none sm:rounded-box"},o.createElement(s.$0,{visible:0===t.length,className:"flex-1"},o.createElement(m,{onFilesAdded:S})),o.createElement(s.$0,{visible:t.length>0},o.createElement(ne,{fileIds:t,files:u,onReorder:function(e){M(e)},onFileAdded:S,onFileRemoved:function(e){var n=u,r=t.filter((function(t){return t!==e}));delete n[e],M(r,n)},onAllFilesRemoved:function(){M([],{})},disabled:k>0}))),o.createElement(s.$0,{visible:t.length>0,className:"px-6 sm:px-0"},o.createElement(x.Kk,{numOfFiles:t.length,progress:k,downloadUrl:h,onClick:function(){return C.apply(this,arguments)}}))),o.createElement(w.Z,{author:A.author,githubUrl:A.githubUrl,homepageDomain:A.homepageDomain}))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-c75f919095fe4f3b810e.js.map