import React, { Component } from 'react';
import ReactTree from 'react-d3-tree';
import axios from 'axios';

import './App.css';
import AddNode from './AddNode';
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
    newNode: false,
    deleteNode: false,
    updateNode: false
  };

  componentDidMount() {
    this.getRoot()
      .then(res => this.setState({ root: res.root, loading: false }))
      .catch(err => console.log(err));
  }

  getRoot = async () => {
    const response = await fetch('/get_tree');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  toggleNewNode = () => {
    this.setState({deleteNode: false, updateNode: false, newNode: !this.state.newNode})
  }

  toggleDeleteNode = () => {
    this.setState({newNode: false, updateNode: false, deleteNode: !this.state.deleteNode})
  }

  toggleUpdateNode = () => {
    this.setState({newNode: false, deleteNode: false, updateNode: !this.state.updateNode})
  }

  createNode = () => {
      this.toggleNewNode();
      const body = {
      parent: 0, 
      node: {
        id: "50",
        name: "New Node",
        description: "new node desc",
        parent: "0",
        read_only: "0",
      }
    };
    axios.post('/create_node', body)
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  updateNode = () => {
    this.toggleUpdateNode();
    const body = {id: 1, name: "Node 0"};
    axios.post('/update_node', body)
        .then(response => console.log({response}))
        .catch(error => console.error('There was an error!', error));
  }

  deleteNode = () => {
    this.toggleDeleteNode()
    const body = {id: 17};
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
    toggleNode,
    foreignObjectProps
  }) => (
    <g>
      <foreignObject {...foreignObjectProps}>
        <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
          <h1 style={{ textAlign: "center" }}>{nodeDatum.id}</h1>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <h5 style={{ textAlign: "center" }}>{nodeDatum.description}</h5>
        </div>
      </foreignObject>
    </g>
  );

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
            <button onClick={this.createNode}>Add</button>
            <button onClick={this.deleteNode}>Delete</button>
            <button onClick={this.updateNode}>Update</button>
            <button onClick={this.exportNode}>Export</button>
            {this.state.newNode && <AddNode/>}
            {this.state.deleteNode && <DeleteNode/>}
            {this.state.updateNode && <UpdateNode/>}


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