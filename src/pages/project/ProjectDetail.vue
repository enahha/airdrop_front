<template>
  <div class="page-default row justify-center project-detail-header">
    <div class="col-12 q-pb-xs">
      <!-- <div class="row flex flex-center"> -->
      <!-- <div class="row justify justify-between q-pt-sm"> -->
      <div class="row justify justify-between q-pt-sm">
        <div class="row flex flex-center">
          <div class="row flex flex-center">
            <div class="col">
              <table border="0" width="100%" style="margin: 0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td>
                    <div class="text-right q-pl-sm">
                      <q-avatar size="md">
                        <!-- <img v-if="projectVo.logo_image" :src="projectVo.logo_image"> -->
                        <q-icon name="rocket_launch" size="md" />
                      </q-avatar>
                    </div>
                  </td>
                  <td width="100%">
                    <div class="text-h6 q-pl-sm" style="word-break: break-word;">
                      <div v-if="locale === 'ko-KR'">
                        {{ projectVo.project_name_ko }}
                      </div>
                      <div v-else class="col-12">
                        {{ projectVo.project_name }}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="q-pl-sm">
          <div class="row flex flex-center">
            <!-- <div v-if="popupYn !== 'y'"> -->
            <div>
              <q-btn flat round dense icon="arrow_back" color="black" icon-left="true" @click="goBack" />
            </div>
            <div class="col flex flex-center">
              <q-btn flat round dense icon="edit" size="md" color="primary" icon-right="true" @click="modify" />
            </div>
            <div class="col">
              <q-btn flat round dense icon="delete" size="md" color="primary" icon-right="true" @click="deleteProject" />
            </div>
            <div class="col">
              <q-btn flat round dense icon="share" size="md" color="black" icon-right="true" @click="shareUrlCopy(projectVo.seq)" />
            </div>
            <div class="q-pl-md q-pr-sm">
              <q-select
                v-if="popupYn === 'y'"
                v-model="locale"
                :options="localeOptions"
                dense
                borderless
                emit-value
                map-options
                style="width: 55px"
                
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Side Area -->
  <!-- <div :class="`page-side-bar project-type ${getRightDrawerOpen ? 'on' : ''}`"></div> -->
  <div v-if="smallSize">
    <div class="page-side-bar project-type">
        <div class="row">
          <q-avatar>
            <img v-if="projectVo.image_url" :src="projectVo.image_url">
            <q-icon v-else name="generating_tokens" size="md" />
          </q-avatar>
        </div>
        <div class="row">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_name') }}</span>
          </div>
        </div>
        <div class="row q-pb-md">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            <span style="padding-right: 20px;">{{ projectVo.project_name_ko }}</span>
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ projectVo.project_symbol }}</span>
          </div>
          <div v-else class="col-12 t-text">
            <span style="padding-right: 20px;">{{ projectVo.project_name }}</span>
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ projectVo.project_symbol }}</span>
          </div>
        </div>
      </div>
  </div>

  <div v-else>
    <q-page-sticky position="top-right" :offset="[0, 0]">
    <div class="page-side-bar project-type">
      <div class="row">
        <q-avatar size="md">
          <img v-if="projectVo.image_url" :src="projectVo.image_url">
          <q-icon v-else name="generating_tokens" size="md" />
        </q-avatar>
      </div>
      <div class="row">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_name') }}</span>
        </div>
      </div>
      <div class="row q-pb-md">
        <div v-if="locale === 'ko-KR'" class="col-12 t-text">
          <span style="padding-right: 20px;">{{ projectVo.project_name_ko }}</span>
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ projectVo.project_symbol }}</span>
        </div>
        <div v-else class="col-12 t-text">
          <span style="padding-right: 20px;">{{ projectVo.project_name }}</span>
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ projectVo.project_symbol }}</span>
        </div>
      </div>
  </div>
      <hr/>
    </q-page-sticky>
  </div>

  <q-page class="page-default project-detail-wrap">
    <q-tabs
      v-model="tab"
      class="bg-grey-1 shadow-0"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="i" icon="info">&nbsp;&nbsp;{{ $t('information') }}</q-tab>
      <!-- <q-tab name="l" icon="link">&nbsp;&nbsp;{{ $t('link') }}</q-tab> -->
      <!-- <q-tab name="c" icon="chat">&nbsp;&nbsp;{{ $t('Project') }}</q-tab> -->
    </q-tabs>

    <q-separator />


    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="i" style="word-break: break-word;">
        <!-- <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_name') }}</span>
          </div>
        </div>
        <div class="col-12">
          <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 100%;" @click="insertMintPlanList" no-caps>
            <b>{{ $t('init_mint_plan') }}</b>
          </q-btn>
        </div> -->
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_name') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.project_name_ko }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.project_name }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('mainnet') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.mainnet }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_id') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.project_id }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('json_path') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.json_path }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('admin_wallet_address') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.admin_wallet_address }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('listing_wallet_address') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.listing_wallet_address }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('fee_wallet_address') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.fee_wallet_address }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('listing_wallet_secret_key') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.listing_wallet_secret_key }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('fee_wallet_secret_key') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.fee_wallet_secret_key }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('start_time') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.mint_start_time }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('end_time') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.mint_end_time }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('mint_start_block') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.mint_start_block }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('mint_end_block') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.mint_end_block }}
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('creator_fee') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.creator_fee }}
          </div>
        </div>

        <div class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('create_sol_collection_key') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.contract_address }}
          </div>
        </div>
        <div class="col-2">
          <q-btn class="btn" color="accent" text-color="black" size="lg" style="width: 100%;" @click="createSolanaCollectionKey" no-caps>
            <b>{{ $t('create_sol_collection_key') }}</b>
          </q-btn>
        </div>

        <div v-if="projectVo.description || projectVo.description_ko" class="row justify-center q-pt-lg">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('description') }}</span>
          </div>
        </div>
        <div v-if="projectVo.description || projectVo.description_ko" class="q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="row q-pb-md q-pl-xs">
            <div class="col-12" v-html="projectVo.description_ko" />
          </div>
          <div v-else class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12" v-html="projectVo.description" />
          </div>
        </div>

        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-tab-panel>

    </q-tab-panels>

    <div v-if="noDataFlag && tab === 'c'" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmDeleteProjectModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteProject" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmModifyProjectModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_modify') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('modify')" color="black" v-close-popup @click="doModify" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- <q-dialog v-model="failCreateSolContractAddress">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('failed') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

  <LoginModal ref="refLoginModal" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { QSpinnerGears } from 'quasar'
