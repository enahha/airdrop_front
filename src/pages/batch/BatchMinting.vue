<template>
  <!-- <q-page class="q-pa-md" style="background-color: #8D57F5; background-image: images/list_bg.jpg;"> -->
  <q-page class="q-pa-md" style="background-color: #000000;">
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-md">
    </div>
    <!-- <q-separator />
    <div class="row justify-center page-tit">
      <div class="doc-heading doc-h2 text-black">
        Airdrop - Punky Kongz
      </div>
    </div>
    <q-separator /> -->
    <div class="row justify-center page-tit">
      <q-img src="images/visual_title_short.png" width="600px" />
    </div>

    <div class="row justify-center">

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- 관리자 로그인 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <div v-if="!isAdmin" style="display: flex; justify-content: center; align-items: center;">
        <div class="row justify-center q-pa-xl" style="width: 20%;">
          <table border="0" width="100%" align="center">
            <tr>
              <td colspan="3" style="padding: 5px 0px !important;">
                <div class="col-12">
                  <input v-model="id" hide-bottom-space standout placeholder="ID" style="height: 56px; padding: 0px 10px;" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3" style="padding: 5px 0px !important;">
                <div class="col-12">
                  <input v-model="pwd" hide-bottom-space standout type="password" placeholder="PASSWORD" style="height: 56px; padding: 0px 10px;"/>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-center" style="padding: 5px 0px !important;">
                <q-btn class="btn-purple" text-color="black" style="width: 100%; height: 80px; min-width: 26px;" @click="doLoginAdmin">
                  <table border="0" width="100%" align="center">
                    <tr>
                      <td style="padding: 0px 0px !important;">
                        <b>{{ $t('login') }}</b>
                      </td>
                    </tr>
                  </table>
                </q-btn>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- 민팅 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <div v-if="isAdmin">
        <!-- <q-btn class="q-ml-lg" @click="goBack" label="Go Back" color="grey" no-caps /> -->

        <!-- 상단 버튼 신규 -->
        <div class="row justify-center text-white q-pt-lg">
          <table>
            <tr>
              <td>
                <q-btn @click="confirmMinting" :loading="loading" class="btn-purple" no-caps style="padding: 0px 10px; height: 80px; width: 200px;" tabindex="2">
                  <q-img src="images/airdrop.png" width="200px" />
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Processing...
                  </template>
                </q-btn>
              </td>
            </tr>
            <tr>
              <!-- <td><input v-model="orderQuantity" placeholder="Quantity" style="padding: 0px 10px; height: 40px; width: 200px;" tabindex="1" /></td> -->
              <!-- <td>{{ totalCompletedCount }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ airdropLogList.length }}</td> -->
              <td>{{ totalCompletedCount }}&nbsp;&nbsp;/&nbsp;&nbsp;5000</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
        </div>

        <!-- 상단 버튼 -->
        <!-- <div class="row justify-center text-white q-pt-lg">
          <table>
            <tr>
              <td><input v-model="orderQuantity" placeholder="Quantity" style="padding: 0px 10px; height: 40px; width: 200px;" tabindex="1" /></td>
            </tr>
            <tr>
              <td>
                <q-btn @click="batchMinting" :loading="loading" class="btn-purple" no-caps style="padding: 0px 10px; height: 80px; width: 200px;" tabindex="2">
                  <q-img src="images/airdrop.png" width="200px" />
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Processing...
                  </template>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
        </div> -->



        <div class="row q-pt-lg">
          <!-- <div class="col-12 text-left text-white row">
            <label for="orderLimit" style="margin-right: 10px;">Order Limit:</label>
            <input v-model="orderLimit" placeholder="Enter Order Limit" type="number" style="padding: 0px 10px;"/>
            &nbsp;&nbsp;&nbsp;
            <label for="orderQuantity" style="margin-right: 10px;">Order Quantity:</label>
            <input v-model="orderQuantity" placeholder="Enter Order Quantity"  type="number" style="padding: 0px 10px;"/>
            &nbsp;&nbsp;&nbsp;
            <q-btn @click="batchMinting500" label="Mint" color="red" no-caps />
            &nbsp;&nbsp;&nbsp;
            <q-btn @click="batchMinting" label="Mint Selected" color="primary" no-caps />
          </div> -->
          <!-- <div class="col-3 text-left">
            <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 200px;" @click="insertairdropLogList" no-caps rounded>
              <b>1. Get Payment List</b>
            </q-btn>
          </div> -->
          <div class="col-12 text-right">
            <!-- ※ 민팅 완료인 건을 제외한 나머지 건만 민팅됩니다. -->
            <!-- &nbsp;&nbsp;&nbsp;
            <q-btn @click="exportTable" label="&nbsp;&nbsp;&nbsp;Download CSV" icon="download" color="primary" size="md" no-caps /> -->
          </div>
        </div>

        <q-pull-to-refresh @refresh="refresher" class="project-list">
          <!-- <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll"> -->

            <!-- 데이터 테이블 -->
            <table border="0" width="100%" style="margin: 0px 0px 0px 0px; max-width: 1200px;" cellpadding="0" cellspacing="0" class="text-white">
              <thead>
                <tr>
                  <!-- <th><input type="checkbox" v-model="selectedAll" @change="chechAll"></th> -->
                  <!-- <th>SEQ</th> -->
                  <th>#</th> <!-- 순번 추가 -->
                  <th>MetaKongz Name</th>
                  <!-- <th>MetaKongz ID</th> -->
                  <!-- <th>ETH WALLET ADDRESS</th> -->
                  <!-- <th>WALLET TYPE</th> -->
                  <th>Solana Wallet Address</th>
                  <th>Status</th>
                  <th>Punky Kongz ID</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in airdropLogList" :key="index">
                  <!-- <td><input type="checkbox" v-model="item.selected" @change="checkOne"></td> -->
                  <!-- <td>{{ item.seq }}</td> -->
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.old_nft_name }}</td>
                  <!-- <td>{{ item.old_nft_id }}</td> -->
                  <!-- <td>{{ item.old_wallet_address }}</td> -->
                  <!-- <td>{{ item.old_wallet_type }}</td> -->
                  <td>{{ item.new_wallet_address }}</td>
                  <td>{{ item.statusLabel }}</td>
                  <td>{{ item.new_nft_id }}</td>
                  <td>{{ item.reg_time }}</td>
                </tr>
              </tbody>
            </table>
            <br />
          
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          <!-- </q-infinite-scroll> -->
        </q-pull-to-refresh>

        <div v-if="noDataFlag" class="row justify-center q-pt-lg">
          <img src="images/sorry-no-data.png" style="width: 35%; max-width: 250px;" />
        </div>

        <!-- 하단 버튼 -->
        <div class="row q-pt-lg">
          <div class="col-6 text-left">
            <!-- <q-btn @click="goBack" label="Go Back" color="grey" no-caps /> -->
          </div>
          <div class="col-6 text-right">
            <!-- <q-btn @click="batchMinting" label="2. Mint (Selected)" color="primary" no-caps /> -->
          </div>
        </div>

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl">
        </div>
      </div>
    </div>
  </q-page>

  <!-- 렛저 pc 안내 -->
  <q-dialog v-model="mintAdmin">
    <q-card style="width: 900px !important; height: auto; max-width: 850px !important">
      <div class="modal-1 fade-1 inner" id="wallet_confirm">
        <div class="modal-dialog-1 modal-dialog-centered-1">
        <div class="modal-content-1">
          <div class="modal_body" style="background-color: white!important;;">
            <p class="icons"><i class="xi-warning"></i></p>
            <div style="word-break:keep-all;">
              <h4 style="color: black !important;">현재 민팅된 NFT제외 남은 수량 모두 물량지갑으로 민팅하시겠습니까?<br /></h4>
              <p style="color: red; text-align: center; padding: 10px;">*완료시까지 창을 닫지 말아주세요.<br /></p>
              <h4 style="color: black !important;">남은 수량: {{ remainQuntity }}<br /></h4>
            </div>
            <div class="apply_btn mt40 row">
              <button @click="mintAdmin = false" :disabled="loadingAdmin" class="btn btn-holder s" data-dismiss="modal">취소</button>
              <q-btn @click="doMintingAdmin()" :loading="loadingAdmin" class="btn btn-holder s" data-dismiss="modal">확인
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Processing...
                </template>
              </q-btn>
            </div>
          </div>
        </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="confirmMint">
    <q-card class="bg-white" style="width: 200px;">
      <q-card-section class="row items-center" style="">
        <q-icon name="info" color="red" size="md" />
        <!-- <span class="q-ml-sm text-black">{{ orderQuantity }} Punky Kongz?</span> -->
        <span class="q-ml-sm text-black">Go?</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn style="width: 45%;" label="No" color="grey" v-close-popup />
        <q-btn style="width: 45%;" label="Yes" color="red" v-close-popup @click="prepareMinting" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue'
