package com.yourappname.facebook;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.AccessToken;
import com.facebook.HttpMethod;
import com.facebook.Request;
import com.facebook.Response;
import com.facebook.Session;
import com.facebook.SessionState;
import com.facebook.internal.Utility;
import com.facebook.model.GraphUser;
import com.util.CommonUtil;
import com.util.DeviceUtil;

public class MainActivity extends Activity {

	// native var
	private final Activity activity = this;
	private SharedPreferences localData = null;
	// user var
	private boolean isAuthentication = false;
	private String fb_id = "0";
	// facebook
	List<String> fb_permissions_required = Arrays.asList("publish_actions");
	private GraphUser fb_user = null;
	private Session.StatusCallback fb_callback = new StatusCallback();
	// text var
	private String share_succeed = "分享成功";
	private String share_failed = "分享失败";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}

	private class StatusCallback implements Session.StatusCallback {
		@Override
		public void call(Session session, SessionState state, Exception exception) {
			sessionStateChange(session, state, exception);
		}
	}

	private void sessionStateChange(Session session, SessionState state,
			Exception exception) {
		if (session.isOpened()) {
			Log.e("Session", "isOpened");
			Request.newMeRequest(session, new Request.GraphUserCallback() {
				// callback after Graph API response with user object
				@Override
				public void onCompleted(GraphUser user, Response response) {
					if (user != null) {
						fb_user = user;
						fb_id = fb_user.getId();
						System.out.println("facebook id:" + fb_id);
						isAuthentication = true;
					}
				}
			}).executeAsync();
		} else if (SessionState.CREATED_TOKEN_LOADED == state) {
			Log.e("Session", "has cache");
		} else if (SessionState.CLOSED == state) {
			Log.e("Session", "isClosed");
		} else if (SessionState.CREATED == state) {
			Log.e("Session", "oh, first login");
			session.requestNewPublishPermissions(new Session.NewPermissionsRequest(this, fb_permissions_required));
		}
	}

	/**
	 * facebook登录
	 */
	private void facebookLogin() {
		Session session = Session.getActiveSession();
		if (session != null && session.isOpened()) {
			session.addCallback(fb_callback);
		} else {
			Session.openActiveSession(activity, true, fb_callback);
		}
	}

	/**
	 * facebook登出
	 */
	private void facebookLogout() {
		Session session = Session.getActiveSession();
		if (!session.isClosed()) {
			session.closeAndClearTokenInformation();
			Utility.clearFacebookCookies(this);
			isAuthentication = false;
			fb_id = "0";
			// browser.loadUrl("your_index_url");
		}
	}

	// fb: opening-session Firstly
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);

		if (Session.getActiveSession() != null)
			Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
	}

	private void clearFacebookInfoFromSharedPreferences() {
		localData = DeviceUtil.getLocalData(activity);
		Editor data = localData.edit();
		data.putString("facebookAccessToken", "");
		data.putLong("facebookAccessTokenExpires", 0);
		data.commit();
	}

	private void saveFacebookInfoInSharedPreferences(String facebookAccessToken, Date facebookAccessTokenExpires) {
		localData = DeviceUtil.getLocalData(activity);
		Editor data = localData.edit();
		data.putString("facebookAccessToken", facebookAccessToken);
		data.putLong("facebookAccessTokenExpires", facebookAccessTokenExpires.getTime());
		data.commit();
	}

	// fb: opening-session Thirdly
	private void connectFacebookAccount(final FacebookConnectHandler handler) {
		// safety check
		if (!DeviceUtil.isActiveNetworkConnected(activity)) {
			handler.onFailure();
			return;
		}

		// check whether the user already has an active session
		// and try opening it if we do

		// (note: making a Session.openActiveSessionFromCache(...) call
		// instead of simply checking whether the active session is opened
		// because of a bug in the Facebook sdk
		// where successive calls to update a token
		// (requesting additional permissions etc)
		// don't result in a session callback)
		if (Session.getActiveSession() != null
				&& Session.openActiveSessionFromCache(this) != null) {
			handler.onSuccess();
			return;
		}

		// initialise the session status callback
		Session.StatusCallback callback = new Session.StatusCallback() {
			@Override
			public void call(Session session, SessionState state,
					Exception exception) {
				// safety check
				if (isFinishing())
					return;

				// check session state
				if (state.equals(SessionState.CLOSED)
						|| state.equals(SessionState.CLOSED_LOGIN_FAILED)) {
					clearFacebookInfoFromSharedPreferences();

					// specific action for when the session is closed
					// because an open-session request failed
					if (state.equals(SessionState.CLOSED_LOGIN_FAILED)) {
						// cancelProgressDialog();
						handler.onFailure();
					}
				} else if (state.equals(SessionState.OPENED)) {
					// cancelProgressDialog();
					saveFacebookInfoInSharedPreferences(session.getAccessToken(), session.getExpirationDate());

					// showToast4Short("Succeeded connecting to Facebook");

					handler.onSuccess();
				}
			}
		};

		// make the call to open the session

		// showProgressDialog("Connecting to Facebook...");

		localData = DeviceUtil.getLocalData(activity);

		if (Session.getActiveSession() == null
				&& localData.contains("facebookAccessToken")
				&& localData.contains("facebookAccessTokenExpires")) {
			// open a session from the access token info
			// saved in the app's shared preferences
			String accessTokenString = localData.getString("facebookAccessToken", "");
			Date accessTokenExpires = new Date(localData.getLong("facebookAccessTokenExpires", 0));

			AccessToken accessToken = AccessToken.createFromExistingAccessToken(accessTokenString, accessTokenExpires, null, null, null);
			Session.openActiveSessionWithAccessToken(this, accessToken, callback);
		} else
			// open a new session, logging in if necessary
			Session.openActiveSession(this, true, callback);
	}

	private void onFailedPostingFacebookMessage() {
		// showToast4Short(share_failed);
	}

	private void onSucceedPostingFacebookMessage(String id) {
		String msg = share_succeed;
		// showToast4Short(msg);
	}

	/**
	 * facebook分享
	 * 
	 * Posts the provided message to Facebook, connecting to Facebook and
	 * requesting required permissions en route if necessary.
	 */
	public void postFacebookMessage(final Bundle bundle_params) {
		connectFacebookAccount(new FacebookConnectHandler() {

			@Override
			public void onSuccess() {
				// safety check
				if (isFinishing())
					return;

				// showProgressDialog("Posting message to Facebook...");

				// check for publish permissions
				if (Session.getActiveSession().getPermissions() == null
						|| !Session.getActiveSession().getPermissions().containsAll(fb_permissions_required)) {
					// need to make a Session.openActiveSessionFromCache(...)
					// call because of a bug in the Facebook sdk where a second
					// call to get permissions won't result in a session
					// callback when the token is updated
					if (Session.openActiveSessionFromCache(MainActivity.this) == null) {
						onFailedPostingFacebookMessage();
						return;
					}

					Session.getActiveSession().addCallback(new Session.StatusCallback() {
						@Override
						public void call(Session session, SessionState state, Exception exception) {
							if (exception != null
									|| state.equals(SessionState.CLOSED)
									|| state.equals(SessionState.CLOSED_LOGIN_FAILED)) {
								// didn't get required permissions
								session.removeCallback(this);

								// safety check
								if (!isFinishing())
									onFailedPostingFacebookMessage();
							} else if (state.equals(SessionState.OPENED_TOKEN_UPDATED)
									&& session.getPermissions().containsAll(fb_permissions_required)) {
								// got required permissions
								session.removeCallback(this);

								// safety check
								if (!isFinishing())
									postFacebookMessage(bundle_params);
							}
						}
					});

					Session.getActiveSession().requestNewPublishPermissions(new Session.NewPermissionsRequest(MainActivity.this, fb_permissions_required));

					return;
				}

				// got sufficient permissions, so publish message
				Request.Callback fb_share_callback = new Request.Callback() {
					@Override
					public void onCompleted(Response response) {
						// safety check
						if (isFinishing())
							return;

						if (response.getError() != null
								|| response.getGraphObject() == null) {
							onFailedPostingFacebookMessage();
							return;
						}

						Object id = response.getGraphObject().getProperty("id");

						if (id == null || !(id instanceof String)
								|| TextUtils.isEmpty((String) id))
							onFailedPostingFacebookMessage();
						else
							onSucceedPostingFacebookMessage((String) id);
					}
				};

				new Request(Session.getActiveSession(), "me/feed", bundle_params, HttpMethod.POST, fb_share_callback).executeAsync();
			}

			@Override
			public void onFailure() {
				// cancelProgressDialog();
				// showToast4Short("Failed connecting to Facebook.");
			}
		});
	}
}