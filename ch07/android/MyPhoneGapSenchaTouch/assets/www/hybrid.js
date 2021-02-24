function callCamera()
{			
	navigator.camera.getPicture(successCamera, failCamera, { quality: 50 });
}
function successCamera()
{
	alert("카메라 성공");
}
function failCamera()
{
	alert("카메라 실패");
}
function callNetworkState()
{
	document.addEventListener("deviceready", receiveNetworkState, false);
}	
function receiveNetworkState()
{
	var networkState = navigator.network.connection.type;	
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    alert('Connection type: ' + states[networkState]);
}
function callLocationPos(callbackFunc)
{			
	navigator.geolocation.getCurrentPosition(receiveLocationPos);
}
function receiveLocationPos(position)
{
   alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
}		

function callFileUpload()
{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(
    	uploadPhoto,
        function(message) { alert('get picture failed'); },
        { quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
        );		
}

function uploadPhoto(imageURI) 
{
    var options = new FileUploadOptions();
    //options.fileKey="file";
    //options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    //options.mimeType="image/png";
    var ft = new FileTransfer();
    ft.upload(imageURI, "http://goodsencha.iptime.org:8080/book/part7/fileupload.jsp", win, fail, options);
}

function win(r) 
{
	alert("파일 업로드 성공");
}

function fail(error) 
{
    alert("파일 업로드 실패");
}
	