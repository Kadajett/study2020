"use strict";

let count = 0;
let found = false;

function createBinaryNode(key) {
  return {
    key,
    left: null,
    right: null,
    addLeftNode(key) {
      const newLeft = createBinaryNode(key);
      this.left = newLeft;
      return newLeft;
    },
    addRightNode(key) {
      const newRight = createBinaryNode(key);
      this.right = newRight;
      return newRight;
    },
  };
}

function createBinaryTree(rootKey) {
  const root = createBinaryNode(rootKey);

  return {
    root,
    print(traversalType = "IN_ORDER", findKey) {
      let result = "";

      // If this is the first element in results, don't print the arrow.
      const visit = (node) => {
       
        if (!node || found) return;
        result += result.length === 0 ? node.key : ` => ${node.key}`;
        if(findKey && findKey === node.key) {
            console.log('found key: ', node.key);
            found = true;
            return;
        }
        count++;
        
      };

      Traversals[traversalType](this.root, visit);
      return result;
    },
    search(traversalType = 'IN_ORDER', key) {
        console.log(this.print(traversalType, key));
        console.log(`Found ${key} in ${count} iterations`);
    }
  };
}

const Traversals = {
  IN_ORDER: (node, visitFn) => {
    debugger;
    if (!!node) {
      Traversals.IN_ORDER(node.left, visitFn);
      visitFn(node);
      Traversals.IN_ORDER(node.right, visitFn);
    }
  },
  PRE_ORDER: (node, visitFn) => {
    if (!!node) {
      visitFn(node);
      Traversals.PRE_ORDER(node.left, visitFn);
      Traversals.PRE_ORDER(node.right, visitFn);
    }
  },
  POST_ORDER: (node, visitFn) => {
    if (!!node) {
      Traversals.POST_ORDER(node.left, visitFn);
      Traversals.POST_ORDER(node.right, visitFn);
      visitFn(node);
    }
  },
};

const tree = createBinaryTree("a");
const b = tree.root.addLeftNode("b");
const c = tree.root.addRightNode("c");
const d = b.addLeftNode("d");
const e = b.addRightNode("e");
const f = c.addLeftNode("f");
const g = c.addRightNode("g");
const h = d.addLeftNode("h");
const i = d.addRightNode("i");

tree.search("PRE_ORDER", 'i');
