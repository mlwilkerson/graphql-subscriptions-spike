import React, {Component} from "react";
import PostsListingView from "../components/PostsListingView";
import ErrorBoundary from "../components/ErrorBoundary";

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
                    &copy; 2017 - Sentera, LLC
                </footer>
            </div>
        );
    }
}

export default PostsPage;
