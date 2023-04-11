import styles from './FormCreators.module.css'
import {Field} from "redux-form";
import {getFile} from "../../../../../slices/landing";
import {useDispatch} from "react-redux";
import {memo} from "react";

export const InputUI = memo(({input:{value}, input, meta: {error, warning, touched},title,typeInput,...props}) => {
    const showError = touched && error;

    return (
        <div className={styles.text}>
            <label className={styles.containerInput}>
                {value !== '' &&  <p className={styles.titleInput}>{title}</p>}
                {typeInput === 'text' && <textarea className={showError ? styles.textAreaError : styles.textArea} {...input} {...props}/>}
                {typeInput === 'input' &&  <input placeholder={"Заголовок"} className={showError ? styles.inputTitleEr : styles.inputTitle} {...input} {...props}></input>}
                {typeInput === 'reg' &&  <input className={showError ? styles.inputError : styles.input} {...input} {...props}></input>}
            </label>
            <div>{touched &&
                ((error && <span className={styles.error}>{error}</span>) ||
                    (warning && <span className={styles.warning}>{warning}</span>))} </div>
        </div>
    )
})
export const FilesInput = memo(({input: {value}, meta: {error, warning, touched}, type, name, style, setImageUrl, id}) => {
    const fileReader = new FileReader();
    const dispatch = useDispatch();
    fileReader.onloadend = () => {
        setImageUrl(fileReader.result)
        dispatch( getFile({id, file:fileReader.result})) ;
    }

    const onChange = e => {
        const file = e.target.files[0];
    /*    dispatch( getFile(file)) ;*/
        fileReader.readAsDataURL(file);
        e.target.files = null;
    };
    return (
            <div>
                <label className={styles.label}>
                    <input onChange={onChange} className={styles.file} placeholder={"Заголовок"} type={type} name={name} style={style}></input>
                    <span className={styles.span}>Загрузить</span>
                </label>
            </div>
    )
})

export const FieldCreator = (keyId, name, placeholder, validators, component, className, type, typeInput) => {
    return (
        <div key={keyId} className={className ? className : ""}>
            <Field  name={name} placeholder={placeholder} validate={validators} component={component} typeInput={typeInput} title={''} type={type}/>
        </div>
    )
}