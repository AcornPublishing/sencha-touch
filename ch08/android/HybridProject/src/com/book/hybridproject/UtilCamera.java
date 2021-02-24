package com.book.hybridproject;

import java.io.File;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;

public class UtilCamera extends Activity {

	/** Activity return requestCode **/
	public static final int CAMERA_VIEW = 2000;
	private Uri mFileUri;	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Intent intent = new Intent();
		intent.setAction(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);			
		intent.putExtra(MediaStore.EXTRA_OUTPUT, mFileUri);			
		startActivityForResult(intent, CAMERA_VIEW);		
	}
	
	@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		finish();
    }
	
	public boolean FileUpload(String httpaddr, String filename)
		throws ClientProtocolException
	{
		boolean success;
		try {
			DefaultHttpClient httpclient = new DefaultHttpClient();
			File f = new File(filename);

			HttpPost httpost = new HttpPost(httpaddr);
			MultipartEntity entity = new MultipartEntity();
			entity.addPart("myIdentifier", new StringBody("somevalue"));
			entity.addPart("myFile", new FileBody(f));
			httpost.setEntity(entity);
			HttpResponse response;
			response = httpclient.execute(httpost);
			//Log.d("httpPost", "Login form get: " + response.getStatusLine());
			if (entity != null) {
				entity.consumeContent();
			}
			success = true;
		} catch (Exception ex) {
			//Log.d("FormReviewer", "Upload failed: " + ex.getMessage() + " Stacktrace: " + ex.getStackTrace());
			success = false;
		} finally {
			//mDebugHandler.post(mFinishUpload);
		}	
		return success;
	}
	
}
