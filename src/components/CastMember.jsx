import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { selectActor } from "./actions/Actions";

class CastMember extends Component {
  render() {
    const { getActorData, profile_path, id } = this.props;
    const wrapStyle = {
      backgroundImage:
        profile_path && `url(http://image.tmdb.org/t/p/w90${profile_path})`
    };
    return (
      <div
        onClick={() => getActorData(id)}
        style={wrapStyle}
        className="castMember"
      >
        <div />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getActorData: id => {
    dispatch(selectActor(id));
  }
});

export default connect(null, mapDispatchToProps)(CastMember);
