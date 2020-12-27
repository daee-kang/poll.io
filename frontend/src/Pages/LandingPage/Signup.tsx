import React, { ReactElement, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { api, stringify, header } from '../../api'
import Auth from '../../Auth'
import styles from './LandingPage.module.scss'

export default function Signup(): ReactElement {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        console.log(error)
    }, [error])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setError("")
        if (checkForLocalErrors()) {
            console.log("here")
            return
        }

        api.post('/signup', stringify({
            username,
            email,
            password,
        }), header).then(response => {
            if (response.data.name === "MongoError") {
                if (response.data.keyValue["username"] !== undefined) {
                    //username is taken
                    setError("Username taken")
                } else if (response.data.keyValue["email"] !== undefined) {
                    //email is taken
                    setError("Email in use")
                }
            } else {
                setRedirect(true)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }

    //return true if there are errors
    const checkForLocalErrors = (): boolean => {
        let index = 0
        let out = ""

        if (!validateEmail(email)) {
            out += `${++index}. Not a valid email.\r\n`
        }

        let res = validatePassword(out, index)
        out = res.out
        index = res.index

        setError(out)
        console.log(error)

        return out === "" ? false : true
    }

    const validatePassword = (out: string, index: number): { out: string, index: number } => {
        if (password.length < 8 || password.length > 16) {
            out += `${++index}. Password is must be between 8-16 characters.\r\n`
        }

        return { out, index }
    }

    const validateEmail = (email: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div id={styles.signupPage}>
            <div className={styles.title}>
                Start polling 😎
            </div>
            <div className={`${styles.error} ${error === "" ? styles.hide : null}`}>
                {error}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    &nbsp;&nbsp;Username
                    <input className={styles.textbox} type="text" name="username"
                        value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(event.target.value)
                        }} />
                </label>

                <label className={styles.label}>
                    &nbsp;&nbsp;Email
                    <input className={styles.textbox} type="text" name="email"
                        value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value)
                        }} />
                </label>

                <label className={styles.label}>
                    &nbsp;&nbsp;Password
                    <input className={styles.textbox} type="password" name="password"
                        value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)
                        }} />
                </label>

                <label className={styles.label}>
                    &nbsp;&nbsp;Confirm Password
                    <input className={styles.textbox} type="password" name="password"
                        value={confirmPassword} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(event.target.value)
                        }} />
                </label>

                <button className={styles.submit} type="submit" >Sign up &nbsp;➞</button>
            </form>
            {redirect ? <Redirect to="/login" /> : null}
        </div>
    )
}
