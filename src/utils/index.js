export function sexSelect(txt) {
    if (txt) {
        return '男'
    } else {
        return '女'
    }
}
export function timeStamp() {
    let time = new Date().getTime()
    return time
}
export default {
    sexSelect,
    timeStamp
}