import { useState, ChangeEvent, FormEvent } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { FormInput } from '../form-input/form-input.component'

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
                <FormInput 
                    label="Display Name"
                    type="text" 
                    onChange={handleInputChange} 
                    name="displayName" 
                    value={displayName}
                    requred
                />

                <FormInput 
                    label="Email"
                    type="email" 
                    onChange={handleInputChange} 
                    name="email" 
                    value={email}
                    requred
                />

                <FormInput 
                    label="Passowrd"
                    type="password" 
                    onChange={handleInputChange} 
                    name="password" 
                    value={password}
                    requred
                />

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    onChange={handleInputChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                    requred
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}