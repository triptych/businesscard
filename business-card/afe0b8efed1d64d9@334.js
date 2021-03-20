// https://observablehq.com/@hastebrot/using-twind@334
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Using Twind`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Twind is small compiler that turns Tailwind short hand into CSS rules at run, build or serve time. If you have used Tailwind and/or a CSS-in-JS solution before then most of the API will feel very familiar.

### Usage

~~~js
import { tw, twind } from "@hastebrot/using-twind"
~~~

### Dependencies

- \`twind/twind.umd.js\`, 33.4 kB
- \`twind/colors/colors.umd.js\`, 3.92 kB
- \`@twind/forms/forms.umd.js\`, 4.16 kB

### References

- https://github.com/tw-in-js/twind
- https://twind.dev/docs/index.html
- https://tailwindcss.com
---`
)});
  main.variable(observer()).define(["html","tw"], function(html,tw){return(
html`<h2 class="${tw`font-serif font-bold text-2xl pb-1`}">Examples</h2>`
)});
  main.variable(observer()).define(["html","tw"], function(html,tw){return(
html`
  <main class="${tw`font-sans bg-purple-400 p-8 flex items-center justify-center`}">
    <h1 class="${tw`font-bold text(center 5xl white sm:gray-800 md:pink-700)`}">This is Twind!</h1>
  </main>
`
)});
  main.variable(observer()).define(["html","tw"], function(html,tw){return(
html`
  <div class="${tw`pb-3 space-y-3 flex flex-col`}">
    <input class="${tw`form-input rounded-lg border-gray-300`}" type="text" placeholder="first name" />
    <input class="${tw`form-input rounded-lg border-gray-300`}" type="text" placeholder="last name" />
  </div>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("tw")).define("tw", ["twind","withTwindScopedOptions"], function(twind,withTwindScopedOptions){return(
twind.setup({
  ...withTwindScopedOptions(),
  theme: {
    extend: {
      colors: {
        gray: twind.colors.trueGray,
      },
      fontFamily: {
        serif: ["var(--serif)"],
      },
    },
  },
  plugins: {
    "form-checkbox": twind.forms.formCheckbox,
    "form-field": twind.forms.formField,
    "form-file": twind.forms.formFile,
    "form-input": twind.forms.formInput,
    "form-radio": twind.forms.formRadio,
    "form-select": twind.forms.formSelect,
    "form-textarea": twind.forms.formTextarea,
  },
})
)});
  main.variable(observer("withTwindScopedOptions")).define("withTwindScopedOptions", ["twind"], function(twind){return(
() => {
  const withEmptySheet = () => {
    const sheet = twind.cssomSheet()
    while (sheet.target.cssRules.length) {
      sheet.target.deleteRule(0)
    }
    return twind.cssomSheet()
  }
  return {
    sheet: withEmptySheet(),
    hash: true,
    preflight: preflight => ({
      "[class*=tw-]": {
        ...preflight.body, 
        ...preflight.html, 
        ...preflight["*,::before,::after"],
        margin: "0", 
        padding: "0",
        "&::before,&::after": preflight["*,::before,::after"],
      },
    })
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("twindVersion")).define("twindVersion", function(){return(
"0.16.4"
)});
  main.variable(observer("twindFormsVersion")).define("twindFormsVersion", function(){return(
"0.1.4"
)});
  main.variable(observer("twind")).define("twind", ["require","twindVersion","colors","forms"], function(require,twindVersion,colors,forms){return(
require(`twind@${twindVersion}`).then(twind => ({
  ...twind,
  setup: options => twind.create(options).tw,
  colors,
  forms,
}))
)});
  main.variable(observer("colors")).define("colors", ["require","twindVersion"], function(require,twindVersion){return(
require(`twind@${twindVersion}/colors/colors.umd.js`)
)});
  main.variable(observer("forms")).define("forms", ["require","twindFormsVersion"], function(require,twindFormsVersion){return(
require(`@twind/forms@${twindFormsVersion}`)
)});
  return main;
}
