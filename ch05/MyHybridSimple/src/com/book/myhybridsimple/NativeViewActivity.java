package com.book.myhybridsimple;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.*;
import android.view.*;

public class NativeViewActivity extends Activity {	
	public static final int NATIVE_VIEW = 1000;
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	Log.i("user view","Come in Native View");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.native_view);
        
		Button Button1 = (Button)findViewById(R.id.button1);
		final EditText EditText1 = (EditText)findViewById(R.id.editText1);
        Intent intent = getIntent();
        String strInputValue = intent.getExtras().getString("INPUT_VALUE");     
        EditText1.setText(strInputValue);
        Button1.setOnClickListener(new View.OnClickListener(){
	        public void onClick(View v){
	        	String strOutput = EditText1.getText().toString();
	        	
		        setResult(strOutput);	
	        }
	    });  
    }
	public void setResult(String strInput)
	{
		Intent intent = new Intent();
		intent.putExtra("RESULT", strInput);
		this.setResult(NATIVE_VIEW, intent);
		finish();	
	}    
}
