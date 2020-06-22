function getTweets(){
    alert("test");
    return;
}

function updateTweet(e){
    e.preventDefault();

    document.getElementById('analyzing').style.display = "inline";
    document.getElementById('worstTweetLink').style.display = "none";


    var receivedHandle = document.getElementById('handle').value;

    //If the user typed their handle with an @, it removes it
    if(receivedHandle.charAt(0) == "@"){
        receivedHandle = receivedHandle.substr(1);
    }

    fetch("/analyzeTwitter?handle="+receivedHandle).then((response) => response.json()).then((tweet) => {
        //Eventually display the best/worst tweets
        document.getElementById('analyzing').style.display = "none";
        document.getElementById('worstTweetLink').innerHTML = tweet;
        document.getElementById('worstTweetLink').setAttribute("href",tweet);
        document.getElementById('worstTweetLink').style.display = "inline";

    })
}