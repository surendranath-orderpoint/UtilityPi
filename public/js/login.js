// STAGING API
var url = "https://op-au-uat-api.azurewebsites.net/api/v2/";
var origin   = window.location.origin;
var userData;

$(document).ready(function ($) {
  socket = io.connect(origin);
    var token = localStorage.getItem('token');
    if (token) {
        window.location = "home"
    }

    $("#login").click(function (e) {
        e.preventDefault();
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();
        if (email && password) {
          $("#spinner").show();
            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                processData: false,
                data: "email=" + email + "&" + "password=" + password,
                url: url+"authenticateuser",
                success: (data)=> {
                    userData = data.data;
                    localStorage.setItem('merchantDetails', JSON.stringify(data.data));
                    localStorage.setItem('token', data.data.token);
                    $("#spinner").hide();
                    getUpdatedVersion(data);
                    $("#invalid").hide();
                },
                error: (error)=> {
                    $("#spinner").hide();
                    $("#invalid")
                        .show()
                        .text(error.responseJSON.error[0].developerMessage);
                    $("#spinner").hide();
                }
            });
        } else {
            $("#invalid").show().text("Enter valid Email Id and Password");
        }

    });
});

function getUpdatedVersion(data){
  $("#spinner").show();
  $("#downloadMsg").show();
  $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      data: "merchant_id=" + data.data.merchant_id,
      headers: { "Authorization": "bearer " + data.data.token },
      url: url+"getLatestPrntUtilityVer",
      success: (data)=> {
        hookEvents(data);
      },
      error: (error)=> {
      }
  });

}


function hookEvents(data){
  socket.emit('startUpdating', data.data[0]);
  socket.on('updated', (version)=> {
    updateBEWithVersion(data.data[0].latestUtilityURL);
  });
}

function updateBEWithVersion(version){
  let data = userData;
  $("#spinner").show();
  $("#downloadMsg").show();
let reqObj = {"merchant_id":data.merchant_id,"version":version.version};
  $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: { "Authorization": "bearer " + data.token },
      url: url+"updateprintUtilityVer?merchant_id="+data.merchant_id+"&version="+version,
      success: (data)=> {
        $("#spinner").hide();
        $("#downloadMsg").hide();
        window.location = "home";
      },
      error: (error)=> {
      }
  });
}
