!function(t){var e={};function i(a){if(e[a])return e[a].exports;var s=e[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class a{get container(){return this._container}set dual(t){this._dual=t}get dual(){return this._dual}get in_control(){return this._in_control}get temperature(){return{low:this._low,high:this._high,target:this._target}}get ambient(){return this._ambient}set temperature(t){this._ambient=t.ambient,this._low=t.low,this._high=t.high,this._target=t.target,this._low&&this._high&&(this.dual=!0)}constructor(t){this._config=t,this._ticks=[],this._controls=[],this._dual=!1,this._container=document.createElement("div"),this._container.className="dial_container";const e=document.createElement("style");e.textContent=this._renderStyle(),t.title&&this._container.appendChild(this._buildTitle(t.title)),this._container.appendChild(e);const i=this._buildCore(t.diameter);i.appendChild(this._buildDial(t.radius)),i.appendChild(this._buildTicks(t.num_ticks)),i.appendChild(this._buildRing(t.radius)),i.appendChild(this._buildLeaf(t.radius)),i.appendChild(this._buildThermoIcon(t.radius)),i.appendChild(this._buildDialSlot(1)),i.appendChild(this._buildDialSlot(2)),i.appendChild(this._buildDialSlot(3)),i.appendChild(this._buildText(t.radius,"ambient",0)),i.appendChild(this._buildText(t.radius,"target",0)),i.appendChild(this._buildText(t.radius,"low",-t.radius/2.5)),i.appendChild(this._buildText(t.radius,"high",t.radius/3)),i.appendChild(this._buildChevrons(t.radius,0,"low",.7,-t.radius/2.5)),i.appendChild(this._buildChevrons(t.radius,0,"high",.7,t.radius/3)),i.appendChild(this._buildChevrons(t.radius,0,"target",1,0)),i.appendChild(this._buildChevrons(t.radius,180,"low",.7,-t.radius/2.5)),i.appendChild(this._buildChevrons(t.radius,180,"high",.7,t.radius/3)),i.appendChild(this._buildChevrons(t.radius,180,"target",1,0)),this._container.appendChild(i),this._root=i,this._buildControls(t.radius),this._servicesControls=this._buildSettingsIcon(t.radius),this._root.appendChild(this._servicesControls),this._root.addEventListener("click",()=>this._enableControls()),this._servicesControls.addEventListener("click",()=>this._serviceControlClick())}updateState(t){const e=this._config,i=t.away||!1;let a,r,n;this.min_value=t.min_value,this.max_value=t.max_value,this.hvac_state=t.hvac_state,this.temperature={low:t.target_temperature_low,high:t.target_temperature_high,target:t.target_temperature,ambient:t.ambient_temperature},this._updateClass("has_dual",this.dual);const l=[],o=s.restrictToRange(Math.round((this.ambient-this.min_value)/(this.max_value-this.min_value)*e.num_ticks),0,e.num_ticks-1),h=s.restrictToRange(Math.round((this._target-this.min_value)/(this.max_value-this.min_value)*e.num_ticks),0,e.num_ticks-1),_=s.restrictToRange(Math.round((this._high-this.min_value)/(this.max_value-this.min_value)*e.num_ticks),0,e.num_ticks-1),c=s.restrictToRange(Math.round((this._low-this.min_value)/(this.max_value-this.min_value)*e.num_ticks),0,e.num_ticks-1);if(this.dual)switch(a=[this._low,this._high,this.ambient].sort(),this._updateTemperatureSlot(null,0,"temperature_slot_1"),this._updateTemperatureSlot(null,0,"temperature_slot_2"),this._updateTemperatureSlot(null,0,"temperature_slot_3"),this.hvac_state){case"cool":_<o&&(r=_,n=o,this._updateTemperatureSlot(this.ambient,8,"temperature_slot_3"),this._updateTemperatureSlot(this._high,-8,"temperature_slot_2"));break;case"heat":c>o&&(r=o,n=c,this._updateTemperatureSlot(this.ambient,-8,"temperature_slot_1"),this._updateTemperatureSlot(this._low,8,"temperature_slot_2"));break;case"off":_<o&&(r=_,n=o,this._updateTemperatureSlot(this.ambient,8,"temperature_slot_3"),this._updateTemperatureSlot(this._high,-8,"temperature_slot_2")),c>o&&(r=o,n=c,this._updateTemperatureSlot(this.ambient,-8,"temperature_slot_1"),this._updateTemperatureSlot(this._low,8,"temperature_slot_2"))}else switch(a=[this._target,this.ambient].sort(),this._updateTemperatureSlot(a[0],-8,"temperature_slot_1"),this._updateTemperatureSlot(a[1],8,"temperature_slot_2"),this.hvac_state){case"cool":h<o&&(r=h,n=o);break;case"heat":h>o&&(r=o,n=h)}a.forEach(t=>l.push(s.restrictToRange(Math.round((t-this.min_value)/(this.max_value-this.min_value)*e.num_ticks),0,e.num_ticks-1))),this._updateTicks(r,n,l),this._updateClass("has-leaf",i),this._updateHvacState(),this._updateText("ambient",this.ambient),this._updateEdit(!1),this._updateClass("has-thermo",!1)}_serviceControlClick(){console.log("Switching views")}_temperatureControlClicked(t){const e=this._config;let i;if(this._root.querySelectorAll("path.dial__chevron").forEach(t=>s.setClass(t,"pressed",!1)),this.in_control){if(this.dual){switch(t){case 0:i=this._root.querySelectorAll("path.dial__chevron--low")[1],this._low=this._low+e.step,this._low+e.idle_zone>=this._high&&(this._low=this._high-e.idle_zone);break;case 1:i=this._root.querySelectorAll("path.dial__chevron--high")[1],this._high=this._high+e.step,this._high>this.max_value&&(this._high=this.max_value);break;case 2:i=this._root.querySelectorAll("path.dial__chevron--high")[0],this._high=this._high-e.step,this._high-e.idle_zone<=this._low&&(this._high=this._low+e.idle_zone);break;case 3:i=this._root.querySelectorAll("path.dial__chevron--low")[0],this._low=this._low-e.step,this._low<this.min_value&&(this._low=this.min_value)}s.setClass(i,"pressed",!0),setTimeout(()=>s.setClass(i,"pressed",!1),200),e.highlight_tap&&s.setClass(this._controls[t],"control-visible",!0)}else t<2?(i=this._root.querySelectorAll("path.dial__chevron--target")[1],this._target=this._target+e.step,this._target>this.max_value&&(this._target=this.max_value),e.highlight_tap&&(s.setClass(this._controls[0],"control-visible",!0),s.setClass(this._controls[1],"control-visible",!0))):(i=this._root.querySelectorAll("path.dial__chevron--target")[0],this._target=this._target-e.step,this._target<this.min_value&&(this._target=this.min_value),e.highlight_tap&&(s.setClass(this._controls[2],"control-visible",!0),s.setClass(this._controls[3],"control-visible",!0))),s.setClass(i,"pressed",!0),setTimeout(()=>s.setClass(i,"pressed",!1),200);e.highlight_tap&&setTimeout(()=>{s.setClass(this._controls[0],"control-visible",!1),s.setClass(this._controls[1],"control-visible",!1),s.setClass(this._controls[2],"control-visible",!1),s.setClass(this._controls[3],"control-visible",!1)},200)}else this._enableControls()}_updateEdit(t){s.setClass(this._root,"dial--edit",t)}_enableControls(){const t=this._config;this._in_control=!0,this._updateClass("in_control",this.in_control),this._timeoutHandler&&clearTimeout(this._timeoutHandler),this._updateEdit(!0),this._updateClass("has-thermo",!0),this._updateText("target",this.temperature.target),this._updateText("low",this.temperature.low),this._updateText("high",this.temperature.high),this._timeoutHandler=setTimeout(()=>{this._updateText("ambient",this.ambient),this._updateEdit(!1),this._updateClass("has-thermo",!1),this._in_control=!1,this._updateClass("in_control",this.in_control),t.control()},1e3*t.pending)}_updateClass(t,e){s.setClass(this._root,t,e),s.setClass(this.container,t,e)}_updateText(t,e){const i=this._root.querySelector(`#${t}`).querySelectorAll("tspan"),a=Math.floor(e);e&&(i[0].textContent=a,i[1].textContent=e%1!=0?"5a":"a"),this.in_control&&"target"==t&&this.dual&&(i[0].textContent="·")}_updateTemperatureSlot(t,e,i){const a=this._config,r=this._root.querySelector(`#${i}`);r.textContent=null!=t?s.superscript(t):"";const n=s.restrictToRange(t,this.min_value,this.max_value),l=[a.radius,a.ticks_outer_radius-(a.ticks_outer_radius-a.ticks_inner_radius)/2];let o=a.tick_degrees*(n-this.min_value)/(this.max_value-this.min_value)-a.offset_degrees+e;const h=s.rotatePoint(l,o,[a.radius,a.radius]);s.attributes(r,{x:h[0],y:h[1]})}_updateHvacState(){this._root.classList.forEach(t=>{-1!=t.indexOf("dial--state--")&&this._root.classList.remove(t)}),this._root.classList.add("dial--state--"+this.hvac_state)}_updateTicks(t,e,i){const a=this._config,r=[[a.radius-1,a.ticks_outer_radius],[a.radius+1,a.ticks_outer_radius],[a.radius+1,a.ticks_inner_radius],[a.radius-1,a.ticks_inner_radius]],n=[[a.radius-1.5,a.ticks_outer_radius],[a.radius+1.5,a.ticks_outer_radius],[a.radius+1.5,a.ticks_inner_radius+20],[a.radius-1.5,a.ticks_inner_radius+20]];this._ticks.forEach((l,o)=>{let h=!1,_=o>=t&&o<=e?"active":"";i.forEach(t=>h=h||o==t),h&&(_+=" large");const c=a.tick_degrees/a.num_ticks;s.attributes(l,{d:s.pointsToPath(s.rotatePoints(h?n:r,o*c-a.offset_degrees,[a.radius,a.radius])),class:_})})}_buildCore(t){return s.createSVGElement("svg",{width:"100%",height:"100%",viewBox:"0 0 "+t+" "+t,class:"dial"})}_buildTitle(t){const e=document.createElement("div");return e.className="dial_title",e.textContent=t,e}_buildDial(t){return s.createSVGElement("circle",{cx:t,cy:t,r:t,class:"dial__shape"})}_buildRing(t){return s.createSVGElement("path",{d:s.donutPath(t,t,t-4,t-8),class:"dial__editableIndicator"})}_buildTicks(t){const e=s.createSVGElement("g",{class:"dial__ticks"});for(let i=0;i<t;i++){const t=s.createSVGElement("path",{});this._ticks.push(t),e.appendChild(t)}return e}_buildLeaf(t){const e=t/5/100,i=["M",3,84,"c",24,17,51,18,73,-6,"C",100,52,100,22,100,4,"c",-13,15,-37,9,-70,19,"C",4,32,0,63,0,76,"c",6,-7,18,-17,33,-23,24,-9,34,-9,48,-20,-9,10,-20,16,-43,24,"C",22,63,8,78,3,84,"z"].map(t=>isNaN(t)?t:t*e).join(" "),a=[t-100*e*.5,1.5*t];return s.createSVGElement("path",{class:"dial__ico__leaf",d:i,transform:"translate("+a[0]+","+a[1]+")"})}_buildChevrons(t,e,i,a,r){const n=this._config,l=e>0?-1:1,o=n.chevron_size,h=["M",0,0,"L",o/2,.3*o,"L",o,0].map(t=>isNaN(t)?t:t*a).join(" "),_=[t-o/2*a*l+r,t+70*a*1.1*l];return s.createSVGElement("path",{class:`dial__chevron dial__chevron--${i}`,d:h,transform:`translate(${_[0]},${_[1]}) rotate(${e})`})}_buildThermoIcon(t){const e=t/3/100,i="M 37.999 38.261 V 7 c 0 -3.859 -3.141 -7 -7 -7 s -7 3.141 -7 7 v 31.261 c -3.545 2.547 -5.421 6.769 -4.919 11.151 c 0.629 5.482 5.066 9.903 10.551 10.512 c 0.447 0.05 0.895 0.074 1.339 0.074 c 2.956 0 5.824 -1.08 8.03 -3.055 c 2.542 -2.275 3.999 -5.535 3.999 -8.943 C 42.999 44.118 41.14 40.518 37.999 38.261 Z M 37.666 55.453 c -2.146 1.921 -4.929 2.8 -7.814 2.482 c -4.566 -0.506 -8.261 -4.187 -8.785 -8.752 c -0.436 -3.808 1.28 -7.471 4.479 -9.56 l 0.453 -0.296 V 38 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 v -3 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 v -3 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 v -3 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 v -3 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 v -3 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -1 V 8 h 1 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 26.1 c 0.465 -2.279 2.484 -4 4.899 -4 c 2.757 0 5 2.243 5 5 v 1 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 3 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 3 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 3 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 3 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 3 h -1 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1 v 4.329 l 0.453 0.296 c 2.848 1.857 4.547 4.988 4.547 8.375 C 40.999 50.841 39.784 53.557 37.666 55.453 Z".split(" ").map(t=>isNaN(t)?t:t*e).join(" "),a=[t-100*e*.3,1.65*t];return s.createSVGElement("path",{class:"dial__ico__thermo",d:i,transform:"translate("+a[0]+","+a[1]+")"})}_buildDialSlot(t){return s.createSVGElement("text",{class:"dial__lbl dial__lbl--ring",id:`temperature_slot_${t}`})}_buildText(t,e,i){const a=s.createSVGElement("text",{x:t+i,y:t,class:`dial__lbl dial__lbl--${e}`,id:e}),r=s.createSVGElement("tspan",{});"target"!=e&&"ambient"!=e||(i+=20);const n=s.createSVGElement("tspan",{x:t+t/3.1+i,y:t-t/6,class:`dial__lbl--super--${e}`});return a.appendChild(r),a.appendChild(n),a}_buildControls(t){let e=270;for(let i=0;i<4;i++){const a=90,r=s.anglesToSectors(t,e,a),n="M"+r.L+","+r.L+" L"+r.L+",0 A"+r.L+","+r.L+" 1 0,1 "+r.X+", "+r.Y+" z",l=s.createSVGElement("path",{class:"dial__temperatureControl",fill:"blue",d:n,transform:"rotate("+r.R+", "+r.L+", "+r.L+")"});this._controls.push(l),l.addEventListener("click",()=>this._temperatureControlClicked(i)),this._root.appendChild(l),e+=a}}_buildSettingsIcon(t){const e=Math.ceil(t/100),i="M 3 17 V 19 H 9 V 17 H 3 M 3 5 V 7 H 13 V 5 H 3 M 13 21 V 19 H 21 V 17 H 13 V 15 H 11 V 21 H 13 M 7 9 V 11 H 3 V 13 H 7 V 15 H 9 V 9 H 7 M 21 13 V 11 H 11 V 13 H 21 M 15 9 H 17 V 7 H 21 V 5 H 17 V 3 H 15 V 9 Z".split(" ").map(t=>isNaN(t)?t:t*e).join(" ");return s.createSVGElement("path",{class:"dial__ico__settings",d:i,transform:`translate(${2*t-30*e}, ${5*e})`})}_renderStyle(){return"\n      .dial_container {\n        padding: 8px;\n      }\n      .dial_title {\n        font-size: 20px;\n        padding: 8px;\n        text-align: center;\n        color: var(--secondary-text-color);\n      }\n      .dial {\n        user-select: none;\n      \n        --thermostat-off-fill: #222;\n        --thermostat-path-color: rgba(255, 255, 255, 0.3);\n        --thermostat-heat-fill: #E36304;\n        --thermostat-cool-fill: #007AF1;\n        --thermostat-path-active-color: rgba(255, 255, 255, 0.8);\n        --thermostat-path-active-color-large: rgba(255, 255, 255, 1);\n        --thermostat-text-color: white;\n      }\n      .dial.has-thermo .dial__ico__leaf {\n        visibility: hidden;\n      }\n      .dial .dial__shape {\n        transition: fill 0.5s;\n      }\n      .dial__ico__leaf {\n        fill: #13EB13;\n        opacity: 0;\n        transition: opacity 0.5s;\n        pointer-events: none;\n      }\n      .dial__ico__settings {\n        fill: var(--thermostat-off-fill);\n        opacity: 0;\n        transition: opacity 0.5s;\n      }\n      .dial.has-leaf .dial__ico__leaf {\n        display: block;\n        opacity: 1;\n        pointer-events: initial;\n      }\n      .dial__ico__thermo {\n        fill: var(--thermostat-path-active-color);\n        opacity: 0;\n        transition: opacity 0.5s;\n        pointer-events: none;\n      }\n      .dial.has-thermo .dial__ico__thermo {\n        display: block;\n        opacity: 1;\n        pointer-events: initial;\n      }\n      .dial__editableIndicator {\n        fill: white;\n        fill-rule: evenodd;\n        opacity: 0;\n        transition: opacity 0.5s;\n      }\n      .dial__temperatureControl {\n        fill: white;\n        opacity: 0;\n        transition: opacity 0.2s;\n      }\n      .dial__temperatureControl.control-visible {\n        opacity: 0.2;\n      }\n      .dial--edit .dial__editableIndicator {\n        opacity: 1;\n      }\n      .dial--state--off .dial__shape {\n        fill: var(--thermostat-off-fill);\n      }\n      .dial--state--heat .dial__shape {\n        fill: var(--thermostat-heat-fill);\n      }\n      .dial--state--cool .dial__shape {\n        fill: var(--thermostat-cool-fill);\n      }\n      .dial__ticks path {\n        fill: var(--thermostat-path-color);\n      }\n      .dial__ticks path.active {\n        fill: var(--thermostat-path-active-color);\n      }\n      .dial__ticks path.active.large {\n        fill: var(--thermostat-path-active-color-large);\n      }\n      .dial text, .dial text tspan {\n        fill: var(--thermostat-text-color);\n        text-anchor: middle;\n        font-family: Helvetica, sans-serif;\n        alignment-baseline: central;\n      }\n      .dial__lbl--target {\n        font-size: 120px;\n        font-weight: bold;\n        visibility: hidden;\n      }\n      .dial__lbl--low, .dial__lbl--high {\n        font-size: 90px;\n        font-weight: bold;\n        visibility: hidden;\n      }\n      .dial.in_control .dial__lbl--target {\n        visibility: visible;\n      }\n      .dial.in_control .dial__lbl--low {\n        visibility: visible;\n      }\n      .dial.in_control .dial__lbl--high {\n        visibility: visible;\n      }\n      .in_control .dial__ico__settings {\n        opacity: 1;\n      }\n      .dial__lbl--ambient {\n        font-size: 120px;\n        font-weight: bold;\n        visibility: visible;\n      }\n      .dial.in_control.has_dual .dial__chevron--low,\n      .dial.in_control.has_dual .dial__chevron--high {\n        visibility: visible;\n      }\n      .dial.in_control .dial__chevron--target {\n        visibility: visible;\n      }\n      .dial.in_control.has_dual .dial__chevron--target {\n        visibility: hidden;\n      }\n      .dial .dial__chevron {\n        visibility: hidden;\n        fill: none;\n        stroke: var(--thermostat-text-color);\n        stroke-width: 4px;\n        opacity: 0.3;\n      }\n      .dial .dial__chevron.pressed {\n        opacity: 1;\n      }\n      .dial.in_control .dial__lbl--ambient {\n        visibility: hidden;\n      }\n      .dial__lbl--super--ambient, .dial__lbl--super--target {\n        font-size: 40px;\n        font-weight: bold;\n      }\n      .dial__lbl--super--high, .dial__lbl--super--low {\n        font-size: 30px;\n        font-weight: bold;\n      }\n      .dial__lbl--ring {\n        font-size: 22px;\n        font-weight: bold;\n      }"}}class s{static createSVGElement(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg",t);return this.attributes(i,e),i}static attributes(t,e){for(let i in e)t.setAttribute(i,e[i])}static rotatePoint(t,e,i){const a=e*Math.PI/180,s=t[0]-i[0],r=t[1]-i[1];return[s*Math.cos(a)-r*Math.sin(a)+i[0],s*Math.sin(a)+r*Math.cos(a)+i[1]]}static rotatePoints(t,e,i){return t.map(t=>this.rotatePoint(t,e,i))}static pointsToPath(t){return t.map((t,e)=>(e>0?"L":"M")+t[0]+" "+t[1]).join(" ")+"Z"}static circleToPath(t,e,i){return["M",t,",",e,"m",0-i,",",0,"a",i,",",i,0,1,",",0,2*i,",",0,"a",i,",",i,0,1,",",0,0-2*i,",",0,"z"].join(" ").replace(/\s,\s/g,",")}static donutPath(t,e,i,a){return this.circleToPath(t,e,i)+" "+this.circleToPath(t,e,a)}static superscript(t){return`${Math.floor(t)}${t%1!=0?"⁵":""}`}static restrictToRange(t,e,i){return t<e?e:t>i?i:t}static setClass(t,e,i){t.classList[i?"add":"remove"](e)}static anglesToSectors(t,e,i){let a=0,s=0,r=0,n=0,l=0;const o=i>180?360-i:i;return a=o*Math.PI/180,s=Math.sqrt(2*t*t-2*t*t*Math.cos(a)),r=o<=90?t*Math.sin(a):t*Math.sin((180-o)*Math.PI/180),l=Math.sqrt(s*s-r*r),{L:t,X:n=i<=180?t+r:t-r,Y:l,R:e}}}customElements.define("thermostat-card",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set hass(t){const e=this._config,i=t.states[e.entity];let a;a=e.hvac.attribute?i.attributes[e.hvac.attribute]:i.state;const s={min_value:i.attributes.min_temp,max_value:i.attributes.max_temp,ambient_temperature:i.attributes.current_temperature,target_temperature:i.attributes.temperature,target_temperature_low:i.attributes.target_temp_low,target_temperature_high:i.attributes.target_temp_high,hvac_state:e.hvac.states[a]||"off",away:"on"==i.attributes.away_mode};this._saved_state&&this._saved_state.min_value==s.min_value&&this._saved_state.max_value==s.max_value&&this._saved_state.ambient_temperature==s.ambient_temperature&&this._saved_state.target_temperature==s.target_temperature&&this._saved_state.target_temperature_low==s.target_temperature_low&&this._saved_state.target_temperature_high==s.target_temperature_high&&this._saved_state.hvac_state==s.hvac_state&&this._saved_state.away==s.away||(this._saved_state=s,this.thermostat.updateState(s)),this._hass=t}_controlSetPoints(){this.thermostat.dual?this.thermostat.temperature.high==this._saved_state.target_temperature_high&&this.thermostat.temperature.low==this._saved_state.target_temperature_low||this._hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_high:this.thermostat.temperature.high,target_temp_low:this.thermostat.temperature.low}):this.thermostat.temperature.target!=this._saved_state.target_temperature&&this._hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:this.thermostat.temperature.target})}setConfig(t){if(!t.entity&&"climate"===t.entity.split(".")[0])throw new Error("Please define an entity");const e=this.shadowRoot;e.lastChild&&e.removeChild(e.lastChild),this._controlsBuilt=!1;const i=Object.assign({},t);if(i.hvac=Object.assign({},t.hvac),i.diameter||(i.diameter=400),i.pending||(i.pending=3),i.idle_zone||(i.idle_zone=2),i.step||(i.step=.5),i.highlight_tap||(i.highlight_tap=!1),i.no_card||(i.no_card=!1),i.chevron_size||(i.chevron_size=50),i.num_ticks||(i.num_ticks=150),i.tick_degrees||(i.tick_degrees=300),i.hvac.states||(i.hvac.states={off:"off",heat:"heat",cool:"cool"}),i.radius=i.diameter/2,i.ticks_outer_radius=i.diameter/30,i.ticks_inner_radius=i.diameter/8,i.offset_degrees=180-(360-i.tick_degrees)/2,i.control=this._controlSetPoints.bind(this),this.thermostat=new a(i),this._config=i,!0===i.no_card)e.appendChild(this.thermostat.container);else{const t=document.createElement("ha-card");t.style.padding="5%",t.appendChild(this.thermostat.container),e.appendChild(t)}}_computeIcon(t){switch(t){case"operation_mode":return"mdi:sync";case"swing_mode":return"mdi:cursor-move";case"fan_mode":return"mdi:fan"}return"mdi:settings"}_buildControls(t){this._controlsBuilt=!0;const e=this._config,i=this._hass.states[e.entity];e.services&&e.services.forEach(e=>{let a="";console.log(e.name),a+=`<ha-icon icon='${this._computeIcon(e.name)}' name='${e.name}'></ha-icon>`,i.attributes[e.values].forEach(t=>{a+=`${t},`}),a+="<br/>",t.innerHTML+=a})}})}]);