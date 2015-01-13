package com.util;

import java.security.MessageDigest;
import java.util.List;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;
import android.webkit.WebView;

/**
 * 通用工具包
 * @author Elf-mousE
 */
public class CommonUtil {

	/**
	 * MD5
	 */
	public static String md5(String string) {
		String result = null;
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
		try {
			byte[] bytes = string.getBytes();
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.update(bytes);
			byte[] updateBytes = messageDigest.digest();
			int len = updateBytes.length;
			char myChar[] = new char[len * 2];
			int k = 0;
			for (int i = 0; i < len; i++) {
				byte byte0 = updateBytes[i];
				myChar[k++] = hexDigits[byte0 >>> 4 & 0x0f];
				myChar[k++] = hexDigits[byte0 & 0x0f];
			}
			result = new String(myChar);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 启动默认浏览器或相应程序（比如：Line）
	 */
	public static void browser(Activity activity, String url) {
		Intent i = new Intent();
		i.setAction(Intent.ACTION_VIEW); // "android.intent.action.VIEW"
		Uri uri = Uri.parse(url);
		i.setData(uri);
		activity.startActivity(i);
	}

	/**
	 * 拼url参数
	 */
	public static String getUrlParam(String key, String value) {
		String append_param = "&" + key + "=" + value;
		return append_param;
	}

	/**
	 * 取主机信息
	 */
	public static String getHost() {
		String url = "http://" + Config.HOST;
		int port = Config.PORT;
		if (port != 80)
			url += ":" + Config.PORT;
		return url;
	}

	/**
	 * 取已配置url
	 */
	public static String getUrlByActionId(int actId) {
		String url = getHost();
		url += "/" + Config.URL[actId];
		url += "?deviceWidth=" + DeviceUtil.width;
		url += "&deviceDensity=" + DeviceUtil.density;
		url += getUrlParam("deviceId", DeviceUtil.uuid);
		url += getUrlParam("appVersion", DeviceUtil.appVersion);
		return url;
	}

	/**
	 * 默认url追加必要参数
	 */
	public static String getFullUrl(String url) {
		if (url.contains("?")) {
			url += "&";
		} else {
			url += "?";
		}
		url += "deviceWidth=" + DeviceUtil.width;
		url += "&deviceDensity=" + DeviceUtil.density;
		url += getUrlParam("deviceId", DeviceUtil.uuid);
		url += getUrlParam("appVersion", DeviceUtil.appVersion);
		return url;
	}

	/**
	 * 相对路径转绝对路径
	 */
	public static String getAbsoluteUrl(String path) {
		return getHost() + path;
	}

	/**
	 * 访问本地文件
	 */
	public static void loadUrlByLocal(WebView webview, String filename) {
		webview.loadUrl("file:///android_asset/" + filename + ".html");
	}

	/**
	 * 复制到剪贴板
	 */
	public static void copyToClipboard(Activity activity, String value) {
		if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.HONEYCOMB) {
			android.text.ClipboardManager clipboard = (android.text.ClipboardManager) activity.getSystemService(Context.CLIPBOARD_SERVICE);
			clipboard.setText(value);
		} else {
			android.content.ClipboardManager clipboard = (android.content.ClipboardManager) activity.getSystemService(Context.CLIPBOARD_SERVICE);
			android.content.ClipData clip = android.content.ClipData.newPlainText("Copied Text", value);
			clipboard.setPrimaryClip(clip);
		}
	}

	/**
	 * APP是否已安装
	 */
	public static boolean appInstalled(Context context, String packageName) {
		boolean isInstalled = false;
		PackageManager pm = context.getPackageManager();
		try {
			pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
			isInstalled = true;
		} catch (PackageManager.NameNotFoundException e) {
			Log.e("appInstalled", e.toString());
		}
		return isInstalled;
	}

	/**
	 * APP是否已打开
	 */
	public static boolean appOpened(Activity activity, String packageName) {
		boolean isOpened = false;
		ActivityManager am = (ActivityManager) activity.getSystemService(Context.ACTIVITY_SERVICE);
		List<RunningAppProcessInfo> procInfos = am.getRunningAppProcesses();
		int count = procInfos.size();
		for (int i = 0; i < count; i++) {
			if (procInfos.get(i).processName.equals(packageName)) {
				isOpened = true;
				break;
			}
		}
		return isOpened;
	}

	// This intent will help you to launch if the package is already installed
	public static void openApp(Activity activity, String packageName) {
		Intent i = activity.getPackageManager().getLaunchIntentForPackage(packageName);
		activity.startActivity(i);
	}
}