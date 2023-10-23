async function fetchData(statusQuery, page){
    const response = await axios.get(`https://jsonmock.hackerrank.com/api/iot_devices/search?status=${statusQuery}&page=${page}`);
    return response.data;
}

async function numDevices(statusQuery, threshold, dateStr){
    const [month, year] = dateStr.split('-').map(value => parseInt(value, 10));

    let responseJson = [];
    responseJson.push(await fetchData(statusQuery, 1));
    for(let i = 2; i <= responseJson[0].total_pages; i ++){
        responseJson.push(await fetchData(statusQuery, i));
    }

    let devicesList = [];
    responseJson.forEach(item => {
        item.data.forEach(device => {
            let date = new Date(device.timestamp);
            if(date.getMonth() == month - 1 && date.getFullYear() == year){
                devicesList.push(device);
            }
        })
    })

    devicesList.forEach(item => {
        if(item.operatingParams.rootThreshold < threshold){
            devicesList.pop(item);
        }
    })

    return(devicesList.length);
}

async function main(){
    console.log(await numDevices("STOPPED", 45, "04-2019"));
}

main();