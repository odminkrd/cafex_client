var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    reconnect();
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        reconnect();
        
    });
    connection.on('message', function(message) {
        const jsonMsg = JSON.parse(message.utf8Data);
        const jsonCmd = jsonMsg[0];
       switch (jsonCmd) {
        case 'auth':
            console.log('auth ok!');            
            break;
       
       
       }

            console.log(jsonMsg[1]);
       
    });
    
    // function sendNumber() {
    //     if (connection.connected) {
    //         var number = Math.round(Math.random() * 0xFFFFFF);
    //         connection.sendUTF(number.toString());
    //         setTimeout(sendNumber, 1000);
    //     }
    // }
    // sendNumber();


    function auth() {
        if (connection.connected) {
            var sendObj ={};
            sendObj.command = 'authPc';
            sendObj.pcName = 'PC4';
            sendObj.pcIp = '192.168.1.104';
    connection.send(JSON.stringify(sendObj));

        }
    }
    auth();
});
function reconnect() {
    
    setTimeout(()=>{
        client.connect('ws://192.168.1.11:9000/');
        console.log('reconnected...');
    }, 5000);

}
client.connect('ws://192.168.1.11:9000/');