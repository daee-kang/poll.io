import React, { ReactElement } from 'react'
import LogoutButton from '../../Components/LogoutButton'

interface Props {

}

export default function Home({ }: Props): ReactElement {
    return (
        <div>
            <LogoutButton />
        </div>
    )
}
