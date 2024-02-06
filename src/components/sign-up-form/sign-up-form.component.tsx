import { useState, ChangeEvent, FormEvent } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { FormInput } from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'

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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
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

                <Button buttonType="default" type="submit">Submit</Button>
            </form>
        </div>
    )
}