import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth, signinWithGoogleRedirect } from "../../utils/firebase/firebase.utils"

export default function SignIn() {
    useEffect(() => {
        const loadSignIn = async () => {
            const response = await getRedirectResult(auth)
            if (response) {
                const user = await createUserDocumentFromAuth(response.user)
                console.log({user})

            }
        }
        loadSignIn()
    }, [])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp()
        const user = await createUserDocumentFromAuth(response.user)
        console.log({response, user})
    }

    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign In with Google</button>
        <button onClick={signinWithGoogleRedirect}>Sign In with Google Redirect</button>
        </div>
    )
}