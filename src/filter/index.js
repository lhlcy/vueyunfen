import Vue from 'vue'
import moment from 'moment'
//行业转换
Vue.filter("industry", (value) => {
  let industry = getBasIndustryList.filter(item => value == item.code);
  value = industry.length == 1 ? industry[0].name : "未填写";
  return value;
});

//城市转换
Vue.filter("city", (prov, city) => {
  if (!!prov === false || !!city === false) return "未填写";
  if (isNaN(prov) || isNaN(city)) return "未填写";
  let provName = distpicker.getDistricts(prov);
  let cityName = distpicker.getDistricts(city);
  return provName + ' ' + cityName;
});

//日期转换
Vue.filter("date", (value) => {
  if (!!value === false) return "未填写";
  return moment(value).format('YYYY-MM-DD');
});

//时间转换
Vue.filter("time", (value) => {
  if (!!value === false) return "未填写";
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

//所处阶段
Vue.filter("stage", (value) => {
  if (!!value === false) return "未填写";
  let stage = ['种子期', '初创期', '成长期', '扩张期', '成熟期', 'Pre-IPO'];
  return stage[value - 1];
});

//字符串溢出
Vue.filter('slice', (value, arg) => {
  if (value.length <= arg) {
    return value;
  } else {
    return value.substring(0, arg) + '...';
  }
});
