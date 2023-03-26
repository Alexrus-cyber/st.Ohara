import styles from './FormCreators.module.css'
import {Field} from "redux-form";

export const InputLogin = ({input, meta: {error, warning, touched}, ...props}) => {
    const showError = touched && error;
    return (
        <div>
            <div className={styles.flex}>
                <input className={showError ? styles.inputError : styles.input} {...input} {...props}></input>
            </div>
            <div>{touched &&
                ((error && <span className={styles.error}>{error}</span>) ||
                    (warning && <span className={styles.warning}>{warning}</span>))} </div>
        </div>
    )
}

export function FieldCreator(name,
                             placeholder,
                             validators,
                             component,
                             className,
                             type) {
    return (
        <div className={className ? className : ""}>
            <Field name={name} placeholder={placeholder} validate={validators} component={component} type={type}/>
        </div>
    )
}