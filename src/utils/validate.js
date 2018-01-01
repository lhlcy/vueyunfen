//手机号
export const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else if (!(/^1[34578]\d{9}$/.test(value))) {
    callback(new Error('请输入正确手机号'));
  } else {
    callback();
  }
};

//用户名
export const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入名称'));
  } else {
    callback();
  }
};


//邮箱
export const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};


//密码
export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }else if (value.length < 6) {
    callback(new Error('至少6位数'));
  } else {
    callback();
  }
};

//新密码
export const validateNewPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'));
  }else if (value.length < 6) {
    callback(new Error('至少6位数'));
  } else {
    callback();
  }
};
//验证码
export const validatepcode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  }else if (value.length < 4) {
    callback(new Error('请输入正确验证码'));
  } else {
    callback();
  }
};

//再次输入新密码
export const validateNewPassAgain = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'));
  }else if (!value === 'newPass') {
    callback(new Error('两次输入的密码不一样'));
  } else {
    callback();
  }
};

//手机验证码
export const validatePhoneCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  }else if (value.length < 4) {
    callback(new Error('至少4位数'));
  } else {
    callback();
  }
};

// 项目标题
export const validateTitle = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入项目标题'));
  }else if (value.length < 4) {
    callback(new Error('至少4位数'));
  } else {
    callback();
  }
};

// 企业名称
export const validateCompanyName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入企业名称'));
  }else if (value.length < 4) {
    callback(new Error('至少4位数'));
  } else {
    callback();
  }
};

// 所有下拉选项
export const validateSelect = (rule, value, callback) => {
  if (value == '' || value == null ) {
    callback(new Error('请选择'));
  } else {
    callback();
  }
};

// 所有输入框
export const validateWrite = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入'));
  } else {
    callback();
  }
};

// 项目亮点
export const validateFeature = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入项目亮点'));
  }else if (value.length < 4) {
    callback(new Error('至少4位数'));
  } else {
    callback();
  }
};

// 融资金额
export const validateMoney = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入融资金额'));
  } else if(!/^\d+(?:\.\d{1,2})?$/.test(value)){
    callback(new Error('请输入大于零(可保留两位小数)的融资金额'));
  } else {
    callback();
  }
};

// 出让股份
export const validateStock = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入出让股份'));
  } else if(!/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/.test(value)){
    callback(new Error('请输入大于零且小于100(可保留两位小数)的出让股份'));
  } else {
    callback();
  }
};

//退出年限
export const validateExitYears = (rule, value, callback) => {
  if(!/^\d+(?:\.\d{1,2})?$/.test(value) && value !== ''){
    callback(new Error('请输入大于零(可保留两位小数)的退出年限'));
  } else {
    callback();
  }
};

// 融资目标
export const validateTarget = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入融资目标'));
  } else {
    callback();
  }
};
// 网址
export const validateUrl = (rule, value, callback) => {
  if (!/(http[s]?)\:\/\/([\w\-_]+(\.[\w\-_]+){0,5}(\:\d+)?)((\/[\w\.\-_]+\/?)*)\/?(\?([\w\._\-]+\=[\w\.\-_\s+%]*\&?)*)?(\#[\w_\/\-]*)?/gi.test(value) && value !== '') {
    callback(new Error('请输入正确的网址'));
  } else {
    callback();
  }
};

// 无验证
export const validateNone = (rule, value, callback) => {
  callback();
};

//公司简介
export  const validateIntroduction=(rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入公司简介'));
  } else if(value.length > 200){
    callback(new Error('请控制在200字以内'));
  }else {

  }
};

//行业关键字
export const validateKey= (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入企业关键字'));
  }else if (value.length > 20) {
    callback(new Error('请控制在20字以内'));
  } else {
    callback();
  }
};

//主营产品
export const validateProduct= (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入主营产品'));
  }
  else {
    callback();
  }
};

//输入总人数
export const validateTotal = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入总人数'));
  } else if(!/^[1-9]\d*$/.test(value)){
    callback(new Error('请输入大于零的整数总人数'));
  } else {
    callback();
  }
};

//合法人
export const validateMan=(rule, value, callback) =>{
  if (value === '') {
    callback(new Error('请输入合法人'));
  } else {
    callback();
  }
};

//注册资金
export const validateRegistermoney = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入注册资金'));
  } else if(!/^[1-9]\d*$/.test(value)){
    callback(new Error('请输入大于零的整数注册资金'));
  } else {
    callback();
  }
};

//注册营业编码
export const validateCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入营业执照编码'));
  } else if(!(/\d{15}/.test(value))){
    callback(new Error('正确营业执照编码'))
  }else {
    callback();
  }
};

export const multipleOption = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error('请选择'));
  } else {
    callback();
  }
};
export const validacontent=(rule,value,callback)=>{
  if(value.length===0){
    callback(new Error('请选择基金类型'));
  }else{
    callback();
  }
}
export const validateDate = (rule, value, callback) => {
  console.log(value);
  if (value === '') {
    callback(new Error('请选择'));
  } else {
    callback();
  }
};

export const validaterecTotal = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入招聘人数'));
  } else if(!/^[1-9]\d*$/.test(value)){
    callback(new Error('请输入正确数字'));
  } else {
    callback();
  }
};
export const validatediscount = (rule, value, callback) => {
  if(!/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/.test(value)){
    callback(new Error('请输入大于零且小于100(可保留两位小数)的折扣'));
  } else {
    callback();
  }
};
