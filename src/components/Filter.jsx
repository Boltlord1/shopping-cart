import styles from '../styles/shop.module.css'

export default function Filter({ name, id, change }) {

    return (
        <div className={styles.filter}>
            <input type="checkbox" name={id} id={id} value={name.toLowerCase()} onChange={change} />
            <label htmlFor={id}>{name}</label>
        </div>
    )
}