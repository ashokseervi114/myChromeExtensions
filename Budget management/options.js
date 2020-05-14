$(function() {
    
    //Setup Limit
   $('#saveLimit').click(function(){ 
    var limit = $('#limit').val();
    if(limit){
        chrome.storage.sync.set({'limit':limit},function() {
            close();
        });
    }   
   });
    
    //Reset Option
    
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0});
        close();
    });
    
    
    
});