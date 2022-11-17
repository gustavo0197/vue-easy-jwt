import { PluginOptions } from "./types";

export default {
  install: function (Vue: any, options: PluginOptions): void {
    const jwt = new VueEasyJwt();
    const vueVersion = parseInt(Vue.version);

    // Set the getToken funcion if has one
    if (options && options.getToken) {
      jwt.defaultTokenGetter(options.getToken);
    }

    // Set a global variable
    if (vueVersion === 2) Vue.prototype.$jwt = jwt;
    else if (vueVersion === 3) Vue.config.globalProperties.$jwt = jwt;
    else throw new Error('Wrong VueJS version');
  },
};

export class VueEasyJwt {
  private _getToken: () => string;

  public decodeToken(token: string): string {
    try {
      // if the token has more or less than 3 parts or is not a string
      // then is not a valid token
      if (token.split(".").length != 3 || typeof token != "string") {
        return null;
        // throw new Error("This is not a valid token")
      } else {
        // payload ( index 1 ) has the data stored and
        // data about the expiration time
        const payload: string = token.split(".")[1];
        // decode and parse to json
        return JSON.parse(atob(payload));
      }
    } catch (error) {
      // Return if something goes wrong
      return null;
    }
  }

  public isExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);

    if (decodedToken && decodedToken.exp) {
      let expirationDate: Date = new Date(0);
      // sets the expiration seconds
      expirationDate.setUTCSeconds(decodedToken.exp);

      // compare the expiration time and the current time
      return expirationDate.valueOf() < new Date().valueOf();
    } else {
      return true;
    }
  }

  // Set a default function to get a token
  // For example to get a token from the localStorage or sessionStorage
  public defaultTokenGetter(getToken: () => string) {
    this._getToken = getToken;
  }

  // Use the getToken function to get the token
  public getToken(): string {
    if (this._getToken) {
      return this._getToken();
    }

    return null;
  }
}
