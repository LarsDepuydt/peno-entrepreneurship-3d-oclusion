(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[705],{9307:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/patient",function(){return n(8470)}])},8470:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return k}});var a=n(5893);n(6821);var i=n(7506),s=n.n(i),r=n(8609),p=n(5675),l=n.n(p),c=n(1163),o=n(6357),d=n.n(o),u=n(7294);function m(t){let{patientID:e}=t,n=(0,c.useRouter)(),i=()=>{n.push({pathname:"/scans-page",query:{patientID:e}})};return(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",className:d().relu_btn,id:d().InspectScansIcon,onClick:i})})}function j(){let[t,e]=(0,u.useState)(void 0),n=()=>{e(2)};return(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",className:d().relu_btn,id:d().deleteIcon,onClick:n})})}function x(){return(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",className:d().relu_btn,id:d().editIcon})})}function f(t){let{id:e,picture:n,patientfirstname:i,patientlastname:r}=t,[p,o]=(0,u.useState)(!1),f=()=>{o(!0)},N=()=>{o(!1)},[_,h]=(0,u.useState)(!1),v=()=>{h(!0)},b=()=>{h(!1)};return(0,c.useRouter)(),(0,a.jsxs)("div",{className:s().patientScan_container,children:[_&&(0,a.jsxs)("div",{className:s().patientScan_dropDown,children:[(0,a.jsxs)("div",{className:s().dropDownButtonWrapper,children:[(0,a.jsx)("button",{className:d().relu_btn,id:d().dropDownButton,children:"test"}),(0,a.jsx)("button",{className:d().relu_btn,id:d().dropDownButton,children:"test"}),(0,a.jsx)("button",{className:d().relu_btn,id:d().dropDownButton,children:"test"}),(0,a.jsx)("button",{className:d().relu_btn,id:d().dropDownButton,children:"test"})]}),(0,a.jsx)("button",{type:"button",className:d().relu_btn,id:d().exitIcon,onClick:b})]}),!_&&(0,a.jsxs)("div",{className:s().patientScan_normal,onMouseEnter:f,onMouseLeave:N,children:[(0,a.jsx)("div",{className:s().picture_wrapper,children:(0,a.jsx)(l(),{id:i.concat(" ",r),className:p?s().picture_hover:s().picture,src:n,alt:"3d picture of teeth"})}),p&&(0,a.jsxs)("div",{className:s().subButtons,children:[(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"button",className:d().relu_btn,id:d().menuIcon,onClick:v})}),(0,a.jsx)(m,{patientID:e}),(0,a.jsx)(x,{}),(0,a.jsx)(j,{})]}),(0,a.jsx)("div",{className:p?s().patientscanNameWrapperInvisible:s().patientscanNameWrapper,children:(0,a.jsx)("p",{className:s().patientscanName,children:i.concat(" ",r)})})]})]})}var N=n(916),_=n(8050),h=n(9008),v=n.n(h);let b=[{patient11:(0,a.jsx)(f,{id:1,picture:N.Z,patientfirstname:"Jos",patientlastname:"Van de Velde"}),patient12:(0,a.jsx)(f,{id:2,picture:N.Z,patientfirstname:"Anna",patientlastname:"Janssens"}),patient13:(0,a.jsx)(f,{id:3,picture:N.Z,patientfirstname:"Josephine",patientlastname:"De Goter"})},{patient21:(0,a.jsx)(f,{id:4,picture:N.Z,patientfirstname:"Jos",patientlastname:"Van Rooie"}),patient22:(0,a.jsx)(f,{id:5,picture:N.Z,patientfirstname:"Gert",patientlastname:"Vandamme"}),patient23:(0,a.jsx)(f,{id:6,picture:N.Z,patientfirstname:"Peter",patientlastname:"Damiaans"})},{patient31:(0,a.jsx)(f,{id:7,picture:N.Z,patientfirstname:"Bart",patientlastname:"De Strooper"}),patient32:(0,a.jsx)(f,{id:8,picture:N.Z,patientfirstname:"Kaatje",patientlastname:"Groothals"}),patient33:(0,a.jsx)(f,{id:9,picture:N.Z,patientfirstname:"Lieselot",patientlastname:"Destoffel"})},{patient41:(0,a.jsx)(f,{id:10,picture:N.Z,patientfirstname:"Jozef",patientlastname:"Van Kerke"}),patient42:(0,a.jsx)(f,{id:10,picture:N.Z,patientfirstname:"Jozef",patientlastname:"Van Kerke"}),patient43:(0,a.jsx)(f,{id:8,picture:N.Z,patientfirstname:"Kaatje",patientlastname:"Groothals"})}],w=b.flatMap(t=>Object.values(t)).reduce((t,e)=>{let n=t.find(t=>t.props.id===e.props.id);return n||t.push(e),t},[]),Z=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(v(),{children:[(0,a.jsx)("title",{children:"relu"}),(0,a.jsx)("link",{rel:"icon",href:"/relu_icon.ico"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:s().scansWrapper,children:[w.map((t,e)=>(0,a.jsx)("div",{children:(0,a.jsx)(f,{id:t.props.id,picture:t.props.picture,patientfirstname:t.props.patientfirstname,patientlastname:t.props.patientlastname})},"patient".concat(e+1))),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler}),(0,a.jsx)("div",{className:s().patient_filler})]}),(0,a.jsx)(_.M,{}),(0,a.jsx)(r.Q,{})]})]});var k=Z},9008:function(t,e,n){t.exports=n(3121)}},function(t){t.O(0,[152,577,675,374,379,935,774,888,179],function(){return t(t.s=9307)}),_N_E=t.O()}]);