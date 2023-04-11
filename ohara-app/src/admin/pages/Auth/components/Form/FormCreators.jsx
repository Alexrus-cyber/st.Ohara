import styles from './FormCreators.module.css'
import {Field} from "redux-form";
import {Component} from "react";



export const TextAreaForm = ({input, meta: {error, warning, touched}, ...props}) => {
    const showError = touched && error;
    return (
        <div className={styles.text}>
            <label className={styles.containerInput}>
                <p className={styles.titleInput}>Текст</p>
                <textarea className={showError ? styles.textAreaError : styles.textArea} {...input} {...props}/>
            </label>
            <div className={styles.containerError}>{touched &&
                ((error && <p className={styles.error}>{error}</p>) ||
                    (warning && <p className={styles.warning}>{warning}</p>))} </div>
        </div>
    )
}
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
export const InputTitles = ({input, meta: {error, warning, touched}, ...props}) => {
    const showError = touched && error;
    return (
        <div className={styles.text}>
            <label className={styles.containerInput}>
                <p className={styles.titleInput}>Заголовок</p>
                <input placeholder={"Заголовок"} className={showError ? styles.inputTitleEr : styles.inputTitle} {...input} {...props}></input>
            </label>
            <div>{touched &&
                ((error && <span className={styles.error}>{error}</span>) ||
                    (warning && <span className={styles.warning}>{warning}</span>))} </div>
        </div>
    )
}

export class FileInput extends Component {
    onChange = e => {
        e.preventDefault();
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0]);
    };

    render() {

        let {meta: {touched, error}} = this.props; // достаем value из props.input

        return (
            <>
                <input onChange={this.onChange} placeholder={"Заголовок"}  {...this.input} {...this.props}></input>
                <div>{touched &&
                    (error && <span className={styles.error}>{error}</span>)
                        } </div>
            </>
        )
    }
}

export function FieldCreator(keyId, name, placeholder, validators, component, className, type) {
    return (
        <div key={keyId} className={className ? className : ""}>
            <Field  name={name} placeholder={placeholder} validate={validators} component={component} type={type}/>
        </div>
    )
}