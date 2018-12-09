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

                <tr>
                    <h3>Contacts</h3>
                </tr>
                <template v-if="!customer.contacts.length" >
                    <tr>
                        <td colspan="4" class="text-center"><h3>No Contacts Available</h3></td>
                    </tr>
                </template>
                <template v-else >
                <tr>
                    <th>Postcode</th>
                    <th>Address</th>
                </tr>
                <tr v-for="contact in customer.contacts" >
                    <td>{{contact.address}}</td>
                    <td>{{contact.postcode}}</td>
                </tr>
                </template>
            </table>
            <router-link to="/customers">Back to all customers</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'view',
        data() {
            return {
                customer: {},
                contacts: []

            };
        },
        created () {
            if (this.customers.length) {
                this.customer = this.customers.find((customer) => customer.id == this.$route.params.id);
            } else {
                axios.get('http://client.test/api/clients/' + this.$route.params.id)
                    .then((response) => {
                        this.customer = response.data.customer;
                    });
            }
        },

        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            customers() {
                return this.$store.getters.customers;
            }
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
        overflow-x: scroll;
    }
</style>
