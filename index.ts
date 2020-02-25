import * as base64json from 'base64json'

export class VueEasyJwt {
  private base64: any
    
  constructor(){
    this.base64 = base64json
  }

  public decodeToken(token: string): string {
    try {
      // if the token has more or less than 3 parts or is not a string
      // then is not a valid token
      if(token.split('.').length != 3 || typeof token != "string" ){
        return null
        // throw new Error("This is not a valid token")
      }
      else {
        // signature ( part 2 ) has the data stored and
        // data about the expiration time
        const signature = token.split('.')[1]
        // decode and parse to json
        return this.base64.parse(signature)
      }
    } catch (error) {
      // Return if something goes wrong
      return null
    }
  }

  public isExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token)
      
    if(decodedToken){
      let expirationDate: Date = new Date(0)
      // sets the expiration seconds 
      expirationDate.setUTCSeconds(decodedToken.exp)
      
      // compare the expiration time and the current time
      return expirationDate.valueOf() < new Date().valueOf()
    }
    else {
      return true
    }
  }
}