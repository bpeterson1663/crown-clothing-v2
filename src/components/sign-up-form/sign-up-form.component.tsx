import { useState, ChangeEvent, FormEvent } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm () {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields({...defaultFormFields})
    }

    const handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return
        }
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth (user, { displayName })
            resetFormFields()
            
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                alert("email address already in use")
                return
            }
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input required type="text" onChange={handleInputChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input required type="email" onChange={handleInputChange} name="email" value={email} />

                <label>Password</label>
                <input required type="password" onChange={handleInputChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input required type="password" onChange={handleInputChange} name="confirmPassword" value={confirmPassword}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}