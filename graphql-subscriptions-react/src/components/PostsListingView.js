import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import PostEditorView from "./PostEditorView";
import {CSSTransitionGroup} from "react-transition-group";
import './PostsListingView.css';
import PostView from "./PostView";

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
                content = (<div key={'data-loading'}>Data loading! Please wait...</div>);
            } else if (this.props.data.error) {
                content = (<div key={'error'}>An error occurred. {this.props.data.error}</div>);
            } else if (this.props.data.posts) {
                let func = post => (
                    <PostView post={post} key={post.id.toString()}/>
                );
                content = this.props.data.posts.map(func)
            }
        }

        return (
            <div>
                <h1>Posts</h1>
                <PostEditorView/>
                <CSSTransitionGroup
                    transitionName="posts"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {content}
                </CSSTransitionGroup>

            </div>
        );
    }
}

export default withPostsData(PostsListingView);
