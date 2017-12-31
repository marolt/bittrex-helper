function ExchangeService() {

    var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            callback((xhr.status === 200) ? null : xhr.status, xhr.response);
        };
        xhr.send();
    };

    var getUSDValue = function (success, error) {
        return this.getJSON('https://blockchain.info/ticker', function (err, data) {
            if (err === null) {
                return success(data.USD.last)
            }
            return error(err);
        });
    };


    return {
        getUSDValue: getUSDValue,
        getJSON: getJSON
    }
}
