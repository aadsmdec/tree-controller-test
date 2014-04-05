var Montage=require("montage").Montage,FlowBezierSpline=exports.FlowBezierSpline=Montage.specialize({constructor:{value:function FlowBezierSpline(){this._knots=[],this._densities=[]}},knots:{get:function(){return this._knots},set:function(e){this._knots=e}},previousHandlers:{get:function(){return this._previousHandlers||(this._previousHandlers=[]),this._previousHandlers},set:function(e){this._previousHandlers=e}},nextHandlers:{get:function(){return this._nextHandlers||(this._nextHandlers=[]),this._nextHandlers},set:function(e){this._nextHandlers=e}},densities:{get:function(){return this._densities},set:function(e){this._densities=e,this._densitiesLength=this._densities.length,this._maxTime=null}},_parameters:{value:{}},parameters:{get:function(){return this._parameters||(this._parameters={}),this._parameters},set:function(e){this._parameters=e,this._parametersLength=this._parameters.length}},_maxTime:{enumerable:!1,value:null},computeMaxTime:{value:function(){return this._computeDensitySummation(),this._maxTime=this._densitySummation.length?this._densitySummation[this._densitySummation.length-1]:0,this._maxTime}},_densitySummation:{enumerable:!1,value:null},_computeDensitySummation:{enumerable:!1,value:function(){var e,t=this.densities,n=t.length-1,r=0;for(this._densitySummation=[],e=0;n>e;e++)r+=(t[e]+t[e+1])/2,this._densitySummation[e]=r;this._maxTime=null}},_convertSplineTimeToBezierIndexTime:{enumerable:!1,value:function(e){if(0>e)return null;if(null===this._maxTime&&this.computeMaxTime(),e>=this._maxTime)return null;for(var t,n,r,i,a,o=this._densitySummation,s=o.length,l=s-1,u=s>>1;u;)l-u>=0&&o[l-u]>e?l-=u:u>>=1;return t=e-(l?o[l-1]:0),r=this._densities[l],i=this._densities[l+1],a=r-i,n=-1e-10>a||a>1e-10?(r-Math.sqrt(r*r+2*(i-r)*t))/a:t/r,[l,n]}},getPositionAtIndexTime:{value:function(e){var t=e[0],n=e[1],r=this._knots[t],i=this._nextHandlers[t],a=this._previousHandlers[t+1],o=this._knots[t+1],s=1-n,l=s*s*s,u=3*s*s*n,c=3*s*n*n,h=n*n*n;return[r[0]*l+i[0]*u+a[0]*c+o[0]*h,r[1]*l+i[1]*u+a[1]*c+o[1]*h,r[2]*l+i[2]*u+a[2]*c+o[2]*h]}},getRotationAtIndexTime:{value:function(e){var t,n,r,i=e[0],a=e[1],o=1-a,s=this._parameters;return t=s.rotateX!==void 0?s.rotateX.data[i]*o+s.rotateX.data[i+1]*a:0,n=s.rotateY!==void 0?s.rotateY.data[i]*o+s.rotateY.data[i+1]*a:0,r=s.rotateZ!==void 0?s.rotateZ.data[i]*o+s.rotateZ.data[i+1]*a:0,[t,n,r]}},getStyleAtIndexTime:{value:function(e){var t,n,r,i,a,o,s=e[0],l=e[1],u=this._parameters,c=1-l,h="";for(r=Object.keys(u),i=r.length,t=0;i>t;t++)n=r[t],a=u[n],o=a.data,"rotateX"!==n&&"rotateY"!==n&&"rotateZ"!==n&&o[s]!==void 0&&o[s+1]!==void 0&&(h+=n+":"+1e-5*(1e5*(o[s]*c+o[s+1]*l)>>0)+a.units+";");return h}},transformVectorArray:{value:function(e,t){var n,r,i=e.length,a=[];for(r=0;i>r;r++)n=e[r],n&&(a[r]=[n[0]*t[0]+n[1]*t[4]+n[2]*t[8]+t[12],n[0]*t[1]+n[1]*t[5]+n[2]*t[9]+t[13],n[0]*t[2]+n[1]*t[6]+n[2]*t[10]+t[14]]);return a}},transform:{value:function(e){var t=new FlowBezierSpline;return t._densities=this._densities,t._densitySummation=this._densitySummation,t._knots=this.transformVectorArray(this.knots,e),t._previousHandlers=this.transformVectorArray(this.previousHandlers,e),t._nextHandlers=this.transformVectorArray(this.nextHandlers,e),t}},deCasteljau:{value:function(e,t,n,r,i){var a=1-i,o=a*e[0]+i*t[0],s=a*t[0]+i*n[0],l=a*n[0]+i*r[0],u=a*o+i*s,c=a*s+i*l,h=a*u+i*c,d=a*e[1]+i*t[1],p=a*t[1]+i*n[1],f=a*n[1]+i*r[1],m=a*d+i*p,v=a*p+i*f,g=a*m+i*v,_=a*e[2]+i*t[2],b=a*t[2]+i*n[2],y=a*n[2]+i*r[2],w=a*_+i*b,E=a*b+i*y,C=a*w+i*E;return[[e,[o,d,_],[u,m,w],[h,g,C]],[[h,g,C],[c,v,E],[l,f,y],r]]}},cubic:{enumerable:!1,value:function(e,t,n,r,i){return((e*i+t)*i+n)*i+r}},cubeRoot:{enumerable:!1,value:function(e){return e>0?Math.pow(e,1/3):-Math.pow(-e,1/3)}},cubicRealRoots:{enumerable:!1,value:function(e,t,n,r){var i=1e-100,a=Math;if(-i>e||e>i){var o=1/e,s=t*o,l=n*o,u=(3*l-s*s)*(1/9),c=(4.5*s*l-13.5*r*o-s*s*s)*(1/27),h=u*u*u+c*c;if(h>i){var d=a.sqrt(h);return[this.cubeRoot(c+d)+this.cubeRoot(c-d)+s*(-1/3)]}if(h>-i){if(-i>c||c>i){var p=this.cubeRoot(c),f=2*p+s*(-1/3),m=s*(-1/3)-p;return m>f?[f,m]:[m,f]}return[s*(-1/3)]}var v=a.acos(c/a.sqrt(-u*u*u))*(1/3),g=a.sqrt(-u),_=1.7320508075688772*g*a.sin(v),b=s*(-1/3);return g*=a.cos(v),[b-g-_,b-g+_,b+2*g]}if(-i>t||t>i){var y=n*n-4*t*r;return y>=0?(y=a.sqrt(y),[(-n-y)/(2*t),(y-n)/(2*t)]):[]}return-i>n||n>i?[-r/n]:[]}},_halfPI:{enumerable:!1,value:.5*Math.PI},reflectionMatrix:{enumerable:!1,value:function(e,t,n,r){var i=Math,a=this._halfPI-i.atan2(t,e),o=i.sin(a),s=i.cos(a),l=this._halfPI-i.atan2(n,e*o+t*s),u=i.sin(l);return r[0]=u*o,r[1]=s*u,r[2]=i.cos(l),r}},reflectedY:{enumerable:!1,value:function(e,t,n,r){return e*r[0]+t*r[1]+n*r[2]}},directedPlaneBezierIntersection:{enumerable:!1,value:function(e,t,n,r,i,a,o,s,l){for(var u,c,h=this.reflectionMatrix(r[0],r[1],r[2],l),d=this.reflectedY(i[0]-e,i[1]-t,i[2]-n,h),p=this.reflectedY(a[0]-e,a[1]-t,a[2]-n,h),f=this.reflectedY(o[0]-e,o[1]-t,o[2]-n,h),m=this.reflectedY(s[0]-e,s[1]-t,s[2]-n,h),v=3*(p-f)+m-d,g=3*(d+f)-6*p,_=3*(p-d),b=this.cubicRealRoots(v,g,_,d),y=0,w=0,E=[];b.length>w&&0>=b[w];)w++;for(;b.length>w&&1>b[w];)u=y,y=b[w],c=.5*(u+y),this.cubic(v,g,_,d,c)>=0&&E.push([u,y]),w++;return c=.5*(y+1),this.cubic(v,g,_,d,c)>=0&&E.push([y,1]),E}}});