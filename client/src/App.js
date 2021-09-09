import React, { Component } from 'react';
import ReactTree from 'react-d3-tree';
import axios from 'axios';

import './App.css';
import CreateNode from './CreateNode';
import DeleteNode from './DeleteNode';
import UpdateNode from './UpdateNode';

class App extends Component {
  state = {
    loading: true,
    root: {
      id: "0",
      name: "root",
      description: "root dec",
      read_only: 1,
      children: []
    },
    createNode: false,
    deleteNode: false,
    updateNode: false
  };

  componentDidMount() {
    this.getTree()
      .then(res => this.setState({ root: res.root, loading: false }))
      .catch(err => console.log(err));
  }

  getTree = async () => {
    const response = await fetch('/get_tree');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  resetTree = () => {
    console.log("reset")
    this.getNewTree()
      .then(res => this.setState({ root: res.root, loading: false }))
      .catch(err => console.log(err))
  }

  getNewTree = async () => {
    const response = await fetch('/reset_tree');
    console.log(response)
    const body = await response.json();
    console.log(body.body)

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  toggleCreateNode = () => {
    this.setState({deleteNode: false, updateNode: false, createNode: !this.state.createNode})
  }

  toggleDeleteNode = () => {
    this.setState({createNode: false, updateNode: false, deleteNode: !this.state.deleteNode})
  }

  toggleUpdateNode = () => {
    this.setState({createNode: false, deleteNode: false, updateNode: !this.state.updateNode})
  }

  createNode = (data) => {
      const {id, name, description, parent, read_only} = data;
      const body = {
      parent: parent, 
      node: {
        id: id ?? "",
        name: name ?? "",
        description: description ?? "",
        parent: parent ?? "",
        read_only: read_only ?? "",
      }
    };

    axios.post('/create_node', body)
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  updateNode = (data) => {
    const {id, name} = data;

    const body = {id: id, name: name};
    axios.post('/update_node', body)
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  deleteNode = (data) => {
    const {id} = data;
    const body = {id: id};
    console.log(data)
    axios.post('/delete_node', body)
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  exportNode = () => {
    axios.post('/export_node')
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  renderForeignObjectNode = ({
    nodeDatum,
    foreignObjectProps
  }) => {
    var backgroundColor = nodeDatum.read_only == 1 ? "red": "#dedede";
    return(
    <g>
      <foreignObject {...foreignObjectProps}>
        <div style={{ border: "1px solid black", backgroundColor: backgroundColor }}>
          <h1 style={{ textAlign: "center" }}>{nodeDatum.id}</h1>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <h5 style={{ textAlign: "center" }}>{nodeDatum.description}</h5>
        </div>
      </foreignObject>
    </g>
  )};

  render() {
    const {root, loading} = this.state;
    const foreignObjectProps = { width: 150, height: 150, x: 0 };

    if(!loading){
      return (
        <div className="page-container">
          <div className="tree-container">
            <ReactTree data={root} orientation={"vertical"} depthFactor={400} nodeSize={{x: 200, y:150}} zoom={0.35} 
              renderCustomNodeElement={(rd3tProps) => this.renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })}
              separation={{nonSiblings: 1, siblings:1}} rootNodeClassName="node" branchNodeClassName="node" translate={{x:900, y:25}} //TODO: need to translate by calc
              />
          </div>
          <div className="btn-container">
            <h5 style={{color: "red"}}>RED NODES ARE READ-ONLY</h5>
            <button style={{marginRight: 5}} onClick={this.toggleCreateNode}>Create</button>
            <button style={{marginRight: 5}} onClick={this.toggleDeleteNode}>Delete</button>
            <button style={{marginRight: 5}} onClick={this.toggleUpdateNode}>Update</button>
            {/* <button style={{marginRight: 5}} onClick={this.resetTree}>RESET TREE</button> */}
            <button onClick={this.exportNode}>Export</button>
            {this.state.createNode && <CreateNode onSubmit={(data) => this.createNode(data)}/>}
            {this.state.deleteNode && <DeleteNode onSubmit={(data) => this.deleteNode(data)}/>}
            {this.state.updateNode && <UpdateNode onSubmit={(data) => this.updateNode(data)}/>}


          </div>
        </div>
      );
    }
    return (
      <p>loading</p>
    )
  }
}

export default App;