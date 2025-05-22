<template>
  <q-page class="page-default q-pa-md page-1200 q-page-mini">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_project_register') }}
      </div>
    </div>
    <div class="row justify-center q-pt-sm q-pb-sm doc-sub-heading">
      <div class="col-12">
        {{ $t('menu_project_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('mainnet') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 t-text">
        <q-select
          v-model="mainnet"
          :options="mainnetOptions"
          dense
          standout
          style="width: 200px;"
          tabindex="1"
        />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_id') }} <span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectId" ref="refProjectId" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_symbol') }} <span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectSymbol" ref="refProjectSymbol" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_name') }} <span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectName" ref="refProjectName" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_name_ko') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectNameKo" ref="refProjectNameKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('contract_address') }} <span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-between q-pb-md">
      <div class="col-12">
        <q-input v-model="contractAddress" ref="refContractAddress" :rules="isSolana ? [] : [required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="1" :readonly="isSolana" />
        <div v-if="isSolana" class="col-12 text-red text-bold">
          {{ $t('solana_contract_address_disabled_message') }}
        </div>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('json_path') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="jsonPath" ref="refJsonPath" :rules="isSolana ? [] : [required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="1" :readonly="isSolana" />
        <div v-if="isSolana" class="col-12 text-red text-bold">
          {{ $t('solana_contract_address_disabled_message') }}
        </div>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('admin_wallet_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="adminWalletAddress" ref="refAdminWalletAddress" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('listing_wallet_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="listingWalletAddress" ref="refListingWalletAddress" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('fee_wallet_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="feeWalletAddress" ref="refFeeWalletAddress" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('listing_wallet_secret_key') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="listingWalletSecretKey" ref="refListingWalletSecretKey" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('fee_wallet_secret_key') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="feeWalletSecretKey" ref="refFeeWalletSecretKey" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_image') }}
          <span class="text-weight-normal text-grey">
            &nbsp;&nbsp;({{ $t('project_image_reset') }} : <q-icon name="done_all" size="sm" />)
          </span>
        </span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-uploader
          field-name="file"
          ref="uploaderObj"
          url="/api/common/uploadImage" 
          hide-upload-btn
          color="grey-3"
          text-color="black"
          :multiple="false"
          accept="image/*"
          :filter="filterFiles"
          max-files="1"
          :auto-upload="true"
          tabindex="9"
          @uploaded="ProjectImageFileUploaded"
        />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('description') }} (English)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-editor
          v-model="description"
          min-height="10rem"
          autofocus
          tabindex="5"
          @keyup.enter.stop
          toolbar-bg="grey-1"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['print', 'fullscreen'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('description') }} (Korean)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-editor
          v-model="descriptionKo"
          min-height="10rem"
          autofocus
          tabindex="5"
          @keyup.enter.stop
          toolbar-bg="grey-1"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['print', 'fullscreen'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </div>

    <!-- 수수료 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('creator_fee') }} <span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model.number="creatorFee" ref="refCreatorFee" type="number" :rules="[required, val => minValue(val, 0.1), val => maxValue(val, 10000)]" clearable standout tabindex="1" min="0" :max="9999999999"/>
      </div>
    </div>

    <!-- start_time -->
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('start_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('start_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="mintStartTime" ref="refMintStartTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="7">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="mintStartTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="mintStartTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- end_time -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('end_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('end_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="mintEndTime" ref="refMintEndTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="8">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="mintEndTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="mintEndTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>



    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('mint_start_block') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="mintStartBlock" ref="refMintStartBlock" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('mint_end_block') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="mintEndBlock" ref="refMintEndBlock" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>

    <div class="row justify-center  q-pt-lg btn-wrap">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="19">
          {{ $t('go_back') }}
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="primary" text-color="black" size="lg" style="width: 98%;" @click="register" tabindex="18">
          {{ $t('save_description') }}
        </q-btn>
      </div>
    </div>


    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Registration',
  data () {
    return {
      projectId: '',
      projectSymbol: '',
      projectName: '',
      projectNameKo: '',
      contractAddress: '',
      jsonPath: '',
      adminWalletAddress: '',
      listingWalletAddress: '',
      feeWalletAddress: '',
      listingWalletSecretKey: '',
      feeWalletSecretKey: '',
      projectImageUrl: '',
      creatorFee: 0,
      mintStartTime: '',
      mintEndTime: '',
      mintStartBlock: '',
      mintEndBlock: '',
      mainnet: {
        label: 'Solana',
        value: 'solana',
      },
      description: '',
      descriptionKo: '',
      
      mainnetOptions: [
        {
          label: 'Solana',
          value: 'solana',
        },
        {
          label: 'BNB',
          value: 'bnb',
        },
      ],
      
      // seqFileMst: '' // 파일 마스터 SEQ
      createKey: false,   // sol contract address생성완료 시 true(readOnly)로
      confirmGoBack: false, // goBack 확인창
      isSolana: false,

    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  watch: {
    mainnet: {
      handler: 'handleMainnetChange', // 변경 핸들러 호출
      immediate: true // 컴포넌트 마운트 시 즉시 트리거
    }
  },
  created: function () {
    // 키 설정
    this.tokenSeq = this.$route.query.seq
    // 토큰 정보 조회
    // this.selectToken()
  },
  mounted: function () {},
  methods: {
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true;
      if (!this.$refs.refProjectId.validate()) {
        result = false;
      }
      if (!this.$refs.refProjectSymbol.validate()) {
        result = false;
      }
      if (!this.$refs.refProjectName.validate()) {
        result = false;
      }
      if (!this.$refs.refProjectNameKo.validate()) {
        result = false;
      }
      if (!this.projectImageUrl) {
        this.$noti(this.$q, this.$t('validation_failed_minting_nft_image'));
        result = false;
      }
      if (!this.$refs.refAdminWalletAddress.validate()) {
        result = false;
      }
      if (!this.$refs.refCreatorFee.validate()) {
        result = false;
      }
      if (!this.$refs.refMintStartTime.validate()) {
        result = false;
      }
      if (!this.$refs.refMintEndTime.validate()) {
        result = false;
      }
      if (!this.$refs.refMintStartBlock.validate()) {
        result = false;
      }
      if (!this.$refs.refMintEndBlock.validate()) {
        result = false;
      }
      if (!this.$refs.refListingWalletAddress.validate()) {
        result = false;
      }
      if (!this.$refs.refFeeWalletAddress.validate()) {
        result = false;
      }
      if (!this.$refs.refListingWalletSecretKey.validate()) {
        result = false;
      }
      if (!this.$refs.refFeeWalletSecretKey.validate()) {
        result = false;
      }
      if (this.mainnet.value === 'solana') {
        return result;
      }
      if (!this.$refs.refContractAddress.validate() && this.mainnet.value !== 'solana') {
        result = false;
      }
      if (!this.$refs.refJsonPath.validate() && this.mainnet.value !== 'solana') {
        result = false;
      }
      if (!this.$refs.refNew_admin_wallet_address.validate()) {
        result = false;
      }
      if (!this.$refs.refFee.validate()) {
        result = false;
      }
      return result;
    },
    handleMainnetChange() {
      this.isSolana = this.mainnet.value === 'solana';
      if (this.isSolana) {
        this.new_contract_address = '';
      }
    },
    // 등록 처리 시작
    async register() {
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // // 로그인 여부 체크, 로그인 모달 표시
      // if (!this.getUid) {
      //   this.$refs.refLoginModal.show()
      //   return
      // }

      this.$q.loading.show() // 로딩 표시 시작

      // 등록
      const params = {
        mainnet: this.mainnet,
        project_id: this.projectId,
        project_symbol: this.projectSymbol,
        project_name: this.projectName,
        project_name_ko: this.projectNameKo,
        contract_address: this.contractAddress,
        json_path: this.jsonPath,
        admin_wallet_address: this.adminWalletAddress,
        listing_wallet_address : this.listingWalletAddress,
        fee_wallet_address : this.feeWalletAddress,
        listing_wallet_secret_key : this.listingWalletSecretKey,
        fee_wallet_secret_key : this.feeWalletSecretKey,
        image_url: this.projectImageUrl,
        description: this.description,
        description_ko: this.descriptionKo,
        creator_fee: this.creatorFee,
        mint_start_time: this.mintStartTime,
        mint_end_time: this.mintEndTime,
        mint_start_block: this.mintStartBlock,
        mint_end_block: this.mintEndBlock,
      }
      this.$axios.post('/api/project/insertProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 2. 페이지 이동 - Ntf List page
            this.$router.push("/project/projectList")
            // <!-- 관리자 수정용 -->
            // this.$router.push('/token/newList')
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
    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    // fileAdded (files) {
    //   // this.$refs.uploaderObj.reset()
    //   this.$refs.uploaderObj.removeUploadedFiles()
    //   this.$refs.uploaderObj.upload()
    // },
    ProjectImageFileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.projectImageUrl = fileNameNew //  URL 설정
      // this.$refs.uploaderObj.reset()
    },
    goBack() {
      // this.$router.go(-1)

      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      // 페이지 이동
      this.$router.go(-1)
      // if (this.$route.query.fromAdmin === 'Y') {
      //   // 나의 토큰 리스트 화면 - admin
      //   this.$router.push('/admin/adminMyList')
      // } else {
      //   // 나의 토큰 리스트 화면
      //   this.$router.push('/project/myProjectList')
      // }
    },
  }
})
</script>

<style scoped>
</style>
