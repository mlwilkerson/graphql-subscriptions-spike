import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CommentsListingView from "./CommentsListingView";
import PostEditorView from "./PostEditorView";

const postsQuery = gql`
    query retrievePostsQuery { 
        posts { 
            id
            title
            body
        } 
    }
`;

const postsSubscription = gql`
    subscription onPostAddedSubscription {
        postAdded { 
            id 
            title 
            body 
        }
    }
`;

const withPostsData = graphql(postsQuery);

class PostsListingView extends Component {

    componentWillMount() {
        this.props.data.subscribeToMore({
            document: postsSubscription,
            variables: {},
            updateQuery: (previous, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return previous;
                }

                const newPost = subscriptionData.data.postAdded;

                if (!previous.posts.find((post) => post.id === newPost.id)) {
                    return Object.assign({}, previous, {posts: [newPost, ...previous.posts]});
                } else {
                    return previous;
                }
            }
        });
    }

    render() {
        let content = (<div>&nbsp;</div>);
        if (this.props.data) {
            if (this.props.data.loading) {
                content = (<div>Data loading! Please wait...</div>);
            } else if (this.props.data.error) {
                content = (<div>An error occurred. {this.props.data.error}</div>);
            } else if (this.props.data.posts) {
                let func = post => (
                    <div className="" key={post.id}>
                        <h3>{post.title}</h3>
                        <div className="">{post.body}</div>
                        <CommentsListingView postId={post.id}/>
                    </div>
                );
                content = this.props.data.posts.map(func)
            }
        }

        return (
            <div>
                <h1>Posts</h1>
                <PostEditorView/>
                {content}
            </div>
        );
    }
}

export default withPostsData(PostsListingView);
