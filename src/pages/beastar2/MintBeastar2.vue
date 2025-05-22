<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center">
    <div class="page-default" style="word-break: keep-all;">

      <!-- <div class="text-center">
        <q-img src="images/fundsafe_bm.png" style="max-width: 1024px;" />
      </div> -->

      <!-- 플랫폼 설명 -->
      <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <div class="text-h3 text-bold">
          REAL WORLD ASSETS<br />
          NEW PARADIGM<br />
          projectSeq: {{ projectSeq }}<br />
        </div>
        <!-- <div class="text-h3 text-bold">
          DEV DEV DEV<br />
        </div> -->
        <div class="text-h5 text-bold q-pt-md">
          <!--
          <div v-if="locale === 'ko-KR'">
            부미 밴드 NFT<br />
          </div>
          <div v-else>
            BUMI BAND NFT<br />
          </div>
          -->
          <div>
            BUMI BAND NFT<br />
          </div>
          <br />
        </div>

      </div>

      <!-- 등급 별 라디오 버튼 -->
      <div class="row justify-center" style="height: 500px;">

        <q-card v-for="(nftTypeItem, nftTypeIndex) in nftTypeList" :key="nftTypeItem.seq" class="">
          <q-card-section>
            <q-img :src="nftTypeItem.image_url" class="q-mb-md" />
            <div v-if="nftTypeItem.nftPriceList" class="text-subtitle1">NFT Price: ${{ nftTypeItem.nftPriceList[0].price_currency }}</div>
            <div class="text-h6">{{ nftTypeItem.nft_type_name }}</div>
            <div class="text-subtitle2">{{ nftTypeItem.amount_remain }} / {{ nftTypeItem.amount_supply }}</div>
            <div class="row justify-center progress-wrap">
              <div class="col-9">
                <q-linear-progress size="40px" :value="(nftTypeItem.amount_supply - nftTypeItem.amount_remain) / nftTypeItem.amount_supply" color="green-5" rounded>
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="black">
                      Remaining: {{ nftTypeItem.amount_remain }}
                    </q-badge>
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="">
              <div class="q-pb-sm">Payment Currency</div>
              <div v-if="nftTypeItem.nftPriceList">
                <div v-for="(priceItem, nftPriceIndex) in nftTypeItem.nftPriceList" :key="priceItem.seq">
                  <q-radio v-model="mintCurrencySymbolIndex" :val="nftPriceIndex" :label="priceItem.currency_symbol" color="primary" />
                </div>
              </div>
              <div v-if="nftTypeItem.nftPriceList" class="text-subtitle1 text-center q-pt-sm q-pb-lg">
                <div v-if="nftTypeItem.nftPriceList[mintCurrencySymbolIndex].is_usd_value == 1">{{ nftTypeItem.nftPriceList[mintCurrencySymbolIndex].price_usd }} {{ nftTypeItem.nftPriceList[mintCurrencySymbolIndex].currency_symbol }}</div>
                <div v-else>{{ nftTypeItem.nftPriceList[mintCurrencySymbolIndex].price_currency }} {{ nftTypeItem.nftPriceList[mintCurrencySymbolIndex].currency_symbol }}</div>
              </div>
            </div>
            <q-btn @click="minting(nftTypeIndex)" label="Minting" color="secondary" style="width: 100%;" />
          </q-card-section>
        </q-card>
      </div>

    </div>

  </q-page>

  <WalletModal ref="refWalletModal" @walletLoggedIn="handleWalletLoggedIn"/>
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
// import {
//   generateSigner,
//   percentAmount,
//   keypairIdentity,
// } from "@metaplex-foundation/umi"
// import {
//   createNft,
//   fetchDigitalAsset,
//   verifyCollectionV1,
//   mplTokenMetadata,
//   updateV1,
//   fetchMetadataFromSeeds,
// } from "@metaplex-foundation/mpl-token-metadata"
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
// import { PublicKey, Connection, Keypair, Transaction, sendAndConfirmTransaction  } from "@solana/web3.js"
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

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      smallSize: false,
      projectSeq: 3,
      mintAmount: 1, // 일단 지금은 1개로 고정
      // nftType: '',
      // nftTypeOption: [],
      // currencySymbol: '',
      // currencySymbolOption: [],
      nftTypeList: [],
      mintCurrencySymbolIndex: 0,
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
  mounted: function () {},
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
    showWalletModal() {
      this.$refs.refWalletModal.show()
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
    minting(nftTypeIndex) {

      console.log('nftTypeIndex: ' + nftTypeIndex)


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
      this.doMinting(nftTypeIndex)
    },
    // 민팅 실행
    async doMinting(nftTypeIndex) {

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
        const nftPriceObject = nftTypeObject.nftPriceList[this.mintCurrencySymbolIndex]
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
        const currencyContract = nftPriceObject.currency_contract
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

          // /////////////////////////////////////////////////////////////////////////////////////////////
          // // 7. New NFT 발행 처리
          // /////////////////////////////////////////////////////////////////////////////////////////////
          // let newMintingLogVo = null
          // try {
          //   newMintingLogVo = await this.mintSolanaNft(projectVo.project_id
          //                                       , projectVo.project_symbol
          //                                       , nftInfoVo.json_file_url // 리빌전 사용할 JSON 파일 URL
          //                                       , projectVo.creator_fee // sellerFeeBasisPoints
          //                                       , projectVo.contract_address
          //                                       , walletAddress
          //                                       , projectVo.fee_wallet_secret_key
          //                                     )
          // } catch (e) {
          //   // 예외 발생시 환불처리 후 리턴
          //   this.$q.loading.hide()
          //   // 환불 처리
          //   this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
            
          //   // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
          //   if (nftInfoVo != null) {
          //     const paramNftInfoStatusFailed = {
          //       seq: nftInfoVo.seq,
          //       status: this.$NFT_STATUS_MINT_FAILED, // "5"
          //       mod_id: walletAddress,
          //     }
          //     const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          //     // console.log(resultUpdateStatusFailed.data)
          //   }
          //   console.error(e)
          //   return
          // }
          
          // // 처리 결과 없을 경우 환불처리 후 리턴
          // if (newMintingLogVo == null) {
          //   this.$q.loading.hide()
          //   // 환불 처리
          //   this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
            
          //   // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
          //   if (nftInfoVo != null) {
          //     const paramNftInfoStatusFailed = {
          //       seq: nftInfoVo.seq,
          //       status: this.$NFT_STATUS_MINT_FAILED, // "5"
          //       mod_id: walletAddress,
          //     }
          //     const resultUpdateStatusFailed = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          //     // console.log(resultUpdateStatusFailed.data)
          //   }
          //   return
          // }

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
                                                       , this.nftInfoVo.json_file_url // 리빌전 사용할 JSON 파일 URL
                                                       , projectVo.creator_fee // sellerFeeBasisPoints
                                                       , projectVo.contract_address
                                                       , walletAddress
                                                       , currencyContract
                                                       , this.payCurrencyAmountTotal
                                                       , projectVo.admin_wallet_address
                                                       , projectVo.fee_wallet_secret_key
                                                       , signerSecretKey)
          } catch (e) {
            // 예외 발생시 환불처리 후 리턴
            this.$q.loading.hide()

            this.$noti(this.$q, this.$t('process_failed') + ': transferAndMint - catch')
            this.$noti(this.$q, newMintingLogVo.returnMsg)

            // 환불 처리
            if (this.isRefundTarget) {
              this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
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
            console.error(e)
            return
          }
          
          // 처리 결과 없을 경우 환불처리 후 리턴
          if (newMintingLogVo == null || newMintingLogVo.returnCd != 0) {
            this.$q.loading.hide()

            this.$noti(this.$q, this.$t('process_failed') + ': transferAndMint - newMintingLogVo.returnCd != 0')
            this.$noti(this.$q, newMintingLogVo.returnMsg)

            // 환불 처리
            if (this.isRefundTarget) {
               this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
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

      } catch (e) {
        this.$q.loading.hide()
        // 환불 처리
        this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        
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
    // 결제
    async pay(projectSeq, walletAddress, walletType, nftType, mintAmount, currencySymbol, currencyContract, currencyAmount, feeWalletSecretKey, adminWalletAddress) {
      console.log('■■■■■■■ pay ■■■■■■■ START')
      let payResult = true
      /////////////////////////////////////////////////////////////////
      // 2.1 결제 처리
      /////////////////////////////////////////////////////////////////
      let returnVo = null // sendToken 결과 vo { returnCd(처리결과코드), txid(트랜잭션 아이디) }
      try {
        console.log('결제 처리')
        returnVo = await this.sendToken(currencyContract, currencyAmount, feeWalletSecretKey, adminWalletAddress)
      } catch(e) {
        console.log(e)
        payResult = false // 처리결과 : 실패
      }

      // console.log(result.data)
      if (!returnVo || returnVo.returnCd != 0) {
        payResult = false // 처리결과 : 실패
        console.log('sendToken() returnVo.returnCd: ' + returnVo.returnCd)
        this.$noti(this.$q, this.$t('process_failed') + ': pay.sendToken')
      }

      /////////////////////////////////////////////////////////////////
      // 2.2 pay_log 테이블에 결제정보 등록
      /////////////////////////////////////////////////////////////////
      const paramPayLog = {
        project_seq: projectSeq,
        wallet_address: walletAddress,
        wallet_type: walletType,
        nft_type: nftType,
        mint_amount: mintAmount,
        currency_symbol: currencySymbol,
        currency_contract: currencyContract,
        currency_amount: currencyAmount,
        tx_id: returnVo ? returnVo.txid : null,
        reg_id: walletAddress,
      }
      const result = await this.$axios.post('/api/paylog/insertPayLog', paramPayLog)
      // console.log(result.data)
      if (!result || !result.data || result.data.returnCd != 0) {
        payResult = false // 처리결과 : 실패
        this.$noti(this.$q, this.$t('process_failed') + ': insertPayLog')
      }
      console.log('■■■■■■■ pay ■■■■■■■ END')
      return payResult
    },
    // 환불
    async refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount) {
      console.log('■■■■■■■ refund ■■■■■■■ START')
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
    // // 민팅
    // async mintSolanaNft(
    //   project_id,
    //   project_symbol,
    //   json_file_url,
    //   creator_fee,
    //   collection_mint_address,
    //   walletAddress,
    //   payerSecretKey,
    // ) {
    //   console.log("■■■■■■■ mintSolanaNft ■■■■■■■ START")
    //   let resultVo = {} // 민팅 후 저장이 필요한 항목 리턴용. txid(트랜잭션 아이디) 포함.
    //   // 온체인 코드
    //   try {
    //     console.log('collection_mint_address : ', collection_mint_address);

    //     const collectionKey = new PublicKey(collection_mint_address)
    //     const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
    //     const payer = umi.eddsa.createKeypairFromSecretKey(
    //       bs58.decode(payerSecretKey)
    //     )
    //     umi.use(keypairIdentity(payer))
    //     const tokenOwner = new PublicKey(walletAddress)

    //     const mint = generateSigner(umi)
    //     console.log("NFT mint account : ", mint.publicKey)
    //     const createdNft = await createNft(umi, {
    //       mint,
    //       name: project_id,
    //       symbol: project_symbol,
    //       uri: json_file_url,
    //       sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
    //       collection: {
    //         verified: false, // or true if applicable
    //         key: collectionKey,
    //       },
    //       creators: [
    //         {
    //           address: payer.publicKey,
    //           verified: true,
    //           share: 100,
    //         },
    //       ],
    //       authority: payer.publicKey,
    //       tokenOwner: tokenOwner,
    //     }).sendAndConfirm(umi)

    //     // NFT 생성 트랜잭션 상태 확인
    //     if (createdNft.result.value.err !== null) {
    //       throw new Error(`Transaction failed with error: ${createdNft.result.value.err}`)
    //     }        
    //     console.log(
    //       "Create NFT Signature : ",
    //       bs58.encode(createdNft.signature)
    //     )
        
    //     // 온체인에 정보가 등록될 때 까지 반복 시도, 정보가 확인되면 asset에 해당 정보를 가져옴
    //     const asset = await this.fetchAssetWithRetries(umi, mint.publicKey)

    //     //콜렉션 검증
    //     const metadata = asset.metadata
    //     const verify = await verifyCollectionV1(umi, {
    //       metadata,
    //       collectionMint: collectionKey,
    //       authority: payer.publicKey,
    //     }).sendAndConfirm(umi)

    //     //컬렉션 검증 트랜잭션 상태 확인
    //     if (verify.result.value.err !== null) {
    //       throw new Error(`Verification failed with error: ${verify.result.value.err}`)
    //     }
    //     console.log(
    //       "NFT Verify Collection Signature : ",
    //       bs58.encode(verify.signature)
    //     )

    //     //토큰 어카운트는 asset에서 가지고 있지 않기 때문에 별도로 서칭
    //     const tokenAccountKey = await getAssociatedTokenAddress(
    //       new PublicKey(mint.publicKey),
    //       tokenOwner,
    //       false, // allow owner off curve
    //       TOKEN_PROGRAM_ID,
    //       ASSOCIATED_TOKEN_PROGRAM_ID
    //     )

    //     // 처리 결과 설정 - 로그 등록 항목
    //     resultVo.tx_id = bs58.encode(createdNft.signature)
    //     resultVo.mint_account_key = asset.mint.publicKey
    //     resultVo.token_account_key = tokenAccountKey.toBase58()
    //     resultVo.metadata_account_key = asset.metadata.publicKey
    //     resultVo.master_edition_account_key = asset.edition.publicKey

    //     console.log(resultVo)

    //     console.log("■■■■■■■ mintSolanaNft ■■■■■■■ END")
    //     return resultVo
    //   } catch (error) {
    //     console.error("Error minting NFT:", error)
    //     return null
    //   }
    // },
    // // 토큰 전송(결제)
    // async sendToken(tokenAddress, amount, payerKey, adminWalletAddress) {
    //   // 반환 오브젝트
    //   let returnVo = {
    //     returnCd: 1 // 0: 정상, 1부터 에러(비정상))
    //     , returnMsg: ''
    //     , txid: ''
    //   }

    //   try {
    //     const connection = new Connection(this.$SOLANA_NETWORK)
    //     const walletAddress = this.getWalletAddress

    //     console.log('tokenAddress : ', tokenAddress)
    //     console.log('walletAddress : ', walletAddress)

    //     const senderPublicKey = new PublicKey(walletAddress)
    //     const mintPublicKey = new PublicKey(tokenAddress)
        
    //     // 송신자의 토큰 주소를 가져옵니다.
    //     const senderTokenAddress = await getAssociatedTokenAddress(
    //       mintPublicKey,
    //       senderPublicKey,
    //       false,
    //       TOKEN_PROGRAM_ID,
    //       ASSOCIATED_TOKEN_PROGRAM_ID
    //     )
    //     console.log('senderTokenAddress : ', senderTokenAddress.toBase58())

    //     // 잔액 조회
    //     const accountInfo = await connection.getAccountInfo(senderTokenAddress)
    //     if (accountInfo === null) {
    //       // throw new Error('Failed to find token account')
    //       this.$noti(this.$q, this.$t('process_failed') + ': Failed to find token account.')
    //       returnVo.returnCd = 3
    //       return returnVo
    //     }
    //     const data = Buffer.from(accountInfo.data)
    //     const accountData = AccountLayout.decode(data)
    //     const balance = BigInt(accountData.amount.toString())
    //     console.log(`Token Balance: ${balance}`)

    //     // 민트 정보 가져오기
    //     const mintInfo = await getMint(connection, mintPublicKey)
    //     const decimals = mintInfo.decimals
    //     console.log('decimals : ', decimals)

    //     // 소수점 고려한 amount를 BigInt 형태로 변환
    //     const adjustedAmount = BigInt(amount * (10 ** decimals))
    //     console.log('adjustedAmount : ', adjustedAmount)
    //     if (adjustedAmount > balance) {
    //       console.error('Insufficient balance.')
    //       this.$noti(this.$q, this.$t('process_failed') + ': Insufficient balance.')
    //       returnVo.returnCd = 1 // 비정상
    //       return returnVo
    //     }

    //     const receiverPublicKey = new PublicKey(adminWalletAddress)

    //     // 수신자의 토큰 주소를 가져옵니다.
    //     const receiverTokenAddress = await getAssociatedTokenAddress(
    //       mintPublicKey,
    //       receiverPublicKey,
    //       false,
    //       TOKEN_PROGRAM_ID,
    //       ASSOCIATED_TOKEN_PROGRAM_ID
    //     );

    //     console.log('receiverTokenAddress : ', receiverTokenAddress.toBase58())

    //     // 수신자의 토큰 계좌가 없을 경우 계좌 생성
    //     const receiverAccountInfo = await connection.getAccountInfo(receiverTokenAddress)
    //     const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

    //     // 수신자의 토큰 계좌가 없을 경우 계좌 생성 트랜잭션 추가
    //     if (!receiverAccountInfo) {
    //       console.log('receiverAccountInfo is null : ', payerKey)
    //       const payer = Keypair.fromSecretKey(bs58.decode(payerKey))

    //       const createAssociatedTokenAccountTransaction = new Transaction().add(
    //         createAssociatedTokenAccountInstruction(
    //           payer.publicKey,
    //           receiverTokenAddress,
    //           receiverPublicKey,
    //           mintPublicKey,
    //           TOKEN_PROGRAM_ID,
    //           ASSOCIATED_TOKEN_PROGRAM_ID
    //         )
    //       )
    //       const signature = await sendAndConfirmTransaction(connection, createAssociatedTokenAccountTransaction, [payer])
    //       console.log('createAssociatedTokenAccount signature:', signature)
    //     }

    //     // 토큰 전송 트랜잭션 추가
    //     const transaction = new Transaction().add(
    //       createTransferInstruction(
    //         senderTokenAddress,
    //         receiverTokenAddress,
    //         senderPublicKey,
    //         adjustedAmount,
    //         [],
    //         TOKEN_PROGRAM_ID
    //       )
    //     )

    //     transaction.recentBlockhash = blockhash
    //     transaction.feePayer = senderPublicKey

    //     const signedTransaction = await window.solana.signTransaction(transaction)

    //     // 서명된 트랜잭션 전송
    //     const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
    //       skipPreflight: false,
    //       maxRetries: 2,
    //     })

    //     // 트랜잭션 확인
    //     await connection.confirmTransaction({
    //       blockhash,
    //       lastValidBlockHeight,
    //       signature,
    //     }, 'confirmed')

    //     console.log('Transaction signature:', signature)
    //     returnVo.txid = signature
    //     returnVo.returnCd = 0 // 정상
    //     console.log('====================================================== try')
    //     return returnVo
    //   } catch (error) {
    //     console.error('Error during transaction:', error)
    //     this.$noti(this.$q, error)
    //     console.log('====================================================== catch')
    //     returnVo.returnCd = -1
    //     returnVo.returnMsg = error
    //     return returnVo
    //   }
    // },

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
          const createAssociatedTokenAccountTransaction = new Transaction()          
          createAssociatedTokenAccountTransaction.add(
            computeUnitPriceIx,
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
          createAssociatedTokenAccountTransaction.recentBlockhash = blockhash
          createAssociatedTokenAccountTransaction.feePayer = tokenOwner
		      createAssociatedTokenAccountTransaction.lastValidBlockHeight = lastValidBlockHeight

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

        ////////////////////////////////////////////////
        // 결제 정상 완료시 isRefundTarget = true로 설정
        ////////////////////////////////////////////////
        this.isRefundTarget = true

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
        console.log("NFT mint account : ", mint.publicKey)
        const createdNftInstructions = await createNft(umi, {
          mint,
          name: project_id,
          symbol: project_symbol,
          uri: json_file_url,
          sellerFeeBasisPoints: percentAmount(creator_fee * 0.01),
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


  },
})
</script>
