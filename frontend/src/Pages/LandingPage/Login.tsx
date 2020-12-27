import React, { ReactElement, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { api, stringify, header } from '../../api'
import Auth from '../../Auth'
import styles from './LandingPage.module.scss'


export default function Login(): ReactElement {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        api.post('/login', stringify({
            username,
            password
        }), header).then(response => {
            if (response.status === 200) {
                Auth.authenticateUser(response.data.token)

                setRedirect(true)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }

    return (
        <div id={styles.loginPage}>
            <div className={styles.title}>
                LOG IN UP THIS BITCH
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
                    &nbsp;&nbsp;Password
                    <input className={styles.textbox} type="password" name="password"
                        value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)
                        }} />
                </label>

                <button className={styles.submit} type="submit" >Login</button>
            </form>


            {redirect ? <Redirect to="/" /> : null}
        </div>
    )
}
