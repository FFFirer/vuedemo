import axios from 'axios'

let testapi = {};

// axios.defaults.baseUrl = "https://flights.ctrip.com";
axios.defaults.baseURL = '/spider'


// const params = {
//     "flightWay": "Oneway",
//     "classType": "ALL",
//     "hasChild": false,
//     "hasBaby": false,
//     "searchIndex": 1,
//     "date": "2020-10-01",
//     "airportParams": [{
//         "dcity": "SHA",
//         "acity": "URC",
//         "dcityname": "上海",
//         "acityname": "乌鲁木齐",
//         "date": "2020-10-01",
//         "dcityid": 2,
//         "acityid": 39
//     }],
//     "token": "624e8a966a3b5d3298f64dd528ed4ef9"
// };

testapi.getFlights = function (token, callback) {
    console.log('ready to get')
    axios.get('/api/ctrip/plan?deaprtureTime=2020-10-02&dcity=上海&acity=乌鲁木齐')
    .then(response => {
        let result = null;
        // console.log(response);
        if(response.status === 200){
            result = response.data;
        }

        // console.log(response.data);
        typeof callback === 'function' && callback.call(window, result);
        return result;
    })
    .catch(function (err) {
        console.error(err)
    });
}

export default testapi;