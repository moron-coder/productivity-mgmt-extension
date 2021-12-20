$(function () {
    const frm = $('.container');
    const bt1 = $('#ok-btn');
    var workTime = $('#work-time')[0];
    var breakTime = $('#break-time')[0];
    var hiddenContainer = $('#hidden-container');
    var resetBtn = $('#reset-btn');
    var workBar = $('.workLeft');
    var breakBar = $('.breakLeft');
    var workLeftVal = $('.show-work-left');
    var breakLeftVal = $('.show-break-left');

    hiddenContainer.hide();     //  hidden window
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
            localStorage.setItem('workTime', wt);
            localStorage.setItem('breakTime', bt);
            localStorage.setItem('state', 0);
            // state: {0(work) ; 1(break) ; 2(paused)}
        } else {
            console.log("please fill both values");
        }
    });
    // timer side
    var popupTicker = setInterval(updateTimings,1000);

    function updateTimings(){
        var workTime = localStorage.getItem('workTime');
        var breakTime = localStorage.getItem('breakTime');
        workLeftVal[0].innerText=(workTime+" minutes");
        breakLeftVal[0].innerText=(breakTime+" minutes");
    }

    resetBtn.click(() => {
        localStorage.clear();
        hiddenContainer.hide();
        frm.show();
    });
    // workLeftVal.click(() => {
    //     startWork();
    // })

    // get the value of current work and break time and update popup.html accordingly
    // get this value every second
    // so clear interval should run at popup end
    // however, since background.js is running everytime, so set interval should run
    // at background.js end
    // so, the setInterval should run at both the ends
    var updateShow = setInterval(updateShow, 1000);

    function updateShow() {

    }

    function startWork() {

    }
    function stoptWork() {

    }
    function pause() {
        // chrome.runtime.sendMessage("pause", (response) => {

        // });
    }
    function reset() {
        // chrome.runtime.sendMessage("reset", (response) => {

        // });
    }
});