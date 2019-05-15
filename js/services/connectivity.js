function checkConnectivity(callback) {
    var xhr = new XMLHttpRequest();
    var file = "https://httpstat.us/200";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 304) {
                callback(true);
            } else {
                callback(false);
            }
        }
    }
}

export { checkConnectivity }