package com.book.myhybridsimple;
import android.app.ProgressDialog;
import android.content.Context;
public class ProgressBar {
	private Context				mCtx;
	private ProgressDialog 		prgrDlg;	
	private String				strMessage = "잠시만 기다려 주십시요...";

	public ProgressBar(Context ctx) {
		mCtx = ctx;		
		prgrDlg = null;		
		prgrDlg = new ProgressDialog(mCtx);
		prgrDlg.setCancelable(false);
		prgrDlg.setProgressStyle(ProgressDialog.STYLE_SPINNER);
		prgrDlg.setMessage(strMessage);
	}
	public void Show() {			
		
		prgrDlg.show();		
	}	
	public void Hide() {
		prgrDlg.dismiss();
	}	
}
