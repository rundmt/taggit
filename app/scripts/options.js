'use strict';
var clientId, clientSecret, scriptLink;

chrome.storage.sync.get('clientId' , function(obj) {    
    clientId = obj.clientId;
    $('#clientId').val(clientId);
});

chrome.storage.sync.get('clientSecret' , function(obj) {
    clientSecret = obj.clientSecret;       
    $('#clientSecret').val(clientSecret); 
});

chrome.storage.sync.get('scriptLink' , function(obj) {
    scriptLink = obj.scriptLink;
    $('#scriptLink').val(scriptLink);    
});


$(document).ready(function(){   
   $('#settings-id').submit(function(e){
       e.preventDefault();
       var clientId = $('#clientId').val();
       var clientSecret = $('#clientSecret').val();
       var scriptLink = $('#scriptLink').val();

       chrome.storage.sync.set({
            clientId: clientId,
            clientSecret: clientSecret,           
            scriptLink: scriptLink
       }, function() {
           $('#alert-node').html('Preferences Have Been Saved');            
       });
   });
})