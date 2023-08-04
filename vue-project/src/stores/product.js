import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useProductStore = defineStore('counter', {
    state: () => {
        return {
            products: [],
            page: 1,
            categoryId: '',
            searchInput: '',
            selectedCategoryName: '',
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
                    url: "https://bryaniproject.productapic1.com/products",
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
    },
})