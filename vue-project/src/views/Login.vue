<template>
  <Form
    formType="Login"
    @submitForm="submitForm"
    @handleCredentialResponse="handleCredentialResponse"
  />
</template>

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import Form from '../components/loginRegisterForm.vue'

export default {
  components: {
    Form
  },
  methods: {
    ...mapActions(useUserStore, ['postLogin', 'postGoogleLogin']),
    submitForm(value) {
      this.postLogin(value)
    },
    async handleCredentialResponse(credential) {
      this.postGoogleLogin(credential)
    }
  }
}
</script>
