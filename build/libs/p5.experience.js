(function(){function a(){for(let a in m)m[a][0]()}function b(){let a=!0;mouseIsPressed&&(c(),a&&(setTimeout(function(){!1===mouseIsPressed&&(d(),clicked=!0)},15),a=!1)),e()}function c(){for(let a in n)n[a][0]("press")}function d(){for(let a in n)n[a][0]("click")}function e(){for(let a in n)n[a][0]("hover")}function f(a,b,c,d,e,f){if(e>=a&&e<=a+c&&f>=b&&f<=b+d)return!0}function g(a,b,c,d,e,f,g,h){let i=Math.abs((a*(d-f)+c*(f-b)+e*(b-d))/2),j=Math.abs((g*(b-d)+a*(d-h)+c*(h-b))/2),k=Math.abs((g*(d-f)+c*(f-h)+e*(h-d))/2),l=Math.abs((g*(b-f)+a*(f-h)+e*(h-b))/2);return!(i!==j+k+l)}function h(a,b,c,d,e){let f=Math.sqrt(Math.pow(a-d,2)+Math.pow(b-e,2));return!!(f<=c/2)}function i(a,b,c,d,e,f){c/=2,d/=2;let g=Math.pow(e-a,2)/Math.pow(c,2)+Math.pow(f-b,2)/Math.pow(d,2);return!!(1>=g)}function j(){let a=0;return 0!=l.length&&(a=l.length),l.push(a),a}function k(e,a,b,c){let d;return void 0===a&&void 0===b&&void 0===c?d=e:void 0===b&&void 0===c?"string"==typeof e?console.log("No valid color-input"):d=[e,a]:void 0===c?"string"==typeof e?console.log("No valid color-input"):d=[e,a,b]:d=[e,a,b,c],d}let l=[],m=[],n=[],o="#3498DB",p=!1,q="#154464",r=1,s=!1,t="corner",u="center";p5.prototype.uxRect=function(f,a,b,c,d){return new v("rect",f,a,b,c,d)},p5.prototype.uxSquare=function(e,a,b,c){return new v("square",e,a,b,c)},p5.prototype.uxTriangle=function(g,a,b,c,d,e){return new v("triangle",g,a,b,c,d,e)},p5.prototype.uxCircle=function(d,a,b){return new v("circle",d,a,b)},p5.prototype.uxEllipse=function(e,a,b,c){return new v("ellipse",e,a,b,c)},p5.prototype.uxFill=function(e,a,b,c){o=k(e,a,b,c),p=!1},p5.prototype.uxNoFill=function(){p=!0},p5.prototype.uxStroke=function(e,a,b,c){q=k(e,a,b,c),s=!1},p5.prototype.uxStrokeWeight=function(a){r=a},p5.prototype.uxNoStroke=function(){s=!0},p5.prototype.uxRectMode=function(b){t="corner"===b?"corner":"center"===b?"center":"corner"},p5.prototype.uxEllipseMode=function(b){u="corner"===b?"corner":"center"===b?"center":"corner"};class v{constructor(k,a,b,c,d,e,l){switch(this.UxID=j(),this.kindOfRender="intern",this.shape=k,this.uxFill=o,this.uxStrokeColor=q,this.uxStrokeWeight=r,this.uxNoStrokeState=s,this.uxNoFillState=p,this.uxRectModeState=t,this.uxEllipseModeState=u,this.shadow=!1,this.shadowRender=()=>{},this.shape){case"rect":this.x=a,this.y=b,this.w=c,this.h=d,this.cor=e,this.renderShape=()=>{this.shadow&&this.shadowRender(),!1===this.uxNoStrokeState?stroke(this.uxStrokeColor):noStroke(),strokeWeight(this.uxStrokeWeight),!1===this.uxNoFillState?fill(this.uxFill):noFill(),"corner"===this.uxRectModeState?rectMode(CORNER):"center"===this.uxRectModeState&&rectMode(CENTER),rect(this.x,this.y,this.w,this.h,this.cor)},this.inputObject=a=>{f(this.x,this.y,this.w,this.h,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};break;case"square":this.x=a,this.y=b,this.s=c,this.cor=d,this.renderShape=()=>{this.shadow&&this.shadowRender(),!1===this.uxNoStrokeState?stroke(this.uxStrokeColor):noStroke(),strokeWeight(this.uxStrokeWeight),!1===this.uxNoFillState?fill(this.uxFill):noFill(),"corner"===this.uxRectModeState?rectMode(CORNER):"center"===this.uxRectModeState&&rectMode(CENTER),square(this.x,this.y,this.s,this.cor)},this.inputObject=a=>{f(this.x,this.y,this.s,this.s,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};break;case"triangle":this.x1=a,this.y1=b,this.x2=c,this.y2=d,this.x3=e,this.y3=l,this.renderShape=()=>{this.shadow&&this.shadowRender(),!1===this.uxNoStrokeState?stroke(this.uxStrokeColor):noStroke(),strokeWeight(this.uxStrokeWeight),!1===this.uxNoFillState?fill(this.uxFill):noFill(),triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3)},this.inputObject=a=>{g(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};break;case"circle":this.x=a,this.y=b,this.d=c,this.renderShape=()=>{this.shadow&&this.shadowRender(),!1===this.uxNoStrokeState?stroke(this.uxStrokeColor):noStroke(),strokeWeight(this.uxStrokeWeight),!1===this.uxNoFillState?fill(this.uxFill):noFill(),"corner"===this.uxEllipseModeState?ellipseMode(CORNER):"center"===this.uxEllipseModeState&&ellipseMode(CENTER),circle(this.x,this.y,this.d)},this.inputObject=a=>{h(this.x,this.y,this.d,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};break;case"ellipse":this.x=a,this.y=b,this.w=c,this.h=d,this.renderShape=()=>{this.shadow&&this.shadowRender(),!1===this.uxNoStrokeState?stroke(this.uxStrokeColor):noStroke(),strokeWeight(this.uxStrokeWeight),!1===this.uxNoFillState?fill(this.uxFill):noFill(),"corner"===this.uxEllipseModeState?ellipseMode(CORNER):"center"===this.uxEllipseModeState&&ellipseMode(CENTER),ellipse(this.x,this.y,this.w,this.h)},this.inputObject=a=>{i(this.x,this.y,this.w,this.h,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};break;case"none":break;default:this.renderShape=()=>{this.x=a,this.y=b,this.w=c,this.h=d},this.inputObject=a=>{f(this.x,this.y,this.w,this.h,mouseX,mouseY)&&a===this.kindOfInput&&this.callback()};}m.push([this.renderShape,this.UxID]),"none"!=this.kindOfInput&&n.push([this.inputObject,this.UxID])}uxEvent(a,b){this.kindOfInput=a,this.callback=b}uxShadow(a,b,c,d=150){if(this.shadow=!0,this.offX=a,this.offY=b,this.wBlur=c,this.shadowColor=d,50<this.wBlur)return void console.log("Blur-Max for shadows is 50");switch(this.shape){case"rect":this.shadowRender=()=>{noStroke(),fill(this.shadowColor),rectMode(CORNER),"center"===this.uxRectModeState?rect(this.x+this.wBlur+this.offX-this.w/2,this.y+this.wBlur+this.offY-this.h/2,this.w-2*this.wBlur,this.h-2*this.wBlur,this.cor):rect(this.x+this.wBlur+this.offX,this.y+this.wBlur+this.offY,this.w-2*this.wBlur,this.h-2*this.wBlur,this.cor);const a=Math.round(1.2*this.wBlur);for(let b=0;b<a;b++)noFill(),strokeWeight(3),stroke(this.shadowColor,map(b,0,a,255,0)),"center"===this.uxRectModeState?rect(this.x+this.offX+this.wBlur-b-this.w/2,this.y+this.offY+this.wBlur-b-this.h/2,this.w-2*this.wBlur+2*b-1,this.h-2*this.wBlur+2*b-1,this.cor):rect(this.x+this.offX+this.wBlur-b,this.y+this.offY+this.wBlur-b,this.w-2*this.wBlur+2*b-1,this.h-2*this.wBlur+2*b-1,this.cor)};break;case"square":this.shadowRender=()=>{noStroke(),fill(this.shadowColor),rectMode(CORNER),"center"===this.uxRectModeState?square(this.x+this.wBlur+this.offX-this.s/2,this.y+this.wBlur+this.offY-this.s/2,this.s-2*this.wBlur,this.cor):square(this.x+this.wBlur+this.offX,this.y+this.wBlur+this.offY,this.s-2*this.wBlur,this.cor);const a=Math.round(1.2*this.wBlur);for(let b=0;b<a;b++)noFill(),strokeWeight(3),stroke(this.shadowColor,map(b,0,a,255,0)),"center"===this.uxRectModeState?square(this.x+this.offX+this.wBlur-b-this.s/2,this.y+this.offY+this.wBlur-b-this.s/2,this.s-2*this.wBlur+2*b-1,this.cor):square(this.x+this.offX+this.wBlur-b,this.y+this.offY+this.wBlur-b,this.s-2*this.wBlur+2*b-1,this.cor)};break;case"triangle":this.shadowRender=()=>{noStroke(),fill(this.shadowColor);let a=(this.x1+this.x2+this.x3)/3,b=(this.y1+this.y2+this.y3)/3,c=map(this.wBlur,0,50,this.x1,a),d=map(this.wBlur,0,50,this.y1,b),e=map(this.wBlur,0,50,this.x2,a),f=map(this.wBlur,0,50,this.y2,b),g=map(this.wBlur,0,50,this.x3,a),h=map(this.wBlur,0,50,this.y3,b);triangle(c+this.offX,d+this.offY,e+this.offX,f+this.offY,g+this.offX,h+this.offY);const j=Math.round(1.2*this.wBlur);for(let c=0;c<j;c++)noFill(),strokeWeight(3),stroke(this.shadowColor,map(c,0,j,255,0)),triangle(map(this.wBlur-c,50,0,a,this.x1)+this.offX,map(this.wBlur-c,50,0,b,this.y1)+this.offY,map(this.wBlur-c,50,0,a,this.x2)+this.offX,map(this.wBlur-c,50,0,b,this.y2)+this.offY,map(this.wBlur-c,50,0,a,this.x3)+this.offX,map(this.wBlur-c,50,0,b,this.y3)+this.offY)};break;case"ellipse":this.shadowRender=()=>{noStroke(),fill(this.shadowColor),ellipseMode(CENTER),"corner"===this.uxEllipseModeState?ellipse(this.x+this.offX+this.w/2,this.y+this.offY+this.h/2,this.w-2*this.wBlur,this.h-2*this.wBlur):ellipse(this.x+this.offX,this.y+this.offY,this.w-2*this.wBlur,this.h-2*this.wBlur),noFill();const a=Math.round(1.2*this.wBlur);for(let b=0;b<a;b++)noFill(),strokeWeight(3),stroke(this.shadowColor,map(b,0,a,255,0)),"corner"===this.uxEllipseModeState?ellipse(this.x+this.offX+this.w/2,this.y+this.offY+this.h/2,this.w-2*this.wBlur+2*b-1,this.h-2*this.wBlur+2*b-1):ellipse(this.x+this.offX,this.y+this.offY,this.w-2*this.wBlur+2*b-1,this.h-2*this.wBlur+2*b-1)};break;case"circle":this.shadowRender=()=>{noStroke(),fill(this.shadowColor),ellipseMode(CENTER),"corner"===this.uxEllipseModeState?ellipse(this.x+this.offX+this.d/2,this.y+this.offY+this.d/2,this.d-2*this.wBlur):ellipse(this.x+this.offX,this.y+this.offY,this.d-2*this.wBlur),noFill();const a=Math.round(1.2*this.wBlur);for(let b=0;b<a;b++)noFill(),strokeWeight(3),stroke(this.shadowColor,map(b,0,a,255,0)),"corner"===this.uxEllipseModeState?ellipse(this.x+this.offX+this.d/2,this.y+this.offY+this.d/2,this.d-2*this.wBlur+2*b-1):ellipse(this.x+this.offX,this.y+this.offY,this.d-2*this.wBlur+2*b-1)};}}uxRender(){if("intern"===this.kindOfRender){for(let a in m)m[a][1]===this.UxID&&m.splice(a,1);this.kindOfRender="manual"}this.renderShape()}}p5.prototype.runApp=function(){a(),b()},p5.prototype.registerMethod("post",p5.prototype.runApp)})();