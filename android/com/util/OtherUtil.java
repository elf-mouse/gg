package com.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import android.app.Activity;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

public class OtherUtil {

	/**
	 * Facebook Hash Key
	 */
	public static String getHashKey(Activity activity) {
		String hash_key = "";
		// Add code to print out the key hash
		try {
			String packageName = activity.getPackageName();
			PackageInfo info = activity.getPackageManager().getPackageInfo(packageName, PackageManager.GET_SIGNATURES);
			for (Signature signature : info.signatures) {
				MessageDigest md = MessageDigest.getInstance("SHA");
				md.update(signature.toByteArray());
				hash_key = Base64.encodeToString(md.digest(), 0); // Base64.DEFAULT
				Log.i("KeyHash:", hash_key);
			}
		} catch (NameNotFoundException e) {
			Log.e("name not found", e.toString());
		} catch (NoSuchAlgorithmException e) {
			Log.e("no such an algorithm", e.toString());
		} catch (Exception e) {
			Log.e("exception", e.toString());
		}
		return hash_key;
	}
}