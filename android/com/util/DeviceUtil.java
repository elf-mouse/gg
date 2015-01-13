package com.util;

import com.util.DeviceUtil;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo.State;
import android.provider.Settings;
import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.util.Log;

/**
 * 设备工具包
 * @author Elf-mousE
 */
public class DeviceUtil {

	public static float density;
	public static int densityDpi;
	public static float xdpi;
	public static float ydpi;
	public static int width = 0;
	public static int height = 0;
	public static String uuid = "undefined";
	public static String appVersion = "1.0";

	/**
	 * 初始化设备信息
	 * use it in yourMainActivity: DeviceUtil.init(this, getApplicationContext());
	 */
	public static void init(Activity activity, Context context) {
		if (uuid.equals("undefined")) {
			DisplayMetrics dm = new DisplayMetrics();
			activity.getWindowManager().getDefaultDisplay().getMetrics(dm);

			density = dm.density; // 屏幕密度（像素比例：0.75/1.0/1.5/2.0）
			densityDpi = dm.densityDpi; // 屏幕密度（每寸像素：120/160/240/320）
			xdpi = dm.xdpi;
			ydpi = dm.ydpi;
			System.out.println("Device: xdpi=" + xdpi + "; ydpi=" + ydpi);
			System.out.println("Device: density=" + density + "; densityDPI=" + densityDpi);

			width = dm.widthPixels; // 屏幕宽度
			height = dm.heightPixels; // 屏幕高度
			System.out.println("Device: screenWidthDip=" + width + "; screenHeightDip=" + height);

			uuid = getUuid(activity);
			System.out.println("Device uuid:" + uuid);

			appVersion = getAppVersionName(context);
			System.out.println("APP current version:" + appVersion);
		}
	}

	/**
	 * 取UUID
	 */
	public static String getUuid(Activity activity) {
		String deviceId = ((TelephonyManager) activity.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
		String imei = Secure.getString(activity.getContentResolver(), Secure.ANDROID_ID);
		String uuid = CommonUtil.md5(deviceId + imei);
		return uuid;
	}

	/**
	 * 当前程序版本号
	 */
	public static String getAppVersionName(Context context) {
		String versionName = "";
		try {
			PackageManager pm = context.getPackageManager();
			PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);
			versionName = pi.versionName;
			if (versionName == null || versionName.length() <= 0) {
				return "";
			}
		} catch (Exception e) {
			Log.e("VersionInfo", "Exception", e);
		}
		return versionName;
	}

	/**
	 * 未开网络提示框
	 */
	public static void showNetworkTips(final Activity activity) {
		AlertDialog.Builder builder = new AlertDialog.Builder(activity);
		builder.setTitle("network_message_title");
		builder.setMessage("network_message_content");
		builder.setPositiveButton("confirm", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// 如果没有网络连接，则进入网络设置界面
				activity.startActivity(new Intent(Settings.ACTION_WIRELESS_SETTINGS));
			}
		});
		builder.setNegativeButton("cancel", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.cancel();
				activity.finish();
			}
		});
		builder.create();
		builder.show();
	}

	/**
	 * 检查网络状态
	 */
	public static boolean isActiveNetworkConnected(Activity activity) {
		boolean isConnected = false;

		ConnectivityManager manager = (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);
		State mobile = manager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState();
		State wifi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState();

		System.out.println("network status - 3G:" + mobile);
		System.out.println("network status - wifi:" + wifi);

		// 如果wifi、2G/3G等网络状态是连接的，则退出，否则显示提示信息进入网络设置界面
		if (wifi == State.CONNECTED || wifi == State.CONNECTING)
			isConnected = true;
		if (mobile == State.CONNECTED || mobile == State.CONNECTING)
			isConnected = true;
		if (!isConnected)
			showNetworkTips(activity);

		return isConnected;
	}

	/**
	 * 取本地数据
	 */
	public static SharedPreferences getLocalData(Activity activity) {
		String name = "your_appname_data";
		SharedPreferences sharedPreferences = activity.getSharedPreferences(name, 0); // Context.MODE_PRIVATE
		return sharedPreferences;
	}
}