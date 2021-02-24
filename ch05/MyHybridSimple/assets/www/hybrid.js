function callNative(paramValue) 
{	
	window.NativeBridge.callNative(paramValue);
}
function receiveNative(paramValue) 
{
	document.forms[0].txtReceive.value = paramValue;
}

function callUserView(paramValue)
{			
	window.NativeBridge.callUserView(paramValue);
}
function receiveUserView(paramValue)		
{
	document.forms[0].txtReceiveUserView.value = paramValue;
}	