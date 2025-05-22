<template>
  <div class="page_main">
    <!-- wrapper -->
  <div id="Wrap">

  <div id="visual">
    <h1><img src="images/visual_title.png" alt="PUNKY KONGZ AIR DROP" /></h1>
    <div class="search_form">
      <input type="text" v-model="keyword" class="form-control" placeholder="콩즈번호를 입력해주세요." />
      <button @click="search()" data-toggle="modal" data-target="#airdrop_search"><i class="xi-search"></i></button>
    </div>

    <img src="images/visual_char1.png" class="char_img char_img1" alt="" />
    <img src="images/visual_char2.png" class="char_img char_img2" alt="" />
  </div>

  <!-- 본문 시작 -->
  <main role="main">
    <!-- main_container -->
    <div id="main_container" class="container">


      <section class="sec01 full_bg">
        <h2>PUNKY KONGZ<br class="br_mo"> AIR DROP </h2>
        <div class="box">
          <div class="price">
            <p class="st">Price</p>
            <p class="sol"><img src="images/icon_sol.png" alt=""> free</p>
          </div>
          <hr>
          <div class="schedule">
            <p class="st">에어드랍 일정</p>
            <p class="st2">에어드랍 개발 완료 및 공지 시점부터 한달 </p>
            <ul>
              <li><i>1.</i> <p><span>메타콩즈가 들어있는 지갑</span>을 연결한 뒤 개수 확인후 확인해 주세요.</p></li>
              <li><i>2.</i> <p>개수가 확인되면 <span>팬텀지갑 주소(솔라나)</span>를 입력해 주세요.</p></li>
              <li><i>3.</i> <p>보유한 메타콩즈 개수 만큼 지갑에 일괄 에어드랍</p></li>
            </ul>
            <p class="warning"><span>*주의*</span>팬텀의 솔라나 계열의 지갑주소가 아닐시 입력이 불가합니다.</p>
          </div>
          <hr>
          <div>
            <!-- 홀더인증전 버튼-->
            <button v-if="!getWalletAddress" @click="showWalletModal()" class="btn btn-holder">메타콩즈 홀더 인증</button>
            <!--
            <button v-if="getWalletType == 'metamask'" @click="disconnectWallet()" class="btn btn-holder"><img src="logo/logo_metamask.png" style="width: 3.5rem; margin-right: 20px;" />{{ getWalletAddressShort }}</button>
            <button v-if="getWalletType == 'phantom'" @click="disconnectWallet()" class="btn btn-holder"><img src="logo/logo_phantom_white.png" style="width: 3.7rem; margin-right: 20px;" />{{ getWalletAddressShort }}</button>
            <button v-if="getWalletType == 'dcent'" @click="disconnectWallet()" class="btn btn-holder"><img src="logo/symbol_full_color.png" style="width: 3.3rem; margin-right: 20px;" />{{ getWalletAddressShort }}</button>
            <button v-if="getWalletType == 'ledger'" @click="disconnectWallet()" class="btn btn-holder"><img src="logo/ledger_logo.png" style="width: 4.1rem; margin-right: 20px;" />{{ getWalletAddressShort }}</button>
            -->
            <button v-else @click="disconnectWallet()" class="btn btn-holder">{{ getWalletAddressShort }}</button>
            <!-- //홀더인증전 버튼-->
            &nbsp;
            <!-- 홀더인증후 버튼-->
            <button v-if="getWalletAddress" @click="showAirdropApplyModal()" class="btn btn-airdrop" data-toggle="modal">펑키콩즈 에어드랍 신청하기</button>
            <!-- //홀더인증후  버튼-->
          </div>
        </div>
      </section>
      <section class="sec02 full_bg">
        <div>
          <button @click="batchMinting()" class="btn btn-airdrop" data-toggle="modal">펑키콩즈 에어드랍 신청하기</button>
        </div>

      </section>


    </div>
    <!-- //main_container -->
  </main>
  <!-- //본문 끝 -->

  <!-- 푸터 시작 -->
  <footer id="footer" class="container full_bg">
    <div class="sns">
      <ul>
        <li><a href="https://blog.naver.com/punkvism" target="_blank"><img src="images/sns_icon1.png" alt="깃허브"></a></li>
				<li><a href="https://open.kakao.com/o/gO5MX4Rg" target="_blank"><img src="images/sns_icon2.png" alt="카카오톡오픈채팅"></a></li>
				<li><a href="https://discord.gg/punkvism" target="_blank"><img src="images/sns_icon3.png" alt="디스코드"></a></li>
				<li><a href="https://t.me/Snowseed_RWA" target="_blank"><img src="images/sns_icon4.png" alt="텔레그램"></a></li>
				<li><a href="https://x.com/SnowSeedasia" target="_blank"><img src="images/sns_icon5.png" alt="X"></a></li>
				<li><a href="https://www.instagram.com/snowseed_official/profilecard/?igsh=MXJyOHphcTdoMnBoaQ==" target="_blank"><img src="images/sns_icon6.png" alt="인스타그램"></a></li>
				<li><a href="https://www.youtube.com/@Snow_Seed" target="_blank"><img src="images/sns_icon7.png" alt="유튜브"></a></li>
				<li><a href="https://medium.com/@snowseed" target="_blank"><img src="images/sns_icon8.png" alt="미디엄"></a></li>
      </ul>
    </div>
		<div class="mail"><i class="xi-mail"></i>Mail to Punky Kongz : <a href="mailto:snowseed_business@gaudilabs.io">snowseed_business@gaudilabs.io</a></div>
		<div class="copy">COPYRIGHT ⓒ punky kongz. ALL RIGHTS RESERVED</div>
  </footer>
  <!-- //푸터 끝 -->

  <div id="gotop">
    <a style="cursor: pointer;">
      <i class="xi-angle-up-min"></i>
      <span>TOP</span>
    </a>
  </div>
  </div>

  </div>





  <AirdropApplyModal ref="refAirdropApplyModal" @callback-applyRequestAirdrop="handleAirDrop"/>
  <SearchModal ref="refSearchModal"/>
  <WalletModal ref="refWalletModal" @callback-applyConnectWallet="handleConnectWallet"/>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import wait from 'waait'
