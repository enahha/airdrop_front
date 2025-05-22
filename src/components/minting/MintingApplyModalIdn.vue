<template>
  <q-dialog v-model="MintingApplyModalIdn" persistent>
    <q-card>
      <div class="modal inner" id="mint_pop">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Daftarkan Alamat Dompet Solana</h4>
              <button type="button" class="close" data-dismiss="modal" @click="close"><i class="xi-close"></i></button>
            </div>

            <section class="sec02">
              <img src="images/minting_pop_img03.png" alt="">

              <div class="form">
                <p class="form_txt">
                  <img src="images/minting_pop_img04.png" alt="">
                  Alamat Phantom Solana Wallet
                </p>

                <input v-model="solanaWalletAddress" type="text" placeholder="Please enter your wallet address.">

                <q-btn class="btn" color="primary" size="lg" @click="apply">Daftarkan</q-btn>
              </div>

              <br>
              <br>
              <br>

              <div class="youtube">
                <iframe src="https://www.youtube.com/embed/d_zwJUFXt2o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>

              <br>
              <br>

              <p class="info">
                <i class="xi-error"></i>
                NFT akan dikirimkan ke Wallet dalam 24 jam
              </p>
            </section>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
import { Connection, PublicKey } from "@solana/web3.js";

export default {
  data () {
    return {
      MintingApplyModalIdn: false,
      solanaWalletAddress: '',
    }
  },
  methods: {
    async show() {
      this.MintingApplyModalIdn = true
    },
    close() {
      this.MintingApplyModalIdn = false
    },
    async apply() {
      let result = await this.validate()
      if(!result) {
        // console.log("유효성검사")
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }
      this.$emit('callback-applyMinting', this.solanaWalletAddress)
      // this.solanaWalletAddress = ''
      this.MintingApplyModalIdn = false
    },
    async validate() {
      let result = true
      const value = this.solanaWalletAddress

      if (!value) {
        result = false
        // console.log('Validation failed: required')
        this.$noti(this.$q, 'Solana wallet address required')
        return false
      }

      if (value.length != 44) {
        result = false
        this.$noti(this.$q, 'Invalid solana wallet address')
      }

      // let checkAddressResult = await this.checkAddress(value)
      // if (!checkAddressResult) {
      //   this.$noti(this.$q, 'Invalid solana wallet address')
      //   return false
      // }

      return result;
    },
    async checkAddress(solanaWalletAddress) {
      let isSolanaAddressValid = await this.isValidSolanaAddress(solanaWalletAddress);
      console.log(isSolanaAddressValid ? 'Valid Solana address' : 'Invalid Solana address')
      return isSolanaAddressValid
    },
    async isValidSolanaAddress(address) {
      try {
        let key = new PublicKey(address);
        const connection = new Connection(this.$SOLANA_NETWORK)
        const accountInfo = await connection.getAccountInfo(key);
        return accountInfo !== null;
      } catch (error) {
        return false;
      }
    },
  }
}
</script>

<style scoped>
</style>
