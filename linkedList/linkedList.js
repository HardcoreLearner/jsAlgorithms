
class ListNode {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor(val) {
        // Construct a new LinkedList
        let liNode = new ListNode(val);
        this.list = liNode;
    }

    append(value) {
        // Adds a new node containing value to the end of the list
        let lastNode = this.list;
        while (lastNode) {
            if (lastNode.nextNode) {
                lastNode = lastNode.nextNode;
            } else {
                break;
            }
        }
        let newNode = new ListNode(value);
        lastNode.nextNode = newNode;
    }

    prepend(value) {
        // Adds a new node containing value to the start of the list
        let nextNode = this.list;
        let liNode = new ListNode(value);
        liNode.nextNode = nextNode;
        this.list = liNode;
    }

    size() {
    //returns the total number of nodes in the list
    let counter = 1;
    let lastNode = this.list;
        while (lastNode) {
            if (lastNode.nextNode) {
                lastNode = lastNode.nextNode;
                counter += 1;
            } else {
                break;
            }
        }
        return counter;
    }

    head() {
        // Return the first Node of the LinkedList
        return this.list;
    }

    tail() {
        // Return the last Node of the LinkedList
        let lastNode = this.list;
        while (lastNode) {
            if (lastNode.nextNode) {
                lastNode = lastNode.nextNode;
            } else {
                break;
            }
        }
        return lastNode;
    }

    at(nodeIndex) {
        // returns the node at the given index
        if (nodeIndex >= this.size()) {
            throw "Index out of range";
        }
        
        let nodeAtIndex = this.list;
        for (let index = 0; index < nodeIndex; index++) {
            nodeAtIndex = nodeAtIndex.nextNode;            
        }
        return nodeAtIndex;
    }

    pop() {
        // Removes the last element from the list
        let beforeLastNode = this.at(this.size() - 2);
        beforeLastNode.nextNode = null;
    }

    contains(value) {
        // returns true if the passed in value is in the list and otherwise returns false.
        let currentNode = this.head();
        for (let index = 0; index < this.size(); index++) {
            if (currentNode.value == value) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false
    }

    find(value) {
        // returns the index of the node containing value, or null if not found.
        if (!this.contains(value)) {
            return "This value is not in the LinkedList";
        }
        let currentNode = this.head();
        for (let index = 0; index < this.size(); index++) {
            if (currentNode.value == value) {
                return index;
            }
            currentNode = currentNode.nextNode;
        }
    }

    toString() {
        // represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
        let currentNode = this.head();
        let printList = "";
        for (let index = 0; index < this.size(); index++) {
            printList += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
            if (index == this.size() - 1) {
                printList += "null";
            }
        }
        return printList;
    } 
}

let linkLi = new LinkedList(1);
linkLi.append(2);
linkLi.append(3);
linkLi.append(4);
linkLi.append(5);
linkLi.prepend(3);
linkLi.prepend(4);
linkLi.append(5);

console.log(linkLi.toString());