import { QSpinnerGears } from 'quasar'
import bs58 from "bs58"
import { formatUnits, parseUnits } from 'ethers';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import BN from 'bn.js'; // BN 모듈 직접 import
import { route } from 'quasar/wrappers'
import Web3 from 'web3';
import {ethers} from 'ethers'
// import { createAppKit, useAppKit } from '@reown/appkit/vue'
// import { EthersAdapter } from '@reown/appkit-adapter-ethers'
// import { mainnet, arbitrum } from '@reown/appkit/networks'
import WalletConnect from "@dcentwallet/walletconnect-client";
import QRcodeModal from "@dcentwallet/qrcode-modal"
import DcentWebConnector from 'dcent-web-connector';
import { Alchemy, Network } from "alchemy-sdk";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import AppEth from "@ledgerhq/hw-app-eth";  // 이더리움 앱 관련 라이브러리
import { listen } from "@ledgerhq/logs";
import Eth from "@ledgerhq/hw-app-eth"; // Ethereum app on Ledger

import { PublicKey, Keypair, Connection, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, keypairIdentity, percentAmount, signerPayer, signerIdentity, signTransaction  } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata, verifyCollectionV1, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      smallSize: false,
      // confirmSign: false,
      // mobileGuide: false,
      ledgerGuidePc: false,
      ledgerGuideMobile: false,
      currentPage: 1, // 현재 페이지
      itemsPerPage: 12, // 한 페이지에 보여줄 항목 수
      projectSeq: 1,
      keyword: '',
      pageSize: 1000,
      noDataFlag: false,
      solanaWalletAddress: '',
      slide: 'first', // sec03에서 DR. ANANG swipe slide - carousel
      ownNftList: [],
      selectedNFT: [],
      airdropLogList:[],
      selectAll: false,
      modal: null,
      userAddress: '',
      message: '',
      signedMessage: '',
      
      // // PROD용 (ethereum)
      // chainId: '0x1',
      // chainName: 'Ethereum Mainnet',
      // nativeCurrency_name: 'Ether',
      // symbol: 'ETH',
      // rpcUrls: 'https://rpc.ankr.com/eth',
      // blockExplorerUrls: 'https://etherscan.io/',

      
      // 테스트용 (Sepolia)
      chainId: '0xaa36a7',
      chainName: 'Sepolia Testnet',
      nativeCurrency_name: 'Sepolia Ether',
      symbol: 'ETH',
      // rpcUrls: 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      // rpcUrls: 'https://ethereum-sepolia-rpc.publicnode.com',
      rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
      blockExplorerUrls: 'https://sepolia.etherscan.io/',



      nftType: 'newkongz',
    }
  },
  components: {
  },
  watch: {
    // getWalletAddress(newVal, oldVal) {
    //   if (newVal && newVal !== oldVal) {
    //     this.getNftList();
    //   }
    // },
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
        return address.substr(0, 7) + '...' + address.substr(address.length - 5, 5)
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
    getUuid () {
      return this.$store.getters.getUuid
    },

    // 현재 페이지에 보여줄 항목 리스트 계산
    paginatedList() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.ownNftList.slice(start, end)
    },
    // 총 페이지 수 계산
    totalPages() {
      return Math.ceil(this.ownNftList.length / this.itemsPerPage)
    }
  },
  created: function () {
    // // console.log(this.$q.platform.is.mobile)
    // const walletAddress = localStorage.getItem('WALLETADDRESS') ? localStorage.getItem('WALLETADDRESS') : this.$cookie.get('walletAddress')
    // const walletType = localStorage.getItem('WALLETTYPE') ? localStorage.getItem('WALLETTYPE') : this.$cookie.get('walletType')
    // if (walletAddress && walletType) {
    //   this.$store.dispatch('setWalletType', walletType)
    //   this.$store.dispatch('setWalletAddress', walletAddress)
    // }

    // const solanaWalletAddress = localStorage.getItem('SOLANAWALLETADDRESS') ? localStorage.getItem('SOLANAWALLETADDRESS') : this.$cookie.get('solanaWalletAddress')
    // const solanaWalletType = localStorage.getItem('SOLANAWALLETTYPE') ? localStorage.getItem('SOLANAWALLETTYPE') : this.$cookie.get('solanaWalletType')
    // if (solanaWalletAddress && solanaWalletType) {
    //   this.$store.dispatch('setSolanaWalletType', solanaWalletType)
    //   this.$store.dispatch('setSolanaWalletAddress', solanaWalletAddress)
    // }

    // 자동로그인 이슈로 쿠키를 세션으로 변경
    const walletAddress = sessionStorage.getItem('WALLETADDRESS')
    const walletType = sessionStorage.getItem('WALLETTYPE')
    if (walletAddress && walletType) {
      this.$store.dispatch('setWalletType', walletType)
      this.$store.dispatch('setWalletAddress', walletAddress)
    }

    const Uuid = sessionStorage.getItem('UUID')
    if (walletAddress && walletType) {
      this.$store.dispatch('setUuid', Uuid)
    }

    const solanaWalletAddress = sessionStorage.getItem('SOLANAWALLETADDRESS')
    const solanaWalletType = sessionStorage.getItem('SOLANAWALLETTYPE')
    if (solanaWalletAddress && solanaWalletType) {
      this.$store.dispatch('setSolanaWalletType', solanaWalletType)
      this.$store.dispatch('setSolanaWalletAddress', solanaWalletAddress)
    }

    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }
  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted: function () {
    // jQuery 코드를 mounted() 훅에서 실행
    $('#gotop a').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // if (this.$q.platform.is.desktop) {
    //   if (window.ethereum) {
    //     // 지갑주소 변경 이벤트 구독
    //     window.ethereum?.on('accountsChanged', this.walletAccountsChangedMetamask)
    //     // 체인 변경 이벤트 구독
    //     window.ethereum?.on('chainChanged', this.handleChainChangedMetamask)
    //   }
    // }

    AOS.init()

    // 팬텀지갑 주소변경 이벤트
    // this.handlePhantomAccountChange()

  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // 페이지 변경
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    // 이전 페이지로 이동
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    // 다음 페이지로 이동
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
      }
    },
    toggleSelectAll() {
      this.ownNftList.forEach(nft => {
        nft.selected = this.selectAll
      })
    },
    resizeEventHandler() {
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
    goMypage() {
      if (!this.getWalletAddress) {
        this.$noti(this.$q, this.$t('connect_your_wallet'))
        return
      }
      this.$router.push('/mypage')
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
    showSearchModal(item, keyword) {
      this.$refs.refSearchModal.itemVo = item
      this.$refs.refSearchModal.keyword = keyword
      this.$refs.refSearchModal.show()
    },
    showAirdropApplyModal() {
      // this.selectedNft = this.ownNftList.filter(nft => nft.selected)
      // if (this.selectedNft.length === 0) {
      //   this.$noti(this.$q, this.$t('validation_required'))
      //   return
      // }

      // 지갑이 연결되어 있는지 확인
      if (this.getWalletAddress) {
        // 지갑이 연결되었으나 ownNftList가 비어 있으면 알림 후 종료
        if (!this.ownNftList || this.ownNftList.length === 0) {
          this.$noti(this.$q, '신청할 대상이 없습니다.')
          return
        }

        // nft 신청완료시
        if (this.ownNftList.every(nft => nft.isDuplicate == true)) {
          this.$noti(this.$q, '신청할 대상이 없습니다.')
          return
        }
      } else {
        // 지갑이 연결되지 않은 경우 지갑 연결 시도
        this.connectMetaMaskWallet()
        return
      }

      this.$refs.refAirdropApplyModal.show()
    },
    handleAirDrop(data) {
      // const walletType = this.getWalletType
      this.solanaWalletAddress = data

      this.insertAirdropLogList()
      // if(walletType == 'metamask' || walletType == 'phantom') {
      //   this.doSignWallet()
      //   return
      // }
      // if(walletType == 'dcent') {
      //   // 확인 모달
      //   this.confirmSign = true
      //   this.doSignHardWallet()
      //   return
      // }
      // if(walletType == 'ledger') {
      //   // 확인 모달
      //   this.confirmSign = true
      //   this.doSignHardWallet()
      //   return
      // }
    },
    handleConnectWallet(walletType) {
      if(walletType == 'phantom') {
        this.connectPhantomWallet()
        return
      } else {
        return
      }
    },
    // 검색
    search() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }

      // 검색어가 숫자인지 확인, 총 공급량 보다 큰 경우 검색하지 않음
      if (!/^[0-9]+$/.test(this.keyword) || parseInt(this.keyword, 10) > this.$METAKONGZ_TOTAL_SUPPLYY) {
        // console.log("유효성검사 걸림")
        this.$noti(this.$q, this.$t('search_invalid'))
        return
      }

      this.$axios.get('/api/airdropLog/selectAirdropLog',
        {params: {ethNftId: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          
          this.showSearchModal(result.data, this.keyword)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async batchMinting() {
      console.log('batchMinting start')
      this.$q.loading.show({
        spinner: QSpinnerGears,
        message: this.$t('loading_message_minting'),
      })
      try {
        await this.selectList()

        // console.log(this.airdropLogList)
        for (let i = 0; i < this.airdropLogList.length; i++) {
          const airdropLogObj = this.airdropLogList[i]
          if (airdropLogObj != null) {
            console.log('selected data index: ' + i + ' , SEQ: ' + airdropLogObj.seq)
            console.log('airdropLogObj : ')
            console.log(airdropLogObj)

            let result = false
            try {
              result = await this.doMinting(airdropLogObj) // 실패시 false, 성공시 tx_id 반환됨.
              console.log('mint result ' + i + ': ' + result)

            } catch (error) {
              console.error(error)
            }

          }
        }
      } catch (e) {
        console.error(e)
        this.$q.loading.hide()
        this.$noti(this.$q, this.$t('process_failed') + ': ' + e)
      }
      this.$q.loading.hide()

      // 처리 완료 메시지 표시
      this.$noti(this.$q, this.$t('process_success'))

    },
    // 민팅 처리
    async doMinting(airdropLogObj) {
      console.log('doMinting start')
      console.log(airdropLogObj)
      /////////////////////////////////////////////////////////////////
      // key value 조회
      /////////////////////////////////////////////////////////////////
      let payerSecretKey = null
      const paramKeyValuePayerSecretKey = {
        cdKey: this.$KEY_VALUE_SOLANA_PAYER_SECRET_KEY,
      }
      const resultKeyValuePayerSecretKey = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValuePayerSecretKey }})
      // console.log(resultKeyValue.data)
      if (resultKeyValuePayerSecretKey.data) {
        payerSecretKey = resultKeyValuePayerSecretKey.data.returnValue
      }

      let sellerFeeBasisPoint = null
      const paramKeyValueSellerFeeBasisPoint = {
        cdKey: this.$KEY_VALUE_SOLANA_SELLER_FEE_BASIS_POINT,
      }
      const resultKeyValueSellerFeeBasisPoint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSellerFeeBasisPoint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSellerFeeBasisPoint.data) {
        sellerFeeBasisPoint = resultKeyValueSellerFeeBasisPoint.data.returnValue
      }

      let collectionMint = null
      const paramKeyValueCollectionMint = {
        cdKey: this.$KEY_VALUE_SOLANA_COLLECTION_MINT,
      }
      const resultKeyValueCollectionMint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueCollectionMint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueCollectionMint.data) {
        collectionMint = resultKeyValueCollectionMint.data.returnValue
      }

      let symbol = null
      const paramKeyValueSymbol = {
        cdKey: this.$KEY_VALUE_SOLANA_SYMBOL,
      }
      const resultKeyValueSymbol = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSymbol }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSymbol.data) {
        symbol = resultKeyValueSymbol.data.returnValue
      }

      /////////////////////////////////////////////////////////////////
      // 1. minting_log 테이블 insert
      /////////////////////////////////////////////////////////////////
      const paramMintingLog = {
        project_seq: this.projectSeq,
        wallet_address: airdropLogObj.new_wallet_address,
        wallet_type: this.getWalletType,
        nft_type: this.nftType,
        currency_symbol: '',
        reg_id: airdropLogObj.new_wallet_address,
      }
      console.log("==================================================== 1")
      const resultMintingLog = await this.$axios.post('/api/mintinglog/insertMintingLog', paramMintingLog)
      // console.log(resultMintingLog.data)
      if (!resultMintingLog || !resultMintingLog.data || resultMintingLog.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': insertMintingLog')
        return false
      }

      console.log("==================================================== 2")

      const mintingLogSeq = resultMintingLog.data.returnValue.seq // 등록한 로그 seq 설정, update시 사용

      console.log("mintingLogSeq >>>>  " + mintingLogSeq)
      
      // /////////////////////////////////////////////////////////////////////////////////////////////
      // /////////////////////////////////////////////////////////////////////////////////////////////
      // // ◆◆◆◆◆◆◆ mintAmount 만큼 반복 처리 ◆◆◆◆◆◆◆ START
      // // 각각의 처리 완료시마다 currencyAmount를 차감하여 이후 실패시 환불할 금액 수정
      // /////////////////////////////////////////////////////////////////////////////////////////////
      // /////////////////////////////////////////////////////////////////////////////////////////////
      // for (let i = 0; i < this.mintAmount; i++) {

      /////////////////////////////////////////////////////////////////
      // 3. nft_info 테이블 조회
      /////////////////////////////////////////////////////////////////
      const paramNftInfo = {
        projectSeq: this.projectSeq,
        nftType: this.nftType,
        nftIdStart: '1',
        nftIdEnd: '10000',
      }
      const resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfo', { params: { ...paramNftInfo }})
      console.log(resultNftInfo.data)

      if (!resultNftInfo || !resultNftInfo.data) {
        this.$noti(this.$q, this.$t('process_failed') + ': selectNftInfo')
        // 환불 처리
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        return false
      }

      console.log("==================================================== 4")

      const nftInfoVo = resultNftInfo.data
      const nftId = nftInfoVo.nft_id // 민팅 대상 NFT ID
      console.log('☆☆☆☆☆☆☆ target NFT ID: ' + nftId)
      console.log('☆☆☆☆☆☆☆ target NFT Vo: ' + nftId)
      console.log(nftInfoVo)

      // nft_info 테이블에 해당 data의 status를 처리중(10)으로 수정
      const paramNftInfoStatusProcessing = {
        seq: nftInfoVo.seq,
        status: this.$NFT_STATUS_MINT_PROCESSING, // "10"
        mod_id: airdropLogObj.old_wallet_address,
      }
      let resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatusProcessing', paramNftInfoStatusProcessing)
      console.log('resultUpdateStatus : ')
      console.log(resultUpdateStatus.data)
  
      console.log("==================================================== 5")

      /////////////////////////////////////////////////////////////////////////////////////////////
      // 5. New NFT 발행 처리
      /////////////////////////////////////////////////////////////////////////////////////////////     
      let newMintingLogVo = null
      try {
        newMintingLogVo = await this.mintSolanaNft(nftInfoVo.nft_name
                                                      , symbol
                                                      , nftInfoVo.json_file_url
                                                      , airdropLogObj.new_wallet_address
                                                      , sellerFeeBasisPoint
                                                      , collectionMint)
        console.log("==================================================== 6")
      } catch (e) {
        // 예외 발생시 환불처리 후 리턴
        this.$noti(this.$q, this.$t('Error during transaction'))
        // 환불 처리
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
        if (nftInfoVo != null) {
          console.log("paramNftInfoStatusFailed :")

          const paramNftInfoStatusFailed = {
            seq: nftInfoVo.seq,
            status: this.$NFT_STATUS_MINT_FAILED, // "5"
            mod_id: airdropLogObj.old_wallet_address,
          }
          resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          console.log(resultUpdateStatus.data)
          console.log(e)
        }
        // airdrop_log 테이블에 해당 data의 status를 실패(5)로 수정
        if (nftInfoVo != null) {
          console.log("paramAirdropLogStatusFailed :")
          const paramAirdropLogStatusFailed = {
            seq: airdropLogObj.seq,
            status: this.$NFT_STATUS_MINT_FAILED, // "5"
            mod_id: airdropLogObj.old_wallet_address,
          }
          resultUpdateStatus = await this.$axios.post('/api/airdropLog/updateAirdropLogStatus', paramAirdropLogStatusFailed)
          console.log(resultUpdateStatus.data)
          console.log(e)
        }
        return false
      }

      console.log("==================================================== 7")
      
      // 처리 결과 없을 경우 환불처리 후 리턴
      if (newMintingLogVo == null) {
        // 환불 처리
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        
        // nft_info 테이블에 해당 data의 status를 실패(5)로 수정
        if (nftInfoVo != null) {
          const paramNftInfoStatusFailed = {
            seq: nftInfoVo.seq,
            status: this.$NFT_STATUS_MINT_FAILED, // "5"
            mod_id: airdropLogObj.old_wallet_address,
          }
          resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
          // console.log(resultUpdateStatus.data)
          console.log(e)
        }
        // airdrop_log 테이블에 해당 data의 status를 실패(5)로 수정
        if (nftInfoVo != null) {
          const paramAirdropLogStatusFailed = {
            seq: airdropLogObj.seq,
            status: this.$NFT_STATUS_MINT_FAILED, // "5"
            mod_id: airdropLogObj.old_wallet_address,
          }
          resultUpdateStatus = await this.$axios.post('/api/airdropLog/updateAirdropLogStatus', paramAirdropLogStatusFailed)
          // console.log(resultUpdateStatus.data)
          console.log(e)
        }
      }

      console.log("==================================================== 8")

      /////////////////////////////////////////////////////////////////////////////////////////////
      // 6. NFT 정보, airdrop_log status 민팅완료로 update
      /////////////////////////////////////////////////////////////////////////////////////////////
      const paramNftInfoStatusCompleted = {
        seq: nftInfoVo.seq,
        status: this.$NFT_STATUS_MINT_COMPLETED, // "20"
        mod_id: airdropLogObj.old_wallet_address,
      }
      resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusCompleted)
      // console.log(resultUpdateStatus.data)
      if (!resultUpdateStatus || !resultUpdateStatus.data || resultUpdateStatus.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': updateNftInfoStatus - NFT_STATUS_MINT_COMPLETED')
        // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        // return
      }
      // airdrop_log 테이블에 해당 data의 status를 성공(20)로 수정
      const paramAirdropLogStatusCompleted = {
        seq: airdropLogObj.seq,
        status: this.$NFT_STATUS_MINT_COMPLETED, // "20"
        mod_id: airdropLogObj.old_wallet_address,
      }
      resultUpdateStatus = await this.$axios.post('/api/airdropLog/updateAirdropLogStatus', paramAirdropLogStatusCompleted)
      // console.log(resultUpdateStatus.data)
      if (!resultUpdateStatus || !resultUpdateStatus.data || resultUpdateStatus.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': updateNftInfoStatus - NFT_STATUS_MINT_COMPLETED')
        // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        // return
      }

      console.log("==================================================== 9")

      /////////////////////////////////////////////////////////////////////////////////////////////
      // 7. NFT 정보 minting_log, airdrop_log 테이블에 update
      /////////////////////////////////////////////////////////////////////////////////////////////
      const paramMintingLogUpdate = {
        seq: mintingLogSeq,
        nft_id: nftId,
        mint_account_key: newMintingLogVo.mint_account_key,
        verify_collection_signature: newMintingLogVo.verify_collection_signature,
        create_nft_signature: newMintingLogVo.create_nft_signature,
        // token_account_key: newMintingLogVo.token_account_key,
        // metadata_account_key: newMintingLogVo.metadata_account_key,
        // master_edition_account_key: newMintingLogVo.master_edition_account_key,
        // tx_id: newMintingLogVo.tx_id,
        mod_id: airdropLogObj.old_wallet_address,
      }
      const resultMintingLogUpdate = await this.$axios.post('/api/mintinglog/updateMintingLog', paramMintingLogUpdate)
      // console.log(resultMintingLogUpdate.data)
      if (!resultMintingLogUpdate || !resultMintingLogUpdate.data || resultMintingLogUpdate.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': updateMintingLog')
        // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        // return
      }

      const paramAirdropLogUpdate = {
        seq: airdropLogObj.seq,
        new_nft_id: nftId,
        new_mint_account_key: newMintingLogVo.mint_account_key,
        // verify_collection_signature: newMintingLogVo.verify_collection_signature,
        // create_nft_signature: newMintingLogVo.create_nft_signature,
        // token_account_key: newMintingLogVo.token_account_key,
        // metadata_account_key: newMintingLogVo.metadata_account_key,
        // master_edition_account_key: newMintingLogVo.master_edition_account_key,
        // tx_id: newMintingLogVo.tx_id,
        mod_id: airdropLogObj.old_wallet_address,
      }
      const resultAirdropLogUpdate = await this.$axios.post('/api/airdropLog/updateAirdropLog', paramAirdropLogUpdate)
      // console.log(resultMintingLogUpdate.data)
      if (!resultAirdropLogUpdate || !resultAirdropLogUpdate.data || resultAirdropLogUpdate.data.returnCd != 0) {
        this.$noti(this.$q, this.$t('process_failed') + ': resultAirdropLogUpdate')
        // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        // return
      }

      console.log("==================================================== 10")
      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////
      // ◆◆◆◆◆◆◆ mintAmount 만큼 반복 처리 ◆◆◆◆◆◆◆ END
      // 각각의 처리 완료시마다 currencyAmount를 차감하여 이후 실패시 환불할 금액 수정
      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////
      // } catch {
        // this.$q.loading.hide()
      // }

      return newMintingLogVo.tx_id
    },



    async mintSolanaNft(name, symbol, uri, ownerAddress, sellerFeeBasisPoint, collectionMint) {
  try {
    console.log("■■■■■■■ mintSolanaNft With Wallet Test ■■■■■■■ START");

    // 1. UMI 인스턴스 생성 및 네트워크 설정
    const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());

    // 2. Phantom Wallet 어댑터 생성 및 연결
    const walletAdapter = new PhantomWalletAdapter();
    await walletAdapter.connect(); // 지갑 연결
    umi.use(walletAdapterIdentity(walletAdapter)); // UMI에 지갑 설정

    // 3. 컬렉션 및 민팅 정보 설정
    const collectionKey = new PublicKey(collectionMint);
    const tokenOwner = new PublicKey(ownerAddress);
    const sellerFeeBasisPoints = parseFloat(sellerFeeBasisPoint);
    const mint = generateSigner(umi);

    console.log("Parameters and Variables:", {
      collectionMint: this.collectionMint,
      collectionKey: collectionKey.toString(),
      umiNetwork: 'mainnet-beta',
      walletAddress: walletAdapter.publicKey.toString(),
      tokenOwnerAddress: ownerAddress,
      nftInfo: { name, symbol, uri, sellerFeeBasisPoints },
      nftMintAccount: mint.publicKey.toString(),
    });

    // 4. NFT 민팅
    console.log("Start Create NFT");
    const createdNft = await createNft(umi, {
      mint,
      name,
      symbol,
      uri,
      sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints * 0.01),
      collection: { verified: false, key: collectionKey },
      creators: [
        {
          address: walletAdapter.publicKey,
          verified: true,
          share: 100,
        },
      ],
      authority: walletAdapter.publicKey,
      tokenOwner,
      isCollection: false,
    }).sendAndConfirm(umi);
    console.log("End Create NFT");

    // 5. 컬렉션 검증
    console.log("Start Verify Collection");
    const asset = await this.fetchAssetWithRetries(umi, mint.publicKey);
    const metadata = asset.metadata;
    const verify = await verifyCollectionV1(umi, {
      metadata,
      collectionMint: collectionKey,
      authority: walletAdapter.publicKey,
    }).sendAndConfirm(umi);

    // 컬렉션 검증 결과 확인
    if (verify.result.value.err !== null) {
      throw new Error(`Verification failed with error: ${verify.result.value.err}`);
    }

    console.log("NFT Verify Collection Signature:", bs58.encode(verify.signature));
    console.log("End Verify Collection");

    console.log("Create NFT Signature:", bs58.encode(createdNft.signature));
    console.log("■■■■■■■ mintSolanaNft With Wallet Test ■■■■■■■ END");

    return {
      verify_collection_signature: bs58.encode(verify.signature),
      mint_account_key: mint.publicKey,
      create_nft_signature: bs58.encode(createdNft.signature),
    };
  } catch (error) {
    console.error("Error minting and verifying Solana NFT:", error);
  }
},




