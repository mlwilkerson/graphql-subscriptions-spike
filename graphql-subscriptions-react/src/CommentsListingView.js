import React, {Component} from "react";

class CommentsListingView extends Component {

    render() {
        let content = null;
        if (this.props.comments) {
            content = this.props.comments.map((comment) => {
                return (<li key={comment.id}>{comment.body}</li>)
            });
        }
        return (
            <div>
                <h4>Comments</h4>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}

// export default withPostsData(PostsListingView);
export default CommentsListingView;
