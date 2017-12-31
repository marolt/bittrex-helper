function USDPriceObserver() {
    var setBTCtoUSD = function(value) {
        this.BTCtoUSD = value;
    };

    var observeWallet = function () {
        var BTCtoUSD = this.BTCtoUSD;
        var walletObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if ((mutation.addedNodes[i].cells) && (mutation.addedNodes[i].cells.length > 7)) {
                        var BTCval = mutation.addedNodes[i].cells[7].innerText;
                        if ((BTCval.indexOf('$') === -1) && (BTCval > 0)) {
                            var next = (BTCval *  BTCtoUSD).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
                            mutation.addedNodes[i].cells[7].innerHTML += "  <small>(" + next + ")</small>";
                        }
                    }
                }
            });
        });
        var balanceTable = document.getElementById('balanceTable');
        if (balanceTable) {
            walletObserver.observe(balanceTable, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    };

    var observeMarket = function () {
        var BTCtoUSD = this.BTCtoUSD;
        var observerBalance = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type = 'characterData') {
                    var value = mutation.target.textContent;
                    if (mutation.target.parentElement.innerText.indexOf('$') === -1) {
                        var el = document.createElement("small");
                        el.textContent = "(" + (value *  BTCtoUSD).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ")";
                        el.style.paddingRight = "10px";
                        mutation.target.parentElement.prepend(el);
                    }
                }
            });
        });

        var availableCurrency = document.getElementById('availableBaseCurrency');
        if (availableCurrency) {
            observerBalance.observe(availableCurrency, {
                subtree: true,
                characterDataOldValue: true
            });

            ['total_Buy', 'price_Buy', 'total_Sell', 'price_Sell'].forEach(function (target) {
                var input = document.getElementsByName(target)[0];
                input.onmouseover = input.onchange = function (mutation) {
                    var value = mutation.target.value;
                    mutation.target.parentElement.lastElementChild.innerHTML = "BTC<small style=\"position:  absolute;left: 110px;z-index: 999;\">"
                        + "(" + (value *  BTCtoUSD).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ")" + "</small>";
                };
            });

        }
    };

    return {
        setBTCtoUSD: setBTCtoUSD,
        observeWallet: observeWallet,
        observeMarket: observeMarket
    };
}
