import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import CsvCustomers from './components/customers/Csv.vue';
import EditCustomer from './components/customers/Edit.vue';
import DeleteCustomer from './components/customers/Delete.vue';
import Customer from './components/customers/View.vue';

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: CustomersList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: 'csv',
                component: CsvCustomers
            },
            {
                path: ':id',
                component: Customer
            },

            {
                path: 'edit/:id',
                component: EditCustomer
            },
            {
                path: 'delete/:id',
                component: DeleteCustomer
            },


        ]
    }
];