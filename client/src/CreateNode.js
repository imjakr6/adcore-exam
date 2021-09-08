import React, { Component } from 'react';

class CreateNode extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      parent: "",
      read_only: "0"
    }
  }

  handleChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit = () => {
    if(this.state.id === null || this.state.parent === null){
      console.log("need id and parent to make a new node");
      return;
    }
    var data = this.state;
    this.props.onSubmit(data)
  }

    render() {
      const {id, name, description, parent, read_only} = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="new-node-container d-flex">
                <div className= "new-node-container-col d-flex flex-column">
                        <label>Node ID: </label>
                        <input name="id" vaule={id} placeholder="Node Id" onChange={this.handleChange}></input>
                        <label className="pt-2">Node Name: </label>
                        <input name="name" vaule={name} placeholder="Node Name" onChange={this.handleChange}></input>
                </div>
                <div className= "new-node-container-col d-flex flex-column px-2">
                    <label>Node Description: </label>
                    <input name="description" vaule={description} placeholder="Node Description" onChange={this.handleChange}></input>
                    <label className="pt-2">Parent: </label>
                    <input name="parent" vaule={parent} placeholder="Node Name" onChange={this.handleChange}></input>
                 
                </div>
                <div className= "new-node-container-col d-flex pt-4">
                    <label style={{width: "100px"}}>Read Only: </label>
                    <input name="read_only" checked={read_only} className="mt-1" type="checkbox" placeholder="Read Only" onChange={this.handleChange}></input>
                    <button style={{height: 30, width: 100, marginLeft: 10}}>Add Node</button>
                </div>
          </div>
          </form>
      )
    }
  }

export default CreateNode;