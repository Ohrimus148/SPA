<template>
    <div class="customer-view" v-if="customer">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ customer.id }}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ customer.first_name }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ customer.email }}</td>
                </tr>
            </table>
            <router-link to="/customers">Back to all customers</router-link>
            <button @click = "deleteClient" to="/customers" class="btn btn-danger">Cancel</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'delete',
        created() {
            if (this.customers.length) {
                this.customer = this.customers.find((customer) => customer.id == this.$route.params.id);
            } else {
                axios.get(`/api/customers/${this.$route.params.id}`)
                    .then((response) => {
                        this.customer = response.data.customer
                    });
            }
        },
        data() {
            return {
                customer: null
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            customers() {
                return this.$store.getters.customers;
            }
        },
        methods: {
            deleteClient: function () {
                console.log(uri);
                let uri ='http://client.test/api/clients/'+ this.$route.params.id;
                axios.delete(uri, this.customer).then((response) => {
                    this.$router.push('/customers');
                })
            }
        },
        mounted() {
            console.log('delete');
        }
    }
</script>

<style scoped>
    .customer-view {
        display: flex;
        align-items: center;
    }
    .user-img {
        flex: 1;
    }
    .user-img img {
        max-width: 160px;
    }
    .user-info {
        flex: 3;
    }
</style>
