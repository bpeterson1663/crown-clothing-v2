import { PropsWithChildren } from 'react'
import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'gooogle-sign-in',
    inverted: 'inverted',
    default: 'default'
}
type ButtonType = keyof typeof BUTTON_TYPE_CLASSES;

interface Props extends PropsWithChildren {
    buttonType: ButtonType
    type: "submit" | "reset" | "button" | undefined
}

export default function Button({children, buttonType, ...otherProps}: Props) {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}