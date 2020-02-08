const VALIDATOR = {
    isVrcode: str => /^[0-9]{6}$/.test(str), // 6位数字验证码
    isEmpty: str => /^\s+$/.test(str), // 全是空白符
        // 银行卡
    isBankCard: str =>/^(\d{16,19})$/.test(str),
    // 手机号（数字）
    isPhone: str => /^1\d{10}$/.test(str),
    // 手机号（带空格`131 2233 4455`）
    isMobileWithSpace: str => /^1\d{2}\s?\d{4}\s?\d{4}$/.test(str),
    // 身份证
    isIdCard: str => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|x|X)$)/.test(str),
    // 中文
    isChinese: str => /^[\u4e00-\u9fa5]{0,}$/.test(str),
    // 中文（2-8位）
    isChinese2to8: str =>/^[\u4e00-\u9fa5\uF900-\uFA2D]{2,8}$/.test(str),
    // 整数或小数
    isIntOrFloat: str => /^[0-9]+\.{0,1}[0-9]{0,2}$/.test(str),
    // 整数
    isInt: str => /^[0-9]*$/.test(str),
    // 非零开头的数字
    isNoZeroStart: str => /^([1-9][0-9]*)$/.test(str),
    // 含有^%&',;=?$\"等特殊字符
    isSpecialStr: str => /[^%&',;=?$\x22]+/.test(str),
    // 邮箱
    isEmail: str => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str),
    // InternetURL地址
    isHttpsUrl: str => /^https:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(str),
    // 电话号码,正确格式为："XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX"
    isTel: str => /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/.test(str),
    // 货币校验
    isMoney: str => /^\d+\.\d{2}$/.test(str),
    // 一年的12月，正确格式为："01"～"09"和"1"～"12"
    isMonth: str => /^(0?[1-9]|1[0-2])$/.test(str),
    // 一个月的31天,正确格式为；"01"～"09"和"1"～"31"。
    isDay: str => /^((0?[1-9])|((1|2)[0-9])|30|31)$/.test(str),
    // 匹配html标签的正则表达式
    isHtml: str => /<(.*)>(.*)<\/(.*)>|<(.*)\/>/.test(str),
    // 匹配空行的正则表达式
    isSpaceEnter: str => /\n[\s| ]*\r/.test(str),
    // qq号码
    isQQ: str => /^[1-9][0-9]{4,}$/.test(str),
    // 邮编
    isZip: str => /^[\d]{6}/.test(str),
    // 匹配双字节字符(包括汉字在内)
    isDoubleByte: str => /[^\x00-\xff]/.test(str),
    require: str => str != ''
}

export default VALIDATOR;