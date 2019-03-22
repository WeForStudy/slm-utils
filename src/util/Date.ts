export class DateUtil {
  public static format(timstamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
    const _this = new Date(timstamp);
    var o = {
        'M+': _this.getMonth() + 1, //月份
        'd+': _this.getDate(), //日
        'h+': _this.getHours(), //小时
        'm+': _this.getMinutes(), //分
        's+': _this.getSeconds(), //秒
        'q+': Math.floor((_this.getMonth() + 3) / 3), //季度
        'S': _this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
          (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }
}