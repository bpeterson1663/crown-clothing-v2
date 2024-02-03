import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
export default function SignIn() {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp()
        const user = await createUserDocumentFromAuth(response.user)
    }

    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign In with Google</button>
        <SignUpForm />
        </div>
    )
}