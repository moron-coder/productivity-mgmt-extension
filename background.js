const ticker = setInterval(updateTimings,1000);

function updateTimings(){
    var workTime = localStorage.getItem('workTime');
    var breakTime = localStorage.getItem('breakTime');
    var state=localStorage.getItem('state');
    if(state!=null && state == 0){
        // work
        if(workTime>0){
            localStorage.setItem('workTime', workTime-1);
            workTime=localStorage.getItem('workTime');
        }else if(breakTime>0){
            localStorage.setItem('breakTime', breakTime-1);
            localStorage.setItem('state', 1);
        }else{
            localStorage.setItem('state', 2); 
        }
    }else if(state!=null && state == 1){
        // break
        if(breakTime>0){
            localStorage.setItem('breakTime', breakTime-1);
        }else if(workTime>0){
            localStorage.setItem('workTime', workTime-1);
            localStorage.setItem('state', 0);
        }else{
            localStorage.setItem('state', 2); 
        }
    }else if(state!=null){
        // paused
    }    
}