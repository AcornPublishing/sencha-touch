package com.book.myhybridlocal;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.os.Handler;
import android.content.Context;
import android.content.Intent;
import android.telephony.SmsManager;
import android.util.Log;

public class MyHybridLocalActivity extends Activity {
    /** Called when the activity is first created. */
	public static final int NATIVE_VIEW = 1000;	
	public WebView mWebView;	
	private Handler mHandler = new Handler();
	private Context mContext;
	private boolean bCmdProcess = false;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        mContext = this;
       	mWebView = (WebView)findViewById(R.id.webView1);
		WebSettings ws = mWebView.getSettings();
		ws.setJavaScriptEnabled(true); 
		ws.setPluginsEnabled(true);
 		ws.setCacheMode(WebSettings.LOAD_NO_CACHE);
		mWebView.setNetworkAvailable(true);
		mWebView.addJavascriptInterface(new NativeHybridBridge(), "NativeHybridBridge");
      
		mWebView.loadData("meta:http-equiv='Content-Type' content='text/html;charset=utf-8' />한글","text/html", "utf-8");
        String strUrl = "file:///android_asset/index.html";
	    mWebView.loadUrl(strUrl);//(strUrl, htmldata, mimetype, encoding, null);

	}
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    	super.onActivityResult(requestCode, resultCode, data);
    	
		/** ExBrowser API Return Data Process **/
    	//ResultProcess(requestCode, resultCode, data.getStringExtra("RESULT"));

    	if(requestCode == NATIVE_VIEW)
    	{
    		String strInput = data.getStringExtra("RESULT");
    		String    strReturn = "Js_callFromUserView('" + strInput + "')";
	    	mWebView.loadUrl("javascript:" + strReturn);     		
    	}
    }
    
    private class NativeHybridBridge{

    	// 테스트 콜
        public void CallTest(final String strInput) {
    		if(bCmdProcess)	return;    	    		
    		bCmdProcess = true;
    		try
    		{   
	        	mHandler.post(new Runnable() {
	    	    	public void run() {
    	    	    	String    strReturn = "Js_callFromNative('" + strInput + "')";
    	    	    	mWebView.loadUrl("javascript:" + strReturn); 
	    	    	}
	    		});
    		}
    		catch(Exception ex)
    		{
    			Log.e("TEST Error", ex.toString());
    		}
    		finally
    		{
    			bCmdProcess = false;
    		}
    		Log.i("TEST", "END");
    	}
        
        // 유저 뷰를 호출한다. 
    	public void CallUserView(final String input_data) {
    		
    		Log.i("CALL Native View", "START");
    		try
    		{
        		if(bCmdProcess)	return;
        		bCmdProcess = true;
    			mHandler.post(new Runnable() {
    		    	public void run() {
    		    		Intent intent = new Intent(mContext, NativeViewActivity.class);
    		    		intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    		    		intent.putExtra("input_data", input_data);    		    		
    		    		startActivityForResult(intent, 1000);
    		    	}
    			});
    		}
    		catch(Exception ex)
    		{
    			Log.e("Error", ex.toString());
    		}
    		finally
    		{
    			bCmdProcess = false;
    		}
    	}                
        // 전화걸기
        public void CallPhone(final String strPhoneNumber) {
        	Log.i("PHONE", "START" + strPhoneNumber);
    		if(bCmdProcess)	return;    	    		
    		bCmdProcess = true;
    		try
    		{   
	        	mHandler.post(new Runnable() {
	    	    	public void run() {
	    	    		Intent dial = new Intent(
	    	    				Intent.ACTION_DIAL, Uri.parse("tel:" + strPhoneNumber));
	    	    		startActivity(dial);
	    	    	}
	    		});
    		}
    		catch(Exception ex)
    		{
    			Log.e("PHONE Error", ex.toString());
    		}
    		finally
    		{
    			bCmdProcess = false;
    		}
    		Log.i("PHONE", "END");
    	}    
        
        // SMS보내기
        public void CallSms(final String strPhoneNumber) {
        	Log.i("SMS", "START" + strPhoneNumber);        	
    		if(bCmdProcess)	return;    	    		
    		bCmdProcess = true;
    		try
    		{   
	        	mHandler.post(new Runnable() {
	    	    	public void run() {
	    	    		Log.i("SMS", "START" + strPhoneNumber);
	    	    		final SmsManager sms = SmsManager.getDefault();
	    	    		sms.sendTextMessage(strPhoneNumber, null, strPhoneNumber, null,null);
	    	    		Toast.makeText(mContext,"SMS를 발송하였습니다.",1000);
	    	    	}
	    		});
    		}
    		catch(Exception ex)
    		{
    			Log.e("SMS Error", ex.toString());
    		}
    		finally
    		{
    			bCmdProcess = false;
    		}
    		Log.i("SMS", "END");
    	}    	        
    }   

}