<template>
  <q-page class="page-1200 project-list-wrap">
    <div class="row q-pt-md q-pl-md justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t("test") }}
      </div>
    </div>
    <div class="row q-pl-md row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t("test..") }}
      </div>
    </div>

    <!-- 솔라나 주소 입력 및 유효성 검사 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-8 text-white">
        <label>{{ $t("Enter Solana address") }}</label>
        <q-input
          v-model="solanaAddress"
          outlined
        />
      </div>
      <div class="col-4">
        <q-btn
          class="btn"
          color="primary"
          text-color="black"
          size="lg"
          @click="checkAddress()"
        >
          {{ $t("Check Address") }}
        </q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div v-if="!isSolanaAddressValid" class="text-red">
        Invalid Solana address
      </div>
      <div v-if="isSolanaAddressValid" class="text-green">
        Valid Solana address
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>

    <!-- 민팅 데이터 입력 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-white">
        <h3>Minting Data</h3>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-white">
        <label>{{ $t("NFT Name") }}</label>
        <q-input
          v-model="nftData.name"
          outlined
        />
      </div>
      <div class="col-6 text-white">
        <label>{{ $t("NFT Symbol") }}</label>
        <q-input
          v-model="nftData.symbol"
          outlined
        />
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div class="col-6 text-white">
        <label>{{ $t("NFT URI") }}</label>
        <q-input
          v-model="nftData.uri"
          outlined
        />
      </div>
      <div class="col-6 text-white">
        <label>{{ $t("Seller Fee Basis Points") }}</label>
        <q-input
          v-model="nftData.sellerFeeBasisPoints"
          type="number"
          outlined
        />
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div class="col-6 text-white">
        <label>{{ $t("Token Owner Address") }}</label>
        <q-input
          v-model="nftData.tokenOwner"
          outlined
        />
      </div>
      <div class="col-6 text-white">
        <label>{{ $t("Collection Mint Address") }}</label>
        <q-input
          v-model="nftData.collectionMint"
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
          @click="mintSolanaNftTest()"
        >
          {{ $t("Mint Solana NFT") }}
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>

    <!-- 컬렉션 데이터 입력 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-white">
        <h3>Collection Data</h3>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-white">
        <label>{{ $t("Collection Name") }}</label>
        <q-input
          v-model="collectionData.name"
          outlined
        />
      </div>
      <div class="col-6 text-white">
        <label>{{ $t("Collection Symbol") }}</label>
        <q-input
          v-model="collectionData.symbol"
          outlined
        />
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div class="col-12 text-white">
        <label>{{ $t("Collection URI") }}</label>
        <q-input
          v-model="collectionData.uri"
          outlined
        />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn
          class="btn"
          color="secondary"
          text-color="black"
          size="lg"
          style="width: 98%"
          @click="mintSolanaCollection()"
        >
          {{ $t("Mint Solana Collection") }}
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>

    <!-- 에어드랍 기능 추가 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12 text-white">
        <h3>Transfer Solana NFT</h3>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-white">
        <label>{{ $t("Recipient Wallet Address") }}</label>
        <q-input
          v-model="solanaTransferAddress"
          outlined
        />
      </div>
      <div class="col-6 text-white">
        <label>{{ $t("NFT Mint Address to Transfer") }}</label>
        <q-input
          v-model="solanaTransferMintAddress"
          outlined
        />
      </div>
      <div class="col-6 text-left">
        <q-btn
          class="btn"
          color="warning"
          text-color="black"
          size="lg"
          style="width: 98%"
          @click="transferSolanaNft()"
        >
          {{ $t("Transfer Solana NFT") }}
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>

    <!-- 이더리움 주소 입력 및 유효성 검사 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-8 text-white">
        <label>{{ $t("Enter Ethereum address") }}</label>
        <q-input
          v-model="ethereumAddress"
          outlined
        />
      </div>
      <div class="col-4">
        <q-btn
          class="btn"
          color="primary"
          text-color="black"
          size="lg"
          @click="checkEthereumAddress()"
        >
          {{ $t("Check Address") }}
        </q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <div v-if="!isEthereumAddressValid" class="text-red">
        Invalid Ethereum address
      </div>
      <div v-if="isEthereumAddressValid" class="text-green">
        Valid Ethereum address
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>
    
    <!-- Wallet Address Input -->
    <div class="row justify-center q-pt-lg">
      <div class="col-8 text-white">
        <label>{{ $t("Enter Wallet Address") }}</label>
        <q-input
          v-model="walletAddress"
          outlined
        />
      </div>
      <div class="col-4">
        <q-btn
          class="btn"
          color="primary"
          text-color="black"
          size="lg"
          @click="fetchEthereumNftList()"
        >
          {{ $t("Fetch NFTs") }}
        </q-btn>
      </div>
      <div class="text-green">
        Get nft list
      </div>
    </div>
    <div class="text-white q-pa-xl">
      <h1>사용자가 소유한 NFT 목록</h1>
      <div>
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /> 전체 선택 / 취소
      </div>
      <div v-if="ownNftList.length > 0">
        <div v-for="(nft, index) in ownNftList" :key="index" class="nft-item q-pa-xl">
          <input type="checkbox" v-model="nft.selected" />
          <img :src="nft.metadata.image" :alt="nft.title" class="nft-image" style="width: 100px; height: auto;"/>
          <h2>nft title: {{ nft.title }}</h2>
          <p>description: {{ nft.description }}</p>
          <p>contract name: {{ nft.contractMetadata.name }}</p>
          <p>token ID: {{ nft.id.tokenId }}</p>
          <p>balance: {{ nft.balance }}</p>
        </div>
      </div>
      <div v-else>
        <p>소유한 NFT가 없습니다.</p>
      </div>
    </div>

    <div>
    <!-- 민팅 데이터 입력 및 민팅 버튼 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-8 text-white">
        <label>{{ $t("Amount to Mint") }}</label>
        <q-input
          v-model="mintAmount"
          type="number"
          outlined
        />
      </div>
      <div class="col-4">
        <q-btn
          class="btn"
          color="primary"
          text-color="black"
          size="lg"
          @click="mintCoin()"
        >
          {{ $t("Mint with Specified Amount") }}
        </q-btn>
      </div>
    </div>
  </div>

   <!-- SOL 개수 입력 및 교환 버튼 -->
   <div class="row justify-center q-pt-lg">
      <div class="col-8 text-white">
        <label>{{ $t("Enter Amount of SOL to Exchange") }}</label>
        <q-input
          v-model="solAmount"
          type="number"
          outlined
        />
      </div>
      <div class="col-4">
        <q-btn
          class="btn"
          color="primary"
          text-color="black"
          size="lg"
          @click="exchangeSol()"
        >
          {{ $t("Exchange to Coin") }}
        </q-btn>
      </div>
    </div>
    
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl"></div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { PublicKey, Keypair, Connection, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import {
   getOrCreateAssociatedTokenAccount,
   transfer,
   TOKEN_PROGRAM_ID,
 } from "@solana/spl-token"
