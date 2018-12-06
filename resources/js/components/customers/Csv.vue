<template>
    <div class="container">
        <div class="panel panel-sm">
            <div class="panel-heading">
                <h4>CSV Import</h4>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
                    <div class="col-sm-9">
                        <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
                    </div>
                </div>
                <div class="col-sm-offset-3 col-sm-9">
                    <div class="checkbox-inline">
                        <label for="header_rows"><input type="checkbox" id="header_rows"> File contains header row?</label>
                    </div>
                </div>

                <div class="col-sm-offset-3 col-sm-9 ">
                    <a href="#" class="btn btn-primary" @click="parseCSV()" >Parse CSV</a>
                    <!--</div>-->
                    <!--<div class="col-sm-offset-3 col-sm-9">-->
                    <a href="#" class="btn btn-success" @click="saveCustomers()" >Save Customers</a>
                </div>
                <table class="table" v-if="parse_csv">
                    <thead>
                    <tr>
                        <th v-for="key in parse_header"
                            @click="sortBy(key)"
                            :class="{ active: sortKey == key }">
                            {{ key | capitalize }}
                            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="csv in parse_csv">
                        <td v-for="key in parse_header">
                            {{csv[key]}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    // import validate from 'validate.js';
    export default {
        name: "Csv",
        data() {
            return {
                channel_name: '',
                channel_fields: [],
                channel_entries: [],
                parse_header: [],
                parse_csv: [],
                sortOrders:{},
                sortKey: '',
                state: '',
                customers: [],
                first_name: [],
                email: [],
                errors: null,
            };
        },
        filters: {
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        },
        methods: {
            sortBy: function (key) {
                var vm = this;
                vm.sortKey = key;
                vm.sortOrders[key] = vm.sortOrders[key] * -1;
            },
            csvJSON(csv) {
                var vm = this;
                var lines = csv.split("\n");
                var result = [];
                var headers = lines[0].split(",");
                var first_name = [];
                var email = [];
                vm.parse_header = lines[0].split(",");
                lines[0].split(",").forEach(function (key) {
                    vm.sortOrders[key] = 1;
                });
                lines.map(function(line, indexLine){
                    if (indexLine < 1) return; // Jump header line
                    var obj = {};
                    var currentline = line.split(",");
                    headers.map(function(header, indexHeader) {
                        obj[header] = currentline[indexHeader];
                        if(indexHeader == 0) {
                            first_name.push(currentline[indexHeader]);
                        }
                        else if(indexHeader == 1){
                            email.push(currentline[indexHeader]);
                        }
                    });
                    result.push(obj);
                });
                this.first_name = first_name;
                this.email = email;
                result.pop(); // remove the last item because undefined values
                return result // JavaScript object
            },
            loadCSV(e) {
                this.state = e;
            },
            parseCSV: function() {
                var state = this.state;
                var vm = this;
                if (window.FileReader) {
                    var reader = new FileReader();
                    reader.readAsText(state.target.files[0]);
                    // Handle errors load
                    reader.onload = function(state) {
                        var csv = state.target.result;
                        vm.parse_csv = vm.csvJSON(csv);
                    };
                    reader.onerror = function(state) {
                        if(state.target.error.name == "NotReadableError") {
                            alert("Canno't read file !");
                        }
                    };
                }
                else {
                    alert('FileReader are not supported in this browser.');
                }
            },
            saveCustomers: function(){
                var token = axios.defaults.headers.common["Authorization"];
                axios.post('http://client.test/api/clients/csv', {first_name: this.first_name, email: this.email},
                    { Authorization: token }
                ).then((response) => {
                    console.log('response', response);
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
            console.log('csv');
        }
    }
</script>

<style scoped>
    .btn-primary{
        font-size: 1.1rem;
        margin-right: 20px;
    }
    .btn-success{
        font-size: 1.1rem;
        margin-right: 20px;
    }

    .panel {
        border: 2px solid #dfdfdf;
        box-shadow: rgba(0, 0, 0, 0.15) 0 1px 0 0;
        margin: 10px;
    }
    .panel.panel-sm {
        max-width: 700px;
        margin: 10px auto;
    }
    .panel-heading {
        border-bottom: 2px solid #dfdfdf;
    }
    .panel-heading h1, .panel-heading h2, .panel-heading h3, .panel-heading h4, .panel-heading h5, .panel-heading h6 {
        margin: 0;
        padding: 0;
    }
    .panel-body .checkbox-inline {
        padding: 15px 20px;
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }




</style>