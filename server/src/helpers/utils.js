function splitByCampus(posts){
    const result = {}
    let arr = []

    for(let i = 0 ; i < posts.length; i++){
        
        const post = posts[i];
        const formattedPost = {"latitude": post.geoLocation.coordinates[0], "longitude": post.geoLocation.coordinates[1], pid: post.pid}
        if(result[post.campus] === undefined) 
            result[post.campus] = [formattedPost]
        else
            result[post.campus].push(formattedPost)
    }
    return result;
}
module.exports = {
    splitByCampus
}