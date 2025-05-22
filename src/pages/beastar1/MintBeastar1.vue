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
      





      <!-- 테스트용 -->
      <div class="text-white">payCurrencyAmountTotal: {{ payCurrencyAmountTotal }}</div>
      <div class="text-white">payCurrencySymbol: {{ payCurrencySymbol }}</div>
      <div class="text-center">
        <q-btn @click="goPage(0)" label="Go" color="green" no-caps style="width: 10%; z-index: 9999;" />
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
            <div class="img"><img src="images/beastar1_main_image.jpg" alt=""></div>
            <div class="txt">
              <form action="">
                <p class="price">NFT Price <b>$ 1</b></p>
  
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
  
                  <div class="payment">
                    <div>
                      <p class="sub_t">Payment</p>
                      <!-- <p v-if="nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].currency_symbol }}</p>
                      <p v-else>{{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[0].nftPriceList[a_mintCurrencySymbolIndex].currency_symbol }}</p> -->
                      <p>{{ paymentCurrencyAmountTypeA }} {{ paymentCurrencySymbolTypeA }}</p>
                    </div>
                    <div class="ck_box">
                      <p>
                        <label for="USDT_1">
                          <input type="radio" name="coin" id="USDT_1" value="0" v-model="a_mintCurrencySymbolIndex" checked @click="getTokenAmount(0, 0)">
                          <span></span>
                          USDT
                        </label>
                      </p>
                      <p>
                        <label for="WTEC_1">
                          <input type="radio" name="coin" id="WTEC_1" value="1" v-model="a_mintCurrencySymbolIndex" @click="getTokenAmount(0, 1)">
                          <span></span>
                          WTEC
                        </label>
                      </p>
                      <p>
                        <label for="BS_1">
                          <input type="radio" name="coin" id="BS_1" value="2" v-model="a_mintCurrencySymbolIndex" checked @click="getTokenAmount(0, 2)">
                          <span></span>
                          BS
                        </label>
                      </p>
                    </div>
                  </div>
  
                  <button 
                    type="button"
                    :class="nftTypeList[0]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                    @click="minting(0, a_mintCurrencySymbolIndex)"
                    :disabled="nftTypeList[0]?.amount_remain === 0"
                  >
                  MINTING
                  </button>
                </div>
              </form>
            </div>
          </li>

          <!-- <li>
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
                        !! span.number 가  right:100%면 span.number에 radius클래스 추가해야함 !!
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
  
                  <div class="payment">
                    <div>
                      <p class="sub_t">Payment</p>
                      !! <p v-if="nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].currency_symbol }}</p>
                      <p v-else>{{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[1].nftPriceList[s_mintCurrencySymbolIndex].currency_symbol }}</p> !!
                      <p>{{ paymentCurrencyAmountTypeS }} {{ paymentCurrencySymbolTypeS }}</p>
                    </div>
                    <div class="ck_box">
                      <p>
                        <label for="USDT_2">
                          <input type="radio" name="coin" id="USDT_2" value="0" v-model="s_mintCurrencySymbolIndex" checked @click="getTokenAmount(1, 0)">
                          <span></span>
                          USDT
                        </label>
                      </p>
                      <p>
                        <label for="WTEC_2">
                          <input type="radio" name="coin" id="WTEC_2" value="1" v-model="s_mintCurrencySymbolIndex" @click="getTokenAmount(1, 1)">
                          <span></span>
                          WTEC
                        </label>
                      </p>
                    </div>
                  </div>
  
                  <button 
                    type="button"
                    :class="nftTypeList[1]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                    @click="minting(1, s_mintCurrencySymbolIndex)"
                    :disabled="nftTypeList[1]?.amount_remain === 0"
                  >
                  MINTING
                  </button>
                </div>
              </form>
            </div>
          </li> -->

          <!-- <li>
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
                        !! span.number 가  right:100%면 span.number에 radius클래스 추가해야함 !!
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
  
                  <div class="payment">
                    <div>
                      <p class="sub_t">Payment</p>
                      !! <p v-if="nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].currency_symbol }}</p>
                      <p v-else>{{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[2].nftPriceList[r_mintCurrencySymbolIndex].currency_symbol }}</p> !!
                      <p>{{ paymentCurrencyAmountTypeR }} {{ paymentCurrencySymbolTypeR }}</p>
                    </div>
                    <div class="ck_box">
                      <p>
                        <label for="USDT_3">
                          <input type="radio" name="coin" id="USDT_3" value="0" v-model="r_mintCurrencySymbolIndex" checked @click="getTokenAmount(2, 0)">
                          <span></span>
                          USDT
                        </label>
                      </p>
                      <p>
                        <label for="WTEC_3">
                          <input type="radio" name="coin" id="WTEC_3" value="1" v-model="r_mintCurrencySymbolIndex" @click="getTokenAmount(2, 1)">
                          <span></span>
                          WTEC
                        </label>
                      </p>
                    </div>
                  </div>
  
                  <button 
                    type="button"
                    :class="nftTypeList[2]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                    @click="minting(2, r_mintCurrencySymbolIndex)"
                    :disabled="nftTypeList[2]?.amount_remain === 0"
                  >
                  MINTING
                  </button>
                </div>
              </form>
            </div>
          </li> -->

          <!-- <li>
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
                        !! span.number 가  right:100%면 span.number에 radius클래스 추가해야함 !!
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
  
                  <div class="payment">
                    <div>
                      <p class="sub_t">Payment</p>
                      !! <p v-if="nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].price_usd }} {{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].currency_symbol }}</p>
                      <p v-else>{{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].price_currency }} {{ nftTypeList[3].nftPriceList[v_mintCurrencySymbolIndex].currency_symbol }}</p> !!
                      <p>{{ paymentCurrencyAmountTypeV }} {{ paymentCurrencySymbolTypeV }}</p>
                    </div>
                    <div class="ck_box">
                      <p>
                        <label for="USDT_4">
                          <input type="radio" name="coin" id="USDT_4" value="0" v-model="v_mintCurrencySymbolIndex" checked @click="getTokenAmount(3, 0)">
                          <span></span>
                          USDT
                        </label>
                      </p>
                      <p>
                        <label for="WTEC_4">
                          <input type="radio" name="coin" id="WTEC_4" value="1" v-model="v_mintCurrencySymbolIndex" @click="getTokenAmount(3, 1)">
                          <span></span>
                          WTEC
                        </label>
                      </p>
                    </div>
                  </div>
  
                  <button 
                    type="button"
                    :class="nftTypeList[3]?.amount_remain === 0 ? 'btn soldout' : 'btn minting'" 
                    @click="minting(3, v_mintCurrencySymbolIndex)"
                    :disabled="nftTypeList[3]?.amount_remain === 0"
                  >
                  MINTING
                  </button>
                </div>
              </form>
            </div>
          </li> -->
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
  <MintingModal ref="refMintingModal" @callback-minting="handleDoMinting"/>
  <!-- <MigrationModal ref="refMigrationModal"/> -->

