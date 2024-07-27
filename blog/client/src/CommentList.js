import { useState, useEffect } from "react";
import axios from "axios";

function CommentList({postId}){
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }
    useEffect(() => {
        fetchComments();
    }, []);
    console.log(comments);
    const renderComments = comments.map(comment => {
        return (
            <li key={comment.id}>
                { comment.content }
            </li>
        );
    });
    return (
        <div>
            <ul>
                {renderComments}
            </ul>
        </div>
    );
}
export default CommentList;