import React from 'react';
import { connect } from "react-redux";
import { publishPost } from "../actions";
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Draft extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {title: "", content: ""}
  }

  handleChange(field, value) {
    this.setState({[field]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const post = this.state;
    post.timestamp = Date.now();
    this.props.dispatch(publishPost(post));
    this.setState({title: "", content: ""});
    this.context.router.push('/');
  }

  render() {
    return (
      <form
        className="wrapper"
        onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={({target}) => this.handleChange("title", target.value)} />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Tell us your story...</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Tell us your story..."
            value={this.state.content}
            onChange={({target}) => this.handleChange("content", target.value)} />
        </FormGroup>

        <Button type="submit">
          Publish
        </Button>
      </form>

    );
  }
};

export default connect()(Draft);
