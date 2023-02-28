import io from 'socket.io-client';
import moment from 'moment';

const socket = io('http://localhost:3000');

const button = document.getElementById('send');
const input = document.getElementById('input');
let userId;

button.addEventListener('click', () => {
    if(input.value === '') {
        return;
    }
    socket.emit('message', input.value);
    input.value = '';
})

socket.on('welcome', id => {
    userId = id;
    console.log(userId)
})

socket.on('receiveMessage', response => {
    const isMessageFromUser = response.userId === userId;

    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chatContainer');
    if(!isMessageFromUser){
        chatContainer.classList.add('left');
    }

    const message = document.createElement('div');
    message.classList.add('message');
    if(!isMessageFromUser) {
        message.classList.add('friend')
    }
    //messageInfo
    const messageBox = document.createElement('div');
    messageBox.classList.add('message_box');

    const username = document.createElement('p');
    username.innerText = 'Кирил';
    username.classList.add('username');

    const date = document.createElement('p');
    date.innerText = moment().format();
    date.classList.add('date');

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message_container');

    const textParagraph = document.createElement('p');
    textParagraph.innerText = response.message;

    const settingsButton = document.createElement('button');
    settingsButton.classList.add('settings-button');

    const image = document.createElement('img');
    image.src = 'settings.svg'
    image.classList.add('svg-settings');


    chatContainer.appendChild(message);
    message.appendChild(messageBox);
    messageBox.appendChild(username);
    messageBox.appendChild(date);
    message.appendChild(messageContainer);

    messageContainer.appendChild(textParagraph);
    messageContainer.appendChild(settingsButton);

    settingsButton.appendChild(image);

    const chatMessageContainer = document.getElementsByClassName('chat')[0];
    chatMessageContainer.appendChild(chatContainer);
})

const mainBlock = document.getElementById('chatWrapper');
mainBlock.addEventListener('click', (event) => {
    const input = document.getElementById('input');
    const sendButton = document.getElementById('send');
    const editButton = document.getElementById('edit');

    if (event.target.tagName === 'IMG') {
        sendButton.style.display = 'none';
        editButton.style.display = 'inline';
        const message = event.target.parentElement.parentElement.children[0];
        input.value = message.textContent;
        message.setAttribute('id', 'text');
    }

    if (event.target.id === 'edit') {
        sendButton.style.display = 'inline';
        editButton.style.display = 'none';
        const text = document.getElementById('text');
        text.removeAttribute('id');


        if (input.value === '' ) {
            return false
        } else {
            text.textContent = input.value;
            text.removeAttribute('id');
            input.value = '';
        }
    }
});



