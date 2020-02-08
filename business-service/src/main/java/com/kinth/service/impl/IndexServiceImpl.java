package com.kinth.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinth.mapper.IndexMapper;
import com.kinth.service.IndexService;

@Service
public class IndexServiceImpl implements IndexService {
	
	@Autowired
	private IndexMapper indexMapper;

	@Override
	public List<Map<String, Object>> findListByPro(String proName, Map<String, Object> params) {
		return indexMapper.findListByPro(proName,params);
	}

	@Override
	public Map<String, Object> findPageListByPro(String proName, String pageName, Map<String, Object> params) {
		Map<String, Object> map = new HashMap<>();
		map.put("total", indexMapper.findListByPro(pageName,params));
		map.put("list", indexMapper.findListByPro(proName,params));
		return map;
	}
	

}
