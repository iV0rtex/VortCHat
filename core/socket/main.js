var UserStore = require('../store/UsersConnectedStore');
const {connectUser} = require('../db/dbManager');

var socketEvent = {
    socketServer:null,
    set:(socketServer)=>{
        socketEvent.socketServer = socketServer;
        socketEvent.start();
    },
    start:()=>{
        socketEvent.socketServer.on('connection', function(socket){
            socketEvent.get(socket);
        });
    },
    get: (socket)=>{
        socket.on('chat message',(msg)=>{
            socketEvent.sendAll('chat message',UserStore.users[socket.id]+': '+msg);

        });
        socket.on('chat setUser',(msg)=>{
            connectUser({socketId:socket.id,msg},(err,res)=>{let result = false; if(!err){result = true}socketEvent.send('chat setUser',socket,result)});
        });
        socket.on('chat checkUser',(msg)=>{
            var result = UserStore.users.hasOwnProperty(socket.id)?true:false;
            socketEvent.send('chat checkUser',socket,result);
        });

    },
    sendAll:(e,msg)=>{
        socketEvent.socketServer.emit(e,msg);
    },
    send:(e,socket,msg)=>{
        socket.emit(e,msg);
    }
};


module.exports = socketEvent;