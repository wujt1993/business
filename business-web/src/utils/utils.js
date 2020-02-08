/**
 * Created by IntelliJ IDEA.
 * Author: leeckey
 * Date: 2019-11-26
 * Description:
 */


export const sleep = (ms = 500) => new Promise(resolve => {
  setTimeout(resolve, ms)
})
