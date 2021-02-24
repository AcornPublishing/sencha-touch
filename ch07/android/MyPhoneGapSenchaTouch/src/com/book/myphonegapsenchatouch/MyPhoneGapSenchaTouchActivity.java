package com.book.myphonegapsenchatouch;



//import android.app.Activity;
import com.phonegap.*;
import android.os.Bundle;

public class MyPhoneGapSenchaTouchActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}