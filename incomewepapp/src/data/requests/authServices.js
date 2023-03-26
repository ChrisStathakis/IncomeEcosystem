import { TOKEN_ENDPOINT } from '../../data/endpoints'

class AuthService {
    login(username, password){
        return axios.post(TOKEN_ENDPOINT).
            then(respData=>{

        })
    }
}