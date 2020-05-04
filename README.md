This is a small library for decoding a json web token in vue. Since the header and payload is base64 encoded you can easily know the stored data with no password, you can also know if the token is expired or not.

#### Version 2.0
In this version you can use this library as a Vue plugin and you'll be able to use it in your components using *`this.$jwt`*

A version for **Angular** and **React** is coming.

#### To install this module you can use yarn or npm

```
yarn add vue-easy-jwt

or

npm install vue-easy-jwt
```
#### You can use it in a vue project

#### main.js
```js
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueEasyJwt from 'vue-easy-jwt'

Vue.config.productionTip = false
// You can access to the plugin in your components
// by using this.$jwt
Vue.use(VueEasyJwt)

or
// You can also define a function to get your token in an easy way.
// In your components you should do this:   this.$jwt.getToken();
Vue.use(VueEasyJwt, {
  getToken: () => localStorage.getItem("authorization")
})

new Vue({
  render: h => h(App)
}).$mount('#app')

```

#### In your components
```html
<script>
  export default {
    data() {
      return {
        // If you defined a function to get your token
        // you can use this and you'll get the token
        yourToken: this.$jwt.getToken(),
      };
    },
    methods: {
      decodeToken() {
        // Decode some token
        const decodedToken = this.$jwt.decodeToken(this.yourToken);
        // You should get a json if your token has a
        // valid format, even if it's expired.
        // And you will get null if your token
        // has an invalid jwt format, null or undefined.
        /*  
          {
            sub: '1234567890',
            name: 'Gustavo',
            iat: 1516239022,
            exp: 4008900000 
          } 
        */
      },
      expiredToken() {
        // you will get a true / false response
        // true  -> if the token is already expired
        // false -> if the token is not expired
        const isExpired = this.$jwt.isExpired(this.yourToken);
      },
    },
  };
</script>
```

#### You can also use it for navigation guards

```js
import VueRouter from "vue-router";
import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

// import your components
import SignIn from "path_to_component/SignIn.vue";
import Home from "path_to_component/Home.vue";

const routes = [
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (route.meta.requiresAuth) {
      // import your token
      const yourToken = localStorage.getItem("token");

      // returns true if is expired
      // if it is an empty string, null or undefined
      // will return true (expired)
      if (jwt.isExpired(yourToken)) {
        // if is expired the user should sign in again
        next({ path: "/signin" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
```
