import { useState, ChangeEvent } from 'react'

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

    const handleSubmit = () => {

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