import React, { ReactElement } from 'react'
import styles from './LandingPage.module.scss'

interface Props {

}

export default function LandingPage({ }: Props): ReactElement {
    return (
        <div id={styles.landingPage}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    Pollio
                </div>
                <button className={styles.login}>Sign up</button>
            </div>
        </div>
    )
}
