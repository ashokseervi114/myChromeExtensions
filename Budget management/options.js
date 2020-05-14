$(function() {
    
    //get value limit if already exists
    
    chrome.storage.sync.get('limit', function(budget) {
        $('#limit').val(budget.limit);
    });
    
    
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
        chrome.storage.sync.set({'total':0},function(){
            var notifOptions = {
                       type :"basic",
                       iconUrl: "icon16.png",
                       title:"Total Reset Success",
                       message:"Total Set to :0"
                   };
            chrome.notifications.create('limitNotIf',notifOptions)
            
        });
        
    
    });
    
    
    
});