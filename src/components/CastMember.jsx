import React, { Component } from "react";

class CastMember extends Component {
  render() {
    const { profile_path } = this.props;
    const wrapStyle = {
      backgroundImage:
        profile_path && `url(http://image.tmdb.org/t/p/w90${profile_path})`
    };
    return (
      <div style={wrapStyle} className="castMember">
        <div />
      </div>
    );
  }
}

export default CastMember;
