This is a small library for decoding a json web token in vue. Since the header and payload is base64 encoded you can easily know the stored data with no password, you can also know if the token is expired or not.

#### To install this module you can use yarn or npm

    yarn add vue-easy-jwt 
    or
    npm install vue-easy-jwt
    
#### You can use it in a vue project

```html
<script>
import { VueEasyJwt } from 'vue-easy-jwt'

export default {
    data(){
        return {
            jwt: new VueEasyJwt(),
            yourToken: localStorage.getItem("token")
        }
    },
    methods: {
        decodeToken(){
            // Decode some token
            const decodedToken = this.jwt.decodeToken(this.yourToken) 
            // You should get a json if your token has a 
            // valid format, even if it's expired.
            // And you will get null if your token 
            // has an invalid jwt format.
            /*  {
                    sub: '1234567890',
                    name: 'John Doe',
                    iat: 1516239022,
                    exp: 4008900000 
                } 
            */
        },
        expiredToken(){
            // you will get a true / false response
            // true  -> if the token is already expired
            // false -> if the token is not expired
            const isExpired = this.jwt.isExpired(this.yourToken) 
        }
    }
}
</script>
    
```

#### You can also use it for navigation guards

```js
import VueRouter from 'vue-router'
import { VueEasyJwt } from 'vue-easy-jwt'
const jwt = new VueEasyJwt()

// import your components
import SignIn from 'path_to_component/SignIn.vue'
import Home from 'path_to_component/Home.vue'

const routes = [
    {
        path: '/signin',
        component: SignIn
    },
    {
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    }
]
    
const router = new VueRouter({ routes })
    
router.beforeEach( (to, from, next) => {
    to.matched.some( route => {
            
        if( route.meta.requiresAuth ){
            // import your token
            const yourToken = localStorage.getItem('token')
                
            // returns true if is expired
            // if it is an empty string, null or undefined
            // will return true (expired)
            if( jwt.isExpired(yourToken) ){
                // if is expired the user should sign in again
                next({ path: '/signin' })
            }
            else {
                next()
            }
        }
        else {
            next()
        }
    })
})

export default router
    
```
