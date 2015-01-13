package com.yourappname.player;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebSettings.PluginState;
import android.webkit.WebView;

import com.util.DeviceUtil;

public class MainActivity extends Activity {

	private WebView player = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		initPlayer();
	}

	private void play() {
		WebSettings settings = player.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setPluginState(PluginState.ON);
		player.setBackgroundColor(Color.parseColor("#00000000"));

		String html = "<html>"
				+ "<head><meta name=\"viewport\" content=\"width=device-width,target-densitydpi=device-dpi\"></head>"
				+ "<body style=\"margin:0\"><iframe width=\""
				+ DeviceUtil.width
				+ "\" height=\""
				+ DeviceUtil.height
				+ "\" src=\"http://www.youtube.com/embed/XXX?rel=0\" frameborder=0></iframe></body>"
				+ "</html>";
		html = html.replace("?", "%3f");

		player.loadData(html, "text/html", "utf-8");
	}

	private void initPlayer() {
		player = (WebView) findViewById(R.id.player);
		player.setVisibility(View.VISIBLE);
		play();
	}
}