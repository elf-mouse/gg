package com.util;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;

/**
 * 对话框工具包
 * @author Elf-mousE
 */
public class DialogUtil {

	public static void confirm(Activity activity, int[] r_sting, OnClickListener listener) {
		AlertDialog.Builder builder = new AlertDialog.Builder(activity);
		builder.setTitle(r_sting[3]);
		builder.setMessage(r_sting[2]);
		builder.setPositiveButton(r_sting[1], listener);
		builder.setNegativeButton(r_sting[0], new OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
			}
		});
		builder.create().show();
	}
}