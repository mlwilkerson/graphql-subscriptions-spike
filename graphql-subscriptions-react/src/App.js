import React, {Component} from 'react';
import './App.css';
import PostsListingView from "./PostsListingView";
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {
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

export default App;
