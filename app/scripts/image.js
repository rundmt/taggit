chrome.contextMenus.create({"title": "taggit", "id": "main-tag", "contexts":['image']});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.extension.getBackgroundPage().console.log('foo');
    
    //Ajax call to clarifai auth first
    
    //Ajax call to sheet. Cross-Fingers
    
    
    $.ajax({
        method: "POST",
        url: "https://script.google.com/macros/s/AKfycbyjVQF99qwWwiD5t5fpRZTHIwY9a4zNfsRoCp-10ytUUGcoHD4/exec",
        data: { url: info.srcUrl}
    })
    .done(function( msg ) {
        
        alert( msg );   
    });
});
