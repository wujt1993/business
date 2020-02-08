package com.kinth.service;

import java.util.List;
import java.util.Map;

public interface IndexService {

	List<Map<String, Object>> findListByPro(String proName, Map<String, Object> params);
	
	
	Map<String, Object> findPageListByPro(String proName, String pageName, Map<String, Object> params);
}
