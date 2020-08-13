import moment from 'moment';

const formatTimeStampToUTC = (timestamp) => {
    return `${moment.utc(timestamp).format('MMMM Do YYYY, h:mm:ss a')} UTC`
}

export { formatTimeStampToUTC as default }