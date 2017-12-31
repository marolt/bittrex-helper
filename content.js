(new ExchangeService).getUSDValue(function (value) {
    var $observers = new USDPriceObserver();
    $observers.setBTCtoUSD(value);
    $observers.observeWallet();
    $observers.observeMarket();
}, function (error) {
    console.error(error);
});