// Helper method: Phantom Wallet provider 확인 및 연결
async getPhantomProvider() {
  const provider = window.solana;
  if (provider?.isPhantom) {
    try {
      if (!provider.isConnected) {
        await provider.connect();
      }
      return provider;
    } catch (err) {
      console.error("Failed to connect Phantom wallet:", err);
      return null;
    }
  }
  console.error("Phantom wallet not found");
  return null;
},

    async fetchAssetWithRetries(umi, publicKey, retries = 1000, delay = 100) {
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


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    async nftClaim() {
      console.log("nftClaim start")
      /////////////////////////////////////////////////////////////////
      // key value 조회
      /////////////////////////////////////////////////////////////////
      let payerSecretKey = null
      const paramKeyValuePayerSecretKey = {
        cdKey: this.$KEY_VALUE_SOLANA_PAYER_SECRET_KEY,
      }
      const resultKeyValuePayerSecretKey = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValuePayerSecretKey }})
      // console.log(resultKeyValue.data)
      if (resultKeyValuePayerSecretKey.data) {
        payerSecretKey = resultKeyValuePayerSecretKey.data.returnValue
      }

      let sellerFeeBasisPoint = null
      const paramKeyValueSellerFeeBasisPoint = {
        cdKey: this.$KEY_VALUE_SOLANA_SELLER_FEE_BASIS_POINT,
      }
      const resultKeyValueSellerFeeBasisPoint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSellerFeeBasisPoint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSellerFeeBasisPoint.data) {
        sellerFeeBasisPoint = resultKeyValueSellerFeeBasisPoint.data.returnValue
      }

      let collectionMint = null
      const paramKeyValueCollectionMint = {
        cdKey: this.$KEY_VALUE_SOLANA_COLLECTION_MINT,
      }
      const resultKeyValueCollectionMint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueCollectionMint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueCollectionMint.data) {
        collectionMint = resultKeyValueCollectionMint.data.returnValue
      }

      let symbol = null
      const paramKeyValueSymbol = {
        cdKey: this.$KEY_VALUE_SOLANA_SYMBOL,
      }
      const resultKeyValueSymbol = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSymbol }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSymbol.data) {
        symbol = resultKeyValueSymbol.data.returnValue
      }


    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////


    // 메타콩즈 총 공급량 조회
    async selectKeyValue() {
      const paramKeyValueMetakongzTotalSupply = {
        cdKey: this.$METAKONGZ_TOTAL_SUPPLYY,
      }
      const resultKeyMetakongzTotalSupply = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueMetakongzTotalSupply }})
      // console.log(resultKeyValue.data)
      if (resultKeyMetakongzTotalSupply.data) {
        this.metakongzTotalSupply = resultKeyMetakongzTotalSupply.data.returnValue
      }
    },
    // 에어드랍 로그 리스트 조회
    async selectList(idx, done) {
      try {
        const result = await this.$axios.get('/api/airdropLog/selectAirdropLogList',
        {params: {pageNum: 1, pageSize: this.pageSize, newWalletAddress: this.getWalletAddress}})
        
        // 첫번째 load인 경우 리스트 초기화
        if (idx === 1) {
          this.airdropLogList = []
        }
        // 리스트에 데이터 추가
        this.airdropLogList = this.airdropLogList.concat(result.data)
        console.log(this.airdropLogList)
        if (done) {
          done()
        }
      } catch (err) {
        console.log(err)

        if (done) {
          done()
        }
      }
    },
    async insertAirdropLogList() {
      // if(this.userAddress) {
      //   // 모달 닫기
      //   this.confirmSign = false
      // } else {
      //   this.$noti(this.$q, '지갑에서 서명을 완료해 주세요.')
      //   return
      // }

      try {
         // AirdropLog용 리스트로 변환
         const airdropLogList = this.ownNftList
          // .filter(nft => nft.selected) // 선택된 NFT만 추출
          .filter(nft => !nft.isDuplicate) // 미신청 NFT만 추출
          .map(nftItem => ({
            old_wallet_address: this.getWalletAddress,
            old_wallet_type: this.getWalletType,
            old_nft_contract: this.$METAKONGZ_CONTRACT_ADDRESS,
            old_nft_id: nftItem.tokenId,
            old_nft_name: nftItem.name,
            old_nft_image: nftItem.image,
            new_wallet_address: this.solanaWalletAddress,
            new_nft_contract: '',
            status: this.$NFT_STATUS_MINT_PROCESSING, // 10
            old_project_id: 1,
            reg_id: this.getWalletAddress,
          }))

        const requestData = {
          airdropLogList: airdropLogList,
          // message: this.message,
          // signature : this.signedMessage,
          userAddress: this.getWalletAddress,
          uuid: this.getUuid
        }
        // this.$q.loading.show() // 로딩 표시 시작
        const response = await this.$axios.post('/api/airdropLog/insertAirdropLogList', requestData)
        if (response.data.resultCd === 'SUCCESS') {
          this.$noti(this.$q, '신청 완료')
          this.getNftList()
        } else {
          console.log('에어드롭 로그 등록 실패: ', response.data.resultMsg)
          this.$noti(this.$q, '처리 실패')
        }
      } catch (err) {
        console.log(err);
        this.$noti(this.$q, '처리 실패')
      }
    },

