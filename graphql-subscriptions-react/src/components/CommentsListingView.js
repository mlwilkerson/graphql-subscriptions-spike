import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CommentEditorView from './CommentEditorView';

const commentsQuery = gql`
    query CommentsForPost($postId: ID!) { 
        comments (postId: $postId) { 
            id
            body
        } 
    }
`;

const commentsSubscription = gql`
    subscription onCommentAddedSubscription($postId: ID!) {
        commentAdded (postId: $postId) {
            id
            body
        }
    }
`;


const withCommentsData = graphql(commentsQuery, {options: ({postId}) => ({variables: {postId}})});


class CommentsListingView extends Component {

    componentWillMount() {
        this.props.data.subscribeToMore({
            document: commentsSubscription,
            variables: {postId: this.props.postId},
            updateQuery: (previous, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return previous;
                }
                const newComment = subscriptionData.data.commentAdded;

                if (!previous.comments.find((comment) => comment.id === newComment.id)) {
                    return Object.assign({}, previous, {comments: [newComment, ...previous.comments]});
                } else {
                    return previous;
                }
            }
        });
    }

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
                <CommentEditorView postId={this.props.postId}/>
                {content}
            </div>
        );
    }
}

export default withCommentsData(CommentsListingView);
