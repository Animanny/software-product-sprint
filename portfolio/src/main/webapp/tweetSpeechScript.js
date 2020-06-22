function getTweets(){
    alert("test");
    return;
}

function updateTweet(){
    var receivedHandle = document.getElementById('handle').value;

    //If the user typed their handle with an @, it removes it
    if(receivedHandle.charAt(0) == "@"){
        receivedHandle = receivedHandle.substr(1);
    }

    fetch("/analyzeTwitter?handle="+receivedHandle).then(() => {
        //Eventually display the best/worst tweets
    })
}