import request from '@/utils/request-util.js'
export function deepClone(Obj){
	var buf;   
    if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
            buf[i] = deepClone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object){
        buf = {};
        for (var k in Obj) {
            buf[k] = deepClone(Obj[k]);
        }
        return buf;
    }else{
        return Obj;
    }
}

export function numToString(n){
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)){
        return "数据非法";
    }
    var unit = "千百十亿千百十万千百十个", str = "";
    n = parseInt(n) + "";
    if(n.length > unit.length) return "数字过大"
    unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++){
        str += "零一二三四五六七八九".charAt(n.charAt(i)) + unit.charAt(i);
    }
    return str.replace(/零(千|百|十)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|个)/g, "$1").replace(/(亿)万|一(十)/g, "$1$2").replace(/个$/g, ""); 
}

export function padLeftZero(str) {
    str = str + '';
    return ('00' + str).substr(str.length);
}


export function isEmptyString(str){
    return str == "" || str == undefined || str == null;
}

export function isFullEmptyString(str){
    return str == "" || str == undefined || str == null || str == "undefined" || str == "null";
}

export function downloadTemplate(url, name) {
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', '')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


export function GetQueryString(variable){
    var query = window.location.hash.split("?")[1];
    if(!query) return null
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return null
}

export function fileExport(url, fileName,method) {
    request({
        url: url,
        method: method || 'get',
        responseType: 'blob'
    }).then((res)=>{
        // window.open(res)
        download(res, fileName)
    }).catch((res)=>{
    })
}
export function download (data,fileName) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export function checkIP(ip){
    var reg=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式     
    if(reg.test(ip)){     
        if( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256){
          return true;
        }else{     
            return false; 
        }           
    } 
    return false   
}  
