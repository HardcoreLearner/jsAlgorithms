class BinaryTreeNode {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        function mergeSortRec(arr) {
            // Base Case return the elemen
            if (arr.length <= 1) {
                return arr;
            } else {
                let leftSide = arr.slice(0, arr.length / 2);
                let rightSide = arr.slice(arr.length / 2, arr.length);
                function fusion(a, b) {
                    let mergedArr = [];
                    let indexTotalMerged = a.length + b.length;    
                    for (let index = 0; index < indexTotalMerged; index++) {
                        if (a.length == 0 && b.length != 0) {
                            mergedArr.push(b[0]);
                            b.shift();
                        } else if (b.length == 0 && a.length != 0) {
                            mergedArr.push(a[0]);
                            a.shift();
                        } else {
                            let leftElem = a[0];
                            let rightElem = b[0];
                            if (leftElem < rightElem) {
                                mergedArr.push(leftElem);
                                a.shift();
                            } else {
                                mergedArr.push(rightElem);
                                b.shift();
                            }
                        }
                    }
                    return mergedArr
                }
                let mergedArr = fusion(mergeSortRec(leftSide), mergeSortRec(rightSide));
                return mergedArr;
            }
        }
        function buildTree(arr) {
            if (arr.length == 1) {
                return new BinaryTreeNode(arr[0]);
            } else if (arr.length == 2) {
                mergeSortRec(arr);
                let middle = arr[0];
                let newMiddle = new BinaryTreeNode(middle);
                if (arr[1] > middle) {
                    let secondNode = new BinaryTreeNode(arr[1]);
                    newMiddle.right = secondNode;
                    return newMiddle;
                } else {
                    let secondNode = new BinaryTreeNode(arr[1]);
                    newMiddle.left = secondNode;
                    return newMiddle;
                }
            } else {
                let middle = arr[Math.trunc(arr.length / 2)];
                let leftArr = arr.slice(0, Math.trunc(arr.length / 2));
                let rightArr = arr.slice(Math.trunc(arr.length / 2) + 1, arr.length);

                let treeNode = new BinaryTreeNode(middle);
                treeNode.left = buildTree(leftArr);
                treeNode.right = buildTree(rightArr);
                return treeNode;
            }
        }
        let processeddArr = [...new Set(arr)];
        processeddArr = mergeSortRec(processeddArr);
        this.root = buildTree(processeddArr);
    }

    find(val) {
        // insert the value correctly on our Tree
        let currentNode = this.root;
        while (currentNode) {
            if (currentNode.value == val) {
                return currentNode;
            } else if (val < currentNode.value) {
                if (currentNode.left == null) {
                    return "value not found";
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if (currentNode.right == null) {
                    return "value not found";
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }

    insert(val) {
        // insert the value correctly on our Tree
        let currentNode = this.root;
        if (this.find(val).value == val) {
            return "Value already in BST";
        }
        while (currentNode) {
            if (val < currentNode.value) {
                if (currentNode.left == null) {
                    let newNode = new BinaryTreeNode(val);
                    currentNode.left = newNode;
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if (currentNode.right == null) {
                    let newNode = new BinaryTreeNode(val);
                    currentNode.right = newNode;
                    break;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }

    delete(val) {
        // insert the value correctly on our Tree
        let currentNode = this.root;
        if (this.find(val).value == "value not found") {
            return "Can't delete non existant value";
        }
        else if (this.find(val).left == null && this.find(val).right == null) {
            while (currentNode) {
                if (currentNode.value > val) {
                    if (currentNode.left.value == val) {
                        currentNode.left = null;
                        break;
                    } else {
                        currentNode = currentNode.left;
                    }
                } else {
                    if (currentNode.right.value == val) {
                        currentNode.right = null;
                        break;
                    } else {
                        currentNode = currentNode.right;
                    }
                }
            }
        }
        else if ((this.find(val).left != null && this.find(val).right == null) || (this.find(val).right != null && this.find(val).left == null)) {
            // Il faudra gérer le cas si c'est le premier noeud
            while (currentNode) {
               if (currentNode.value > val) {
                    if (currentNode.left.value == val) {
                        if (currentNode.left.left === null) {
                            currentNode.left = currentNode.left.right;
                            break;
                        } else {
                            currentNode.left = currentNode.left.left;
                            break;
                        }
                    } else {
                        currentNode = currentNode.left;
                    }
               } else {
                if (currentNode.right.value == val) {
                    if (currentNode.right.left === null) {
                        currentNode.right = currentNode.right.right;
                        break;
                    } else {
                        currentNode.right = currentNode.right.left;
                        break;
                    }
                } else {
                    currentNode = currentNode.right;
                }
               }
            }
        }
        else if (this.find(val).left != null && this.find(val).right != null) {
            while (currentNode.value != val) {
                if (currentNode.value > val) {
                    currentNode = currentNode.left;
                } else {
                    currentNode = currentNode.right;
                }
            }
            function allChildren(node) {
                let arrValues = []
                if (node.left == null && node.right == null) {
                    arrValues.push(node.value);
                    return arrValues;
                }
                else if (node.left != null && node.right == null) {
                    arrValues.push(node.value);
                    return arrValues.concat(allChildren(node.left));
                } else if (node.left == null && node.right != null) {
                    arrValues.push(node.value);
                    return arrValues.concat(allChildren(node.right));
                } else {
                    arrValues.push(node.value);
                    return arrValues.concat(allChildren(node.right), allChildren(node.left));
                }
            }
            let rightValues = allChildren(currentNode.right);
            let min = Math.min(...rightValues);
            let nodeToChange = currentNode.right;
            let ancientNode = currentNode;
            while(nodeToChange) {
                if (nodeToChange.value == min) {
                    if (nodeToChange.right) {
                        if (nodeToChange.value < ancientNode.value) {
                            ancientNode.left = nodeToChange.right;
                            currentNode.value = min;
                            break;
                        } else {
                            ancientNode.right = nodeToChange.right;
                            currentNode.value = min;
                            break;
                        }
                    } else {
                        // pas d'enfant
                        if (nodeToChange.value > ancientNode.value) {
                            ancientNode.right = null;
                            currentNode.value = min;
                            break;
                        } else {
                            ancientNode.left = null;
                            currentNode.value = min;
                            break;
                        }
                    }
                } else if (nodeToChange.value > min) {
                    ancientNode = nodeToChange;
                    nodeToChange = nodeToChange.left;
                    
                } else {
                    ancientNode = nodeToChange;
                    nodeToChange = nodeToChange.right;
                }
            }
        }
    }

    levelOrder(funcLevelOrder = null) {
        let queue = [];
        let values = [];
        let firstNode = this.root;
        queue.push(firstNode);
        if (funcLevelOrder == null) {
            while(queue.length != 0) {
                values.push(queue[0].value);
                if (queue[0].left) {
                    queue.push(queue[0].left);
                }
                if (queue[0].right) {
                    queue.push(queue[0].right);
                }
                queue.shift();
            }
        } else {
            while(queue.length != 0) {
                values.push(funcLevelOrder(queue[0].value));
                if (queue[0].left) {
                    queue.push(queue[0].left);
                }
                if (queue[0].right) {
                    queue.push(queue[0].right);
                }
                queue.shift();
            }
        }
        return values;
    }

    preOrder(func = null) {
        // root -> left -> right
        let queue = [];
        let firstNode = this.root;
        
        function preOrderTraversal(node) {
            let nodeHolder = [];
            if (node == null) {
                return nodeHolder;
            }
            nodeHolder.push(node.value);
            return nodeHolder.concat(preOrderTraversal(node.left), preOrderTraversal(node.right));
        }
        queue = preOrderTraversal(firstNode);
        if (func == null) {
            return queue;
        } else {
            return queue.map(func);
        }
    }

    inOrder(func = null) {
        // left -> root -> right
        let root = this.root;
        let res = [];
        inOrderTraversal(root);
        function inOrderTraversal(node) {
            let val = [];
            if (node == null) {
                return;
            }
            inOrderTraversal(node.left);
            res.push(node.value);
            inOrderTraversal(node.right);
        }
        if (func == null) {
            return res;
        } else {
            return res.map(func);
        }
    }

    postOrder(func = null) {
        // left -> right -> root 
        let root = this.root;
        let res = [];
        inOrderTraversal(root);
        function inOrderTraversal(node) {
            let val = [];
            if (node == null) {
                return;
            }
            inOrderTraversal(node.left);
            inOrderTraversal(node.right);
            res.push(node.value);
        }
        if (func == null) {
            return res;
        } else {
            return res.map(func);
        }
    }

    height() {
        // on doit parcourir pour avoir tous les noeuds qui n'ont pas d'enfants, à chaque fois pour chacun incrémenter, mettre dans un tableau, choisir l'incrément le plus important du tableau comme étant la taille de notre arbre;
        function maxDepth(node) {
            if (node == null) {
                return 0;
            } else {
                /* compute the depth of each subtree */
                let lDepth = maxDepth(node.left);
                let rDepth = maxDepth(node.right);
                /* use the larger one */
                if (lDepth > rDepth) {
                    return (lDepth + 1);
                } else {
                    return (rDepth + 1);
                }
            }
        }
        return (maxDepth(this.root));
    }

    depth(val) {
        let currentNode = this.root;
        let counter = 0;
        if (val == currentNode.value) {
            return counter;
        } else {
            while (currentNode.value != val) {
                if (currentNode.value > val) {
                    currentNode = currentNode.left;
                    counter += 1;
                } else {
                    currentNode = currentNode.right;
                    counter += 1;
                }
            }
        }
        return counter;
    }

    isBalanced() {
        function height(node) {
            // on doit parcourir pour avoir tous les noeuds qui n'ont pas d'enfants, à chaque fois pour chacun incrémenter, mettre dans un tableau, choisir l'incrément le plus important du tableau comme étant la taille de notre arbre;
            function maxDepth(node) {
                if (node == null) {
                    return 0;
                } else {
                    /* compute the depth of each subtree */
                    let lDepth = maxDepth(node.left);
                    let rDepth = maxDepth(node.right);
                    /* use the larger one */
                    if (lDepth > rDepth) {
                        return (lDepth + 1);
                    } else {
                        return (rDepth + 1);
                    }
                }
            }
            return (maxDepth(node));
        }
        // cette structure est balancé si la taille du sous-arbre de droite et de celui de gauche ne diffère pas plus d'un;
        if (this.root == null) {
            return true;
        } else {
            let leftDepth = height(this.root.left);
            let rightDepth = height(this.root.right);
            if (Math.abs(leftDepth - rightDepth) <= 1) {
                return true;
            } else {
                return false;
            }      
        }
    }

    rebalance() {
        if (!this.isBalanced()) {
            let allValues = this.levelOrder();
            let newTree = new Tree(allValues);
            console.log(allValues);
            console.log(newTree);
            return newTree;
        } else {
            return "Already balanced";
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function squared(x) {
    return x * x;
}

function rand1000arr() {
    let arr = [];
    for (let index = 0; index < 1000; index++) {
        const element = Math.floor(Math.random() * 100);
        arr.push(element);
    }
    return arr;
}

let randomArr = rand1000arr();
let newTree = new Tree([randomArr]);
console.log(newTree.isBalanced(), newTree.levelOrder(), newTree.preOrder(), newTree.postOrder(), newTree.inOrder());
newTree.insert(103);
newTree.insert(1009);
newTree.insert(10321);
newTree.insert(1033);
newTree.insert(10311122);
newTree.insert(10312121212);
console.log(newTree.isBalanced());
newTree = newTree.rebalance();
console.log(newTree.isBalanced(), newTree.levelOrder(), newTree.preOrder(), newTree.postOrder(), newTree.inOrder());
prettyPrint(newTree.root);
