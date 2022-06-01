const readyMockPosts = require('../../mockPosts.json').map(post => (
    {
        "postedAt": post.postedAt,
        "text": post.text,
        "campus": post.campus,
        "location": post.location,
        "geoLocation": post.coordinates === undefined ? undefined : { type: 'Point', coordinates: post.coordinates.split(",") }
    }
))

module.exports =  (sequelize, DataTypes) => {
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        postedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        geoLocation: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: true
        },
        campus: {
            type: DataTypes.CHAR(20),
            allowNull: true
        }
    }, {
        tableName: 'posts'
    })
    // await Post.sync({ force: 'force' })

    // for (let i = 0; i < readyMockPosts.length; i++) {
    //     let post = await Post.build(readyMockPosts[i])
    //     try{
    //         await post.save()
    //     }catch(err){
    //         console.log("\n\n\n\n"+JSON.stringify(post)+"\n\n\n\n")

    //     }

    // }
    return Post;
};