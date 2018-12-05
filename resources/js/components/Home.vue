<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Vue.JS SPA</div>
                    <div class="card-body">
                        <router-link to="/customers/csv" class="btn btn-primary btn-sm">Csv</router-link>
                        <router-link to="/customers" class="btn btn-primary btn-sm">Customers</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        computed: {
            welcome() {
                return this.$store.getters.welcome
            }
        }
    }
</script>
<style scoped>
    .card-body {
        text-align: center;
        margin-bottom: 20px;
    }
    .card-body a{
        width: 110px;
        margin: 10px;
        font-size: 1.2rem;
    }
</style>
