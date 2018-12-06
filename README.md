                
                                              Description
After you clone this project, do the following:

```bash                      
# go into the project
cd application

# create a .env file
cp .env.example .env

# install composer dependencies
composer update

# install npm dependencies
npm install
npm install --save validate.js vue-resource vue-router vuex

# generate a key for your application
php artisan key:generate
 
# add the database connection config to your .env file
DB_CONNECTION=mysql
DB_DATABASE=vuespa_db
DB_USERNAME=root
DB_PASSWORD=

# run webpack and watch for changes
npm run watch
```


