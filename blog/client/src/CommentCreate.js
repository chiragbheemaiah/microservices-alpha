import { useState } from "react";
import axios from "axios";
function CommentCreate({postId}){
    const [content, setContent] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        }).catch((error) => console.log(error));;
        setContent('');
    }
    return (
        <div>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>New Comment</label>
                    <input className="form-control" value={content} onChange={ e => setContent(e.target.value) }/>
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
}
export default CommentCreate