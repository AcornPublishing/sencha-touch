package com.book.MyMoveActivity;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.util.Log;

public class MyMoveActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
		Button BtnButton1 = (Button)findViewById(R.id.button1);
		final EditText EditText1 = (EditText)findViewById(R.id.editText1);

	    BtnButton1.setOnClickListener(new View.OnClickListener(){
	        public void onClick(View v){
	    		String strTemp = EditText1.getText().toString();
		    	Intent intent = new Intent(getApplicationContext(), MyNewActivity.class);
		    	intent.putExtra("PARAM1", strTemp);  		    	
		    	startActivity(intent); 	    			        	
	        }
	    });
	    Log.i("MyMoveActivity","Create");
    }
    @Override
    public void onStart()
    {
    	super.onStart();
    	Log.i("MyMoveActivity","Start");
    }

    @Override
    public void onResume()
    {
    	super.onResume();
    	Log.i("MyMoveActivity","Resume");
    }
    @Override
    public void onPause()
    {
    	super.onPause();
    	Log.i("MyMoveActivity","Pause");
    }
    @Override
    public void onStop()
    {
    	super.onStop();
    	Log.i("MyMoveActivity","Stop");
    }
    @Override
    public void onDestroy()
    {
    	super.onDestroy();
    	Log.i("MyMoveActivity","Destory");
    }
    
}