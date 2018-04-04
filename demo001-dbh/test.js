let colors = require('colors');
let BlockchainOrm = require('./libs/BlockchainOrm/BlockchainOrm');
let BlockchainOrmEntry = require('./libs/BlockchainOrm/BlockchainOrmEntry');
var web3Wrapper = require('../../modules/web3Wrapper');

let orm = new BlockchainOrm({
    class: 'user'
});

console.log("-".repeat(80));

// get user by id
console.log(colors.green("\n- find user by id=1\n"));
console.log(orm.find(web3Wrapper.getTestAccount()));

// // get by field
// console.log(colors.green("\n- get by field first_name=Alexandru\n"));
// console.log(orm.where('first_name', 'Alexandru').first());
//
// console.log(colors.green("\n- get by field id=4\n"));
// console.log(orm.where('id', 4).get());
//
// // get all users by age
// console.log(colors.green("\n- get all users by age=24\n"));
// console.log(orm.where('age', 24).get());
//
// // get all users
// console.log(colors.green("\n- get all users\n"));
// console.log(orm.get());
//
// // get delete Valentin
// console.log(colors.red("\n- delete user by name=Valentin\n"));
// console.log(orm.where({ first_name: 'Valentin' }).delete());
//
// // get all users
// console.log(colors.green("\n- get all users\n"));
// console.log(orm.get());
//
// // get update Dan ages
// console.log(colors.blue("\n- update user by name=Dan\ set age=26\n"));
// console.log(orm.where({ first_name: 'Dan' }).update({ age: 26 }));
//
// // get all users
// console.log(colors.green("\n- get all users\n"));
// console.log(orm.get());
//
// // add new user
// console.log(colors.blue("\n- create new row name=Peter Ullrich\ set age=??n"));
// console.log(orm.create({ first_name: 'Peter', last_name: 'Ullrich', age: "??"}));
//
// // get all users
// console.log(colors.green("\n- get all users\n"));
// console.log(orm.get());

let user = orm.where('first_name', 'Alexandru').first();

console.log("\n");
console.log("-".repeat(80));
console.log("Before update:");
console.log(user.first_name);
console.log(user.last_name);
console.log(user.age);
console.log(user.job);
console.log('is deleted: ', user.deleted);

user.update({
    first_name: 'Sasha',
    age: 30,
});

console.log("\n");
console.log("-".repeat(80));
console.log("After update:");
console.log(user.first_name);
console.log(user.last_name);
console.log(user.age);
console.log(user.job);
console.log('is deleted: ', user.deleted);

console.log("\n");
console.log("-".repeat(80));
console.log("After delete:");
user.delete();
console.log(user.first_name);
console.log(user.last_name);
console.log(user.age);
console.log(user.job);
console.log('is deleted: ', user.deleted);

// get user by id (but dont wrap this time)
console.log(colors.green("\n- get first user but don't wrap\n"));
console.log(orm.dontWrap().first());
console.log('is deleted: ', user.deleted);

console.log(colors.green("\n- skip 1 and take 2\n"));
console.log(orm.skip(1).take(2).dontWrap().get());
