import { boot } from 'quasar/wrappers'

import LoginModal from 'components/login/LoginModal'
import WalletModal from 'components/login/WalletModal'
import KlipQRCodeModal from 'components/login/KlipQRCodeModal'
import VueCountdown from '@chenfengyuan/vue-countdown'

import InputNewWalletAddressModal from 'src/components/migration/InputNewWalletAddressModal'

import AirdropApplyModal from 'src/components/airdrop/AirdropApplyModal'
import SearchModal from 'src/components/search/SearchModal'

// import MintingModal from 'src/components/minting/MintingModal'
// import MintingModalIdn from 'src/components/minting/MintingModalIdn'
// import MintingModalKor from 'src/components/minting/MintingModalKor'

// import MintingApplyModal from 'src/components/minting/MintingApplyModal'
// import MintingApplyModalIdn from 'src/components/minting/MintingApplyModalIdn'
// import MintingApplyModalKor from 'src/components/minting/MintingApplyModalKor'

// import MemetoonAccountModal from 'src/components/minting/MemetoonAccountModal'
// import MemetoonAccountModalIdn from 'src/components/minting/MemetoonAccountModalIdn'
// import MemetoonAccountModalKor from 'src/components/minting/MemetoonAccountModalKor'

// import ComingSoonModal from 'src/components/common/ComingSoonModal'
// import ComingSoonModalIdn from 'src/components/common/ComingSoonModalIdn'
// import ComingSoonModalKor from 'src/components/common/ComingSoonModalKor'

export default boot(({ app }) => {
  app.component('LoginModal', LoginModal) // 로그인
  app.component('WalletModal', WalletModal) // 월렛
  app.component('KlipQRCodeModal', KlipQRCodeModal) // 클립 QR코드
  app.component('VueCountdown', VueCountdown) // 사전판매 상세 타임카운터

  app.component('InputNewWalletAddressModal', InputNewWalletAddressModal)

  app.component('AirdropApplyModal', AirdropApplyModal)
  app.component('SearchModal', SearchModal)

  // app.component('MintingModal', MintingModal)
  // app.component('MintingModalIdn', MintingModalIdn)
  // app.component('MintingModalKor', MintingModalKor)

  // app.component('MintingApplyModal', MintingApplyModal)
  // app.component('MintingApplyModalIdn', MintingApplyModalIdn)
  // app.component('MintingApplyModalKor', MintingApplyModalKor)

  // app.component('MemetoonAccountModal', MemetoonAccountModal)
  // app.component('MemetoonAccountModalIdn', MemetoonAccountModalIdn)
  // app.component('MemetoonAccountModalKor', MemetoonAccountModalKor)

  // app.component('ComingSoonModal', ComingSoonModal)
  // app.component('ComingSoonModalIdn', ComingSoonModalIdn)
  // app.component('ComingSoonModalKor', ComingSoonModalKor)
})
