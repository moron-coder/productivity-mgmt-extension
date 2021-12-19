$(function () {
    var wtl = -1, btl = -1;
    const frm = $('.container');
    const bt1 = $('#ok-btn');
    var workTime = $('#work-time')[0];
    var breakTime = $('#break-time')[0];
    var hiddenContainer = $('#hidden-container');
    var resetBtn = $('#reset-btn');
    var workBar = $('.workLeft');
    var breakBar = $('.breakLeft');
    var workLeftVal = $('.work-left-val');
    var breakLeftVal = $('.break-left-val');

    hiddenContainer.hide();     //  hidden window
    //  give functionality
    //  form side
    frm.click((e) => {
        e.preventDefault();
    });
    bt1.click(() => {
        var wt = workTime.value, bt = breakTime.value;
        if (wt && bt) {
            console.log("both set");
            frm.hide();
            hiddenContainer.show();
            wtl = workTime.value, btl = breakTime.value;
            console.log(wtl," is work time and ",btl," is break time left");
        } else {
            console.log("please fill both values");
        }
    });
    // timer side
    resetBtn.click(()=>{
        hiddenContainer.hide();
        frm.show();
    });
    workLeftVal.click(()=>{
        startWork();
    })
    // sending msg to background.js to tick every second
    function startWork(){
        // console.log("starting work");
        chrome.runtime.sendMessage(["start-working",wtl], (response) => {
            console.log(response," is reponse");
        });
    }
    function stoptWork(){
        // chrome.runtime.sendMessage("stop-working", (response) => {
        
        // });
    }
    function pause(){
        // chrome.runtime.sendMessage("pause", (response) => {
        
        // });
    }
    function reset(){
        // chrome.runtime.sendMessage("reset", (response) => {
        
        // });
    }    
});