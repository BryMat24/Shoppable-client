import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useCartStore } from './cart'

export const useOrderStore = defineStore('order', {
    state: () => {
        return {
            orderId: null,
            street: '',
            postal_code: '',
            city: '',
            region: '',
            country: '',
            orderHistory: [],
            currentOrderDetail: []
        }
    },
    actions: {
        async updateLocation(address) {
            this.street = address.street
            this.postal_code = address.postal_code
            this.region = address.region
            this.city = address.city
            this.country = address.country
        },
        async checkout() {
            try {
                const cartStore = useCartStore();
                if (!cartStore.productsInCart.length) throw { message: "Cart is empty!" }

                // generate unique payment token
                const { data } = await axios({
                    url: 'http://localhost:3000/payment-token',
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        amount: cartStore.cartTotalPrice,
                        address: {
                            streetAddress: this.street,
                            postalCode: this.postal_code,
                            state: this.region,
                            city: this.city,
                            country: this.country
                        }
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
                const error = err.message ? err.message : err.response.data.message;
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
                    url: `http://localhost:3000/orders/${this.orderId}`,
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
                    url: `http://localhost:3000/orders`,
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
                    url: `http://localhost:3000/orders/${id}`,
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