// 此处用于存放所以登录相关的接口请求
import request from '@/utils/request'
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 2.获取短信验证码
export const getMsgCode = (captchaCode,
  captchaKey, mobile) => {
  return request.get('/captcha/sendSmsCaptcha',
    {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    }
  )
}
// 3.登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login',
    {
      form: {
        isParty: false,
        partyData: {},
        mobile,
        smsCode
      }
    })
}
