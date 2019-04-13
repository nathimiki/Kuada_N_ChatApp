import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function setUserId({sID, message}) {
    //debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    vm.messages.push(message);
    document.querySelector('.sound').play();
}



const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],

        shownicknameBox: true,

        nicknameError: false,

    },

    methods: {

        dispatchMessage() {
            if(this.message != ""){
            this.msgError = false;
            // send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname} );
            this.message = "";
            }else{
                this.msgError = true;
            }
        },

        whiteNickname(){
            if(this.nickname != ""){
            socket.emit('userConnect', { name: this.nickname } );
            this.shownicknameBox=false;
            }else{
                this.nicknameError = true;
            }
        },

        logDisconnect(){
            socket.emit('log disconnect', { name: this.nickname } );
            window.location.replace('/logout');
        }

    },

    created: function(){
        this.shownicknameBox = true;
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
