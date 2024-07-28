import { useState } from "react";
import axios from "axios";

function PostCreate(){
    const [title, setTitle] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        }).catch((error) => console.log(error));;
        setTitle('');
    };
    return (
        <div className="post-create">
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={ e => setTitle(e.target.value) }/>
                </div>
                <button className="btn btn-primary mt-1">Submit</button>
            </form>
        </div>
    );
}
export default PostCreate;