import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './CommentEditorView.css';
import PropTypes from "prop-types";

const createComment = gql`
  mutation CreateCommentMutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
    }
  }
`;

const withCreateCommentMutation = graphql(createComment);

class CommentEditorView extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChangeBodyInput = this.onChangeBodyInput.bind(this);
        this.state = {postId: this.props.post.id, body: ''};
    }

    onClick() {
        const options = {
            variables: {postId: this.state.postId, body: this.state.body}
        };
        this.props.mutate(options).then(({data}) => {
            this.setState({body: ''});
        }).catch((error) => {
            console.error('Error with create comment mutation.', error);
        });
    }

    onChangeBodyInput(event) {
        this.setState({body: event.target.value})
    }

    render() {
        return (
            <div>
                <div className="formRow">
                    <textarea name="bodyInput"
                              className="form-control"
                              value={this.state.body}
                              onChange={this.onChangeBodyInput}/>
                </div>
                <div className="formRow">
                    <button className="btn btn-primary btn-sm"
                            onClick={this.onClick}>
                        Save comment
                    </button>
                </div>
            </div>
        );
    }
}

CommentEditorView.propTypes = {
    post: PropTypes.object.isRequired
};

export default withCreateCommentMutation(CommentEditorView);
