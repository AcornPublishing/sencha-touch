package com.book.hybridgame;

import java.io.File;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;

import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.app.AlertDialog;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.webkit.JsResult;
import android.widget.Toast;
import android.os.Handler;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.Window;


import com.book.hybridgame.ProgressBar;

public class HybridGameActivity extends Activity {
    /** Called when the activity is first created. */
	public static final int NATIVE_VIEW = 1000;	
	public static final int CAMERA_VIEW = 2000;
	private Context mContext;
	private Handler mHandler = new Handler();
	private boolean bCmdProcess = false; 
	public WebView mWebView;	
	private ProgressBar prgrBar;
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);        
        setContentView(R.layout.main);
        

        
        mContext = this;
       	mWebView = (WebView)findViewById(R.id.webView1);
		WebSettings ws = mWebView.getSettings();
		ws.setJavaScriptEnabled(true); 
		ws.setPluginsEnabled(true);
 		ws.setCacheMode(WebSettings.LOAD_NO_CACHE);
 		ws.setDomStorageEnabled(true);
 		ws.setAppCacheEnabled(true);
 		ws.setSaveFormData(true);
 		
 		mWebView.setNetworkAvailable(true);
		mWebView.setWebChromeClient(new ChromeClient(this));
		mWebView.setWebViewClient( new webviewClient(this) );
		mWebView.addJavascriptInterface(new NativeBridge(), "NativeBridge");
		mWebView.setScrollbarFadingEnabled(true);
		mWebView.setVerticalScrollBarEnabled(false);
		mWebView.setHorizontalScrollBarEnabled(false);		
		String strUrl = "file:///android_asset/www/index.html";
	    mWebView.loadUrl(strUrl);
	    prgrBar = new ProgressBar(this);    
	}
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    	super.onActivityResult(requestCode, resultCode, data);
    	
		/** ExBrowser API Return Data Process **/
    	try
    	{
	    	if(requestCode == NATIVE_VIEW)
	    	{
	    		String strInput = data.getStringExtra("RESULT");
	    		String strCallbackFunc = data.getStringExtra("CALLBACKFUNC");
	    		String strJavaScript = strCallbackFunc + "('" + strInput + "')";
		    	mWebView.loadUrl("javascript:" + strJavaScript);     		
	    	}
	    	else if(requestCode == CAMERA_VIEW)
	    	{
	    		String strInput = data.getStringExtra("RESULT");
	    		String strCallbackFunc = data.getStringExtra("CALLBACKFUNC");
	    		String strJavaScript =  strCallbackFunc + "('" + strInput + "')";
		    	mWebView.loadUrl("javascript:" + strJavaScript);    		
	    	}
    	}
    	catch(Exception exResult)
    	{
    		Log.i("eee:", exResult.toString());
    	}
    	bCmdProcess = false;
    }

    // ChromeClient for Alert
    private final class ChromeClient extends WebChromeClient {
    	public Context pCtx;
    	
    	public ChromeClient(Context cxt) {
    		pCtx = cxt;
    	}

		@Override
		public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
			new AlertDialog.Builder(pCtx)
			.setTitle("안내").setMessage(message)
			.setNeutralButton(android.R.string.ok,  
                    new DialogInterface.OnClickListener() {  
                        public void onClick(DialogInterface dialog, int which) { 
                        	result.confirm();
                        }
            		})
			.setCancelable(false).show();
			return true;
		}

		@Override
		public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
			new AlertDialog.Builder(pCtx)
			.setTitle("안내").setMessage(message)
			.setPositiveButton(android.R.string.ok,  
                    new DialogInterface.OnClickListener() {  
                        public void onClick(DialogInterface dialog, int which) { 
                        	result.confirm();
                        }
            		})
            .setNegativeButton(android.R.string.cancel,  
                    new AlertDialog.OnClickListener() {  
                        public void onClick(DialogInterface dialog, int which) { 
                        	result.confirm();
                        }
            		})
			.setCancelable(false).show();
			return true;
		}
    }
    
    private class webviewClient extends WebViewClient {
    	private Context 	pCtx;
    	
    	public webviewClient(Context ctx) {
    		pCtx = ctx;    		
    	}    	
    	/*
    	 *    	
    	 @Override

		public boolean shouldOverrideUrlLoading(WebView view, 
												String url)
		{
			view.loadUrl(url);
    		return true;
		} 
		*/   	
    	@Override
        public void onPageStarted(	WebView view, 
        							String url, 
        							Bitmap favicon) 
        {
        	super.onPageStarted(view, url, favicon);

        	prgrBar.Show();    		
        	
        }
    	
    	 @Override
         public void onPageFinished(WebView view, 
        		 					String url) 
         {
    		 super.onPageFinished(view, url);
    		 prgrBar.Hide();
         }
    }   
    private class NativeBridge{
        // 전화걸기
        public void callPhone(final String strPhoneNumber) {
        	Log.i("callPhone", "START" + strPhoneNumber);
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
        public void callSms(final String strPhoneNumber, final String strSMS) {
        	Log.i("callSms", "START" + strPhoneNumber);        	
    		if(bCmdProcess)	return;    	    		
    		bCmdProcess = true;
    		try
    		{   
	        	mHandler.post(new Runnable() {
	    	    	public void run() {
	    	    		Log.i("SMS", "START" + strPhoneNumber);
	    	    		final SmsManager sms = SmsManager.getDefault();
	    	    		sms.sendTextMessage(strPhoneNumber, null, strSMS, null,null);
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
    
        // 네트워크상태
    	public void callNetworkState(final String strCallbackFunc ) {
    		
    		Log.i("callNetworkState", "START");
    		if(bCmdProcess)	
    			return;  
    		try
    		{
        		bCmdProcess = true;
    			mHandler.post(new Runnable() {
    		    	public void run() {
    		    		ConnectivityManager cm = (ConnectivityManager)getSystemService(Context.CONNECTIVITY_SERVICE);
    		    		NetworkInfo ni = cm.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
    		    		boolean isWifiAvail = ni.isAvailable();
    		    		boolean isWifiConn = ni.isConnected();
    		    		
    		    		if(isWifiAvail == true && isWifiConn == true)
    		    		{
    		    			String strJavascript = strCallbackFunc + "('WIFI')";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);     		    		
    		    		}
    		    		else
    		    		{
    		    			String strJavascript = strCallbackFunc + "('NOT_WIFI')";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);     		    		
    		    		}
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
    	
        //  위치정보
    	public void callLocationPos( final String strCallbackFunc ) {
    		
    		Log.i("CALL NativeBridge callLocationPos", "START");
    		if(bCmdProcess)	
    			return;  
    		
    		try
    		{
        		bCmdProcess = true;
    			mHandler.post(new Runnable() {
    		    	public void run() {
    		    		try
    		    		{
    		    			LocationManager locMgr = 
    		    				(LocationManager)getSystemService(Context.LOCATION_SERVICE);
    		    			Criteria criteria = new Criteria();
    		    			criteria.setAccuracy(Criteria.ACCURACY_COARSE);
    		    			String bestProv = locMgr.getBestProvider(criteria, true);
    		    			Location loc =locMgr.getLastKnownLocation(bestProv);
    		    			String strJavascript = strCallbackFunc + "('" + 
    		    				loc.getLatitude() + "','" + 
    		    				loc.getLongitude() + "')";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);        		    			
    		    		}
    		    		catch(Exception exLoc)
    		    		{
    		    			String strJavascript = "alert('위치정보 읽기 오류!!')";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);       		    		
    		    		}
    		    		
    		    		
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
        


    	
    	
 	
    }
}