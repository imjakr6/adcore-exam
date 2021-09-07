import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    root: {
      id: null,
      name: null,
      description: null,
      read_only: null,
      children: null
    },
    tree: []
  };

  componentDidMount() {
    this.getRoot()
      .then(res => this.setState({ root: res.root }))
      .then(() => this.makeTree())
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

  printNode(node){
    <div className = "box">
      <p>{node.id}</p>
      <p>{node.name}</p>
      <p>{node.description}</p>
    </div>
  }

  addToTree(node){    
    console.log(node);
    this.state.tree.push( 
      <li key={node.id}>{node}</li>
    )
  }

  makeTree(){
    const queue = [this.state.root];
    console.log(queue);
    while(queue.length){
      const node = queue.shift();
      this.addToTree(node);
      if(node.children)
        for(const child of node.children){
            queue.push(child);
        }
    }
    console.log(this.state.tree)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {this.state.tree}
        </header>
      </div>
    );
  }
}

export default App;
