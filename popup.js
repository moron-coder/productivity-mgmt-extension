$(function () {
    $('#home').click(function () {
        console.log("clicked")
        chrome.tabs.create({
            url: 'customPage/myPage.html'
        });
    });

    const frm = $('.container');
    const bt1 = $('#ok-btn');
    var workTime = $('#work-time')[0];
    var breakTime = $('#break-time')[0];
    var hiddenContainer = $('#hidden-container');
    var resetBtn = $('#reset-btn');
    var pauseBtn = $('#pause-btn');
    var workBar = $('.workLeft');
    var breakBar = $('.breakLeft');
    var workLeftVal = $('.show-work-left');
    var breakLeftVal = $('.show-break-left');

    if(localStorage.getItem('state')==null){
        hiddenContainer.hide();     //  hidden window
        frm.show();
    }else{
        hiddenContainer.show();     //  hidden window
        frm.hide();
    }
    //  form side
    frm.click((e) => {
        e.preventDefault();
    });
    bt1.click(() => {
        var wt = workTime.value, bt = breakTime.value;
        initialWorkTime = workTime.value, initialBreakTime = breakTime.value;
        if (wt && bt) {
            console.log("both set");
            frm.hide();
            hiddenContainer.show();
            localStorage.setItem('workTime', wt);
            localStorage.setItem('breakTime', bt);
            localStorage.setItem('initialWorkTime', wt);
            localStorage.setItem('initialBreakTime', bt);
            localStorage.setItem('state', 0);
            // state: {0(work) ; 1(break) ; 2(paused & work after resuming); 3(paused & break after resuming)}
        } else {
            console.log("please fill both values");
        }
    });
    // timer side
    var popupTicker = setInterval(updateTimings,500);

    function updateTimings(){
        var workTime = localStorage.getItem('workTime');
        var breakTime = localStorage.getItem('breakTime');
        var initialWorkTime = localStorage.getItem('initialWorkTime');
        var initialBreakTime = localStorage.getItem('initialBreakTime');
        workLeftVal[0].innerText=(workTime+" seconds");
        workBar.height(100*(workTime/initialWorkTime)+"%");
        breakLeftVal[0].innerText=(breakTime+" seconds");
        breakBar.height(100*(breakTime/initialBreakTime)+"%");
        var pausedState = localStorage.getItem('state');
        if(pausedState>1){
            pauseBtn[0].innerText="Resume";
        }else if(pausedState<2){
            pauseBtn[0].innerText="Pause";
        }
    }

    resetBtn.click(() => {
        localStorage.clear();
        hiddenContainer.hide();
        frm.show();
    });
    pauseBtn.click(()=>{
        var pausedState = localStorage.getItem('state');
        if(pausedState>1){
            localStorage.setItem('state', parseInt(pausedState)-2);
            pauseBtn[0].innerText="Pause";
        }else if(pausedState<2){
            localStorage.setItem('state', parseInt(pausedState)+2);
            pauseBtn[0].innerText="Resume"
        }
    });
    workLeftVal.click(() => {
        console.log("lets start working");
        localStorage.setItem('state',0);
    });
    breakLeftVal.click(() => {
        console.log("lets take break");
        localStorage.setItem('state',1);
    });

    // get the value of current work and break time and update popup.html accordingly
    // get this value every second
    // so clear interval should run at popup end
    // however, since background.js is running everytime, so set interval should run
    // at background.js end
    // so, the setInterval should run at both the ends
    // var updateShow = setInterval(updateShow, 1000);

    // function updateShow() {

    // }

    // function startWork() {

    // }
    // function stoptWork() {

    // }
    // function pause() {
    //     // chrome.runtime.sendMessage("pause", (response) => {

    //     // });
    // }
    // function reset() {
    //     // chrome.runtime.sendMessage("reset", (response) => {

    //     // });
    // }
});