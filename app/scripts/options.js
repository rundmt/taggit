'use strict';
$(document).ready(function(){
   var clientId = $('#clientId').val();
   var clientSecret = $('#clientSecret').val();
   var scriptLink = $('#scriptLink').val();
    
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