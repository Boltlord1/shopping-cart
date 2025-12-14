export default function Filter({ name, id, change }) {

    return (
        <div>
            <input type="checkbox" name={id} id={id} value={name} onChange={change} />
            <label htmlFor={id}>{name}</label>
        </div>
    )
}