import { QSpinnerGears, QSpinnerFacebook } from 'quasar'
import { exportFile } from 'quasar'
import { ethers } from 'ethers'
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import bs58 from 'bs58';

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, keypairIdentity, percentAmount, TransactionBuilder, none } from "@metaplex-foundation/umi";
import { setComputeUnitLimit, setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox';
import { createNft, mplTokenMetadata, fetchDigitalAsset, collectionAuthorityRecordPda, verifyCollectionV1, findMetadataPda  } from "@metaplex-foundation/mpl-token-metadata";
import { createTree, mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction, findLeafAssetIdPda, getAssetWithProof, verifyCollection, setAndVerifyCollection, mintV1, irysUploader } from '@metaplex-foundation/mpl-bubblegum'


export default defineComponent({
  name: 'Registration',
  data () {
    return {
      loading: false,
      loadingAdmin: false,
      mintAdmin: false,
      confirmMint: false,
      projectSeq: '1',
      nftType: 'punkykongz',
      remainQuntity: 0,
      symbol: '',
      payerSecretKey: '',
      sellerFeeBasisPoint: 0,
      collectionMint: '',
      mintAmount: 1, // 일단 지금은 1개로 고정
      airdropLogList: [],
      selectedAll: false,
      nftId: '',
      walletType: 'phantom',
      refresherDone: '',
      pageSize: 10000,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false,
      keyword: '', // 검색키워드

      orderQuantity: '',
      orderLimit: '',
      isLogin: true,
      // id: 'star', // test 서버
      // pwd: '0000',
      // id: '0x8469A5FBe9ae404A01b8Ede8fD99825A23849FFD', // 운영 서버
      // pwd: 'snowseed123!',
      id: '',
      pwd: '',
      totalCompletedCount: 0, // 에어드랍 총 완료 갯수
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    selectedItems () {
      return this.paymentList.filter(item => item.selected)
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
  },
  watch: {
  },
  created: function () {
    const adcd = sessionStorage.getItem('ADCD')
    if (adcd) {
      this.$store.dispatch('setAdcd', adcd)
    }

    this.selectListMax()

    // 키 벨류 조회
    this.selectKeyValue()


  },
  mounted: function () {
    this.refresher(null)
  },
  methods: {
    doLoginAdmin() {
      if (!this.id || !this.pwd) {
        this.$noti(this.$q, 'Enter uid and pwd.')
        return
      }

      const vo = {
        uid: this.id,
        pwd: this.pwd,
      }
      this.$q.loading.show() // 로딩 표시
      this.$axios.post('/api/admin/doLoginAdmin', vo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            console.log(result.data)
            // this.$noti(this.$q, this.$t('test_success'))

            // 로그인 정보 쿠키에 저장
            this.$store.dispatch('setUid', result.data.returnValue.sid)
            this.$store.dispatch('setAdcd', result.data.returnValue.adcd)
            // this.$cookie.set('UID', result.data.returnValue.sid, 365)
            // this.$cookie.set('AUTH_KEY', result.data.returnValue.auth_key, 365)
            // this.$cookie.set('ADCD', result.data.returnValue.adcd, 365)
            // localStorage.setItem('UID', result.data.returnValue.sid, 365)
            // localStorage.setItem('AUTH_KEY', result.data.returnValue.auth_key, 365)
            // localStorage.setItem('ADCD', result.data.returnValue.adcd, 365)
            sessionStorage.setItem('ADCD', result.data.returnValue.adcd)


            // 관리자 메뉴로 이동
            // this.$router.push('/admin/adminMenu')

          } else {
            // this.$noti(this.$q, this.$t('test_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.airdropLogList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      // this.$refs.infiniteScroll.reset() // index 초기화
      // this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMore(1, done)
    },
    loadMore(index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        // console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            // this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 에어드랍 로그 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/airdropLog/selectAirdropLogListLastPageNum',
        {params: {pageSize: this.pageSize, keyword: this.keyword}}) //10 (처리중)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 에어드랍 로그 리스트 조회
    async selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }

      const result = await this.$axios.get('/api/airdropLog/selectAirdropLogList', {params: {pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}}) //10 (처리중)
      // console.log(JSON.stringify(result.data))
      // console.log(result.data)
      if (idx === 1) { // 첫번째 load인 경우
        this.airdropLogList = [] // 리스트 초기화
      }

      const Logs = result.data.map(item => {
        // status가 10이면 WAIT 상태로 표시
        if (item.status == 0) {
          return { ...item, statusLabel: 'WAIT' }
        } else if (item.status == 10) {
          return { ...item, statusLabel: 'PROCESSING' }
        } else if (item.status == 20) {
          return { ...item, statusLabel: 'COMPLETED' }
        } else if (item.status == 5) {
          return { ...item, statusLabel: 'FAILED' }
        }
        return item
      })

      // item.status가 20인 건수 구하기
      this.totalCompletedCount = Logs.filter(item => item.status == 20).length

      this.airdropLogList = this.airdropLogList.concat(Logs)

      // 데이터 없음 표시 설정
      if (!this.airdropLogList || this.airdropLogList.length < 1) {
        this.noDataFlag = true
      } else {
        this.noDataFlag = false
      }
      if (done) {
        done()
      }
    },
    async selectKeyValue() {
      const paramKeyValuePayerSecretKey = {
        cdKey: this.$KEY_VALUE_SOLANA_PAYER_SECRET_KEY,
      }
      const resultKeyValuePayerSecretKey = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValuePayerSecretKey }})
      // console.log(resultKeyValue.data)
      if (resultKeyValuePayerSecretKey.data) {
        this.payerSecretKey = resultKeyValuePayerSecretKey.data.returnValue
      }

      const paramKeyValueSellerFeeBasisPoint = {
        cdKey: this.$KEY_VALUE_SOLANA_SELLER_FEE_BASIS_POINT,
      }
      const resultKeyValueSellerFeeBasisPoint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSellerFeeBasisPoint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSellerFeeBasisPoint.data) {
        this.sellerFeeBasisPoint = resultKeyValueSellerFeeBasisPoint.data.returnValue
      }

      const paramKeyValueCollectionMint = {
        cdKey: this.$KEY_VALUE_SOLANA_COLLECTION_MINT,
      }
      const resultKeyValueCollectionMint = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueCollectionMint }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueCollectionMint.data) {
        this.collectionMint = resultKeyValueCollectionMint.data.returnValue
      }

      const paramKeyValueSymbol = {
        cdKey: this.$KEY_VALUE_SOLANA_SYMBOL,
      }
      const resultKeyValueSymbol = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueSymbol }})
      // console.log(resultKeyValue.data)
      if (resultKeyValueSymbol.data) {
        this.symbol = resultKeyValueSymbol.data.returnValue
      }
    },
    // 전체 체크 클릭시
    chechAll() {
      // console.log('this is checkAll')
      // 체크되었을 경우 전체 체크, 아니면 전체 해제
      let checked = false
      if (this.selectedAll) {
        checked = true
      }
      for (let i = 0; i < this.airdropLogList.length; i++) {
        let airdropLogObj = this.airdropLogList[i];
        airdropLogObj.selected = checked
      }
    },
    // 개별 체크 클릭시
    checkOne() {
      // 체크된 갯수가 리스트 length와 같으면 전체선택 체크, 아니면 해제
      let checkedCount = 0
      let uncheckedCount = 0
      for (let i = 0; i < this.airdropLogList.length; i++) {
        const airdropLogObj = this.airdropLogList[i];
        if (airdropLogObj.selected) {
          checkedCount++
        } else {
          uncheckedCount++
        }
      }
      // 체크된 갯수와 리스트 length 비교
      if (checkedCount == this.airdropLogList.length) {
        this.selectedAll = true
      } else {
        this.selectedAll = false
      }
      // console.log('this.airdropLogList.length: ' + this.airdropLogList.length + ' , checkedCount:' + checkedCount + ' , uncheckedCount:' + uncheckedCount)
    },
    // 에어드랍 준비작업
    // 1. airdrop_log 테이블에(5000 - airdrop_log 테이블에 행 갯수 = ?)개의 새 데이터를 물량지갑 주소로 5000개 채움
	  // 2. airdrop_log 테이블에 NFT ID를 랜덤으로 배정함
	  // 3. airdrop_log 테이블 데이터를 반환함
    async prepareMinting() {
      console.log('prepareMinting Start')
      this.loading = true

      if(this.airdropLogList[0].new_nft_id == null) {
        // 1. airdrop_log 채우기
        // alert(this.$PUNKYKONGZ_TOTAL_SUPPLY)
        const paramFillAirdropLog = {
          numberOfAirdrop: this.$PUNKYKONGZ_TOTAL_SUPPLY, // 최대공급량(민팅갯수)
        }
        await this.$axios.get('/api/airdrop/fillAirdropLog', { params: { ...paramFillAirdropLog }})
  
        // 리스트 재조회
        await this.selectList(1, null)
  
        // 2. NFT ID 배정
        const paramSetNewNftId = {
          numberOfAirdrop: this.$PUNKYKONGZ_TOTAL_SUPPLY, // 최대공급량(민팅갯수)
        }
        await this.$axios.get('/api/airdrop/setNewNftId', { params: { ...paramSetNewNftId }})
      }

      // NFT 발행
      this.batchMintingNew()
    },
    async batchMintingNew() {
      console.log('Batch Minting Start')

      // this.$q.loading.show({
      //   spinner: QSpinnerFacebook,
      //   spinnerColor: 'purple',
      //   spinnerSize: 140,
      //   backgroundColor: 'white',
      //   message: this.$t('loading_message_minting'),
      //   messageColor: 'black'
      // })

      let mintedCount = 0 // 현재 민팅된 수량
      // this.loading = true

      try {
        // 모든 항목을 순회하며 민팅 시도
        for (let i = 0; i < this.airdropLogList.length; i++) {
          const airdropLogObj = this.airdropLogList[i]

          // 선택된 항목이면서 'WAIT' 또는 'FAILED' 상태인 경우만 민팅 시도
          // if (airdropLogObj.selected && (airdropLogObj.statusLabel === 'WAIT' || airdropLogObj.statusLabel === 'FAILED')) {
          if (airdropLogObj.statusLabel === 'WAIT' || airdropLogObj.statusLabel === 'FAILED') {
            console.log('Selected data index:', i, ', SEQ:', airdropLogObj.seq)
            console.log('Airdrop Log Object:', airdropLogObj)

            let result = false
            try {
              // 민팅 시도
              result = await this.doMinting(airdropLogObj)
              console.log('Mint result:', result)

              // 성공 시 new_nft_id 업데이트 및 상태 변경
              const index = this.airdropLogList.findIndex(item => item.seq === airdropLogObj.seq)
              if (result) {
                if (index !== -1) {
                  // 기존 객체를 참조한 상태에서 속성만 변경
                  this.airdropLogList[index].statusLabel = 'COMPLETED'
                  this.airdropLogList[index].new_nft_id = result
                }
                // airdropLogObj.new_nft_id = result
                // airdropLogObj.statusLabel = 'COMPLETED'
                mintedCount++

                this.totalCompletedCount++ // 총 민팅 갯수 증가
              } else {
                // airdropLogObj.statusLabel = 'FAILED'
                if (index !== -1) {
                  // 기존 객체를 참조한 상태에서 속성만 변경
                  this.airdropLogList[index].statusLabel = 'FAILED'
                }
              }
            } catch (error) {
              console.error('Error during minting:', error)
              airdropLogObj.statusLabel = 'FAILED'
            }
          }
        }
        this.loading = false
        
        // 모든 민팅 작업이 완료된 후 처리
        // this.$q.loading.hide()

        // `statusLabel`이 'COMPLETED'와'PROCESSING'인 항목의 수를 계산
        // const completedCount = this.airdropLogList.filter(item => item.statusLabel === 'COMPLETED' || item.statusLabel === 'PROCESSING').length

        // nft_info 테이블에서 남아있는 항목들 개수
        const paramNftInfoRemainCount = {
          projectSeq: this.projectSeq,
        }
        const resultNftInfoRemainCount = await this.$axios.get('/api/nftinfo/selectNftInfoRemainCount', { params: { ...paramNftInfoRemainCount }})
        console.log(resultNftInfoRemainCount.data)

        const completedCount = resultNftInfoRemainCount.data

        // 사용자 민팅이 완료된 후 시스템 물량지갑으로 민팅 시도
        if (completedCount < this.$PUNKYKONGZ_TOTAL_SUPPLY) {
          console.log("PUNKYKONGZ_TOTAL_SUPPLY >>  ", this.$PUNKYKONGZ_TOTAL_SUPPLY)
          console.log("completedCount >>  ", completedCount)
          this.remainQuntity = this.$PUNKYKONGZ_TOTAL_SUPPLY - completedCount 
          this.mintAdmin = true
        } else {
          console.log(`All minting completed. Total minted: ${mintedCount}`)
          this.mintAdmin = false
        }

        // 처리 완료 메시지 표시
        this.$noti(this.$q, this.$t('process_success'))

      } catch (e) {
        console.error(e)
        this.loading = false
        // this.$q.loading.hide()
        this.$noti(this.$q, this.$t('process_failed') + ': ' + e)
      }

      // 리스트 새로고침
      this.refresher()

      // 전체 선택 해제
      this.selectedAll = false
    },
    async batchMinting() {
      alert('not this!!!')
      return

      console.log('Batch Minting Start')
      // this.$q.loading.show({
      //   spinner: QSpinnerFacebook,
      //   spinnerColor: 'purple',
      //   spinnerSize: 140,
      //   backgroundColor: 'white',
      //   message: this.$t('loading_message_minting'),
      //   messageColor: 'black'
      // })

      let mintedCount = 0 // 현재 민팅된 수량
      this.loading = true

      try {
        // 모든 항목을 순회하며 민팅 시도
        for (let i = 0; i < this.airdropLogList.length; i++) {
          const airdropLogObj = this.airdropLogList[i]

          // 선택된 항목이면서 'WAIT' 또는 'FAILED' 상태인 경우만 민팅 시도
          // if (airdropLogObj.selected && (airdropLogObj.statusLabel === 'WAIT' || airdropLogObj.statusLabel === 'FAILED')) {
          if (airdropLogObj.statusLabel === 'WAIT' || airdropLogObj.statusLabel === 'FAILED') {
            console.log('Selected data index:', i, ', SEQ:', airdropLogObj.seq)
            console.log('Airdrop Log Object:', airdropLogObj)

            let result = false
            try {
              // 민팅 시도
              result = await this.doMinting(airdropLogObj)
              console.log('Mint result:', result)

              // 성공 시 new_nft_id 업데이트 및 상태 변경
              const index = this.airdropLogList.findIndex(item => item.seq === airdropLogObj.seq)
              if (result) {
                if (index !== -1) {
                  // 기존 객체를 참조한 상태에서 속성만 변경
                  this.airdropLogList[index].statusLabel = 'COMPLETED'
                  this.airdropLogList[index].new_nft_id = result
                }
                // airdropLogObj.new_nft_id = result
                // airdropLogObj.statusLabel = 'COMPLETED'
                mintedCount++
              } else {
                // airdropLogObj.statusLabel = 'FAILED'
                if (index !== -1) {
                  // 기존 객체를 참조한 상태에서 속성만 변경
                  this.airdropLogList[index].statusLabel = 'FAILED'
                }
              }
            } catch (error) {
              console.error('Error during minting:', error)
              airdropLogObj.statusLabel = 'FAILED'
            }
          }
        }
        this.loading = false
        
        // 모든 민팅 작업이 완료된 후 처리
        // this.$q.loading.hide()

        // `statusLabel`이 'COMPLETED'와'PROCESSING'인 항목의 수를 계산
        // const completedCount = this.airdropLogList.filter(item => item.statusLabel === 'COMPLETED' || item.statusLabel === 'PROCESSING').length

        // nft_info 테이블에서 남아있는 항목들 개수
        const paramNftInfoRemainCount = {
          projectSeq: this.projectSeq,
        }
        const resultNftInfoRemainCount = await this.$axios.get('/api/nftinfo/selectNftInfoRemainCount', { params: { ...paramNftInfoRemainCount }})
        console.log(resultNftInfoRemainCount.data)

        const completedCount = resultNftInfoRemainCount.data

        // 사용자 민팅이 완료된 후 시스템 물량지갑으로 민팅 시도
        if (completedCount < this.$PUNKYKONGZ_TOTAL_SUPPLY) {
          console.log("PUNKYKONGZ_TOTAL_SUPPLY >>  ", this.$PUNKYKONGZ_TOTAL_SUPPLY)
          console.log("completedCount >>  ", completedCount)
          this.remainQuntity = this.$PUNKYKONGZ_TOTAL_SUPPLY - completedCount 
          this.mintAdmin = true
        } else {
          console.log(`All minting completed. Total minted: ${mintedCount}`)
          this.mintAdmin = false
        }

        // 처리 완료 메시지 표시
        this.$noti(this.$q, this.$t('process_success'))

      } catch (e) {
        console.error(e)
        this.loading = false
        // this.$q.loading.hide()
        this.$noti(this.$q, this.$t('process_failed') + ': ' + e)
      }

      // 리스트 새로고침
      this.refresher()

      // 전체 선택 해제
      this.selectedAll = false
    },
    confirmMinting() {
      // // 숫자 체크
      // if (typeof Number(this.orderQuantity) === 'number' && Number(this.orderQuantity) > 0) {
      //   this.confirmMint = true
      // } else {
      //   // this.$noti(this.$q, 'typeof this.orderQuantity: ' + typeof this.orderQuantity)
      //   this.$noti(this.$q, 'Please check the quantity.')
      // }
      this.confirmMint = true
    },
    // // 원하는 수량만큼 mint
    // async batchMinting500() {
    //   console.log('batchMinting start top ' + this.orderQuantity)
    //   // this.$q.loading.show({
    //   //   spinner: QSpinnerFacebook,
    //   //   spinnerColor: 'purple',
    //   //   spinnerSize: 140,
    //   //   backgroundColor: 'white',
    //   //   message: this.$t('loading_message_minting'),
    //   //   messageColor: 'black'
    //   // })
    //   this.loading = true

    //   let mintedCount = 0 // 현재 민팅된 수량

    //   try {
    //     // `WAIT` 또는 `FAILED` 상태인 항목만 필터링
    //     const pendingItems = this.airdropLogList.filter(
    //       (item) => item.statusLabel === 'WAIT' || item.statusLabel === 'FAILED'
    //     )

    //     // 필터링된 목록에서 `orderQuantity` 만큼만 민팅
    //     const itemsToMint = pendingItems.slice(0, this.orderQuantity)

    //     for (let i = 0; i < itemsToMint.length; i++) {
    //       const airdropLogObj = itemsToMint[i]
    //       console.log('Selected data index: ' + i + ', SEQ: ' + airdropLogObj.seq)
    //       console.log('Airdrop Log Object:', airdropLogObj)

    //       let result = false
    //       try {
    //         // 민팅 시도
    //         result = await this.doMinting(airdropLogObj)
    //         console.log('Mint result ' + i + ': ' + result)

    //         airdropLogObj.new_nft_id = result
    //       } catch (error) {
    //         console.error(error)
    //       }

    //       // STATUS 임시 설정 (처리 완료 후 airdropLogList는 refresh 됨)
    //       airdropLogObj.statusLabel = result ? 'COMPLETED' : 'FAILED'

    //       // 목표 수량에 도달하면 종료
    //       if (mintedCount >= this.$PUNKYKONGZ_TOTAL_SUPPLY) {
    //         console.log('Minting goal reached:', mintedCount)
    //         break
    //       }
    //     }

    //     this.loading = false
    //     // this.$q.loading.hide()

    //     // 처리 완료 메시지 표시
    //     this.$noti(this.$q, this.$t('process_success'))

    //     // `statusLabel`이 'COMPLETED'인 항목의 수를 계산
    //     const completedCount = this.airdropLogList.filter(item => item.statusLabel === 'COMPLETED').length

    //     // // 잔존 수량 물량 지갑으로 추가 민팅 시도
    //     // if (completedCount < this.$PUNKYKONGZ_TOTAL_SUPPLY) {
    //     //   this.remainQuntity = this.$PUNKYKONGZ_TOTAL_SUPPLY - completedCount
    //     //   this.mintAdmin = true
    //     // }
    //   } catch (e) {
    //     console.error(e)
    //     this.$q.loading.hide()
    //     this.$noti(this.$q, this.$t('process_failed') + ': ' + e)
    //     return
    //   }
    //   // 처리 종료 후 리스트 refresh
    //   this.refresher()

    //   // 전체 선택 해제
    //   this.selectedAll = false
    // },
    // ❏❏❏❏❏❏❏❏❏❏  민팅 처리 (사용자)  ❏❏❏❏❏❏❏❏❏❏ 
    async doMinting(airdropLogObj) {
      console.log('doMinting start')
      console.log(airdropLogObj)

      /////////////////////////////////////////////////////////////////
      // 1. minting_log 테이블 insert
      /////////////////////////////////////////////////////////////////
      const paramMintingLog = {
        project_seq: this.projectSeq,
        wallet_address: airdropLogObj.new_wallet_address,
        wallet_type: this.walletType,
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
      const resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfoRamdonSeq', { params: { ...paramNftInfo }})
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
      console.log('resultNftInfoUpdateStatus : ')
      console.log(resultUpdateStatus.data)

      // airdrop_log 테이블에 해당 data의 status를 처리중(10)으로 수정
      const paramAirdropLogStatusProcessing = {
        seq: airdropLogObj.seq,
        new_nft_id: nftId,
        status: this.$NFT_STATUS_MINT_PROCESSING, // "10"
        mod_id: airdropLogObj.old_wallet_address,
      }
      const resultAirdropLogStatusProcessing = await this.$axios.post('/api/airdropLog/updateAirdropLogStatusAndNewNftId', paramAirdropLogStatusProcessing)
      // console.log(resultMintingLogUpdate.data)
      // 임시로 객체 속성값 PROCESSING으로 변경
      const index = this.airdropLogList.findIndex(item => item.seq === airdropLogObj.seq)
      if (index !== -1) {
        this.airdropLogList.splice(index, 1, { ...airdropLogObj, statusLabel: 'PROCESSING' })
      }

      console.log('resultAirdropLogUpdateStatus : ')
      console.log(resultAirdropLogStatusProcessing.data)

      console.log("==================================================== 5")

      /////////////////////////////////////////////////////////////////////////////////////////////
      // 5. New NFT 발행 처리
      /////////////////////////////////////////////////////////////////////////////////////////////     
      let newMintingLogVo = null
      try {
        newMintingLogVo = await this.mintSolanaNftBubblegum(airdropLogObj.seq
                                                        , nftInfoVo.nft_name
                                                        , this.symbol
                                                        , nftInfoVo.json_file_url
                                                        , airdropLogObj.new_wallet_address)
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
        create_nft_signature: newMintingLogVo.create_nft_signature,
        // verify_collection_signature: newMintingLogVo.verify_collection_signature,
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
      if (!resultAirdropLogUpdate || !resultAirdropLogUpdate.data) {
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

      return nftId
    },
    // ❏❏❏❏❏❏❏❏❏❏  민팅 처리 (물량지갑)  ❏❏❏❏❏❏❏❏❏❏ 
    async doMintingAdmin() {
      let remaining = this.remainQuntity
      this.loadingAdmin = true
      for (let i = 0; i < remaining; i++) {
        console.log('doMintingAdmin start')
        /////////////////////////////////////////////////////////////////
        // 1. minting_log 테이블 insert
        /////////////////////////////////////////////////////////////////
        const paramMintingLog = {
          project_seq: this.projectSeq,
          wallet_address: this.$ADMIN_SUPPLY_WALLET,
          wallet_type: this.walletType,
          nft_type: this.nftType,
          currency_symbol: '',
          reg_id: "SYSTEM",
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
        const resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfoRamdonSeq', { params: { ...paramNftInfo }})
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
          mod_id: "SYSTEM",
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
          newMintingLogVo = await this.mintSolanaNftBubblegum("SYSTEM"
                                                          , nftInfoVo.nft_name
                                                          , this.symbol
                                                          , nftInfoVo.json_file_url
                                                          , this.$ADMIN_SUPPLY_WALLET)
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
              mod_id: "SYSTEM",
            }
            resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
            console.log(resultUpdateStatus.data)
            console.log(e)
          }
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
              mod_id: "SYSTEM",
            }
            resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusFailed)
            // console.log(resultUpdateStatus.data)
            console.log(e)
          }

          return
        }

        console.log("==================================================== 8")

        /////////////////////////////////////////////////////////////////////////////////////////////
        // 6. NFT 정보, airdrop_log status 민팅완료로 update
        /////////////////////////////////////////////////////////////////////////////////////////////
        const paramNftInfoStatusCompleted = {
          seq: nftInfoVo.seq,
          status: this.$NFT_STATUS_MINT_COMPLETED, // "20"
          mod_id: "SYSTEM",
        }
        resultUpdateStatus = await this.$axios.post('/api/nftinfo/updateNftInfoStatus', paramNftInfoStatusCompleted)
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
          create_nft_signature: newMintingLogVo.create_nft_signature,
          // verify_collection_signature: newMintingLogVo.verify_collection_signature,
          // token_account_key: newMintingLogVo.token_account_key,
          // metadata_account_key: newMintingLogVo.metadata_account_key,
          // master_edition_account_key: newMintingLogVo.master_edition_account_key,
          // tx_id: newMintingLogVo.tx_id,
          mod_id: "SYSTEM",
        }
        const resultMintingLogUpdate = await this.$axios.post('/api/mintinglog/updateMintingLog', paramMintingLogUpdate)
        // console.log(resultMintingLogUpdate.data)
        if (!resultMintingLogUpdate || !resultMintingLogUpdate.data || resultMintingLogUpdate.data.returnCd != 0) {
          this.$noti(this.$q, this.$t('process_failed') + ': updateMintingLog')
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

        // 남은 수량에서 제외
        this.remainQuntity--

      }

      this.mintAdmin = false
      this.loadingAdmin = false
    },
    // mintToCollectionV1을 이용한 민팅(따로 컬렉션 검증이 필요없음)
    async mintSolanaNftBubblegum(airdropLogSeq, name, symbol, uri, ownerAddress) {
      try {
        let bubblegumTreeAddress = null
        const paramKeyValueBubblegumTreeAddress = {
          cdKey: this.$KEY_VALUE_BUBBLEGUM_TREE_ADDRESS,
        }
        const resultKeyValueBubblegumTreeAddress = await this.$axios.get('/api/common/selectKeyValue', { params: { ...paramKeyValueBubblegumTreeAddress }})
        // console.log(resultKeyValue.data)
        if (resultKeyValueBubblegumTreeAddress.data) {
          bubblegumTreeAddress = resultKeyValueBubblegumTreeAddress.data.returnValue
        }

        console.log("bubblegumTreeAddress")
        console.log(bubblegumTreeAddress)

        console.log("■■■■■■■ mintSolanaCNFT Test ■■■■■■■ START")

        const collectionMint = new PublicKey(this.collectionMint)
        const umi = createUmi(this.$SOLANA_NETWORK)
        .use(mplTokenMetadata())
        // .use(
        //   irysUploader({
        //   // mainnet address: "https://node1.irys.xyz"
        //   // devnet address: "https://devnet.irys.xyz"
        //   address: 'https://devnet.irys.xyz',
        // })
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey))
        umi.use(keypairIdentity(payer))
        console.log("leafOwner:", ownerAddress)
        console.log("Payer account:", payer.publicKey)


        const leafOwner = new PublicKey(ownerAddress)
        const merkleTree = new PublicKey(bubblegumTreeAddress)

        console.log("Start Minting CNFT to Collection ...")

        // 트랜잭션 빌더 생성 및 컴퓨팅 리소스 설정 추가
        const transactionBuilder = new TransactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 400_000 })) // 컴퓨팅 유닛 한도 설정
          .add(setComputeUnitPrice(umi, { microLamports: 1 })) // 우선순위 높이기 위해 수수료 설정

        // CNFT 민팅 트랜잭션 추가
        const { signature } = await transactionBuilder
          .add(
            mintToCollectionV1(umi, {
              leafOwner,
              merkleTree,
              collectionMint,
              collectionAuthority: payer.publicKey,
              metadata: {
                name: name,
                symbol: symbol,
                uri: uri,
                sellerFeeBasisPoints: this.sellerFeeBasisPoint * 100,   // 750=> 7.5%
                collection: {
                  key: collectionMint,
                  verified: false,
                },
                creators: [
                  {
                    address: payer.publicKey,
                    verified: true,
                    share: 100,
                  },
                ],
              },
            })
          )
          .sendAndConfirm(umi, { commitment: "finalized" })
          
        console.log("Minted CNFT Transaction Signature:", bs58.encode(signature))
        
        if(airdropLogSeq != 'SYSTEM') {
          /////////////// air drop log 시그니처 업데이트 ///////////////
          const paramAirDropLogSignature = {
            seq: airdropLogSeq,
            new_mint_signature: bs58.encode(signature),
            mod_id: ownerAddress,
          }
          const resultAirDropLogSignature = await this.$axios.post('/api/airdropLog/updateAirdropLogSignature', paramAirDropLogSignature)
          // console.log(resultAirDropLogSignature.data)
          if (!resultAirDropLogSignature || !resultAirDropLogSignature.data || resultAirDropLogSignature.data.returnCd != 0) {
            this.$noti(this.$q, this.$t('process_failed') + ': updateAirdropLogSignature')
            // 환불 처리 - 민팅은 정상처리 되었으므로 환불 X
            // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
            // return
          }
        }

        // 트랜잭션에서 Leaf 데이터 추출
        // CNFT의 Asset ID 가져오기
        const leaf = await this.parseLeafWithRetries(umi, signature)
        const assetId = leaf.id
        console.log('CNFT Asset ID >>>>> ', assetId)

        if(leaf) {

        }
        
        // console.log("Start Verify Collection")
        // const assetIdPubley = new PublicKey(assetId)

        // // 메타데이터 PDA 찾기
        // const metadataPda = findMetadataPda(umi, {
        //   mint: assetIdPubley
        // })
        // console.log("Metadata PDA:", metadataPda)
        
        // // 컬렉션 검증
        // const { signature: verifySignature } = await verifyCollectionV1(umi, {
        //   metadataPda,
        //   collectionMint,
        //   authority: payer.publicKey,
        // }).sendAndConfirm(umi, { commitment: "finalized" })

        // console.log(
        //   "NFT Verify Collection Signature : ",
        //   bs58.encode(verifySignature)
        // )
        // console.log("End Verify Collection")

        console.log("■■■■■■■ CNFT Minting Completed ■■■■■■■ END")
        return {
          mint_account_key: assetId,
          create_nft_signature: bs58.encode(signature),
        }
      } catch (error) {
        console.error("Error minting CNFT:", error)
      }
    },
    async parseLeafWithRetries(umi, signature, retries = 100, delay = 2000) {
      for (let attempt = 0; attempt < retries; attempt++) {
        try {
          const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature);
          if (leaf) {
            return leaf;
          }
        } catch (error) {
          console.warn(`Attempt ${attempt + 1} failed:`, error);
        }
        await new Promise(resolve => setTimeout(resolve, delay)); // 대기 후 재시도
      }
      throw new Error("Failed to parse leaf after multiple attempts");
    },
    async mintSolanaNftTest(name, symbol, uri, ownerAddress) {
      try {
        console.log("■■■■■■■ mintSolanaNft Test ■■■■■■■ START")
        const collectionKey = new PublicKey(this.collectionMint)
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey))
        umi.use(keypairIdentity(payer))
        const tokenOwner = new PublicKey(ownerAddress)
        const sellerFeeBasisPoints = parseFloat(this.sellerFeeBasisPoint)

        const mint = generateSigner(umi)
        // console.log("NFT mint account : ", mint.publicKey)
        // console.log("Payer account : ", payer.publicKey)

        console.log("Parameters and Variables:", {
          collectionMint: this.collectionMint,
          collectionKey: collectionKey.toString(),
          umiNetwork: this.$SOLANA_NETWORK,
          payerSecretKey: this.payerSecretKey, // 보안을 위해 실제 배포 시 비밀키는 로그로 찍지 않는 것이 좋습니다.
          payerPublicKey: payer.publicKey.toString(),
          tokenOwnerAddress: ownerAddress,
          tokenOwnerPublicKey: tokenOwner.toString(),
          nftInfo: {
            name,
            symbol,
            uri,
            sellerFeeBasisPoints: sellerFeeBasisPoints,
          },
          nftMintAccount: mint.publicKey.toString(),
        });

        console.log("Start Create NFT")
        const createdNft = await createNft(umi, {
          mint,
          name: name,
          symbol: symbol,
          uri: uri,
          sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints * 0.01),
          collection: {
            verified: false,
            key: collectionKey,
          },
          creators: [
            {
              address: payer.publicKey,
              verified: true,
              share: 100,
            },
          ],
          authority: payer.publicKey,
          tokenOwner: tokenOwner,
          isCollection: false,
        }).sendAndConfirm(umi)
        console.log("End Create NFT")

        console.log("Start Verify Collection")
        const asset = await this.fetchAssetWithRetries(umi, mint.publicKey) 
        //콜렉션 검증
        const metadata = asset.metadata
        const verify = await verifyCollectionV1(umi, {
          metadata,
          collectionMint: collectionKey,
          authority: payer.publicKey,
        }).sendAndConfirm(umi)

        //컬렉션 검증 트랜잭션 상태 확인
        if (verify.result.value.err !== null) {
          throw new Error(`Verification failed with error: ${verify.result.value.err}`)
        }
        console.log(
          "NFT Verify Collection Signature : ",
          bs58.encode(verify.signature)
        )
        console.log("End Verify Collection")

        console.log("Create NFT Signature : ", bs58.encode(createdNft.signature))
        console.log("■■■■■■■ mintSolanaNft Test ■■■■■■■ END")
        return {
          verify_collection_signature: bs58.encode(verify.signature),
          mint_account_key: mint.publicKey,
          create_nft_signature: bs58.encode(createdNft.signature),
        }
      } catch (error) {
        console.error("Error minting and verifying Solana NFT:", error)
      }
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
    async mintBumiBandNFT(
      payer_key,
      json_file_url,
      wallet_address,
      contract_address,
      token_id,
    ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        returnVo = {
          ...this.$ERROR_CODE_MINTING_NFT
        }
        console.log('contractAddress : ', contract_address)
        const provider = new ethers.providers.JsonRpcProvider(this.$BSC_NETWORK)
        console.log('provider : ', provider)

        // 지갑 인스턴스 생성
        const payerWallet = new ethers.Wallet(payer_key, provider)

        // 스마트 컨트랙트 인스턴스 생성
        const nftContract = new ethers.Contract(contract_address, this.$BNB_ABI, payerWallet)
        // 민팅 트랜잭션 실행
        const mintTx = await nftContract.connect(payerWallet).mintToIndex(wallet_address, json_file_url, token_id)        

        // 트랜잭션이 확인될 때까지 대기
        const receipt = await mintTx.wait()
        console.log('receipt : ', receipt)

        // 이벤트 로그에서 토큰 ID를 가져옴
        const transferEvent = receipt.logs.find(log => {
          try {
            const parsedLog = nftContract.interface.parseLog(log);
            return parsedLog.name === 'Transfer'
          } catch (e) {
            return false
          }
        })

        if (transferEvent) {
          const parsedLog = nftContract.interface.parseLog(transferEvent)
          const tokenId = parsedLog.args.tokenId.toString()
          console.log('Transaction Hash:', mintTx.hash)
          console.log('Minted NFT to:', wallet_address)
          console.log('Minted Token ID:', tokenId)

          const returnVo = {
            returnCd: 0,
            returnVo: 'Success to NFT Minting',
            tx_id: mintTx.hash,
            mint_account_key: tokenId
          } 
          return returnVo
        } else {
          console.error('Transfer event not found');
          return {
            ...this.$ERROR_CODE_UNEXPECTED
          };
        }
      } catch (error) {
        console.error('Error during transaction:', error);
        throw error
      }
    },
    async mintMENFT(
      payer_key,
      json_file_url,
      wallet_address,
      contract_address,
    ) {
      let returnVo = {
        ...this.$ERROR_CODE_UNEXPECTED
      }
      try {
        returnVo = {
          ...this.$ERROR_CODE_MINTING_NFT
        }
        console.log('contractAddress : ', contract_address)
        const provider = new ethers.providers.JsonRpcProvider(this.$BSC_NETWORK)
        console.log('provider : ', provider)


        // 지갑 인스턴스 생성
        const payerWallet = new ethers.Wallet(payer_key, provider)

        // 스마트 컨트랙트 인스턴스 생성
        const nftContract = new ethers.Contract(contract_address, this.$BNB_ABI, payerWallet)
        // 민팅 트랜잭션 실행
        const mintTx = await nftContract.connect(payerWallet).mint(wallet_address, json_file_url)

        // 트랜잭션이 확인될 때까지 대기
        const receipt = await mintTx.wait()
        console.log('receipt : ', receipt)

        // 이벤트 로그에서 토큰 ID를 가져옴
        const transferEvent = receipt.logs.find(log => {
          try {
            const parsedLog = nftContract.interface.parseLog(log);
            return parsedLog.name === 'Transfer'
          } catch (e) {
            return false
          }
        })

        if (transferEvent) {
          const parsedLog = nftContract.interface.parseLog(transferEvent)
          const tokenId = parsedLog.args.tokenId.toString()
          console.log('Transaction Hash:', mintTx.hash)
          console.log('Minted NFT to:', wallet_address)
          console.log('Minted Token ID:', tokenId)

          const returnVo = {
            returnCd: 0,
            returnVo: 'Success to NFT Minting',
            tx_id: mintTx.hash,
            mint_account_key: tokenId
          } 
          return returnVo
        } else {
          console.error('Transfer event not found');
          return {
            ...this.$ERROR_CODE_UNEXPECTED
          };
        }
      } catch (error) {
        console.error('Error during transaction:', error);
        throw error
      }
    },
    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row) : val
      formatted = formatted === void 0 || formatted === null
        ? '' : String(formatted)
      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    },
    // 입력항목 리스트 조회
    async selectMintPlanFieldList(seq) {
      const param = {
        projectSeq: seq,
      }
      const result = await this.$axios.get('/api/mintplan/selectMintPlanFieldList', { params: { ...param } })
      return result.data
    },
    // CSV 파일로 다운로드
    async exportTable() {
      this.$q.loading.show() // 로딩 표시 시작
      try {
        let columns = [] // CSV 항목
        let rows = [] // 데이터 리스트

        // 1. 전체 리스트 데이터 조회
        const dataList = this.airdropLogList
        console.log(dataList)

        // 민트플랜 리스트 헤더
        const fieldList = [
          {name: 'seq'}
          // , {name: 'status'}
          , {name: 'solana_address'}
          , {name: 'eth_address'}
          , {name: 'wallet_type'}
          , {name: 'eth_nft_id'}
          , {name: 'eth_nft_name'}
          , {name: 'eth_nft_image'}
          , {name: 'reg_id'}
          , {name: 'reg_time'}
        ]

        // 키 리스트 - 값을 키 순서대로 설정 
        const keyList = {
          seq: ''
          // , statusLabel: ''
          , new_wallet_address: ''
          , old_wallet_address: ''
          , old_wallet_type: ''
          , old_nft_id: ''
          , old_nft_name: ''
          , old_nft_image: ''
          , reg_id: ''
          , reg_time: ''
        }

        // 2. CSV 항목 설정
        if (fieldList) {
          for (let i = 0; i < fieldList.length; i++) {
            const fieldObj = fieldList[i]
            let columnObj = {
              name: fieldObj.name,
              field: i,
              label: fieldObj.name,
            }
            columns.push(columnObj)
          }
        }

        const keys = Object.keys(keyList)
        console.log('keys')
        console.log(keys)

        // 3. 데이터 설정
        if (dataList) {
          for (let i = 0; i < dataList.length; i++) {
            const dataObj = dataList[i]
            // const keys = Object.keys(dataList)
            const dataValues = keys.map(key => dataObj[key]);
            // const fieldValuesArray = dataObj.field_values.split('|')

            console.log('dataValues')
            console.log(dataValues)

            let rowString = ''
            for (let j = 0; j < columns.length; j++) {
              if (j === 0) {
                rowString = '{'
              } else {
                rowString += ','
              }
              let colName = fieldList[j].name
              rowString += '"' + fieldList[j].name + '" : "' + dataValues[j] + '"'
              // rowString += '"' + j + '" : "' + fieldValuesArray[j] + '"'
              if (j === fieldList.length - 1) {
                rowString += '}'
              }
            }
            console.log('rowString:')
            console.log(rowString)

            const rowObj = JSON.parse(rowString)
            rows.push(rowObj)
          }
        }
        console.log('columns:')
        console.log(columns)
        console.log('rows:')
        console.log(rows)

        const dataRows = rows.map(row => {
          const dataRow = columns.map(col => row[col.name] == 'null' ? '' : row[col.name]).join(",")
          console.log(dataRow)
          return dataRow
        }).join("\n")

        // 헤더 추가
        let content = [columns.map(col => this.wrapCsvValue(col.label))] + '\n'
        console.log('content')
        console.log(content)

        // 데이터 추가
        content += dataRows

        // 4. CSV 파일 다운로드
        const status = exportFile (
          'airdrop_apply_list.csv',
          content,
          'text/csv'
        )

        this.$q.loading.hide() // 로딩 표시 종료

        if (status !== true) {
          this.$q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      } catch(err) {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
      }
    },
    openTxSite(txid) {
      if (this.$BSC_MAINNET_ID == 56) {
        // 메인넷
        window.open('https://bscscan.com/tx/' + txid)
      } else {
        // 테스트넷
        window.open('https://testnet.bscscan.com/tx/' + txid)
      }
    },
    goBack() {
      // 페이지 이동
      this.$router.go(-1)
      // this.$router.push('/admin/adminMenu')
    },

  }
})
</script>

<style scoped>
.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-left: none; /* 왼쪽 테두리 제거 */
  border-top: none; 
  border-bottom: none; 
}

th, td {
  padding: 10px 5px;
  text-align: center;
  white-space: nowrap;
  /* border: 1px solid #e3e3e3; */
  border-top: none;
  border-bottom: none;
}

th {
  font-weight: bold;
}

thead th {
  border-top: 2px solid #8C57F5;
  border-bottom: 2px solid #8C57F5;
}

tbody tr:hover {
  background-color: #8C57F5;
}

input[type="checkbox"] {
  cursor: pointer;
}

/* 스크롤바 스타일링 */
.table-wrapper::-webkit-scrollbar {
  height: 15px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #494c50;
  border-radius: 5px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #eeb417;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #707070;
}

.btn-purple {
  background-color: #8C57F5 !important;
  color: white !important; /* 텍스트 색상 */
}
</style>
