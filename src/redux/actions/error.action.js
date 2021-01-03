
export const setError = (errrorMsg) => {
    let payload;
    if(errrorMsg) {
        payload = {
            message: errrorMsg.message,
            statusCode: errrorMsg.statusCode
        }
    }
    else {
        payload = {
            message: '',
            statusCode: null
        }
    }

    return payload;
}