import React, {Component} from "react";
import PropTypes from "prop-types";
import CommentsListingView from "./CommentsListingView";
import './PostView.css';

class PostView extends Component {
    render() {
        const {post} = this.props;

        return (
            <div className="card-holder">
                <div className="card" key={post.id}>
                    <div className="card-header">
                        <h4>{post.title}</h4>
                    </div>
                    <div className="card-body">
                        <div className="">{post.body}</div>
                        <div className="comments-section">
                            <h5>Comments</h5>
                            <CommentsListingView postId={post.id}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostView.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostView;
