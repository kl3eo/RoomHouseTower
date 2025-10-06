package org.kurento.tutorial.groupcall;

import java.io.File;
import java.io.IOException;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;

public class GeoLite {

	private static File dbFile = new File("/opt/nvme/ssd/my/GeoLite2-City_20220208/GeoLite2-City.mmdb");

	public static DatabaseReader getReader() throws IOException, GeoIp2Exception {
		DatabaseReader reader = new DatabaseReader.Builder(dbFile).build();
		return reader;
	}

}