/////////////////////////////////////////////////////////////////
// phantom 지갑연결
/////////////////////////////////////////////////////////////////
    async connectPhantomWallet() {
      let provider;

      // 팬텀 지갑 프로바이더 가져오기
      const getProvider = () => {
        if (window.solana && window.solana.isPhantom) {
          return window.solana;
        }
        window.open('https://phantom.app/ul/browse/https%3A%2F%2Fpunkykongz.com?ref=https%3A%2F%2Fmyapp.com', '_blank');
        return null;
      };

      provider = getProvider();
      if (!provider) {
        console.error("Phantom wallet is not available");
        return;
      }

      // 팬텀 지갑 연결 시도
      const handleConnect = async () => {
        if (!provider) {
          console.log("Provider 없음");
          return;
        }

        try {
          // Phantom Wallet과 연결
          if (!provider.isConnected) {
            await provider.connect();
          }

          // 사용자의 지갑 주소 가져오기
          const walletAddress = provider.publicKey?.toString();
          if (!walletAddress) {
            throw new Error("Failed to retrieve wallet address");
          }

          console.log("Connected to Phantom Wallet:", walletAddress);

          // 지갑 주소를 세션 및 스토어에 저장
          sessionStorage.setItem('WALLETADDRESS', walletAddress);
          sessionStorage.setItem('WALLETTYPE', 'phantom');
          this.$store.dispatch('setWalletAddress', walletAddress);
          this.$store.dispatch('setWalletType', 'phantom');
          localStorage.setItem('WALLETADDRESS', walletAddress);
          localStorage.setItem('WALLETTYPE', 'phantom');

          this.solanaWalletAddress = walletAddress;
        } catch (error) {
          console.error("Failed to connect to Phantom wallet:", error);
          this.$noti(this.$q, this.$t('failed') + error.message);
        }
      };

      // 연결 시도 실행
      await handleConnect();

      // 회원정보 체크 및 등록
      try {
        if (this.solanaWalletAddress) {
          await this.checkAndRegisterUser(this.solanaWalletAddress);
        }
      } catch (e) {
        console.error("User registration error:", e);
      }

    },
    handlePhantomAccountChange() {
      // 팬텀 지갑 프로바이더 가져오기
      const provider = this.getPhantomProvider();
      if (!provider) return;

      // 팬텀 계정 변경 이벤트 설정
      if (typeof provider.on === 'function') {
        provider.on('accountChanged', (publicKey) => {
          if (publicKey) {
            const walletAddress = publicKey.toString();
            console.log(`Switched to account: ${walletAddress}`);

            // 세션 및 스토어에 지갑 주소 저장
            sessionStorage.setItem('WALLETADDRESS', walletAddress);
            this.$store.dispatch('setWalletAddress', walletAddress);
            localStorage.setItem('WALLETADDRESS', walletAddress);
          } else {
            console.log('No Phantom account connected');
            sessionStorage.removeItem('WALLETADDRESS');
            localStorage.removeItem('WALLETADDRESS');
            this.$store.dispatch('setWalletAddress', null);
          }
        });
      }
    },
    // // 팬텀 지갑 프로바이더 가져오는 메소드
    // getPhantomProvider() {
    //   // Phantom 지갑이 Solana 네트워크를 지원하는지 확인
    //   if (window.solana && window.solana.isPhantom) {
    //     return window.solana; // Solana 지갑 객체 반환
    //   }
    //   return null;

    //   // mount 훅에 올라가있는 메소드에서 실행이되어 자꾸 팬텀페이지가 열려서 주석처리.
    //   // window.open('https://phantom.app/', '_blank')
    //   // return null // 프로바이더가 없는 경우 null 반환
    // },
    disconnectWallet() {
      this.$store.dispatch('setWalletAddress', '')
      this.$store.dispatch('setWalletType', '')
      localStorage.setItem('WALLETADDRESS', '')
      localStorage.setItem('WALLETTYPE', '')
      // this.$cookie.set('walletAddress', '')
      // this.$cookie.set('walletType', '')
      sessionStorage.removeItem('WALLETADDRESS')
      sessionStorage.removeItem('WALLETADDRESSKEY')
      sessionStorage.removeItem('WALLETTYPE')
      // sessionStorage.removeItem('phantom.contentScript.providerInjectionOptions.v3')

      this.ownNftList = []
    },


    checkAndRegisterUser(walletAddress) {
      // user 존재유무 체크 존재하지 않는 경우 신규 등록
      const param = {
        uid: walletAddress,
        wallet_address: walletAddress,
        wallet_type: this.getWalletType,
        reg_id: walletAddress,
      }
      this.$axios.post('/api/user/checkAndInsertUser', param)
      .then((response) => {
        if (response.data.resultCd === "SUCCESS") {
          // 서버에서 uuid 값을 받아와서 사용
          const uuid = response.data.returnValue
          // console.log('Received UUID:', uuid)

          sessionStorage.setItem('UUID', uuid)
          this.$store.dispatch('setUuid', uuid)
          localStorage.setItem('UUID', uuid)
          
        }
      })
      .catch((error) => {
        console.log('API 호출 실패:', error)
      })
    },
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
      },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, 'copied to clipboard')
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, 'copy failed')
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
