var contextMenuItem = {
    
    "id": "spendMoney",
    "title": "SpendMoney",    //onRightClick Appearnace
    "contexts": ["selection"]   //when to appear(on selection)
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) && 
            parseInt(Number(value)) == value &&
        !isNaN(parseInt(value,10));
}
//context handle
chrome.contextMenus.onClicked.addListener(function(clickData){
    
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if(isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total','limit'],function(budget){
                var newTotal =0;
                if(budget.total) {
                    
                    newTotal +=parseInt(budget.total);
                }
                newTotal +=parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal},function() {
                    if(newTotal>= budget.limit) {
                        
                        var notifOptions = {
                       type :"basic",
                       iconUrl: "icon16.png",
                       title:"Limit Reached",
                       message:"Ahho, u have reached"
                   };
                   chrome.notifications.create('limitNotif',notifOptions);
                        
                        //to show notfication again and again
                    chrome.notifications.clear('limitNotif');     
                        
                    }
                });
                
                
            });
        }
    }
    
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});



