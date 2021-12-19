console.log("background.js running");

var workTime = -1, breakTime = -1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message[0] === "start-working") {
        console.log("work time left: ",message[1]-1);
        sendResponse(message[1]-1);
    }else if(message[0] === "stop-working"){

    }else if(message[0] === "pause"){

    }else{

    }
  });