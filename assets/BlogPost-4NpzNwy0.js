import{r as p,o as y,c as s,g as n,j as g,a as e,t as d,F as f,d as h,n as x,p as _,u as k,q as b,i as C,e as w,w as v,f as I,h as N}from"./index-jOGLxoXg.js";const A={class:"container mx-auto px-4 py-8"},B={key:0,class:"mb-8 rounded-lg overflow-hidden h-64 md:h-80"},P=["src","alt"],M={class:"mb-8"},S={class:"text-4xl font-bold text-gray-800 dark:text-white mb-2"},$={class:"flex flex-wrap items-center text-gray-600 dark:text-gray-300 gap-4"},L={class:"mt-4 flex flex-wrap gap-2"},T={class:"flex flex-col md:flex-row gap-8"},V={key:0,class:"md:w-64 lg:w-80 shrink-0 order-2 md:order-1"},j={class:"sticky top-24 p-4 glass-card"},z={class:"space-y-2"},F=["href"],q={__name:"BlogLayout",props:{title:{type:String,required:!0},date:{type:String,required:!0},tags:{type:Array,default:()=>[]},coverImage:{type:String,default:""}},setup(i){const m=p("0 min read"),u=p(null),o=p([]);return y(()=>{if(u.value){const a=(u.value.textContent||"").split(/\s+/).length,t=Math.max(1,Math.ceil(a/200));m.value=`${t} min read`;const l=u.value.querySelectorAll("h2, h3");o.value=Array.from(l).map(r=>({id:r.id||r.textContent.toLowerCase().replace(/\W+/g,"-"),text:r.textContent,level:parseInt(r.tagName.substring(1))})),l.forEach(r=>{r.id||(r.id=r.textContent.toLowerCase().replace(/\W+/g,"-"))})}}),(c,a)=>(n(),s("div",A,[i.coverImage?(n(),s("div",B,[e("img",{src:i.coverImage,alt:i.title,class:"w-full h-full object-cover"},null,8,P)])):g("",!0),e("div",M,[e("h1",S,d(i.title),1),e("div",$,[e("div",null,d(i.date),1),a[0]||(a[0]=e("div",null,"�6�1",-1)),e("div",null,d(m.value),1)]),e("div",L,[(n(!0),s(f,null,h(i.tags,t=>(n(),s("span",{key:t,class:"px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"}," #"+d(t),1))),128))])]),e("div",T,[o.value.length>0?(n(),s("aside",V,[e("div",j,[a[1]||(a[1]=e("h3",{class:"font-medium text-lg mb-4 text-gray-800 dark:text-white"},"Table of Contents",-1)),e("nav",null,[e("ul",z,[(n(!0),s(f,null,h(o.value,t=>(n(),s("li",{key:t.id},[e("a",{href:`#${t.id}`,class:x({"ml-4":t.level===3,"hover:text-primary-500 dark:hover:text-primary-400":!0,"text-gray-700 dark:text-gray-300":!0})},d(t.text),11,F)]))),128))])])])])):g("",!0),e("div",{class:"flex-1 order-1 md:order-2 prose prose-lg dark:prose-invert max-w-full",ref_key:"postContent",ref:u},[_(c.$slots,"default")],512)])]))}},H={key:0,class:"container mx-auto px-4 py-12 flex justify-center"},U={key:1,class:"container mx-auto px-4 py-12"},W={class:"bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg"},J={class:"mt-6 text-center"},O=["innerHTML"],D={__name:"BlogPost",setup(i){const m=k(),u=b(),o=p(null),c=p(!0),a=p(null);return y(async()=>{const{slug:t}=m.params;if(!t){u.push("/blog");return}try{setTimeout(()=>{t==="getting-started-with-vue-3-composition-api"?o.value={title:"Getting Started with Vue 3 Composition API",date:"April 15, 2025",tags:["vue","javascript","web-development"],coverImage:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",content:`
          <h2 id="introduction">Introduction</h2>
          <p>Vue 3's Composition API represents a major shift in how we structure component logic. Unlike the Options API where code is organized by option type (data, methods, computed, etc.), the Composition API lets us group code by logical concern.</p>
          
          <h2 id="why-use-composition-api">Why Use the Composition API?</h2>
          <p>The Composition API offers several advantages:</p>
          <ul>
            <li>Better organization of complex component logic</li>
            <li>More intuitive reuse of code across components</li>
            <li>Better TypeScript support</li>
            <li>More readable code for large components</li>
          </ul>
          
          <h3 id="code-reusability">Code Reusability</h3>
          <p>One of the biggest advantages is the ability to extract and reuse logic in "composition functions":</p>
          
          <pre><code>// useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return {
    count,
    increment
  }
}</code></pre>
          
          <h2 id="getting-started">Getting Started</h2>
          <p>Let's create a simple component using the Composition API:</p>
          
          <pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue'

// State
const firstName = ref('John')
const lastName = ref('Doe')

// Computed property
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

// Method
function updateName(newFirstName) {
  firstName.value = newFirstName
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Hello, {{ fullName }}&lt;/h1&gt;
    &lt;input v-model="firstName" placeholder="First name"&gt;
    &lt;input v-model="lastName" placeholder="Last name"&gt;
    &lt;button @click="updateName('Jane')"&gt;Change to Jane&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          
          <h2 id="lifecycle-hooks">Lifecycle Hooks</h2>
          <p>Lifecycle hooks are also available as functions:</p>
          
          <pre><code>import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  console.log('Component mounted!')
  // Setup event listeners, initialize libraries, etc.
})

onBeforeUnmount(() => {
  console.log('Component will unmount!')
  // Clean up resources
})</code></pre>
          
          <h2 id="conclusion">Conclusion</h2>
          <p>The Composition API offers a more flexible way to organize and reuse component logic in Vue 3. While it takes some getting used to, especially if you're familiar with the Options API, the benefits in maintainability and code organization make it worth exploring for your next Vue project.</p>
          `}:a.value="Post not found.",c.value=!1},1e3)}catch{a.value="Failed to load post. Please try again later.",c.value=!1}}),(t,l)=>{const r=I("router-link");return c.value?(n(),s("div",H,l[0]||(l[0]=[e("div",{class:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"},null,-1)]))):a.value?(n(),s("div",U,[e("div",W,d(a.value),1),e("div",J,[w(r,{to:"/blog",class:"text-primary-600 dark:text-primary-400 hover:underline"},{default:v(()=>l[1]||(l[1]=[N(" �� Back to Blog ")])),_:1})])])):o.value?(n(),C(q,{key:2,title:o.value.title,date:o.value.date,tags:o.value.tags,coverImage:o.value.coverImage},{default:v(()=>[e("div",{innerHTML:o.value.content},null,8,O)]),_:1},8,["title","date","tags","coverImage"])):g("",!0)}}};export{D as default};
