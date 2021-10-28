import axios from 'axios'
class HelloWorldService{
    executeHelloWorldService(){
        // console.log("Service Called")
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService(){
        // console.log("Service Called")
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name){
        // console.log("Service Called")
        
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
    }

}

export default new HelloWorldService()