import bs58 from 'bs58';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, keypairIdentity, signerIdentity, percentAmount, createSignerFromKeypair } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata, verifyCollectionV1, fetchDigitalAsset, TokenStandard, createAndMint } from "@metaplex-foundation/mpl-token-metadata";
import Web3 from 'web3';
import { ethers } from 'ethers';

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
      wallet: null,
      solanaAddress: '',
      solanaTransferAddress: '8zni7y1DzB7jq7ym9iRLXLwPaohs8Z4bPTTo6bw9XaKo',
      solanaTransferMintAddress: '',
      walletAddress: '0x7703e0d5D65A798e6ff72D9378e876b0afEf80AC',
      contractAddress: '0x46FdfCb3Cd89A1C54D36EE83a4ADC184747B40D9',
      coinAddress: 'F3e9t8rXpTvCu9BLxENs98mvgW73SC4TSwhT2baNQhob',
      mintAmount: 1,
      solAmount: 1,
      exchangeRate: 10,
      ownNftList: [],
      selectAll: false,
      isSolanaAddressValid: true,
      ethereumAddress: '',
      isEthereumAddressValid: true,
      solanaNetwork: "https://api.devnet.solana.com",
      payerSecretKey: '2BQeUAeWhEWQ1sxwezWHqB59x1Sq2srWrEJNp9eTkqWutYqAHRgGcxbAV8kj9cvuii59Ph8PfaZu2d2aiPSSUtXZ',
      nftData: {
        name: "TEST NFT",
        symbol: "TT",
        uri: "https://arweave.net/tx0uyd4lDGPvZIUMBgz2-jJEdTBMCky8kqxu06dufM4",
        sellerFeeBasisPoints: 7.5,
        tokenOwner: "4gbdX7szo3RN4nNmc8BFM6buAkfu9sKhHSbp1uo4CLUF",
        collectionMint: "327Sz2nKvUZDyDojCcbHSz7DTLHzEHbNqzcZGEbv4QkQ",
      },
      collectionData: {
        name: "TTEST Collection",
        symbol: "BT",
        uri: "https://arweave.net/tx0uyd4lDGPvZIUMBgz2-jJEdTBMCky8kqxu06dufM4",
        sellerFeeBasisPoints: 0,
      },
    };
  },
  methods: {
    async checkAddress() {
      this.isSolanaAddressValid = await this.isValidSolanaAddress(this.solanaAddress);
      console.log(this.isSolanaAddressValid ? 'Valid Solana address' : 'Invalid Solana address');
    },
    async checkEthereumAddress() {
      const web3 = new Web3();
      this.isEthereumAddressValid = web3.utils.isAddress(this.ethereumAddress);
      console.log(this.isEthereumAddressValid ? 'Valid Ethereum address' : 'Invalid Ethereum address');
    },
    async mintSolanaNftTest() {
      try {
        console.log("■■■■■■■ mintSolanaNft Test ■■■■■■■ START");
        const collectionKey = new PublicKey(this.nftData.collectionMint);
        const umi = createUmi(this.solanaNetwork).use(mplTokenMetadata());
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
        umi.use(keypairIdentity(payer));
        const tokenOwner = new PublicKey(this.nftData.tokenOwner);

        const mint = generateSigner(umi);
        console.log("NFT mint account : ", mint.publicKey);
        console.log("Payer account : ", payer.publicKey);

        console.log("Start Create NFT");
        const createdNft = await createNft(umi, {
          mint,
          name: this.nftData.name,
          symbol: this.nftData.symbol,
          uri: this.nftData.uri,
          sellerFeeBasisPoints: percentAmount(this.nftData.sellerFeeBasisPoints * 0.01),
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
        }).sendAndConfirm(umi);
        console.log("End Create NFT");

        console.log("Start Verify Collection");
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
        console.log("End Verify Collection");

        console.log("Create NFT Signature : ", bs58.encode(createdNft.signature));
        console.log("■■■■■■■ mintSolanaNft Test ■■■■■■■ END");
      } catch (error) {
        console.error("Error minting and verifying Solana NFT:", error);
      }
    },
    async mintSolanaCollection() {
      try {
        console.log("■■■■■■■ mintSolanaCollection Test ■■■■■■■ START");
        const umi = createUmi(this.solanaNetwork).use(mplTokenMetadata());
        const payer = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
        umi.use(keypairIdentity(payer));

        const collectionMint = generateSigner(umi);
        console.log("Collection mint account : ", collectionMint.publicKey);    

        const createdCollection = await createNft(umi, {
          mint: collectionMint,
          name: this.collectionData.name,
          symbol: this.collectionData.symbol,
          uri: this.collectionData.uri,
          sellerFeeBasisPoints: percentAmount(this.collectionData.sellerFeeBasisPoints * 0.01),
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
          "Create Collection Signature : ",
          bs58.encode(createdCollection.signature)
        );
        console.log("■■■■■■■ mintSolanaCollection Test ■■■■■■■ END");
      } catch (error) {
        console.error("Error minting Solana Collection:", error);
      }
    },
    async transferSolanaNft() {
      try {
        console.log("■■■■■■■ transferSolanaNft Test ■■■■■■■ START");
        const connection = new Connection(this.solanaNetwork, 'confirmed');
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
    async fetchEthereumNftListTest() {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
        console.log('provider initialized:', provider);

        const contract = new ethers.Contract(this.contractAddress, this.$METAKONGZ_ABI, provider);
        console.log('contract initialized:', contract);

        // NFT의 총 발행 개수를 가져옵니다.
        let totalSupply = await contract.totalSupply();
        totalSupply = BigInt(totalSupply); // totalSupply를 BigInt로 변환
        console.log(`Total NFTs minted: ${totalSupply.toString()}`);

        if (totalSupply > 0n) { // BigInt는 0n으로 비교
          const batchSize = 150n; // 한 번에 보낼 최대 요청 수를 BigInt로 설정
          let ownedTokenIds = [];

          for (let start = 0n; start < totalSupply; start += batchSize) {
            const end = (start + batchSize) > totalSupply ? totalSupply : (start + batchSize); // BigInt 비교
            const batchPromises = [];

            console.log(`Processing tokens from ${start.toString()} to ${end.toString()}`);

            // 현재 배치에 해당하는 tokenId들을 병렬로 처리
            for (let tokenId = start; tokenId < end; tokenId++) {
              const tokenIdNumber = Number(tokenId); // BigInt -> Number 변환

              if (Number.isSafeInteger(tokenIdNumber)) { // 안전한 정수 범위 내에서만 처리
                console.log(`Fetching owner for tokenId: ${tokenIdNumber}`);

                batchPromises.push(
                  contract.ownerOf(tokenIdNumber)
                    .then(owner => {
                      console.log(`Token ID: ${tokenIdNumber} is owned by: ${owner}`);
                      return { tokenId: tokenIdNumber, owner };
                    })
                    .catch(error => {
                      console.error(`Error fetching owner for tokenId ${tokenIdNumber}:`, error);
                      return { tokenId: tokenIdNumber, error };
                    })
                );
              } else {
                console.error(`Token ID ${tokenIdNumber} is out of safe integer range and cannot be processed.`);
              }
            }

            // 현재 배치 처리
            const batchResults = await Promise.all(batchPromises);
            
            // 결과 중에서 소유자가 지정한 지갑 주소와 일치하는 토큰 ID만 필터링
            const filteredTokenIds = batchResults
              .filter(result => result.owner && result.owner.toLowerCase() === this.walletAddress.toLowerCase())
              .map(result => result.tokenId.toString());

            // 소유한 토큰 ID들을 누적하여 저장
            ownedTokenIds = ownedTokenIds.concat(filteredTokenIds);

            console.log(`Filtered Token IDs for this batch:`, filteredTokenIds);
          }

          // 소유한 토큰 ID 출력
          if (ownedTokenIds.length > 0) {
            console.log('Final owned Token IDs:', ownedTokenIds);
            ownedTokenIds.forEach(tokenId => {
              console.log(`Token ID owned by ${this.walletAddress}: ${tokenId}`);
            });
          } else {
            console.log('No NFTs owned by this address');
          }
        } else {
          console.log('No NFTs have been minted');
        }
      } catch (error) {
        console.error('Error fetching NFT details:', error);
        throw error;
      }
    },    
    async fetchEthereumNftList() {
      const ownerAddress = this.walletAddress;      
      const chain = 'ethereum'; // 사용할 체인 (ethereum, matic 등)
      const collectionSlug = 'meta-kongz-official';      
      const apiKey = 'c56b9abdf6a04219b835b97922ed3b2c'; // OpenSea API 키
      const apiUrl = `https://api.opensea.io/api/v2/chain/${chain}/account/${ownerAddress}/nfts`;
      
      let nfts = [];
      let cursor = null;
      let hasNextPage = true;

      try {
        while (hasNextPage) {
          const response = await this.$axios.get(apiUrl, {
            headers: {
              'Accept': 'application/json',
              'X-API-KEY': apiKey
            },
            params: {
              collection: collectionSlug, // 특정 컬렉션 필터링
              limit: 100,                  // 한 번에 가져올 NFT 개수 (1~200)
              next: cursor                 // 다음 페이지를 위한 커서 값
            }
          });

          // 응답에서 NFT 목록과 커서 값 가져오기
          const fetchedNfts = response.data.nfts;
          cursor = response.data.next; // 다음 페이지 커서

          // 새로운 NFT들을 배열에 추가
          nfts = nfts.concat(fetchedNfts);

          // 다음 페이지가 있는지 여부 확인
          hasNextPage = !!cursor; // 커서가 존재하면 계속 반복
        }

        console.log("All NFTs owned by wallet in the collection:", nfts);
        return nfts;
      } catch (error) {
        console.error('Error fetching NFTs:', error);
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
    async mintCoin() {
      try {
        const umi = createUmi(this.solanaNetwork).use(mplTokenMetadata());
        const userWallet = umi.eddsa.createKeypairFromSecretKey(bs58.decode(this.payerSecretKey));
        const userWalletSigner = createSignerFromKeypair(umi, userWallet);
        const metadata = {
            name: "DokdoCoin",
            symbol: "DC",
            uri: "https://bafkreico2rt2pdqy57nakinjq4egzyj63w4mu5hixun32nvnim6dzphzmm.ipfs.nftstorage.link",
        };
        umi.use(signerIdentity(userWalletSigner));
        const mint = generateSigner(umi);       

        console.log("Start createAndMint");
        createAndMint(umi, {
            mint,
            authority: umi.identity,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            sellerFeeBasisPoints: percentAmount(0),
            decimals: 9,
            amount: this.mintAmount * 1000000000,
            tokenOwner: userWallet.publicKey,
            tokenStandard: TokenStandard.Fungible,
            }).sendAndConfirm(umi).then(() => {
            console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
        });
      } catch (error) {
        console.error('Mint 실패: ', error);
        alert('코인 발행에 실패했습니다. 콘솔을 확인해주세요.');
      }
    },
    async exchangeSol() {
      try {
        // 사용자 입력 검증
        if (this.solAmount <= 0) {
          alert('올바른 SOL 수량을 입력해주세요.');
          return;
        }

        // 팬텀 지갑 연결
        if (!window.solana || !window.solana.isPhantom) {
          alert('팬텀 지갑이 설치되어 있지 않습니다.');
          return;
        }
        await window.solana.connect();
        const userPublicKey = window.solana.publicKey;
        console.log('userWallet : ', userPublicKey.toString());

        const connection = new Connection(this.solanaNetwork);
        const systemWallet = Keypair.fromSecretKey(bs58.decode(this.payerSecretKey));

        // SOL 전송 트랜잭션 생성
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: userPublicKey,
            toPubkey: systemWallet.publicKey,
            lamports: this.solAmount * 1000000000, // SOL을 Lamports로 변환 (1 SOL = 1,000,000,000 Lamports)
          })
        );

        console.log('Start Sign : ', transaction);
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = userPublicKey;

        // 사용자 지갑으로 트랜잭션 서명 요청
        const signedTransaction = await window.solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('signature : ', signature);
        const transactionResult = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        }, 'confirmed');
        console.log('transactionResult : ', transactionResult);

        // 토큰 전송 (교환 비율에 따라 계산)
        const coinAmount = this.solAmount * this.exchangeRate * 1000000000;
        console.log(coinAmount);
        
        const tokenAddress = new PublicKey(this.coinAddress);
        const systemTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          systemWallet,
          tokenAddress,
          systemWallet.publicKey // 토큰을 보유한 시스템 지갑
        );
        console.log('systemTokenAccount : ', systemTokenAccount);

        // 시스템 지갑에서 사용자 지갑으로 토큰 전송
        const userTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          systemWallet, // 트랜잭션에 서명할 수 있는 지갑
          tokenAddress,
          userPublicKey // 토큰을 받을 사용자의 지갑 주소
        );
        console.log('userTokenAccount : ', userTokenAccount);

        // Transfer the token
        const transferSignature = await transfer(
          connection,
          systemWallet,
          systemTokenAccount.address,
          userTokenAccount.address,
          systemWallet,
          coinAmount, // Amount to transfer (for NFTs, typically 1)
          [],
          TOKEN_PROGRAM_ID
        );
        console.log('transfer signature:', transferSignature);

        console.log(`Successfully exchanged SOL to ${coinAmount} Coin.`);
        alert(`교환 성공! ${coinAmount} 코인이 지갑에 전송되었습니다.`);
      } catch (error) {
        console.error('교환 실패: ', error);
        alert('교환에 실패했습니다. 콘솔을 확인해주세요.');
      }
    },
    async exchangeSolTest() {
      try {
        // 사용자 입력 검증
        if (this.solAmount <= 0) {
          alert('올바른 SOL 수량을 입력해주세요.');
          return;
        }

        const connection = new Connection(this.solanaNetwork);
        const userSecretKey = 'T71t4u3Mdapn4qQEUJpfFL8Yv6xAcrv3P26RC282WgAAyhKX1kS5Aj1cBZfFbrbDYec8ENhrAa1AqHHj1RSGmfb'
        const userWallet = Keypair.fromSecretKey(bs58.decode(userSecretKey));
        const systemWallet = Keypair.fromSecretKey(bs58.decode(this.payerSecretKey));

        console.log('userWallet : ', userWallet.publicKey)
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: userWallet.publicKey,
            toPubkey: systemWallet.publicKey,
            lamports: this.solAmount * 1000000000, // SOL을 Lamports로 변환 (1 SOL = 1,000,000,000 Lamports)
          })
        );

        // 4. 사용자 지갑으로 트랜잭션 서명 요청
        const sendSolSignature = await sendAndConfirmTransaction(connection, transaction, [userWallet])
        console.log('send sol signature:', sendSolSignature)

        // 6. 토큰 전송 (교환 비율에 따라 계산)
        const coinAmount = this.solAmount * this.exchangeRate * 1000000000;
        console.log(coinAmount);

        const systemTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          systemWallet,
          this.coinAddress,
          systemWallet.publicKey // 토큰을 보유한 시스템 지갑
        );
        console.log('systemTokenAccount : ', systemTokenAccount);

        // 시스템 지갑에서 사용자 지갑으로 토큰 전송
        const userTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          systemWallet, // 트랜잭션에 서명할 수 있는 지갑
          this.coinAddress,
          userWallet.publicKey // 토큰을 받을 사용자의 지갑 주소
        );
        console.log('userTokenAccount : ', userTokenAccount);

        // Transfer the token
        const transferSignature = await transfer(
          connection,
          systemWallet,
          systemTokenAccount.address,
          userTokenAccount.address,
          systemWallet,
          coinAmount, // Amount to transfer (for NFTs, typically 1)
          [],
          TOKEN_PROGRAM_ID
        );
        console.log('transfer signature:', transferSignature)

        console.log(`Successfully exchanged SOL to ${coinAmount} Coin.`);
        alert(`교환 성공! ${coinAmount} 코인이 지갑에 전송되었습니다.`);
      } catch (error) {
        console.error('교환 실패: ', error);
        alert('교환에 실패했습니다. 콘솔을 확인해주세요.');
      }
    },
    toggleSelectAll() {
      this.ownNftList.forEach(nft => {
        nft.selected = this.selectAll
      })
    },    
  },
});
</script>

<style scoped></style>