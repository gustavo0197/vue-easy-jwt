To install this module you can use yarn or npm

    yarn add vue-easy-jwt 
    or
    npm install vue-easy-jwt
    
You can use it in a vue project

    import { VueEasyJwt } from 'vue-easy-jwt'
    const jwt = new VueEasyJwt()
    
    # decode some token
    jwt.decodeToken(yourToken) // you should get a json
    
     # you will get a boolean response
     # true -> if the token is already expired
     # false -> if the token is not expired
    jwt.isExpired(yourToken)
    
You can also use it for navigation guards

    import VueRouter from 'vue-router'

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
        
    })