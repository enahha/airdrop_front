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
        <h2>현재 보유한 KONGZ</h2>

        <!-- 메타콩즈 홀더 인증 전에 나오는 문구 -->
        <div v-if="!getWalletAddress" class="kongz_none">
          <p><i class="xi-warning copy"></i></p>
          <p>메타콩즈 홀더 인증 후 확인하실 수 있습니다.<br /> 메타마스크 지갑 연결을 부탁드리겠습니다.</p>
        </div>
        <!-- //메타콩즈 홀더 인증 전에 나오는 문구 -->

        <!-- 메타콩즈 홀더 인증 후 보유한 메타콩즈 없음 -->
        <div v-else-if="getWalletAddress && (!ownNftList || ownNftList.length === 0)" class="kongz_none">
          <p><i class="xi-warning copy"></i></p>
          <p>보유한 메타콩즈가 없습니다.<br /></p>
        </div>
        <!-- //메타콩즈 홀더 인증 후 보유한 메타콩즈 없음 -->

        <!-- 메타콩즈 홀더 인증 후 나오는 콩즈리스트 -->
        <div v-else>
          <div v-if="paginatedList.length > 0">
            <div  class="kongz_list">
              <ul>
                <li v-for="(nft, index) in paginatedList" :key="index" :class="{'complete': nft.isDuplicate}">
                  <div class="nft_box">
                    <p class="thumb"><img :src="nft.image" :alt="nft.title"></p>
                    <p class="name">{{ nft.name }}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="page">
              <ul>
                <li>
                  <a href="#" @click.prevent="prevPage"><i class="xi-angle-left"></i></a>
                </li>
                <li v-for="page in totalPages" :key="page">
                  <a href="#" :class="{ on: currentPage === page }" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li>
                  <a href="#" @click.prevent="nextPage"><i class="xi-angle-right"></i></a>
                </li>
              </ul>
            </div>
            <!-- //메타콩즈 홀더 인증 후 나오는 콩즈리스트 -->
          </div>
        </div>

        <div>
          <button v-if="getWalletAddress" @click="showAirdropApplyModal()" class="btn btn-airdrop" data-toggle="modal">펑키콩즈 에어드랍 신청하기</button>
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
				<li><a href="https://discord.gg/2NsgpTTr" target="_blank"><img src="images/sns_icon3.png" alt="디스코드"></a></li>
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

  <!-- 하드월렛 사인 확인 -->
  <!-- <q-dialog v-model="confirmSign">
    <q-card style="width: 900px !important; height: auto; max-width: 850px !important">
      <div class="modal-1 fade-1 inner" id="wallet_confirm">
        <div class="modal-dialog-1 modal-dialog-centered-1">
        <div class="modal-content-1">

          <div class="modal_body">
            <button type="button" @click="confirmSign = false" class="modal_close" data-dismiss="modal"><i class="xi-close-thin"></i></button>
            <p class="icons"><i class="xi-warning"></i></p>
            <h4>지갑에서 서명을 완료한 후 확인을 눌러주세요.<br /></h4>
            <div class="apply_btn mt40">
              <button @click="insertAirdropLogList" class="btn btn-holder s" data-dismiss="modal">확인</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </q-card>
  </q-dialog> -->

  <!-- 렛저 pc 안내 -->
  <q-dialog v-model="ledgerGuide">
    <q-card style="width: 900px !important; height: auto; max-width: 850px !important">
      <div class="modal-1 fade-1 inner" id="wallet_confirm">
        <div class="modal-dialog-1 modal-dialog-centered-1">
        <div class="modal-content-1">

          <div class="modal_body">
            <button type="button" @click="ledgerGuide = false" class="modal_close" data-dismiss="modal"><i class="xi-close-thin"></i></button>
            <p class="icons"><i class="xi-warning"></i></p>
            <div style="word-break:keep-all;">
              <h4>기기의 잠금을 풀고 이더리움 네트워크에 접속 후 장치를 준비시켜주세요.<br /></h4>
            </div>
            <div class="apply_btn mt40">
              <button @click="connectLedgerWallet()" class="btn btn-holder s" data-dismiss="modal">확인</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <!-- 모바일용 하드월렛 연결 안내 -->
  <!-- <q-dialog v-model="mobileGuide">
    <q-card style="width: 900px !important; height: auto; max-width: 850px !important">
      <div class="modal-1 fade-1 inner" id="wallet_confirm">
        <div class="modal-dialog-1 modal-dialog-centered-1">
        <div class="modal-content-1">

          <div class="modal_body">
            <p class="icons"><i class="xi-warning"></i></p>
            <h4>모바일에서는 '메타마스크'를 선택해주세요.<br /></h4>
            <div class="apply_btn mt40">
              <button @click="mobileGuide = false" class="btn btn-holder s" data-dismiss="modal">확인</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </q-card>
  </q-dialog> -->


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

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      smallSize: false,
      // confirmSign: false,
      // mobileGuide: false,
      ledgerGuide: false,
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
      
      // PROD용 (ethereum)
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency_name: 'Ether',
      symbol: 'ETH',
      rpcUrls: 'https://rpc.ankr.com/eth',
      blockExplorerUrls: 'https://etherscan.io/',

      
      // // 테스트용 (Sepolia)
      // chainId: '0xaa36a7',
      // chainName: 'Sepolia Testnet',
      // nativeCurrency_name: 'Sepolia Ether',
      // symbol: 'ETH',
      // // rpcUrls: 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      // // rpcUrls: 'https://ethereum-sepolia-rpc.publicnode.com',
      // rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
      // blockExplorerUrls: 'https://sepolia.etherscan.io/',


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

    if (this.$q.platform.is.desktop) {
      if (window.ethereum) {
        // 지갑주소 변경 이벤트 구독
        window.ethereum?.on('accountsChanged', this.walletAccountsChangedMetamask)
        // 체인 변경 이벤트 구독
        window.ethereum?.on('chainChanged', this.handleChainChangedMetamask)
      }
    }

    AOS.init()

    // 팬텀지갑 주소변경 이벤트
    // this.handlePhantomAccountChange()

    // 지갑 연결된 상태면 실행
    if (this.getWalletAddress && this.getWalletType) {
        this.getNftList()
    }

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
      if(walletType == 'metamask') {
        this.connectMetaMaskWallet()
        return
      }
      if(walletType == 'phantom') {
        this.connectPhantomWallet()
        return
      }
      if(walletType == 'dcent') {
        this.connectDcentWallet()
        return
      }
      if(walletType == 'ledger') {
        this.ledgerGuide = true
        // 확인 후 지갑연결 실행
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
        {params: {pageNum: idx, pageSize: this.pageSize, oldWalletAddress: this.getWalletAddress}})
        
        // 첫번째 load인 경우 리스트 초기화
        if (idx === 1) {
          this.airdropLogList = []
        }
        // 리스트에 데이터 추가
        this.airdropLogList = this.airdropLogList.concat(result.data)
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
    async getNftList() {
      try {
        this.$q.loading.show(); // 로딩 표시 시작
        try {
          // Fetch NFT list from Ethereum first
          this.ownNftList = await this.fetchEthereumNftList();
        } catch (fetchError) {
          console.log("MetaMask NFT 조회 중 오류 발생, Alchemy API로 재시도 중:", fetchError);
          throw new Error("MetaMask NFT 조회 실패, Alchemy API로 재시도");
        }

      } catch (err) {
        console.log("NFT 조회 중 오류 발생, Alchemy API로 재시도 중:", err);
        try {
          // Fetch NFT list from Alchemy API
          this.ownNftList = await this.alchemyNftList();
          // console.log("alchemyNftList의  this.ownNftList");
          // console.log(this.ownNftList);

        } catch (alchemyError) {
          console.log("Alchemy API 조회 중 오류 발생:", alchemyError);
        }
      } finally {
        // If NFT list has items, compare with airdrop log
        if (this.ownNftList && this.ownNftList.length > 0) {
          this.compareWithAirdropLogList();
        }
        this.$q.loading.hide(); // 로딩 종료
      }
    },
    // ownNftList와 airdropLogList의 OLD_NFT_ID를 비교하여 중복된 항목 찾기
    compareWithAirdropLogList() {
      // ownNftList에서 tokenId 추출
      const tokenIds = this.ownNftList.map(item => item.tokenId.toString()) // tokenId가 BigInt인 경우, 문자열로 변환

      // console.log(tokenIds)
      // 서버로 tokenIds 전송
      this.$axios.post('/api/airdropLog/checkDuplicate', { tokenIdList: tokenIds })
        .then(response => {
          const duplicateIds = new Set(response.data.duplicateIds)
          this.ownNftList.forEach(item => {
            item.isDuplicate = duplicateIds.has(item.tokenId.toString()) // Set에서 중복 여부 확인
          })
        })
        .catch(error => {
          console.log('Error checking duplicates:', error)
        })
    },
    async alchemyNftList() {
      console.log("Searching with Alchemy api ..")

      // const ownerAddress = "0x730A2C7d32a6B45371BA4A5AA40C291e8297431b"
      // const ownerAddress = '0xDDB1aE0C97371464785F122dC29b0fBE3f8990c3' // 메인넷 - 콩즈 11개 홀더
      const ownerAddress = this.getWalletAddress
      const contractAddress = this.$METAKONGZ_CONTRACT_ADDRESS
      
      const apiKey = "wspRO3sE6afxI_nRqFoKLsz6sLDielYd"; // Alchemy API 키

      let url = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/` // 운영 - mainnet
      if (this.$METAKONGZ_CONTRACT_ADDRESS != '0x46FdfCb3Cd89A1C54D36EE83a4ADC184747B40D9') { // 운영 콩즈 컨트랙트가 아니면 ( = 테스트 여부 true이면)
        // 테스트 - sepolia
        url = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}/getNFTs/`
      }

      this.$q.loading.show() // 로딩 표시 종료
      try {
        const response = await this.$axios.get(url, {
            params: {
                owner: ownerAddress,
                contractAddresses: [contractAddress]
            }
        });

        // console.log("사용자가 소유한 특정 컨트랙트의 NFT:", response.data)
        // 필요한 정보만 추출 (이미지, 이름, NFT ID)
        // console.log(response.data.ownedNfts)
        const nftList = response.data.ownedNfts.map(nft => ({
          tokenId: BigInt(nft.id.tokenId).toString(10),
          name: `Kongz#${BigInt(nft.id.tokenId).toString(10)}`,
          image: `https://eth-kongz.by-syl.com/images/${BigInt(nft.id.tokenId).toString(10)}.png`
        }));

       this.$q.loading.hide() // 로딩 표시 종료

        // console.log("nftList")
        // console.log(nftList)
        return nftList
      } catch (error) {
         this.$q.loading.hide() // 로딩 표시 종료
          console.log("NFT 조회 중 오류 발생:", error)
      }
    },
    async fetchEthereumNftList() {
      console.log("Get Ethereum NFT List")

      // const ownerAddress = '0x32236fFdB5e45FBf2A5901a2e8c157b140a56D84'    // 메타콩즈 테스트용
      const ownerAddress = this.getWalletAddress
      const contractAddress = this.$METAKONGZ_CONTRACT_ADDRESS

      // web3가 초기화되었는지 확인
      if (!this.$web3) {
        if (typeof window.ethereum !== 'undefined') {
          this.$web3 = new Web3(window.ethereum)
        } else {
          console.log('MetaMask가 설치되지 않았습니다.')
          return
        }
      }
 
      // 스마트 계약 인스턴스 생성
      const contract = new this.$web3.eth.Contract(this.$METAKONGZ_ABI, contractAddress)
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        this.$q.loading.show() // 로딩 표시 시작

        // ownerAddress로 받은 모든 Transfer 이벤트 조회
        const receivedEvents = await contract.getPastEvents('Transfer', {
          filter: { to: ownerAddress },
          fromBlock: 0,
          toBlock: 'latest'
        })

        // ownerAddress에서 보낸 모든 Transfer 이벤트 조회
        const sentEvents = await contract.getPastEvents('Transfer', {
          filter: { from: ownerAddress },
          fromBlock: 0,
          toBlock: 'latest'
        })

        // console.log("contract")
        // console.log(contract)
        // console.log("receivedEvents")
        // console.log(receivedEvents)
        // console.log("sentEvents")
        // console.log(sentEvents)

        // 모든 이벤트를 토큰 ID 별로 정리
        const eventMap = new Map()

        receivedEvents.forEach(event => {
          const tokenId = event.returnValues.tokenId.toString()
          const blockNumber = event.blockNumber

          // 받은 이벤트에 해당하는 토큰 ID 저장
          if (!eventMap.has(tokenId)) {
            eventMap.set(tokenId, { receivedBlock: blockNumber, sentBlock: null })
          } else {
            eventMap.get(tokenId).receivedBlock = blockNumber
          }
        })

        sentEvents.forEach(event => {
          const tokenId = event.returnValues.tokenId.toString()
          const blockNumber = event.blockNumber

          // 보낸 이벤트에 해당하는 토큰 ID 저장
          if (!eventMap.has(tokenId)) {
            eventMap.set(tokenId, { receivedBlock: null, sentBlock: blockNumber })
          } else {
            eventMap.get(tokenId).sentBlock = blockNumber
          }
        })

        // 가장 최근 블록이 receivedBlock인 토큰들만 필터링
        const ownedTokenIds = Array.from(eventMap.entries())
          .filter(([tokenId, { receivedBlock, sentBlock }]) =>
            receivedBlock !== null && (sentBlock === null || receivedBlock > sentBlock))
          .map(([tokenId]) => tokenId)

        // 배치 크기 설정
        const batchSize = 40
        let allTokenURIs = []

        // 배치로 나누어 처리
        for (let i = 0; i < ownedTokenIds.length; i += batchSize) {
          const batchTokenIds = ownedTokenIds.slice(i, i + batchSize)

          // 각 배치의 토큰 ID에 대한 tokenURI 가져오기
          const tokenURIs = await Promise.all(
            batchTokenIds.map(async (tokenId) => {
              // const tokenURI = await contract.methods.tokenURI(tokenId).call()
              const tokenURI = `https://eth-kongz.by-syl.com/json/${tokenId}.json`

              const imageUrl = `https://eth-kongz.by-syl.com/images/${tokenId}.png`
              const name = `Kongz#${tokenId}`

              return { tokenId, tokenURI, image: imageUrl, name }
            })
          )
          // 배치별로 결과 추가
          allTokenURIs = [...allTokenURIs, ...tokenURIs]
        }

        // console.log('Token Metadata URIs:', allTokenURIs)
        this.$q.loading.hide() // 로딩 표시 종료
        return allTokenURIs

      } catch (err) {
        this.$q.loading.hide() // 로딩 표시 종료
        throw new Error("fetchEthereumNftList fail");
        // this.ownNftList = []
        // // this.$noti(this.$q, this.$t('process_failed') + err)
        // // console.error('NFT를 가져오는 중 오류 발생:', err)
        // this.$noti(this.$q, "메타마스크 지갑과 팬텀 지갑을 동시에 사용하시는 경우, 팬텀 지갑의 [기본 앱 월릿]을 메타마스크로 설정해주세요. [기본 앱 월릿] 설정 방법 : 팬텀 지갑 좌상단 [아바타] 선택 > 하단 [설정] 선택 > [기본 설정] 선택 > [기본 앱 월릿] 선택 > [MetaMask] 선택")
        // this.disconnectWallet()
        // console.log(err)
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
            status: this.$NFT_STATUS_MINT_WAIT, // 대기 (0)
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
        this.$noti(this.$q, '처리 실패');
      }
    },
    async doSignWallet() {
      try {
        // nonce 메시지 생성 요청
        const result = await this.$axios.get('/api/signature/generateNonce')
        this.message = result.data

        if (this.getWalletType === 'metamask') {
          // 메타마스크 서명 요청
          const result = await this.signMetamask(this.message)
          this.userAddress = result.userAddress
          this.signedMessage = result.signedMessage
        } else if (this.getWalletType === 'phantom') {
          // Phantom 지갑 서명 요청
          const result = await this.signPhantom(this.message)
          this.userAddress = result.userAddress
          this.signedMessage = result.signedMessage
        }

        if (this.userAddress && this.signedMessage) {
          this.insertAirdropLogList()
        } else {
          console.log('지갑 서명에 실패하였습니다.')
        }
      } catch (error) {
        console.log("지갑 서명 중 오류가 발생했습니다:", error)
      }
    },
    async doSignHardWallet() {
      this.userAddress = null
      try{
        // nonce 메시지 생성 요청
        const result = await this.$axios.get('/api/signature/generateNonce')
        this.message = result.data

        // 확인 모달 띄움
        if (this.getWalletType === 'dcent') {
          // D'CENT 지갑 서명 요청
          const result = await this.signDcent(this.message)
          this.userAddress = result.userAddress
          this.signedMessage = result.signedMessage
        }
        if (this.getWalletType === 'ledger') {
          // D'CENT 지갑 서명 요청
          const result = await this.signLedger(this.message)
          this.userAddress = result.userAddress
          this.signedMessage = result.signedMessage
        }

        // if (this.userAddress && this.signedMessage) {
        //   this.insertAirdropLogList()
        // } else {
        //   console.error('지갑 서명에 실패하였습니다.')
        // }
      } catch (error) {
        console.log("지갑 서명 중 오류가 발생했습니다:", error)
      }
    },


    async signMetamask(message) {
      // MetaMask 프로바이더 강제 설정
      let provider = window.ethereum.providers?.find((p) => p.isMetaMask) || window.ethereum;

      // MetaMask 계정 확인 및 서명 요청
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error("MetaMask 계정을 찾을 수 없습니다.");
      }
      const userAddress = accounts[0];

      const signedMessage = await provider.request({
        method: 'personal_sign',
        params: [message, userAddress],
      });

      // 서명된 메시지와 사용자 주소 반환
      return { userAddress, signedMessage };
    },

    async signPhantom(message) {
      // Phantom 지갑의 이더리움 프로바이더 가져오기
        const provider = this.getPhantomProvider()

      if (!provider) {
        throw new Error("Phantom 지갑이 설치되지 않았거나 이더리움 네트워크에 연결되지 않았습니다.")
      }

      try {
        // 이더리움 계정 요청
        const accounts = await provider.request({ method: 'eth_requestAccounts' })
        if (!accounts || accounts.length === 0) {
          throw new Error("Phantom 지갑에서 계정을 찾을 수 없습니다.")
        }
        const userAddress = accounts[0]
        const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`
        const signedMessage = await provider.request({
          method: 'personal_sign',
          params: [msg, userAddress, 'Example password'], // 'Example password'는 실제로 불필요할 수 있음
        })

        return { userAddress, signedMessage }
      } catch (error) {
        console.log("Phantom 지갑 서명 오류: ", error)
        throw error
      }
    },
    walletAccountsChangedMetamask(accounts) {
      this.$store.dispatch('setWalletType', 'metamask')
      this.$store.dispatch('setWalletAddress', accounts[0])
      this.$cookie.set('walletAddress', accounts[0])
      this.$cookie.set('walletType', 'metamask')
      localStorage.setItem('WALLETADDRESS', accounts[0])
      localStorage.setItem('WALLETTYPE', 'metamask')

      // ■■■ 회원정보 체크, 존재하지 않으면 insert
      try {
        this.checkAndRegisterUser(accounts[0])
      } catch(e) {
        console.log(e)
      }

      // ■■■ 바뀐 지갑으로 재검색 
      try {
        this.getNftList()
      } catch(e) {
        console.log(e)
      }
    },
    handleChainChangedMetamask(chainId) {
      console.log(chainId) // eth mainnet: 0x1, cypress: 0x2019, baobab: 0x3e9
      // We recommend reloading the page, unless you must do otherwise
      // window.location.reload()
      this.checkChain()
    },
    async checkChain() {
      // 로그인 상태가 아니면 처리하지 않음
      if(!this.$store.getters.getWalletAddress) {
        return
      }

      // 메인넷 확인
      const walletType = this.$store.getters.getWalletType
      let chainId = ''
      if (walletType === 'kaikas') {
        chainId = window.klaytn.networkVersion
      } else if (walletType === 'metamask') {
        chainId = await window.ethereum.request({ method: 'eth_chainId' })
      } else {
        return true
      }
      if (chainId !== this.chainId) {
        // 메인넷이 아니므로 로그아웃
        // this.logout()
        this.$noti(this.$q, this.$t('set_to_the_mainnet'))
        return false
      }
      return true
    },
    async connectMetaMaskWallet() {
      // MetaMask가 여러 지갑 중 하나일 때, providers 배열에서 MetaMask를 선택
      let provider;
      if (window.ethereum) {
        if (window.ethereum.providers) {
            provider = window.ethereum.providers.find((p) => p.isMetaMask);
        } else if (window.ethereum.isMetaMask) {
            provider = window.ethereum;
        }
      } else {
        // MetaMask가 설치되어 있지 않은 경우
        this.$noti(this.$q, this.$t('MetaMask is not installed.'));
        window.open('https://metamask.app.link/dapp/https://punkykongz.com');
      }


      // MetaMask 설치 여부 확인 및 MetaMask 전용 사용 설정
      if (provider !== 'undefined') {
      this.$noti(this.$q, "provider true")

        try {
          // MetaMask 계정 요청
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            const walletAddress = accounts[0];
            const chainId = await provider.request({ method: 'eth_chainId' });

            // 이더리움 메인넷으로 체인 전환 요청
            if (chainId !== this.chainId) {
              try {
                await provider.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: this.chainId }] // 0x1은 이더리움 메인넷의 체인 ID
                });
              } catch (switchError) {
                // 네트워크 추가 요청
                if (switchError.code === 4902) {
                  await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: this.chainId,
                      chainName: this.chainName,
                      nativeCurrency: {
                        name: this.nativeCurrency_name,
                        symbol: this.symbol,
                        decimals: 18
                      },
                      rpcUrls: [this.rpcUrls],
                      blockExplorerUrls: [this.blockExplorerUrls]
                    }]
                  });
                } else {
                  console.log('Ethereum 체인 전환 중 오류 발생:', switchError);
                  return;
                }
              }
            }

            // 세션 및 로컬 스토리지에 지갑 주소 저장
            sessionStorage.setItem('WALLETADDRESS', walletAddress);
            sessionStorage.setItem('WALLETTYPE', 'metamask');
            this.$store.dispatch('setWalletAddress', walletAddress);
            this.$store.dispatch('setWalletType', 'metamask');
            localStorage.setItem('WALLETADDRESS', walletAddress);
            localStorage.setItem('WALLETTYPE', 'metamask');

            // 회원정보 체크 및 등록
            try {
              this.checkAndRegisterUser(walletAddress);
            } catch (e) {
              console.log(e);
            }

            // NFT 리스트 조회
            try {
              this.getNftList();
            } catch (e) {
              console.log(e);
            }

          } else {
            // 연결된 계정이 없을 경우
            this.$noti(this.$q, '연결된 계정이 없습니다.');
          }
        } catch (error) {
          console.log(error);
          this.$noti(this.$q, error.message);
        }
      } else {
        // MetaMask가 설치되어 있지 않은 경우
        this.$noti(this.$q, this.$t('MetaMask is not installed.'));
        window.open('https://metamask.app.link/dapp/https://punkykongz.com');
      }
    },

    async checkEthereumNetwork() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' })
          if (chainId === '0x1') {
            console.log('Ethereum Mainnet에 연결되었습니다.')
            return true // 연결 확인
          } else {
            console.log('다른 네트워크에 연결되었습니다. 현재 체인 ID:', chainId)
            return false // 다른 네트워크에 연결된 경우
          }
        } catch (error) {
          console.log('네트워크 확인 중 오류가 발생했습니다.', error)
          return false // 오류 처리
        }
      } else {
        console.log('MetaMask가 설치되어 있지 않습니다.')
        return false // MetaMask 미설치
      }
    },
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

/////////////////////////////////////////////////////////////////
// phantom 지갑연결
/////////////////////////////////////////////////////////////////
    async connectPhantomWallet() {
      let provider
      // 팬텀 지갑 프로바이더 가져오기
      const getProvider = () => {
        if ('phantom' in window) {
          const anyWindow = window
          const provider = anyWindow.phantom?.ethereum

          if (provider) {
            return provider
          }
        }

        window.open('phantom://open?url=https://punkykongz.com', '_blank')
      }

      provider = getProvider()
      // console.log("provider : ", provider)

      // 팬텀 지갑 연결 시도
      const handleConnect = async () => {
        // console.log("팬텀지갑 연결 시도")

        if (!provider) {
          console.log("provider 없음")
          return
        }
        try {
          const accounts = await provider.request({ method: "eth_requestAccounts" })

          const walletAddress = accounts[0]

          sessionStorage.setItem('WALLETADDRESS', accounts[0])
          sessionStorage.setItem('WALLETTYPE', 'phantom')
          this.$store.dispatch('setWalletAddress', walletAddress)
          this.$store.dispatch('setWalletType', 'phantom')
          localStorage.setItem('WALLETADDRESS', walletAddress)
          localStorage.setItem('WALLETTYPE', 'phantom')

          this.solanaWalletAddress = walletAddress

        } catch (error) {
          this.$noti(this.$q, this.$t('failed' + error))
        }
      }

      // 연결 시도 실행
      await handleConnect()

      // ■■■ 회원정보 체크, 존재하지 않으면 insert 있으면 select
      try {
        this.checkAndRegisterUser(this.solanaWalletAddress)
      } catch (e) {
        console.log(e)
      }
      // ■■■ 지갑 주소로 NFT 리스트 조회
      try {
        this.getNftList()
      } catch (e) {
        // console.log(e)
      }
    },
    // 팬텀 지갑 프로바이더 가져오는 메소드
    getPhantomProvider() {
      if ('phantom' in window) {
        const anyWindow = window
        const provider = anyWindow.phantom?.ethereum

        if (provider) {
          return provider
        }
      }

      // mount 훅에 올라가있는 메소드에서 실행이되어 자꾸 팬텀페이지가 열려서 주석처리.
      // window.open('https://phantom.app/', '_blank')
      // return null // 프로바이더가 없는 경우 null 반환
    },
    handlePhantomAccountChange() {
      // if (window.ethereum && window.ethereum.isPhantom) {
        const provider = this.getPhantomProvider()
        if (!provider) return

        // 팬텀 계정 변경 이벤트
        provider.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            const walletAddress = accounts[0]
            console.log(`Switched to account ${walletAddress}`)
            sessionStorage.setItem('WALLETADDRESS', accounts[0])
            this.$store.dispatch('setWalletAddress', walletAddress)
            localStorage.setItem('WALLETADDRESS', walletAddress)

          } else {
            console.log('No Phantom account connected')
          }
        })
      // }
    },
    async disconnectPhantomWallet() {
      this.$store.dispatch('setWalletAddress', '')
      this.$store.dispatch('setWalletType', '')
      localStorage.setItem('WALLETADDRESS', '')
      localStorage.setItem('WALLETTYPE', '')
      // this.$cookie.set('walletAddress', '')
      // this.$cookie.set('walletType', '')
      sessionStorage.removeItem('WALLETADDRESS')
      sessionStorage.removeItem('WALLETTYPE')

      this.ownNftList = []
    },
/////////////////////////////////////////////////////////////////
// hard wallet 지갑 연결
/////////////////////////////////////////////////////////////////
      // async initializeAppKit() {
      //   try {
      //     // 올바른 projectId를 설정 (32자 문자열)
      //     const projectId = 'a46fdc21982fe708faa07ba96cc728d1'

      //     // AppKit 초기화
      //     createAppKit({
      //       adapters: [
      //         new EthersAdapter(),    // D'CENT 지갑 지원 어댑터
      //       ],
      //       networks: [mainnet, arbitrum], // 지원하는 네트워크만 설정
      //       metadata: {
      //         name: 'puncykongz', 
      //         description: '간단한 설명', 
      //         url: 'https://punkykongz.com', 
      //         icons: ['https://avatars.mywebsite.com/'], 
      //       },
      //       projectId, // 필수: 32자 프로젝트 ID
      //       features: {
      //         email: false,
      //         analytics: true, // Optional - 기본 분석 기능 설정
      //         socials: false,

      //       },
      //       enableCoinbase: true, // true by default
      //       coinbasePreference: 'smartWalletOnly',
      //       excludeWalletIds: [
      //         'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      //         'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393'
      //       ],
      //       includeWalletIds: [
      //         '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
      //       ],
      //       allWallets: 'HIDE'
      //     })

      //     // 모달 수동 초기화
      //     this.modal = useAppKit()
      //     console.log("@@@@@", this.modal) // 모달 객체가 제대로 반환되는지 확인


      //     if (!this.modal || typeof this.modal.open !== "function") {
      //       throw new Error("AppKit modal was not initialized correctly.")
      //     }

      //   } catch (error) {
      //     console.error('Failed to initialize AppKit:', error)
      //   }
      // },
      // async connectHardWallet() {

      // },

    //   async connectDcentWallet() {
    //   try {
    //     // QR code modal options
    //     const qrcodeModalOptions = {}

    //     // Initialize WalletConnect connector
    //     const connector = new WalletConnect({ qrcodeModal: QRcodeModal, qrcodeModalOptions })

    //     // Create session to open the modal
    //     if (!connector.connected) {
    //       await connector.createSession({ chainId: 11155111 }) // Sepolia chainId (Ethereum Testnet) // Required to open modal
    //     }

    //     // Subscribe to WalletConnect events
    //     this.subscribeToEvents(connector)
    //   } catch (error) {
    //     console.error("Error connecting to D'CENT Wallet via WalletConnect:", error)
    //   }
    // },

    // subscribeToEvents(connector) {
    //   const callback = (err, payload) => {
    //     if (err) {
    //       console.error("Event error:", err)
    //       return
    //     }
    //     console.log("Event payload:", payload)
    //   }

    //   // Subscribe to session update, connect, and disconnect events
    //   connector.on('session_update', callback)
    //   connector.on('connect', callback)
    //   connector.on('disconnect', callback) // Kill session
    // },

    // async killSession(connector) {
    //   if (connector) {
    //     await connector.killSession()
    //     console.log("Session killed")
    //   }
    //   // Attach code to reset your app state here
    // },

    // async connectDcentWallet() {
    //   try {
    //     // QR code modal options
    //     const qrcodeModalOptions = {}

    //     // Initialize WalletConnect connector
    //     const connector = new WalletConnect({ qrcodeModal: QRcodeModal, qrcodeModalOptions })

    //     // Create session to open the modal
    //     if (!connector.connected) {
    //       await connector.createSession({ chainId: 0x1 }) // Sepolia chainId (Ethereum Testnet) // Required to open modal
    //     }

    //     // Subscribe to WalletConnect 'connect' event to get account information
    //     connector.on('connect', (error, payload) => {
    //       if (error) {
    //         throw error
    //       }
          
    //       // Get account information from payload
    //       const { accounts } = payload.params[0]
    //       console.log("Connected account:", accounts[0])
    //     })

    //     console.log("D'CENT Wallet connected successfully")
    //   } catch (error) {
    //     console.error("Error connecting to D'CENT Wallet via WalletConnect:", error)
    //   }
    // },
    async connectDcentWallet() {
      if (this.$q.platform.is.desktop) {      // pc일 경우
        try {
          // this.$q.loading.show()
          // Connect to D'CENT wallet
          const account_infos = await DcentWebConnector.getAccountInfo()
          // Extract address paths from the account information
          const accounts = account_infos?.body?.parameter?.account
          if (accounts && Array.isArray(accounts)) {
            accounts.forEach(account => {
              // console.log("Address Path:", account.address_path)
            })
          } else {
            console.log("No account information found in D'CENT Wallet response")
          }

          let coinType = DcentWebConnector.coinType.ETHEREUM
          let address_res = await DcentWebConnector.getAddress(coinType, accounts[0].address_path)
          const address = address_res?.body?.parameter?.address

          // this.$q.loading.hide()

          // console.log("walletadderss     ......>>>>>   ", address)

          sessionStorage.setItem('WALLETADDRESS', address)
          sessionStorage.setItem('WALLETADDRESSKEY', accounts[0].address_path)
          sessionStorage.setItem('WALLETTYPE', 'dcent')
          this.$store.dispatch('setWalletAddress', address)
          this.$store.dispatch('setWalletType', 'dcent')
          localStorage.setItem('WALLETADDRESS', address)
          localStorage.setItem('WALLETTYPE', 'dcent')

          // ■■■ 회원정보 체크, 존재하지 않으면 insert 있으면 select
          try {
            this.checkAndRegisterUser(address)
          } catch (e) {
            console.log(e)
          }
          // ■■■ 지갑 주소로 NFT 리스트 조회
          try {
            this.getNftList()
          } catch (e) {
            console.log(e)
          }

        } catch (error) {
          this.$noti(this.$q, '지갑 연결 상태와 브릿지를 확인해주세요.')
          console.log("Error connecting to D'CENT Wallet via dcent-web-connector:", error)
          window.open("https://bridge.dcentwallet.com/v2", "_blank")
        }
      } else {     // 모바일일 경우
        // 일단 dapp으로 열었지만 이건 브릿지를 통해 연결하는 코드라서 모바일에서는 연결이 어려움
        // 모바일은 매타마스크로 하드월렛 연결 후 진행해야 할 듯.
        //
        // this.$noti(this.$q, this.$t('MetaMask is not installed.'))
        const linkUrl = encodeURIComponent("https://punkykongz.com")   // 운영
        // const linkUrl = encodeURIComponent("http://192.168.0.7:8081/#/kor")   
        const network = 'ethereum-mainnet'
        window.location.href = `https://link.dcentwallet.com/DAppBrowser/?url=${linkUrl}&network=${network}`
      }
    },
    async signDcent(message) {
      try {
        // sessionStorage에서 WALLETADDRESSKEY 가져오기
        const key = sessionStorage.getItem('WALLETADDRESSKEY')
        if (!key) {
          console.log("WALLETADDRESSKEY가 sessionStorage에 없습니다.")
          return
        }

        // 서명 요청
        const result = await DcentWebConnector.getEthereumSignedMessage(message, key)
        if (result?.header?.status === "error") {
          console.log("D'CENT Wallet에서 오류가 발생했습니다:", result.body?.error?.message)
        } else if (result?.header?.status === "success") {
          // 서명 성공 시 데이터 추출
          const userAddress = result.body?.parameter?.address
          const signedMessage = result.body?.parameter?.sign

          // console.log("Signed Result:", result)
          // console.log("User Address:", userAddress)
          // console.log("Signed Message:", signedMessage)

          // 원하는 데이터를 반환
          return { userAddress, signedMessage }
        }
      } catch (error) {
        console.log("D'CENT Wallet 서명 중 오류 발생:", error)
      }
    },

    async connectLedgerWallet() {
      let transport
      try {
        // 선택에 따라 WebUSB 또는 WebHID 연결
        transport = await TransportWebUSB.create() // WebUSB 연결
        // transport = await TransportWebHID.create() // WebHID 연결 (선택적으로 사용)

        listen(log => console.log(log))  // 디버그용 로그 확인

        // Ledger에서 이더리움 주소 가져오기
        const appEth = new AppEth(transport)
        const result = await appEth.getAddress("44'/60'/0'/0/0")  // Ethereum 주소 가져오기 (BIP44 경로 사용)
        const address = result.address

        // 모달 닫기
        this.ledgerGuide = false

        // console.log("walletadderss     ......>>>>>   ", address)

        sessionStorage.setItem('WALLETADDRESS', address)
        sessionStorage.setItem('WALLETTYPE', 'ledger')
        this.$store.dispatch('setWalletAddress', address)
        this.$store.dispatch('setWalletType', 'ledger')
        localStorage.setItem('WALLETADDRESS', address)
        localStorage.setItem('WALLETTYPE', 'ledger')


        // 지갑에서 확인을 해야함. 큰 금액이거나 중요한 작업일 시 필요하지만 지갑의 주소만 가져올 경우 불필요하다 생각해 주석처리. 
        // Ledger 장치에서 확인 요청 (verify true 설정)
        // await appEth.getAddress("44'/60'/0'/0/0", { verify: true })

        // ■■■ 회원정보 체크, 존재하지 않으면 insert 있으면 select
        try {
          this.checkAndRegisterUser(address)
        } catch (e) {
          console.log(e)
        }
        // ■■■ 지갑 주소로 NFT 리스트 조회
        try {
          this.getNftList()
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        this.errorMessage = e.message || String(e)
        this.message = "Failed to connect to Ledger."
        console.error("Error:", e)
      } finally {
        if (transport) {
          await transport.close()
        }
      }
    },
    async signLedger(message) {
      try {
        // Step 1: Connect to the Ledger device via USB
        const transport = await TransportWebUSB.create()
        const eth = new Eth(transport)

        // Step 2: Display the Ethereum address on the Ledger device for verification
        const { address } = await eth.getAddress("44'/60'/0'/0/0", true)
        // console.log("Ledger Address: ", address)

        // Step 3: Sign the message using the Ledger
        const signature = await eth.signPersonalMessage(
          "44'/60'/0'/0/0", // Ethereum account derivation path
          Buffer.from(message).toString("hex")
        )

        // Step 4: Construct the signed message in the correct format
        const signedMessage = `0x${signature.r}${signature.s}${(signature.v).toString(16)}`
        
        // console.log("address  ==  ", address)
        // console.log("signedMessage  ==  ", signedMessage)
        // Step 5: Return the user address and signed message
        return { userAddress: address, signedMessage }
      } catch (error) {
        console.log("Error signing message with Ledger: ", error)

        // Notify the user of error
        this.$q.notify({
          color: "negative",
          message: `Error signing message with Ledger: ${error.message}`
        })
      }
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
