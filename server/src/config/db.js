// const mysql = require('mysql2/promise');

// const createPool = async () => ( 
//     mysql.createPool({ 
//         host: 'localhost',
//         database: 'main',
//         user: 'adam', 
//         password: 'password',
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//     })
// )

// const pool = createPool();
// module.exports =pool;

const { Sequelize, DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('main', 'adam', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        const Post = sequelize.define('Post', {
            pid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique: true
            },
            uid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false
            },
            postedAt: {
                type: DataTypes.TIME,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true
            },
            geoLocation: {
                type: DataTypes.GEOMETRY,
                allowNull: true
            },
            campus: {
                type: DataTypes.TINYINT,
                allowNull: true
            }
        }, {
            tableName: 'posts'
        })
        

    
        const result = await Post.findAll({
            attributes: ['campus']
        })
        console.log(JSON.stringify(result))        

    } catch (error) {
        console.error(error);
    }
}


main();