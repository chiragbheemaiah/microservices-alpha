function CommentList({comments}){
    const renderComments = comments.map(comment => {
        let content;
        if(comment.status === 'approved'){
            content = comment.content;
        }
        if(comment.status === 'pending'){
            content = <i>This comment is awaiting moderation</i>;
        }
        if(comment.status === 'rejected'){
            content = 'This comment was rejected for objectionable content';
        }
        return (
            <li key={comment.id}>
                { content }
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