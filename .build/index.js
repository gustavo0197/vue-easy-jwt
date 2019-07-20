"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64json = require("base64json");
class VueEasyJwt {
    constructor() {
        this.base64 = base64json;
    }
    decodeToken(token) {
        try {
            // if the token has more or less than 3 parts or is not a string
            // then is not a valid token
            if (token.split('.').length != 3 || typeof token != "string") {
                return null;
                // throw new Error("This is not a valid token")
            }
            else {
                // signature ( part 2 ) has the data stored and
                // data about the expiration time
                const signature = token.split('.')[1];
                // decode and parse to json
                return this.base64.parse(signature);
            }
        }
        catch (error) {
            // Return if something goes wrong
            return null;
        }
    }
    isExpired(token) {
        const decodedToken = this.decodeToken(token);
        if (decodedToken) {
            let expirationDate = new Date(0);
            // sets the expiration seconds 
            expirationDate.setUTCSeconds(decodedToken.exp);
            // compare the expiration time and the current time
            return expirationDate.valueOf() < new Date().valueOf();
        }
        else {
            return true;
        }
    }
}
exports.VueEasyJwt = VueEasyJwt;
