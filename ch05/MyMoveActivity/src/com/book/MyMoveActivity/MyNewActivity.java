package com.book.MyMoveActivity;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MyNewActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sub);

        Intent intent = getIntent();
	    String strParam = intent.getStringExtra("PARAM1");    	
	    
	    
	    TextView TextView1 = (TextView)findViewById(R.id.textView1);
	    TextView1.setText(strParam);
	    
	    Button BtnButton1 = (Button)findViewById(R.id.button1);
	    BtnButton1.setOnClickListener(new View.OnClickListener(){
	        public void onClick(View v){
	    		finish(); 	    		
	        	
	        }
	    });	       
          
        Log.i("MyNewActivity","Create");
    }
    
    @Override
    public void onStart()
    {
    	super.onStart();
    	Log.i("MyNewActivity","Start");
    }

    @Override
    public void onResume()
    {
    	super.onResume();
    	Log.i("MyNewActivity","Resume");
    }
    @Override
    public void onPause()
    {
    	super.onPause();
    	Log.i("MyNewActivity","Pause");
    }
    @Override
    public void onStop()
    {
    	super.onStop();
    	Log.i("MyNewActivity","Stop");
    }
    @Override
    public void onDestroy()
    {
    	super.onDestroy();
    	Log.i("MyNewActivity","Destory");
    }
    
}
