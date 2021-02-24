package com.book.myfirstandroid;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.EditText;

public class MyFirstAndroid extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
		Button BtnConfirm = (Button)findViewById(R.id.btnConfirm);
		final EditText EditInput = (EditText)findViewById(R.id.editInput);
		final TextView TextOutput = (TextView)findViewById(R.id.textOutput);
		BtnConfirm.setOnClickListener(new View.OnClickListener(){
	        public void onClick(View v){
	        	String strTemp = EditInput.getText().toString();
	        	TextOutput.setText("°ª:" + strTemp);
	        	
	        }
	    });        
    }
}