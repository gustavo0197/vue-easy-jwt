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
    


