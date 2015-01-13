package com.yourappname.browser;

import org.apache.http.protocol.HTTP;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.webkit.HttpAuthHandler;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.util.CommonUtil;
import com.util.DialogUtil;

public class MainActivity extends Activity {

	// web var
	private boolean isConnected = false; // 网络状态
	private boolean isLoading = false;
	// native var
	private final Activity activity = this;
	private WebView browser = null;
	private RelativeLayout mask = null;
	private AnimationDrawable loader = null;
	// string var
	private String current_url = "";
	private String target_url = "";
	int[] Rstr_exit = {};

	private void initBrowser() {
		mask = (RelativeLayout) findViewById(R.id.mask);
		TextView loadingTxv = (TextView) findViewById(R.id.loader);
		loader = (AnimationDrawable) loadingTxv.getBackground();
		loader.start();

		browser = (WebView) findViewById(R.id.browser);
		WebSettings settings = browser.getSettings();
		settings.setDefaultTextEncodingName(HTTP.UTF_8);
		settings.setJavaScriptEnabled(true);

		browser.setBackgroundColor(Color.parseColor("#007D9D54"));
		browser.setVerticalScrollBarEnabled(false); // hide scrollbar
		browser.setWebViewClient(new MyWebViewClient());
		browser.setWebChromeClient(new MyWebChromeClient());
		browser.setOnTouchListener(new OnTouchListener() {
			@Override
			public boolean onTouch(View v, MotionEvent event) {
				if (isLoading) {
					Log.e("isLoading", "true");
					return true;
				} else {
					Log.d("isLoading", "false");
					return false;
				}
			}
		});
	}

	final class MyWebViewClient extends WebViewClient {

		/**
		 * 返回true阻止浏览器处理
		 */
		private boolean checkUrl(WebView view, String url) {
			// 非本站的url
			if (!url.contains(Config.HOST)) {
				CommonUtil.browser(activity, url);
				return true;
			}
			// line分享
			if (url.contains("line://msg/text/")) {
				CommonUtil.browser(activity, url); // openLine
				return true;
			}
			return false;
		}

		// Intercepts url loading
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			Log.e("shouldOverrideUrlLoading before:", url);

			current_url = url;
			// 检查url
			if (checkUrl(view, url)) {
				return true;
			} else {
				target_url = CommonUtil.getFullUrl(url);
			}
			Log.d("shouldOverrideUrlLoading after:", target_url);

			view.loadUrl(target_url);
			return true;
		}

		// Intercepts page started event
		@Override
		public void onPageStarted(WebView view, String url, Bitmap favicon) {
			Log.e("onPageStarted", "Page load start");
			super.onPageStarted(view, url, favicon);
		}

		// Intercepts page finished event
		@Override
		public void onPageFinished(WebView view, String url) {
			Log.d("onPageFinished", "Page load finish");
			super.onPageFinished(view, url);
		}

		// Intercepts the resource loading events
		@Override
		public void onLoadResource(WebView view, String url) {
			if (!isLoadResources) {
				Log.i("onLoadResource", "Block resource loading: " + url);
				return;
			} else {
				Log.i("onLoadResource", "Continue resource loading: " + url);
				super.onLoadResource(view, url);
			}
		}

		// Intercepts error message
		@Override
		public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
			Log.e("onReceivedError", failingUrl);
			Log.d("description", description);
		}

		// Intercepts form resubmission
		@Override
		public void onFormResubmission(WebView view, Message dontResend, Message resend) {
			Log.w("onFormResubmission", "Resubmission");
		}

		// 接收到Http请求的事件
		@Override
		public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
			Log.e("onReceivedHttpAuthRequest", host + view.getUrl());
		}
	}

	/**
	 * Provides a hook for calling "alert" from javascript. Useful for debugging
	 * your javascript.
	 */
	final class MyWebChromeClient extends WebChromeClient {
		@Override
		public void onProgressChanged(WebView view, int progress) {
			activity.setProgress(progress * 100);
			if (progress == 100) {
				isLoading = false;
				mask.setVisibility(View.GONE);
				loader.setVisible(false, false);
			} else {
				if (!isLoading) {
					isLoading = true;
					mask.setVisibility(View.VISIBLE);
					loader.setVisible(true, true);
				}
			}
		}

		@Override
		public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
			result.confirm();
			return true;
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			if (browser != null) {
				// Forwards the back key event to browser plugin
				if (browser.canGoBack()) {
					browser.goBack();
				} else { // Pops up a dialog before exit
					DialogUtil.confirm(this, Rstr_exit, new OnClickListener() {
						@Override
						public void onClick(DialogInterface dialog, int which) {
							android.os.Process.killProcess(android.os.Process.myPid());
						}
					});
				}
			}
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}
}