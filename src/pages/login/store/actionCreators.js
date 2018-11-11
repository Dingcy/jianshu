import axios from 'axios';
import * as constants from './constants';

const handleLoin = (data) => {
    return {
        type:constants.LOGIN_DATA,
        login:data
    }
}
export const login = (account,password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account='+account+'&password='+password).then((res) =>{
            let result = res.data.data;
            if(result){
                dispatch(handleLoin(result));
            }
        })
    }
} 

export const logout = () => ({
            type:constants.LOGOUT,
            data:false

})