(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0cbd1f"],{"4afb":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-modal",{attrs:{"content-classes":"bg-dark q-pa-lg",maximized:""},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-10 text-grey q-mt-md"},[t._v("\n      QScript JSON\n    ")]),o("div",{staticClass:"col-2 text-right"},[o("q-btn",{attrs:{icon:"close",round:"",flat:"",color:"secondary"},on:{click:function(e){t.$emit("close")}}})],1)]),o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("q-input",{ref:"viewJSON",staticClass:"q-mb-md",attrs:{value:JSON.stringify(t.data,null,2),type:"textarea",readonly:"",dark:"",color:"secondary"}})],1)]),o("div",{staticClass:"row"},[o("div",{staticClass:"col text-faded"},[t._v("\n      To see this view rendered, paste the above code into the\n        "),o("a",{attrs:{href:"https://wmfs.github.io/qscript/",target:"_blank"}},[t._v("QScript Playpen")]),t._v(".\n    ")]),o("div",{staticClass:"col text-right"},[o("q-btn",{attrs:{icon:"file_copy",round:"",flat:"",color:"secondary"},on:{click:t.copyToClipboard}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right",offset:[20,0]}},[t._v("Copy to clipboard")])],1)],1)])])},s=[];a._withStripped=!0;var i={name:"PreviewModal",props:["open","data"],methods:{copyToClipboard:function(){this.$refs["viewJSON"].select(),document.execCommand("copy"),this.$q.notify({type:"info",position:"top",message:"Copied to clipboard."})}}},c=i,n=o("2877"),l=Object(n["a"])(c,a,s,!1,null,null,null);l.options.__file="Preview.vue";e["default"]=l.exports}}]);