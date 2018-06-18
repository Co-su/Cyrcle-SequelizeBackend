module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        custId: {
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        serviceAddress: {
            type: Sequelize.STRING
        },

        accountType: {
            type: Sequelize.STRING
        },

        accountStatus: {
            type: Sequelize.STRING
        },

        plan: {
            type: Sequelize.STRING
        },   
        
        binType: {
            type: Sequelize.STRING
        },

        pickupDay: {
            type: Sequelize.STRING
        },

        mrr: {
            type: Sequelize.INTEGER
        },

        firstPickupDate: {
            type: Sequelize.STRING
        },

        nextPickupDate: {
            type: Sequelize.TEXT
        },        

        phone: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        dwelling: {
            type: Sequelize.STRING
        },

        totalPickups: {
            type: Sequelize.STRING
        },
 
        daysUsing: {
            type: Sequelize.INTEGER
        },

        totalPoundage: {
            type: Sequelize.INTEGER
        },

        scrapPoints: {
            type: Sequelize.STRING
        },

        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });
 
    return User;
 
}