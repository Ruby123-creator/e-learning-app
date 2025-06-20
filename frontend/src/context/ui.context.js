import { createContext, useContext, useMemo, useReducer } from "react"



const initialState = {
   userData:"Ruby Pal",
}


export const UIContext = createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state,action){
  switch(action.type){
   case "SET_USER_DATA":
       return {
        ...state, userData:action?.data
      }
  }
}

export function UIProvider(props){
    const [state,dispatch] = useReducer(uiReducer,initialState);

    const authorize = (data) => dispatch({ type: 'SET_USER_DATA' ,data:data});
  const value = useMemo(()=>({
    ...state,
    authorize,
  }),[state]);
  return <UIContext.Provider value={value} {...props}/>
}


export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
      throw new Error(`useUI must be used within a UIProvider`);
    }
    return context;
  };