</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import wait from 'waait'
import { QSpinnerGears } from 'quasar'
//솔라나
// import {
//   generateSigner,
//   percentAmount,
//   keypairIdentity,
//   signerIdentity,
//   transactionBuilder,
// } from "@metaplex-foundation/umi"
// import {
//   PhantomWalletAdapter,
// } from "@solana/wallet-adapter-wallets"
// import {
//   WalletAdapterNetwork,
// } from "@solana/wallet-adapter-base"
// import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import {
//   createNft,
//   fetchDigitalAsset,
//   mplTokenMetadata,
//   findMetadataPda,
//   verifyCollectionV1,
// } from "@metaplex-foundation/mpl-token-metadata"
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
// import { PublicKey, Connection, Transaction, ComputeBudgetProgram  } from "@solana/web3.js"
// import {
//   getAssociatedTokenAddress,
//   createAssociatedTokenAccountInstruction,
//   createTransferInstruction,
//   AccountLayout,
//   ASSOCIATED_TOKEN_PROGRAM_ID,
//   TOKEN_PROGRAM_ID,
//   getMint,
// } from "@solana/spl-token"
import bs58 from "bs58"
//
//BNB
import Web3 from 'web3';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import BN from 'bn.js'; // BN 모듈 직접 import
//

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      isRefundTarget: false, // 환불 대상 여부 : 결제가 정상적으로 완료되는 동시에 환불 대상으로 인식함.
      smallSize: false,
      projectSeq: 2,
      mintAmount: 1, // 일단 지금은 1개로 고정
      nftTypeList: [],
      selectedNftTypeIndex: 0,
      selectedNftPriceIndex: 0,
      selectedNftImage: '',
      selectedNftTypeName: '',
      a_mintCurrencySymbolIndex: 0,
      s_mintCurrencySymbolIndex: 0,
      r_mintCurrencySymbolIndex: 0,
      v_mintCurrencySymbolIndex: 0,
      payCurrencyAmountTotal: 0, // 총 결제금액
      payCurrencySymbol: 'USDT', // 결제 토큰 심볼
      refundCurrencyAmount: 0, // 환불금액

      paymentCurrencyAmountTypeA: '1',
      paymentCurrencyAmountTypeS: '2500',
      paymentCurrencyAmountTypeR: '5000',
      paymentCurrencyAmountTypeV: '12500',
      paymentCurrencySymbolTypeA: 'USDT',
      paymentCurrencySymbolTypeS: 'USDT',
      paymentCurrencySymbolTypeR: 'USDT',
      paymentCurrencySymbolTypeV: 'USDT',

      nftInfoVo: null,

      nftTypeIndex: null,
      mintCurrencySymbolIndex: null,
      dialogTimer: null,
      countdownSeconds: 30, // 초기 팝업 열리면서 30초로 설정
      projectVo: {
        seq: '',
        project_id: '',
        project_symbol: '',
        project_name: '',
        project_name_ko: '',
        mainnet: '',
        contract_address: '',
        json_path: '',
        admin_wallet_address: '',
        fee_wallet_address: '',
        listing_wallet_address: '',
        listing_wallet_secret_key: '',
        fee_wallet_secret_key: '',
        image_url: '',
        description: '',
        description_ko: '',
        mint_start_block: '',
        mint_end_block: '',
        mint_start_time: '',
        mint_end_time: '',
        creator_fee: 0,
        reg_id: '',
        reg_time: '',
        mod_id: '',
        mod_time: '',
        del_id: '',
        del_time: '',
      },
    }
  },
  components: {
  },
  watch: {
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
    isButtonActive () {
      const startTime = new Date(this.projectVo.mint_start_time)
      const endTime = new Date(this.projectVo.mint_end_time)

      // 현재 시간 가져오기
      const now = new Date();
      
      // 현재 시간이 설정한 범위 내에 있는지 확인
      return now >= startTime && now < endTime;
    }
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

    // project start time 조회용
    this.selectProject()

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
    showMintingModal() {
      console.log(this.payCurrencyAmountTotal)
      this.$refs.refMintingModal.payCurrencyAmountTotal = this.payCurrencyAmountTotal
      this.$refs.refMintingModal.payCurrencySymbol = this.payCurrencySymbol
      this.$refs.refMintingModal.selectedNftTypeImage = this.selectedNftTypeImage
      this.$refs.refMintingModal.selectedNftTypeName = this.selectedNftTypeName
      this.$refs.refMintingModal.show()
    },
    handleDoMinting() {
      this.doMinting(this.selectedNftTypeIndex, this.selectedNftPriceIndex)
    },
    callbackWallet(walletVo) {
      // console.log('callbackWallet in MainLayout')
      // this.$store.dispatch('setWalletAddress', walletVo.wallet_address)
    },
    selectProject() {
      const param = {
        seq: this.projectSeq,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            this.projectVo = result.data
            console.log(this.projectVo)
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async insertTxLog(txId, txType, reciver, txStatus) {
      const params = {
        tx_id: txId,
        tx_type: txType,        // tx_type_value : mint, transfer, verify
        sender: this.getWalletAddress,
        reciver: reciver,
        amount: this.mintAmount,
        tx_status: txStatus
      }
      const resultTxLog = this.$axios.post('/api/txlog/insertTxLog', params)

      if (!resultTxLog || !resultTxLog.data || resultTxLog.data.returnCd != 0) {
          this.$q.loading.hide()
          this.$noti(this.$q, this.$t('process_failed') + ': insertTxLog')
          return
        }
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
    // Payment 토큰 가격 설정
    async getTokenAmount(nftTypeIndex, nftPriceIndex) {
      this.$q.loading.show()

      try {
        // const nftTypeVo = this.nftTypeList[nftTypeIndex]
        const nftPriceVo = this.nftTypeList[nftTypeIndex].nftPriceList[nftPriceIndex]

        // 토큰 수량 계산
        let tokenAmount = 0
        if (nftPriceVo.is_usd_value == 1) {
          tokenAmount = await this.getTokenAmountByUsdValue(nftPriceVo.price_usd)
        } else {
          tokenAmount = nftPriceVo.price_currency
        }

        // 가격 설정
        if (nftTypeIndex == 0) {
          this.paymentCurrencyAmountTypeA = tokenAmount
          this.paymentCurrencySymbolTypeA = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 1) {
          this.paymentCurrencyAmountTypeS = tokenAmount
          this.paymentCurrencySymbolTypeS = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 2) {
          this.paymentCurrencyAmountTypeR = tokenAmount
          this.paymentCurrencySymbolTypeR = nftPriceVo.currency_symbol
        } else if (nftTypeIndex == 3) {
          this.paymentCurrencyAmountTypeV = tokenAmount
          this.paymentCurrencySymbolTypeV = nftPriceVo.currency_symbol
        }

        // 결제 정보 설정
        this.payCurrencyAmountTotal = tokenAmount
        this.payCurrencySymbol = nftPriceVo.currency_symbol
      } catch(e) {
        console.error(e)
      }

      this.$q.loading.hide()
    },
    // WTEC Amount 구하기
    async getTokenAmountByUsdValue(usdValue) {
      const usdPrice = await this.getTheLatestPriceOfTheTradingPair()

      if (!usdPrice || usdPrice == 0) {
        return 0
      }
      const currencyAmount = Math.ceil(usdValue / usdPrice)
      // 소수점 처리

      return currencyAmount
    },
    // 시세 조회
    async getTheLatestPriceOfTheTradingPair(targetTokenSymbol) {
      // try {
        if (!targetTokenSymbol) {
          targetTokenSymbol = 'WTEC'
        }
        const param = {
          tokenSymbol: targetTokenSymbol,
        }
        const result = await this.$axios.get('/api/indodax/getIndodaxTokenPrice', { params: { ...param }})
        // console.log(resultKeyValue.data)
        if (result && result.data) {
          return result.data
        } else {
          this.$noti(this.$q, this.$t('no_data_indodax_token_price'))
          return 0
        }
    },
    // 민팅 실행전 체크
    async minting(nftTypeIndex, mintCurrencySymbolIndex) {

      console.log('nftTypeIndex: ' + nftTypeIndex)
      console.log('mintCurrencySymbolIndex: ' + mintCurrencySymbolIndex)


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

      const nftTypeObject = this.nftTypeList[nftTypeIndex]
      const nftPriceObject = nftTypeObject.nftPriceList[mintCurrencySymbolIndex]
      if (nftPriceObject.is_usd_value == 0) {
        // 결제 통화가 USDT인 경우
        this.payCurrencyAmountTotal = nftPriceObject.price_currency * this.mintAmount
      } else {
        // 결제 통화가 WTEC인 경우
        // this.getTokenAmount 내에서 this.payCurrencyAmountTotal를 설정하고 있음
        await this.getTokenAmount(nftTypeIndex, mintCurrencySymbolIndex)
        // this.payCurrencyAmountTotal = this.getTokenAmount(nftTypeIndex, mintCurrencySymbolIndex)
      }
      this.payCurrencySymbol = nftPriceObject.currency_symbol

      // TODO: 민팅 확인 팝업화면 표시 -> 확인 클릭시 doMinting 실행 (아래에 민팅 처리 실행은 주석처리)
      
      this.selectedNftTypeIndex = nftTypeIndex
      this.selectedNftPriceIndex = mintCurrencySymbolIndex
      // 선택한 nft 이미지, 이름 세팅
      this.selectedNftTypeImage = nftTypeObject.image_url
      this.selectedNftTypeName = nftTypeObject.nft_type_name

      // 민팅 확인 팝업화면 표시
      this.showMintingModal()

      // 민팅 처리 실행
      // this.doMinting(nftTypeIndex, mintCurrencySymbolIndex)
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
        
        //  // 총 결제 비용 계산
        //  if (nftPriceObject.is_usd_value == 0) {
        //    // 결제 통화가 USDT인 경우
        //    this.payCurrencyAmountTotal = nftPriceObject.price_currency * this.mintAmount
        //  } else {
        //    this.payCurrencyAmountTotal = nftPriceObject.price_usd * this.mintAmount
        //  }

        console.log("this.payCurrencyAmountTotal: " + this.payCurrencyAmountTotal)
        console.log("currencySymbol: " + nftPriceObject.currency_symbol)
        console.log("currencyContract: " + nftPriceObject.currency_contract)
        console.log("currencyDecimal: " + nftPriceObject.currency_decimal)
        console.log("nftType: " + nftTypeObject.nft_type)

        const projectSeq = this.projectSeq
        const walletAddress = this.getWalletAddress
        const walletType = this.getWalletType
        const nftType = nftTypeObject.nft_type
        const currencySymbol = nftPriceObject.currency_symbol
        const currencyContract = nftPriceObject.currency_contract
        this.refundCurrencyAmount = this.payCurrencyAmountTotal

        // 민팅 대상 NFT VO
        this.nftInfoVo = null

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

          this.nftInfoVo = resultNftInfo.data
          let nftId = this.nftInfoVo.nft_id // 민팅 대상 NFT ID
          console.log('☆☆☆☆☆☆☆ target NFT ID: ' + nftId)

          // nft_info 테이블에 해당 data의 status를 처리중(10)으로 수정
          const paramNftInfoStatusProcessing = {
            seq: this.nftInfoVo.seq,
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
              this.nftInfoVo = resultNftInfo.data
              nftId = this.nftInfoVo.nft_id // 민팅 대상 NFT ID
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

          let newMintingLogVo = null
          try {
            newMintingLogVo = await this.transferBNBCoin(currencyContract, this.payCurrencyAmountTotal, projectVo.admin_wallet_address)
          } catch (e) {
            // 예외 발생시 환불처리 후 리턴
            this.$q.loading.hide()
            console.error(e)

            this.$noti(this.$q, this.$t('process_failed') + ': transferAndMint - catch')

            // 환불 처리
            if (this.isRefundTarget) {
              this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, this.refundCurrencyAmount)
            }
           
            // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
            if (this.nftInfoVo != null) {
              const paramNftInfoStatusFailed = {
                seq: this.nftInfoVo.seq,
                status: this.$NFT_STATUS_MINT_FAILED, // "5"
                mod_id: walletAddress,
              }
              const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
              // console.log(resultUpdateStatusFailed.data)
            }
            return
          }
          
          // 처리 결과 없을 경우 환불처리 후 리턴
          if (newMintingLogVo == null || newMintingLogVo.returnCd != 0) {
            this.$q.loading.hide()

            this.$noti(this.$q, this.$t('process_failed') + ': transferAndMint - newMintingLogVo.returnCd != 0')
            this.$noti(this.$q, newMintingLogVo.returnMsg)

            // 환불 처리
            if (this.isRefundTarget) {
               this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, this.refundCurrencyAmount)
            }
            
            // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
            if (this.nftInfoVo != null) {
              const paramNftInfoStatusFailed = {
                seq: this.nftInfoVo.seq,
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
            seq: this.nftInfoVo.seq,
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
            // token_account_key: newMintingLogVo.token_account_key,
            metadata_account_key: newMintingLogVo.metadata_account_key,
            // master_edition_account_key: newMintingLogVo.master_edition_account_key,
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

          // /////////////////////////////////////////////////////////////////////////////////////////////
          // // 10. NFT 타입 nft_type 테이블에 amount_remain - 1 update
          // /////////////////////////////////////////////////////////////////////////////////////////////
          // const paramNftTypeRemainUpdate = {
          //   seq: nftTypeVo.seq,
          //   mod_id: walletAddress,
          // }
          // const resultNftTypeRemainUpdate = await this.$axios.post('/api/nfttype/updateNftTypeRemainCount', paramNftTypeRemainUpdate)
          // // console.log(resultNftTypeRemainUpdate.data)
          // if (!resultNftTypeRemainUpdate || !resultNftTypeRemainUpdate.data || resultNftTypeRemainUpdate.data.returnCd != 0) {
          //   this.$noti(this.$q, this.$t('process_failed') + ': updateNftTypeRemainCount')
          //   // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
          //   // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
          //   // return
          // }

          // 민팅 성공시 환불 예정금액 차감 (TODO: 통화가 USD 가치 기준이면 시세 반영 처리 필요)
          this.refundCurrencyAmount = this.refundCurrencyAmount - nftPrice
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

        this.isRefundTarget = false // 환불 대상 여부 초기화

      } catch (e) {
        this.$q.loading.hide()
        console.error(e)
        // 환불 처리
        if (this.isRefundTarget) {
          this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, this.refundCurrencyAmount)
        }
        
        // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
        if (this.nftInfoVo != null) {
          const paramNftInfoStatusFailed = {
            seq: this.nftInfoVo.seq,
            status: this.$NFT_STATUS_MINT_FAILED, // "5"
            mod_id: walletAddress,
          }
          const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          // console.log(resultUpdateStatusFailed.data)
        }
      }
    },
    // 환불
    async refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount) {
      console.log('■■■■■■■ refund ■■■■■■■ START')
      this.isRefundTarget = false // 환불 대상 여부 초기화
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
    async transferBNBCoin(
      tokenAddress,
      amount,
      adminWalletAddress,
    ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ transfer BNB Coin ■■■■■■■ START")
        // MetaMask 연결 설정
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum)

          //메인넷 체크 코드, 테스트할땐 주석 처리 필요
          const networkId = await web3.eth.net.getId();
          if (networkId !== this.$BSC_MAINNET_ID) {
            returnVo = {
              ...this.$ERROR_CODE_REQUIRE_MAINNET_NETWORK
            }
            return returnVo            
          }

          returnVo = {
            ...this.$ERROR_CODE_GET_ASSOCIATED_TOKEN_ADDRESS
          }
          const accounts = await web3.eth.getAccounts()
          const senderAddress = accounts[0]
          const tokenContract = new web3.eth.Contract(ERC20.abi, tokenAddress)
          const decimals = await tokenContract.methods.decimals().call()
          const adjustedAmount = new BN(amount).mul(new BN(10).pow(new BN(decimals)))

          returnVo = {
            ...this.$ERROR_CODE_ACCOUNT_BALANCE
          }
          // 잔액 조회
          const balance = await tokenContract.methods.balanceOf(senderAddress).call()
          const balanceBN = new BN(balance)
          console.log(`Token Balance: ${balanceBN.toString()}`)

          if (adjustedAmount.gt(balanceBN)) {
            console.error('Insufficient balance.')
            return returnVo
          }

          returnVo = {
            ...this.$ERROR_CODE_COIN_TRANSFER
          }
          // 트랜잭션 생성 및 전송
          const tx = tokenContract.methods.transfer(adminWalletAddress, adjustedAmount.toString())
          const gas = await tx.estimateGas({ from: senderAddress })
          const gasPrice = await web3.eth.getGasPrice()
          const data = tx.encodeABI()
          const txData = {
            from: senderAddress,
            to: tokenAddress,
            data: data,
            gas,
            gasPrice,
          };

          const receipt = await web3.eth.sendTransaction(txData)
          console.log('ERC-20 Transfer Receipt:', receipt.transactionHash)

          returnVo = {
            returnCd: 0,
            tx_id: receipt.transactionHash
          }

          console.log('======== Success Transfer Coin =======');
          return returnVo;
        } else {
          console.error('MetaMask is not installed.');
          return returnVo;
        }
      } catch (error) {
        console.error('Error during transaction:', error)
        return returnVo;
      }
    },
    async transferSolanaCoin (
        walletAddress,
        tokenAddress,
        amount,
        adminWalletAddress,
      ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ transfer Solana ■■■■■■■ START")
        const connection = new Connection(this.$SOLANA_NETWORK)

        console.log('Connected to wallet:', walletAddress)
        const tokenOwner = new PublicKey(walletAddress)
        const computeUnitPriceIx = ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 10000, // 설정할 추가 수수료
        })

        // 결제와 민팅 트랜잭션 생성
        const transaction = new Transaction()
        transaction.add(computeUnitPriceIx)
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
          transaction.add(
            computeUnitPriceIx,
            createAssociatedTokenAccountInstruction(
              senderPublicKey,
              receiverTokenAddress,
              receiverPublicKey,
              mintPublicKey,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          )
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
        )
        transaction.add(transferInstruction)        
              
        console.log('Start Sign : ', transaction)
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = tokenOwner
      
        const signedTransaction = await window.solana.signTransaction(transaction)
        const signature = await connection.sendRawTransaction(signedTransaction.serialize())
        const transactionResult = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        }, 'confirmed')
        console.log('transactionResult : ', transactionResult)

        /////////////////////////////////////////////////////////////////
        // pay_log 테이블에 결제정보 등록
        /////////////////////////////////////////////////////////////////
        const paramPayLog = {
          project_seq: this.projectSeq,
          wallet_address: walletAddress,
          wallet_type: this.getWalletType,
          nft_type: this.nftTypeList[this.selectedNftTypeIndex]?.nft_type,
          mint_amount: this.mintAmount,
          currency_symbol: project_symbol,
          currency_contract: tokenAddress,
          currency_amount: amount,
          tx_id: signature,
          reg_id: walletAddress,
        }
        const resultPayLog = await this.$axios.post('/api/paylog/insertPayLog', paramPayLog)
        // console.log(result.data)
        if (!resultPayLog || !resultPayLog.data || resultPayLog.data.returnCd != 0) {
         this.$noti(this.$q, this.$t('process_failed') + ': insertPayLog')
        }
        console.log('■■■■■■■ insert payLog ■■■■■■■ END')

        returnVo.returnCd = 0
        returnVo.tx_id = bs58.encode(signature)
      
        console.log('======== Success Transfer Solana =======')
        return returnVo
      } catch (error) {
        console.error('Error during transaction:', error)
        console.log('returnVo : ', returnVo)
        return returnVo
      }
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
    async solanaNftMint (
        project_id,
        project_symbol,
        json_file_url,
        creator_fee,
        collection_mint_address,
        wallet_address,
        payer_key,
        signer_key,
      ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ Solana NFT Mint ■■■■■■■ START")
        const collectionKey = new PublicKey(collection_mint_address) 
        const tokenOwner = new PublicKey(wallet_address)
        console.log('collection_mint_address', collection_mint_address)

        returnVo = {
          ...this.$ERROR_CODE_MINTING_NFT
        }
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(payer_key));
        const signer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(signer_key))
        umi.use(keypairIdentity(payer, true))
        umi.use(keypairIdentity(signer, false))
        console.log('rpc : ', umi)
              
        const mint = generateSigner(umi)
        const metadataPda = findMetadataPda(umi, { mint: mint.publicKey })
        console.log('metadataPda : ', metadataPda[0])
        console.log("NFT mint account : ", mint.publicKey)
        const createdNftInstructions = await createNft(umi, {
          mint,
          name: project_id,
          symbol: project_symbol,
          uri: json_file_url,
          sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
          payer: payer,
          metadata: metadataPda,
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
        })

        const verifyInstructions = await verifyCollectionV1(umi, {
          metadata: metadataPda,
          collectionMint: collectionKey,
        })

        const builder = transactionBuilder()
        .add(createdNftInstructions)
        .add(verifyInstructions)

        const confirmResult = builder.sendAndConfirm(umi)
        
        console.log('mintSignature : ', confirmResult.signature)
        console.log('confirmResult : ', confirmResult)

        returnVo.returnCd = 0
        returnVo.tx_id = confirmResult.signature
        returnVo.mint_account_key = mint.publicKey
        returnVo.metadata_account_key = metadataPda[0]
      
        console.log('======== Success Transger And Minting =======')
        return returnVo
      } catch (error) {
        console.error('Error during transaction:', error)
        console.log('returnVo : ', returnVo)
        return returnVo
      }
    },
    async solanaNftMintWithSign (
        project_id,
        project_symbol,
        json_file_url,
        creator_fee,
        collection_mint_address,
        wallet_address,
        signer_key,
      ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        console.log("■■■■■■■ Solana NFT Mint ■■■■■■■ START")
        const collectionKey = new PublicKey(collection_mint_address) 
        const tokenOwner = new PublicKey(wallet_address)

        console.log('collection_mint_address', collection_mint_address)
        returnVo = {
          ...this.$ERROR_CODE_MINTING_NFT
        }
        const walletProvider = new PhantomWalletAdapter();
        await walletProvider.connect();
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
        const umiPayer = createSignerFromWalletAdapter(walletProvider)
        const signer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(signer_key))
        
        console.log('provider : ', this.walletProvider)
        umi.use(signerIdentity(umiPayer, true))
        umi.use(keypairIdentity(signer, false))
        console.log('rpc : ', umi)
              
        const mint = generateSigner(umi)
        const metadataPda = findMetadataPda(umi, { mint: mint.publicKey })
        console.log('metadataPda : ', metadataPda[0])
        console.log("NFT mint account : ", mint.publicKey)
        const createdNftInstructions = await createNft(umi, {
          mint,
          name: project_id,
          symbol: project_symbol,
          uri: json_file_url,
          sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
          payer: umiPayer,
          metadata: metadataPda,
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
        })

        const verifyInstructions = await verifyCollectionV1(umi, {
          metadata: metadataPda,
          collectionMint: collectionKey,
        })

        const builder = transactionBuilder()
        .add(createdNftInstructions)
        .add(verifyInstructions)

        console.log('build')
        const mintTransaction = await builder.buildAndSign(umi)
        const mintSignature = await umi.rpc.sendTransaction(mintTransaction)
        
        const confirmResult = await umi.rpc.confirmTransaction(mintSignature, {
          strategy: { type: 'blockhash', ...await umi.rpc.getLatestBlockhash() },
          commitment: 'confirmed',
        });
        console.log('mintSignature : ', bs58.encode(mintSignature))
        console.log('confirmResult : ', confirmResult)

        returnVo.returnCd = 0
        returnVo.tx_id = bs58.encode(mintSignature)
        returnVo.mint_account_key = mint.publicKey
        returnVo.metadata_account_key = metadataPda[0]
      
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
        const provider = window.phantom.solana
        if (provider && provider.isPhantom) {
          return provider
        }
      }
      return null
    },
    handlePhantomAccountChange() {
      if ('phantom' in window && window.phantom.solana && window.phantom.solana.isPhantom) {
        const provider = this.getPhantomProvider()
        if (!provider) return
        
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
    goPage(index) {
      if (index === 0) {
        this.$router.push('/')
      } else {
        this.$router.push('/beastar' + index)
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