// import {
//   generateSigner,
//   percentAmount,
//   keypairIdentity,
// } from "@metaplex-foundation/umi";
// import {
//   createNft,
//   fetchDigitalAsset,
//   verifyCollectionV1,
//   mplTokenMetadata,
//   updateV1,
//   fetchMetadataFromSeeds,
// } from "@metaplex-foundation/mpl-token-metadata";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
// import { useMeta } from 'quasar'
// import { createMetaMixin } from 'quasar'

// const metaData = {
//   // sets document title
//   title: 'Index Page',
//   // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
//   titleTemplate: title => `${title} - My Website`,

//   // meta tags
//   meta: {
//     description: { name: 'description', content: 'Page 1' },
//     keywords: { name: 'keywords', content: 'Quasar website' },
//     equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
//     // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
//     ogTitle:  {
//       property: 'og:title',
//       // optional; similar to titleTemplate, but allows templating with other meta properties
//       template (ogTitle) {
//         return `${ogTitle} - My Website`
//       }
//     }
//   },

//   // CSS tags
//   link: {
//     material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
//   },

//   // JS tags
//   script: {
//     ldJson: {
//       type: 'application/ld+json',
//       innerHTML: `{ "@context": "http://schema.org" }`
//     }
//   },

//   // <html> attributes
//   htmlAttr: {
//     'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">
//     empty: undefined // generates <html empty>
//   },

