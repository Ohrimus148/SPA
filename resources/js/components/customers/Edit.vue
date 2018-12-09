
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
                    <h3 align="center">Contacts</h3>
                </tr>
                <tr >
                    <th>Postcode</th>
                    <th>Address</th>
                    <th>Delete</th>
                </tr>
                <tr v-for = "contact in customer.contacts" >
                    <td><input type="text" v-model="contact.postcode"/></td>
                    <td><input type="text" v-model="contact.address"/></td>
                    <td><input type="checkbox"  @click ="checkBox(contact.id, $event)" :value = "contact.id"></td>
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
                    contact: []
                },
                contacts:[],
                errors: null,
                checked: [],
            };
        },
        created: function(){
            let uri = 'http://client.test/api/clients/' + this.$route.params.id+'/edit';
            axios.get(uri).then((response) => {
                this.customer = response.data[0];
            });
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
        },
        methods: {
            updateClient(value, event) {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.customer, constraints);
                if(errors) {
                    this.errors = errors;
                    return;
                }
                //Update
                let uri ='http://client.test/api/clients/'+ this.$route.params.id;
                axios.patch(uri, this.customer)
                    .then((response) => {
                        this.$router.push('/customers');
                    });
                //Delete
                if(this.checked.length > 0) {
                    let uri = 'http://client.test/api/contacts/' + this.checked;
                    axios.delete(uri)
                        .then((response) => {
                            this.$router.push('/customers');
                        });
                }
            },
            checkBox(value, event){
                var checked = [];
                checked = event.target.value;
                this.checked.push(checked);
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

