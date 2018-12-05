
<template>
    <div class="customer-new">
        <form @submit.prevent="updateClient">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.first_name" placeholder="Customer Name"/>
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>
                        <input type="email" class="form-control" v-model="customer.email" placeholder="Customer Email"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <router-link to="/customers" class="btn">Cancel</router-link>
                    </td>
                    <td class="text-right">
                        <input type="submit" value="Update" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';

    export default {
        name: 'edit',
        data() {
            return {
                customer: {
                    first_name: '',
                    email: '',
                },
                errors: null
            };
        },
        created: function(){
            let uri = 'http://client.test/api/clients/' + this.$route.params.id+'/edit';
            axios.get(uri).then((response) => {
                this.customer = response.data;
            });
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            }
        },
        methods: {
            updateClient() {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.customer, constraints);
                if(errors) {
                    this.errors = errors;
                    return;
                }
                let uri ='http://client.test/api/clients/'+ this.$route.params.id;
                axios.patch(uri, this.customer)
                    .then((response) => {
                        this.$router.push('/customers');
                    });
            },
            getConstraints() {
                return {
                    first_name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    email: {
                        presence: true,
                        email: true
                    },
                };
            }
        },
        mounted() {
            console.log('edit');
        }
    }
</script>

<style>
    .errors {
        background: lightcoral;
        border-radius:5px;
        padding: 21px 0 2px 0;
    }
</style>

