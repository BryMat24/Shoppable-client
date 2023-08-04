import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cartIsActive: false,
            backdropIsActive: false,
            productsInCart: [],
            orderId: null,
        }
    },
    getters: {
        cartTotalPrice(state) {
            let total = 0;
            state.productsInCart.forEach((el) => {
                total += el.Product.price * el.quantity
            })
            return total
        },
        totalItemInCart(state) {
            let total = 0;
            state.productsInCart.forEach((el) => {
                total += el.quantity;
            })
            return total
        }
    },
    actions: {
        openShoppingCart() {
            this.cartIsActive = true;
            this.backdropIsActive = true;
        },
        closeShoppingCart() {
            this.cartIsActive = false;
            this.backdropIsActive = false;
        },
        async getProductInCart() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: "http://localhost:3000/carts",
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                this.productsInCart = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async addProductToCart(value) {
            try {
                const { id, quantity } = value;
                await axios({
                    method: 'post',
                    url: `http://localhost:3000/carts/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: { quantity }
                })

                Swal.fire({
                    title: 'Item added to cart successfully',
                    icon: 'success',
                })

                this.getProductInCart();
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async deleteCartItem(id) {
            try {
                await axios({
                    method: 'delete',
                    url: `http://localhost:3000/carts/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                Swal.fire({
                    title: 'Item removed from cart successfully',
                    icon: 'success',
                })

                this.getProductInCart();
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async updateCartItemQuantity(value) {
            try {
                const { updateStatus, id } = value;
                await axios({
                    method: 'patch',
                    url: `http://localhost:3000/carts/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    params: {
                        updateStatus
                    }
                })

                this.getProductInCart();
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async checkout() {
            try {
                if (!this.productsInCart.length) throw { message: "Cart is empty!" }

                const { data } = await axios({
                    url: 'http://localhost:3000/payment-token',
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        amount: this.cartTotalPrice
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
                await axios({
                    url: `http://localhost:3000/orders/${this.orderId}`,
                    method: 'patch',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                this.productsInCart = [];
                this.orderId = null;
                this.toggleShoppingCart();
                this.deleteUserCart();
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async deleteUserCart() {
            try {
                await axios({
                    url: `http://localhost:3000/carts`,
                    method: 'delete',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
    },
})