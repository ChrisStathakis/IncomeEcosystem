import moment from 'moment';


export function dateRangeFilter(date_start=moment().startOf('year'), date_end=moment().endOf('year')){
    const startDate = date_start;
    const endDate = date_end;
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
    const dateRangeString = `?date_range_after=${formattedStartDate}&date_range_before=${formattedEndDate}`;
    return dateRangeString

}

export function createDataForChart(data){
    const editData = data.map((item)=> { return {
        month: item.month,
        total:item.total, 
        z_total:item.z_total,
        pos_total: item.pos_total,
        cash_total: item.cash_total
    }});
    
    return editData

}