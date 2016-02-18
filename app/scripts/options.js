'use strict';
$(document).ready(function(){
    console.log("ready");
   $('#settings-id').submit(function(e){
       e.preventDefault();
       var clientId = $('#clientId').val();
       var clientSecret = $('#clientSecret').val();
       var scriptLink = $('#scriptLink').val();
       
       $.ajax({
            method: "POST",
            url: "https://api.clarifai.com/v1/token/",
            data: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }
        })
        .done(function( msg ) {            
            chrome.storage.sync.set({
                clientId: clientId,
                clientSecret: clientSecret,       
                accessToken: msg['access_token'],         
                scriptLink: scriptLink
            }, function() {
            // Update status to let user know options were saved.
                alert('saved');
            });                        
        });
       
   });
        // chrome.storage.sync.get('clientId' , function(x) {
        // // Update status to let user know options were saved.
        //     alert(JSON.stringify(x));
        // });
   
})