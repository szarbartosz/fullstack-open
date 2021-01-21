(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(38)},19:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),c=n.n(l),u=(n(19),n(2)),o=function(e){var t=e.person,n=e.deleteEntry;return r.a.createElement("li",{className:"list-group-item d-flex justify-content-between"},t.name," ",t.number,r.a.createElement("button",{onClick:n,className:"btn btn-danger btn-sm"},"delete"))},m=function(e){var t=e.persons,n=e.deleteEntry;return r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement("h3",null,"Contacts"),r.a.createElement("ul",{className:"list-group"},t.map((function(e){return r.a.createElement(o,{key:e.name,person:e,deleteEntry:function(){return n(e)}})}))))},s=function(e){var t=e.nameFilter,n=e.numberFilter,a=e.nameFilterChangeHandler,l=e.numberFilterChangeHandler;return r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement("h3",null,"Filter"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"by name"),r.a.createElement("input",{value:t,onChange:a,className:"form-control",placeholder:"enter firstname or lastname..."})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"by number"),r.a.createElement("input",{value:n,onChange:l,className:"form-control",placeholder:"enter number..."}))))},i=function(e){var t=e.submitHandler,n=e.nameInput,a=e.nameChangeHandler,l=e.numberInput,c=e.numberChangeHandler;return r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement("h3",null,"Add a new contact"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"name"),r.a.createElement("input",{value:n,onChange:a,placeholder:"enter name",className:"form-control"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"number"),r.a.createElement("input",{value:l,onChange:c,placeholder:"enter number",className:"form-control"})),r.a.createElement("button",{type:"submit",className:"btn btn-success btn-block"},"add")))},b=function(e){var t=e.errorMessage,n=e.successMessage;return null===t?null===n?null:r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement("button",{type:"button",className:"btn btn-success btn-block",disabled:!0},n)):r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement("button",{type:"button",className:"btn btn-danger btn-block",disabled:!0},t))},d=n(3),f=n.n(d),E="/api/persons",p=function(){return f.a.get(E).then((function(e){return e.data}))},h=function(e){return f.a.post(E,e).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(E,"/").concat(e))},v=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(""),o=Object(u.a)(c,2),d=o[0],f=o[1],E=Object(a.useState)(""),v=Object(u.a)(E,2),N=v[0],j=v[1],O=Object(a.useState)(""),C=Object(u.a)(O,2),y=C[0],k=C[1],H=Object(a.useState)(""),F=Object(u.a)(H,2),S=F[0],w=F[1],I=Object(a.useState)(null),M=Object(u.a)(I,2),x=M[0],T=M[1],A=Object(a.useState)(null),D=Object(u.a)(A,2),J=D[0],R=D[1];Object(a.useEffect)((function(){p().then((function(e){l(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement("hr",null),r.a.createElement(b,{successMessage:x,errorMessage:J}),r.a.createElement(i,{submitHandler:function(e){e.preventDefault(),h({name:d,number:N}).then((function(e){l(n.concat(e)),f(""),j(""),T("Added to contacts: ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){f(""),j(""),R(e.response.data.error),setTimeout((function(){R(null)}),5e3),console.log(e.response.data)}))},nameInput:d,nameChangeHandler:function(e){f(e.target.value)},numberInput:N,numberChangeHandler:function(e){j(e.target.value)}}),r.a.createElement(s,{nameFilter:y,numberFilter:S,nameFilterChangeHandler:function(e){k(e.target.value)},numberFilterChangeHandler:function(e){w(e.target.value)}}),r.a.createElement(m,{persons:n.filter((function(e){return new RegExp(y,"i").test(e.name)})).filter((function(e){return new RegExp(S).test(e.number)})),deleteEntry:function(e){window.confirm("delete ".concat(e.name,"?"))&&g(e.id).then((function(t){l(n.filter((function(t){return t.id!==e.id}))),T("Deleted information of: ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(t){R("Information of: ".concat(e.name," has already been removed from the server!")),setTimeout((function(){R(null)}),5e3),l(n.filter((function(t){return t.id!==e.id})))}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.97bfa1fd.chunk.js.map