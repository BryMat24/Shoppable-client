import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useCartStore } from './cart'
const baseUrl = 'http://localhost:3000';

export const useOrderStore = defineStore('order', {
    state: () => {
        return {
            orderId: null,
            orderHistory: [],
            currentOrderDetail: []
        }
    },
    actions: {
        async checkout(value) {
            try {
                console.log(value);
                const cartStore = useCartStore();
                if (!cartStore.productsInCart.length) throw { message: "Cart is empty!" }

                // generate unique payment token
                const { data } = await axios({
                    url: `${baseUrl}/payment-token`,
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        amount: cartStore.cartTotalPrice,
                        address: value
                    }
                })

                this.orderId = data.orderId;
                const cb = this.updatePaymentStatus;
                window.snap.pay(data.midtransToken.token, {
                    onSuccess: function (result) {
                        cb();
                    },
                })

            } catch (err) {
                const error = err?.response?.data?.message;
                Swal.fire({
                    title: 'Error!',
                    text: error,
                    icon: 'error',
                })
            }
        },
        async updatePaymentStatus() {
            try {
                const cartStore = useCartStore();
                await axios({
                    url: `${baseUrl}/orders/${this.orderId}`,
                    method: 'patch',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                cartStore.productsInCart = [];
                this.orderId = null;
                cartStore.closeShoppingCart();
                cartStore.deleteUserCart();
                this.router.push({ name: 'product' });
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getOrderHistory() {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/orders`,
                    method: 'get',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                this.orderHistory = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getOrderDetail(id) {
            try {
                const { data } = await axios({
                    url: `${baseUrl}/orders/${id}`,
                    method: 'get',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                this.currentOrderDetail = data;
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