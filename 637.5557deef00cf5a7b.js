"use strict";(self.webpackChunkwindmill_turbine=self.webpackChunkwindmill_turbine||[]).push([[637],{7637:(xe,U,g)=>{g.r(U),g.d(U,{MainDashboardModule:()=>$e});var C=g(6895),N=g(4793),vt=g(5107),n=g(4650),yt=g(2949);const bt=[{path:"",component:(()=>{class s{constructor(){}ngOnInit(){}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=n.Xpm({type:s,selectors:[["wt-main-dashboard"]],decls:2,vars:0,template:function(e,i){1&e&&n._UZ(0,"wt-common-popup")(1,"router-outlet")},dependencies:[N.lC,yt.m]}),s})(),children:[{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"dashboard",component:(()=>{class s{constructor(){}ngOnInit(){}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=n.Xpm({type:s,selectors:[["wt-visualize"]],decls:2,vars:0,consts:[[1,"main-content"],[1,"vis-card"]],template:function(e,i){1&e&&(n.TgZ(0,"div",0),n._UZ(1,"div",1),n.qZA())},styles:[".vis-card[_ngcontent-%COMP%]{height:100px;background:white;margin:10px;padding:10px;border:1.5px solid #d0d5dd;border-radius:7.5px}"]}),s})(),data:{page:"dashboard"},canActivate:[vt.a]}]}];let wt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[N.Bz.forChild(bt),N.Bz]}),s})();var Ct=g(2687),It=g(1621),St=g(6208);!(typeof window>"u")&&("ontouchstart"in window||navigator.maxTouchPoints>0||navigator),Object.freeze({topLeft:"nw-resize",topRight:"ne-resize",bottomLeft:"sw-resize",bottomRight:"se-resize",leftOrRight:"col-resize",topOrBottom:"row-resize"});let xt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({}),s})();var J=g(4006),Tt=g(1202),Rt=g(7581);let jt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[C.ez]}),s})(),Vt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[C.ez]}),s})();var Zt=g(8929),Jt=g(1548),P=g(1607),Kt=g(2986);let W,Qt=(()=>{class s{constructor(){this._focusTrapStack=[]}register(e){this._focusTrapStack=this._focusTrapStack.filter(r=>r!==e);let i=this._focusTrapStack;i.length&&i[i.length-1]._disable(),i.push(e),e._enable()}deregister(e){e._disable();const i=this._focusTrapStack,r=i.indexOf(e);-1!==r&&(i.splice(r,1),i.length&&i[i.length-1]._enable())}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();try{W=typeof Intl<"u"&&Intl.v8BreakIterator}catch{W=!1}let dt=(()=>{class s{constructor(e){this._platformId=e,this.isBrowser=this._platformId?(0,C.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!W)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return s.\u0275fac=function(e){return new(e||s)(n.LFG(n.Lbi))},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),at=(()=>{class s{constructor(e){this._platform=e}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return function te(s){return!!(s.offsetWidth||s.offsetHeight||"function"==typeof s.getClientRects&&s.getClientRects().length)}(e)&&"visible"===getComputedStyle(e).visibility}isTabbable(e){if(!this._platform.isBrowser)return!1;const i=function qt(s){try{return s.frameElement}catch{return null}}(function le(s){return s.ownerDocument&&s.ownerDocument.defaultView||window}(e));if(i&&(-1===ut(i)||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=ut(e);return e.hasAttribute("contenteditable")?-1!==o:!("iframe"===r||"object"===r||this._platform.WEBKIT&&this._platform.IOS&&!function oe(s){let t=s.nodeName.toLowerCase(),e="input"===t&&s.type;return"text"===e||"password"===e||"select"===t||"textarea"===t}(e))&&("audio"===r?!!e.hasAttribute("controls")&&-1!==o:"video"===r?-1!==o&&(null!==o||this._platform.FIREFOX||e.hasAttribute("controls")):e.tabIndex>=0)}isFocusable(e,i){return function he(s){return!function ie(s){return function re(s){return"input"==s.nodeName.toLowerCase()}(s)&&"hidden"==s.type}(s)&&(function ee(s){let t=s.nodeName.toLowerCase();return"input"===t||"select"===t||"button"===t||"textarea"===t}(s)||function se(s){return function ne(s){return"a"==s.nodeName.toLowerCase()}(s)&&s.hasAttribute("href")}(s)||s.hasAttribute("contenteditable")||ct(s))}(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}}return s.\u0275fac=function(e){return new(e||s)(n.LFG(dt))},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();function ct(s){if(!s.hasAttribute("tabindex")||void 0===s.tabIndex)return!1;let t=s.getAttribute("tabindex");return"-32768"!=t&&!(!t||isNaN(parseInt(t,10)))}function ut(s){if(!ct(s))return null;const t=parseInt(s.getAttribute("tabindex")||"",10);return isNaN(t)?-1:t}function mt(s){return null!=s&&"false"!=`${s}`}class de{constructor(t,e,i,r,o=!1){this._element=t,this._checker=e,this._ngZone=i,this._document=r,this._hasAttached=!1,this.startAnchorListener=()=>this.focusLastTabbableElement(),this.endAnchorListener=()=>this.focusFirstTabbableElement(),this._enabled=!0,o||this.attachAnchors()}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(t,this._startAnchor),this._toggleAnchorTabIndex(t,this._endAnchor))}destroy(){const t=this._startAnchor,e=this._endAnchor;t&&(t.removeEventListener("focus",this.startAnchorListener),t.parentNode&&t.parentNode.removeChild(t)),e&&(e.removeEventListener("focus",this.endAnchorListener),e.parentNode&&e.parentNode.removeChild(e)),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return!!this._hasAttached||(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(){return new Promise(t=>{this._executeOnStable(()=>t(this.focusInitialElement()))})}focusFirstTabbableElementWhenReady(){return new Promise(t=>{this._executeOnStable(()=>t(this.focusFirstTabbableElement()))})}focusLastTabbableElementWhenReady(){return new Promise(t=>{this._executeOnStable(()=>t(this.focusLastTabbableElement()))})}_getRegionBoundary(t){let e=this._element.querySelectorAll(`[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`);for(let i=0;i<e.length;i++)e[i].hasAttribute(`cdk-focus-${t}`)?console.warn(`Found use of deprecated attribute 'cdk-focus-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,e[i]):e[i].hasAttribute(`cdk-focus-region-${t}`)&&console.warn(`Found use of deprecated attribute 'cdk-focus-region-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,e[i]);return"start"==t?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(){const t=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(t){if(t.hasAttribute("cdk-focus-initial")&&console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",t),!this._checker.isFocusable(t)){const e=this._getFirstTabbableElement(t);return e?.focus(),!!e}return t.focus(),!0}return this.focusFirstTabbableElement()}focusFirstTabbableElement(){const t=this._getRegionBoundary("start");return t&&t.focus(),!!t}focusLastTabbableElement(){const t=this._getRegionBoundary("end");return t&&t.focus(),!!t}hasAttached(){return this._hasAttached}_getFirstTabbableElement(t){if(this._checker.isFocusable(t)&&this._checker.isTabbable(t))return t;let e=t.children||t.childNodes;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(t){if(this._checker.isFocusable(t)&&this._checker.isTabbable(t))return t;let e=t.children||t.childNodes;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){const t=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,t),t.classList.add("cdk-visually-hidden"),t.classList.add("cdk-focus-trap-anchor"),t.setAttribute("aria-hidden","true"),t}_toggleAnchorTabIndex(t,e){t?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(t){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(t,this._startAnchor),this._toggleAnchorTabIndex(t,this._endAnchor))}_executeOnStable(t){this._ngZone.isStable?t():this._ngZone.onStable.pipe((0,Kt.q)(1)).subscribe(t)}}let ae=(()=>{class s{constructor(e,i,r){this._checker=e,this._ngZone=i,this._document=r}create(e,i=!1){return new de(e,this._checker,this._ngZone,this._document,i)}}return s.\u0275fac=function(e){return new(e||s)(n.LFG(at),n.LFG(n.R0b),n.LFG(C.K0))},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),ce=(()=>{class s{constructor(e,i,r){this._elementRef=e,this._focusTrapFactory=i,this._previouslyFocusedElement=null,this._autoCapture=!1,this._document=r,this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0)}get enabled(){return this.focusTrap.enabled}set enabled(e){this.focusTrap.enabled=mt(e)}get autoCapture(){return this._autoCapture}set autoCapture(e){this._autoCapture=mt(e)}ngOnDestroy(){this.focusTrap.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap.hasAttached()||this.focusTrap.attachAnchors()}ngOnChanges(e){const i=e.autoCapture;i&&!i.firstChange&&this.autoCapture&&this.focusTrap.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=this._document.activeElement,this.focusTrap.focusInitialElementWhenReady()}}return s.\u0275fac=function(e){return new(e||s)(n.Y36(n.SBq),n.Y36(ae),n.Y36(C.K0))},s.\u0275dir=n.lG2({type:s,selectors:[["","focusTrap",""]],inputs:{enabled:["cdkTrapFocus","enabled"],autoCapture:["cdkTrapFocusAutoCapture","autoCapture"]},exportAs:["focusTrap"],features:[n.TTD]}),s})(),ue=(()=>{class s{static forRoot(){return{ngModule:s,providers:[Qt,dt,at]}}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[C.ez]}),s})();var me=g(2381);const pe=["*"];let Y=(()=>{class s{constructor(){this.hide=()=>{},this.setClass=()=>{}}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"platform"}),s})(),pt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"platform"}),s})();const O={backdrop:!0,keyboard:!0,focus:!0,show:!1,ignoreBackdropClick:!1,class:"",animated:!0,initialState:{},closeInterceptor:void 0},ge=new n.OlP("override-default-config");let fe=(()=>{class s{constructor(e,i,r){this._element=i,this._renderer=r,this.isShown=!1,this.isAnimated=!1,this.isModalHiding=!1,this.clickStartedInContent=!1,this.config=Object.assign({},e)}ngOnInit(){this.isAnimated&&this._renderer.addClass(this._element.nativeElement,"fade"),this._renderer.setStyle(this._element.nativeElement,"display","block"),setTimeout(()=>{this.isShown=!0,this._renderer.addClass(this._element.nativeElement,(0,P.XA)()?"in":"show")},this.isAnimated?150:0),document&&document.body&&(this.bsModalService&&1===this.bsModalService.getModalsCount()&&(this.bsModalService.checkScrollbar(),this.bsModalService.setScrollbar()),this._renderer.addClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y","hidden")),this._element.nativeElement&&this._element.nativeElement.focus()}onClickStarted(e){this.clickStartedInContent=e.target!==this._element.nativeElement}onClickStop(e){this.config.ignoreBackdropClick||"static"===this.config.backdrop||e.target!==this._element.nativeElement||this.clickStartedInContent?this.clickStartedInContent=!1:(this.bsModalService?.setDismissReason("backdrop-click"),this.hide())}onPopState(){this.bsModalService?.setDismissReason("browser-back-navigation-clicked"),this.hide()}onEsc(e){!this.isShown||((27===e.keyCode||"Escape"===e.key)&&e.preventDefault(),this.config.keyboard&&this.level===this.bsModalService?.getModalsCount()&&(this.bsModalService?.setDismissReason("esc"),this.hide()))}ngOnDestroy(){this.isShown&&this._hide()}hide(){if(!this.isModalHiding&&this.isShown){if(this.config.closeInterceptor)return void this.config.closeInterceptor().then(()=>this._hide(),()=>{});this._hide()}}_hide(){this.isModalHiding=!0,this._renderer.removeClass(this._element.nativeElement,(0,P.XA)()?"in":"show"),setTimeout(()=>{this.isShown=!1,document&&document.body&&1===this.bsModalService?.getModalsCount()&&(this._renderer.removeClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y","")),this.bsModalService?.hide(this.config.id),this.isModalHiding=!1},this.isAnimated?300:0)}}return s.\u0275fac=function(e){return new(e||s)(n.Y36(pt),n.Y36(n.SBq),n.Y36(n.Qsj))},s.\u0275cmp=n.Xpm({type:s,selectors:[["modal-container"]],hostAttrs:["role","dialog","tabindex","-1",1,"modal"],hostVars:3,hostBindings:function(e,i){1&e&&n.NdJ("mousedown",function(o){return i.onClickStarted(o)})("click",function(o){return i.onClickStop(o)})("popstate",function(){return i.onPopState()},!1,n.Jf7)("keydown.esc",function(o){return i.onEsc(o)},!1,n.Jf7),2&e&&n.uIk("aria-modal",!0)("aria-labelledby",i.config.ariaLabelledBy)("aria-describedby",i.config.ariaDescribedby)},ngContentSelectors:pe,decls:3,vars:2,consts:[["role","document","focusTrap",""],[1,"modal-content"]],template:function(e,i){1&e&&(n.F$t(),n.TgZ(0,"div",0)(1,"div",1),n.Hsn(2),n.qZA()()),2&e&&n.Tol("modal-dialog"+(i.config.class?" "+i.config.class:""))},dependencies:[ce],encapsulation:2}),s})(),ve=(()=>{class s{constructor(e,i){this._isAnimated=!1,this._isShown=!1,this.element=e,this.renderer=i}get isAnimated(){return this._isAnimated}set isAnimated(e){this._isAnimated=e}get isShown(){return this._isShown}set isShown(e){this._isShown=e,e?this.renderer.addClass(this.element.nativeElement,"in"):this.renderer.removeClass(this.element.nativeElement,"in"),(0,P.XA)()||(e?this.renderer.addClass(this.element.nativeElement,"show"):this.renderer.removeClass(this.element.nativeElement,"show"))}ngOnInit(){this.isAnimated&&(this.renderer.addClass(this.element.nativeElement,"fade"),P.cQ.reflow(this.element.nativeElement)),this.isShown=!0}}return s.\u0275fac=function(e){return new(e||s)(n.Y36(n.SBq),n.Y36(n.Qsj))},s.\u0275cmp=n.Xpm({type:s,selectors:[["bs-modal-backdrop"]],hostAttrs:[1,"modal-backdrop"],decls:0,vars:0,template:function(e,i){},encapsulation:2}),s})(),ye=1,gt=(()=>{class s{constructor(e,i,r){this.clf=i,this.modalDefaultOption=r,this.onShow=new n.vpe,this.onShown=new n.vpe,this.onHide=new n.vpe,this.onHidden=new n.vpe,this.isBodyOverflowing=!1,this.originalBodyPadding=0,this.scrollbarWidth=0,this.modalsCount=0,this.loaders=[],this._backdropLoader=this.clf.createLoader(),this._renderer=e.createRenderer(null,null),this.config=r?Object.assign({},O,r):O}show(e,i){this.modalsCount++,this._createLoaders();const r=i?.id||ye++;return this.config=this.modalDefaultOption?Object.assign({},O,this.modalDefaultOption,i):Object.assign({},O,i),this.config.id=r,this._showBackdrop(),this.lastDismissReason=void 0,this._showModal(e)}hide(e){(1===this.modalsCount||null==e)&&(this._hideBackdrop(),this.resetScrollbar()),this.modalsCount=this.modalsCount>=1&&null!=e?this.modalsCount-1:0,setTimeout(()=>{this._hideModal(e),this.removeLoaders(e)},this.config.animated?150:0)}_showBackdrop(){const e=!0===this.config.backdrop||"static"===this.config.backdrop,i=!this.backdropRef||!this.backdropRef.instance.isShown;1===this.modalsCount&&(this.removeBackdrop(),e&&i&&(this._backdropLoader.attach(ve).to("body").show({isAnimated:this.config.animated}),this.backdropRef=this._backdropLoader._componentRef))}_hideBackdrop(){this.backdropRef&&(this.backdropRef.instance.isShown=!1,setTimeout(()=>this.removeBackdrop(),this.config.animated?150:0))}_showModal(e){const i=this.loaders[this.loaders.length-1];if(this.config&&this.config.providers)for(const h of this.config.providers)i.provide(h);const r=new Y,o=i.provide({provide:pt,useValue:this.config}).provide({provide:Y,useValue:r}).attach(fe).to("body");return r.hide=()=>o.instance?.hide(),r.setClass=h=>{o.instance&&(o.instance.config.class=h)},r.onHidden=new n.vpe,r.onHide=new n.vpe,this.copyEvent(i.onBeforeHide,r.onHide),this.copyEvent(i.onHidden,r.onHidden),o.show({content:e,isAnimated:this.config.animated,initialState:this.config.initialState,bsModalService:this,id:this.config.id}),o.instance&&(o.instance.level=this.getModalsCount(),r.content=i.getInnerComponent(),r.id=o.instance.config?.id),r}_hideModal(e){if(null!=e){const i=this.loaders.findIndex(o=>o.instance?.config.id===e),r=this.loaders[i];r&&r.hide(e)}else this.loaders.forEach(i=>{i.instance&&i.hide(i.instance.config.id)})}getModalsCount(){return this.modalsCount}setDismissReason(e){this.lastDismissReason=e}removeBackdrop(){this._renderer.removeClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y",""),this._backdropLoader.hide(),this.backdropRef=void 0}checkScrollbar(){this.isBodyOverflowing=document.body.clientWidth<window.innerWidth,this.scrollbarWidth=this.getScrollbarWidth()}setScrollbar(){!document||(this.originalBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")||"0",10),this.isBodyOverflowing&&(document.body.style.paddingRight=`${this.originalBodyPadding+this.scrollbarWidth}px`))}resetScrollbar(){document.body.style.paddingRight=`${this.originalBodyPadding}px`}getScrollbarWidth(){const e=this._renderer.createElement("div");this._renderer.addClass(e,"modal-scrollbar-measure"),this._renderer.appendChild(document.body,e);const i=e.offsetWidth-e.clientWidth;return this._renderer.removeChild(document.body,e),i}_createLoaders(){const e=this.clf.createLoader();this.copyEvent(e.onBeforeShow,this.onShow),this.copyEvent(e.onShown,this.onShown),this.copyEvent(e.onBeforeHide,this.onHide),this.copyEvent(e.onHidden,this.onHidden),this.loaders.push(e)}removeLoaders(e){if(null!=e){const i=this.loaders.findIndex(r=>r.instance?.config.id===e);i>=0&&(this.loaders.splice(i,1),this.loaders.forEach((r,o)=>{r.instance&&(r.instance.level=o+1)}))}else this.loaders.splice(0,this.loaders.length)}copyEvent(e,i){e.subscribe(r=>{i.emit(this.lastDismissReason||r)})}}return s.\u0275fac=function(e){return new(e||s)(n.LFG(n.FYo),n.LFG(me.oj),n.LFG(ge,8))},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac,providedIn:"platform"}),s})();ue.forRoot();var be=g(154);let we=(()=>{class s{constructor(e,i){this.bsModalRef=e,this.appService=i,this.message=Jt.D?.ALERT_MESSAGES?.CONFIRM_ALART_MESSAGE}ngOnInit(){}action(e){this.bsModalRef.hide(),this.subject.next(e),this.subject.complete(),this.appService.headerTab.next(e)}}return s.\u0275fac=function(e){return new(e||s)(n.Y36(Y),n.Y36(be.z))},s.\u0275cmp=n.Xpm({type:s,selectors:[["wt-confirm-modal"]],decls:15,vars:1,consts:[[1,"modal-header","modal-block-primary"],[1,"modal-title"],["type","button",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body","clearfix"],[1,"modal-text",2,"color","black"],[1,"modal-footer","d-flex","justify-content-end"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,i){1&e&&(n.TgZ(0,"div",0)(1,"h5",1),n._uU(2,"Confirm"),n.qZA(),n.TgZ(3,"button",2),n.NdJ("click",function(){return i.action(!1)}),n.TgZ(4,"span",3),n._uU(5,"\xd7"),n.qZA()()(),n.TgZ(6,"div",4)(7,"div",5)(8,"strong"),n._uU(9),n.qZA()()(),n.TgZ(10,"div",6)(11,"button",7),n.NdJ("click",function(){return i.action(!0)}),n._uU(12,"Yes"),n.qZA(),n.TgZ(13,"button",8),n.NdJ("click",function(){return i.action(!1)}),n._uU(14,"No"),n.qZA()()),2&e&&(n.xp6(9),n.Oqu(i.message))}}),s})();var Ce=g(5252);let Ie=(()=>{class s{constructor(e,i){this.modalService=e,this._auth=i}canDeactivate(e){const i=this._auth.getUserDetails();if(e.canDeactivate()||!i)return!0;{const r=new Zt.xQ;return this.modalService.show(we,{class:"modal-dialog-centered",backdrop:"static"}).content.subject=r,r.asObservable()}}}return s.\u0275fac=function(e){return new(e||s)(n.LFG(gt),n.LFG(Ce.e))},s.\u0275prov=n.Yz7({token:s,factory:s.\u0275fac}),s})();var Se=g(6401);let $e=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({providers:[Ie,gt],imports:[C.ez,wt,Ct.m,It.Cl,St._t,xt,J.u5,J.UX,Tt.Ns.forRoot({echarts:Rt}),jt,Vt,Se.i]}),s})()}}]);