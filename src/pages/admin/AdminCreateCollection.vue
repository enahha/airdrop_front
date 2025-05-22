<template>
    <q-page class="page-1200 project-list-wrap">
      <div class="row q-pt-md q-pl-md justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
          컬렉션 및 트리 생성
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
                <p><strong>Project Symbol:</strong> {{ collectionData.project_symbol }}</p>
                <p><strong>Project Name:</strong> {{ collectionData.project_name }}</p>
                <p><strong>Mainnet:</strong> {{ collectionData.mainnet }}</p>
                <p><strong>JSON Path:</strong> {{ collectionData.json_path }}</p>
                <p><strong>Admin Wallet Address:</strong> {{ collectionData.admin_wallet_address }}</p>
                <p><strong>Fee Wallet Secret Key:</strong> {{ collectionData.fee_wallet_secret_key }}</p>
                <p><strong>Seller Fee Basis Point:</strong> {{ collectionData.seller_fee_basis_point }}</p>
            </q-card-section>
            </q-card>
        </div>
        <div v-else class="col-12 q-pa-md text-left text-white">
            None
        </div>
        </div>

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl"></div>

        <!-- 컬렉션 생성 -->
        <div class="col-12 text-white">
            <h3>2. 컬렉션 생성</h3>
        </div>
        <div class="row justify-center q-pt-lg">
            <div class="col-6 text-left">
            <q-btn
                class="btn"
                color="primary"
                text-color="black"
                size="lg"
                style="width: 98%"
                @click="mintSolanaCollection()"
            >
                컬렉션 생성
            </q-btn>
            </div>
        </div>
        <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label> >> 생성된 컬렉션 주소</label>
          <q-input
            v-if="collectionData && collectionData.contract_address"
            v-model="collectionData.contract_address"
            outlined
            :readonly="true"
          />
          <q-input
            v-else
            v-model="collectionAddress"
            outlined
            :readonly="true"
          />
        </div>
        </div>

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl"></div>

        <!-- 컬렉션 생성 -->
        <div class="col-12 text-white">
            <h3>3. 버블검 트리 주소 생성</h3>
        </div>
        <div class="row justify-center q-pt-lg">
            <div class="col-6 text-left">
            <q-btn
                class="btn"
                color="positive"
                text-color="black"
                size="lg"
                style="width: 98%"
                @click="createBubblegumTree()"
            >
                트리주소 생성
            </q-btn>
            </div>
        </div>
        <div class="row justify-center q-pt-md">
        <div class="col-12 text-white">
          <label> >> 생성된 트리주소</label>
          <q-input
            v-if="collectionData && collectionData.bubblegum_tree_address"
            v-model="collectionData.bubblegum_tree_address"
            outlined
            :readonly="true"
          />
          <q-input
            v-else
            v-model="bubbleGumTreeAddress"
            outlined
            :readonly="true"
          />
        </div>
        </div>
  
      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl"></div>
  
      <div class="col-12 flex justify-between">
        <q-btn class="q-ml-lg" @click="this.$router.go(-1)" label="Go Back" color="grey" no-caps />
        <q-btn class="q-ml-lg" @click="this.$router.push('/admin/adminAirdrop')" label="Next" color="purple" no-caps />
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
    // 컬렉션 생성
    async mintSolanaCollection() {
      try {
        console.log("■■■■■■■ mintSolanaCollection Test ■■■■■■■ START");
        const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.collectionData.fee_wallet_secret_key))
        umi.use(keypairIdentity(payer));



        const collectionMint = generateSigner(umi);
        console.log("Collection mint account : ", collectionMint.publicKey)

        const createdCollection = await createNft(umi, {
          mint: collectionMint,
          name: this.collectionData.project_name,
          symbol: this.collectionData.project_symbol,
          uri: this.collectionData.json_path,
          sellerFeeBasisPoints: percentAmount(5),
          creators: [
            {
              address: payer.publicKey,
              verified: true,
              share: 100,
            },
          ],
          authority: payer.publicKey,
          tokenOwner: payer.publicKey,
          isCollection: true,
        }).sendAndConfirm(umi);

        console.log(
          "Create Collection : ",
          createdCollection
        )
        console.log(
          "Create Collection Signature : ",
          bs58.encode(createdCollection.signature)
        )
        console.log(
          "Create Collection mint address : ",
          createdCollection.publicKey
        )
        console.log("■■■■■■■ mintSolanaCollection Test ■■■■■■■ END")

        this.collectionAddress = collectionMint.publicKey

        this.updateProjectCollectionAddress()

      } catch (error) {
        console.error("Error minting Solana Collection:", error);
      }
    },
    // 버블검 트리 생성
    async createBubblegumTree() {
        try {
            console.log("■■■■■■■ Creating Bubblegum Tree ■■■■■■■ START");

            // 1. UMI 인스턴스 생성 및 네트워크 설정
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());

            // 2. Payer 설정 (지갑 비밀키 사용)
            const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.collectionData.fee_wallet_secret_key));
            umi.use(keypairIdentity(payer));
            console.log("Payer account:", payer.publicKey);

            // 3. 트리 계정 생성
            const merkleTree = generateSigner(umi);
            console.log("Generated Tree account:", merkleTree.publicKey);

            // 트리 생성자가 올바르게 설정되었는지 확인
            const treeCreator = payer.publicKey;
            console.log("Tree Creator:", treeCreator);

            // 4. Bubblegum 트리 생성
            const tx = await createTree(umi, {
                merkleTree,
                maxDepth: 14,
                maxBufferSize: 64,
                // public: false,
                treeCreator: treeCreator
            });

            // 트랜잭션 전송 및 확인
            await tx.sendAndConfirm(umi);
            console.log("Tree Address:", merkleTree.publicKey);
            console.log("■■■■■■■ Bubblegum Tree Created ■■■■■■■ END");

            // 트리 주소 저장
            this.bubbleGumTreeAddress = merkleTree.publicKey

            this.updateProjectBubblegumTreeAddress()

        } catch (error) {
            console.error("Error creating Bubblegum Tree:", error);
            return null;
        }
    },
    // 컬렉션 주소 업데이트
    updateProjectCollectionAddress() {
      this.$q.loading.show() // 로딩 표시 시작

      // 공지사항 수정 처리
      const param = {
        seq: this.collectionData.seq,
        contract_address: this.collectionAddress,
       }
      console.log(param)
      this.$axios.post('/api/project/updateProjectCollectionAddress', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 버블검 주소 업데이트
    updateProjectBubblegumTreeAddress() {
      this.$q.loading.show() // 로딩 표시 시작

      // 공지사항 수정 처리
      const param = {
        seq: this.collectionData.seq,
        bubblegum_tree_address: this.bubbleGumTreeAddress,
       }
      console.log(param)
      this.$axios.post('/api/project/updateProjectBubblegumTreeAddress', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('modify_success'))
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 버블검 트리 가져오기
    async getBubblegumTree() {
        try {
            console.log("■■■■■■■ Get Bubblegum Tree Info ■■■■■■■ START");

            // 1. UMI 인스턴스 생성 및 네트워크 설정
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());

            // // 2. Payer 설정 (지갑 비밀키 사용)
            // const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            // umi.use(keypairIdentity(payer));
            // console.log("Payer account:", payer.publicKey);

            // // 3. 트리 계정 생성
            // const merkleTree = generateSigner(umi);
            // console.log("Generated Tree account:", merkleTree.publicKey);

            const merkleTreeAccount = await fetchMerkleTree(umi, this.bubbleGumTreeAddress)

            // 트리 존재 여부 확인
            const treeExists = merkleTreeAccount?.header?.exists === true

            console.log("merkleTreeAccount:", merkleTreeAccount);
            console.log("merkleTreeAccount Exists? >>> ", treeExists);
            console.log("■■■■■■■ Get Bubblegum Tree Info ■■■■■■■ END");

        } catch (error) {
            console.error("Error creating Bubblegum Tree:", error);
            return null;
        }
    },
    // 버블검 트리 권한 위임
    async setTreeDelegate() {
        try {
            console.log("■■■■■■■ set Bubblegum Tree Delegate ■■■■■■■ START");

            // 1. UMI 인스턴스 생성 및 네트워크 설정
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());

            // 2. Payer 설정 (지갑 비밀키 사용)
            const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            umi.use(keypairIdentity(payer));
            console.log("Payer account:", payer.publicKey);

            // // 3. 트리 계정 생성
            // const merkleTree = generateSigner(umi);
            // console.log("Generated Tree account:", merkleTree.publicKey);

            const setTreeDelegateResult = await setTreeDelegate(umi, {
                                                                    merkleTree: this.bubbleGumTreeAddress,
                                                                    treeCreator: payer.publicKey,
                                                                    newTreeDelegate: this.keywordDelegateAddress,
                                                                }).sendAndConfirm(umi)

            console.log("setTreeDelegate:", bs58.encode(new Uint8Array(setTreeDelegateResult.signature)));
            console.log("■■■■■■■ set Bubblegum Tree Delegate ■■■■■■■ END");

        } catch (error) {
            console.error("Error creating Bubblegum Tree:", error);
            return null;
        }
    },
    // mintToCollectionV1을 이용한 민팅(따로 컬렉션 검증이 필요없음)
    async mintSolanaNftBubblegum() {
        try {
            console.log("■■■■■■■ mintSolana CNFT Test START ■■■■■■■");

            // Umi 인스턴스 생성 및 설정
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());
            const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            umi.use(keypairIdentity(payer));

            // 필요한 PublicKey 생성
            const collectionMint = new PublicKey(this.nftData.collectionMint);
            const leafOwner = new PublicKey(this.nftData.tokenOwner);
            const merkleTree = new PublicKey(this.bubbleGumTreeAddress);
            const name = this.nftData.name
            const symbol = this.nftData.symbol
            const uri = this.nftData.uri

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
                    sellerFeeBasisPoints: 500,
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
            );

            // 최신 블록 해시 설정
            builder = await builder.setLatestBlockhash(umi);

            // 트랜잭션 빌드 및 서명
            const transaction = await builder.buildAndSign(umi);

            // 트랜잭션 전송 및 확인
            const signatureArray = await umi.rpc.sendTransaction(transaction, { commitment: "finalized" })

            const signature = bs58.encode(new Uint8Array(signatureArray));

            console.log("Minted CNFT Transaction Signature:", signature);

            // 트랜잭션에서 Leaf 데이터 추출
            // CNFT의 Asset ID 가져오기
            const leaf = await this.parseLeafWithRetries(umi, signatureArray)
            const assetId = leaf.id
            console.log('CNFT Asset ID >>>>> ', assetId)
            console.log('CNFT signature >>>>> ', signature)

            console.log("CNFT Minting Completed Successfully");
            // return {
            //   mint_account_key: assetId,
            //   create_nft_signature: signature,
            // };
        } catch (error) {
            console.error("Error minting CNFT:", error);
        }
    },
    // mintV1을 통한 민팅 (에러남)
    async mintSolanaNftBubblegumMintV1() {
        try {
            console.log("■■■■■■■ mintSolana CNFT Test START ■■■■■■■");

            const DAS_URL = 'https://devnet.irys.xyz';

            // 기본 설정
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());
            const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            umi.use(keypairIdentity(payer));
            console.log("Payer account:", payer.publicKey);
            const collectionKey = new PublicKey(this.nftData.collectionMint);

            const leafOwner = new PublicKey(this.nftData.tokenOwner);
            const merkleTree = new PublicKey(this.bubbleGumTreeAddress);

            console.log("Minting CNFT...");

            // 트랜잭션 빌더 생성 및 컴퓨팅 리소스 설정 추가
            const transactionBuilder = new TransactionBuilder()
            .add(setComputeUnitLimit(umi, { units: 400_000 })) // 컴퓨팅 유닛 한도 설정
            .add(setComputeUnitPrice(umi, { microLamports: 1 })); // 우선순위 높이기 위해 수수료 설정

            // CNFT 민팅 트랜잭션 추가
            const { signature } = await transactionBuilder
            .add(
                mintV1(umi, {
                leafOwner,
                merkleTree,
                metadata: {
                    name: this.nftData.name,
                    uri: this.nftData.uri,
                    sellerFeeBasisPoints: 500,
                    collection: { key: this.nftData.collectionMint, verified: false },
                    creators: [
                    {
                        address: payer.publicKey,
                        verified: false,
                        share: 100,
                        },
                        ],
                    },
                    })
                )
                .sendAndConfirm(umi, { commitment: "finalized" });

            console.log("Minted CNFT Transaction Signature:", bs58.encode(signature));

            // Leaf 데이터 추출
            const leaf = await this.parseLeafWithRetries(umi, signature);
            const assetId = findLeafAssetIdPda(umi, {
            merkleTree: merkleTree,
            leafIndex: leaf.nonce,
            })
            console.log('Compressed NFT Asset ID:', assetId.toString())

            // 3. Asset 정보와 증명 데이터 가져오기
            console.log("Fetching asset with proof...");

            // Fetch the asset using umi rpc with DAS.
            const asset = await umi.rpc.getAsset(assetId[0])
            console.log({ asset })

            const assetWithProof = await getAssetWithProof(umi, assetId[0], {truncateCanopy: true});

            // 4. 컬렉션 설정 및 검증
            console.log("Setting and verifying collection...");
            const { signature: verifySignature } = await verifyCollection(umi, {
            ...assetWithProof,
            // treeCreatorOrDelegate: payer.publicKey,
            collectionMint: collectionKey,
            collectionAuthority: umi.identity,
            }).sendAndConfirm(umi, { commitment: 'finalized' });


            console.log("Verified Collection Signature:", bs58.encode(verifySignature));
            console.log("Collection successfully set and verified.");

            console.log("■■■■■■■ CNFT Minting Completed ■■■■■■■");

        } catch (error) {
            console.error("Error minting CNFT:", error);
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
    async getCNFTAssetId(umi, signature, merkleTree) {
        // 트랜잭션에서 리프 정보 추출
        const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature);
        console.log('Leaf Info:', leaf);

        // Asset ID 조회
        const assetId = findLeafAssetIdPda(umi, {
            merkleTree,
            leafIndex: leaf.nonce
        });
        console.log('CNFT Asset ID:', assetId);

        return assetId[0]
    },
    async burnSolanaCollection() {
        try {
            console.log("■■■■■■■ Burn Solana Collection ■■■■■■■ START");

            // 1. UMI 인스턴스 생성
            const umi = createUmi(this.$SOLANA_NETWORK).use(mplTokenMetadata());

            // 2. Payer 설정 (NFT 소유자)
            const owner = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            umi.use(keypairIdentity(owner));

            console.log("Mint Address to burn:", this.keywordMintAddress);
            console.log("Owner Public Key:", owner.publicKey);

            // 3. NFT 삭제 트랜잭션 실행
            const burnTx = await burnV1(umi, {
            mint: this.keywordMintAddress,
            authority: owner, // Authority 계정
            tokenOwner: owner.publicKey, // NFT 소유자
            tokenStandard: TokenStandard.NonFungible, // NFT 표준
            }).sendAndConfirm(umi);

            console.log("Burn Transaction Signature:", bs58.encode(new Uint8Array(burnTx.signature)));
            console.log("■■■■■■■ Burn Solana Collection ■■■■■■■ END");
        } catch (error) {
            console.error("Error burning Solana Collection:", error);
        }
    },
    async transferSolanaNft() {
        try {
            console.log("■■■■■■■ transferSolanaNft Test ■■■■■■■ START");
            const connection = new Connection(this.$SOLANA_NETWORK, 'confirmed');
            const payer = Keypair.fromSecretKey(bs58.decode(this.payerSecretKey));
            const mintPublicKey = new PublicKey(this.solanaTransferMintAddress);
            const recipientPublicKey = new PublicKey(this.solanaTransferAddress);

            console.log("mintPublicKey : ", this.solanaTransferMintAddress);
            console.log("recipientPublicKey : ", this.solanaTransferAddress);

            const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPublicKey,
            payer.publicKey
            );
            const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPublicKey,
            recipientPublicKey
            );

            // Transfer the token
            const signature = await transfer(
            connection,
            payer,
            payerTokenAccount.address,
            recipientTokenAccount.address,
            payer,
            1, // Amount to transfer (for NFTs, typically 1)
            [],
            TOKEN_PROGRAM_ID
            );

            console.log("Transfer NFT Signature : ", signature);
            console.log("■■■■■■■ transferSolanaNft Test ■■■■■■■ END");
        } catch (error) {
            console.error("Error transferring Solana NFT:", error);
        }
    },
    // async fetchEthereumNftList() {
    //   try 
    //   {
    //     const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
    //     console.log('provider : ', provider);
    //     const contract = new ethers.Contract(this.contractAddress, this.$ERC721_ABI, provider);
    //     console.log('contract : ', contract);

    //     // 사용자가 소유한 NFT의 총 개수를 가져옵니다.
    //     const balance = await contract.balanceOf(this.walletAddress);
    //     console.log(`Total NFTs owned: ${balance.toString()}`);
        
    //     if (balance > 0) {
    //       let ownedTokenIds = [];
    //       // 모든 토큰 ID를 순회하며 소유자가 일치하는 토큰을 가져옵니다.
    //       const totalSupply = await contract.totalSupply();
    //       for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
    //         try {
    //           const owner = await contract.ownerOf(tokenId);
    //           if (owner.toLowerCase() === this.walletAddress.toLowerCase()) {
    //             ownedTokenIds.push(tokenId.toString());
    //             console.log(`Token ID owned by ${this.walletAddress}: ${tokenId}`);
    //           }
    //         } catch (error) {
    //           console.error(`Failed to fetch owner of token ID ${tokenId}:`, error);
    //         }
    //       }
    //       console.log('Owned Token IDs:', ownedTokenIds);
    //     } else {
    //       console.log('No NFTs owned by this address');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching NFT details:', error);
    //     throw error;
    //   }
    // },    
    async fetchEthereumNftList() {
        const ownerAddress = this.walletAddress
        const contractAddress = this.contractAddress
        
        const apiKey = "wspRO3sE6afxI_nRqFoKLsz6sLDielYd"; // Alchemy API 키
        const url = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;

        try {
            const response = await this.$axios.get(url, {
                params: {
                    owner: ownerAddress,
                    contractAddresses: [contractAddress]
                }
            });

            console.log("사용자가 소유한 특정 컨트랙트의 NFT:", response.data)

            this.ownNftList = response.data.ownedNfts


            console.log('this.ownNftList')
            console.log(this.ownNftList)
        } catch (error) {
            console.error("NFT 조회 중 오류 발생:", error)
        }
    },    
    async isValidSolanaAddress(address) {
        try {
            let key = new PublicKey(address);
            return PublicKey.isOnCurve(key.toBuffer())
        } catch (error) {
            console.log('error : ', error)
            return false
        }
    },
    async fetchAssetWithRetries(umi, publicKey, retries = 5, delay = 100) {
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


    toggleSelectAll() {
        this.ownNftList.forEach(nft => {
            nft.selected = this.selectAll
        })
    },

    async updateBubblegumMetadata() {
        try {
            console.log("■■■■■■■ Updating Bubblegum CNFT Metadata ■■■■■■■ START");

            // 1. UMI 인스턴스 생성 및 네트워크 설정
            const umi = createUmi(this.solanaNetwork)
            .use(mplTokenMetadata())
            .use(mplBubblegum());

            const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
            umi.use(keypairIdentity(payer));

            const leafOwner = new PublicKey(this.nftData.tokenOwner);
            const collectionMint = new PublicKey(this.nftData.collectionMint);
            const assetId = new PublicKey(this.updateData.assetId);

            // 2. Proof 가져오기 (도우미 메서드 사용)
            const assetWithProof = await getAssetWithProof(umi, assetId, { truncateCanopy: true });
            console.log("Current Metadata :", assetWithProof.metadata);

            // 3. 업데이트할 메타데이터 설정
            const updateArgs = {
            name: some(this.updateData.name),
            uri: some(this.updateData.uri),
            };

            // 4. 메타데이터 업데이트 (도우미 메서드 사용)
            const { signature } = await updateMetadata(umi, {
            ...assetWithProof,
            leafOwner,
            currentMetadata: assetWithProof.metadata,
            updateArgs,
            authority: payer,
            collectionMint: collectionMint,
            }).sendAndConfirm(umi);

            console.log("Updated Metadata Transaction Signature:", bs58.encode(signature));

            console.log("■■■■■■■ CNFT Metadata Update Completed ■■■■■■■ END");
        } catch (error) {
            console.error("Error updating CNFT metadata:", error);
        }
    },
},
});
</script>

<style scoped></style>