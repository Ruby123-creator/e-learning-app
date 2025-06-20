import axios from "axios"
import { API_ENDPOINTS } from "../../../utils/api-endpoints"



export const signUp = (payload)=>{
   console.log(payload);
    return (dispatch=>{
        return axios.post(`${API_ENDPOINTS.REGISTER}`,payload).then(res=>{
            console.log(res,"Responsedata")
             if(res.status === 200){
                return res;
             }
            // dispatch({type:PRODUCT_DETAILS?.FETCH_ALL_PRODUCTS, data:{pageNo: payload?.pageNumber, list: res?.data}})
        }).catch((err)=>{
            console.log(err)
            // showToasterMessage({messageType:'error',description:err||"Some error occured"});
        })
    })
}