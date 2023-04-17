const socket = io();

const senderInput = document.querySelector('#sender');
const messageInput = document.querySelector('#message');
const btnSUB  = document.querySelector("#btnSUB");
const feedback = document.querySelector("#feedback");
const output = document.querySelector("#output");

btnSUB.addEventListener('click',(e) => { 
    e.preventDefault();
    const message = messageInput.value;
    const sender = senderInput.value;
    const id = socket.id;
    if(message.trim()!== '' && sender.trim()!==''){
        socket.emit('chat-message',{message,sender,id});
        messageInput.value = "";
        // senderInput.value = "";
    }
});
socket.on('chat-message',(data) => { 
    feedback.innerHTML = '';
    let pos = "start";
    if(socket.id == data.id)
    {
        pos = 'end';      
    }
    let name = `<div><h5 id="feedback" class="text-white m-0 small p-2 rounded-3" style="background-color: #23d67a;text-transform:uppercase">${data.sender} </h5></div>`;
    output.innerHTML += `
    <div class="d-flex flex-row justify-content-${pos} mb-4 pt-1">
    ${pos=='start' ? name : ''}
    
    <div>
    <p class="small p-2 m-3 mb-1 text-white rounded-3 bg-primary">
    ${data.message}
    </p>
    
    <!-- <p
    class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end"
    >
    00:06
    </p> -->
    
    </div>
    ${pos=='end' ? name : ''}
   
  </div>`
});

messageInput.addEventListener('keypress',(e) => { 
    socket.emit('typing');
})

socket.on('typing',id =>{
    feedback.innerHTML = "typing ...";
});