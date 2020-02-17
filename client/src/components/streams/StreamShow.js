import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    // allow component get access to actual DOM element, <video> here.
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  // fetch stream successfully in the future, load the video
  componentDidUpdate() {
    this.buildPlayer();
  }

  // clean resources used by component
  // this will be called everytime we navigate to other page.
  componentWillUnmount() {
    this.player.destroy(); // stop streaming
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const id = this.props.match.params.id;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
