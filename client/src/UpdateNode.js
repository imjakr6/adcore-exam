import React, { Component } from 'react';

class UpdateNode extends Component {
    render() {
      return (
          <div className="new-node-container d-flex">
                <div className= "new-node-container-col d-flex flex-column">
                        <label>Node ID: </label>
                        <input placeholder="Node Id"></input>
                        <label className="pt-2">Node Name: </label>
                        <input placeholder="Node Name"></input>
                </div>
                <div className= "new-node-container-col d-flex pt-4">
                    <button style={{height: 30, marginLeft: 10}}>Update Node</button>
                </div>
          </div>
      )
    }
  }

export default UpdateNode;