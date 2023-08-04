<template>
  <div class="loginRegister-container">
    <div class="left">
      <div class="header">
        <h2 class="animation a1" v-if="formType === 'Login'">Welcome Back</h2>
        <h2 class="animation a1" v-else>Register</h2>
        <h4 class="animation a2" v-if="formType === 'Login'">
          Log in to your account using email and password
        </h4>
      </div>
      <form class="form" @submit.prevent="submitForm">
        <input
          type="email"
          class="form-field animation a3"
          placeholder="Email Address"
          v-model="email"
        />
        <input
          type="password"
          class="form-field animation a4"
          placeholder="Password"
          v-model="password"
        />

        <p class="animation a5" v-if="formType === 'Login'">
          <router-link :to="{ name: 'register' }">Don't Have an account?</router-link>
        </p>
        <p class="animation a5" v-else>
          <router-link :to="{ name: 'login' }">Already have an account?</router-link>
        </p>
        <button class="animation a6">{{ formType }}</button>
      </form>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: ['formType'],
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm', { email: this.email, password: this.password })
    }
  }
}
</script>
