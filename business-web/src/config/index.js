import {checkIP} from '@/utils/common-util.js'
let loginUrl = checkIP(window.location.hostname) ? 'http://10.20.102.8:80/connect/oauth2/authorize' : 'https://oauth.yzl.longqueyun.com/connect/oauth2/authorize'
/**
 * @description 系统全局配置
 */
export default {
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 100,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,
  /**
   * @description 此处修改网站名称
   */
  webName: '云上惠园',
  /**
   * @description 是否只保持一个子菜单的展开
   */
  uniqueOpened: true,
  /**
   * @description token key
   */
  TokenKey: 'EL-YZL-TOEKN',
  
  RoleKey: 'EL-YZL-ROLE',

  UserKey: 'EL-YZL-USER',

  WorknoKey: 'EL-YZL-WORKNO',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,

  /**
   * @description 是否显示 tagsView
   */
  tagsView: true,

  /**
   * @description 固定头部
   */
  fixedHeader: false,

  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,

  /**
   * 是否显示设置的悬浮按钮
   */
  settingBtn: true,

  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,

  /**
   * 底部文字，支持html语法
   */
  footerTxt: '© 2019 深圳国寿 <a href="#" target="_blank">云上惠园</a>',

  /**
   * 备案号
   */
  caseNumber: '云上惠园',

  /**
   * 用户角色
   */
  userRole: {
    member: 'ROLE_USER',
    admin: 'ROLE_TEAM',
    worker: 'ROLE_ADMIN',
    asso: 'ROLE_ASSO'
  },
  loginUrl: loginUrl + '?appid=f9fbe823-3eca-46f4-92d8-42a62799051c&response_type=code&scope=snsapi_base&redirect_uri=',
  locationHref: window.location.origin + window.location.pathname,
  rootPath: process.env.BASE_API
}
