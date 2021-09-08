import React, { Component } from 'react';
import ReactTree from 'react-d3-tree';

import './App.css';

class App extends Component {
  state = {
    loading: true,
    root: {
      id: 0,
      name: "root",
      description: "root dec",
      read_only: true,
      children: null
    }
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
  };

  render() {
    const {root, loading} = this.state;
    if(!loading){
      return (
        <div className="d-flex">
          <div className="tree-container">
            <ReactTree data={root} orientation={"vertical"} depthFactor={100} nodeSize={{x: 100, y:100}} 
            separation={{nonSiblings: 0.5, siblings:1}} rootNodeClassName="node" branchNodeClassName="node" translate={{x:900, y:25}}/>
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