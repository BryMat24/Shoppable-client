import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

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
            similarProducts: []
        }
    },
    actions: {
        async getCategories() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: "https://bryaniproject.productapic1.com/categories"
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
                    url: "http://localhost:3000/products",
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
                    url: `http://localhost:3000/products/${id}`
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
                    url: `http://localhost:3000/products/similar/${id}`
                })

                this.similarProducts = data;
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