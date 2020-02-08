package com.kinth.mapper;

import java.util.List;
import java.util.Map;

public interface IndexMapper {

	List<Map<String, Object>> findListByPro(String proName, Map<String, Object> params);
	

}
