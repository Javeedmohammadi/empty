import { defineStore } from "pinia";
import Swal from "sweetalert2";
// Import Axios
import axios from "axios";
export let usePeopleRepository = defineStore("PeopleRepository", {
    state() {
        return {
            agents: [],
            serviceType: [],
            singleService: {},
            singleServiceType: {},
            isLoading: false,
            error: null,
            loading: true,
            dailog: false,
            itemsPerPage: 10,
            selectedItems: [],
            selectAll: false,
            showSelect: true,
            totalItems: 0,
            itemKey: "id",
            ServiceSearch: "",
            ServiceTypeSearch: "",
        };
    },
    actions: {
        //All service API of data
        async Agents() {
            this.loading = true;
            const config = {
                headers: {
                    Authorization: "Bearer your_token_here",
                    "Custom-Header": "custom",
                },
            };

            const response = await axios.get(
                `http://127.0.0.1:8000/api/v1/agents`,
                config
            );
            this.agents = response.data.data;

            this.loading = false;
        },
        async fetchServiceData(id) {
            // this.people = [];
            this.error = null;
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/services/${id}`,
                    config
                );

                this.singleService = response.data.data; // Assign the fetched data directly to this.people

                // Reset error in case it was previously set
            } catch (err) {
                this.error = err.message; // Set error message
                // Reset people data
            }
        },
        async UpdateServices(id, data) {
            this.isLoading = true;

            this.error = null;
            try {
                // Adding a custom header to the Axios request
                const config = {
                    method: "PUT",
                    url: "http://127.0.0.1:8000/api/v1/services/" + id,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };

                // Using Axios to make a post request with async/await and custom headers
                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service has been successfully Updated.",
                });
                this.isLoading = false;
                // If the request is successful, set the data in the store
                this.fetchServicesData();
                // this.$router.push()
            } catch (err) {
                // If there's an error, set the error in the store
                this.error = err;
            }
        },
        async createServices(formData) {
            this.isLoading = true;
            this.services = [];
            this.error = null;
            try {
                // Adding a custom header to the Axios request
                const config = {
                    method: "POST",
                    url: "http://127.0.0.1:8000/api/v1/services",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify(formData),
                };

                // Using Axios to make a GET request with async/await and custom headers
                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service has been successfully Added.",
                });
                // If the request is successful, set the data in the store
                this.isLoading = false;
                // this.services = response.data.data;
                this.fetchServicesData();
            } catch (err) {
                // If there's an error, set the error in the store
                this.error = err;
            }
        },
        async DeleteServices(id) {
            this.isLoading = true;
            this.services = [];
            this.error = null;

            try {
                const config = {
                    method: "DELETE",
                    url: "http://127.0.0.1:8000/api/v1/services/" + id,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service has been successfully Deleted.",
                });
                this.isLoading = false;
                this.services = response.data.data;
                this.fetchServicesData();
            } catch (err) {
                this.error = err;
            }
        },
        async DeleteMultipleServices(ids) {
            this.isLoading = true;
            this.services = [];
            this.error = null;

            try {
                const config = {
                    method: "DELETE",
                    url: "http://127.0.0.1:8000/api/v1/service-bulk-delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: ids,
                };

                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Services has been successfully Deleted.",
                });
                this.isLoading = false;
                this.services = response.data.data;
                this.fetchServicesData();
            } catch (err) {
                this.error = err;
            }
        },

        // service type api  data
        async fetchServiceTypesData({ page, itemsPerPage }) {
            this.loading = true;
            const config = {
                headers: {
                    Authorization: "Bearer your_token_here",
                    "Custom-Header": "custom",
                },
            };

            const response = await axios.get(
                `http://127.0.0.1:8000/api/v1/serviceTypes?page=${page}&perPage=${itemsPerPage}&search=${this.ServiceTypeSearch}`,
                config
            );
            this.serviceType = response.data.data;
            this.totalItems = response.data.meta.total;
            this.loading = false;
        },
        async fetchServiceType(id) {
            // this.people = [];
            this.error = null;
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/serviceTypes/${id}`,
                    config
                );

                this.singleServiceType = response.data.data; // Assign the fetched data directly to this.people

                // Reset error in case it was previously set
            } catch (err) {
                this.error = err.message; // Set error message
                // Reset people data
            }
        },
        async UpdateServiceTyps(id, data) {
            this.isLoading = true;

            this.error = null;
            try {
                // Adding a custom header to the Axios request
                const config = {
                    method: "PUT",
                    url: "http://127.0.0.1:8000/api/v1/serviceTypes/" + id,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };

                // Using Axios to make a post request with async/await and custom headers
                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service Type has been successfully Updated.",
                });
                this.isLoading = false;
                // If the request is successful, set the data in the store
                this.fetchServiceTypesData();
                // this.$router.push()
            } catch (err) {
                // If there's an error, set the error in the store
                this.error = err;
            }
        },
        async createServiceType(formData) {
            this.isLoading = true;
            this.serviceType = [];
            this.error = null;
            try {
                // Adding a custom header to the Axios request
                const config = {
                    method: "POST",
                    url: "http://127.0.0.1:8000/api/v1/serviceTypes",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify(formData),
                };

                // Using Axios to make a GET request with async/await and custom headers
                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service Type has been successfully Added.",
                });
                // If the request is successful, set the data in the store
                this.isLoading = false;
                // this.services = response.data.data;
                this.fetchServiceTypesData();
            } catch (err) {
                // If there's an error, set the error in the store
                this.error = err;
            }
        },
        async DeleteServiceType(id) {
            this.isLoading = true;
            this.serviceType = [];
            this.error = null;

            try {
                const config = {
                    method: "DELETE",
                    url: "http://127.0.0.1:8000/api/v1/serviceTypes/" + id,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service Type has been successfully Deleted.",
                });
                this.isLoading = false;
                this.serviceType = response.data.data;
                this.fetchServiceTypesData();
            } catch (err) {
                this.error = err;
            }
        },
        async DeleteMultipleServiceType(ids) {
            this.isLoading = true;
            this.serviceType = [];
            this.error = null;

            try {
                const config = {
                    method: "DELETE",
                    url: "http://127.0.0.1:8000/api/v1/serviceType-bulk-delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: ids,
                };

                const response = await axios(config);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Service Types has been successfully Deleted.",
                });
                this.isLoading = false;
                this.serviceType = response.data.data;
                this.fetchServiceTypesData();
            } catch (err) {
                this.error = err;
            }
        },
    },
});
