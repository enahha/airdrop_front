<template>
  <!-- <q-page class="q-pa-md" style="background-color: #8D57F5; background-image: images/list_bg.jpg;"> -->
  <q-page class="q-pa-md" style="background-color: #000000;">
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-md">
    </div>
    <div class="row justify-center page-tit">
      <q-img src="images/visual_char2.png" width="600px" />
    </div>
    <div class="row justify-center page-tit">
      <q-img src="images/snapshot.png" width="600px" />
    </div>
    <!-- <div class="row justify-center page-tit q-pt-sm">
      <font size="3">★☆★☆★ PUNKVISIM ★☆★☆★</font>
    </div> -->

    <div class="row justify-center">
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <!-- 관리자 로그인 화면 -->
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <div v-if="isAdmin" style="display: flex; justify-content: center; align-items: center;">
        <div class="row justify-center" style="width: 20%;">
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
      <div v-if="!isAdmin">
        <!-- <q-btn class="q-ml-lg" @click="goBack" label="Go Back" color="grey" no-caps /> -->

        <!-- 상단 버튼 신규 -->
        <div class="row justify-center text-white">
          <table>
            <tr>
              <td>
                <q-btn @click="goSnapshot('solana')" :loading="loading" class="btn-purple" no-caps style="padding: 0px 10px; height: 80px; width: 300px;" tabindex="1">
                  <font size="6">Solana</font>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td>
                <q-btn @click="goSnapshot('ethereum')" :loading="loading" class="btn-purple" no-caps style="padding: 0px 10px; height: 80px; width: 300px;" tabindex="2">
                  <font size="6">Ethereum</font>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td>
                <q-btn @click="goSnapshot('kaia')" :loading="loading" class="btn-purple" no-caps style="padding: 0px 10px; height: 80px; width: 300px;" tabindex="3">
                  <font size="6">Kaia</font>
                </q-btn>
              </td>
            </tr>
          </table>
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

</template>

<script>
import { defineComponent } from 'vue'

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
      bubblegumTreeAddress: '',
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
      processCompletedModal: false, // 처리완료 메시지 표시여부
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
  },
  mounted: function () {
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
    goSnapshot(mainnet) {
      if (mainnet == 'solana') {
        this.$router.push('/snapshot/solana')
      } else if (mainnet == 'ethereum') {
        this.$router.push('/snapshot/ethereum')
      } else if (mainnet == 'kaia') {
        this.$router.push('/snapshot/kaia')
      } else {
        this.$noti(this.$q, 'No mainnet selected.')
      }
    },
    goBack() {
      // 페이지 이동
      this.$router.go(-1)
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
