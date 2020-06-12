import axios from 'axios'

const testapi = {};

// axios.defaults.baseUrl = "https://flights.ctrip.com";

const params = {
    "flightWay": "Oneway",
    "classType": "ALL",
    "hasChild": false,
    "hasBaby": false,
    "searchIndex": 1,
    "date": "2020-10-01",
    "airportParams": [{
        "dcity": "SHA",
        "acity": "URC",
        "dcityname": "上海",
        "acityname": "乌鲁木齐",
        "date": "2020-10-01",
        "dcityid": 2,
        "acityid": 39
    }],
    "token": "624e8a966a3b5d3298f64dd528ed4ef9"
};



testapi.getFlights = function () {
    var result= {};
    axios.post('https://flights.ctrip.com/itinerary/api/12808/products', params, {
        headers: {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'content-type': 'application/json'
        }
    })
    .then(response => result = response.data)
    .catch(function (err) {
        console.error(err)
    });
    return result
}

export default testapi;