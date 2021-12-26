const ticker = setInterval(updateTimings, 1000);

function updateTimings() {
  var workTime = localStorage.getItem('workTime');
  var breakTime = localStorage.getItem('breakTime');
  var state = localStorage.getItem('state');
  if (state != null && state == 0) {
    // work
    if (workTime > 0) {
      localStorage.setItem('workTime', workTime - 1);
      workTime = localStorage.getItem('workTime');
    } else if (breakTime > 0) {
      var notifOptions = {
        type: 'basic',
        iconUrl: '../img48.png',
        title: "Time over!!!",
        message: "Work time finished"
      };
      chrome.notifications.create('timerNotif', notifOptions);
      localStorage.setItem('breakTime', breakTime - 1);
      localStorage.setItem('state', 1);
    } else {
      localStorage.setItem('state', 2);
      var notifOptions = {
        type: 'basic',
        iconUrl: '../img48.png',
        title: "Time over!!!",
        message: "Both work and break time finished"
      };
      chrome.notifications.create('timerNotif', notifOptions);
    }
  } else if (state != null && state == 1) {
    // break
    if (breakTime > 0) {
      localStorage.setItem('breakTime', breakTime - 1);
    } else if (workTime > 0) {
      var notifOptions = {
        type: 'basic',
        iconUrl: '../img48.png',
        title: "Time over!!!",
        message: "Break time finished"
      };
      chrome.notifications.create('timerNotif', notifOptions);
      localStorage.setItem('workTime', workTime - 1);
      localStorage.setItem('state', 0);
    } else {
      localStorage.setItem('state', 2);
      var notifOptions = {
        type: 'basic',
        iconUrl: '../img48.png',
        title: "Time over!!!",
        message: "Both work and break time finished"
      };
      chrome.notifications.create('timerNotif', notifOptions);
    }
  } else if (state != null) {
    // paused
  }
}

/////////////// previous version ////////////////
setInterval(() => {
  chrome.storage.sync.get("setHr", function (result1) {
    chrome.storage.sync.get("setMin", function (result2) {
      chrome.storage.sync.get("setSec", function (result3) {
        // console.log("Hours is ", result1.setHr);
        // console.log("Minutes is ", result2.setMin);
        // console.log("Seconds is ", result3.setSec);
        var curTime = new Date();
        // console.log(curTime.getHours());
        // console.log(curTime.getMinutes());
        // console.log(curTime.getSeconds());
        var cmp1 = result1.setHr + result2.setMin + result3.setSec;
        // var cmp2 = curTime.getHours().toString() + curTime.getMinutes().toString();
        var cmp2;
        if (curTime.getHours() < 10) {
          cmp2 = "0" + curTime.getHours().toString();
        }
        else cmp2 = curTime.getHours().toString();
        /////////////////////////////////////////////
        if (curTime.getMinutes() < 10) {
          cmp2 += "0" + curTime.getMinutes().toString();
        }
        else cmp2 += curTime.getMinutes().toString();
        ////////////////////////////////////////////
        if (curTime.getSeconds() < 10) {
          cmp2 += "0" + curTime.getSeconds().toString();
        }
        else cmp2 += curTime.getSeconds().toString();
        ///////////////////////////////////////////
        // console.log(cmp1);
        // console.log(cmp2);
        if (cmp1 == cmp2) {
          // console.log("Showing notification!!");
          var notifOptions = {
            type: 'basic',
            iconUrl: '../img48.png',
            title: "Alarm!!",
            message: "Reminder!!"
          };
          chrome.notifications.create('timerNotif', notifOptions);
          chrome.storage.sync.set({ setHr: -1 });
          chrome.storage.sync.set({ setMin: -1 });
          chrome.storage.sync.set({ setSec: -1 });
        }
      });
    });
  });
}, 1000);

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });

});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
  });
});