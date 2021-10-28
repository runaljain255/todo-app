import axios from 'axios'

class AuthenticationService{
    executeBasicAuthenticationService(username,password){
        let basicAuthHeaderString = 'Basic ' + window.btoa(username+':'+password)

        return axios.get('http://localhost:8080/basicauth',{headers: {authorization: basicAuthHeaderString}})
    }

    executeJwtAuthenticationService(username,password){

        return axios.post('http://localhost:8080/authenticate',{username,password})
    }

    registerSuccessfulLogin(username,password){
        let basicAuthHeaderString = 'Basic ' + window.btoa(username+':'+password)

        sessionStorage.setItem('authenticatedUser',username)
        this.setupAxiosInterceptor(basicAuthHeaderString)
    }

    registerSuccessfulLoginForJwt(username,token){
        let JwtAuthHeaderString = 'Bearer ' + token

        sessionStorage.setItem('authenticatedUser',username)
        this.setupAxiosInterceptor(JwtAuthHeaderString)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
        }
        
    getUserName(){
    let user = sessionStorage.getItem('authenticatedUser')
    if(user===null) return null
    return user
    }
    
    setupAxiosInterceptor(basicAuthHeaderString){

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                config.headers.authorization = basicAuthHeaderString
                }
                return config
            }
        )
    }
        
}

export default new AuthenticationService();