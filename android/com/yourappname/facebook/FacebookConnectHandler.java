package com.yourappname.facebook;

// fb: opening-session Secondly
public interface FacebookConnectHandler {
	/**
	 * Method to call when the user's Facebook account was connected to and a
	 * Facebook session was opened successfully.
	 */
	public void onSuccess();

	/**
	 * Method to call when the user's Facebook account was not connected to or a
	 * Facebook session was not opened successfully.
	 */
	public void onFailure();
}