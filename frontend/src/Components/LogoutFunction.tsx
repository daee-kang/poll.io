import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../Auth'

export default function LogoutFunction() {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        Auth.deauthenticateUser()
        setRedirect(true)
    }, [])

    return (
        <div>
            <p>logging out</p>

            {redirect ? <Redirect to="/" /> : null}
        </div>
    )
}
