module.exports = class Tree{
    constructor(){
        const rootNode = {id: 0, name:"root"};
        this.root = new Node(rootNode);
    }
    // used when creating the tree
    addNode(node){
        const newNode = new Node(node);
        if(!newNode){
            console.log("error creating node");
            return;
        }
        const parentNode = this.findNode(newNode.parent);
        if(!parentNode){
            console.log("parent not found");
            return;
        }
        parentNode.children.push(newNode);
    }

    //used when adding node to exsisting tree
    addNewNode(parent, node){

        const newNode = new Node(node);
        if(!newNode){
            console.log("error creating node");
            return 400;
        }
        const parentNode = this.findParentNode(parent);
        if(!parentNode){
            console.log("parent not found");
            return 400;
        }
        parentNode.children.push(newNode);
        return newNode.id;
    }

    updateNode(id, name, myCache){
        const node = this.findNode(id);
        if(!node){
            console.log("No node exists with that id");
                return 400;
        }
        if(node.read_only == 1){
            console.log("cannot update read only nodes");
            return 400;
        }
            node.name = name;
            myCache.set("tree", this, 10000);
            return 200;
    }

    deleteNode(id){
        const node = this.findNode(id);
        const parentNode = this.findParentNode(id);


        if(!node){
            console.log("No node exists with that id");
                return 400;
        }
        if(node.read_only){
            console.log("cannot delete read only nodes");
            return 400;
        }
        
        //if this node has children assign them to parent node
        //TODO: loop through node.children and assignt their parent to new parent value
        if(node.children){
           parentNode.children = [...parentNode.children, node.children]
        } 
        const index =  parentNode.children.indexOf(id);
        if (index > -1) {
            parentNode.children.splice(index, 1);
        }
            return 200;
    }

    findNode(id){
        const queue = [this.root];
        while(queue.length){
            const node = queue.shift();
            if(node.id == id){
                return node;
            }else{
                if(node.children)
                for(const child of node.children){
                    queue.push(child);
                }
            }
        }
        return;
    }

    findParentNode(parentId){
        const queue = [this.root];
        while(queue.length){
            const node = queue.shift();
            if(node.id == parentId){
                return node;
            }else{
                if(node.children)
                for(const child of node.children){
                    queue.push(child);
                }
            }
        }
        return;
    }
}

function Node(node){
    if(node.id === null){
        console.log("Need an id for a node");
        return;
    }

    this.id = node.id;
    this.name = node.name ?? "";
    this.description = node.description ?? "";
    this.parent = node.parent;
    this.read_only = node.read_only ?? false;
    this.children = [];
}