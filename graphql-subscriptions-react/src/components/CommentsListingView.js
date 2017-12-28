import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const commentsQuery = gql`
    query CommentsForPost($postId: ID!) { 
        comments (postId: $postId) { 
            id
            body
        } 
    }
`;

const withCommentsData = graphql(commentsQuery, {
    options: ({postId}) => ({variables: {postId}})
});


class CommentsListingView extends Component {

    render() {
        let content = null;
        if (this.props.data) {
            if (this.props.data.loading) {
                content = (<div>Data loading! Please wait...</div>);
            } else if (this.props.data.error) {
                content = (<div className="text-danger">An error occurred. {this.props.data.error}</div>);
            } else if (this.props.data.comments) {
                content = (
                    <ul>
                        {this.props.data.comments.map((comment) => (<li key={comment.id}>{comment.body}</li>))}
                    </ul>
                )
            }
        }

        return (
            <div>
                <h5>Comments</h5>
                {content}
            </div>
        );
    }
}

export default withCommentsData(CommentsListingView);
