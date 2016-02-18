chrome.contextMenus.create({"title": "taggit", "id": "main-tag", "contexts":['image']});
var clientId, clientSecret, scriptLink;

chrome.storage.sync.get('clientId' , function(obj) {
    clientId = obj.clientId;        
});

chrome.storage.sync.get('clientSecret' , function(obj) {
   clientSecret = obj.clientSecret;        
});

chrome.storage.sync.get('scriptLink' , function(obj) {
   scriptLink = obj.scriptLink;        
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {       
    //Ajax call to clarifai auth first    
    // $.ajax({
    //     method: "POST",
    //     url: "https://api.clarifai.com/v1/token/",
    //     data: {
    //             'grant_type': 'client_credentials',
    //             'client_id': clientId,
    //             'client_secret': clientSecret
    //           }
    // })
    // .done(function( msg ) { 
    //      var accessToken = msg['access_token'];         
    //      $.ajax({
    //         method: "POST",
    //         url: "https://api.clarifai.com/v1/tag/",
    //         data: { url: info.srcUrl},
    //         beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken); }
    //     })
    //     .done(function( response ) {
    //         var tagData = response['results'][0]['result']['tag']['classes'].join(", ");                  
    //         alert(tagData);
    //     });
    // });
    
    
    
    //Ajax call to sheet. Cross-Fingers  
    $.ajax({
        method: "POST",
        url: scriptLink,
        data: { 
                url: info.srcUrl,
                docId: '1DjSqLjyQhy5kvbfTS0kkbWpYfwVojL2aX1GipgLJNM8',
                tags: 'tree, green, forrest, stuff'
              }
    })
    .done(function( msg ) {
        
        alert( msg );   
    });
});

function tagPhoto(msg) {
        var accessToken = msg['access_token'];          
         $.ajax({
            method: "POST",
            url: "https://api.clarifai.com/v1/tag/",
            data: { url: info.srcUrl},
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken); }
        })
        .done(function( msg ) {      
            alert( msg );   
        });
    }