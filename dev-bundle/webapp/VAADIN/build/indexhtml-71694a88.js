(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.hillaPush=!1;window.Vaadin.featureFlags.hillaEngine=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.webpackForFrontendBuild=!1;window.Vaadin.featureFlags.enforceFieldValidation=!1;window.Vaadin.featureFlags.expressBuild=!0;const qt="modulepreload",Kt=function(n,e){return new URL(n,e).href},He={},Le=function(e,t,i){if(!t||t.length===0)return e();const o=document.getElementsByTagName("link");return Promise.all(t.map(r=>{if(r=Kt(r,i),r in He)return;He[r]=!0;const s=r.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!i)for(let c=o.length-1;c>=0;c--){const h=o[c];if(h.href===r&&(!s||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${l}`))return;const d=document.createElement("link");if(d.rel=s?"stylesheet":qt,s||(d.as="script",d.crossOrigin=""),d.href=r,document.head.appendChild(d),s)return new Promise((c,h)=>{d.addEventListener("load",c),d.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function pe(n){return n=n||[],Array.isArray(n)?n:[n]}function T(n){return`[Vaadin.Router] ${n}`}function Yt(n){if(typeof n!="object")return String(n);const e=Object.prototype.toString.call(n).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(n)}`:e}const ge="module",ve="nomodule",xe=[ge,ve];function je(n){if(!n.match(/.+\.[m]?js$/))throw new Error(T(`Unsupported type for bundle "${n}": .js or .mjs expected.`))}function bt(n){if(!n||!I(n.path))throw new Error(T('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=n.bundle,t=["component","redirect","bundle"];if(!M(n.action)&&!Array.isArray(n.children)&&!M(n.children)&&!me(e)&&!t.some(i=>I(n[i])))throw new Error(T(`Expected route config "${n.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(I(e))je(e);else if(xe.some(i=>i in e))xe.forEach(i=>i in e&&je(e[i]));else throw new Error(T('Expected route bundle to include either "'+ve+'" or "'+ge+'" keys, or both'));n.redirect&&["bundle","component"].forEach(i=>{i in n&&console.warn(T(`Route config "${n.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function ze(n){pe(n).forEach(e=>bt(e))}function Ge(n,e){let t=document.head.querySelector('script[src="'+n+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",n),e===ge?t.setAttribute("type",ge):e===ve&&t.setAttribute(ve,""),t.async=!0),new Promise((i,o)=>{t.onreadystatechange=t.onload=r=>{t.__dynamicImportLoaded=!0,i(r)},t.onerror=r=>{t.parentNode&&t.parentNode.removeChild(t),o(r)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&i()})}function Jt(n){return I(n)?Ge(n):Promise.race(xe.filter(e=>e in n).map(e=>Ge(n[e],e)))}function X(n,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${n}`,{cancelable:n==="go",detail:e}))}function me(n){return typeof n=="object"&&!!n}function M(n){return typeof n=="function"}function I(n){return typeof n=="string"}function Et(n){const e=new Error(T(`Page not found (${n.pathname})`));return e.context=n,e.code=404,e}const V=new class{};function Xt(n){const e=n.port,t=n.protocol,r=t==="http:"&&e==="80"||t==="https:"&&e==="443"?n.hostname:n.host;return`${t}//${r}`}function We(n){if(n.defaultPrevented||n.button!==0||n.shiftKey||n.ctrlKey||n.altKey||n.metaKey)return;let e=n.target;const t=n.composedPath?n.composedPath():n.path||[];for(let l=0;l<t.length;l++){const a=t[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Xt(e))!==window.location.origin)return;const{pathname:o,search:r,hash:s}=e;X("go",{pathname:o,search:r,hash:s})&&(n.preventDefault(),n&&n.type==="click"&&window.scrollTo(0,0))}const Qt={activate(){window.document.addEventListener("click",We)},inactivate(){window.document.removeEventListener("click",We)}},Zt=/Trident/.test(navigator.userAgent);Zt&&!M(window.PopStateEvent)&&(window.PopStateEvent=function(n,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(n,Boolean(e.bubbles),Boolean(e.cancelable)),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function qe(n){if(n.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:i}=window.location;X("go",{pathname:e,search:t,hash:i})}const ei={activate(){window.addEventListener("popstate",qe)},inactivate(){window.removeEventListener("popstate",qe)}};var K=It,ti=Pe,ii=si,ni=At,oi=Rt,St="/",$t="./",ri=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Pe(n,e){for(var t=[],i=0,o=0,r="",s=e&&e.delimiter||St,l=e&&e.delimiters||$t,a=!1,d;(d=ri.exec(n))!==null;){var c=d[0],h=d[1],u=d.index;if(r+=n.slice(o,u),o=u+c.length,h){r+=h[1],a=!0;continue}var p="",k=n[o],D=d[2],Ht=d[3],jt=d[4],ae=d[5];if(!a&&r.length){var be=r.length-1;l.indexOf(r[be])>-1&&(p=r[be],r=r.slice(0,be))}r&&(t.push(r),r="",a=!1);var zt=p!==""&&k!==void 0&&k!==p,Gt=ae==="+"||ae==="*",Wt=ae==="?"||ae==="*",Ve=p||s,Be=Ht||jt;t.push({name:D||i++,prefix:p,delimiter:Ve,optional:Wt,repeat:Gt,partial:zt,pattern:Be?ai(Be):"[^"+L(Ve)+"]+?"})}return(r||o<n.length)&&t.push(r+n.substr(o)),t}function si(n,e){return At(Pe(n,e))}function At(n){for(var e=new Array(n.length),t=0;t<n.length;t++)typeof n[t]=="object"&&(e[t]=new RegExp("^(?:"+n[t].pattern+")$"));return function(i,o){for(var r="",s=o&&o.encode||encodeURIComponent,l=0;l<n.length;l++){var a=n[l];if(typeof a=="string"){r+=a;continue}var d=i?i[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var h=0;h<d.length;h++){if(c=s(d[h],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');r+=(h===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=s(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');r+=a.prefix+c;continue}if(a.optional){a.partial&&(r+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return r}}function L(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ai(n){return n.replace(/([=!:$/()])/g,"\\$1")}function Ct(n){return n&&n.sensitive?"":"i"}function li(n,e){if(!e)return n;var t=n.source.match(/\((?!\?)/g);if(t)for(var i=0;i<t.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return n}function di(n,e,t){for(var i=[],o=0;o<n.length;o++)i.push(It(n[o],e,t).source);return new RegExp("(?:"+i.join("|")+")",Ct(t))}function ci(n,e,t){return Rt(Pe(n,t),e,t)}function Rt(n,e,t){t=t||{};for(var i=t.strict,o=t.start!==!1,r=t.end!==!1,s=L(t.delimiter||St),l=t.delimiters||$t,a=[].concat(t.endsWith||[]).map(L).concat("$").join("|"),d=o?"^":"",c=n.length===0,h=0;h<n.length;h++){var u=n[h];if(typeof u=="string")d+=L(u),c=h===n.length-1&&l.indexOf(u[u.length-1])>-1;else{var p=u.repeat?"(?:"+u.pattern+")(?:"+L(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?d+=L(u.prefix)+"("+p+")?":d+="(?:"+L(u.prefix)+"("+p+"))?":d+=L(u.prefix)+"("+p+")"}}return r?(i||(d+="(?:"+s+")?"),d+=a==="$"?"$":"(?="+a+")"):(i||(d+="(?:"+s+"(?="+a+"))?"),c||(d+="(?="+s+"|"+a+")")),new RegExp(d,Ct(t))}function It(n,e,t){return n instanceof RegExp?li(n,e):Array.isArray(n)?di(n,e,t):ci(n,e,t)}K.parse=ti;K.compile=ii;K.tokensToFunction=ni;K.tokensToRegExp=oi;const{hasOwnProperty:hi}=Object.prototype,Oe=new Map;Oe.set("|false",{keys:[],pattern:/(?:)/});function Ke(n){try{return decodeURIComponent(n)}catch{return n}}function ui(n,e,t,i,o){t=!!t;const r=`${n}|${t}`;let s=Oe.get(r);if(!s){const d=[];s={keys:d,pattern:K(n,d,{end:t,strict:n===""})},Oe.set(r,s)}const l=s.pattern.exec(e);if(!l)return null;const a=Object.assign({},o);for(let d=1;d<l.length;d++){const c=s.keys[d-1],h=c.name,u=l[d];(u!==void 0||!hi.call(a,h))&&(c.repeat?a[h]=u?u.split(c.delimiter).map(Ke):[]:a[h]=u&&Ke(u))}return{path:l[0],keys:(i||[]).concat(s.keys),params:a}}function Tt(n,e,t,i,o){let r,s,l=0,a=n.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(d){if(n===d)return{done:!0};const c=n.__children=n.__children||n.children;if(!r&&(r=ui(a,e,!c,i,o),r))return{done:!1,value:{route:n,keys:r.keys,params:r.params,path:r.path}};if(r&&c)for(;l<c.length;){if(!s){const u=c[l];u.parent=n;let p=r.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),s=Tt(u,e.substr(p),t,r.keys,r.params)}const h=s.next(d);if(!h.done)return{done:!1,value:h.value};s=null,l++}return{done:!0}}}}function fi(n){if(M(n.route.action))return n.route.action(n)}function pi(n,e){let t=e;for(;t;)if(t=t.parent,t===n)return!0;return!1}function gi(n){let e=`Path '${n.pathname}' is not properly resolved due to an error.`;const t=(n.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function vi(n,e){const{route:t,path:i}=e;if(t&&!t.__synthetic){const o={path:i,route:t};if(!n.chain)n.chain=[];else if(t.parent){let r=n.chain.length;for(;r--&&n.chain[r].route&&n.chain[r].route!==t.parent;)n.chain.pop()}n.chain.push(o)}}class Z{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||fi,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){ze(e);const t=[...pe(e)];this.root.__children=t}addRoutes(e){return ze(e),this.root.__children.push(...pe(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,I(e)?{pathname:e}:e),i=Tt(this.root,this.__normalizePathname(t.pathname),this.baseUrl),o=this.resolveRoute;let r=null,s=null,l=t;function a(d,c=r.value.route,h){const u=h===null&&r.value.route;return r=s||i.next(u),s=null,!d&&(r.done||!pi(c,r.value.route))?(s=r,Promise.resolve(V)):r.done?Promise.reject(Et(t)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},t,r.value),vi(l,r.value),Promise.resolve(o(l)).then(p=>p!=null&&p!==V?(l.result=p.result||p,l):a(d,c,p)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=gi(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,t).href;if(i.slice(0,t.length)===t)return i.slice(t.length)}}Z.pathToRegexp=K;const{pathToRegexp:Ye}=Z,Je=new Map;function Nt(n,e,t){const i=e.name||e.component;if(i&&(n.has(i)?n.get(i).push(e):n.set(i,[e])),Array.isArray(t))for(let o=0;o<t.length;o++){const r=t[o];r.parent=e,Nt(n,r,r.__children||r.children)}}function Xe(n,e){const t=n.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function Qe(n){let e=n.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function mi(n,e={}){if(!(n instanceof Z))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(i,o)=>{let r=Xe(t,i);if(!r&&(t.clear(),Nt(t,n.root,n.root.__children),r=Xe(t,i),!r))throw new Error(`Route "${i}" not found`);let s=Je.get(r.fullPath);if(!s){let a=Qe(r),d=r.parent;for(;d;){const p=Qe(d);p&&(a=p.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=Ye.parse(a),h=Ye.tokensToFunction(c),u=Object.create(null);for(let p=0;p<c.length;p++)I(c[p])||(u[c[p].name]=!0);s={toPath:h,keys:u},Je.set(a,s),r.fullPath=a}let l=s.toPath(o,e)||"/";if(e.stringifyQueryParams&&o){const a={},d=Object.keys(o);for(let h=0;h<d.length;h++){const u=d[h];s.keys[u]||(a[u]=o[u])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let Ze=[];function _i(n){Ze.forEach(e=>e.inactivate()),n.forEach(e=>e.activate()),Ze=n}const yi=n=>{const e=getComputedStyle(n).getPropertyValue("animation-name");return e&&e!=="none"},wi=(n,e)=>{const t=()=>{n.removeEventListener("animationend",t),e()};n.addEventListener("animationend",t)};function et(n,e){return n.classList.add(e),new Promise(t=>{if(yi(n)){const i=n.getBoundingClientRect(),o=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;n.setAttribute("style",`position: absolute; ${o}`),wi(n,()=>{n.classList.remove(e),n.removeAttribute("style"),t()})}else n.classList.remove(e),t()})}const bi=256;function Ee(n){return n!=null}function Ei(n){const e=Object.assign({},n);return delete e.next,e}function A({pathname:n="",search:e="",hash:t="",chain:i=[],params:o={},redirectFrom:r,resolver:s},l){const a=i.map(d=>d.route);return{baseUrl:s&&s.baseUrl||"",pathname:n,search:e,hash:t,routes:a,route:l||a.length&&a[a.length-1]||null,params:o,redirectFrom:r,getUrl:(d={})=>he(O.pathToRegexp.compile(Lt(a))(Object.assign({},o,d)),s)}}function tt(n,e){const t=Object.assign({},n.params);return{redirect:{pathname:e,from:n.pathname,params:t}}}function Si(n,e){e.location=A(n);const t=n.chain.map(i=>i.route).indexOf(n.route);return n.chain[t].element=e,e}function ce(n,e,t){if(M(n))return n.apply(t,e)}function it(n,e,t){return i=>{if(i&&(i.cancel||i.redirect))return i;if(t)return ce(t[n],e,t)}}function $i(n,e){if(!Array.isArray(n)&&!me(n))throw new Error(T(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${n}`));e.__children=[];const t=pe(n);for(let i=0;i<t.length;i++)bt(t[i]),e.__children.push(t[i])}function le(n){if(n&&n.length){const e=n[0].parentNode;for(let t=0;t<n.length;t++)e.removeChild(n[t])}}function he(n,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(n.replace(/^\//,""),t).pathname:n}function Lt(n){return n.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class O extends Z{constructor(e,t){const i=document.head.querySelector("base"),o=i&&i.getAttribute("href");super([],Object.assign({baseUrl:o&&Z.__createUrl(o,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=s=>this.__resolveRoute(s);const r=O.NavigationTrigger;O.setTriggers.apply(O,Object.keys(r).map(s=>r[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=A({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let i=Promise.resolve();M(t.children)&&(i=i.then(()=>t.children(Ei(e))).then(r=>{!Ee(r)&&!M(t.children)&&(r=t.children),$i(r,t)}));const o={redirect:r=>tt(e,r),component:r=>{const s=document.createElement(r);return this.__createdByRouter.set(s,!0),s}};return i.then(()=>{if(this.__isLatestRender(e))return ce(t.action,[e,o],t)}).then(r=>{if(Ee(r)&&(r instanceof HTMLElement||r.redirect||r===V))return r;if(I(t.redirect))return o.redirect(t.redirect);if(t.bundle)return Jt(t.bundle).then(()=>{},()=>{throw new Error(T(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(r=>{if(Ee(r))return r;if(I(t.component))return o.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const i=++this.__lastStartedRenderId,o=Object.assign({search:"",hash:""},I(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(o).then(r=>this.__fullyResolveChain(r)).then(r=>{if(this.__isLatestRender(r)){const s=this.__previousContext;if(r===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=A(r),t&&this.__updateBrowserHistory(r,i===1),X("location-changed",{router:this,location:this.location}),r.__skipAttach)return this.__copyUnchangedElements(r,s),this.__previousContext=r,this.location;this.__addAppearingContent(r,s);const l=this.__animateIfNeeded(r);return this.__runOnAfterEnterCallbacks(r),this.__runOnAfterLeaveCallbacks(r,s),l.then(()=>{if(this.__isLatestRender(r))return this.__removeDisappearingContent(),this.__previousContext=r,this.location})}}).catch(r=>{if(i===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(o),le(this.__outlet&&this.__outlet.children),this.location=A(Object.assign(o,{resolver:this})),X("error",Object.assign({router:this,error:r},o)),r}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(i=>{const r=i!==t?i:e,l=he(Lt(i.chain),i.resolver)===i.pathname,a=(d,c=d.route,h)=>d.next(void 0,c,h).then(u=>u===null||u===V?l?d:c.parent!==null?a(d,c.parent,u):u:u);return a(i).then(d=>{if(d===null||d===V)throw Et(r);return d&&d!==V&&d!==i?this.__fullyResolveChain(r,d):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(Si(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(T(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Yt(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},i=t.chain||[],o=e.chain;let r=Promise.resolve();const s=()=>({cancel:!0}),l=a=>tt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,o.length)&&!(i[a].route!==o[a].route||i[a].path!==o[a].path&&i[a].element!==o[a].element||!this.__isReusableElement(i[a].element,o[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=o.length===i.length&&e.__divergedChainIndex==o.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=o.length-1;a>=0;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},i[a]);for(let a=0;a<o.length;a++)r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},o[a]),i[a].element.location=A(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},i[a])}if(!e.__skipAttach)for(let a=0;a<o.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=A(e,i[a].route)):(r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},o[a]),o[a].element&&(o[a].element.location=A(e,o[a].route)));return r.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,i,o){const r=A(t);return e.then(s=>{if(this.__isLatestRender(t))return it("onBeforeLeave",[r,i,this],o.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,t,i,o){const r=A(t,o.route);return e.then(s=>{if(this.__isLatestRender(t))return it("onBeforeEnter",[r,i,this],o.element)(s)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,i){if(t>bi)throw new Error(T(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(T(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:i=""},o){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==i){const r=o?"replaceState":"pushState";window.history[r](null,document.title,e+t+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let i=this.__outlet;for(let o=0;o<e.__divergedChainIndex;o++){const r=t&&t.chain[o].element;if(r)if(r.parentNode===i)e.chain[o].element=r,i=r;else break}return i}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(r=>this.__addedByRouter.get(r)&&r!==e.result);let o=i;for(let r=e.__divergedChainIndex;r<e.chain.length;r++){const s=e.chain[r].element;s&&(o.appendChild(s),this.__addedByRouter.set(s,!0),o===i&&this.__appearingContent.push(s),o=s)}}__removeDisappearingContent(){this.__disappearingContent&&le(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(le(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(!!t)for(let i=t.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const o=t.chain[i].element;if(!!o)try{const r=A(e);ce(o.onAfterLeave,[r,{},t.resolver],o)}finally{this.__disappearingContent.indexOf(o)>-1&&le(o.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const i=e.chain[t].element||{},o=A(e,e.chain[t].route);ce(i.onAfterEnter,[o,{},e.resolver],i)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],o=[],r=e.chain;let s;for(let l=r.length;l>0;l--)if(r[l-1].route.animate){s=r[l-1].route.animate;break}if(t&&i&&s){const l=me(s)&&s.leave||"leaving",a=me(s)&&s.enter||"entering";o.push(et(t,l)),o.push(et(i,a))}return Promise.all(o).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:i,hash:o}=e?e.detail:window.location;I(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:i,hash:o},!0))}static setTriggers(...e){_i(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=mi(this)),he(this.__urlForName(e,t),this)}urlForPath(e,t){return he(O.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:i,hash:o}=I(e)?this.__createUrl(e,"http://a"):e;return X("go",{pathname:t,search:i,hash:o})}}const Ai=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ue=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Ci(){function n(){return!0}return xt(n)}function Ri(){try{return Ii()?!0:Ti()?ue?!Ni():!Ci():!1}catch{return!1}}function Ii(){return localStorage.getItem("vaadin.developmentmode.force")}function Ti(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Ni(){return!!(ue&&Object.keys(ue).map(e=>ue[e]).filter(e=>e.productionMode).length>0)}function xt(n,e){if(typeof n!="function")return;const t=Ai.exec(n.toString());if(t)try{n=new Function(t[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return n(e)}window.Vaadin=window.Vaadin||{};const nt=function(n,e){if(window.Vaadin.developmentMode)return xt(n,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Ri());function Li(){}const xi=function(){if(typeof nt=="function")return nt(Li)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});xi();O.NavigationTrigger={POPSTATE:ei,CLICK:Qt};var Se,y;(function(n){n.CONNECTED="connected",n.LOADING="loading",n.RECONNECTING="reconnecting",n.CONNECTION_LOST="connection-lost"})(y||(y={}));class Oi{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(t=>{var i;(i=t==null?void 0:t.active)===null||i===void 0||i.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=y.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(y.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(y.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const t=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const i of this.stateChangeListeners)i(t,this.connectionState)}}get online(){return this.connectionState===y.CONNECTED||this.connectionState===y.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=y.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const de=window;!((Se=de.Vaadin)===null||Se===void 0)&&Se.connectionState||(de.Vaadin=de.Vaadin||{},de.Vaadin.connectionState=new Oi(navigator.onLine?y.CONNECTED:y.CONNECTION_LOST));function $(n,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,i);else for(var l=n.length-1;l>=0;l--)(s=n[l])&&(r=(o<3?s(r):o>3?s(e,t,r):s(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}const fe=window,Me=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),ot=new WeakMap;let Ot=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Me&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ot.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ot.set(t,e))}return e}toString(){return this.cssText}};const ki=n=>new Ot(typeof n=="string"?n:n+"",void 0,Ue),R=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[r+1],n[0]);return new Ot(t,n,Ue)},Pi=(n,e)=>{Me?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=fe.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,n.appendChild(i)})},rt=Me?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ki(t)})(n):n;var $e;const _e=window,st=_e.trustedTypes,Mi=st?st.emptyScript:"",at=_e.reactiveElementPolyfillSupport,ke={toAttribute(n,e){switch(e){case Boolean:n=n?Mi:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},kt=(n,e)=>e!==n&&(e==e||n==n),Ae={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:kt};let F=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=Ae){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ae}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(rt(o))}else e!==void 0&&t.push(rt(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Pi(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Ae){var o;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const s=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:ke).toAttribute(t,i.type);this._$El=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){const s=o.getPropertyOptions(r),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:ke;this._$El=r,this[r]=l.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||kt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,r)=>this[r]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};F.finalized=!0,F.elementProperties=new Map,F.elementStyles=[],F.shadowRootOptions={mode:"open"},at==null||at({ReactiveElement:F}),(($e=_e.reactiveElementVersions)!==null&&$e!==void 0?$e:_e.reactiveElementVersions=[]).push("1.4.2");var Ce;const ye=window,z=ye.trustedTypes,lt=z?z.createPolicy("lit-html",{createHTML:n=>n}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+x,Ui=`<${Pt}>`,G=document,ee=(n="")=>G.createComment(n),te=n=>n===null||typeof n!="object"&&typeof n!="function",Mt=Array.isArray,Di=n=>Mt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ct=/>/g,P=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,ut=/"/g,Ut=/^(?:script|style|textarea|title)$/i,Dt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),E=Dt(1),pn=Dt(2),U=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),ft=new WeakMap,B=G.createTreeWalker(G,129,null,!1),Fi=(n,e)=>{const t=n.length-1,i=[];let o,r=e===2?"<svg>":"",s=Y;for(let a=0;a<t;a++){const d=n[a];let c,h,u=-1,p=0;for(;p<d.length&&(s.lastIndex=p,h=s.exec(d),h!==null);)p=s.lastIndex,s===Y?h[1]==="!--"?s=dt:h[1]!==void 0?s=ct:h[2]!==void 0?(Ut.test(h[2])&&(o=RegExp("</"+h[2],"g")),s=P):h[3]!==void 0&&(s=P):s===P?h[0]===">"?(s=o??Y,u=-1):h[1]===void 0?u=-2:(u=s.lastIndex-h[2].length,c=h[1],s=h[3]===void 0?P:h[3]==='"'?ut:ht):s===ut||s===ht?s=P:s===dt||s===ct?s=Y:(s=P,o=void 0);const k=s===P&&n[a+1].startsWith("/>")?" ":"";r+=s===Y?d+Ui:u>=0?(i.push(c),d.slice(0,u)+"$lit$"+d.slice(u)+x+k):d+x+(u===-2?(i.push(void 0),a):k)}const l=r+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[lt!==void 0?lt.createHTML(l):l,i]};class ie{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const l=e.length-1,a=this.parts,[d,c]=Fi(e,t);if(this.el=ie.createElement(d,i),B.currentNode=this.el.content,t===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(o=B.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const h=[];for(const u of o.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(x)){const p=c[s++];if(h.push(u),p!==void 0){const k=o.getAttribute(p.toLowerCase()+"$lit$").split(x),D=/([.?@])?(.*)/.exec(p);a.push({type:1,index:r,name:D[2],strings:k,ctor:D[1]==="."?Bi:D[1]==="?"?ji:D[1]==="@"?zi:we})}else a.push({type:6,index:r})}for(const u of h)o.removeAttribute(u)}if(Ut.test(o.tagName)){const h=o.textContent.split(x),u=h.length-1;if(u>0){o.textContent=z?z.emptyScript:"";for(let p=0;p<u;p++)o.append(h[p],ee()),B.nextNode(),a.push({type:2,index:++r});o.append(h[u],ee())}}}else if(o.nodeType===8)if(o.data===Pt)a.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:r}),h+=x.length-1}r++}}static createElement(e,t){const i=G.createElement("template");return i.innerHTML=e,i}}function W(n,e,t=n,i){var o,r,s,l;if(e===U)return e;let a=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const d=te(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),d===void 0?a=void 0:(a=new d(n),a._$AT(n,t,i)),i!==void 0?((s=(l=t)._$Co)!==null&&s!==void 0?s:l._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=W(n,a._$AS(n,e.values),a,i)),e}class Vi{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:G).importNode(i,!0);B.currentNode=r;let s=B.nextNode(),l=0,a=0,d=o[0];for(;d!==void 0;){if(l===d.index){let c;d.type===2?c=new re(s,s.nextSibling,this,e):d.type===1?c=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(c=new Gi(s,this,e)),this.u.push(c),d=o[++a]}l!==(d==null?void 0:d.index)&&(s=B.nextNode(),l++)}return r}p(e){let t=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class re{constructor(e,t,i,o){var r;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cm=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),te(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==U&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Di(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==_&&te(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ie.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.p(i);else{const s=new Vi(r,this),l=s.v(this.options);s.p(i),this.T(l),this._$AH=s}}_$AC(e){let t=ft.get(e.strings);return t===void 0&&ft.set(e.strings,t=new ie(e)),t}k(e){Mt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new re(this.O(ee()),this.O(ee()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cm=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class we{constructor(e,t,i,o,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(r===void 0)e=W(this,e,t,0),s=!te(e)||e!==this._$AH&&e!==U,s&&(this._$AH=e);else{const l=e;let a,d;for(e=r[0],a=0;a<r.length-1;a++)d=W(this,l[i+a],t,a),d===U&&(d=this._$AH[a]),s||(s=!te(d)||d!==this._$AH[a]),d===_?e=_:e!==_&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}s&&!o&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Bi extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const Hi=z?z.emptyScript:"";class ji extends we{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,Hi):this.element.removeAttribute(this.name)}}class zi extends we{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=W(this,e,t,0))!==null&&i!==void 0?i:_)===U)return;const o=this._$AH,r=e===_&&o!==_||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==_&&(o===_||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Gi{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const pt=ye.litHtmlPolyfillSupport;pt==null||pt(ie,re),((Ce=ye.litHtmlVersions)!==null&&Ce!==void 0?Ce:ye.litHtmlVersions=[]).push("2.4.0");const Wi=(n,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=r._$litPart$;if(s===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=s=new re(e.insertBefore(ee(),l),l,void 0,t??{})}return s._$AI(n),s};var Re,Ie;class H extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Wi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return U}}H.finalized=!0,H._$litElement$=!0,(Re=globalThis.litElementHydrateSupport)===null||Re===void 0||Re.call(globalThis,{LitElement:H});const gt=globalThis.litElementPolyfillSupport;gt==null||gt({LitElement:H});((Ie=globalThis.litElementVersions)!==null&&Ie!==void 0?Ie:globalThis.litElementVersions=[]).push("3.2.2");const qi=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function m(n){return(e,t)=>t!==void 0?((i,o,r)=>{o.constructor.createProperty(r,i)})(n,e,t):qi(n,e)}function se(n){return m({...n,state:!0})}const Ki=({finisher:n,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const r=(o=t.originalKey)!==null&&o!==void 0?o:t.key,s=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return n!=null&&(s.finisher=function(l){n(l,r)}),s}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),n==null||n(r,i)}};function Yi(n,e){return Ki({descriptor:t=>{const i={get(){var o,r;return(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(n))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,s;return this[o]===void 0&&(this[o]=(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n))!==null&&s!==void 0?s:null),this[o]}}return i}})}var Te;((Te=window.HTMLSlotElement)===null||Te===void 0?void 0:Te.prototype.assignedElements)!=null;const Ji={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xi=n=>(...e)=>({_$litDirective$:n,values:e});class Qi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Ft=Xi(class extends Qi{constructor(n){var e;if(super(n),n.type!==Ji.ATTRIBUTE||n.name!=="class"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var t,i;if(this.nt===void 0){this.nt=new Set,n.strings!==void 0&&(this.st=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((t=this.st)===null||t===void 0)&&t.has(r))&&this.nt.add(r);return this.render(e)}const o=n.element.classList;this.nt.forEach(r=>{r in e||(o.remove(r),this.nt.delete(r))});for(const r in e){const s=!!e[r];s===this.nt.has(r)||!((i=this.st)===null||i===void 0)&&i.has(r)||(s?(o.add(r),this.nt.add(r)):(o.remove(r),this.nt.delete(r)))}return U}}),Ne="css-loading-indicator";var C;(function(n){n.IDLE="",n.FIRST="first",n.SECOND="second",n.THIRD="third"})(C||(C={}));class w extends H{constructor(){super(),this.firstDelay=300,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=C.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=y.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,t;const i=window;return!((e=i.Vaadin)===null||e===void 0)&&e.connectionIndicator||(i.Vaadin=i.Vaadin||{},i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),(t=i.Vaadin)===null||t===void 0?void 0:t.connectionIndicator}render(){return E`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Ft({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const t=window;!((e=t.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=t.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const t=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=t===y.CONNECTION_LOST,this.reconnecting=t===y.RECONNECTING,this.updateLoading(t===y.LOADING),this.loading?!1:t!==this.lastMessageState?(this.lastMessageState=t,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=C.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=C.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=C.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=C.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(Ne)){const e=document.createElement("style");e.id=Ne,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(Ne);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case C.IDLE:return"display: none";case C.FIRST:case C.SECOND:case C.THIRD:return"display: block";default:return""}}timeoutFor(e,t,i,o){return e!==0&&window.clearTimeout(e),t?window.setTimeout(i,o):0}static get instance(){return w.create()}}$([m({type:Number})],w.prototype,"firstDelay",void 0);$([m({type:Number})],w.prototype,"secondDelay",void 0);$([m({type:Number})],w.prototype,"thirdDelay",void 0);$([m({type:Number})],w.prototype,"expandedDuration",void 0);$([m({type:String})],w.prototype,"onlineText",void 0);$([m({type:String})],w.prototype,"offlineText",void 0);$([m({type:String})],w.prototype,"reconnectingText",void 0);$([m({type:Boolean,reflect:!0})],w.prototype,"offline",void 0);$([m({type:Boolean,reflect:!0})],w.prototype,"reconnecting",void 0);$([m({type:Boolean,reflect:!0})],w.prototype,"expanded",void 0);$([m({type:Boolean,reflect:!0})],w.prototype,"loading",void 0);$([m({type:String})],w.prototype,"loadingBarState",void 0);$([m({type:Boolean})],w.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",w);w.instance;const ne=window;ne.Vaadin=ne.Vaadin||{};ne.Vaadin.registrations=ne.Vaadin.registrations||[];ne.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.17"});class vt extends Error{}const J=window.document.body,v=window;class Zi{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,J.$=J.$||[],this.config=e||{},v.Vaadin=v.Vaadin||{},v.Vaadin.Flow=v.Vaadin.Flow||{},v.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const t=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||t&&t.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,v.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,v.Vaadin.connectionState.loadingFinished()}get action(){return async e=>{if(this.pathname=e.pathname,v.Vaadin.connectionState.online)try{await this.flowInit()}catch(t){if(t instanceof vt)return v.Vaadin.connectionState.state=y.CONNECTION_LOST,this.offlineStubAction();throw t}else return this.offlineStubAction();return this.container.onBeforeEnter=(t,i)=>this.flowNavigate(t,i),this.container.onBeforeLeave=(t,i)=>this.flowLeave(t,i),this.container}}async flowLeave(e,t){const{connectionState:i}=v.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||i.offline?Promise.resolve({}):new Promise(o=>{this.loadingStarted(),this.container.serverConnected=r=>{o(t&&r?t.prevent():{}),this.loadingFinished()},J.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,t){return this.response?new Promise(i=>{this.loadingStarted(),this.container.serverConnected=(o,r)=>{t&&o?i(t.prevent()):t&&t.redirect&&r?i(t.redirect(r.pathname)):(this.container.style.display="",i(this.container)),this.loadingFinished()},J.$server.connectClient(this.container.localName,this.container.id,this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state)}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(e=!1){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi(e),this.response.appConfig.clientRouting=!e;const{pushScript:t,appConfig:i}=this.response;typeof t=="string"&&await this.loadScript(t);const{appId:o}=i;await(await Le(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(o),await this.config.imports());const s=await Le(()=>import("./FlowClient-5d0b7235.js"),[],import.meta.url);if(await this.flowInitClient(s),!e){const l=`flow-container-${o.toLowerCase()}`;this.container=document.createElement(l),J.$[o]=this.container,this.container.id=o}this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((t,i)=>{const o=document.createElement("script");o.onload=()=>t(),o.onerror=i,o.src=e,document.body.appendChild(o)})}injectAppIdScript(e){const t=e.substring(0,e.lastIndexOf("-")),i=document.createElement("script");i.type="module",i.setAttribute("data-app-id",t),document.body.append(i)}async flowInitClient(e){return e.init(),new Promise(t=>{const i=setInterval(()=>{Object.keys(v.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").reduce((r,s)=>r||v.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(i),t())},5)})}async flowInitUi(e){const t=v.Vaadin&&v.Vaadin.TypeScript&&v.Vaadin.TypeScript.initial;return t?(v.Vaadin.TypeScript.initial=void 0,Promise.resolve(t)):new Promise((i,o)=>{const s=new XMLHttpRequest,l=e?"&serverSideRouting":"",a=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}${l}`;s.open("GET",a),s.onerror=()=>o(new vt(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const d=s.getResponseHeader("content-type");d&&d.indexOf("application/json")!==-1?i(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){w.create(),v.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){v.Vaadin.connectionState.state=y.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{v.Vaadin.connectionState.state=y.CONNECTED},e.onerror=()=>{v.Vaadin.connectionState.state=y.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),v.addEventListener("offline",()=>{this.isFlowClientLoaded()||(v.Vaadin.connectionState.state=y.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),t="./offline-stub.html";e.setAttribute("src",t),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let i;const o=()=>{i!==void 0&&(v.Vaadin.connectionState.removeStateChangeListener(i),i=void 0)};return e.onBeforeEnter=(r,s,l)=>{i=()=>{v.Vaadin.connectionState.online&&(o(),l.render(r,!1))},v.Vaadin.connectionState.addStateChangeListener(i)},e.onBeforeLeave=(r,s,l)=>{o()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:en}=new Zi({imports:()=>Le(()=>import("./generated-flow-imports-765c0277.js"),[],import.meta.url)}),tn=[...en],nn=new O(document.querySelector("#outlet"));nn.setRoutes(tn);var on=function(){var n=document.getSelection();if(!n.rangeCount)return function(){};for(var e=document.activeElement,t=[],i=0;i<n.rangeCount;i++)t.push(n.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return n.removeAllRanges(),function(){n.type==="Caret"&&n.removeAllRanges(),n.rangeCount||t.forEach(function(o){n.addRange(o)}),e&&e.focus()}},mt={"text/plain":"Text","text/html":"Url",default:"Text"},rn="Copy to clipboard: #{key}, Enter";function sn(n){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return n.replace(/#{\s*key\s*}/g,e)}function an(n,e){var t,i,o,r,s,l,a=!1;e||(e={}),t=e.debug||!1;try{o=on(),r=document.createRange(),s=document.getSelection(),l=document.createElement("span"),l.textContent=n,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var h=mt[e.format]||mt.default;window.clipboardData.setData(h,n)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,n);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),r.selectNodeContents(l),s.addRange(r);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){t&&console.error("unable to copy using execCommand: ",c),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",n),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(h){t&&console.error("unable to copy using clipboardData: ",h),t&&console.error("falling back to prompt"),i=sn("message"in e?e.message:rn),window.prompt(i,n)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(r):s.removeAllRanges()),l&&document.body.removeChild(l),o()}return a}const De=1e3,Fe=(n,e)=>{const t=Array.from(n.querySelectorAll(e.join(", "))),i=Array.from(n.querySelectorAll("*")).filter(o=>o.shadowRoot).flatMap(o=>Fe(o.shadowRoot,e));return[...t,...i]};let _t=!1;const oe=(n,e)=>{_t||(window.addEventListener("message",o=>{o.data==="validate-license"&&window.location.reload()},!1),_t=!0);const t=n._overlayElement;if(t){if(t.shadowRoot){const o=t.shadowRoot.querySelector("slot:not([name])");if(o&&o.assignedElements().length>0){oe(o.assignedElements()[0],e);return}}oe(t,e);return}const i=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");n.isConnected&&(n.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${i}</div></no-license>`)},Q={},yt={},q={},Vt={},N=n=>`${n.name}_${n.version}`,wt=n=>{var e;const{cvdlName:t,version:i}=n.constructor,o={name:t,version:i},r=n.tagName.toLowerCase();Q[t]=(e=Q[t])!==null&&e!==void 0?e:[],Q[t].push(r);const s=q[N(o)];s&&setTimeout(()=>oe(n,s),De),q[N(o)]||Vt[N(o)]||yt[N(o)]||(yt[N(o)]=!0,window.Vaadin.devTools.checkLicense(o))},ln=n=>{Vt[N(n)]=!0,console.debug("License check ok for",n)},Bt=n=>{const e=n.product.name;q[N(n.product)]=n,console.error("License check failed for",e);const t=Q[e];(t==null?void 0:t.length)>0&&Fe(document,t).forEach(i=>{setTimeout(()=>oe(i,q[N(n.product)]),De)})},dn=n=>{const e=n.message,t=n.product.name;n.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,q[N(n.product)]=n,console.error("No license found when checking",t);const i=Q[t];(i==null?void 0:i.length)>0&&Fe(document,i).forEach(o=>{setTimeout(()=>oe(o,q[N(n.product)]),De)})},cn=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(n=>{wt(n)}),window.Vaadin.devTools.createdCvdlElements={push:n=>{wt(n)}}};var b=globalThis&&globalThis.__decorate||function(n,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,i);else for(var l=n.length-1;l>=0;l--)(s=n[l])&&(r=(o<3?s(r):o>3?s(e,t,r):s(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r},g;(function(n){n.ACTIVE="active",n.INACTIVE="inactive",n.UNAVAILABLE="unavailable",n.ERROR="error"})(g||(g={}));class j extends Object{constructor(e){super(),this.status=g.UNAVAILABLE,e&&(this.webSocket=new WebSocket(e),this.webSocket.onmessage=t=>this.handleMessage(t),this.webSocket.onerror=t=>this.handleError(t),this.webSocket.onclose=t=>{this.status!==g.ERROR&&this.setStatus(g.UNAVAILABLE),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!==g.ERROR&&this.status!==g.UNAVAILABLE&&this.webSocket.send("")},j.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onConnectionError(e){}onStatusChange(e){}onMessage(e){console.error("Unknown message received from the live reload server:",e)}handleMessage(e){let t;try{t=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}t.command==="hello"?(this.setStatus(g.ACTIVE),this.onHandshake()):t.command==="reload"?this.status===g.ACTIVE&&this.onReload():t.command==="license-check-ok"?ln(t.data):t.command==="license-check-failed"?Bt(t.data):t.command==="license-check-nokey"?dn(t.data):this.onMessage(t)}handleError(e){console.error(e),this.setStatus(g.ERROR),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}setActive(e){!e&&this.status===g.ACTIVE?this.setStatus(g.INACTIVE):e&&this.status===g.INACTIVE&&this.setStatus(g.ACTIVE)}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}send(e,t){const i=JSON.stringify({command:e,data:t});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(i)):this.webSocket.send(i):console.error(`Unable to send message ${e}. No websocket is available`)}setFeature(e,t){this.send("setFeature",{featureId:e,enabled:t})}sendTelemetry(e){this.send("reportTelemetry",{browserData:e})}sendLicenseCheck(e){this.send("checkLicense",e)}}j.HEARTBEAT_INTERVAL=18e4;var S;(function(n){n.LOG="log",n.INFORMATION="information",n.WARNING="warning",n.ERROR="error"})(S||(S={}));class f extends H{constructor(){super(...arguments),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=g.UNAVAILABLE,this.javaStatus=g.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:this.renderLog,activate:this.activateLog},{id:"info",title:"Info",render:this.renderInfo},{id:"features",title:"Experimental Features",render:this.renderFeatures}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.nextMessageId=1,this.transitionDuration=0}static get styles(){return R`
      :host {
        --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
          'Helvetica Neue', sans-serif;
        --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
          monospace;

        --dev-tools-font-size: 0.8125rem;
        --dev-tools-font-size-small: 0.75rem;

        --dev-tools-text-color: rgba(255, 255, 255, 0.8);
        --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
        --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
        --dev-tools-text-color-active: rgba(255, 255, 255, 1);

        --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
        --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
        --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

        --dev-tools-border-radius: 0.5rem;
        --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

        --dev-tools-blue-hsl: ${this.BLUE_HSL};
        --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
        --dev-tools-green-hsl: ${this.GREEN_HSL};
        --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
        --dev-tools-grey-hsl: ${this.GREY_HSL};
        --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
        --dev-tools-yellow-hsl: ${this.YELLOW_HSL};
        --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
        --dev-tools-red-hsl: ${this.RED_HSL};
        --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

        /* Needs to be in ms, used in JavaScript as well */
        --dev-tools-transition-duration: 180ms;

        all: initial;

        direction: ltr;
        cursor: default;
        font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
        color: var(--dev-tools-text-color);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;

        position: fixed;
        z-index: 20000;
        pointer-events: none;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
      }

      .dev-tools {
        pointer-events: auto;
        display: flex;
        align-items: center;
        position: fixed;
        z-index: inherit;
        right: 0.5rem;
        bottom: 0.5rem;
        min-width: 1.75rem;
        height: 1.75rem;
        max-width: 1.75rem;
        border-radius: 0.5rem;
        padding: 0.375rem;
        box-sizing: border-box;
        background-color: var(--dev-tools-background-color-inactive);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
        color: var(--dev-tools-text-color);
        transition: var(--dev-tools-transition-duration);
        white-space: nowrap;
        line-height: 1rem;
      }

      .dev-tools:hover,
      .dev-tools.active {
        background-color: var(--dev-tools-background-color-active);
        box-shadow: var(--dev-tools-box-shadow);
      }

      .dev-tools.active {
        max-width: calc(100% - 1rem);
      }

      .dev-tools .dev-tools-icon {
        flex: none;
        pointer-events: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        fill: #fff;
        transition: var(--dev-tools-transition-duration);
        margin: 0;
      }

      .dev-tools.active .dev-tools-icon {
        opacity: 0;
        position: absolute;
        transform: scale(0.5);
      }

      .dev-tools .status-blip {
        flex: none;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        z-index: 20001;
        background: var(--dev-tools-grey-color);
        position: absolute;
        top: -1px;
        right: -1px;
      }

      .dev-tools .status-description {
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 0.25rem;
      }

      .dev-tools.error {
        background-color: hsla(var(--dev-tools-red-hsl), 0.15);
        animation: bounce 0.5s;
        animation-iteration-count: 2;
      }

      .switch {
        display: inline-flex;
        align-items: center;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .switch .slider {
        display: block;
        flex: none;
        width: 28px;
        height: 18px;
        border-radius: 9px;
        background-color: rgba(255, 255, 255, 0.3);
        transition: var(--dev-tools-transition-duration);
        margin-right: 0.5rem;
      }

      .switch:focus-within .slider,
      .switch .slider:hover {
        background-color: rgba(255, 255, 255, 0.35);
        transition: none;
      }

      .switch input:focus-visible ~ .slider {
        box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
      }

      .switch .slider::before {
        content: '';
        display: block;
        margin: 2px;
        width: 14px;
        height: 14px;
        background-color: #fff;
        transition: var(--dev-tools-transition-duration);
        border-radius: 50%;
      }

      .switch input:checked + .slider {
        background-color: var(--dev-tools-green-color);
      }

      .switch input:checked + .slider::before {
        transform: translateX(10px);
      }

      .switch input:disabled + .slider::before {
        background-color: var(--dev-tools-grey-color);
      }

      .window.hidden {
        opacity: 0;
        transform: scale(0);
        position: absolute;
      }

      .window.visible {
        transform: none;
        opacity: 1;
        pointer-events: auto;
      }

      .window.visible ~ .dev-tools {
        opacity: 0;
        pointer-events: none;
      }

      .window.visible ~ .dev-tools .dev-tools-icon,
      .window.visible ~ .dev-tools .status-blip {
        transition: none;
        opacity: 0;
      }

      .window {
        border-radius: var(--dev-tools-border-radius);
        overflow: hidden;
        margin: 0.5rem;
        width: 30rem;
        max-width: calc(100% - 1rem);
        max-height: calc(100vh - 1rem);
        flex-shrink: 1;
        background-color: var(--dev-tools-background-color-active);
        color: var(--dev-tools-text-color);
        transition: var(--dev-tools-transition-duration);
        transform-origin: bottom right;
        display: flex;
        flex-direction: column;
        box-shadow: var(--dev-tools-box-shadow);
        outline: none;
      }

      .window-toolbar {
        display: flex;
        flex: none;
        align-items: center;
        padding: 0.375rem;
        white-space: nowrap;
        order: 1;
        background-color: rgba(0, 0, 0, 0.2);
        gap: 0.5rem;
      }

      .tab {
        color: var(--dev-tools-text-color-secondary);
        font: inherit;
        font-size: var(--dev-tools-font-size-small);
        font-weight: 500;
        line-height: 1;
        padding: 0.25rem 0.375rem;
        background: none;
        border: none;
        margin: 0;
        border-radius: 0.25rem;
        transition: var(--dev-tools-transition-duration);
      }

      .tab:hover,
      .tab.active {
        color: var(--dev-tools-text-color-active);
      }

      .tab.active {
        background-color: rgba(255, 255, 255, 0.12);
      }

      .tab.unreadErrors::after {
        content: '•';
        color: hsl(var(--dev-tools-red-hsl));
        font-size: 1.5rem;
        position: absolute;
        transform: translate(0, -50%);
      }

      .ahreflike {
        font-weight: 500;
        color: var(--dev-tools-text-color-secondary);
        text-decoration: underline;
        cursor: pointer;
      }

      .ahreflike:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.2);
        color: inherit;
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .button:focus,
      .button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .minimize-button {
        flex: none;
        width: 1rem;
        height: 1rem;
        color: inherit;
        background-color: transparent;
        border: 0;
        padding: 0;
        margin: 0 0 0 auto;
        opacity: 0.8;
      }

      .minimize-button:hover {
        opacity: 1;
      }

      .minimize-button svg {
        max-width: 100%;
      }

      .message.information {
        --dev-tools-notification-color: var(--dev-tools-blue-color);
      }

      .message.warning {
        --dev-tools-notification-color: var(--dev-tools-yellow-color);
      }

      .message.error {
        --dev-tools-notification-color: var(--dev-tools-red-color);
      }

      .message {
        display: flex;
        padding: 0.1875rem 0.75rem 0.1875rem 2rem;
        background-clip: padding-box;
      }

      .message.log {
        padding-left: 0.75rem;
      }

      .message-content {
        margin-right: 0.5rem;
        -webkit-user-select: text;
        -moz-user-select: text;
        user-select: text;
      }

      .message-heading {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0.125rem 0;
      }

      .message.log {
        color: var(--dev-tools-text-color-secondary);
      }

      .message:not(.log) .message-heading {
        font-weight: 500;
      }

      .message.has-details .message-heading {
        color: var(--dev-tools-text-color-emphasis);
        font-weight: 600;
      }

      .message-heading::before {
        position: absolute;
        margin-left: -1.5rem;
        display: inline-block;
        text-align: center;
        font-size: 0.875em;
        font-weight: 600;
        line-height: calc(1.25em - 2px);
        width: 14px;
        height: 14px;
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 50%;
      }

      .message.information .message-heading::before {
        content: 'i';
        border-color: currentColor;
        color: var(--dev-tools-notification-color);
      }

      .message.warning .message-heading::before,
      .message.error .message-heading::before {
        content: '!';
        color: var(--dev-tools-background-color-active);
        background-color: var(--dev-tools-notification-color);
      }

      .features-tray {
        padding: 0.75rem;
        flex: auto;
        overflow: auto;
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        user-select: text;
      }

      .features-tray p {
        margin-top: 0;
        color: var(--dev-tools-text-color-secondary);
      }

      .features-tray .feature {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-bottom: 0.5em;
      }

      .message .message-details {
        font-weight: 400;
        color: var(--dev-tools-text-color-secondary);
        margin: 0.25rem 0;
      }

      .message .message-details[hidden] {
        display: none;
      }

      .message .message-details p {
        display: inline;
        margin: 0;
        margin-right: 0.375em;
        word-break: break-word;
      }

      .message .persist {
        color: var(--dev-tools-text-color-secondary);
        white-space: nowrap;
        margin: 0.375rem 0;
        display: flex;
        align-items: center;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      .message .persist::before {
        content: '';
        width: 1em;
        height: 1em;
        border-radius: 0.2em;
        margin-right: 0.375em;
        background-color: rgba(255, 255, 255, 0.3);
      }

      .message .persist:hover::before {
        background-color: rgba(255, 255, 255, 0.4);
      }

      .message .persist.on::before {
        background-color: rgba(255, 255, 255, 0.9);
      }

      .message .persist.on::after {
        content: '';
        order: -1;
        position: absolute;
        width: 0.75em;
        height: 0.25em;
        border: 2px solid var(--dev-tools-background-color-active);
        border-width: 0 0 2px 2px;
        transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
      }

      .message .dismiss-message {
        font-weight: 600;
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 0.25rem;
        margin-left: 0.5rem;
        color: var(--dev-tools-text-color-secondary);
      }

      .message .dismiss-message:hover {
        color: var(--dev-tools-text-color);
      }

      .notification-tray {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        margin: 0.5rem;
        flex: none;
      }

      .window.hidden + .notification-tray {
        margin-bottom: 3rem;
      }

      .notification-tray .message {
        pointer-events: auto;
        background-color: var(--dev-tools-background-color-active);
        color: var(--dev-tools-text-color);
        max-width: 30rem;
        box-sizing: border-box;
        border-radius: var(--dev-tools-border-radius);
        margin-top: 0.5rem;
        transition: var(--dev-tools-transition-duration);
        transform-origin: bottom right;
        animation: slideIn var(--dev-tools-transition-duration);
        box-shadow: var(--dev-tools-box-shadow);
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }

      .notification-tray .message.animate-out {
        animation: slideOut forwards var(--dev-tools-transition-duration);
      }

      .notification-tray .message .message-details {
        max-height: 10em;
        overflow: hidden;
      }

      .message-tray {
        flex: auto;
        overflow: auto;
        max-height: 20rem;
        user-select: text;
      }

      .message-tray .message {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        padding-left: 2.25rem;
      }

      .message-tray .message.warning {
        background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
      }

      .message-tray .message.error {
        background-color: hsla(var(--dev-tools-red-hsl), 0.09);
      }

      .message-tray .message.error .message-heading {
        color: hsl(var(--dev-tools-red-hsl));
      }

      .message-tray .message.warning .message-heading {
        color: hsl(var(--dev-tools-yellow-hsl));
      }

      .message-tray .message + .message {
        border-top: 1px solid rgba(255, 255, 255, 0.07);
      }

      .message-tray .dismiss-message,
      .message-tray .persist {
        display: none;
      }

      .info-tray {
        padding: 0.75rem;
        position: relative;
        flex: auto;
        overflow: auto;
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        user-select: text;
      }

      .info-tray dl {
        margin: 0;
        display: grid;
        grid-template-columns: max-content 1fr;
        column-gap: 0.75rem;
        position: relative;
      }

      .info-tray dt {
        grid-column: 1;
        color: var(--dev-tools-text-color-emphasis);
      }

      .info-tray dt:not(:first-child)::before {
        content: '';
        width: 100%;
        position: absolute;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.1);
        margin-top: -0.375rem;
      }

      .info-tray dd {
        grid-column: 2;
        margin: 0;
      }

      .info-tray :is(dt, dd):not(:last-child) {
        margin-bottom: 0.75rem;
      }

      .info-tray dd + dd {
        margin-top: -0.5rem;
      }

      .info-tray .live-reload-status::before {
        content: '•';
        color: var(--status-color);
        width: 0.75rem;
        display: inline-block;
        font-size: 1rem;
        line-height: 0.5rem;
      }

      .info-tray .copy {
        position: fixed;
        z-index: 1;
        top: 0.5rem;
        right: 0.5rem;
      }

      .info-tray .switch {
        vertical-align: -4px;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0%);
          opacity: 1;
        }
      }

      @keyframes slideOut {
        from {
          transform: translateX(0%);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }
      }

      @keyframes bounce {
        0% {
          transform: scale(0.8);
        }
        50% {
          transform: scale(1.5);
          background-color: hsla(var(--dev-tools-red-hsl), 1);
        }
        100% {
          transform: scale(1);
        }
      }

      @supports (backdrop-filter: blur(1px)) {
        .dev-tools,
        .window,
        .notification-tray .message {
          backdrop-filter: blur(8px);
        }
        .dev-tools:hover,
        .dev-tools.active,
        .window,
        .notification-tray .message {
          background-color: var(--dev-tools-background-color-active-blurred);
        }
      }
    `}static get isActive(){const e=window.sessionStorage.getItem(f.ACTIVE_KEY_IN_SESSION_STORAGE);return e===null||e!=="false"}static notificationDismissed(e){const t=window.localStorage.getItem(f.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return t!==null&&t.includes(e)}elementTelemetry(){let e={};try{const t=localStorage.getItem("vaadin.statistics.basket");if(!t)return;e=JSON.parse(t)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(e)}openWebSocketConnection(){this.frontendStatus=g.UNAVAILABLE,this.javaStatus=g.UNAVAILABLE;const e=l=>this.log(S.ERROR,l),t=()=>{if(this.liveReloadDisabled)return;this.showSplashMessage("Reloading…");const l=window.sessionStorage.getItem(f.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),a=l?parseInt(l,10)+1:1;window.sessionStorage.setItem(f.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,a.toString()),window.sessionStorage.setItem(f.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},i=new j(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log(S.LOG,"Vaadin development mode initialized"),f.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=e,i.onReload=t,i.onStatusChange=l=>{this.frontendStatus=l},i.onMessage=l=>{(l==null?void 0:l.command)==="serverInfo"?this.serverInfo=l.data:(l==null?void 0:l.command)==="featureFlags"?this.features=l.data.features:console.error("Unknown message from front-end connection:",JSON.stringify(l))},this.frontendConnection=i;let o;this.backend===f.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(o=new j(this.getSpringBootWebSocketUrl(window.location)),o.onHandshake=()=>{f.isActive||o.setActive(!1)},o.onReload=t,o.onConnectionError=e):this.backend===f.JREBEL||this.backend===f.HOTSWAP_AGENT?o=i:o=new j(void 0);const r=o.onStatusChange;o.onStatusChange=l=>{r(l),this.javaStatus=l};const s=o.onHandshake;o.onHandshake=()=>{s(),this.backend&&this.log(S.INFORMATION,`Java live reload available: ${f.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=o,this.backend||this.showNotification(S.WARNING,"Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}getDedicatedWebSocketUrl(){function e(i){const o=document.createElement("div");return o.innerHTML=`<a href="${i}"/>`,o.firstChild.href}if(this.url===void 0)return;const t=e(this.url);if(!t.startsWith("http://")&&!t.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${t.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(e){const{hostname:t}=e,i=e.protocol==="https:"?"wss":"ws";if(t.endsWith("gitpod.io")){const o=t.replace(/.*?-/,"");return`${i}://${this.springBootLiveReloadPort}-${o}`}else return`${i}://${t}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=i=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(f.TRIGGERED_KEY_IN_SESSION_STORAGE)){const i=new Date,o=`${`0${i.getHours()}`.slice(-2)}:${`0${i.getMinutes()}`.slice(-2)}:${`0${i.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(f.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),cn()}format(e){return e.toString()}catchErrors(){const e=window.Vaadin.ConsoleErrors;e&&e.forEach(t=>{this.log(S.ERROR,t.map(i=>this.format(i)).join(" "))}),window.Vaadin.ConsoleErrors={push:t=>{this.log(S.ERROR,t.map(i=>this.format(i)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(e=>this.dismissNotification(e.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(e){this.splashMessage=e,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},f.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log(S.LOG,this.splashMessage),this.showSplashMessage(void 0)}checkLicense(e){this.frontendConnection?this.frontendConnection.sendLicenseCheck(e):Bt({message:"Internal error: no connection",product:e})}log(e,t,i,o){const r=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:r,type:e,message:t,details:i,link:o,dontShowAgain:!1,deleted:!1});this.messages.length>f.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const s=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&s?(setTimeout(()=>s.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):e===S.ERROR&&(this.unreadErrors=!0)})}showNotification(e,t,i,o,r){if(r===void 0||!f.notificationDismissed(r)){if(this.notifications.filter(a=>a.persistentId===r).filter(a=>!a.deleted).length>0)return;const l=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:l,type:e,message:t,details:i,link:o,persistentId:r,dontShowAgain:!1,deleted:!1}),o===void 0&&setTimeout(()=>{this.dismissNotification(l)},f.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(e,t,i,o)}dismissNotification(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const i=this.notifications[t];if(i.dontShowAgain&&i.persistentId&&!f.notificationDismissed(i.persistentId)){let o=window.localStorage.getItem(f.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);o=o===null?i.persistentId:`${o},${i.persistentId}`,window.localStorage.setItem(f.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,o)}i.deleted=!0,this.log(i.type,i.message,i.details,i.link),setTimeout(()=>{const o=this.findNotificationIndex(e);o!==-1&&(this.notifications.splice(o,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(e){let t=-1;return this.notifications.some((i,o)=>i.id===e?(t=o,!0):!1),t}toggleDontShowAgain(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const i=this.notifications[t];i.dontShowAgain=!i.dontShowAgain,this.requestUpdate()}}setActive(e){var t,i;(t=this.frontendConnection)===null||t===void 0||t.setActive(e),(i=this.javaConnection)===null||i===void 0||i.setActive(e),window.sessionStorage.setItem(f.ACTIVE_KEY_IN_SESSION_STORAGE,e?"true":"false")}getStatusColor(e){return e===g.ACTIVE?R`hsl(${f.GREEN_HSL})`:e===g.INACTIVE?R`hsl(${f.GREY_HSL})`:e===g.UNAVAILABLE?R`hsl(${f.YELLOW_HSL})`:e===g.ERROR?R`hsl(${f.RED_HSL})`:R`none`}renderMessage(e){return E`
      <div
        class="message ${e.type} ${e.deleted?"animate-out":""} ${e.details||e.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${e.message}</div>
          <div class="message-details" ?hidden="${!e.details&&!e.link}">
            ${e.details?E`<p>${e.details}</p>`:""}
            ${e.link?E`<a class="ahreflike" href="${e.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${e.persistentId?E`<div
                class="persist ${e.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(e.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(e.id)}>Dismiss</div>
      </div>
    `}render(){return E` <div
        class="window ${this.expanded?"visible":"hidden"}"
        tabindex="0"
        @keydown=${e=>e.key==="Escape"&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(e=>E`<button
                class=${Ft({tab:!0,active:this.activeTab===e.id,unreadErrors:e.id==="log"&&this.unreadErrors})}
                id="${e.id}"
                @click=${()=>{this.activeTab=e.id,e.activate&&e.activate.call(this)}}
              >
                ${e.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(e=>this.activeTab===e.id?e.render.call(this):_)}
      </div>

      <div class="notification-tray">${this.notifications.map(e=>this.renderMessage(e))}</div>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?E`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:E`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?E`<span class="status-description">${this.splashMessage}</span></div>`:_}
      </div>`}renderLog(){return E`<div class="message-tray">${this.messages.map(e=>this.renderMessage(e))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".message-tray .message:last-child");e&&e.scrollIntoView()})}renderInfo(){return E`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===g.UNAVAILABLE||this.frontendStatus===g.ERROR)&&(this.javaStatus===g.UNAVAILABLE||this.javaStatus===g.ERROR)}
              ?checked="${this.frontendStatus===g.ACTIVE||this.javaStatus===g.ACTIVE}"
              @change=${e=>this.setActive(e.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${f.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return E`<div class="features-tray">
      <p>
        These features are work in progress. The behavior, API, look and feel can still change significantly before (and
        if) they become part of a stable release.
      </p>
      ${this.features.map(e=>E`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${e.id}"
              type="checkbox"
              ?checked=${e.enabled}
              @change=${t=>this.toggleFeatureFlag(t,e)}
            />
            <span class="slider"></span>
            ${e.title}
          </label>
          <a class="ahreflike" href="${e.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}copyInfoToClipboard(){const e=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),t=Array.from(e).map(i=>(i.localName==="dd"?": ":`
`)+i.textContent.trim()).join("").replace(/^\n/,"");an(t),this.showNotification(S.INFORMATION,"Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(e,t){const i=e.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(t.id,i),this.showNotification(S.INFORMATION,`“${t.title}” ${i?"enabled":"disabled"}`,t.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${t.id}${i?"Enabled":"Disabled"}`)):this.log(S.ERROR,`Unable to toggle feature ${t.title}: No server connection available`)}}f.BLUE_HSL=R`206, 100%, 70%`;f.GREEN_HSL=R`145, 80%, 42%`;f.GREY_HSL=R`0, 0%, 50%`;f.YELLOW_HSL=R`38, 98%, 64%`;f.RED_HSL=R`355, 100%, 68%`;f.MAX_LOG_ROWS=1e3;f.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";f.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";f.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";f.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";f.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;f.HOTSWAP_AGENT="HOTSWAP_AGENT";f.JREBEL="JREBEL";f.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";f.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};b([m({type:String})],f.prototype,"url",void 0);b([m({type:Boolean,attribute:!0})],f.prototype,"liveReloadDisabled",void 0);b([m({type:String})],f.prototype,"backend",void 0);b([m({type:Number})],f.prototype,"springBootLiveReloadPort",void 0);b([m({type:Boolean,attribute:!1})],f.prototype,"expanded",void 0);b([m({type:Array,attribute:!1})],f.prototype,"messages",void 0);b([m({type:String,attribute:!1})],f.prototype,"splashMessage",void 0);b([m({type:Array,attribute:!1})],f.prototype,"notifications",void 0);b([m({type:String,attribute:!1})],f.prototype,"frontendStatus",void 0);b([m({type:String,attribute:!1})],f.prototype,"javaStatus",void 0);b([se()],f.prototype,"tabs",void 0);b([se()],f.prototype,"activeTab",void 0);b([se()],f.prototype,"serverInfo",void 0);b([se()],f.prototype,"features",void 0);b([se()],f.prototype,"unreadErrors",void 0);b([Yi(".window")],f.prototype,"root",void 0);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",f);export{Wi as Z,Yi as a,Qi as b,_ as c,Xi as d,m as e,R as i,Ot as o,ki as r,H as s,Ji as t,pn as w,U as x,E as y};
