import React, { ReactElement, useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function LogoutButton(): ReactElement {
    const [redirect, setRedirect] = useState(false)

    const logoutPage = () => {
        setRedirect(true)
    }

    return (
        <>
            <button onClick={logoutPage}>Logout</button>
            {redirect ? <Redirect to="/logout" /> : null}
        </>
    )
}
