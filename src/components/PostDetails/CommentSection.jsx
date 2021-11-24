import { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../redux/actions/postsActions'
import useStyles from './styles'

export default function CommentSection({ post }) {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const commentsRef = useRef()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.length > 0 ? (
                        comments?.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>{c.split(':')[1]}
                            </Typography>
                        ))) : (
                            <Typography gutterBottom variant="subtitle1">
                                no comments
                            </Typography>
                        )
                    }
                    <div ref={commentsRef} />
                </div>
               {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <br />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>Comment</Button>
                    </div>
               )}
            </div>
        </div>
    )
}
