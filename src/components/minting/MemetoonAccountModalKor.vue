<template>
  <q-dialog v-model="MemetoonAccountModalKor" persistent>
    <q-card>
      <div class="modal inner" id="mint_pop">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">밈툰 계정 등록</h4>
              <button type="button" class="close" data-dismiss="modal" @click="close"><i class="xi-close"></i></button>
            </div>

            <section class="sec02 text-center">
              <img src="logo/logo_memetoon.png" style="width: 200px;" alt="">

              <div class="form">
                <p class="form_txt">
                  아이디와 패스워드를 입력해주세요.
                </p>
                <br />
                <input v-model="memetoonAccount.id" type="text" placeholder="ID">
                <input v-model="memetoonAccount.pwd" type="password" placeholder="PASSWORD">
                <!-- <button class="btn" @click="apply">Apply</button> -->
                <q-btn class="btn" color="primary" size="lg" @click="apply">등록</q-btn>
              </div>
            </section>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { Connection, PublicKey } from "@solana/web3.js";

export default {
  data () {
    return {
      MemetoonAccountModalKor: false,
      memetoonAccount: {
        id: '',
        pwd: '',
      },
    }
  },
  methods: {
    async show() {
      this.MemetoonAccountModalKor = true
    },
    close() {
      this.MemetoonAccountModalKor = false
    },
    async apply() {
      let result = await this.validate()
      if(!result) {
        // console.log("유효성검사")
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }
      this.$emit('callback-memetoonAccount', this.memetoonAccount)
      // this.MemetoonAccountModalKor = false
    },
    async validate() {
      let result = true

      if (!this.memetoonAccount.id) {
        result = false
        this.$noti(this.$q, 'ID required')
      }
      
      if (!this.memetoonAccount.pwd) {
        result = false
        this.$noti(this.$q, 'Password required')
      }

      return result;
    },
  }
}
</script>

<style scoped>
</style>
  