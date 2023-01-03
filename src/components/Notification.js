const Notification = ({message, error}) => {
    if (error === false) {
        return null
    } else {
        return(
            <div className="error">{message}</div>
        )
    }
}

export default Notification