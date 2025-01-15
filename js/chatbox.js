console.log("chatbox script loaded");

const chatbox = document.getElementById("chat-container");
const bg = document.getElementsByClassName("content");
const pop = document.getElementsByClassName("popup");

function clickForChat() {
    if (chatbox.style.display == "flex") {
        chatbox.style.display = "none";
        return;
    } else {
        chatbox.style.display = "flex";
    }
    if (window.innerWidth < 768) {
        pop.style.bottom = "400px"; 
    } else {
        pop.style.bottom = "20px"; 
    }
}

function clickOutside() {
    chatbox.style.display = "none";
}