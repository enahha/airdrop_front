<template>
  <q-dialog v-model="MintingModalKor" persistent>
    <q-card>
      <div class="modal inner" id="mint_pop">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Mint with {{ payCurrencySymbol }}</h4>
              <button type="button" class="close" data-dismiss="modal" @click="close"><i class="xi-close"></i></button>
            </div>

            <div class="modal-body">
              <section class="sec01">
                <h5>{{ payCurrencySymbol }}를 WTEC로 스왑하여 결제</h5>
                <img src="images/minting_pop_img01.png" alt="">

                <!-- 클래스에 따라 4타입 {nftImg_1 ~ nftImg_4}-->
                <div v-if="selectedNftTypeName == nftNameA" class="nftImg nftImg_1">
                  <div class="img"></div>
                  <p>BUMI BAND <span></span></p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameS" class="nftImg nftImg_2">
                  <div class="img"></div>
                  <p>BUMI BAND <span></span></p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameR" class="nftImg nftImg_3">
                  <div class="img"></div>
                  <p>BUMI BAND <span></span></p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameV" class="nftImg nftImg_4">
                  <div class="img"></div>
                  <p>BUMI BAND <span></span></p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameMe100" class="nftImg nftImg_5">
                  <div class="img"></div>
                  <p>{{ selectedNftTypeName }}</p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameMe1500" class="nftImg nftImg_6">
                  <div class="img"></div>
                  <p>{{ selectedNftTypeName }}</p>
                </div>
                <div v-else-if="selectedNftTypeName == nftNameMe10000" class="nftImg nftImg_7">
                  <div class="img"></div>
                  <p>{{ selectedNftTypeName }}</p>
                </div>
                <!-- 클래스에 따라 4타입 {nftImg_1 ~ nftImg_4}-->

                <div class="total">
                  <p>TOTAL</p>
                  <p><img src="images/minting_pop_img02.png" alt="">{{ total.toLocaleString() }} {{ payCurrencySymbol }}</p>
                </div>

                <button class="nextBtn btn" @click="goMinting">결제</button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { QSpinnerGears } from 'quasar'
