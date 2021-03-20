// https://observablehq.com/@triptych/business-card@124
import define1 from "./afe0b8efed1d64d9@334.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Business Card`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A business card with random user data. You can override with query parameters for your own case. Fork this notebook to improve it. Uses TailWind for CSS.

For example: https://observablehq.com/d/07c5318407661956?fname=Andrew&lname=Wooldridge&email=triptych@gmail.com&pic=https://via.placeholder.com/160&username=triptych&website=andreww.xyz `
)});
  main.variable(observer("card")).define("card", ["html","tw","profile"], function(html,tw,profile){return(
html`
<div class="bizcard ${tw`text-base bg-gray-100 text-gray-900 font-sans antialiased p-16`}">
  <div class="${tw`bg-white shadow overflow-hidden sm:rounded-lg p-8`}">
    <div class="${tw`inline-flex items-center`}">
      <div>
        <span class="${tw``}"><img class="${tw`rounded-lg shadow-lg antialiased`}" src="${profile.picture}"</span>
       </div>
      <div class="${tw`p-4 `}">
         <div class="name">${profile.first_name} ${profile.last_name}</div>
         <div><span class="${tw`text-gray-700 font-semibold relative pt-3 md:pt-0`}">email:</span> ${profile.email}</div>
         <div><span class="${tw`text-gray-700 font-semibold relative pt-3 md:pt-0`}">social network:</span> @${profile.social_network} </div>
<div><span class="${tw`text-gray-700 font-semibold relative pt-3 md:pt-0`}">website:</span> <a href="${profile.website}">${profile.website}</a></div>
      </div>
    </div>
  </div>

</div>`
)});
  main.variable(observer("name")).define("name", function(){return(
"Firstname Lastname"
)});
  main.define("initial profile", ["user"], function(user){return(
{
  first_name: user.results[0].name.first,
  last_name: user.results[0].name.last,
  picture: user.results[0].picture.large,
  email: user.results[0].email,
  social_network: user.results[0].login.username,
  website: `https://${user.results[0].location.country.toLowerCase().replace(" ","")}.com`
}
)});
  main.variable(observer("mutable profile")).define("mutable profile", ["Mutable", "initial profile"], (M, _) => new M(_));
  main.variable(observer("profile")).define("profile", ["mutable profile"], _ => _.generator);
  main.variable(observer("style")).define("style", ["html"], function(html){return(
html`
<style>
  body.bizcard { 
    font: 16px/1.15 var(--serif) !important; 
  }

</style>`
)});
  const child1 = runtime.module(define1);
  main.import("tw", child1);
  main.import("twind", child1);
  main.variable(observer("user")).define("user", ["paramArr","getValue"], async function(paramArr,getValue)
{
  if(paramArr.length<1){
    // no query parameters so populate randomly
    let user = await fetch("https://randomuser.me/api/").then(response=>{
      return response.json()
    })
    return await user
  } else {
    // mock the user response via the query parameters
    let user = {
      results:[
        {
          name: { first: getValue("fname",paramArr), last:getValue("lname",paramArr) },
          email: getValue("email", paramArr),
          picture:{
            large: getValue("pic", paramArr)
          },
          login: {
            username: getValue("username", paramArr)
          },
          location: {
            country: getValue("website",paramArr)
          }
        }
      ]
    }
    return user;
  }
}
);
  main.variable(observer("params")).define("params", ["URLSearchParams","location"], function(URLSearchParams,location){return(
new URLSearchParams(location.search)
)});
  main.variable(observer("paramArr")).define("paramArr", ["params"], function(params){return(
Array.from(params.entries())
)});
  main.variable(observer("getValue")).define("getValue", function(){return(
(key, arr)=>{
  let retVal = "";
  arr.forEach((itm,idx,array)=>{
    if(itm[0] == key){
      retVal = itm[1]
    }
  });
  return retVal;
}
)});
  return main;
}
