export default isClassInPast = (date) => {
    let now = new Date()
    if(now - new Date(date) > 0) {
        return true
    }
}