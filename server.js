var http = require('http');
var fs = require('fs');
var WebSocket = require('ws');
var firebase = require('firebase')

var config = {
    apiKey: "AIzaSyDyjWDq5oqbUQ181_YGi4TylTO8hlB98cs",
    authDomain: "sample-da149.firebaseapp.com",
    databaseURL: "https://sample-da149.firebaseio.com",
    projectId: "sample-da149",
    storageBucket: "sample-da149.appspot.com",
    messagingSenderId: "848704810717"
  };
  firebase.initializeApp(config);







var httpServer = http.createServer(function (req, res) {

      console.log('[BEGIN] received request: ' + req.url);




 

  var ref = firebase.database().ref().child("FarmHarvest/");
ref.on('value',function(data)
{

   


 var Month =  "May";
 var Year =  2018;
 var City = "Coimbatore"

     list = [];
      var inst = data.val();
          
      var keys = Object.keys(inst);
      for(j=1;j<32;j++)
      {
        var count = 0;

      for (var i = 0; i< keys.length; i++)
      {
          var k = keys[i];
          var time = inst[k].Time;
          var city = inst[k].city;
          

          var d = time.slice(8,10);
            
          var year =time.slice(11,15);
          var month = time.slice(4,7);  

          var date = month+" "+d+" "+year;
          if(j<10)
          {
          var Dat = Month+" "+"0"+j+" "+Year;
        }
        else{
             var Dat = Month+" "+j+" "+Year;
        }
        

          if(date === Dat && city === City)
          {
            count = count + 1;
          }
        }
        
       list.push(count);
      }

   
   var data = list;

   list = [];
 var c=0;
for(i=0;i<31;i++)
{
    if(data[i]>0){
         c = c+1
    }
}


 
 broadcast({f_data:data});

 
 });

 var path = 'assets' + req.url;



    res.writeHead(200, {'Content-Type': 'text/html'});


    if(req.url == '/'){
      path = 'assets/map.html';
      
      
    }


console.log(path)

    if (fs.existsSync(path)) {
        // read file if it exists
        fs.readFile(path, function(err, data) {
          if(err){
            res.write(err)
          }
            // send file contents as response
            res.write(data); //write a response to the client

             res.end(); //end the response
        });

       
        return; // end the request if it was handled here
    }
   
if(req.url == '/some_custom_url'){
        res.end();
        return;
    }

    






}).listen(8888);







var wss = new WebSocket.Server({
    server: httpServer
});



wss.on('connection', function connection(ws, req) {

    const ip = req.connection.remoteAddress;
    console.log("[%s] new client connected", ip);

    ws.on('message', function incoming(message) {

            console.log("Message received:", message);
            

    });

    ws.on('close', function close() {
        console.log('[%s] client disconnected', ip);
    });
});



function broadcast(data) {
    var data = JSON.stringify(data);
    wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};




