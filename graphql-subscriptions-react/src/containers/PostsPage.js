import React, {Component} from "react";
// import {graphql} from 'react-apollo';
// import gql from 'graphql-tag';
import PostsListingView from "../components/PostsListingView";
import ErrorBoundary from "../components/ErrorBoundary";


// const postsSubscription = gql`subscription postAdded { id title body }`;

// const postsQuery = gql`
// {
//     posts {
//         id
//         title
//         body
//         comments {
//             id
//             body
//         }
//     }
// }`;


// const withPostsData = graphql(postsQuery);


class PostsPage extends Component {

    render() {
        return (
            <div className="">
                <header className="">
                    <h1>Apollo Client spike solution</h1>
                </header>
                <section className="">
                    <ErrorBoundary>
                        <PostsListingView/>
                    </ErrorBoundary>
                </section>
                <footer className="">

                </footer>
            </div>
        );
    }
}

// export default withPostsData(PostsListingView);

export default PostsPage;
