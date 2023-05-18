import { Fragment, useEffect, useState } from "react";
import Context from "./context";

export default function AppProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [ads, SetAds] = useState([]);
    const [paymetType, setpaymetType] = useState('');
    const [companydetails, setCompanydetails] = useState('');
    const [carddetails, setCarddetails] = useState({});
    const [artDetails, setArtDetails] = useState({});
    const [obj, SetObj] = useState({});
    useEffect(() => {
        let data = localStorage.getItem('auth');
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
                        SetAds,
                        ads,
                        paymetType,
                        setpaymetType,
                        companydetails,
                        setCompanydetails,
                        carddetails,
                        setCarddetails,
                        artDetails,
                        setArtDetails,
                        SetObj,
                        obj
                    }
                }
            >
                {children}
            </Context.Provider>
        </Fragment >
    )
}
