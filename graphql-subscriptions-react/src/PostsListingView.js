import React, {Component} from "react";
import {graphql} from 'react-apollo';
import {gql} from "apollo-client-preset";

const withPostsData = graphql(gql`{ posts { id, title, body, comments {id, body} } }`);

class PostsListingView extends Component {

    render() {
        let content = (<div>nbsp;</div>);
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

        return (
            <div>
                <h1>Posts</h1>
                {content}
            </div>
        );
    }
}

export default withPostsData(PostsListingView);
