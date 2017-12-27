import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CommentsListingView from "./CommentsListingView";

// const postsSubscription = gql`subscription postAdded { id title body }`;

const postsQuery = gql`
{ 
    posts { 
        id
        title
        body
        comments {
            id
            body
        } 
    } 
}`;


const withPostsData = graphql(postsQuery);


class PostsListingView extends Component {

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
                {content}
            </div>
        );
    }
}

export default withPostsData(PostsListingView);
