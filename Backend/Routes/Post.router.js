import express from 'express'
import userAuthentiction from '../Middlewares/UserAuthentiction.js';
import upload from '../Config/Multer.config.js';
import { addNewPost,getAllPosts,getUserPost,toggleLikePost,addComment,getcommentofPost,deletePost,bookmarkPost, userOnePost } from '../Controller/Post.controller.js';
const postRouter = express.Router()
//=====Add new Post =====
postRouter.post('/new/post',userAuthentiction,upload.single('image'),addNewPost)
//=====Get All Post=====
postRouter.get('/allpost',userAuthentiction,getAllPosts)
//=====Get user Post=====
postRouter.get('/userpost',userAuthentiction,getUserPost)
//=====Get user particulr Post=====
postRouter.get("/userOnePost/:postId",userAuthentiction,userOnePost)
//=====Like and unLike post=====
postRouter.post('/like/:id',userAuthentiction,toggleLikePost)
//===== Add Comment=====
postRouter.post('/comment/:id',userAuthentiction,addComment)
//=====Get Comments of Post (particuler)=====
postRouter.get('/postcomment/:id',getcommentofPost)
//=====Delete Post=====
postRouter.post('/delete/:id',userAuthentiction,deletePost)
//=====Bookmarks post=====
postRouter.post('/bookmarks/:id',userAuthentiction,bookmarkPost)
export default postRouter;