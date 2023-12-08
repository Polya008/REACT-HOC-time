import moment from "moment"

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function WithWrapper(dataWrapper) {
    
    if (typeof dataWrapper !== 'function') {
        throw new Error('dataWrapper is not a function');
    }


    return function (Component) {
        const func = function (props) {
            const newData = dataWrapper(props);

            return <Component date={newData} />;
        };

        const componentName = Component.displayName || Component.name || 'Component';
        func.displayName = `WithData${componentName}`;

        return func;
    };
}

const DateTimePretty = WithWrapper(
    ({ date }) => {
        const time = moment(date)
        const timeNow=moment()
        const diff = timeNow.diff(time)
        console.log('TIME',diff)
if(moment(diff).subtract('hours',1)<0){
    return `${moment(diff).format('m')} минут назад`
}
        if(moment(diff).subtract('hours', 1)>0 && (moment(diff).subtract('hours', 24)<0)){
            return `${moment(diff).format('h')} часов назад`
        }else
        return `${moment(diff).format('D')} дней назад`
    }
)
const DateTimeWithWrapper = DateTimePretty(DateTime)
export default DateTimeWithWrapper