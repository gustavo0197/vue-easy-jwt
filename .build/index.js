"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64json = require("base64json");
exports.default = {
    install: function (Vue, options) {
        const jwt = new VueEasyJwt();
        // Set the getToken funcion if has one
        if (options.getToken) {
            jwt.defaultTokenGetter(options.getToken);
        }
        // Set a global variable
        Vue.prototype.$jwt = jwt;
    },
};
class VueEasyJwt {
    constructor() {
        this.base64 = base64json;
    }
    decodeToken(token) {
        try {
            // if the token has more or less than 3 parts or is not a string
            // then is not a valid token
            if (token.split(".").length != 3 || typeof token != "string") {
                return null;
                // throw new Error("This is not a valid token")
            }
            else {
                // signature ( part 2 ) has the data stored and
                // data about the expiration time
                const signature = token.split(".")[1];
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
    // Set a default function to get a token
    // For example to get a token from the localStorage or sessionStorage
    defaultTokenGetter(getToken) {
        this._getToken = getToken;
    }
    // Use the getToken function to get the token
    getToken() {
        if (this._getToken) {
            return this._getToken();
        }
        return null;
    }
}
exports.VueEasyJwt = VueEasyJwt;
