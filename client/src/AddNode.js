import React, { Component } from 'react';

class AddNode extends Component {
    render() {
      return (
          <div className="new-node-container d-flex">
                <div className= "new-node-container-col d-flex flex-column">
                        <label>Node ID: </label>
                        <input placeholder="Node Id"></input>
                        <label className="pt-2">Node Name: </label>
                        <input placeholder="Node Name"></input>
                </div>
                <div className= "new-node-container-col d-flex flex-column px-2">
                    <label>Node Description: </label>
                    <input placeholder="Node Description"></input>
                    <label className="pt-2">Parent: </label>
                    <input type="number" placeholder="Node Name"></input>
                 
                </div>
                <div className= "new-node-container-col d-flex pt-4">
                    <label style={{width: "100px"}}>Read Only: </label>
                    <input className="mt-1" type="checkbox" placeholder="Read Only"></input>
                    <button style={{height: 30, width: 100, marginLeft: 10}}>Add Node</button>
                </div>
          </div>
      )
    }
  }

export default AddNode;