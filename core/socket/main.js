var UserStore = require('../store/UsersConnectedStore');
var socketEvent = {
    socketServer:null,
    set:(socketServer)=>{
        socketEvent.socketServer = socketServer;
        socketEvent.start();
    },
    start:()=>{
        socketEvent.socketServer.on('connection', function(socket){
            //socketEvent.send('chat connected',UserStore.users[socket.id]);
            socketEvent.get(socket);
        });
    },
    get: (socket)=>{
        socket.on('chat message',(msg)=>{
            socketEvent.sendAll('chat message',UserStore.users[socket.id]+': '+msg);

        });
        socket.on('chat setUser',(msg)=>{
            UserStore.users[socket.id] = msg;
            socketEvent.send('chat checkUser',socket,true);
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