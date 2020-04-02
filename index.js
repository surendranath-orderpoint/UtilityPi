const http = require('http');
const exec = require('child_process').exec;
const express = require('express'),
      fs = require('fs')
      url = require('url');
const bodyParser = require('body-parser');
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 3000
var path = require('path');
var _socket;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function restart(){
  testscript1 = exec('sh restart.sh .');
  testscript1.stdout.on('data', (data)=>{
      console.log(data);
      if(data.indexOf("success")>-1){
        console.log("restart Successful !!!");
      }

  });

  testscript1.stderr.on('data', function(data){
      console.log(data);
  });
}

server.listen(port, () => {
  console.log(`Server started and listening on port ${port}!`)
})

io.on('connection',(socket)=> {
  _socket = socket;
  // console.log("Testing socket after restart");
  // socket.emit('updated', { hello: 'world with restart' });
  _socket.on('startUpdating',  (data)=> {
    console.log(data);
    downloadFile(data);
  });
});

function downloadFile(data){
  console.log(data);
  downloadUpdate = exec('curl -LOk '+data.latestUtilityURL,(error, stdout, stderr)=>{

  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);

  if(error !== null)
  {
      console.log('exec error: ' + error);
  }
    updateUtility(data.latest_available_version);

  });

}

function updateUtility(version){
  testscript = exec('sh ../update.sh');

  testscript.stdout.on('data', (data)=>{
      console.log(data);
      if(data.indexOf("success")>-1){
        console.log("Update Successful !!!");
        console.log("Before socket emit");
        _socket.emit('updated', { version: version });
        server.close();
        io.httpServer.close()
        io.close();
        restart();
      }
  });

  testscript.stderr.on('data', function(data){
      console.log(data);
      // triggerErrorStuff();
  });
}
