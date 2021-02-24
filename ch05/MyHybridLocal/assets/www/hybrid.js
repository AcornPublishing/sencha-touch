		function callNative() 
		{
			window.NativeHybridBridge.CallTest('aaa');
		}
		function Js_callFromNative(Jv_Value) 
		{
			document.forms[0].Fo_Native.value = Jv_Value;
		}

		function Js_callPhone()
		{
			window.NativeHybridBridge.CallPhone(document.forms[0].Fo_Phone.value);
		}
		function Js_callSms()
		{			
			window.NativeHybridBridge.CallSms(document.forms[0].Fo_Phone.value);
		}
		
		
		function Js_callUserView()
		{			
			window.NativeHybridBridge.CallUserView('HI');
		}
		function Js_callFromUserView(Jv_Value)		
		{
			document.forms[0].Fo_UserView.value = Jv_Value;
		}	