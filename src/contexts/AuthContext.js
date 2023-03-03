import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import auth from '@react-native-firebase/auth';



export const AuthContext = createContext();
const initialState = { isAuthenticated: false, user: { uid: "" } }
const reducer = ((state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
            };
        case "LOGOUT":
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
})
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [state, dispatch] = useReducer(reducer, initialState);




    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
            dispatch({ type: "LOGIN", payload: { user } })
            // console.log(user)
        };
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    // const readUserData = async (user) => {

    //     const docRef = doc(firestore, "users", user.uid);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //         // console.log("Document data:", docSnap.data());
    //         let userData = docSnap.data()
    //         setUser(userData)
    //         // console.log("userData =>", userData)
    //         dispatch({ type: "LOGIN", payload: { user } });
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}