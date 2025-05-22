<template>
  <q-page class="q-pa-md page-1200" style="color: white">
    &nbsp;&nbsp;&nbsp;
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        에어드랍 신청 통계
      </div>
    </div>

    <!-- <q-btn class="q-ml-lg" @click="goBack" label="Go Back" color="grey" no-caps /> -->

    <!-- 데이터 테이블 -->
    <div class="q-pt-lg" style="overflow-x: auto;">
      <table border="0" width="100%" style="margin: 0px 0px 0px 0px;" cellpadding="0" cellspacing="0">
        <!-- <thead>
          <tr>
            <th>DATE</th>
            <th>COUNT</th>
          </tr>
        </thead> -->
        <tbody>
          <tr v-for="(item, index) in airdropTotalList" :key="index">
            <td>{{ item.reg_date }}</td>
            <td>{{ item.count }}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>

    <div v-if="noDataFlag" class="row justify-center q-pt-lg">
      <img src="images/sorry-no-data.png" style="width: 35%; max-width: 250px;" />
    </div>

    <!-- 하단 버튼 -->
    <div class="row q-pt-lg">
      <div class="col-6 text-left">
        <!-- <q-btn @click="goBack" label="Go Back" color="grey" no-caps /> -->
      </div>
      <div class="col-6 text-right">
        <!-- <q-btn @click="batchMinting" label="2. Mint (Selected)" color="primary" no-caps />     민팅버튼 -->
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <LoginModal ref="refLoginModal" @callback-login="callbackLogin" /> -->
</template>

<script>
import { defineComponent } from 'vue'
import { QSpinnerGears } from 'quasar'
import { exportFile } from 'quasar'
import { ethers } from 'ethers'
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import bs58 from 'bs58';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, keypairIdentity, percentAmount } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata, verifyCollectionV1, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";

export default defineComponent({
  name: 'Registration',
  data () {
    return {
      projectSeq: '1',
      nftType: 'newkongz',
      symbol: '',
      payerSecretKey: '',
      sellerFeeBasisPoint: 0,
      collectionMint: '',
      mintAmount: 1, // 일단 지금은 1개로 고정
      airdropTotalList: [],
      selectedAll: false,
      nftId: '',
      walletType: 'phantom',
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false,
      keyword: '', // 검색키워드
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
    }
  },
  watch: {
  },
  created: function () {

    this.selectList()
  },
  mounted: function () {
  },
  methods: {
    // 에어드랍 로그 리스트 조회
    selectList() {
      this.$axios.get('/api/admin/selectAdminAirdropTotalList',
        {params: {uid: ''}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)

          this.airdropTotalList = result.data

          // 데이터 없음 표시 설정
          if (!this.airdropTotalList || this.airdropTotalList.length < 1) {
            this.noDataFlag = true
          } else {
            this.noDataFlag = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
  padding: 12px 15px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #494c50;
  border-top: none;
  border-bottom: none;
}

th {
  font-weight: bold;
}

thead th {
  border-bottom: 15px solid #494c50;
}

tbody tr:hover {
  background-color: #494c50;
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
</style>
