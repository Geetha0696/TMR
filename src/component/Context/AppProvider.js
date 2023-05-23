import { Fragment, useEffect, useState, createContext } from "react";
const Context = createContext();

export default function AppProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState({});

    useEffect(() => {
        let data = localStorage.getItem('userToken');
        if (data) {
            setAuth(Boolean(data))
        }
    }, [])

    return (
        <Fragment>
            <Context.Provider
                value={
                    {
                        auth,
                        setAuth,
                        token,
                        setToken,
                    }
                }
            >
                {children}
            </Context.Provider>
        </Fragment >
    )
}
