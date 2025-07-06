import './classes.css';

function Classes({title, info, title2, info2}) {
    return (
        <div className="job">
            <h3>{title}</h3>
            <h4>{info}</h4>
            <br></br>
            <h3>{title2}</h3>
            <h4>{info2}</h4>
        </div>
    )
}

export default Classes