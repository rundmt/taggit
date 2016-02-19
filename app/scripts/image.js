var options = {};

chrome.contextMenus.create({"title": "taggit", "id": "main-tag", "contexts":['image']});

chrome.storage.sync.get('clientId' , function(obj) {
    options.clientId = obj.clientId;
});

chrome.storage.sync.get('clientSecret' , function(obj) {
   options.clientSecret = obj.clientSecret;
});

chrome.storage.sync.get('scriptLink' , function(obj) {
   options.scriptLink = obj.scriptLink;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        options[key] = storageChange.newValue;        
    }
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    
    clarifaiAuth(options.clientId, options.clientSecret)
    .then(tagPhoto)
    .then(sendToSheet).then(function(data){
        alert(JSON.stringify(data));
    });

    function clarifaiAuth(id, secret){
        return $.ajax({
            method: "POST",
            url: "https://api.clarifai.com/v1/token/",
            data: {
                'grant_type': 'client_credentials',
                'client_id': id,
                'client_secret': secret
            }
        });
    }

    function tagPhoto(res, textStatus, jqXHR) {
        var accessToken = res['access_token'];
        return $.ajax({
            method: "POST",
            url: "https://api.clarifai.com/v1/tag/",
            data: { url: info.srcUrl},
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken); }
        });
    }

    function sendToSheet(res, textStatus, jqXHR){
        var tags = res['results'][0]['result']['tag']['classes'].join(", ")
        
        return $.ajax({
            method: "POST",
            url: 'https://script.google.com/macros/s/AKfycbyjVQF99qwWwiD5t5fpRZTHIwY9a4zNfsRoCp-10ytUUGcoHD4/exec',
            data: {
                url: info.srcUrl,
                docId: options.scriptLink,
                tags: tags
            }
        });
    }
});