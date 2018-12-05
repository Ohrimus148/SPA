<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/customers/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
            <th>Name</th>
            <th>Email</th>
            <!--<th>Phone</th>-->
            <th class="actions">Actions</th>
            </thead>
            <tbody>
            <template v-if="!customers.length">
                <tr>
                    <td colspan="4" class="text-center">No Customers Available</td>
                </tr>
            </template>
            <template v-else>
                <tr v-for="customer in customers" :key="customer.id">
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.email }}</td>
                    <!--<td>{{ customer.phone }}</td>-->
                    <td class="actions">
                        <router-link :to="`/customers/${customer.id}`" ><span class="fa fa-eye"></span></router-link>
                        <router-link :to="`/customers/edit/${customer.id}`" ><span class="fa fa-pencil"></span></router-link>
                        <router-link :to="`/customers/delete/${customer.id}`" ><span class="fa fa-trash"></span></router-link>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'list',
        mounted() {
            if (this.customers.length) {
                return;
            }
            this.$store.dispatch('getCustomers');
        },
        computed: {
            customers() {
                return this.$store.getters.customers;
            }
        }
    }
</script>

<style scoped>
    .btn-wrapper {
        text-align: right;
        margin-bottom: 20px;
    }
    .fa-trash{
        color: red;
    }
    .fa-pencil{
        color: #e0a800;
    }
</style>
