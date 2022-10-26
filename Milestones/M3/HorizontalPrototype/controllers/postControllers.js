 const Post = require('../model/Post');   
 
 exports.getAllPosts =  async  (req, res, next ) => {
    try {
        const [posts, _] = await Post.findAll();
        
        res.status(200).json({count: posts.length, posts}); 
    } catch (error) {
        console.log(error);
        next(error);  
    }
 }

 exports.createNewPost = async (req, res, next) => {
    try {
        let {title, body, rating} = req.body; 
        let post = new Post(title, body, rating);
    
        post = await post.save();
     
        res.status(201).json({ message: "Post created "});
    } catch (error) {
        console.log(error);
        next(error);   
    }
 }

 exports.getPostByTitle = async (req, res, next) => {
    try {
        let postTitle = req.params.title;
        let [post, _] = await Post.findByTitle(postTitle);

        if (post.length == 0) {
            try {
                let postTitle = req.params.title;
                let temp = Array.from(postTitle);
                let [post, _] = await Post.findByTitle(temp[0].toUpperCase());
                 
                res.status(200).json({post: post[0]});
            } catch (error) {
                console.log(error);  
                next(error);  
            } 
            return;
        }
        
         
        res.status(200).json({post: post[0]});
    } catch (error) {
        console.log(error);  
        next(error);  
    }
}