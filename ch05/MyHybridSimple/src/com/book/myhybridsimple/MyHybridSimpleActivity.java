package com.book.myhybridsimple;

import com.book.myhybridsimple.ProgressBar;

import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.os.Handler;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.util.Log;

public class MyHybridSimpleActivity extends Activity {
	public static final int NATIVE_VIEW = 1000;	
	private Context mContext;
	private Handler mHandler = new Handler();
	private boolean bCmdProcess = false; 
	public WebView mWebView;	
	private ProgressBar prgrBar;
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
		mWebView.setWebChromeClient(new ChromeClient(this));
		mWebView.setWebViewClient(new webviewClient(this));
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
	    		String strJavaScript = "receiveUserView('" + strInput + "')";
		    	mWebView.loadUrl("javascript:" + strJavaScript);     		
	    	}
    	}
    	catch(Exception exResult)
    	{
    		Log.i("eee:", exResult.toString());
    	}
    	bCmdProcess = false;
    }
    // WebChromeClient
    private final class ChromeClient extends WebChromeClient {
    	public Context pCtx;    	
    	public ChromeClient(Context cxt) {
    		pCtx = cxt;
    	}

		@Override
		public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
			new AlertDialog.Builder(pCtx)
			.setTitle("알림").setMessage(message)
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
			.setTitle("확인").setMessage(message)
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
    	@Override
		public boolean shouldOverrideUrlLoading(WebView view, 
												String url)
		{
			view.loadUrl(url);
    		return true;
		}    	
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
    	@Override
        public void onReceivedError(	WebView view, 
        		 						int errorCode, 
        		 						String description, 
        		 						String failingUrl)
        {    		 
    		 new AlertDialog.Builder(pCtx)
    			.setTitle("알림")
    			.setMessage("서버응답오류")
    			.setCancelable(false)
    			.setNeutralButton(android.R.string.ok,   
    				new DialogInterface.OnClickListener() {   
    					public void onClick(DialogInterface dialog, 
    										int whichButton)
    					{
    						finish();
    					}
    		      	})
    		   .show();
        }
    } 
    private class NativeBridge{
    	// 네이티브 콜
        public void callNative(final String strInput) {
    		if(bCmdProcess)	return;    	    		
    		bCmdProcess = true;
    		try
    		{   
	        	mHandler.post(new Runnable() {
	    	    	public void run() {
    	    	    	String    strReturn = "receiveNative('" + strInput + "')";
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
    	public void callUserView(final String input_data) {
    		
    		Log.i("CALL Native View", "START");
    		try
    		{
        		if(bCmdProcess)	return;
        		bCmdProcess = true;
    			mHandler.post(new Runnable() {
    		    	public void run() {
    		    		Intent intent = new Intent(mContext, NativeViewActivity.class);
    		    		intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    		    		intent.putExtra("INPUT_VALUE", input_data);
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
    }
}