<template>
  <div class="main_container page-default">
     <div>
       <div v-if="getWalletAddress" class="header">
         <h1 class="logo"><img src="images/logo.png"></h1>
         <a class="wallet" @click.prevent="disconnect()">
           <img src="images/wallet_icon.png" alt="">
           <b>{{ getWalletAddressLast }}</b>
         </a>
       </div>
       <div v-else class="header">
         <h1 class="logo"><img src="images/logo.png"></h1>
         <a class="wallet" @click.prevent="showWalletModal()">
           <img src="images/wallet_icon.png" alt="">
           <b>Connect Wallet</b>
         </a>
       </div>
 
       <div class="contents">
         <div class="title">
           <div>
             <h2>Real World Assets <br>New Paradigm</h2>
             <p>BUMI BAND NFT</p>
           </div>
         </div>
 
         <ul class="nft_list">
           <li>
             <div class="img"><img src="images/silver_NFT.png" alt=""></div>
             <div class="txt">
               <form action="">
                 <p class="price">NFT Price <b>$ 1,250</b></p>
   
                 <div class="inner">
                   <div class="name">
                     <p class="sub_t">NFT Name</p>
                     <p>BUMI BAND <img src="images/name_icon01.png" alt=""></p>
                   </div>
   
                   <div class="quantity">
                     <p class="sub_t">NFT Purchase quantity</p>
                     <p>1 <span>EA</span></p>
                   </div>
   
                   <div class="components">
                     <p class="sub_t">NFT Components</p>
                     <ul>
                       <li>Alya</li>
                       <li>Fitri</li>
                       <li>Bitcoin</li>
                       <li>WTEC</li>
                     </ul>
                   </div>
   
                   <div class="sales">
                     <p class="sub_t">Sales Quantity</p>
                     <div class="percent">
                       <p>1,000</p>
                       <p class="bar">
                         <span :style="{ width: (nftTypeList[0]?.amount_remain / 10) + '%' }"></span>
                         <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                         <span class="number"
                         :class="{ 'radius': nftTypeList[0]?.amount_remain === 1000 }"
                         :style="{ right: (nftTypeList[0]?.amount_remain / 10) + '%' }">
                           <img src="images/remaining_icon.png" alt="">
                           <br>Remaining: {{ nftTypeList[0]?.amount_remain }}
                         </span>
                       </p>
                       <p>0</p>
                     </div>
                   </div>
   
                   <div class="payment" v-if="nftTypeList[0]?.nftPriceList">
                     <div>
                       <p class="sub_t">Payment</p>
                       <p v-if="nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].currency_symbol }}</p>
                       <p v-else>{{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].currency_symbol }}</p>
                     </div>
                     <div class="ck_box">
                       <p>
                         <label for="USDT_1">
                           <input type="radio" name="coin" id="USDT_1" value="0" v-model="a_mintCurrencySymbolIndex">
                           <span></span>
                           USDT
                         </label>
                       </p>
                       <p>
                         <label for="WTEC_1">
                           <input type="radio" name="coin" id="WTEC_1" value="1" v-model="a_mintCurrencySymbolIndex" checked>
                           <span></span>
                           WTEC
                         </label>
                       </p>
                     </div>
                   </div>
   
                   <button 
                     type="button"
                     :class="nftTypeList[0]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                     @click="handleMintingClick(0, a_mintCurrencySymbolIndex)"
                     :disabled="nftTypeList[0]?.amount_remain === 0"
                   >
                   MINTING
                   </button>
                 </div>
               </form>
             </div>
           </li>
 
           <li>
             <div class="img"><img src="images/gold_NFT.png" alt=""></div>
             <div class="txt">
               <form action="">
                 <p class="price">NFT Price <b>$ 2,500</b></p>
   
                 <div class="inner">
                   <div class="name">
                     <p class="sub_t">NFT Name</p>
                     <p>BUMI BAND <img src="images/name_icon02.png" alt=""></p>
                   </div>
   
                   <div class="quantity">
                     <p class="sub_t">NFT Purchase quantity</p>
                     <p>1 <span>EA</span></p>
                   </div>
   
                   <div class="components">
                     <p class="sub_t">NFT Components</p>
                     <ul>
                       <li>Alya</li>
                       <li>Fitri</li>
                       <li>WTEC</li>
                     </ul>
                   </div>
   
                   <div class="sales">
                     <p class="sub_t">Sales Quantity</p>
                     <div class="percent">
                       <p>1,000</p>
                       <p class="bar">
                         <span :style="{ width: (nftTypeList[1]?.amount_remain / 10) + '%' }"></span>
                         <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                         <span class="number"
                         :class="{ 'radius': nftTypeList[1]?.amount_remain === 1000 }"
                         :style="{ right: (nftTypeList[1]?.amount_remain / 10) + '%' }">
                           <img src="images/remaining_icon.png" alt="">
                           <br>Remaining: {{ nftTypeList[1]?.amount_remain }}
                         </span>
                       </p>
                       <p>0</p>
                     </div>
                   </div>
   
                   <div class="payment" v-if="nftTypeList[1]?.nftPriceList">
                     <div>
                       <p class="sub_t">Payment</p>
                       <p v-if="nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].currency_symbol }}</p>
                       <p v-else>{{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].currency_symbol }}</p>
                     </div>
                     <div class="ck_box">
                       <p>
                         <label for="USDT_2">
                           <input type="radio" name="coin" id="USDT_2" value="0" v-model="s_mintCurrencySymbolIndex">
                           <span></span>
                           USDT
                         </label>
                       </p>
                       <p>
                         <label for="WTEC_2">
                           <input type="radio" name="coin" id="WTEC_2" value="1" v-model="s_mintCurrencySymbolIndex" checked>
                           <span></span>
                           WTEC
                         </label>
                       </p>
                     </div>
                   </div>
   
                   <button 
                     type="button"
                     :class="nftTypeList[1]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                     @click="handleMintingClick(1, s_mintCurrencySymbolIndex)"
                     :disabled="nftTypeList[1]?.amount_remain === 0"
                   >
                   MINTING
                   </button>
                 </div>
               </form>
             </div>
           </li>
 
           <li>
             <div class="img"><img src="images/purple_NFT.png" alt=""></div>
             <div class="txt">
               <form action="">
                 <p class="price">NFT Price <b>$ 5,000</b></p>
   
                 <div class="inner">
                   <div class="name">
                     <p class="sub_t">NFT Name</p>
                     <p>BUMI BAND <img src="images/name_icon03.png" alt=""></p>
                   </div>
   
                   <div class="quantity">
                     <p class="sub_t">NFT Purchase quantity</p>
                     <p>1 <span>EA</span></p>
                   </div>
   
                   <div class="components">
                     <p class="sub_t">NFT Components</p>
                     <ul>
                       <li>Alya</li>
                       <li>Fitri</li>
                       <li>Bitcoin</li>
                       <li>WTEC</li>
                     </ul>
                   </div>
   
                   <div class="sales">
                     <p class="sub_t">Sales Quantity</p>
                     <div class="percent">
                       <p>1,000</p>
                       <p class="bar">
                         <span :style="{ width: (nftTypeList[2]?.amount_remain / 10) + '%' }"></span>
                         <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                         <span class="number"
                         :class="{ 'radius': nftTypeList[2]?.amount_remain === 1000 }"
                         :style="{ right: (nftTypeList[2]?.amount_remain / 10) + '%' }">
                           <img src="images/remaining_icon.png" alt="">
                           <br>Remaining: {{ nftTypeList[2]?.amount_remain }}
                         </span>
                       </p>
                       <p>0</p>
                     </div>
                   </div>
   
                   <div class="payment" v-if="nftTypeList[2]?.nftPriceList">
                     <div>
                       <p class="sub_t">Payment</p>
                       <p v-if="nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].currency_symbol }}</p>
                       <p v-else>{{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].currency_symbol }}</p>
                     </div>
                     <div class="ck_box">
                       <p>
                         <label for="USDT_3">
                           <input type="radio" name="coin" id="USDT_3" value="0" v-model="r_mintCurrencySymbolIndex">
                           <span></span>
                           USDT
                         </label>
                       </p>
                       <p>
                         <label for="WTEC_3">
                           <input type="radio" name="coin" id="WTEC_3" value="1" v-model="r_mintCurrencySymbolIndex" checked>
                           <span></span>
                           WTEC
                         </label>
                       </p>
                     </div>
                   </div>
   
                   <button 
                     type="button"
                     :class="nftTypeList[2]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                     @click="handleMintingClick(2, r_mintCurrencySymbolIndex)"
                     :disabled="nftTypeList[2]?.amount_remain === 0"
                   >
                   MINTING
                   </button>
                 </div>
               </form>
             </div>
           </li>
 
           <li>
             <div class="img"><img src="images/red_NFT.png" alt=""></div>
             <div class="txt">
               <form action="">
                 <p class="price">NFT Price <b>$ 12,500</b></p>
   
                 <div class="inner">
                   <div class="name">
                     <p class="sub_t">NFT Name</p>
                     <p>BUMI BAND <img src="images/name_icon04.png" alt=""></p>
                   </div>
   
                   <div class="quantity">
                     <p class="sub_t">NFT Purchase quantity</p>
                     <p>1 <span>EA</span></p>
                   </div>
   
                   <div class="components">
                     <p class="sub_t">NFT Components</p>
                     <ul>
                       <li>Alya</li>
                       <li>Fitri</li>
                       <li>Bitcoin</li>
                       <li>WTEC</li>
                     </ul>
                   </div>
   
                   <div class="sales">
                     <p class="sub_t">Sales Quantity</p>
                     <div class="percent">
                       <p>1,000</p>
                       <p class="bar">
                         <span :style="{ width: (nftTypeList[3]?.amount_remain / 10) + '%' }"></span>
                         <!-- span.number 가  right:100%면 span.number에 radius클래스 추가해야함 -->
                         <span class="number"
                         :class="{ 'radius': nftTypeList[3]?.amount_remain === 1000 }"
                         :style="{ right: (nftTypeList[3]?.amount_remain / 10) + '%' }">
                             <img src="images/remaining_icon.png" alt="">
                           <br>Remaining: {{ nftTypeList[3]?.amount_remain }}
                         </span>
                       </p>
                       <p>0</p>
                     </div>
                   </div>
   
                   <div class="payment" v-if="nftTypeList[3]?.nftPriceList">
                     <div>
                       <p class="sub_t">Payment</p>
                       <p v-if="nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].currency_symbol }}</p>
                       <p v-else>{{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].currency_symbol }}</p>
                     </div>
                     <div class="ck_box">
                       <p>
                         <label for="USDT_4">
                           <input type="radio" name="coin" id="USDT_4" value="0" v-model="v_mintCurrencySymbolIndex">
                           <span></span>
                           USDT
                         </label>
                       </p>
                       <p>
                         <label for="WTEC_4">
                           <input type="radio" name="coin" id="WTEC_4" value="1" v-model="v_mintCurrencySymbolIndex" checked>
                           <span></span>
                           WTEC
                         </label>
                       </p>
                     </div>
                   </div>
   
                   <button 
                     type="button"
                     :class="nftTypeList[3]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                     @click="handleMintingClick(3, v_mintCurrencySymbolIndex, $event)"
                     :disabled="nftTypeList[3]?.amount_remain === 0"
                   >
                   MINTING
                   </button>
                 </div>
               </form>
             </div>
           </li>
         </ul>
       </div>
   
       <div class="footer">
         <p class="info">
           <b>PURCHASE AND PARTNERSHIP INQUIRY</b>
           Sale_info@bumiband.com 
         </p>
         <p class="copyright">COPYRIGHT © 2024 PT. COOP WORLD INDONESIA. ALL RIGHTS RESERVED.</p>
       </div>
     </div>
   </div>
 
   <WalletModal ref="refWalletModal" @walletLoggedIn="handleWalletLoggedIn"/>
   <DisconnectWalletModal ref="refdisconnectWalletModal" @walletLoggedIn="handleDisconnectWallet"/>
   <!-- <MigrationModal ref="refMigrationModal"/> -->
 
 </template>
 
 <script>
 import { defineComponent } from 'vue'
 import { useI18n } from 'vue-i18n'
 import wait from 'waait'
 // import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js'
 import { QSpinnerGears } from 'quasar'
 // import { prepare, request, getResult, getCardList } from 'klip-sdk'
 // import QRCode from 'qrcode'
 import {
   generateSigner,
   percentAmount,
   keypairIdentity,
 } from "@metaplex-foundation/umi"
 import {
   createNft,
   fetchDigitalAsset,
   verifyCollectionV1,
   mplTokenMetadata,
   updateV1,
   fetchMetadataFromSeeds,
 } from "@metaplex-foundation/mpl-token-metadata"
 import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
 import { PublicKey, Connection, Keypair, Transaction, sendAndConfirmTransaction  } from "@solana/web3.js"
 import {
   getAssociatedTokenAddress,
   createAssociatedTokenAccountInstruction,
   createTransferInstruction,
   AccountLayout,
   ASSOCIATED_TOKEN_PROGRAM_ID,
   TOKEN_PROGRAM_ID,
   getMint,
 } from "@solana/spl-token"
 import bs58 from "bs58"
 
 export default defineComponent({
   name: 'PageIndex',
   data () {
     return {
       isRefundTarget: false, // 환불 대상 여부 : 결제가 정상적으로 완료되는 동시에 환불 대상으로 인식함.
       smallSize: false,
       projectSeq: 1,
       mintAmount: 1, // 일단 지금은 1개로 고정
       // nftType: '',
       // nftTypeOption: [],
       // currencySymbol: '',
       // currencySymbolOption: [],
       nftTypeList: [],
       a_mintCurrencySymbolIndex: 1,
       s_mintCurrencySymbolIndex: 1,
       r_mintCurrencySymbolIndex: 1,
       v_mintCurrencySymbolIndex: 1,
       currencyAmountTotal: 0,
       refundCurrencyAmount: 0, // 환불금액
       // tokenAddress: 'D3nPmh9vVdumcPZeMdsZmit4EDEqgKnKqeisPQ1AkbFC',
       // tokenAddress: '732ScA9LvJU1GWPL7JCUvaxQ6exrJnqs4s1D2YEw4vPZ', // 안영대 전용 코인
     }
   },
   components: {
   },
   computed: {
     getWalletType () {
       return this.$store.getters.getWalletType
     },
     getWalletAddress () {
       return this.$store.getters.getWalletAddress
     },
     getWalletAddressShort () {
       const address = this.$store.getters.getWalletAddress
       if (address) {
         return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.legnth)
       } else {
         return address
       }
     },
     getWalletAddressLast () {
       const address = this.$store.getters.getWalletAddress
       if (address) {
         return '...' + address.substr(address.length - 4, address.legnth)
       } else {
         return address
       }
     },
   },
   created: function () {
     // console.log(this.$q.platform.is.mobile)
     const walletAddress = localStorage.getItem('WALLETADDRESS') ? localStorage.getItem('WALLETADDRESS') : this.$cookie.get('walletAddress')
     const walletType = localStorage.getItem('WALLETTYPE') ? localStorage.getItem('WALLETTYPE') : this.$cookie.get('walletType')
     if (walletAddress && walletType) {
       this.$store.dispatch('setWalletType', walletType)
       this.$store.dispatch('setWalletAddress', walletAddress)
     }
 
 
     // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
     if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
       // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
     ) {
       this.$router.push('/app/loginApp')
       // https://nftpy.io WEB으로 이동
       // alert('move to https://nftpy.io')
       // if (location.origin !== this.$domain) {
       //   location.href = this.$domain
       // }
     }
 
     // 화면 리사이즈 이벤트 핸들러
     window.addEventListener("resize", this.resizeEventHandler)
     if (document.body.offsetWidth < 1024) {
       this.smallSize = true
     }
 
     // nft_type 조회
     this.selectNftTypeList(this.projectSeq)
 
 
     // 해당 민팅 페이지로 이동
     // this.$router.push('/beastar1')
     // this.$router.push('/beastar2')
 
   },
   destroy: function () {
     window.removeEventListener("resize", this.resizeEventHandler)
   },
   mounted: function () {
     // 팬텀지갑 주소변경 이벤트
     this.handlePhantomAccountChange()
   },
   setup () {
     const { locale } = useI18n({ useScope: 'global' })
 
     return {
       locale,
     }
   },
   methods: {
     resizeEventHandler() {
       // console.log('resizeEventHandler')
       // console.log(document.body.offsetWidth)
       if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
         this.smallSize = true
       } else {
         this.smallSize = false
       }
     },
     handleWalletLoggedIn() { 
     },
     handleDisconnectWallet() {
     },
     handleMintingClick(index, mintCurrencySymbolIndex) {
       if (this.getWalletAddress) {
         this.minting(index, mintCurrencySymbolIndex)
       } else {
         this.showWalletModal()
       }
     },
     showWalletModal() {
       this.$refs.refWalletModal.show()
     },
     showDisconnectWalletModal() {
       this.$refs.refdisconnectWalletModal.show()
     },
     callbackWallet(walletVo) {
       // console.log('callbackWallet in MainLayout')
       // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
     },
     // nft_type 리스트 조회
     selectNftTypeList(projectSeq) {
       const paramsNftType = {
         projectSeq: projectSeq,
       }
       this.$axios.get('/api/nfttype/selectNftTypeList', {params: paramsNftType})
         .then((result) => {
           // console.log(result.data)
           if (result && result.data) {
             this.nftTypeList = result.data
 
 
 
             // nftTypeList 루프 - nft_price 리스트 조회
             for (let i = 0; i < this.nftTypeList.length; i++) {
               let nftTypeObject = this.nftTypeList[i]
 
               // nft_price 리스트 조회
               const paramsNftPrice = {
                 projectSeq: projectSeq,
                 nftTypeSeq: nftTypeObject.seq,
               }
               this.$axios.get('/api/nftprice/selectNftPriceList', {params: paramsNftPrice})
                 .then((result) => {
                   // console.log(result.data)
                   if (result && result.data) {
                     nftTypeObject.nftPriceList = result.data
                   } else {
                     nftTypeObject.nftPriceList = []
                     // this.$noti(this.$q, this.$t('no_data_nft_type_list'))
                   }
                 })
                 .catch((error) => {
                   console.error(error)
                 })
             }
 
           } else {
             this.nftTypeList = []
             this.$noti(this.$q, this.$t('no_data_nft_type_list'))
           }
         })
         .catch((error) => {
           console.error(error)
         })
     },
     // // nft_type, nft_price 조회
     // selectNftPriceList(projectSeq, ) {
     //   this.$axios.get('/api/nfttype/selectNftTypeAndPriceList', {params: {projectSeq: projectSeq}})
     //     .then((result) => {
     //       console.log(result.data)
     //       if (result && result.data) {
     //         this.nftTypeList = result.data
     //       } else {
     //         this.nftTypeList = []
     //         this.$noti(this.$q, this.$t('no_data_nft_type_list'))
     //       }
     //     })
     //     .catch((error) => {
     //       console.error(error)
     //     })
     // },
     // selectNftType(projectSeq, nftType) {
     //   //타입별 정보 가져오기
     //   this.$axios.get('/api/nfttype/selectNftType', {params: {projectSeq: projectSeq}})
     //     .then((result) => {
     //       if (result.data.returnCd === "SUCCESS") {
     //         return result.data
     //       } else {
     //         new Error(result.data.resultMsg)
     //       }
     //     })
     //     .catch((error) => {
     //       console.error(error)
     //     })
     // },  
     // 민팅 실행전 체크
     minting(nftTypeIndex, mintCurrencySymbolIndex) {
 
       console.log('nftTypeIndex: ' + nftTypeIndex)
       console.log('nftTypeIndex: ' + mintCurrencySymbolIndex)
 
 
       // 지갑 연결 체크
       if (!this.$store.getters.getWalletAddress) {
         // connect wallet을 안한 경우 모달창 띄우고 리턴
         this.showWalletModal()
         return
       }
 
       // 체크 결과
       let checkResult = true
 
       // 파라미터 체크
       if (!this.projectSeq) {
         this.$noti(this.$q, this.$t('parameter_check_failed_project_seq'))
         checkResult = false
       }
       if (!this.getWalletType) {
         this.$noti(this.$q, this.$t('parameter_check_failed_wallet_type'))
         checkResult = false
       }
       if (!this.getWalletAddress) {
         this.$noti(this.$q, this.$t('parameter_check_failed_wallet_address'))
         checkResult = false
       }
       // if (!nftTypeIndex) {
       //   this.$noti(this.$q, this.$t('parameter_check_failed_nft_type'))
       //   checkResult = false
       // }
       // if (!this.mintAmount) {
       //   this.$noti(this.$q, this.$t('parameter_check_failed_mint_amount'))
       //   checkResult = false
       // }
       // if (!this.mintCurrencySymbolIndex) {
       //   this.$noti(this.$q, this.$t('parameter_check_failed_currency_symbol'))
       //   checkResult = false
       // }
 
       if (!checkResult) {
         // 체크 결과 실패인 경우 리턴
         return
       }
 
       // 민팅 처리 실행
       this.doMinting(nftTypeIndex, mintCurrencySymbolIndex)
     },
     // 민팅 실행
     async doMinting(nftTypeIndex, mintCurrencySymbolIndex) {
 
       // this.$q.loading.show() // 로딩 표시 시작
       // 로딩 표시 시작
       // console.log('로딩 표시 시작')
       this.$q.loading.show({
         spinner: QSpinnerGears,
         message: this.$t('loading_message_minting'),
       })
 
       try { // 테스트를 위해서 잠시 주석처리
         // xxxxObject는 이미 조회되어 있는 VO이고 xxxxVo는 함수안에서 조회한 결과 VO
         const nftTypeObject = this.nftTypeList[nftTypeIndex]
         const nftPriceObject = nftTypeObject.nftPriceList[mintCurrencySymbolIndex]
         console.log('!!!!!! nftPriceObject !!!!!')
         console.log(nftPriceObject)
         
         // 총 결제 비용 계산
         if (nftPriceObject.is_usd_value == 0) {
           // 결제 통화가 USDT인 경우
           this.currencyAmountTotal = nftPriceObject.price_currency * this.mintAmount
         } else {
           this.currencyAmountTotal = nftPriceObject.price_usd * this.mintAmount
         }
 
         console.log("this.currencyAmountTotal: " + this.currencyAmountTotal)
         console.log("currencySymbol: " + nftPriceObject.currency_symbol)
         console.log("currencyContract: " + nftPriceObject.currency_contract)
         console.log("currencyDecimal: " + nftPriceObject.currency_decimal)
         console.log("nftType: " + nftTypeObject.nft_type)
 
         const projectSeq = this.projectSeq
         const walletAddress = this.getWalletAddress
         const walletType = this.getWalletType
         const nftType = nftTypeObject.nft_type
         const currencySymbol = nftPriceObject.currency_symbol
         const currencyContract = nftPriceObject.currency_contract             // 여기 수정!!!!!!!!!!!!!!!!
         let refundCurrencyAmount = this.currencyAmountTotal
 
         // 민팅 대상 NFT VO
         let nftInfoVo = null
 
         /////////////////////////////////////////////////////////////////
         // 1. minting_log 테이블 insert
         /////////////////////////////////////////////////////////////////
         const paramMintingLog = {
           project_seq: projectSeq,
           wallet_address: walletAddress,
           wallet_type: walletType,
           nft_type: nftType,
           currency_symbol: currencySymbol,
           reg_id: walletAddress,
         }
         const resultMintingLog = await this.$axios.post('/api/mintinglog/insertMintingLog', paramMintingLog)
         // console.log(resultMintingLog.data)
         if (!resultMintingLog || !resultMintingLog.data || resultMintingLog.data.returnCd != 0) {
           this.$q.loading.hide()
           this.$noti(this.$q, this.$t('process_failed') + ': insertMintingLog')
           return
         }
 
         const mintingLogSeq = resultMintingLog.data.returnValue.seq // 등록한 로그 seq 설정, update시 사용
 
         /////////////////////////////////////////////////////////////////
         // 2. project 테이블 조회
         /////////////////////////////////////////////////////////////////
         const paramProject = {
           seq: projectSeq,
         }
         const resultProject = await this.$axios.get('/api/project/selectProject', { params: { ...paramProject }})
         // console.log(resultProject.data)
         if (!resultProject || !resultProject.data) {
           this.$q.loading.hide()
           this.$noti(this.$q, this.$t('process_failed') + ': selectProject')
           // 환불 처리
           // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
           return
         }
 
         const projectVo = resultProject.data // 프로젝트 VO
 
         // /////////////////////////////////////////////////////////////////
         // // 3. 결제 (토큰 전송) 및 결제로그 등록
         // /////////////////////////////////////////////////////////////////
         // let payResult = await this.pay(projectSeq
         //                               , walletAddress
         //                               , walletType
         //                               , nftType
         //                               , this.mintAmount
         //                               , currencySymbol
         //                               , currencyContract
         //                               , this.currencyAmountTotal
         //                               , projectVo.fee_wallet_secret_key
         //                               , projectVo.admin_wallet_address)
         // console.log('============================== payResult: ' + payResult)
         // if (!payResult) {
         //   // 결제 실패시 처리 종료
         //   this.$q.loading.hide()
         //   this.$noti(this.$q, this.$t('process_failed') + ': payment')
         //   return
         // }
 
         /////////////////////////////////////////////////////////////////
         // 4. nft_type 테이블 조회
         /////////////////////////////////////////////////////////////////
         const paramNftType = {
           projectSeq: projectSeq,
           nftType: nftType,
         }
         const resultNftType = await this.$axios.get('/api/nfttype/selectNftType', { params: { ...paramNftType }})
         // console.log(resultNftType.data)
         if (!resultNftType || !resultNftType.data) {
           this.$q.loading.hide()
           this.$noti(this.$q, this.$t('process_failed') + ': selectNftType')
           // 환불 처리
           // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
           return
         }
 
         const nftTypeVo = resultNftType.data // NFT 타입 VO
 
         // 남아있는 (처리중이지 않은: status < 10) NFT 갯수 확인
         if (nftTypeVo.amount_remain < this.mintAmount) {
           this.$q.loading.hide()
           // 환불 처리
           // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
           
           this.$noti(this.$q, this.$t('process_failed') + ': selectNftType')
           console.log('nftTypeVo.amount_remain: ' + nftTypeVo.amount_remain + ', mintAmount: ' + this.mintAmount)
           return
         }
         
         /////////////////////////////////////////////////////////////////
         // 5. nft_price 테이블 조회
         /////////////////////////////////////////////////////////////////
         const paramNftPrice = {
           projectSeq: projectSeq,
           nftTypeSeq: nftTypeVo.seq,
           currencySymbol: currencySymbol,
         }
         const resultNftPrice = await this.$axios.get('/api/nftprice/selectNftPrice', { params: { ...paramNftPrice }})
         // console.log(resultNftPrice.data)
         if (!resultNftPrice || !resultNftPrice.data) {
           this.$q.loading.hide()
           this.$noti(this.$q, this.$t('process_failed') + ': selectNftPrice')
           // 환불 처리
           // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
           return
         }
 
         const nftPriceVo = resultNftPrice.data // NFT 가격 VO
 
         // NFT 가격 설정 - 환불 처리를 위해 필요(민팅처리에는 필요없음)
         let nftPrice = 0
         // USD 관련 통화일 경우에는 price_usd를 설정, 그 이외에는 price_currency를 설정
         if (nftPriceVo.is_usd_value == 1) {
           nftPrice = nftPriceVo.price_usd // WTEC는 여기
         } else {
           nftPrice = nftPriceVo.price_currency // USDT는 여기
         }
 
         /////////////////////////////////////////////////////////////////////////////////////////////
         /////////////////////////////////////////////////////////////////////////////////////////////
         // ◆◆◆◆◆◆◆ mintAmount 만큼 반복 처리 ◆◆◆◆◆◆◆ START
         // 각각의 처리 완료시마다 currencyAmount를 차감하여 이후 실패시 환불할 금액 수정
         /////////////////////////////////////////////////////////////////////////////////////////////
         /////////////////////////////////////////////////////////////////////////////////////////////
         // for (let i = 0; i < this.mintAmount; i++) {
           /////////////////////////////////////////////////////////////////
           // 6. nft_info 테이블 조회
           /////////////////////////////////////////////////////////////////
           const paramNftInfo = {
             projectSeq: projectSeq,
             nftType: nftType,
             nftIdStart: nftTypeVo.nft_id_start,
             nftIdEnd: nftTypeVo.nft_id_end,
           }
           let resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfo', { params: { ...paramNftInfo }})
           // console.log(resultNftInfo.data)
           if (!resultNftInfo || !resultNftInfo.data) {
             this.$q.loading.hide()
             this.$noti(this.$q, this.$t('process_failed') + ': selectNftInfo')
             // 환불 처리
             // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
             return
           }
 
           nftInfoVo = resultNftInfo.data
           let nftId = nftInfoVo.nft_id // 민팅 대상 NFT ID
           console.log('☆☆☆☆☆☆☆ target NFT ID: ' + nftId)
 
           // nft_info 테이블에 해당 data의 status를 처리중(10)으로 수정
           const paramNftInfoStatusProcessing = {
             seq: nftInfoVo.seq,
             status: this.$NFT_STATUS_MINT_PROCESSING, // "10"
             mod_id: walletAddress,
           }
           let resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatusProcessing', paramNftInfoStatusProcessing)
           // console.log(resultUpdateStatus.data)
 
           /////////////////////////////////////////////////////////////////////////////////////////////
           // nft_info 데이터 lock에 실패한 경우 - 성공할때까지 300번(key_value에 설정) 재시도 - START
           /////////////////////////////////////////////////////////////////////////////////////////////
           if (!resultUpdateStatus || !resultUpdateStatus.data || resultUpdateStatus.data.returnCd != 0) {
             // this.$noti(this.$q, this.$t('process_failed') + ': updateNftInfoStatusProcessing')
             // 타 사용자로 인해 STATUS가 10으로 변경되어 STATUS < 10 조건이 안맞아서 update에 실패한 경우 resultCount가 0임.
             // 이 경우에는 update가 성공할 때까지 다시 nft_info 테이블을 조회하고 다시 update 함.
             let processCount = 1 // retry 횟수
             let processFailed = false // 프로세스 실패 여부
             
             // 재시도 횟수 설정 - 디폴트 300, key_value 테이블에서 설정값 조회
             let retryCountLimit = 300
             const paramKeyValueRetryCountLimit = {
               cdKey: this.$KEY_VALUE_GET_NFT_ID_RETRY_COUNT_LIMIT,
             }
             const resultKeyValue = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueRetryCountLimit }})
             // console.log(resultKeyValue.data)
             if (resultKeyValue.data) {
               retryCountLimit = resultKeyValue.data
             }
 
             //////////////////////////////////////////////////////////////////////////////////////////////////////////// while START
             // NFT ID 조회 프로세스 반복
             while (resultUpdateStatus && resultUpdateStatus.data && resultUpdateStatus.data.returnCd == 0) {
               
               // 0.1초 대기
               await wait(100)
               
               /////////////////////////////////////////////////////////////////////////////////////////////
               // 다시 nft_info 테이블 조회
               /////////////////////////////////////////////////////////////////////////////////////////////
               resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfo', { params: { ...paramNftInfo }})
               // console.log(resultNftInfo.data)
               if (!resultNftInfo || !resultNftInfo.data || resultNftInfo.data.returnCd != 0) {
                 this.$q.loading.hide()
                 // 조회 결과 없을 경우 환불처리 후 리턴
                 this.$noti(this.$q, this.$t('process_failed') + ': selectNftInfo processCount: ' + processCount)
                 // 환불 처리
                 // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
                 return
               }
               
               // 민팅 대상 NFT ID 설정
               nftInfoVo = resultNftInfo.data
               nftId = nftInfoVo.nft_id // 민팅 대상 NFT ID
               // console.log('☆☆☆☆☆☆☆ target NFT ID: ' + nftId)
               
               // nft_info 테이블에 해당 data의 status를 처리중(10)으로 수정
               resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatusProcessing', paramNftInfoStatusProcessing)
               
               processCount++ // 처리 카운트 증가
               
               // 300회 retry 후 실패 판정
               if ((!resultUpdateStatus || !resultUpdateStatus.data || resultUpdateStatus.data.returnCd != 0) && processCount > retryCountLimit) {
                 processFailed = true
                 break
               }
             }
             //////////////////////////////////////////////////////////////////////////////////////////////////////////// while END
             
             // 300회 retry 후 프로세스 실패 판정시 - 환불 후 처리 종료
             if (processFailed) {
               this.$q.loading.hide()
               // 환불 처리
               // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
               return
             }
             
             /////////////////////////////////////////////////////////////////////////////////////////////
             // nft_info 데이터 lock에 실패한 경우 - 성공할때까지 300번(key_value에 설정) 재시도 - END
             /////////////////////////////////////////////////////////////////////////////////////////////
           }

          //  /////////////////////////////////////////////////////////////////
          //  // 3. 결제 (토큰 전송) 및 결제로그 등록
          //  /////////////////////////////////////////////////////////////////
          //  let payResult = await this.pay(projectSeq
          //                                , walletAddress
          //                                , walletType
          //                                , nftType
          //                                , this.mintAmount
          //                                , currencySymbol
          //                                , currencyContract
          //                                , this.currencyAmountTotal
          //                                , projectVo.fee_wallet_secret_key
          //                                , projectVo.admin_wallet_address)
          //  console.log('============================== payResult: ' + payResult)
          //  if (!payResult) {
          //    // 결제 실패시 처리 종료
          //    this.$q.loading.hide()
          //    this.$noti(this.$q, this.$t('process_failed') + ': payment')
          //    return
          //  }
 
          //  /////////////////////////////////////////////////////////////////////////////////////////////
          //  // 7. New NFT 발행 처리
          //  /////////////////////////////////////////////////////////////////////////////////////////////
          //  let newMintingLogVo = null
          //  try {
          //    newMintingLogVo = await this.mintSolanaNft(projectVo.project_id
          //                                        , projectVo.project_symbol
          //                                        , nftInfoVo.json_file_url // 리빌전 사용할 JSON 파일 URL
          //                                        , projectVo.creator_fee // sellerFeeBasisPoints
          //                                        , projectVo.contract_address
          //                                        , walletAddress
          //                                        , projectVo.fee_wallet_secret_key
          //                                      )
          //  } catch (e) {
          //    // 예외 발생시 환불처리 후 리턴
          //    this.$q.loading.hide()
          //    // 환불 처리
          //    this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
             
          //    // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
          //    if (nftInfoVo != null) {
          //      const paramNftInfoStatusFailed = {
          //        seq: nftInfoVo.seq,
          //        status: this.$NFT_STATUS_MINT_FAILED, // "5"
          //        mod_id: walletAddress,
          //      }
          //      const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          //      // console.log(resultUpdateStatusFailed.data)
          //    }
          //    console.error(e)
          //    return
          //  }


          // 임시로 통합 함수 여기에 넣음
          const signerSecretKeyValue = {
            cdKey: this.$KEY_VALUE_SOLANA_SIGNER_WALLET_SECRET_KEY,
          }
          const resultSignerKeyValue = await this.$axios.get('/api/common/selectKeyValue', { params: { ...signerSecretKeyValue }})
          const signerSecretKey = resultSignerKeyValue.data.returnValue
          let newMintingLogVo = null
          try {
            newMintingLogVo = await this.transferAndMint(projectVo.project_id
                                                        , projectVo.project_symbol
                                                        , nftInfoVo.json_file_url // 리빌전 사용할 JSON 파일 URL
                                                        , projectVo.creator_fee // sellerFeeBasisPoints
                                                        , projectVo.contract_address
                                                        , walletAddress
                                                        , currencyContract
                                                        , this.currencyAmountTotal
                                                        , projectVo.admin_wallet_address
                                                        , projectVo.fee_wallet_secret_key
                                                        , signerSecretKey
                                                      )
          } catch (e) {
            // 예외 발생시 환불처리 후 리턴
            this.$q.loading.hide()
            // 환불 처리
            if (this.isRefundTarget) {
              this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
            }
            
            // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
            if (nftInfoVo != null) {
              const paramNftInfoStatusFailed = {
                seq: nftInfoVo.seq,
                status: this.$NFT_STATUS_MINT_FAILED, // "5"
                mod_id: walletAddress,
              }
              const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
              // console.log(resultUpdateStatusFailed.data)
            }
            console.error(e)
            return
          }
           
           // 처리 결과 없을 경우 환불처리 후 리턴
           if (newMintingLogVo == null) {
             this.$q.loading.hide()
             // 환불 처리
             if (this.isRefundTarget) {
                this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
             }

             
             // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
             if (nftInfoVo != null) {
               const paramNftInfoStatusFailed = {
                 seq: nftInfoVo.seq,
                 status: this.$NFT_STATUS_MINT_FAILED, // "5"
                 mod_id: walletAddress,
               }
               const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
               // console.log(resultUpdateStatusFailed.data)
             }
             return
           }
 
           /////////////////////////////////////////////////////////////////////////////////////////////
           // 8. NFT 정보 status 민팅완료로 update
           /////////////////////////////////////////////////////////////////////////////////////////////
           const paramNftInfoStatusCompleted = {
             seq: nftInfoVo.seq,
             status: this.$NFT_STATUS_MINT_COMPLETED, // "20"
             mod_id: walletAddress,
           }
           resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusCompleted)
           // console.log(resultUpdateStatus.data)
           if (!resultUpdateStatus || !resultUpdateStatus.data || resultUpdateStatus.data.returnCd != 0) {
             this.$q.loading.hide()
             this.$noti(this.$q, this.$t('process_failed') + ': updateNftInfoStatus - NFT_STATUS_MINT_COMPLETED')
             // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
             // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
             // return
           }
 
           /////////////////////////////////////////////////////////////////////////////////////////////
           // 9. NFT 정보 minting_log 테이블에 update
           /////////////////////////////////////////////////////////////////////////////////////////////
           const paramMintingLogUpdate = {
             seq: mintingLogSeq,
             nft_id: nftId,
             mint_account_key: newMintingLogVo.mint_account_key,
             token_account_key: newMintingLogVo.token_account_key,
             metadata_account_key: newMintingLogVo.metadata_account_key,
             master_edition_account_key: newMintingLogVo.master_edition_account_key,
             tx_id: newMintingLogVo.tx_id,
             mod_id: walletAddress,
           }
           const resultMintingLogUpdate = await this.$axios.post('/api/mintinglog/updateMintingLog', paramMintingLogUpdate)
           // console.log(resultMintingLogUpdate.data)
           if (!resultMintingLogUpdate || !resultMintingLogUpdate.data || resultMintingLogUpdate.data.returnCd != 0) {
             this.$noti(this.$q, this.$t('process_failed') + ': updateMintingLog')
             // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
             // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
             // return
           }
 
          //  /////////////////////////////////////////////////////////////////////////////////////////////
          //  // 10. NFT 타입 nft_type 테이블에 amount_remain - 1 update
          //  /////////////////////////////////////////////////////////////////////////////////////////////
          //  const paramNftTypeRemainUpdate = {
          //    seq: nftTypeVo.seq,
          //    mod_id: walletAddress,
          //  }
          //  const resultNftTypeRemainUpdate = await this.$axios.post('/api/nfttype/updateNftTypeRemainCount', paramNftTypeRemainUpdate)
          //  // console.log(resultNftTypeRemainUpdate.data)
          //  if (!resultNftTypeRemainUpdate || !resultNftTypeRemainUpdate.data || resultNftTypeRemainUpdate.data.returnCd != 0) {
          //    this.$noti(this.$q, this.$t('process_failed') + ': updateNftTypeRemainCount')
          //    // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
          //    // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
          //    // return
          //  }
 
           // 민팅 성공시 환불 예정금액 차감 (TODO: 통화가 USD 가치 기준이면 시세 반영 처리 필요)
           refundCurrencyAmount = refundCurrencyAmount - nftPrice
           // if (this.mintAmount == 1) {
           //   // 총 1건 민팅하면서 1건 성공일 경우에는 환불금액 0
           //   refundCurrencyAmount = 0
           // }
         // }
         /////////////////////////////////////////////////////////////////////////////////////////////
         /////////////////////////////////////////////////////////////////////////////////////////////
         // ◆◆◆◆◆◆◆ mintAmount 만큼 반복 처리 ◆◆◆◆◆◆◆ END
         // 각각의 처리 완료시마다 currencyAmount를 차감하여 이후 실패시 환불할 금액 수정
         /////////////////////////////////////////////////////////////////////////////////////////////
         /////////////////////////////////////////////////////////////////////////////////////////////
         this.$q.loading.hide()
         this.$noti(this.$q, this.$t('minting_completed'))

         isRefundTarget = false // 환불 대상 여부 초기화
 
       } catch (e) {
         this.$q.loading.hide()
         // 환불 처리
         if (this.isRefundTarget) {
           this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
         }
         
         // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
         if (nftInfoVo != null) {
           const paramNftInfoStatusFailed = {
             seq: nftInfoVo.seq,
             status: this.$NFT_STATUS_MINT_FAILED, // "5"
             mod_id: walletAddress,
           }
           const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
           // console.log(resultUpdateStatusFailed.data)
         }
         console.error(e)
       }
     },
    //  // 결제
    //  async pay(projectSeq, walletAddress, walletType, nftType, mintAmount, currencySymbol, currencyContract, currencyAmount, feeWalletSecretKey, adminWalletAddress) {
    //    console.log('■■■■■■■ pay ■■■■■■■ START')
    //    let payResult = true
    //    /////////////////////////////////////////////////////////////////
    //    // 2.1 결제 처리
    //    /////////////////////////////////////////////////////////////////
    //    let returnVo = null // sendToken 결과 vo { returnCd(처리결과코드), txid(트랜잭션 아이디) }
    //    try {
    //      console.log('결제 처리')
    //      returnVo = await this.sendToken(currencyContract, currencyAmount, feeWalletSecretKey, adminWalletAddress)
    //    } catch(e) {
    //      console.log(e)
    //      payResult = false // 처리결과 : 실패
    //    }
 
    //    // console.log(result.data)
    //    if (!returnVo || returnVo.returnCd != 0) {
    //      payResult = false // 처리결과 : 실패
    //      console.log('sendToken() returnVo.returnCd: ' + returnVo.returnCd)
    //      this.$noti(this.$q, this.$t('process_failed') + ': pay.sendToken')
    //    }
 
    //    /////////////////////////////////////////////////////////////////
    //    // 2.2 pay_log 테이블에 결제정보 등록
    //    /////////////////////////////////////////////////////////////////
    //    const paramPayLog = {
    //      project_seq: projectSeq,
    //      wallet_address: walletAddress,
    //      wallet_type: walletType,
    //      nft_type: nftType,
    //      mint_amount: mintAmount,
    //      currency_symbol: currencySymbol,
    //      currency_contract: currencyContract,
    //      currency_amount: currencyAmount,
    //      tx_id: returnVo ? returnVo.txid : null,
    //      reg_id: walletAddress,
    //    }
    //    const result = await this.$axios.post('/api/paylog/insertPayLog', paramPayLog)
    //    // console.log(result.data)
    //    if (!result || !result.data || result.data.returnCd != 0) {
    //      payResult = false // 처리결과 : 실패
    //      this.$noti(this.$q, this.$t('process_failed') + ': insertPayLog')
    //    }
    //    console.log('■■■■■■■ pay ■■■■■■■ END')
    //    return payResult
    //  },
     // 환불
     async refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount) {
       console.log('■■■■■■■ refund ■■■■■■■ START')
       isRefundTarget = false // 환불 대상 여부 초기화
       /////////////////////////////////////////////////////////////////
       // 환불 처리
       /////////////////////////////////////////////////////////////////
       let txid = 'refundtxidxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 
       /////////////////////////////////////////////////////////////////
       // refund_log 테이블에 환불정보 등록
       /////////////////////////////////////////////////////////////////
       const paramRefundLog = {
         project_seq: projectSeq,
         wallet_address: walletAddress,
         wallet_type: walletType,
         nft_type: nftType,
         mint_amount: this.mintAmount,
         currency_symbol: currencySymbol,
         currency_contract: currencyContract,
         currency_amount: refundCurrencyAmount,
         tx_id: txid,
         reg_id: walletAddress,
       }
       const result = await this.$axios.post('/api/refundlog/insertRefundLog', paramRefundLog)
       // console.log(result.data)
       if (!result || !result.data || result.data.returnCd != 0) {
         this.$noti(this.$q, this.$t('process_failed') + ': insertRefundLog')
         return
       }
 
       console.log('■■■■■■■ refund ■■■■■■■ END')
     },
     async fetchAssetWithRetries(umi, publicKey, retries = 20, delay = 1000) {
       for (let i = 0; i < retries; i++) {
         try {
           const asset = await fetchDigitalAsset(umi, publicKey)
           return asset
         } catch (error) {
           if (i < retries - 1) {
             await new Promise((resolve) => setTimeout(resolve, delay))
           }
         }
       }
       throw new Error("Failed to fetch asset after multiple attempts")
     },
    //  // 민팅
    //  async mintSolanaNft(
    //    project_id,
    //    project_symbol,
    //    json_file_url,
    //    creator_fee,
    //    collection_mint_address,
    //    walletAddress,
    //    payerSecretKey,
    //  ) {
    //    console.log("■■■■■■■ mintSolanaNft ■■■■■■■ START")
    //    let resultVo = {} // 민팅 후 저장이 필요한 항목 리턴용. txid(트랜잭션 아이디) 포함.
    //    // 온체인 코드
    //    try {
    //      console.log('collection_mint_address : ', collection_mint_address);
 
    //      const collectionKey = new PublicKey(collection_mint_address)
    //      const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
    //      const payer = umi.eddsa.createKeypairFromSecretKey(
    //        bs58.decode(payerSecretKey)
    //      )
    //      umi.use(keypairIdentity(payer))
    //      const tokenOwner = new PublicKey(walletAddress)
 
    //      const mint = generateSigner(umi)
    //      console.log("NFT mint account : ", mint.publicKey)
    //      const createdNft = await createNft(umi, {
    //        mint,
    //        name: project_id,
    //        symbol: project_symbol,
    //        uri: json_file_url,
    //        sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
    //        collection: {
    //          verified: false, // or true if applicable
    //          key: collectionKey,
    //        },
    //        creators: [
    //          {
    //            address: payer.publicKey,
    //            verified: true,
    //            share: 100,
    //          },
    //        ],
    //        authority: payer.publicKey,
    //        tokenOwner: tokenOwner,
    //      }).sendAndConfirm(umi)
 
    //      // NFT 생성 트랜잭션 상태 확인
    //      if (createdNft.result.value.err !== null) {
    //        throw new Error(`Transaction failed with error: ${createdNft.result.value.err}`)
    //      }        
    //      console.log(
    //        "Create NFT Signature : ",
    //        bs58.encode(createdNft.signature)
    //      )
         
    //      // 온체인에 정보가 등록될 때 까지 반복 시도, 정보가 확인되면 asset에 해당 정보를 가져옴
    //      const asset = await this.fetchAssetWithRetries(umi, mint.publicKey)
 
    //      //콜렉션 검증
    //      const metadata = asset.metadata
    //      const verify = await verifyCollectionV1(umi, {
    //        metadata,
    //        collectionMint: collectionKey,
    //        authority: payer.publicKey,
    //      }).sendAndConfirm(umi)
 
    //      //컬렉션 검증 트랜잭션 상태 확인
    //      if (verify.result.value.err !== null) {
    //        throw new Error(`Verification failed with error: ${verify.result.value.err}`)
    //      }
    //      console.log(
    //        "NFT Verify Collection Signature : ",
    //        bs58.encode(verify.signature)
    //      )
 
    //      //토큰 어카운트는 asset에서 가지고 있지 않기 때문에 별도로 서칭
    //      const tokenAccountKey = await getAssociatedTokenAddress(
    //        new PublicKey(mint.publicKey),
    //        tokenOwner,
    //        false, // allow owner off curve
    //        TOKEN_PROGRAM_ID,
    //        ASSOCIATED_TOKEN_PROGRAM_ID
    //      )
 
    //      // 처리 결과 설정 - 로그 등록 항목
    //      resultVo.tx_id = bs58.encode(createdNft.signature)
    //      resultVo.mint_account_key = asset.mint.publicKey
    //      resultVo.token_account_key = tokenAccountKey.toBase58()
    //      resultVo.metadata_account_key = asset.metadata.publicKey
    //      resultVo.master_edition_account_key = asset.edition.publicKey
 
    //      console.log(resultVo)
 
    //      console.log("■■■■■■■ mintSolanaNft ■■■■■■■ END")
    //      return resultVo
    //    } catch (error) {
    //      console.error("Error minting NFT:", error)
    //      return null
    //    }
    //  },
    //  // 토큰 전송(결제)
    //  async sendToken(tokenAddress, amount, payerKey, adminWalletAddress) {
    //    // 반환 오브젝트
    //    let returnVo = {
    //      returnCd: 1 // 0: 정상, 1부터 에러(비정상))
    //      , returnMsg: ''
    //      , txid: ''
    //    }
 
    //    try {
    //      const connection = new Connection(this.$SOLANA_NETWORK)
    //      const walletAddress = this.getWalletAddress
 
    //      console.log('tokenAddress : ', tokenAddress)
    //      console.log('walletAddress : ', walletAddress)
 
    //      const senderPublicKey = new PublicKey(walletAddress)
    //      const mintPublicKey = new PublicKey(tokenAddress)
         
    //      // 송신자의 토큰 주소를 가져옵니다.
    //      const senderTokenAddress = await getAssociatedTokenAddress(
    //        mintPublicKey,
    //        senderPublicKey,
    //        false,
    //        TOKEN_PROGRAM_ID,
    //        ASSOCIATED_TOKEN_PROGRAM_ID
    //      )
    //      console.log('senderTokenAddress : ', senderTokenAddress.toBase58())
 
    //      // 잔액 조회
    //      const accountInfo = await connection.getAccountInfo(senderTokenAddress)
    //      if (accountInfo === null) {
    //        // throw new Error('Failed to find token account')
    //        this.$noti(this.$q, this.$t('process_failed') + ': Failed to find token account.')
    //        returnVo.returnCd = 3
    //        return returnVo
    //      }
    //      const data = Buffer.from(accountInfo.data)
    //      const accountData = AccountLayout.decode(data)
    //      const balance = BigInt(accountData.amount.toString())
    //      console.log(`Token Balance: ${balance}`)
 
    //      // 민트 정보 가져오기
    //      const mintInfo = await getMint(connection, mintPublicKey)
    //      const decimals = mintInfo.decimals
    //      console.log('decimals : ', decimals)
 
    //      // 소수점 고려한 amount를 BigInt 형태로 변환
    //      const adjustedAmount = BigInt(amount * (10 ** decimals))
    //      console.log('adjustedAmount : ', adjustedAmount)
    //      if (adjustedAmount > balance) {
    //        console.error('Insufficient balance.')
    //        this.$noti(this.$q, this.$t('process_failed') + ': Insufficient balance.')
    //        returnVo.returnCd = 1 // 비정상
    //        return returnVo
    //      }
 
    //      const receiverPublicKey = new PublicKey(adminWalletAddress)
 
    //      // 수신자의 토큰 주소를 가져옵니다.
    //      const receiverTokenAddress = await getAssociatedTokenAddress(
    //        mintPublicKey,
    //        receiverPublicKey,
    //        false,
    //        TOKEN_PROGRAM_ID,
    //        ASSOCIATED_TOKEN_PROGRAM_ID
    //      );
 
    //      console.log('receiverTokenAddress : ', receiverTokenAddress.toBase58())
 
    //      // 수신자의 토큰 계좌가 없을 경우 계좌 생성
    //      const receiverAccountInfo = await connection.getAccountInfo(receiverTokenAddress)
    //      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
 
    //      // 수신자의 토큰 계좌가 없을 경우 계좌 생성 트랜잭션 추가
    //      if (!receiverAccountInfo) {
    //        console.log('receiverAccountInfo is null : ', payerKey)
    //        const payer = Keypair.fromSecretKey(bs58.decode(payerKey))
 
    //        const createAssociatedTokenAccountTransaction = new Transaction().add(
    //          createAssociatedTokenAccountInstruction(
    //            payer.publicKey,
    //            receiverTokenAddress,
    //            receiverPublicKey,
    //            mintPublicKey,
    //            TOKEN_PROGRAM_ID,
    //            ASSOCIATED_TOKEN_PROGRAM_ID
    //          )
    //        )
    //        const signature = await sendAndConfirmTransaction(connection, createAssociatedTokenAccountTransaction, [payer])
    //        console.log('createAssociatedTokenAccount signature:', signature)
    //      }
 
    //      // 토큰 전송 트랜잭션 추가
    //      const transaction = new Transaction().add(
    //        createTransferInstruction(
    //          senderTokenAddress,
    //          receiverTokenAddress,
    //          senderPublicKey,
    //          adjustedAmount,
    //          [],
    //          TOKEN_PROGRAM_ID
    //        )
    //      )
 
    //      transaction.recentBlockhash = blockhash
    //      transaction.feePayer = senderPublicKey
 
    //      const signedTransaction = await window.solana.signTransaction(transaction)
 
    //      // 서명된 트랜잭션 전송
    //      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
    //        skipPreflight: false,
    //        maxRetries: 2,
    //      })
 
    //      // 트랜잭션 확인
    //      await connection.confirmTransaction({
    //        blockhash,
    //        lastValidBlockHeight,
    //        signature,
    //      }, 'confirmed')
 
    //      console.log('Transaction signature:', signature)
    //      returnVo.txid = signature
    //      returnVo.returnCd = 0 // 정상
    //      console.log('====================================================== try')
    //      return returnVo
    //    } catch (error) {
    //      console.error('Error during transaction:', error)
    //      this.$noti(this.$q, error)
    //      console.log('====================================================== catch')
    //      returnVo.returnCd = -1
    //      returnVo.returnMsg = error
    //      return returnVo
    //    }
    //  },
     // 결제 및 민팅
     async transferAndMint (
      project_id,
      project_symbol,
      json_file_url,
      creator_fee,
      collection_mint_address,
      walletAddress,
      tokenAddress,
      amount,
      adminWalletAddress,
      systemPayerKey,
      signerKey,
    ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ transferAndMint ■■■■■■■ START")
        const connection = new Connection(this.$SOLANA_NETWORK)
        const metaplexProgram = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)
        const collectionKey = new PublicKey(collection_mint_address)

        console.log('Connected to wallet:', walletAddress)
        console.log('systemPayerKey', systemPayerKey)
        console.log('collection_mint_address', collection_mint_address)

        const payer = Keypair.fromSecretKey(bs58.decode(systemPayerKey))
        const tokenOwner = new PublicKey(walletAddress)

        // 결제와 민팅 트랜잭션 생성
        const transaction = new Transaction()
        // 코인 전송 트랜잭션 인스트럭션 추가
        const senderPublicKey = new PublicKey(walletAddress)
        const mintPublicKey = new PublicKey(tokenAddress)

        ///코인 Transfer 파트
        returnVo = {
          ...this.$ERROR_CODE_GET_ASSOCIATED_TOKEN_ADDRESS
        }
        const senderTokenAddress = await getAssociatedTokenAddress(
          mintPublicKey,
          senderPublicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )

        // 잔액 조회
        const accountInfo = await connection.getAccountInfo(senderTokenAddress)
        if (accountInfo === null) {
          console.error('Failed to find token account.')
          return returnVo
        }
        const data = Buffer.from(accountInfo.data)
        const accountData = AccountLayout.decode(data)
        const balance = BigInt(accountData.amount.toString())
        console.log(`Token Balance: ${balance}`)

        // 민트 정보 가져오기
        const mintInfo = await getMint(connection, mintPublicKey)
        const decimals = mintInfo.decimals
        console.log('decimals : ', decimals)

        // 소수점 고려한 amount를 BigInt 형태로 변환
        const adjustedAmount = BigInt(amount * (10 ** decimals))
        console.log('adjustedAmount : ', adjustedAmount)
        if (adjustedAmount > balance) {
          console.error('Insufficient balance.')
          returnVo = {
            ...this.$ERROR_CODE_ACCOUNT_BALANCE
          }
          return returnVo
        }
        
        const receiverPublicKey = new PublicKey(adminWalletAddress)
        const receiverTokenAddress = await getAssociatedTokenAddress(
          mintPublicKey,
          receiverPublicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )        
        console.log('Get receiverTokenAddress : ', receiverTokenAddress)

        returnVo = {
          ...this.$ERROR_CODE_CREATE_RECEIVER_TOKEN_ACCOUNT
        }
        const receiverAccountInfo = await connection.getAccountInfo(receiverTokenAddress)        
        if (!receiverAccountInfo) {
          // 수신자의 토큰 계좌가 없을 경우 계좌 생성 트랜잭션 추가
          console.log('Creating associated token account for receiver.')
          const createAssociatedTokenAccountTransaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
              payer.publicKey,
              receiverTokenAddress,
              receiverPublicKey,
              mintPublicKey,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          )
          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
          createAssociatedTokenAccountTransaction.recentBlockhash = blockhash;
          createAssociatedTokenAccountTransaction.feePayer = tokenOwner
          const createTokenSignature = await sendAndConfirmTransaction(connection, createAssociatedTokenAccountTransaction, [payer], {
            commitment: 'confirmed',
            preflightCommitment: 'processed',
            skipPreflight: false,
            blockhash,
            lastValidBlockHeight,
          })
          console.log('createTokenSignature : ', createTokenSignature)
        }

        returnVo = {
          ...this.$ERROR_CODE_COIN_TRANSFER
        }
        console.log('Transaction add transferInstruction')
        const transferInstruction = createTransferInstruction(
          senderTokenAddress,
          receiverTokenAddress,
          senderPublicKey,
          adjustedAmount,
          [],
          TOKEN_PROGRAM_ID
        );
        transaction.add(transferInstruction)        
                
        console.log('Start Sign : ', transaction)
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = tokenOwner
        
        const signedTransaction = await window.solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        const transactionResult = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        }, 'confirmed');
        console.log('transactionResult : ', transactionResult)

        ////////////////////////////////////////////////
        // 결제 정상 완료시 isRefundTarget = true로 설정
        ////////////////////////////////////////////////
        isRefundTarget = true

        ///NFT 민팅 파트
        returnVo = {
          ...this.$ERROR_CODE_MINTING_NFT
        }
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
        const umiPayer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(systemPayerKey))        
        const signer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(signerKey))
        umi.use(keypairIdentity(umiPayer, true))
        umi.use(keypairIdentity(signer, false))
        console.log('rpc : ', umi)
                
        const mint = generateSigner(umi)
        console.log('Create Mint : ', mint)
        const metadataPDA = await PublicKey.findProgramAddressSync(
          [
            Buffer.from('metadata'),
            metaplexProgram.toBuffer(),
            new PublicKey(mint.publicKey).toBuffer(),
          ],
          metaplexProgram
        );
        console.log('metadataPDA : ', metadataPDA)

        console.log("NFT mint account : ", mint.publicKey)
        const createdNftInstructions = await createNft(umi, {
          mint,
          name: project_id,
          symbol: project_symbol,
          uri: json_file_url,
          sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
          metadata: metadataPDA,
          payer: umiPayer,
          updateAuthority: signer,          
          collection: {
            verified: false,
            key: collectionKey,
          },
          creators: [
            {
              address: signer.publicKey,
              verified: true,
              share: 100,
            },
          ],
          tokenOwner: tokenOwner,
        }).sendAndConfirm(umi)
        console.log('createdNftInstructions Signature : ', bs58.encode(createdNftInstructions.signature))

        const createdNftAsset = await this.fetchAssetWithRetries(umi, mint.publicKey)
        //콜렉션 검증
        const metadata = createdNftAsset.metadata

        returnVo = {
          ...this.$ERROR_CODE_VERIFY_COLLECTION
        }        
        console.log("verify Collection : ", metadata)
        const verifyInstructions = await verifyCollectionV1(umi, {
          metadata,
          collectionMint: collectionKey,
        }).sendAndConfirm(umi)
        console.log('verifyInstructions Signature : ', bs58.encode(verifyInstructions.signature)) 

        const tokenAccountKey = await getAssociatedTokenAddress(
          new PublicKey(mint.publicKey),
          tokenOwner,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )

        returnVo.returnCd = 0
        returnVo.tx_id = bs58.encode(createdNftInstructions.signature)
        returnVo.mint_account_key = createdNftAsset.mint.publicKey
        returnVo.token_account_key = tokenAccountKey.toBase58()
        returnVo.metadata_account_key = createdNftAsset.metadata.publicKey
        returnVo.master_edition_account_key = createdNftAsset.edition.publicKey
        
        console.log('======== Success Transger And Minting =======')
        return returnVo
      } catch (error) {
        console.error('Error during transaction:', error)
        console.log('returnVo : ', returnVo)
        return returnVo
      }
    },
     // 팬텀 지갑 프로바이더 가져오는 메소드
     getPhantomProvider() {
       if ('phantom' in window && window.phantom.solana && window.phantom.solana.isPhantom) {
         const provider = window.phantom.solana;
         if (provider && provider.isPhantom) {
           return provider;
         }
       }
       return null;
     },
     handlePhantomAccountChange() {
       if ('phantom' in window && window.phantom.solana && window.phantom.solana.isPhantom) {
         const provider = this.getPhantomProvider();
         if (!provider) return;
         
         // 팬텀 지갑 주소 변경 이벤트
         provider.on('accountChanged', async (publicKey) => {
           if (publicKey) {
             // console.log(`Switched to account ${publicKey.toBase58()}`)
             this.$cookie.set('walletAddress', publicKey.toBase58())
             this.$store.dispatch('setWalletAddress', publicKey.toBase58())
             localStorage.setItem('WALLETADDRESS', publicKey.toBase58())
           } else {
             try {
               await provider.connect()
             } catch (error) {
               // console.error('Failed to reconnect to Phantom wallet', error)
             }
           }
         })
       }
     },
     disconnect() {
       this.phantomDisconnecting()
 
       this.$store.dispatch('setWalletType', '')
       this.$store.dispatch('setWalletAddress', '')
       localStorage.setItem('WALLETTYPE', '')
       localStorage.setItem('WALLETADDRESS', '')
 
       const cookieWalletAddressBefor = this.$cookie.set('walletAddress', '')
       const cookieWalletTypBefor = this.$cookie.set('walletType', '')
       console.log('cookieWalletAddressBefor : ' + cookieWalletAddressBefor)
       console.log('cookieWalletTypBefor : ' + cookieWalletTypBefor)
     },
     async phantomDisconnecting() {
       try {
           if (window.solana && window.solana.isPhantom) {
           await window.solana.disconnect()
           // console.log('Phantom wallet disconnected')
           } else {
           // console.error('Phantom wallet is not connected')
           }
       } catch (error) {
           // console.error('Failed to disconnect Phantom wallet', error)
       }
     },  
   },
 })
 </script>
 
 <style>
 @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
 
 /* ----- 에이전트 스타일 초기화 ----- */
 html, body, div, span, applet, object, iframe,
 h1, h2, h3, h4, h5, h6, p, blockquote, pre,
 a, abbr, acronym, address, big, cite, code,
 del, dfn, em, img, ins, kbd, q, s, samp,
 small, strike, strong, sub, sup, tt, var,
 b, u, i, center,
 dl, dt, dd, ol, ul, li,
 fieldset, form, label, legend,
 table, caption, tbody, tfoot, thead, tr, th, td,
 article, aside, canvas, details, embed, 
 figure, figcaption, footer, header, hgroup, 
 menu, nav, output, ruby, section, summary,
 time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   font: inherit;
   vertical-align: baseline;
 }
 article, aside, details, figcaption, figure, 
 footer, header, hgroup, menu, nav, section {
   display: block;
 }
 body {
   line-height: 1;
 }
 ol, ul {
   list-style: none;
 }
 blockquote, q {
   quotes: none;
 }
 blockquote:before, blockquote:after,
 q:before, q:after {
   content: '';
   content: none;
 }
 table {
   border-collapse: collapse;
   border-spacing: 0;
 }
 button{
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   outline: none;
   border: none;
 }
 a{text-decoration: none;}
 /* ----- 에이전트 스타일 초기화 ----- */
 
 
 html{font-size:10px;}
 @media (max-width: 1199.98px) {
   html{	font-size:9.5px;}
 }
 @media (max-width: 991.98px) {
   html{	font-size:9px;}
 }
 /* @media (max-width: 767.98px) {
   html{	font-size:8.5px;}
 }
 @media (max-width: 575.98px) {
   html{	font-size:9px;}
 } */
 
 body{
   font-size:1.4rem; 
   overflow-x:hidden;
   font-family: 'Poppins' , sans-serif;
   font-weight: 400;
   word-break: keep-all;
 }
 .main_container{
   background: url('/images/bg.jpg') no-repeat center bottom / cover;
 }
 .main_container > div{
   position: relative;
   margin: 0 auto;
   padding:0 15px;
   max-width: 1630px;
   box-sizing: border-box;
 }
 .main_container .header{
   z-index: 10;
   position: absolute;
   top: 0; left: 15px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: calc(100% - 30px); height: 15rem;
 }
 .main_container .header .wallet{
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 7px;
   width: 20rem;
   height: 4.5rem;
   background: #524fde;
   border-radius: 2.25rem;
   cursor: pointer
 }
 .main_container .header .wallet b{
   font-size: 1.5rem;
   color: #fff;
 }
 
 .main_container .contents{
   position: relative;
   padding-top:44rem;
   padding-bottom:11.5rem
 }
 .main_container .contents .title{
   position: absolute;
   top: 0; left: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 auto;
   max-width: 1025px;
   width: 100%;
   height: 692px;
   text-align: center;
   background: url('/images/text_deco.png') no-repeat center top / 100% auto;
   transform: translateX(-50%);
 }
 .main_container .contents .title div{
   transform: translateY(-64%);
 }
 .main_container .contents .title h2{
   text-transform: uppercase;
   font-family: "Cormorant Garamond", serif;
   font-size: 6rem;
   font-weight: bold;
   color: #fff;
 }
 .main_container .contents .title p{
   margin-top: 2rem;
   font-size:2rem;
   font-weight: 300;
   color: #a19aff;
 }
 
 .main_container .contents .nft_list{
   display: flex;
   gap: 4rem;
 }
 .main_container .contents .nft_list > li{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 2rem;
   width: 25%;
 }
 .main_container .contents .nft_list > li .img{
   position: relative;
   padding-top: 100%;
 }
 .main_container .contents .nft_list > li .img img{
   position: absolute;
   top: 0; left: 0;
   width: 100%; height: 100%;
 }
 .main_container .contents .nft_list > li .txt{
   padding:1rem;
   height: 100%;
   border-radius: 2rem;
   background: #524fde;
 }
 .main_container .contents .nft_list > li .txt form{
   display: flex;
   flex-direction: column;
   height: 100%;
 }
 .main_container .contents .nft_list .components ul li,
 .main_container .contents .nft_list p{
   font-size: 1.8rem;
   font-weight: 600;
 }
 .main_container .contents .nft_list .payment > div:first-of-type,
 .main_container .contents .nft_list .price,
 .main_container .contents .nft_list .quantity,
 .main_container .contents .nft_list .name{
   display: flex;
   align-items: center;
   justify-content: space-between;
 }
 .main_container .contents .nft_list .price{
   padding:1rem 1.5rem 2rem 1.5rem;
   color: #fff;
 }
 .main_container .contents .nft_list .price b{
   font-size: 3rem;
   font-weight: bold;
 }
 .main_container .contents .nft_list .inner{
   padding: 0 1.5rem 2rem 1.5rem;
   height: 100%;
   background: #fff;
   border-radius: 2rem;
 }
 .main_container .contents .nft_list .inner > div{
   padding:2rem 0;
 }
 .main_container .contents .nft_list .sales,
 .main_container .contents .nft_list .components,
 .main_container .contents .nft_list .quantity,
 .main_container .contents .nft_list .name{
   border-bottom: 1px solid #e2e1e7;
 }
 .main_container .contents .nft_list .sub_t{
   flex-shrink: 0;
   color: #524fde;
 }
 .main_container .contents .nft_list .inner > div.name{
   padding:1.2rem 0;
 }
 .main_container .contents .nft_list .name .sub_t{
   min-width: 10rem;
 }
 .main_container .contents .nft_list .name p:last-child{
   display: flex;
   align-items: center;
   gap:7px;
   text-align: right;
   color: #242060;
   height: 3.6rem;
 }
 .main_container .contents .nft_list .quantity .sub_t{
   min-width: 21rem;
 }
 .main_container .contents .nft_list .quantity p:last-child {text-align: right;}
 .main_container .contents .nft_list .quantity p:last-child span{font-weight: 400;}
 .main_container .contents .nft_list .components ul li{
   display: inline-block;
   margin-top: 1.5rem;
   padding:0 1.2rem;
   border-left: 1px solid #eae9ee;
   box-sizing: border-box;
 }
 .main_container .contents .nft_list .components ul li:first-child,
 .main_container .contents .nft_list .components ul li:nth-child(5){
   padding-left: 0;
   border-left:none;
 }
 .main_container .contents .nft_list .percent{
   display: flex;
   gap: 1.5rem;
   margin-top: 1.5rem;
   padding-bottom: 4rem;
 }
 .main_container .contents .nft_list .percent p{
   font-size: 1.6rem;
   color: #444444;
 }
 .main_container .contents .nft_list .percent .bar{
   position: relative;
   width: 72%;
   height: 10px;
   border-radius: 5px;
   background: #fff;
   border: 1px solid #dfdfdf;
 }
 .main_container .contents .nft_list .percent .bar span{
   position: absolute;
   top: 0; right: 0;
   height: 100%;
   background: #524fde;
   border-top-right-radius: 5px;
   border-bottom-right-radius: 5px;
 }
 .main_container .contents .nft_list .percent .bar span.number{
   top: unset; bottom: -14px;
   text-align: center;
   width: 100%;
   font-size: 1.4rem;
   color: #524fde;
   background: none !important;
   transform: translateX(50%);
 }
 .main_container .contents .nft_list .percent .bar span.radius{
   border-radius: 5px;
 }
 .main_container .contents .nft_list .payment{
   padding-bottom:3rem !important;
 }
 .main_container .contents .nft_list .payment .sub_t{
   min-width: 14rem;
 }
 .main_container .contents .nft_list .payment > div:first-of-type p:last-child{
   text-align: right;
   font-weight: 500;
   color: #bf3a58;
 }
 .main_container .contents .nft_list .payment .ck_box{
   display: flex;
   align-items: center;
   margin-top: 2rem;
 }
 .main_container .contents .nft_list .payment .ck_box p{width: 50%;}
 .main_container .contents .nft_list .payment .ck_box label { 
   display: inline-block; *display: inline; *zoom: 1; 
   position: relative; 
   padding-left: 35px; 
   cursor: pointer;
   -webkit-user-select: none; 
   -moz-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
 }
 .main_container .contents .nft_list .payment .ck_box input[type="radio"] {display: none;}
 .main_container .contents .nft_list .payment .ck_box span{
   width: 2.4rem; height: 2.4rem; 
   border-radius: 50%; 
   position: absolute; 
   top: 50%; left: 0; 
   background: #fff;
   border: 1px solid #cccccc;
   transform: translateY(-50%);
 }
 .main_container .contents .nft_list .payment .ck_box span:after { content: ""; position: absolute; display: none; }
 .main_container .contents .nft_list .payment .ck_box input[type="radio"]:checked + span:after { display: block; }
 .main_container .contents .nft_list .payment .ck_box span:after { 
   width: 18px; height: 18px; background: #524fde; 
   border-radius: 50%; 
   position: absolute; left: 50%; top: 50%; 
   transform: translate(-50%,-50%);
 }
 .main_container .contents .nft_list .btn{
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   padding:0;
   width: 100%;
   height: 6rem;
   text-transform: uppercase;
   font-size: 1.8rem;
   font-weight: bold;
   color: #fff;
   outline: none;
   border: none;
   background-size: 100% 100%;
   background-repeat: no-repeat;
   background-position: center;
   border-radius: 5px;
 }
 .main_container .contents .nft_list .btn.minting{
   background-image: url('/images/btn_bg.png');
 }
 .main_container .contents .nft_list .btn.soldout{
   background-image: url('/images/btn_bg2.png');
 }
 
 .main_container .footer .copyright,
 .main_container .footer{
   z-index: 1;
   position: relative;
 }
 .main_container .footer .copyright::after,
 .main_container .footer::after{
   content:"";
   z-index:-1;
   position:absolute;
   top:0;
   left:50%; right:50%;
   margin-left:-50vw;
   margin-right:-50vw;
   height:100%;
 }
 .main_container .footer::after{background: #000924;}
 .main_container .footer .copyright::after{
   border-top: 1px solid #2d2d2d;
 }
 .main_container .footer .copyright{
   padding:2.5rem 0;
   text-align: center;
   font-size: 1.6rem;
   color: rgba(255, 255, 255, .2);
 }
 .main_container .footer .info{
   padding:5rem 0 4rem 0;
   text-align: center;
   font-size: 1.8rem;
   color: #7471ff;
 }
 .main_container .footer .info b{
   display: block;
   margin-bottom: 1.2rem;
   color: #fff;
 }
 
 @media (max-width:1650px) {
   .main_container .contents .nft_list {gap: 2rem;}
   .main_container .contents .nft_list .price {padding: 1rem 1.5rem 1.5rem 1.5rem;}
   .main_container .contents .nft_list .inner {padding: 0 1.5rem 1.5rem 1.5rem;}
 
   .main_container .contents .nft_list .components ul li, 
   .main_container .contents .nft_list p {font-size: 1.6rem;}
   .main_container .contents .nft_list .price b {font-size: 2.5rem;}
 
   .main_container .contents .nft_list .inner > div {padding: 1.5rem 0;}
   .main_container .contents .nft_list .name p:last-child img{width: 25px;}
   .main_container .contents .nft_list .name .sub_t {
     min-width: 9rem;
   }
   .main_container .contents .nft_list .quantity .sub_t {
     min-width: 19rem;
   }
   .main_container .contents .nft_list .payment .sub_t {
     min-width: 12rem;
   }
   .main_container .contents .nft_list .components ul li {
     margin-top: 1rem;
     padding: 0 1rem;
   }
   .main_container .contents .nft_list .percent {
     gap: 1rem;
     margin-top: 1rem;
     padding-bottom: 3rem;
   }
   .main_container .contents .nft_list .percent .bar{width: 70%;}
   .main_container .contents .nft_list .percent .bar span.number {
     font-size: 1.3rem;
   }
   .main_container .contents .nft_list .payment .ck_box label {
     padding-left: 28px;
   }
   .main_container .contents .nft_list .payment .ck_box span {
     width: 2rem;
     height: 2rem;
   }
   .main_container .contents .nft_list .payment .ck_box span:after {
     width: 1.6rem;
     height: 1.6rem;
   }
   .main_container .contents .nft_list .payment {
     padding-bottom: 2rem !important;
   }
   .main_container .contents .nft_list .btn {
     height: 5rem;
     font-size: 1.6rem;
   }
 }
 @media (max-width:1400px) {
   .main_container .contents .nft_list {gap: 1.5rem;}
   .main_container .contents .nft_list .price {padding: 1rem 7px;}
   .main_container .contents .nft_list .inner {padding: 0 7px 1rem 7px;}
 
   .main_container .contents .nft_list .components ul li, 
   .main_container .contents .nft_list p {font-size: 1.5rem;}
   .main_container .contents .nft_list .price b {font-size: 2.2rem;}
 
   .main_container .contents .nft_list .inner > div {padding: 1rem 0;}
   .main_container .contents .nft_list .name p:last-child img{width: 20px;}
   .main_container .contents .nft_list .name .sub_t {
     min-width: 8.5rem;
   }
   .main_container .contents .nft_list .quantity .sub_t {
     min-width: 16rem;
   }
   .main_container .contents .nft_list .payment > div:first-of-type p:last-child,
   .main_container .contents .nft_list .quantity p:last-child {white-space: nowrap;}
   .main_container .contents .nft_list .payment .sub_t {
     min-width: 11.5rem;
   }
   .main_container .contents .nft_list .components ul li {padding: 0 5px;}
   .main_container .contents .nft_list .percent {
     gap: 5px;
     padding-bottom: 2.5rem;
   }
   .main_container .contents .nft_list .percent .bar span.number {
     font-size: 1.2rem;
   }
   .main_container .contents .nft_list .payment .ck_box {margin-top: 1.5rem;}
   .main_container .contents .nft_list .payment {
     padding-bottom: 1.5rem !important;
   }
   .main_container .contents .nft_list .btn {
     font-size: 1.5rem;
   }
 }
 @media (max-width:1260px) {
   .main_container .contents .nft_list .percent .bar {width: 68%;}
 }
 @media (max-width:1200px) {
   .main_container .header {height: 12rem;}
   .main_container .contents {
     padding-top: 32rem;
     padding-bottom: 8.5rem;
   }
   .main_container .contents .title{height: 550px;}
   .main_container .contents .title h2 {font-size: 5rem;}
   .main_container .contents .title p {
     margin-top: 1.5rem;
     font-size: 1.8rem;
   }
 
   .main_container .contents .nft_list {
     margin: 0 auto;
     max-width: 600px;
     flex-wrap: wrap;
     gap: 1.5rem;
   }
   .main_container .contents .nft_list > li{width: calc(50% - 1rem);  gap: 1rem;}
   .main_container .contents .nft_list .inner > div.name {
     padding: .5rem 0;
   }
 
   .main_container .footer .info {
     padding: 4rem 0 3rem 0;
     font-size: 1.6rem;
   }
   .main_container .footer .copyright {
     padding: 2rem 0;
     font-size: 1.5rem;
   }
 }
 @media (max-width:992px) {
   .main_container .header {height: 10rem;}
   .main_container .contents {padding-top: 30rem; padding-bottom: 7rem;}
   .main_container .contents .title{height: 500px;}
   .main_container .contents .title h2 {font-size: 4.5rem;}
   .main_container .contents .title p {margin-top: 1rem;}
 
   .main_container .footer .info {
     padding: 4rem 0 3rem 0;
     font-size: 1.6rem;
   }
   .main_container .footer .copyright {
     padding: 2rem 0;
     font-size: 1.5rem;
   }
 }
 @media (max-width:768px) {
   .main_container .header .logo img{width: 190px;}
   .main_container .contents {padding-top: 26rem; padding-bottom: 5rem;}
   .main_container .contents .title {height: 440px;}
   .main_container .contents .title div {transform: translateY(-84%);}
   .main_container .contents .title h2 {font-size: 4rem;}
   .main_container .contents .title p {font-size: 1.6rem;}
 
   .main_container .contents .nft_list .price {padding: 1rem;}
   .main_container .contents .nft_list .inner {padding: 0 1rem 1rem 1rem;}
   .main_container .contents .nft_list .quantity .sub_t {min-width: 17rem;}
 
   .main_container .footer .info {
     padding: 4rem 0 3rem 0;
     font-size: 1.6rem;
   }
   .main_container .footer .copyright {
     padding: 2rem 0;
     font-size: 1.5rem;
   }
 }
 @media (max-width:576px){
   .main_container .header .logo img{width: 145px;}
   .main_container .header .wallet{
     gap:4px;
     width: 18rem;
     }
   .main_container .header .wallet img{width: 16px;}
   .main_container .header .wallet b {font-size: 1.4rem;}
 
   .main_container .contents .title {height: 400px;}
   .main_container .contents {padding-top: 22rem;}
   .main_container .contents .title div {transform: translateY(-78%);}
   .main_container .contents .title h2 {font-size: 3rem;}
 
   .main_container .contents .nft_list{max-width: 280px;}
   .main_container .contents .nft_list > li{width: 100%;}
 
   .main_container .contents .nft_list .percent .bar {
     width: 70%;
   }
   .main_container .contents .nft_list .name p:last-child {
     gap: 3px;
   }
 }
 @media (max-width:360px){
   .main_container .header .logo img{width: 130px;}
   .main_container .header .wallet{width: 15rem;}
 }</style>