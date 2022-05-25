module.exports = (sequelize, DataTypes) => {
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
            type: DataTypes.GEOMETRY('POINT') ,
            allowNull: true
        },
        campus: {
            type: DataTypes.CHAR(20),
            allowNull: true
        }
    }, {
        tableName: 'posts'
    })
    // Post.create({
    //     text: "To the person I saw looking at my orgo test, you’re looking at the wrong persons test sorry bro wish i coulda helped",
    //     postedAt: '2022-05-24 20:46:56',
    //     location: 'Cook Douglass',
    //     geoLocation: { type: 'Point', coordinates: [39.807222,-76.984722]},
    //     campus: 'cookDoug'
    // })
    return Post;
};