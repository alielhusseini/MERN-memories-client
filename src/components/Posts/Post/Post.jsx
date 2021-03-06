import { useState } from "react";
import useStyles from "./styles";
import { Card,CardActions,CardContent,CardMedia,Button,Typography, ButtonBase } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/postsActions";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useNavigate } from 'react-router-dom'

export default function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate()
  const [likes, setLikes] = useState(post?.likes)

  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = post.likes.find(id => id === userId) // check if the current user has liked the post or not 

  const handleLikeClick = async() => {
    dispatch(likePost(post._id)) // updating the likes in database which can be a bit time consuming for the user interface, hence with the below addition, we are updating the UI instantly without interfering with backend (the below code doesn't effect our logic in any shape or form except by making it more reactive for the UI)
    if (hasLikedPost) {
      setLikes(post.likes.filter(id => id !== userId)) // in case of unlike
    } else {
      setLikes([...post.likes, userId]) // in case of like
    }
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(id => id === userId) ? 
      (<><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? "s" : ""}`}</>) 
      : 
      (<><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}</>);
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
  };

  const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost} component="span" name="test">
        <CardMedia className={classes.media} image={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} title={post.title}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{ color: "white" }} size="small" onClick={e => {e.stopPropagation();setCurrentId(post._id)}}><MoreHorizIcon fontSize="default" /></Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLikeClick} disabled={!user?.result}><Likes /></Button>
        {(user?.result?.googleId === post?.creator ||user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" />Delete</Button>
        )}
      </CardActions>
    </Card>
  );
}
