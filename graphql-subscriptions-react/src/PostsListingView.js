import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const postsSubscription = gql`
    subscription postWasPublished {
        publishedPost {
            id
            title
            body
            comments {
                id
                body
            }
        }
    }
`;

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

const subscriptionHandler = props => {
    return {
        subscribeToNewPosts: params => {
            return props.posts.subscribeToMore({
                document: postsSubscription,
                variables: {
                },
                updateQuery: (prev, {subscriptionData}) => {
                    console.info('Subscription fired!', subscriptionData);
                    return prev;
                    // if (!subscriptionData.data) {
                    //     return prev;
                    // }
                    //
                    // const publishedPost = subscriptionData.data.publishedPost;
                    //
                    // return Object.assign({}, prev, {
                    //     entry: {
                    //         comments: [publishedPost, ...prev.entry.posts]
                    //     }
                    // });
                }
            });
        }
    };
};

const optionsFn = ({params}) => ({
    variables: {
        // repoName: `${params.org}/${params.repoName}`
    }
});

// const withPostsData = graphql(postsQuery, {name: 'posts', options: optionsFn, props: subscriptionHandler});
const withPostsData = graphql(postsQuery);


class PostsListingView extends Component {

    render() {
        let content = (<div>&nbsp;</div>);
        if (this.props.data){
            if (this.props.data.loading) {
                content = (<div>Data loading! Please wait...</div>);
            } else if (this.props.data.error) {
                content = (<div>An error occurred. {this.props.data.error}</div>);
            } else if (this.props.data.posts) {
                let func = post => (
                    <div className="" key={post.id}>
                        <h3>{post.title}</h3>
                        <div className="">{post.body}</div>
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
