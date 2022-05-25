function splitByCampus(posts){
    const result = {}
    let arr = []

    for(let i = 0 ; i < posts.length; i++){
        
        const post = posts[i];
        if(result[post.campus] === undefined) 
            result[post.campus] = [post]
        else
            result[post.campus].push(post)
    }
    return result;
}
module.exports = {
    splitByCampus
}