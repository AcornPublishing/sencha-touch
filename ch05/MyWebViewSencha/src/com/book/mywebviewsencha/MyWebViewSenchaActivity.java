package com.book.mywebviewsencha;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.view.*;

public class MyWebViewSenchaActivity extends Activity {
    /** Called when the activity is first created. */

	WebView mWebView;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.main);
    	mWebView = (WebView)findViewById(R.id.webView1);
    	WebSettings ws = mWebView.getSettings();
        ws.setJavaScriptEnabled(true); 
        ws.setJavaScriptCanOpenWindowsAutomatically(true);		 
        ws.setLightTouchEnabled(true);
        ws.setPluginsEnabled(true);
        ws.setCacheMode(ws.LOAD_NO_CACHE);
		mWebView.setVerticalScrollBarEnabled(false);
		mWebView.setHorizontalScrollBarEnabled(false);        

		mWebView.setNetworkAvailable(true);	    		
		String strUrl = "http://goodsencha.iptime.org:8080/book/part4/index.html";
		mWebView.loadUrl(strUrl); 
		
    }
}