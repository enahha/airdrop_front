<template>
  <q-page class="page-default page-1200 q-page-mini">
    <div class="q-pa-md">

      <div class="row justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
          {{ $t('admin_airdrop') }}
        </div>
      </div>

      <q-btn class="q-ml-lg" @click="goBack" label="Go Back" color="grey" no-caps />

      <br/>
      <br/>

      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">ETH {{ $t('nft_id') }}<span class="text-red"> *</span></span>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <q-input
            v-model="oldNftId"
            ref="refNftId"
            :rules="[required, isValidNftId]"
            clearable
            standout
            tabindex="1"
          />
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">SOLANA {{ $t('nft_id') }}<span class="text-red"> *</span></span>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <q-input
            v-model="newNftId"
            ref="refNftId"
            :rules="[required, isValidNftId]"
            clearable
            standout
            tabindex="1"
          />
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('user_wallet_address') }}<span class="text-red"> *</span></span>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-12">
          <q-input v-model="solanaWalletAddress" ref="refWalletAddress" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="row q-pt-lg">
        <div class="col-6 text-left">
          <!-- <q-btn @click="goBack" label="Go Back" color="grey" no-caps /> -->
        </div>
        <div class="col-6 text-right">
          <q-btn @click="doMinting" label="Mint One" color="primary" no-caps />
        </div>
      </div>

      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl">
      </div>
    </div>
  </q-page>

</template>

