import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const baseUrl = 'https://ecommerce.productapic1.com';

export const useProductStore = defineStore('product', {
    state: () => {
        return {
            categories: [],
            products: [],
            page: 1,
            categoryId: '',
            searchInput: '',
            selectedCategoryName: '',
            productDetail: {},
            similarProducts: [],
            newestArrival: [],
            topRated: []
        }
    },
    actions: {
        async getCategories() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/categories`
                })

                this.categories = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getFilteredProducts() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/products`,
                    params: {
                        search: this.searchInput,
                        categoryId: this.categoryId,
                        page: this.page
                    }
                })

                this.searchInput = ''
                this.products = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getProductDetail(id) {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/products/${id}`
                })

                this.productDetail = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getSimilarProducts(id) {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/products/similar/${id}`
                })

                this.similarProducts = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getNewestArrival() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/products/newest-release`
                })

                this.newestArrival = data;
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        },
        async getTopRated() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${baseUrl}/products/top-rated`
                })

                this.topRated = data;
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                })
            }
        }
    },
})