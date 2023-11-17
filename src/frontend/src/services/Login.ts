import axios from "axios";

const baseUrl = "http://localhost:8000"

const UserCommunication = {
    authUser: async(email: String, pass: String) => {
        try{
            const auth = await axios.post(`${baseUrl}/v1/user/login`,{
                email: email,
                pass: pass
            })
            return auth;
        } catch(error){
            console.log(error);
            return error;
        }
        
        
    }
}

export default UserCommunication;