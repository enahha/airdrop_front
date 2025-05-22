<template>
    <q-page class="page-1200 project-list-wrap">
      <div class="row q-pt-md q-pl-md justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
          프로젝트 등록
        </div>
      </div>
  
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
  
      <!-- 프로젝트 등록 -->
      <div class="row justify-center q-pt-lg">
        <div class="col-12 text-white">
          <h3>프로젝트 정보</h3>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-6 text-white">
          <label>프로젝트 이름</label>
          <q-input
            v-model="projectVo.projectName"
            outlined
          />
        </div>
        <div class="col-6 text-white">
          <label>심볼</label>
          <q-input
            v-model="projectVo.projectSymbol"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-6 text-white">
          <label>메인넷</label>
          <q-input
            v-model="projectVo.mainnet"
            outlined
          />
        </div>
        <div class="col-6 text-white">
          <label>Seller Fee Basis Point ex) 5</label>
          <q-input
            v-model="projectVo.sellerFeeBasisPoint"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label>컬렉션 JSON URI</label>
          <q-input
            v-model="projectVo.jsonPath"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label>컬렉션 관리자 지갑주소</label>
          <q-input
            v-model="projectVo.adminWalletAddress"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label>컬렉션 관리자 지갑 비밀키</label>
          <q-input
            v-model="projectVo.feeWalletSecretKey"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12 text-left">
          <q-btn
            class="btn"
            color="primary"
            text-color="black"
            size="lg"
            style="width: 98%"
            @click="register()"
          >
            프로젝트 등록
          </q-btn>
        </div>
      </div>
  
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
  
      <div class="col-12 flex justify-between">
        <q-btn class="q-ml-lg" @click="this.$router.go(-1)" label="Go Back" color="grey" no-caps />
        <q-btn class="q-ml-lg" @click="this.$router.push('/admin/createCollection')" label="Next" color="purple" no-caps />
      </div>
      
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
name: "Test",
setup() {
    const { locale } = useI18n({ useScope: "global" });
    return {
    locale,
    };
},
data() {
    return {
        projectVo: {
            seq: 0,
            projectId: 0,
            projectSymbol: '',
            projectName: '',
            projectNameKo: '',
            mainnet: 'solana',
            contractAddress: '',
            bubblegumTreeAddress: '',
            jsonPath: '',
            adminWalletAddress: '',
            listingWalletAddress: '',
            feeWalletAddress: '',
            listingWalletSecretKey: '',
            feeWalletSecretKey: '',
            imageUrl: '',
            description: '',
            descriptionKo: '',
            mintStartTime: null,
            mintEndTime: null,
            mintStartBlock: '',
            mintEndBlock: '',
            sellerFeeBasisPoint: '',
            creatorFee: 0,
            regId: '',
            regTime: null,
            modId: '',
            modTime: null,
            delId: '',
            delTime: null,
        },
    };
},
created: function () {
  this.selectLastProjectId()
},
methods: {
  // 마지막 프로젝트 id 조회
  async selectLastProjectId() {
    this.$axios.get('/api/project/selectLastProjectId')
      .then((result) => {
          console.log(result.data)
          const lastProjectId = result.data.project_id
          this.projectVo.projectId = parseInt(lastProjectId, 10) + 1
      })
      .catch((err) => {
          console.log(err)
          this.$noti(this.$q, err)
      })
  },
  // 프로젝트 등록 처리 시작
  async register() {
      this.$q.loading.show() // 로딩 표시 시작

      // 등록
      const params = {
        project_id: this.projectVo.projectId,
          project_symbol: this.projectVo.projectSymbol,
          project_name: this.projectVo.projectName,
          mainnet: this.projectVo.mainnet,
          json_path: this.projectVo.jsonPath,
          admin_wallet_address: this.projectVo.adminWalletAddress,
          fee_wallet_secret_key: this.projectVo.feeWalletSecretKey,
          seller_fee_basis_point: this.projectVo.sellerFeeBasisPoint,
      }
      this.$axios.post('/api/project/insertProject', params)
      .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
          // console.log(result.data)
          this.$noti(this.$q, this.$t('register_success'))

          } else {
          this.$noti(this.$q, this.$t('register_failed'))
          this.$router.push('/')
          }
      })
      .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
      })
  },
},
});
</script>

<style scoped></style>