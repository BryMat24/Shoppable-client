import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'

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
        toggleShoppingCart() {
            this.cartIsActive = !this.cartIsActive;
            this.backdropIsActive = !this.backdropIsActive;
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
        async addProductToCart(id) {
            try {
                console.log(id);
                await axios({
                    method: 'post',
                    url: `http://localhost:3000/carts/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                Swal.fire({
                    title: 'Item added to cart successfully',
                    icon: 'success',
                })

                this.getProductInCart();
            } catch (err) {
                console.log(err)
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
    },
})