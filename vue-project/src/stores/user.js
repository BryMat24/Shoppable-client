import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getAlanInstance } from '../utils/AlanService'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      email: '',
      password: '',
      isLoggedIn: Boolean(localStorage.getItem('access_token')),
    }
  },
  actions: {
    async postLogin(value) {
      try {
        const { data } = await axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: value
        })

        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
        })

        this.isLoggedIn = true;
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('email', data.user.email);
        getAlanInstance();

        this.router.push({ name: 'home' });
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `${err.response.data.message}`,
          icon: 'error',
        })
      }
    },
    async postRegister(value) {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/register',
          data: value
        })

        Swal.fire({
          text: `We have sent a confirmation email to ${value.email}`,
          icon: 'info'
        })

      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `${err.response.data.message}`,
          icon: 'error',
        })
      }
    }
  },
})