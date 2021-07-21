const sequelize = require('../config/connection');
const { User } = require('../models');
const testUser = require('./users.json');


const seedDatabase = async () => {
    await sequelize.sync({force: true})
    await User.bulkCreate(testUser, {
        individualHooks: true,
        returning: true
    })
    process.exit(0)
}

seedDatabase()