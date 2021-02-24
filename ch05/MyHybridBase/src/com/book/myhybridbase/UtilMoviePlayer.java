package com.book.myhybridbase;


import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.*;

public class UtilMoviePlayer  extends Activity {	
	public static final int MOVIE_PLAYER = 3000;
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	Log.i("user view","Come in Util MoviePlayer");    	
        super.onCreate(savedInstanceState);
        try
        {
        String videoURL;
        setContentView(R.layout.util_movieplayer);
		VideoView videoView = (VideoView)findViewById(R.id.videoView);
		
		Intent intent = getIntent();
		intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        videoURL = intent.getExtras().getString("MOVIE_URL");   
        Log.i("Movie Name", videoURL);
		Uri videoUrl = Uri.parse( videoURL );
		MediaController mediaController = new MediaController(this);
		videoView.setMediaController(mediaController);
		videoView.setVideoURI(videoUrl);
		videoView.requestFocus();
		videoView.start();
        }
        catch(Exception exTemp)
        {
        	Log.i("...", exTemp.toString());
        }
       
    }
    
}
