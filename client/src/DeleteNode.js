import React, { Component } from 'react';

class DeleteNode extends Component {
    render() {
      return (
          <div className="new-node-container d-flex">
                <div className= "new-node-container-col d-flex flex-column">
                        <label>Node ID: </label>
                        <input placeholder="Node Id"></input>
                </div>
                <div className= "new-node-container-col d-flex pt-4">
                    <button style={{height: 30, marginLeft: 10}}>Delete Node</button>
                </div>
          </div>
      )
    }
  }

export default DeleteNode;