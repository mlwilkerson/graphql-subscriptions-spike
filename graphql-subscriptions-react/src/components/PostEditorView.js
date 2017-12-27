import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './PostEditorView.css';

const createPost = gql`
  mutation CreatePostMutation($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const withCreatePostMutation = graphql(createPost);

class PostEditorView extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChangeBodyInput = this.onChangeBodyInput.bind(this);
        this.onChangeTitleInput = this.onChangeTitleInput.bind(this);
        this.state = {title: '', body: ''};
    }

    onClick() {
        const options = {
            variables: {title: this.state.title, body: this.state.body}
        };
        this.props.mutate(options).then(({data}) => {
            this.setState({body: '', title: ''});
        }).catch((error) => {
            console.error('Error with create post mutation.', error);
        });
    }

    onChangeBodyInput(event) {
        this.setState({body: event.target.value})
    }

    onChangeTitleInput(event) {
        this.setState({title: event.target.value})
    }

    render() {
        return (
            <div>
                <div className="formRow">
                    <input type="text"
                           className="form-control"
                           value={this.state.title}
                           onChange={this.onChangeTitleInput}/>
                </div>
                <div className="formRow">
                    <textarea name="bodyInput"
                          className="form-control"
                          value={this.state.body}
                          onChange={this.onChangeBodyInput}/>
                </div>
                <div className="formRow">
                    <button className="btn btn-primary"
                            onClick={this.onClick}>
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

export default withCreatePostMutation(PostEditorView);
