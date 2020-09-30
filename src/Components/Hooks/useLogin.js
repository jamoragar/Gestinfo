import { useReducer, useEffect } from 'react';

const appReducer = (state, action) => {
   switch (action.type) {
       case 'LOGIN':
           return {
               login: action.payload
           };
       case 'LOGOUT':
           return{
               order: false
           }
       default:
           break;
   }
};

export function useLogin() {
   const initialState = {
      login: false
  }
   const [login, setLogin] = useReducer(appReducer, [], () => {
      const persisted = JSON.parse(localStorage.getItem('login'))
      return persisted ? persisted : initialState
   });
   useEffect(() => {
      localStorage.setItem('login', JSON.stringify(login))
   }, [login])

   return {
      login,
      setLogin
   }
}