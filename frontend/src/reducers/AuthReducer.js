
const initialState={
    
}



export const AuthReducer =(state=initialState, action)=>{

    switch(action.type){
        // case PRODUCT_DETAILS.FETCH_ALL_PRODUCTS:
        //     return {...state, allProducts:{
        //         ...state?.allProducts,
        //         [action?.data?.pageNo||1]: action?.data?.list
        //     }}
        default:
            return state;
    }
}