import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cartIsActive: false,
            backdropIsActive: false,
            productsInCart: [],
            cartTotalPrice: 0
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
                    url: "https://bryaniproject.productapic1.com/carts",
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
    },
    async addProductToCart(id) {
        try {
            await axios({
                method: 'post',
                url: `https://bryaniproject.productapic1.com/carts/${id}`,
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
                url: `https://bryaniproject.productapic1.com/carts/${id}`,
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
                url: `https://bryaniproject.productapic1.com/carts/${id}`,
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
})