import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../components/Login/Practice/database/firebase'

export const authContext = createContext();
export function useAuth (){
   const context = useContext(authContext)
   return context
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const signup = (email , password ) => 
        createUserWithEmailAndPassword(auth, email, password);
    const login = async (email, password ) =>
        signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth)
    const loginWithGoogle =  () => {
        const googleProvider =  new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
    },[])
    return (
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle}}>
             {children}
        </authContext.Provider>
    )
}


