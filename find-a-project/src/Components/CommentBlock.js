import React, { useEffect, useState } from 'react';
import {  
    Card,
    TextField,
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Button,
    Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import { deleteComment,createComment } from '../Redux/actions/post';


const useStyle = makeStyles((theme) => ({
    root: {
        margin: 35,
        maxWidth: 800,
        padding: 10
    },
    potrait:{
        width:theme.spacing(3),
        height: theme.spacing(3)
    },
    reply:{
        
        paddingLeft:15
    },
    tag:{
        marginLeft: 15
    },
    submit:{
        marginTop:5,
        marginBottom:5
    }

}));

const initialState = {
    id:"",
    userId:"",
    content:"",  
}

export default function CommentBlock(){
    const dispatch = useDispatch();
    const { postData } = useSelector(state => state.postData);
    const { comments } = postData;
    const idOfPost = postData._id
    const classes = useStyle();
    const [comment, setComment] = useState('');
    const [loggedInUserId, setUserId] = useState('');

    useEffect(() => {
        if (localStorage.getItem('profile')) {
            const { result } = JSON.parse(localStorage.getItem('profile'));
            setUserId(result?._id);
        }
    })
    const submitComment = () => {
        // Handle Submission here
        const formData = { id:idOfPost, userId:loggedInUserId, content:comment};
        dispatch(createComment(formData,idOfPost));
    }
    
    // const { content, author } = comments;
    // const { firstName, lastName } = author;
    const handleDelete = (id,postId) => {
        dispatch(deleteComment(id,postId));
    }

    const handleRedirect = (targetUser) => {
        window.location.href = `/Profile/${targetUser}`;
    }

    const commentBlocks = comments.map((item) => {
        const { content, author,  postId } = item;
        const commentId = item._id;
        const { firstName, lastName, userType, _id } = author;
        return(
        <Card>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.potrait} onClick={() => {handleRedirect(_id)}}>{firstName[0].toString()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        <Typography variant="h7">
                            { firstName + " " + lastName }
                        </Typography>    
                        <Chip className={classes.tag} variant="outlined" label={ userType } color="primary"/>
                    </ListItemText>
                </ListItem>
                <Typography className={classes.reply} variant="body1">
                    { content }
                    { loggedInUserId === _id ? 
                    <Button variant="text" color="secondary" onClick={()=>{handleDelete(commentId,postId)}}>DELETE</Button>
                    : null }
                </Typography>
            </List>
        </Card>
        );
    });
    return(
        <Card className={classes.root}>
            <Typography variant="h5">Comments:</Typography>
            <TextField fullWidth multiline rows={4} variant="outlined" onChange={(event) => setComment(event.target.value)}/>
            <Button classes={classes.submit} fullWidth variant="contained" color="primary" disabled={!loggedInUserId} onClick={submitComment}>SUBMIT COMMENT</Button>
            { commentBlocks }
        </Card>
    );
}