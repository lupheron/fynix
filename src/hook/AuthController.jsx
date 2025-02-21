
import { useEffect, useState } from 'react';
import Login from '../Layouts/Auth/Login';

function AuthController({ children }) {
    const [page, setPage] = useState("");
    const token = localStorage.getItem("token") || null;

    useEffect(() => {
        if (token) {
            setPage(children);
        } else {
            setPage(<Login />);
        }
    }, [children, token]);


    return page;

}

export default AuthController;