<script>
import { defineComponent } from 'vue'
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
      mintAmount: 1, // 일단 지금은 1개로 고정
      projectSeq: 1,
      solanaWalletAddress: '65rJdKhi1Cw82N4MU79spdwxozmUppu5LXQs4CDZVxeX',
      newNftId: '5',
      oldNftId: '2729',
      walletType: 'phantom',
      nftType: 'newkongz',
      symbol: '',
      payerSecretKey: '',
      sellerFeeBasisPoint: 0,
      collectionMint: '',

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
    nftIdRange() {
      switch (this.nftType.value) {
        case 'a':
          return { min: 3001, max: 4000 };
        case 's':
          return { min: 2001, max: 3000 };
        case 'r':
          return { min: 1001, max: 2000 };
        case 'v':
          return { min: 1, max: 1000 };
        default:
          return { min: 0, max: 0 };
      }
    },
    isNftFieldsDisabled() {
      return ['nft_contract_address_me100', 'nft_contract_address_me1500', 'nft_contract_address_me10000'].includes(this.selectedContractOption);
    },
  },
  watch: {
    new_mainnet: {
      handler: 'handleMainnetChange', // 변경 핸들러 호출
      immediate: true // 컴포넌트 마운트 시 즉시 트리거
    },
    nftType() {
      // Reset nftId if it is out of the new range
      const id = parseInt(this.nftId, 10);
      const { min, max } = this.nftIdRange;
      if (isNaN(id) || id < min || id > max) {
        this.nftId = '';
      }
      // Validate nftId after nftType changes
      this.$nextTick(() => {
        this.$refs.refNftId.validate();
      });
    },
    nftId(value) {
      // Trigger the validation on nftId change
      this.$refs.refNftId.validate();
    },
  },
  created: function () {
    // 키 설정
    this.tokenSeq = this.$route.query.seq
    // 토큰 정보 조회
    // this.selectToken()

    // 프로젝트 정보 조회
    // this.selectProject()

    // 키 벨류 조회
    this.selectKeyValue()

  },
  mounted() {
    // this.updateRange(); // Initialize the range based on the default nftType value
  },
  methods: {  
    contractUpdate(value) {
      this.selectedContractOption = value
    },
    selectProject() {
      const param = {
        seq: this.$OPERATE_PROJECT_SEQ,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          console.log(JSON.stringify(result.data))
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
    // 민팅 처리
    async doMinting() {
      /////////////////////////////////////////////////////////////////
      // 1. minting_log 테이블 insert
      /////////////////////////////////////////////////////////////////
      const paramMintingLog = {
        project_seq: this.projectSeq,
        wallet_address: this.solanaWalletAddress,
        wallet_type: this.walletType,
        nft_type: this.nftType,
        currency_symbol: '',
        reg_id: this.solanaWalletAddress,
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
      // 3. airdrop_log 테이블 조회
      /////////////////////////////////////////////////////////////////
      const paramAirdropLog = {
        newWalletAddress: this.solanaWalletAddress,
        ethNftId: this.oldNftId,
      }
      const resultAirdropLog = await this.$axios.get('/api/airdropLog/selectAirdropLog', { params: { ...paramAirdropLog }})
      const airdropLogObj = resultAirdropLog.data

      if (!resultAirdropLog || !resultAirdropLog.data) {
        this.$noti(this.$q, this.$t('process_failed') + ': resultAirdropLog')
        // 환불 처리
        // this.refund(projectSeq, walletAddress, walletType, nftType, currencySymbol, currencyContract, refundCurrencyAmount)
        return false
      }

      // 만약 조회한 resultAirdropLog의 status가 민팅(20)이라면 return
      if (airdropLogObj.status == 20) {
        console.log('이미 처리된 에어드랍입니다.')
        this.$noti(this.$q, this.$t('process_failed') + ': Airdrop has already been processed')
        return false
      }

      /////////////////////////////////////////////////////////////////
      // 3. nft_info 테이블 조회
      /////////////////////////////////////////////////////////////////
      const paramNftInfo = {
        projectSeq: this.projectSeq,
        nftId: this.newNftId,
      }
      const resultNftInfo = await this.$axios.get('/api/nftinfo/selectNftInfoById', { params: { ...paramNftInfo }})
      console.log(resultNftInfo.data)

      // 만약 조회한 nft id의 status가 처리중(10)이거나 이미 민팅(20)되었다면 return
      const nftStatus = resultNftInfo.data.status
      if (nftStatus === 10 || nftStatus === 20) {
        console.log('NFT는 처리중이거나 이미 민팅되었습니다.')
        this.$noti(this.$q, this.$t('process_failed') + ': NFT is already in progress or minted')
        return false
      }

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
        newMintingLogVo = await this.mintSolanaNftTest(nftInfoVo.nft_name
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
        // console.log(
        //   "NFT Verify Collection Signature : ",
        //   bs58.encode(verify.signature)
        // )
        console.log("End Verify Collection")

        // console.log("Create NFT Signature : ", bs58.encode(createdNft.signature))
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
    requiredRange(value) {
      return !!value || 'This field is required';
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true
      if (!this.$refs.refWalletAddress.validate()) {
        result = false
      }
      if (!this.$refs.refNftId.validate()) {
        result = false
      }
      return result
    },
    isValidNftId(value) {
      const id = parseInt(value, 10);
      const { min, max } = this.nftIdRange;
      if (isNaN(id) || id < min || id > max) {
        return `ID must be between ${min} and ${max}`;
      }
      return true;
    },
  //   handleMainnetChange() {
  //     this.isSolana = this.new_mainnet.value === 'SOLANA';
  //     if (this.isSolana) {
  //       this.new_contract_address = '';
  //     }
  //   },
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
        old_project_id : this.old_project_id,
        old_project_symbol: this.old_project_symbol,
        old_mainnet: this.old_mainnet.value,
        old_project_name : this.old_project_name,
        old_project_name_ko : this.old_project_name_ko,
        old_contract_address : this.old_contract_address,
        old_json_path: this.old_json_path,
        old_admin_wallet_address: this.old_admin_wallet_address,
        old_project_image : this.old_project_image,
        new_project_id : this.new_project_id,
        new_project_symbol: this.new_project_symbol,
        new_mainnet: this.new_mainnet.value,
        new_project_name : this.new_project_name,
        new_project_name_ko : this.new_project_name_ko,
        new_contract_address : this.new_contract_address,
        new_json_path: this.new_json_path,
        new_admin_wallet_address: this.new_admin_wallet_address,
        new_project_image : this.new_project_image,
        description : this.description,
        description_ko : this.description_ko,
        fee : this.fee
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
    oldProjectImageFileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.old_project_image = fileNameNew // 토큰 로고 URL 설정
      // this.$refs.uploaderObj.reset()
    },
    newProjectImageFileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.new_project_image = fileNameNew // 토큰 로고 URL 설정
      // this.$refs.uploaderObj.reset()
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
:deep(.material-icons) {
  font-family: 'Material Icons' !important;
}
.radio-spacing {
  margin-left: 30px;
}
</style>
