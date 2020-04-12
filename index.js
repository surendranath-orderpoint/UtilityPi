const Zip = require('adm-zip');
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

server.listen(port, () => {
  console.log(`Server started and listening on port ${port}!`)
})

io.on('connection',(socket)=> {
  _socket = socket;
  _socket.on('startUpdating',  (data)=> {
    console.log(data);
    downloadFile(data);
  });
});

function downloadFile(data){
  console.log(data);
  downloadUpdate = exec('cd vault && { curl -LOk '+data.latestUtilityURL+' ; }',(error, stdout, stderr)=>{

  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  console.log('Updated File downloaded');

  try{
    var zip = new Zip("vault/Utilitypi.zip");
    zip.extractAllTo('vault/', true);
    console.log('Updated file extracted')
  }catch(e){
    console.log("unzipping failed.. "+e);
  }

  updateUtility(data.latest_available_version);

  if(error !== null)
  {
      console.log('Update Download error: ' + error);
  }

  });

}

function updateUtility(version){
  exec('cp -fr vault/UtilityPi/* . && { rm -rf vault ; mkdir vault ; }',(error, stdout, stderr)=>{

  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  console.log('Resources copied..')
  // _socket.emit('updated', { version: version });
  server.close();
  io.httpServer.close();
  io.close();
  if(error !== null)
  {
      console.log('Resources copy error: ' + error);
  }

  });
}