import { prepare, request, getResult, getCardList } from 'klip-sdk'
import QRCode from 'qrcode'
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      nftNameA: 'BUMI BAND A',
      nftNameS: 'BUMI BAND S',
      nftNameR: 'BUMI BAND R',
      nftNameV: 'BUMI BAND V',
      nftNameMe100: 'ME100$',
      nftNameMe1500: 'ME1500$',
      nftNameMe10000: 'ME10000$',
      quantityA: 0,
      quantityS: 0,
      quantityR: 0,
      quantityV: 0,
      quantityMe100: 0,
      quantityMe1500: 0,
      quantityMe10000: 0,
      paymentCurrencyAmountTypeA: 1250,
      paymentCurrencyAmountTypeS: 2500,
      paymentCurrencyAmountTypeR: 5000,
      paymentCurrencyAmountTypeV: 12500,
      paymentCurrencyAmountTypeMe100: 100,
      paymentCurrencyAmountTypeMe1500: 1500,
      paymentCurrencyAmountTypeMe10000: 10000,
      wtecPaymentCurrencyAmountTypeA: 0,
      wtecPaymentCurrencyAmountTypeS: 0,
      wtecPaymentCurrencyAmountTypeR: 0,
      wtecPaymentCurrencyAmountTypeV: 0,
      wtecPaymentCurrencyAmountTypeMe100: 100,
      wtecPaymentCurrencyAmountTypeMe1500: 1500,
      wtecPaymentCurrencyAmountTypeMe10000: 10000,
      // test용 //
      paymentBBSC_a: 1,
      paymentBBSC_s: 1,
      paymentBBSC_r: 1,
      paymentBBSC_v: 1,
      paymentBBSC_me100: 1,
      paymentBBSC_me1500: 1,
      paymentBBSC_me10000: 1,
      ///////////
      subTotalA: 0,
      subTotalS: 0,
      subTotalR: 0,
      subTotalV: 0,
      subTotalMe100: 0,
      subTotalMe1500: 0,
      subTotalMe10000: 0,
      total: 0,
      MintingModalKor: false,
      payCurrencyAmountTotal: '',
      payCurrencySymbol: '',
      selectedNftTypeImage: '',
      selectedNftTypeName: '',
      countdown: 3000000,
      timer: null

    }
  },
  created: function () {
    this.projectId = this.$route.query.id
  },
  methods: {
    async show () {
      console.log(this.selectedNftTypeName)
      this.MintingModalKor = true
      if (this.selectedNftTypeName === this.nftNameA) {
        this.quantityA = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameS) {
        this.quantityS = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameR) {
        this.quantityR = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameV) {
        this.quantityV = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameMe100) {
        this.quantityMe100 = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameMe1500) {
        this.quantityMe1500 = 1
        this.calculateTotal()
      }
      if (this.selectedNftTypeName === this.nftNameMe10000) {
        this.quantityMe10000 = 1
        this.calculateTotal()
      }
      // this.startTimer()
    },
    close () {
      this.quantityA = 0
      this.quantityS = 0
      this.quantityR = 0
      this.quantityV = 0
      this.quantityMe100 = 0
      this.quantityMe1500 = 0
      this.quantityMe10000 = 0
      this.MintingModalKor = false
      // this.clearTimer()
    },
    cancelConfirm() {
      this.MintingModalKor = false
    },
    goMinting() {
      if(this.total == 0) {
        this.$noti(this.$q, this.$t('Please choose the quantity'))
        return
      }
      const data = {
        quantityA: this.quantityA,
        quantityS: this.quantityS,
        quantityR: this.quantityR,
        quantityV: this.quantityV,
        quantityMe100: this.quantityMe100,
        quantityMe1500: this.quantityMe1500,
        quantityMe10000: this.quantityMe10000,
        priceA: this.quantityA ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeA : this.aymentCurrencyAmountTypeA) : null,
        priceS: this.quantityS ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeS : this.usdtPaymentCurrencyAmountTypeS) : null,
        priceR: this.quantityR ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeR : this.usdtPaymentCurrencyAmountTypeR) : null,
        priceV: this.quantityV ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeV : this.usdtPaymentCurrencyAmountTypeV) : null,
        priceMe100: this.quantityMe100 ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeMe100 : this.usdtPaymentCurrencyAmountTypeMe100) : null,
        priceMe1500: this.quantityMe1500 ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeMe1500 : this.usdtPaymentCurrencyAmountTypeMe1500) : null,
        priceMe10000: this.quantityMe10000 ? (this.payCurrencySymbol === 'WTEC' ? this.wtecPaymentCurrencyAmountTypeMe10000 : this.usdtPaymentCurrencyAmountTypeMe10000) : null,
        subtotalA: this.subTotalA,
        subtotalS: this.subTotalS,
        subtotalR: this.subTotalR,
        subtotalV: this.subTotalV,
        subtotalMe100: this.subTotalMe100,
        subtotalMe1500: this.subTotalMe1500,
        subtotalMe10000: this.subTotalMe10000,
        total: this.total
      }
      this.$emit('callback-minting', data)
      this.close()
      this.clearTimer()
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          this.close()
        }
      }, 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.countdown = 30
    },
    decreaseQuantity(nft) {
      if (nft === 'a' && this.quantityA > 0) {
        this.quantityA--
      }
      if (nft === 's' && this.quantityS > 0) {
        this.quantityS--
      }
      if (nft === 'r' && this.quantityR > 0) {
        this.quantityR--
      }
      if (nft === 'v' && this.quantityV > 0) {
        this.quantityV--
      }
      if (nft === 'me100' && this.quantityMe100 > 0) {
        this.quantityMe100--
      }
      if (nft === 'me1500' && this.quantityMe1500 > 0) {
        this.quantityMe1500--
      }
      if (nft === 'me10000' && this.quantityMe10000 > 0) {
        this.quantityMe10000--
      }
      this.calculateTotal()
    },
    increaseQuantity(nft) {
      if (nft === 'a') {
        this.quantityA++
      }
      if (nft === 's') {
        this.quantityS++
      }
      if (nft === 'r') {
        this.quantityR++
      }
      if (nft === 'v') {
        this.quantityV++
      }
      if (nft === 'me100') {
        this.quantityMe100++
      }
      if (nft === 'me1500') {
        this.quantityMe1500++
      }
      if (nft === 'me10000') {
        this.quantityMe10000++
      }
      this.calculateTotal()
    },
    async calculateSubtotalA() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalA = this.quantityA * this.paymentCurrencyAmountTypeA
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityA * this.paymentCurrencyAmountTypeA
        this.subTotalA = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeA = this.subTotalA / this.quantityA
      } else {
        this.subTotalA = this.quantityA * this.paymentBBSC_a
      }
    },
    async calculateSubtotalS() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalS = this.quantityS * this.paymentCurrencyAmountTypeS
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityS * this.paymentCurrencyAmountTypeS
        this.subTotalS = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeS = this.subTotalS / this.quantityS
      } else {
        this.subTotalS = this.quantityS * this.paymentBBSC_s
      }
    },
    async calculateSubtotalR() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalR = this.quantityR * this.paymentCurrencyAmountTypeR
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityR * this.paymentCurrencyAmountTypeR
        this.subTotalR = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeR = this.subTotalR / this.quantityR
      } else {
        this.subTotalR = this.quantityR * this.paymentBBSC_r
      }
    },
    async calculateSubtotalV() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalV = this.quantityV * this.paymentCurrencyAmountTypeV
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityV * this.paymentCurrencyAmountTypeV
        this.subTotalV = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeV = this.subTotalV / this.quantityV
      } else {
        this.subTotalV = this.quantityV * this.paymentBBSC_v
      }
    },
    async calculateSubtotalMe100() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalMe100 = this.quantityMe100 * this.paymentCurrencyAmountTypeMe100
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityMe100 * this.paymentCurrencyAmountTypeMe100
        this.subTotalMe100 = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeMe100 = this.subTotalMe100 / this.quantityMe100
      } else {
        this.subTotalMe100 = this.quantityMe100 * this.paymentBBSC_me100
      }
    },
    async calculateSubtotalMe1500() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalMe1500 = this.quantityMe1500 * this.paymentCurrencyAmountTypeMe1500
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityMe1500 * this.paymentCurrencyAmountTypeMe1500
        this.subTotalMe1500 = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeMe1500 = this.subTotalMe1500 / this.quantityMe1500
      } else {
        this.subTotalMe1500 = this.quantityMe1500 * this.paymentBBSC_me1500
      }
    },
    async calculateSubtotalMe10000() {
      if (this.payCurrencySymbol == 'USDT'){
        this.subTotalMe10000 = this.quantityMe10000 * this.paymentCurrencyAmountTypeMe10000
      } else if(this.payCurrencySymbol == 'WTEC') {
        let tempTotal = this.quantityMe10000 * this.paymentCurrencyAmountTypeMe10000
        this.subTotalMe10000 = await this.$parent.getTokenAmountByUsdValue(tempTotal)
        this.wtecPaymentCurrencyAmountTypeMe10000 = this.subTotalMe10000 / this.quantityMe10000
      } else {
        this.subTotalMe10000 = this.quantityMe10000 * this.paymentBBSC_me10000
      }
    },
    async calculateTotal() {
      await Promise.all([
        this.calculateSubtotalA(),
        this.calculateSubtotalS(),
        this.calculateSubtotalR(),
        this.calculateSubtotalV(),
        this.calculateSubtotalMe100(),
        this.calculateSubtotalMe1500(),
        this.calculateSubtotalMe10000(),
      ])
      
      this.total = this.subTotalA + this.subTotalS + this.subTotalR + this.subTotalV + this.subTotalMe100 + this.subTotalMe1500 + this.subTotalMe10000
    },
  }
}
</script>
<style scoped>
</style>