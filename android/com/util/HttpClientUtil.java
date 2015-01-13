package com.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

public class HttpClientUtil {

	private static final Object mSyncObject = new Object();
	private static HttpClientUtil mInstance;

	private HttpClientUtil() {

	}

	public static HttpClientUtil getInstance() {
		synchronized (mSyncObject) {
			if (mInstance != null) {
				return mInstance;
			}
			mInstance = new HttpClientUtil();
		}
		return mInstance;
	}

	/**
	 * get请求 - 使用JDK中HttpURLConnection访问网络资源
	 * 
	 * @param spec
	 * @return
	 */
	public String executeHttpGet(String spec) {
		String result = null;
		URL url = null;
		HttpURLConnection connection = null;
		InputStreamReader in = null;
		try {
			url = new URL(spec);
			connection = (HttpURLConnection) url.openConnection();
			in = new InputStreamReader(connection.getInputStream());
			BufferedReader bufferedReader = new BufferedReader(in);
			StringBuffer strBuffer = new StringBuffer();
			String line = null;
			while ((line = bufferedReader.readLine()) != null) {
				strBuffer.append(line);
			}
			result = strBuffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	/**
	 * post请求 - 使用JDK中HttpURLConnection访问网络资源
	 * 
	 * @param spec
	 * @return
	 */
	public String executeHttpPost(String spec) {
		String result = null;
		URL url = null;
		HttpURLConnection connection = null;
		InputStreamReader in = null;
		try {
			url = new URL(spec);
			connection = (HttpURLConnection) url.openConnection();
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			connection.setRequestProperty("Charset", "utf-8");
			DataOutputStream dop = new DataOutputStream(connection.getOutputStream());
			// dop.writeBytes("token=Elf-mousE");
			dop.flush();
			dop.close();

			in = new InputStreamReader(connection.getInputStream());
			BufferedReader bufferedReader = new BufferedReader(in);
			StringBuffer strBuffer = new StringBuffer();
			String line = null;
			while ((line = bufferedReader.readLine()) != null) {
				strBuffer.append(line);
			}
			result = strBuffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		return result;
	}

	/**
	 * get请求 - 使用Apache的HttpClient访问网络资源
	 * 
	 * @param spec
	 * @return
	 */
	public String executeGet(String spec) {
		String result = null;
		BufferedReader reader = null;
		try {
			HttpClient client = new DefaultHttpClient();
			HttpGet request = new HttpGet();
			request.setURI(new URI(spec));
			HttpResponse response = client.execute(request);
			reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

			StringBuffer strBuffer = new StringBuffer("");
			String line = null;
			while ((line = reader.readLine()) != null) {
				strBuffer.append(line);
			}
			result = strBuffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
					reader = null;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	/**
	 * post请求 - 使用Apache的HttpClient访问网络资源
	 * 
	 * @param spec
	 * @return
	 */
	public String executePost(String spec, String token) {
		String result = null;
		BufferedReader reader = null;
		try {
			HttpClient client = new DefaultHttpClient();
			HttpPost request = new HttpPost();
			request.setURI(new URI(spec));
			List<NameValuePair> postParameters = new ArrayList<NameValuePair>();
			postParameters.add(new BasicNameValuePair("token", token));
			UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(postParameters);
			request.setEntity(formEntity);

			HttpResponse response = client.execute(request);
			reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

			StringBuffer strBuffer = new StringBuffer("");
			String line = null;
			while ((line = reader.readLine()) != null) {
				strBuffer.append(line);
			}
			result = strBuffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
					reader = null;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
}