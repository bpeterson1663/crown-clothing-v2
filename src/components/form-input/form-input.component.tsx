import { ChangeEvent } from "react"

import './form-input.styles.scss'

interface Props {
    label: string
    name: string
    type: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: string
    requred?: boolean
}

export function FormInput(props: Props) {
    const { label, value } = props
    return (
        <div className="group">
            <input className="form-input" {...props}/>
            <label 
                className={`${value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>
        </div>
    )
}