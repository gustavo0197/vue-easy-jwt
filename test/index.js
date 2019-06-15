const { VueEasyJwt } = require("../.build")
const jwt = new VueEasyJwt()
const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQwMDg5MDAwMDB9.hC5JgoElQvzoQEhZ3wlLs-IS4gx5S6uLaWQRBbj7KXg"
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MjYyMzkwMjJ9.GMdV0dx1F8rZuHUebeXL5tR2DROlc03IuDc2DeDTExI"

console.log("Valid token: is expired ? ", jwt.isExpired(validToken))
console.log("Expired token: is expired ? ", jwt.isExpired(expiredToken))
console.log("undefined: is expired ?", jwt.isExpired(undefined))
console.log("null: is expired ?", jwt.isExpired(null))
console.log("Invalid token: is expired ?", jwt.isExpired(""))

try {
    console.log("Decoding a valid token: ", jwt.decodeToken(validToken))
    jwt.decodeToken("") // invalid token
} catch (error) {
    console.log(error.message)
}