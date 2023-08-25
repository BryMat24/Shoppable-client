import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'https://ecommerce.productapic1.com';

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cartIsActive: false,
            backdropIsActive: false,
            productsInCart: [],
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
                    url: `${baseUrl}/carts`,
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
                    url: `${baseUrl}/carts/${id}`,
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
                    url: `${baseUrl}/carts/${id}`,
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
                    url: `${baseUrl}/carts/${id}`,
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
        async deleteUserCart() {
            try {
                await axios({
                    url: `${baseUrl}/carts`,
                    method: 'delete',
                    headers: {
                        access_token: localStorage.getItem('access_token')
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
    },
})