//   // <body> attributes
//   bodyAttr: {
//     'action-scope': 'xyz', // generates <body action-scope="xyz">
//     empty: undefined // generates <body empty>
//   },

//   // <noscript> tags
//   noscript: {
//     default: 'This is content for browsers with no JS (or disabled JS)'
//   }
// }

export default defineComponent({
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'EN' },
        { value: 'ko-KR', label: 'KO' },
      ],
    }
  },
  name: 'Detail',
  data () {
    return {
      popupYn: 'n', // 토큰정보 참조시 팝업표시 여부 파라미터
      smallSize: false,
      urlSwapscannerKo: this.$urlSwapscannerKo, // https://swapscanner.io/ko/swap?from=0x0000000000000000000000000000000000000000&to=
      urlSwapscannerEn: this.$urlSwapscannerEn, // https://swapscanner.io/swap?from=0x0000000000000000000000000000000000000000&to=
      projectSeq: '', // route parameter seq
      tab: 'i',
      //////////////////////////////////
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
      collection_signature: '',
      //////////////////////////////////
      solanaCollectionJsonUrl: '',
      isSolanaCollectionKey: false,
      scopeKlaytnUrl: this.$scopeDomainKlaytn,
      // description: '',
      // descriptionKo: '',
      // myContents: '', // 입력 댓글
      // myContentsLength: 0,
      // myReply: '', // 입력 답글
      // myReplyLength: 0,
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      tokenProjectList: [],
      noDataFlag: false,
      confirmDeleteProjectModal: false, // Project 삭제 모달
      deleteTargetSeq: '', // 삭제 대상 댓글 seq
      confirmModifyProjectModal: false, // Project 수정 모달
      modifyTargetSeq: '', // 수정 대상 댓글 seq
      // modifyProjectValue: '', // 수정 대상 댓글 내용
      confirmDeleteProject: false, // 프로젝트 삭제 모달
    }
  },
  components: {
  },
  computed: {
    getRightDrawerOpen () {
      return this.$store.getters.getRightDrawerOpen
    },
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

    // 탭 파라미터 존재시, 해당 탭 표시
    if (this.$route.query.t === 'i' || this.$route.query.t === 'l' || this.$route.query.t === 'c') {
      this.tab = this.$route.query.t
    } else {
      this.tab = 'i'
    }
    // locale 파라미터 존재시, 해당 locale 설정
    if (this.$route.query.l === 'ko') {
      this.locale = 'ko-KR'
    } else if (this.$route.query.l === 'en') {
      this.locale = 'en-US'
    } else {
      // beastar default locale is... ko?
    }
    // popup 파라미터 존재시, popupYn 설정
    if (this.$route.query.p) {
      this.popupYn = this.$route.query.p
    }


    // 키 설정
    this.projectSeq = this.$route.query.s
    // 토큰 정보 조회
    this.selectProject()

    // this.selectListMax()
  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted: function () {},
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
    // callbackLogin(userVo) {
    //   // console.log('callbackLogin!!!')
    //   this.$store.dispatch('setUid', userVo.uid)
    //   this.$store.dispatch('setAdcd', userVo.adcd)
    //   this.$store.dispatch('setName', userVo.name)
    //   this.$store.dispatch('setNickname', userVo.nickname)
    //   this.$store.dispatch('setProfileImage', userVo.profile_image)
    //   this.$store.dispatch('setWalletType', userVo.wallet_type)
    //   this.$store.dispatch('setWalletAddress', userVo.wallet_address)
    //   this.$store.dispatch('setMobileNo', userVo.mobile_no)
    // },
    // // 답글 글자수 카운트
    // countMyReplyLength() {
    //   this.myReplyLength = this.myReply.length
    // },
    // // 답글 등록
    // insertTokenProjectReply(item) {
    //   // console.log('insertTokenProject')

    //   // 로그인 여부 체크, 로그인 모달 표시
    //   if (!this.getUid) {
    //     this.$refs.refLoginModal.show()
    //     return
    //   }

    //   // 내용 유무 체크
    //   if (!this.myReply) {
    //     this.$noti(this.$q, this.$t('enter_the_reply'))
    //     return
    //   }

    //   // 글자수 체크
    //   if (this.myReply.length > 300) {
    //     this.$noti(this.$q, this.$t('validation_failed_Project_max_length'))
    //     return
    //   }

    //   this.$q.loading.show() // 로딩 표시 시작
    //   const params = {
    //     uid: this.getUid,
    //     seq: this.projectSeq,
    //     seq_parent1: item.seq_parent1,
    //     seq_parent2: item.seq_parent2,
    //     seq_parent3: item.seq_parent3,
    //     seq_parent4: item.seq_parent4,
    //     seq_parent5: item.seq_parent5,
    //     group_order: item.group_order, // 답글의 대상 값을 넘겨서 이 값보다 큰 GROUP_ORDER 들은 + 1 씩 UPDATE 처리
    //     group_layer: item.group_layer + 1,
    //     contents: this.myReply,
    //   }
    //   this.$axios.post('/api/tokenProject/insertTokenProjectReply', params)
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         // console.log(result.data)
    //         this.myReply = ''
    //         this.$noti(this.$q, this.$t('register_token_Project_success'))

    //         // 목록 새로고침
    //         this.refresher(null)
    //       } else {
    //         this.$noti(this.$q, this.$t('register_token_Project_failed'))
    //       }
    //     })
    //     .catch((err) => {
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       console.log(err)
    //       this.$noti(this.$q, err)
    //     })
    // },
    // 댓글 글자수 카운트
    // countMyContentsLength() {
    //   this.myContentsLength = this.myContents.length
    // },
    // // 댓글 등록
    // insertTokenProject() {
    //   // console.log('insertTokenProject')

    //   // 로그인 여부 체크, 로그인 모달 표시
    //   if (!this.getUid) {
    //     this.$refs.refLoginModal.show()
    //     return
    //   }

    //   // 내용 유무 체크
    //   if (!this.myContents) {
    //     this.$noti(this.$q, this.$t('enter_the_Project'))
    //     return
    //   }

    //   if (this.myContents.length > 300) {
    //     this.$noti(this.$q, this.$t('validation_failed_Project_max_length'))
    //     return
    //   }

    //   this.$q.loading.show() // 로딩 표시 시작

    //   // seq_parent는 WAS 쿼리에 selectKey로 설정됨
    //   const params = {
    //     uid: this.getUid,
    //     seq: this.projectSeq,
    //     contents: this.myContents,
    //   }
    //   this.$axios.post('/api/tokenProject/insertTokenProject', params)
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         // console.log(result.data)
    //         this.myContents = ''
    //         this.$noti(this.$q, this.$t('register_token_Project_success'))

    //         // 목록 새로고침
    //         this.refresher(null)
    //       } else {
    //         this.$noti(this.$q, this.$t('register_token_Project_failed'))
    //       }
    //     })
    //     .catch((err) => {
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       console.log(err)
    //       this.$noti(this.$q, err)
    //     })
    // },
    refresher (done) {
      this.selectListMax()
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.tokenProjectList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
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
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 토근 댓글 리스트 마지막 페이지 조회
    // selectListMax() {
    //   this.$axios.get('/api/tokenProject/selectTokenProjectListLastPageNum',
    //     {params: {uid: this.getUid, projectSeq: this.projectSeq, pageSize: this.pageSize}})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.lastPageNum = result.data
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // // 토큰 댓글 리스트 조회
    // selectList(idx, done) {
    //   this.$axios.get('/api/tokenProject/selectTokenProjectList',
    //     {params: {uid: this.getUid, projectSeq: this.projectSeq, pageNum: idx, pageSize: this.pageSize}})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       if (idx === 1) { // 첫번째 load인 경우
    //         this.tokenProjectList = [] // 리스트 초기화
    //       }
    //       this.tokenProjectList = this.tokenProjectList.concat(result.data)

    //       // 데이터 없음 표시 설정
    //       if (!this.tokenProjectList || this.tokenProjectList.length < 1) {
    //         this.noDataFlag = true
    //       } else {
    //         this.noDataFlag = false
    //       }
    //       if (done) {
    //         done()
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       if (done) {
    //         done()
    //       }
    //     })
    // },
    selectProject() {
      const param = {
        seq: this.projectSeq,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            this.projectVo = result.data
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async createSolanaCollectionKey() {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        message: this.$t('loading_message_minting'),
      })

      try {
        // solanaCollectionJsonUrl 세팅
        console.log("Calling createSolanaCollectionFile");
        const createCollectionJsonFile = await this.createSolanaCollectionFile();
        console.log("createSolanaCollectionFile result:", createCollectionJsonFile);
        console.log("json path", this.projectVo.json_path);

        if (createCollectionJsonFile) {
          console.log("createCollectionJsonFile 성공");
          const signerSecretKeyValue = {
            cdKey: this.$KEY_VALUE_SOLANA_SIGNER_WALLET_SECRET_KEY,
          }
          const resultSignerKeyValue = await this.$axios.get('/api/common/selectKeyValue', { params: { ...signerSecretKeyValue }})
          const signerSecretKey = resultSignerKeyValue.data.returnValue
          const createCollection = await this.createCollection({
            name: this.projectVo.project_name,
            symbol: this.projectVo.project_symbol,
            uri: this.projectVo.json_path,
            sellerFeeBasisPoints: this.projectVo.creator_fee,
            tokenOwner: this.projectVo.listing_wallet_address,
            payerKey: this.projectVo.fee_wallet_secret_key,
            updateAuthority: signerSecretKey,
          })
          console.log("createCollection result:", createCollection);

          if (createCollection) {
            console.log("성공");
            this.updateCollectionKey()
          }
        } else {
          console.log("createCollectionJsonFile returned a falsy value");
        }
      } catch (err) {
        console.log(err)
        this.$noti(this.$q, err)
        this.$q.loading.hide() // 로딩 표시 종료
      }
    },
    async createSolanaCollectionFile() {
      try {
        const response = await this.$axios.post('/api/blockchain/createSolanaCollectionJsonFile', {}, {
          params: {
            projectSeq: this.projectVo.seq,
          },
        })
        console.log("콜렉션 파일 생성 성공" + response.data.returnValue)
        this.projectVo.json_path = response.data.returnValue
        return response.data.returnValue
      } catch (error) {
        console.error('Error:', error)
        this.$q.loading.hide()
      }
    },
    async createCollection({
        name,
        symbol,
        uri,
        sellerFeeBasisPoints,
        tokenOwner,
        payerKey,
        updateAuthority,
      }) {
      try {
        console.log('Start Create Collection');
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(payerKey))
        umi.use(keypairIdentity(payer, true))
        const signer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(updateAuthority))
        umi.use(keypairIdentity(signer, false))

        const mint = generateSigner(umi);
        console.log("Collection mint account : ", mint.publicKey);
        const createdCollection = await createNft(umi, {
          mint,
          name: name,
          symbol: symbol,
          uri: uri,
          sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints * 0.01),
          isCollection: true,
          updateAuthority: signer,
          tokenOwner: tokenOwner,
        }).sendAndConfirm(umi)

        console.log(
          "Create Collection Signature : ",
          bs58.encode(createdCollection.signature)
        )
        
        console.log("Collection Minted:", mint.publicKey)
        this.collection_signature = bs58.encode(createdCollection.signature)
        this.projectVo.contract_address = mint.publicKey
        return true
      } catch (error) {
        console.error("Error creating collection NFT:", error)
        throw new Error("Failed to fetch asset after multiple attempts")
      }
    },
    async fetchAssetWithRetries(umi, publicKey, retries = 20, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const asset = await fetchDigitalAsset(umi, publicKey);
          return asset;
        } catch (error) {
          if (i < retries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
      throw new Error("Failed to fetch asset after multiple attempts");
    },
    updateCollectionKey() {
      const param = {
        seq : this.projectVo.seq,
        contract_address : this.projectVo.contract_address,
        json_path: this.json_path,
      }

      this.$axios.post('/api/project/updateSolCollectionKey', param)
        .then((result) => {
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
            this.isSolanaCollectionKey = true
            this.$q.loading.hide()
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
            this.$q.loading.hide()
          }
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide()
          this.$noti(this.$q, err)
        })
    },


    //   // 토큰 상세 조회
    //   const paramDescription = {
    //     uid: this.getUid,
    //     projectSeq: this.projectSeq,
    //   }
    //   this.$axios.get('/api/token/selectTokenDescription', { params: { ...paramDescription }})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       if (result.data) {
    //         this.description = result.data.description
    //         this.descriptionKo = result.data.description_ko
    //       } else {
    //         this.description = ''
    //         this.descriptionKo = ''
    //         this.$noti(this.$q, this.$t('request_data_failed') + ' - description')
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    openUrl(url) {
      // console.log(url)
      // openURL(url)
      // window.open(url, '_system', 'location=yes,footer=yes')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
    },
    shareUrlCopy(value) {
      // console.log('copyAddress function called!')
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://beastar.io/#/info?seq=999&tab=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/i?s=' + value + '&t=' + this.tab + '&l=' + this.locale.substring(0, 2) // seq, tab, locale

      // 클립보드로 복사하기
      this.$copyText(url).then(this.copyValueSuccess, this.copyValueFail)
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
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },
    goBack() {
      try {
        this.$router.go(-1)
      } catch(e) {
        this.$router.push('/project/projectList')
      }
    },
    // // 나의 댓글 삭제 모달 표시
    // deleteProject(ProjectSeq) {
    //   this.deleteTargetSeq = ProjectSeq
    //   this.confirmDeleteProjectModal = true
    // },
    // // 나의 댓글 삭제
    // doDeleteCommennt() {
    //   // console.log('insertTokenProject')
    //   this.$q.loading.show() // 로딩 표시 시작
    //   const params = {
    //     uid: this.getUid,
    //     seq: this.deleteTargetSeq,
    //   }
    //   this.$axios.post('/api/tokenProject/deleteTokenProject', params)
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         // console.log(result.data)
    //         this.deleteTargetSeq = ''
    //         this.$noti(this.$q, this.$t('delete_token_Project_success'))

    //         // 목록 새로고침
    //         this.refresher(null)
    //       } else {
    //         this.$noti(this.$q, this.$t('delete_token_Project_failed'))
    //       }
    //     })
    //     .catch((err) => {
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       console.log(err)
    //       this.$noti(this.$q, err)
    //     })
    // },
    // // 나의 댓글 수정 모달 표시
    // modifyProject(item) {
    //   // this.modifyTargetSeq = item.seq
    //   // this.modifyProjectValue = item.contents
    //   this.confirmmodifyProjectModal = true

    // },
    // // 나의 댓글 수정
    // doModifyCommennt() {
    //   this.$q.loading.show() // 로딩 표시 시작
    //   const params = {
    //     uid: this.getUid,
    //     seq: this.modifyTargetSeq,
    //     contents: this.modifyProjectValue,
    //   }
    //   this.$axios.post('/api//modifyProject', params)
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         // console.log(result.data)
    //         this.modifyTargetSeq = ''
    //         this.$noti(this.$q, this.$t('modify_token_Project_success'))

    //         // 목록 새로고침
    //         this.refresher(null)
    //       } else {
    //         this.$noti(this.$q, this.$t('modify_token_Project_failed'))
    //       }
    //     })
    //     .catch((err) => {
    //       this.$q.loading.hide() // 로딩 표시 종료
    //       console.log(err)
    //       this.$noti(this.$q, err)
    //     })
    // },
    // // 답글 등록
    // showReplyInput(item) {
    //   // console.log(item.visible_reply_input)

    //   // 1. 입력값 초기화
    //   this.myReply = ''

    //   // 2. 열린 입력창 모두 닫음
    //   for (let i = 0; i < this.tokenProjectList.length; i++) {
    //     const ProjectItem = this.tokenProjectList[i]
    //     // 현재 아이템 외 전부 닫기
    //     if (ProjectItem.seq !== item.seq) {
    //       ProjectItem.visible_reply_input = false

    //       // 해당 child 표시하기
    //       if (ProjectItem.seq_parent1 === item.seq_parent1 && item.group_layer === 0) {
    //         ProjectItem.visible_child = !item.visible_reply_input
    //       }
    //     }
    //   }

    //   // 3. 선택한 입력창 표시
    //   item.visible_reply_input = !item.visible_reply_input
    // },

    // // 좋아요/싫어요
    // likeIt (item, likeCd) {
    //   // 로그인 여부 체크, 로그인 모달 표시
    //   if (!this.getUid) {
    //     this.$refs.refLoginModal.show()
    //     return
    //   }

    //   // like_cd Y:좋아요 N:싫어요 null:중립
    //   // 1. 화면 조작
    //   if (likeCd === 'YES') { // 좋아요인 경우
    //     if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
    //       item.like_cd = null // 중립으로 설정
    //       item.like_cnt = Number(item.like_cnt) - 1
    //     } else {
    //       if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
    //         item.dislike_cnt = Number(item.dislike_cnt) - 1
    //       }
    //       item.like_cd = 'Y' // 좋아요로 설정
    //       item.like_cnt = Number(item.like_cnt) + 1
    //     }
    //   } else { // 싫어요인 경우
    //     if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
    //       item.like_cd = null // 중립으로 설정
    //       item.dislike_cnt = Number(item.dislike_cnt) - 1
    //     } else {
    //       if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
    //         item.like_cnt = Number(item.like_cnt) - 1
    //       }
    //       item.like_cd = 'N' // 싫어요로 설정
    //       item.dislike_cnt = Number(item.dislike_cnt) + 1
    //     }
    //   }

    //   // 2. 좋아요 테이블 저장
    //   const params = {
    //     uid: this.getUid,
    //     token_Project_seq: item.seq,
    //     like_cd: item.like_cd,
    //   }
    //   this.$axios.post('/api/tokenProject/mergeTokenProjectLike', params)
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       // this.$q.loading.hide() // 로딩 표시 종료
    //       if (result.data && result.data.resultCd === 'SUCCESS') {
    //         // console.log(result.data)
    //         // this.$noti(this.$q, this.$t('modify_token_Project_success'))
    //       } else {
    //         // this.$noti(this.$q, this.$t('modify_token_Project_failed'))
    //       }
    //     })
    //     .catch((err) => {
    //       // this.$q.loading.hide() // 로딩 표시 종료
    //       console.log(err)
    //       this.$noti(this.$q, err)
    //     })
    // },
    modify() {
      // 수정 확인창 표시
      this.confirmModifyProjectModal = true
    },
    doModify() {
      this.$router.push({ path: '/project/projectModify', query: { s: this.projectVo.seq }})
    },
    deleteProject() {
      // 삭제 확인창 표시
      this.confirmDeleteProjectModal = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteProject() {
      this.$q.loading.show() // 로딩 표시 시작

      const param = {
        seq: this.projectVo.seq,
      }
      this.$axios.post('/api/project/deleteProject', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('delete_success'))

            // 돌아가기
            this.$router.push('/project/projectList')
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 민트플랜 라스트 등록
    insertMintPlanList() {
      this.$q.loading.show() // 로딩 표시 시작

      const param = {
        project_seq: this.projectVo.seq,
      }
      this.$axios.post('/api/mintplan/insertMintPlanList', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('process_success'))
          } else {
            this.$noti(this.$q, this.$t('process_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
  }
})
</script>

<style scoped>
</style>
