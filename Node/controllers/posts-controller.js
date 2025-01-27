const User = require('../models/user-model');

exports.findAll = async(req,res) =>{
    console.log("Find all users questions");

    try{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (limit === 0) {
        limit = 10; // Προεπιλεγμένη τιμή αν το limit είναι 0
      }
    const startIndex = (page - 1) * limit;

    console.log(`Page: ${page}, Limit: ${limit}, StartIndex: ${startIndex}`);

    const result = await User.aggregate([
        { $unwind: "$posts" },
        { $project: {username:1,content:"$posts.content",date:"$posts.date",_id:"$posts._id"} },
        { $skip: startIndex },
        { $limit: limit }
      ]);
  
      console.log("Aggregated result:", result);
  
      // Υπολογίζει το συνολικό αριθμό των posts
      const totalItems = await User.aggregate([
        { $unwind: "$posts" },
        { $count: "total" }
      ]);
  
      console.log("Total items:", totalItems);
      const total = totalItems.length > 0 ? totalItems[0].total : 0;

      res.json({
        status: true,
        data: result,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalItems: total
      });
    } catch (err) {
      console.log("Error:", err);
      res.json({ status: false, data: err });
    }
}

exports.findOne = async(req,res) =>{
    const username = req.params.username;
    

    

    try{
        const user = await User.findOne(
            {username:username},
            {username:1,posts:1,_id:0});


        if (!user) {
            return res.status(404).json({ status: false, data: 'User not found' });
        }
        const posts = user.posts.slice(res.pagination.startIndex,res.pagination.startIndex + res.pagination.limit);
            console.log("Find posts for user",username)

        res.json({
            status:true,
            data:[{username:user.username,posts:posts}],
            totalPages:Math.ceil(user.posts.length/res.pagination.limit),
            currentPage:res.pagination.currentPage,
            totalItems:user.posts.length});
    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.create = async(req,res) =>{
    const username = req.params.username;
    const userPost = req.body.post;

    console.log("Insert post to user",username);
    try{
        const result = await User.updateOne(
            {username:username},
            {
                $push:{
                    posts:{content:userPost}
                }
            }
        )
        
        res.json({ status: true, data: result});
        console.log("Post for user",username,"inserted")
    }catch(err){
        console.log("Error inserting post", err);
        res.json({status:false,data:err});
    }
}

exports.update = async(req,res) =>{
    const username = req.params.username;
    const post_id = req.body._id;
    const postContent = req.body.post;

    
    if(!postContent){
        
        return res.status(400).json({status:false,data:"Post content is required"});
    }
   
  
    console.log("Update post for user: ",username, "post id: ",post_id, "post content: ",postContent);
// gia docs 8:29 mathima 26/09
    try{


        const result = await User.updateOne(
            {username:username,"posts._id":post_id},

            {
                $set:{
                    "posts.$.content":postContent
                }
            }
        )
        console.log("Update answer question for user ",username);
        res.json({status:true,data:result})
    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.delete = async(req,res) => {
    const username = req.params.username;
    const post_id = req.body._id;

    console.log("Delete the post for user",username);

    try{
        const result = await User.updateOne(
            {username:username},
            {
                $pull:{
                    posts:{_id:post_id}
                }
            }
        )
        res.json({status:true,data:result})

    }catch(err){
        res.json({status:false,data:err})
    }
}



exports.findLatestPosts = async(req,res) =>{
    console.log("Find latest posts");

    try{
        const total = await User.countDocuments({ "posts.0": { $exists: true } });
        const result = await User.aggregate([
            { $match: { "posts.0": { $exists: true } } },
            { $project: { username: 1, posts: { $slice: ["$posts", -1] }, _id: 0 } },
            { $skip: res.pagination.startIndex },
            { $limit: res.pagination.limit }
        ]);
        console.log("Query result:", result); 
        res.json({
            status: true,
            data: result,
            totalPages: Math.ceil(total / res.pagination.limit),
            currentPage: res.pagination.currentPage,
            totalItems: total    
        });

    }catch(err){
        console.log("Error:", err);
        res.json({status:false,data:err});

    }
}