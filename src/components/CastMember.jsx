import React, { Component } from "react";

class CastMember extends Component {
  selectActor() {
    
  }

  render() {
    const { profile_path } = this.props;
    const wrapStyle = {
      backgroundImage:
        profile_path && `url(http://image.tmdb.org/t/p/w90${profile_path})`
    };
    return (
      <div onClick={this.selectActor} style={wrapStyle} className="castMember">
        <div />
      </div>
    );
  }
}

export default CastMember;
