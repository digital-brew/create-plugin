this.data=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=20)}({1:function(e,t){!function(){e.exports=this.wp.i18n}()},12:function(e,t){!function(){e.exports=this.wp.data}()},13:function(e,t){!function(){e.exports=this.wp.compose}()},20:function(e,t,r){"use strict";r.r(t),r.d(t,"withPosts",(function(){return s}));var n=r(3),o=r.n(n),u=r(4),i=(r(1),r(12)),c=r(13);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=Object(c.createHigherOrderComponent)(Object(i.withSelect)((function(e,t){var r=t.attributes,n=r.postsToShow,o=r.postType,i=r.order,c=r.orderBy,a=r.categories,s=r.featuredImageSize,p=e("core"),l=p.getEntityRecords,d=p.getMedia,b=p.getAuthors,y=a&&a.length>0?a.map((function(e){return e.id})):[],O=Object(u.pickBy)({categories:y,order:i,orderby:c,per_page:n},(function(e){return!Object(u.isUndefined)(e)})),g=b(),j=l("postType","".concat(o||"post"),O);return{posts:Array.isArray(j)?j.map((function(e){var t;if(g.forEach((function(r){r.id===e.author&&(t=r)})),e.featured_media){var r=d(e.featured_media),n=Object(u.get)(r,["media_details","sizes",s,"source_url"],null);return n||(n=Object(u.get)(r,"source_url",null)),f(f({},e),{},{featuredImageSourceUrl:n,author_data:t})}return f(f({},e),{},{author_data:t})})):j}})),"withPosts")},3:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},4:function(e,t){!function(){e.exports=this.lodash}()}});