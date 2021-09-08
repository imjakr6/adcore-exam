import React, { Component } from 'react';

class DeleteNode extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
    }
  }
  handleChange = (event) =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit = () => {
    if(this.state.id === null){
      console.log("need id to delete a new node");
      return;
    }
    var data = this.state;
    this.props.onSubmit(data)
  }
    render() {
      const {id} = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
          <div className="new-node-container d-flex">
                <div className= "new-node-container-col d-flex flex-column">
                        <label>Node ID: </label>
                        <input name="id" vaule={id} placeholder="Node Id" onChange={this.handleChange}></input>
                </div>
                <div className= "new-node-container-col d-flex pt-4">
                    <button style={{height: 30, marginLeft: 10}}>Delete Node</button>
                </div>
          </div>
        </form>
      )
    }
  }

export default DeleteNode;