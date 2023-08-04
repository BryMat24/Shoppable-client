<template>
  <Form formType="Register" @submitForm="submitForm" />
</template>

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import Form from '../components/LoginRegisterForm.vue'

export default {
  components: {
    Form
  },
  methods: {
    ...mapActions(useUserStore, ['postRegister']),
    submitForm(value) {
      this.postRegister(value)
    }
  }
}
</script>
