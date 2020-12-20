import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { LANDINGPAGESTATE } from '../../Types'
import styles from './LandingPage.module.scss'
import Login from './Login'
import Signup from './Signup'

interface Props {
    state: LANDINGPAGESTATE
}

export default function LandingPage({ state }: Props): ReactElement {
    const getPageContent = (): ReactElement => {
        switch (state) {
            case LANDINGPAGESTATE.LOGIN: {
                return <Login />
            }
            case LANDINGPAGESTATE.SIGNUP: {
                return <Signup />
            }
            default: {
                //normal landing page
                return <div>dab</div>
            }
        }
    }

    const getButtonStateLogin = (): string | undefined => {
        return state === LANDINGPAGESTATE.LOGIN ? styles.buttonActive : undefined
    }

    const getButtonStateSignup = (): string | undefined => {
        return state === LANDINGPAGESTATE.SIGNUP ? styles.buttonActive : undefined
    }

    return (
        <div id={styles.landingPage}>
            <div className={styles.header}>
                <Link to="/" className={styles.logo}>
                    Pollio
                </Link>
                <div className={styles.buttonContainer}>
                    <Link to="/signup"
                        className={`${styles.signup} ${getButtonStateSignup()}`}>
                        Sign up
                        </Link>
                    <Link to="/login"
                        className={`${styles.signup} ${getButtonStateLogin()}`}>
                        Login
                        </Link>
                </div>
            </div>
            {getPageContent()}
        </div>
    )
}
