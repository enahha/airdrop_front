<template>
    <q-page class="page-1200 project-list-wrap">
      <div class="row q-pt-md q-pl-md justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
          NFT 에어드랍
        </div>
      </div>
  
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
  
      <!-- 프로젝트 등록 -->
      <div class="row justify-center q-pt-lg">
        <div class="col-12 text-white">
          <h3>1. 프로젝트 선택</h3>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <q-select
            v-model="collectionData"
            :options="projectList"
            option-label="project_name"
            label="프로젝트를 선택하세요"
            filled
            class="q-mb-md"
            style="width: 98%"
        />
      </div>

      <!-- 선택된 프로젝트 정보 -->
      <div class="row justify-center q-pt-lg">
      <div class="col-12 text-white">
          <h3>선택된 프로젝트 정보</h3>
      </div>
      <div v-if="collectionData"  class="col-12 q-pa-md text-left text-white">
          <q-card flat bordered class="q-pa-md col-12">
          <q-card-section>
              <p><strong>Project Symbol: &nbsp;&nbsp;</strong> {{ collectionData.project_symbol }}</p>
              <p><strong>Project Name: &nbsp;&nbsp;</strong> {{ collectionData.project_name }}</p>
              <p><strong>Mainnet: &nbsp;&nbsp;</strong> {{ collectionData.mainnet }}</p>
              <p><strong>JSON Path: &nbsp;&nbsp;</strong> {{ collectionData.json_path }}</p>
              <p><strong>Admin Wallet Address: &nbsp;&nbsp;</strong> {{ collectionData.admin_wallet_address }}</p>
              <p><strong>Fee Wallet Secret Key: &nbsp;&nbsp;</strong> {{ collectionData.fee_wallet_secret_key }}</p>
              <p><strong>Seller Fee Basis Point: &nbsp;&nbsp;</strong> {{ collectionData.seller_fee_basis_point }}</p>
              <p><strong>Collection Address: &nbsp;&nbsp;</strong> {{ collectionData.contract_address }}</p>
              <p><strong>Bubblegum Tree Address: &nbsp;&nbsp;</strong> {{ collectionData.bubblegum_tree_address }}</p>
          </q-card-section>
          </q-card>
      </div>
      <div v-else class="col-12 q-pa-md text-left text-white">
          None
      </div>
      </div>

      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>

      <!-- 민팅 데이터 입력 mintToCollectionV1 ver -->
      <div class="row justify-center q-pt-lg">
        <div class="col-12 text-white">
          <h3>Minting Data mintToCollectionV1 ver</h3>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-6 text-white">
          <label>{{ $t("NFT Name") }} ex) Test #1</label>
          <q-input
            v-model="nftData.name"
            outlined
          />
        </div>
        <div class="col-6 text-white">
          <label>{{ $t("NFT URI") }}</label>
          <q-input
            v-model="nftData.uri"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label>{{ $t("Token Owner Address") }}</label>
          <q-input
            v-model="nftData.tokenOwner"
            outlined
          />
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <div class="col-6 text-left">
          <q-btn
            class="btn"
            color="primary"
            text-color="black"
            size="lg"
            style="width: 98%"
            @click="mintSolanaNftBubblegum()"
          >
            {{ $t("Mint Solana NFT") }}
          </q-btn>
        </div>
      </div>
        
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
  
      <div class="col-12 flex justify-between">
        <q-btn class="q-ml-lg" @click="this.$router.go(-1)" label="Go Back" color="grey" no-caps />
        <!-- <q-btn class="q-ml-lg" @click="this.$router.push('/admin/createCollection')" label="Next" color="purple" no-caps /> -->
      </div>
      
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import bs58 from 'bs58';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, keypairIdentity, percentAmount, TransactionBuilder, some, none } from "@metaplex-foundation/umi";
import { setComputeUnitLimit, setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox';
import { createNft, mplTokenMetadata, fetchDigitalAsset, collectionAuthorityRecordPda, verifyCollectionV1, findMetadataPda, burnV1, TokenStandard  } from "@metaplex-foundation/mpl-token-metadata";
import { createTree, mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction, findLeafAssetIdPda, getAssetWithProof, verifyCollection, updateMetadata, mintV1, mplBubblegum, getCurrentRoot, fetchMerkleTree, setTreeDelegate   } from '@metaplex-foundation/mpl-bubblegum'
import Web3 from 'web3';

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
        keyword: '',
        pageSize: 1000,
        collectionData: null,
        collectionAddress: '',
        bubbleGumTreeAddress: '',
        projectList: [],
        nftData: {
          name: 'Test #1',
          uri: 'https://punkykongz.com/nft/skongz/json/1.json',
          tokenOwner: 'B9C4gGDi9zB4EfkVooGFL5Cc37w5YtxxULfstTVuhZPz',
        },
    };
},
created: function () {
    this.selectList(1, null)
},
methods: {
    // 신규 토큰 리스트 조회
    selectList(idx, done) {
      this.$axios.get('/api/project/selectProjectList',
        {params: {pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.projectList = [] // 리스트 초기화
          }
          this.projectList = this.projectList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.projectList || this.projectList.length < 1) {
            this.noDataFlag = true
          } else {
            this.noDataFlag = false
          }
          if (done) {
            done()
          }
        })
        .catch((err) => {
          console.log(err)
          if (done) {
            done()
          }
        })
    },
    // 버블검 트리 가져오기
    async getBubblegumTree() {
      try {
          console.log("■■■■■■■ Get Bubblegum Tree Info ■■■■■■■ START")

          // 1. UMI 인스턴스 생성 및 네트워크 설정
          const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())

          // // 2. Payer 설정 (지갑 비밀키 사용)
          // const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey))
          // umi.use(keypairIdentity(payer))
          // console.log("Payer account:", payer.publicKey)

          // // 3. 트리 계정 생성
          // const merkleTree = generateSigner(umi)
          // console.log("Generated Tree account:", merkleTree.publicKey)

          const merkleTreeAccount = await fetchMerkleTree(umi, this.bubbleGumTreeAddress)

          // 트리 존재 여부 확인
          const treeExists = merkleTreeAccount?.header?.exists === true

          console.log("merkleTreeAccount:", merkleTreeAccount)
          console.log("merkleTreeAccount Exists? >>> ", treeExists)
          console.log("■■■■■■■ Get Bubblegum Tree Info ■■■■■■■ END")

      } catch (error) {
          console.error("Error creating Bubblegum Tree:", error)
          return null
      }
    },
    // 버블검 트리 권한 위임
    async setTreeDelegate() {
      try {
          console.log("■■■■■■■ set Bubblegum Tree Delegate ■■■■■■■ START")

          // 1. UMI 인스턴스 생성 및 네트워크 설정
          const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())

          // 2. Payer 설정 (지갑 비밀키 사용)
          const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey))
          umi.use(keypairIdentity(payer))
          console.log("Payer account:", payer.publicKey)

          // // 3. 트리 계정 생성
          // const merkleTree = generateSigner(umi)
          // console.log("Generated Tree account:", merkleTree.publicKey)

          const setTreeDelegateResult = await setTreeDelegate(umi, {
                                                                  merkleTree: this.bubbleGumTreeAddress,
                                                                  treeCreator: payer.publicKey,
                                                                  newTreeDelegate: this.keywordDelegateAddress,
                                                              }).sendAndConfirm(umi)

          console.log("setTreeDelegate:", bs58.encode(new Uint8Array(setTreeDelegateResult.signature)))
          console.log("■■■■■■■ set Bubblegum Tree Delegate ■■■■■■■ END")

      } catch (error) {
          console.error("Error creating Bubblegum Tree:", error)
          return null
      }
    },
    // mintToCollectionV1을 이용한 민팅(따로 컬렉션 검증이 필요없음)
    async mintSolanaNftBubblegum() {
      try {
          console.log("■■■■■■■ mintSolana CNFT Test START ■■■■■■■")

          // Umi 인스턴스 생성 및 설정
          const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata())
          const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.collectionData.fee_wallet_secret_key))
          umi.use(keypairIdentity(payer))

          // 필요한 PublicKey 생성
          const collectionMint = new PublicKey(this.collectionData.contract_address)
          const leafOwner = new PublicKey(this.nftData.tokenOwner)
          const merkleTree = new PublicKey(this.collectionData.bubblegum_tree_address)
          const name = this.nftData.name
          const symbol = this.collectionData.project_symbol
          const uri = this.nftData.uri
          const sellerFee = Number(this.collectionData.seller_fee_basis_point) * 100  // 문자열 5로 들어오면 -> int 500이렇게 바뀌여야함

          // 트랜잭션 빌더 생성
          let builder = new TransactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 500_000 }))
          .add(setComputeUnitPrice(umi, { microLamports: 10 }))
          .add(
              mintToCollectionV1(umi, {
              leafOwner,
              merkleTree,
              collectionMint,
              collectionAuthority: payer.publicKey,
              metadata: {
                  name,
                  symbol,
                  uri,
                  sellerFeeBasisPoints: sellerFee,
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

          // 최신 블록 해시 설정
          builder = await builder.setLatestBlockhash(umi)

          // 트랜잭션 빌드 및 서명
          const transaction = await builder.buildAndSign(umi)

          // 트랜잭션 전송 및 확인
          const signatureArray = await umi.rpc.sendTransaction(transaction, { commitment: "finalized" })

          const signature = bs58.encode(new Uint8Array(signatureArray))

          console.log("Minted CNFT Transaction Signature:", signature)

          // 트랜잭션에서 Leaf 데이터 추출
          // CNFT의 Asset ID 가져오기
          const leaf = await this.parseLeafWithRetries(umi, signatureArray)
          const assetId = leaf.id
          console.log('CNFT Asset ID >>>>> ', assetId)
          console.log('CNFT signature >>>>> ', signature)

          console.log("CNFT Minting Completed Successfully")
          // return {
          //   mint_account_key: assetId,
          //   create_nft_signature: signature,
          // }
      } catch (error) {
          console.error("Error minting CNFT:", error)
      }
    },
    async parseLeafWithRetries(umi, signature, retries = 100, delay = 2000) {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
            const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature)
            if (leaf) {
                return leaf
            }
            } catch (error) {
            console.warn(`Attempt ${attempt + 1} failed:`, error)
            }
            await new Promise(resolve => setTimeout(resolve, delay)) // 대기 후 재시도
        }
        throw new Error("Failed to parse leaf after multiple attempts")
    },
    async getCNFTAssetId(umi, signature, merkleTree) {
        // 트랜잭션에서 리프 정보 추출
        const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature)
        console.log('Leaf Info:', leaf)

        // Asset ID 조회
        const assetId = findLeafAssetIdPda(umi, {
            merkleTree,
            leafIndex: leaf.nonce
        })
        console.log('CNFT Asset ID:', assetId)

        return assetId[0]
    },
},
});
</script>

<style scoped></style>