package com.rest.Util;

import java.io.*;

public class Util
{
	public static String Path_user ="../../save";
	public static void writeToFile(InputStream uploadedInputStream,
		String uploadedFileLocation) {
		OutputStream out = null;
		
		try {
			int read = 0;
			byte[] bytes = new byte[1024];
 
			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {
			System.out.println(e.toString());
		}
	}

}
