package com.kinth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kinth.service.IndexService;

@RestController
public class IndexController {
	
	@Autowired
	private IndexService indexService;
	
	@RequestMapping("/findListByPro/{proName}")
	public List<Map<String, Object>> findListByPro(
			@PathVariable("proName") String proName,
			@RequestParam Map<String,Object> params) {
		return indexService.findListByPro(proName,params);
	}
	
	@RequestMapping("/findPageListByPro/{proName}/{pageName}")
	public Map<String, Object> findPageListByPro(
			@PathVariable("proName") String proName,
			@PathVariable("pageName") String pageName,
			@RequestParam Map<String,Object> params
			) {
		return indexService.findPageListByPro(proName, pageName, params);
	}
	
}
