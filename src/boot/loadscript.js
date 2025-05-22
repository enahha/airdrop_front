import { boot } from 'quasar/wrappers'
// import { Cookies } from 'quasar'
// import axios from 'axios'
import { loadScript } from 'vue-plugin-load-script'

export default boot(async ({ app }) => {
  ///////////////////////////////////////////////////////////
  // loadscript
  ///////////////////////////////////////////////////////////
  app.config.globalProperties.$loadscript = loadScript
  // console.log(loadScript)


  loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')
  .then(() => {
    console.log('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js loaded.')
  })

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js')
  .then(() => {
    console.log('https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js loaded.')
  })
  loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
  .then(() => {
    console.log('https://code.jquery.com/jquery-3.6.0.min.js loaded.')
  })
  try {
    // Load CSS files
    await Promise.all([
      loadStyle('/css/aos.css'),
      // loadStyle('/css/basic.css'),
      loadStyle('/css/bootstrap.min.css'),
      // loadStyle('/css/comm.css'),
      loadStyle('/css/default.css'),
      // loadStyle('/css/font.css'),
      // loadStyle('/css/layout.css'),
      loadStyle('/css/swiper.min.css'),
    ])

    // Load jQuery first
    await loadScript('/js/jquery.min.js')
    console.log('jQuery loaded.')

    // Load other JS files that depend on jQuery
    await Promise.all([
      loadScript('/js/aos.js'),
      loadScript('/js/modal.js'),
      loadScript('/js/modal.remote.js'),
      loadScript('/js/jquery.cookie.min.js'),
      loadScript('/js/bootstrap.min.js'),
      loadScript('/js/bootstrap.modal.remote.js'),
      loadScript('/js/jquery.min.js'),
      loadScript('/js/moment.min.js'),
      loadScript('/js/popper.min.js'),
      loadScript('/js/ui.js'),
      loadScript('/js/swiper.min.js'),
    ])

    AOS.init()
  } catch (error) {
    console.error('Failed to load external resources:', error)
  }
})

  // // 하기 카카오 https://developers.kakao.com/sdk/js/kakao.js 서 버 다 운 된 적 있 음 극 혐 ㅋ (2022년 02월 03일 오전 10시부터 ㅋ)
  // // loadScript('js/kakao.min.js')
  // loadScript('https://developers.kakao.com/sdk/js/kakao.min.js')
  // .then(() => {
  //   // Script is loaded, do something
  //   // 사용할 앱의 JavaScript 키를 설정해 주세요.
  //   // window.Kakao.init(this.$store.state.KAKAO_API_JS_KEY)
  //   window.Kakao.init('e2cfe79d03ff50ee2105682a22d3d17f')
  //   // console.log(Kakao.isInitialized())
  //   app.config.globalProperties.$Kakao = window.Kakao
  // })
  // .catch(() => {
  //   // Failed to fetch script
  //   console.log('kakao loadScript failed.')
  // })

  //loadScript('https://stdpay.inicis.com/stdjs/INIStdPay_popup.js')
  // loadScript('https://stdpay.inicis.com/stdjs/INIStdPay.js')
  // .then(() => {
  //   // Script is loaded, do something
  //   app.config.globalProperties.$INIStdPay = window.INIStdPay
  //   app.config.globalProperties.$paymentMid = 'oneoninc01'
  //   app.config.globalProperties.$paymentSignKey = 'OUp6VkxCTnU5K2xHRkpCYmFZWE5LUT09'
  //   // console.log(app.config.globalProperties.$INIStdPay)
  // })
  // .catch(() => {
  //   // Failed to fetch script
  //   console.log('kakao loadScript failed.')
  // })


  // // 카카오 API 스트립트 로드
  // loadScript('https://developers.kakao.com/sdk/js/kakao.js')
  // .then(() => {
  //   // Script is loaded, do something
  //   // 사용할 앱의 JavaScript 키를 설정해 주세요.
  //   // window.Kakao.init(this.$store.state.KAKAO_API_JS_KEY)
  //   window.Kakao.init('e2cfe79d03ff50ee2105682a22d3d17f')
  //   // console.log(Kakao.isInitialized())
  //   // window.Kakao.init('8204f132470b51916767cceb57475198') // REST_API key
    
  //   // window.Kakao.Auth.authorize({
  //   //   redirectUri: 'http://localhost:8888/api/login/loginKakaoRedirect'
  //   // })
  //   app.config.globalProperties.$Kakao = window.Kakao
  // })
  // .catch(() => {
  //   // Failed to fetch script
  //   console.log('kakao loadScript failed.')
  // })


  // axios.get(
  //   'https://developers.kakao.com/sdk/js/kakao.js',
  //   { 
  //     headers: { 
  //       // 'AuthenticationToken': 'e2cfe79d03ff50ee2105682a22d3d17f',
  //       // 'Authorization' : 'e2cfe79d03ff50ee2105682a22d3d17f',
  //       // 'authority': 'developers.kakao.com',
  //       // 'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  //     } 
  //   }
  // )
  // .then((result) => {
  //   console.log(JSON.stringify(result.data))
  //   app.config.globalProperties.Kakao = result.data
  // })

function loadStyle(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}