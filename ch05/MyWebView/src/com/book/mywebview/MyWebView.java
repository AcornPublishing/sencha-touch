package com.book.mywebview;


import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.view.*;

public class MyWebView extends Activity {
    /** Called when the activity is first created. */

	WebView mWebView;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_PROGRESS);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.main);
    	mWebView = (WebView)findViewById(R.id.webView1);
		mWebView.setNetworkAvailable(true);	    		
		
		String strUrl = "http://www.acornpub.co.kr/";
		mWebView.loadUrl(strUrl); 
    }
}