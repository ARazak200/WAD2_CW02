const nedb = require('nedb');
class MenuDish {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    //a function to seed the database of dishes
    Dishes_insert() {
        //mains- burger
        this.db.insert({
            DishID: "Main01",
            DishName: "Chicken Burger",
            DishDescription: "100% chicken breast, layered with fresh lettuce, ripe tomato and mayo on a toasted brioche bun.",
            DishIngredients: "Peri chicken, lettuce, tomato, mayo, brioche bun",
            DishPrice: "3.50",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry Main 01 Chicken Burger inserted');
        //mains- wraps
        this.db.insert({
            DishID: "Main02",
            DishName: "Chicken Wrap",
            DishDescription: "Fresh Chicken Wrapped in crunchy salad",
            DishIngredients: "Peri chicken, lettuce, tomato, mayo, Wrap",
            DishPrice: "3.50",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry main 02 wrap inserted');
        //drink- milkshakes
        this.db.insert({
            DishID: "Drink01",
            DishName: "Strawberry Milkshake",
            DishDescription: "creamy milkshake with freshly picked strawberries. option with alternative plant-based milk",
            DishIngredients: "strawberries, whole milk, sugar, ice cream, whipped cream",
            DishPrice: "2.00",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry Drink 01 milkshake inserted');
        //drink- irn bru
        this.db.insert({
            DishID: "Drink02",
            DishName: "Original Irn Bru",
            DishDescription: "330ml Can served cold",
            DishIngredients: "Carbonated Water, Sugar, Acid (Citric Acid), Flavourings, Sweeteners, Preservative, Colours.",
            DishPrice: "0.59",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry Drink 02 Irn bru inserted');

        //sides- fries
        this.db.insert({
            DishID: "Side01",
            DishName: "Fries",
            DishDescription: "Double dipped fresh cut fries for extra crispy crunch",
            DishIngredients: "Potato, salt",
            DishPrice: "1.50",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry Side 01 fries inserted');
        //sides- wings
        this.db.insert({
            DishID: "Side02",
            DishName: "Chicken Wings",
            DishDescription: "",
            DishIngredients: "chicken wings, salt, pepper, mixed spices, rapeseed oil ",
            DishPrice: "2.50",
            chefPick: "true"
        });
        //for later debugging
        console.log('db entry Side02 Wing inserted');
    }


    //a function to return all entries from the database
    getAllDishes() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, dishes) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(dishes);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', dishes);
                }
            })
        })
    }


    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }
    getPetersEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ author: 'Peter' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getPetersEntries() returns: ', entries);
                }
            })
        })
    }

    addEntry(DishName, DishDescription, DishIngredients, DishPrice) {
        var entry = {
            DishName: DishName,
            DishDescription: DishDescription,
            DishIngredients: DishIngredients,
            DishPrice: DishPrice
            //published: new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', DishName);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }
    /*
        addEntry(author, subject, contents) {
            var entry = {
                author: author,
                subject: subject,
                contents: contents,
                published: new Date().toISOString().split('T')[0]
            }
            console.log('entry created', entry);
            this.db.insert(entry, function (err, doc) {
                if (err) {
                    console.log('Error inserting document', subject);
                } else {
                    console.log('document inserted into the database', doc);
                }
            })
        }
        */
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }
    /*
        //a function to seed the database from the guestbook
        init() {
            this.db.insert({
                subject: 'I liked the exhibition',
                contents: 'nice',
                published: '2020-02-16',
                author: 'Peter'
            });
            //for later debugging
            console.log('db entry Peter inserted');
    
            this.db.insert({
                subject: "Didn't like it",
                contents: 'A really terrible style!',
                published: '2020-02-18',
                author: 'Ann'
            });
            //for later debugging
            console.log('db entry Ann inserted');
            
        }
    */
}
module.exports = MenuDish;