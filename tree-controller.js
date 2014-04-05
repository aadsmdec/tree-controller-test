/**
 * @module tree-controller
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;

exports.TreeNodeController = Montage.specialize({
    constructor: {
        value: function(controller, parent, content, depth) {
            var iterations = [],
                childrenPath,
                childrenContent;

            this._controller = controller;
            controller._nodeCount++;
            this.parent = parent;
            this.depth = depth;
            if (controller.expandedPath && content[controller.expandedPath] !== undefined) {
                this._expanded = content[controller.expandedPath];
            } else {
                this._expanded = controller.initiallyExpanded || false;
            }

            if (this._expanded) {
                controller._expandedNodeCount++;
            }
            
            childrenPath = "content." + (controller.childrenPath||"children");
            this.content = content;
            this._ignoreChildrenContentChange = true;
            this._cancelChildrenContentChangeListener = this.addRangeAtPathChangeListener(
                childrenPath, this, "handleChildrenContentChange");
            this._ignoreChildrenContentChange = false;
            childrenContent = this.getPath(childrenPath);

            this.children = this._createChildren(childrenContent, iterations);
            this.iterations = iterations;
        }
    },

    content: {
        value: null
    },

    _expanded: {
        value: false
    },

    expanded: {
        get: function() {
            return this._expanded;
        },
        set: function(value) {
            if (value !== this._expanded) {
                this._expanded = value;
                if (value) {
                    this._expand();
                } else {
                    this._collapse();
                }
                this._controller.handleIterationsChange();
            }
        }
    },

    _createChildren: {
        value: function(childrenContent, iterations) {
            return childrenContent.map(function(childContent) {
                var child = new this.constructor(this._controller, this, childContent,
                                                 this.depth + 1);

                iterations.push(child);
                if (child.expanded) {
                    iterations.swap(iterations.length, 0, child.iterations);
                }

                return child;
            }, this);
        }
    },
    
    _destroy: {
        value: function() {
            this._controller._nodeCount--;
            if (this.expanded) {
                this._controller._expandedNodeCount--;
            }
            this._controller = null;
            this.parent = null;
            this._cancelChildrenContentChangeListener();
            this.content = null;

            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._destroy();
            }
            this.children = null;
        }
    },
    
    _collapse: {
        value: function() {
            this._controller._expandedNodeCount--;
            this._removeIterationsFromParent(this.iterations.length, this);            
        }
    },

    _expand: {
        value: function() {
            this._controller._expandedNodeCount++;
            this._addIterationsToParent(this.iterations, this);
        }
    },
    
    _addIterationsToParent: {
        value: function(iterations, previousIteration) {
            var parentIterations,
                parentIterationsIndex;
            
            if (!this.parent) {
                this._addIterationsToController(iterations, previousIteration);
            } else if (this.parent.expanded) {
                parentIterations = this.parent.iterations;
                parentIterationsIndex = parentIterations.indexOf(previousIteration) + 1;
                parentIterations.swap(parentIterationsIndex, 0, iterations);
                this.parent._addIterationsToParent(iterations, previousIteration);
            }
        }
    },
    
    _removeIterationsFromParent: {
        value: function(iterationsCount, previousIteration) {
            var parentIterations,
                parentIterationsIndex;

            if (!this.parent) {
                this._removeIterationsFromController(iterationsCount, previousIteration);
            } else if (this.parent.expanded) {
                parentIterations = this.parent.iterations;
                parentIterationsIndex = parentIterations.indexOf(previousIteration) + 1;
                parentIterations.splice(parentIterationsIndex, iterationsCount);
                this.parent._removeIterationsFromParent(iterationsCount, previousIteration);
            }
        }
    },
    
    _addIterationsToController: {
        value: function(iterations, previousIteration) {
            var controllerIterations = this._controller.iterations,
                parentIterationsIndex;
            
            parentIterationsIndex = controllerIterations.indexOf(previousIteration) + 1;
            controllerIterations.swap(parentIterationsIndex, 0, iterations);
        }
    },
    
    _removeIterationsFromController: {
        value: function(iterationsCount, previousIteration) {
            var controllerIterations = this._controller.iterations,
                parentIterationsIndex;

            parentIterationsIndex = controllerIterations.indexOf(previousIteration) + 1;
            controllerIterations.splice(parentIterationsIndex, iterationsCount);
        }
    },

    /**
     * Finds and return the node having the given content.
     * Takes an optional second argument to specify the compare function to use.
     * note: If you are doing find operations frequently, it might be better to attach
     * a binding that will facilitate incremental updates and O(1) lookups.
     * `nodeForContent <- nodes{[content, this]}.toMap()`
     */
    findNodeByContent: {
        value: function (content, equals) {
            equals = equals || Object.is;
            if (equals(this.content, content)) {
                return this;
            }
            var node;
            for (var i = 0; i < this.children.length; i++) {
                if (node = this.children[i].findNodeByContent(content, equals)) {
                    break;
                }
            }
            return node;
        }
    },
    
    /**
     * Performs a traversal of the tree, executes the callback function for each node.
     * The callback is called before continuing the walk on its children.
     */
    preOrderWalk: {
        value: function (callback) {
            callback(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].preOrderWalk(callback);
            }
        }
    },

    /**
     * Performs a traversal of the tree, executes the callback function for each node.
     * The callback is called after continuing the walk on its children.
     */
    postOrderWalk: {
        value: function (callback) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].postOrderWalk(callback);
            }
            callback(this);
        }
    },
    
    handleChildrenContentChange: {
        value: function(plus, minus, index) {
            var children = this.children,
                iterations = this.iterations,
                iterationsIndex,
                nextIterationsIndex,
                iterationsCount,
                child,
                nextChild,
                newChildren,
                removedChildren,
                newIterations;
            
            if (this._ignoreChildrenContentChange) {
                return;
            }
            
            if (minus.length > 0) {    
                child = children[index];
                iterationsIndex = iterations.indexOf(child);
                nextChild = children[index + minus.length];
                nextIterationsIndex = iterations.indexOf(nextChild);
                
                if (iterationsIndex < 0) {
                    iterationsIndex = 0;
                }
                if (nextIterationsIndex < 0) {
                    nextIterationsIndex = iterations.length;
                }
                
                iterationsCount = nextIterationsIndex - iterationsIndex;
                removedChildren = this.children.splice(index, minus.length);
                iterations.splice(iterationsIndex, iterationsCount);
                this._removeIterationsFromParent(iterationsCount, iterations[iterationsIndex - 1] || this);
                for (var i = 0; i < removedChildren.length; i++) {
                    removedChildren[i]._destroy();
                }
            }
            
            if (plus.length > 0) {
                nextChild = children[index];
                newIterations = [];
                
                newChildren = this._createChildren(plus, newIterations);
                this.children.swap(index, 0, newChildren);
                
                if (nextChild) {
                    iterationsIndex = iterations.indexOf(nextChild);
                } else {
                    iterationsIndex = iterations.length;
                }
                this.iterations.swap(iterationsIndex, 0, newIterations);
                this._addIterationsToParent(newIterations, iterations[iterationsIndex-1] || this);
            }
            
            this._controller.handleIterationsChange();
        }
    }
});

/**
 * @class TreeController
 * @extends Montage
 */
exports.TreeController = Montage.specialize(/** @lends TreeController# */ {
    constructor: {
        value: function TreeController(content, childrenPath, initiallyExpanded, expandedPath) {
            this.super();

            this.childrenPath = childrenPath;
            this.initiallyExpanded = initiallyExpanded;
            this.expandedPath = expandedPath;
            this.content = content;
        }
    },

    childrenPath: {
        value: null
    },

    expandedPath: {
        value: null
    },

    iterations: {
        value: null
    },

    _nodeCount: {
        value: 0
    },
    
    _expandedNodeCount: {
        value: 0
    },
    
    _content: {
        value: null
    },
    
    content: {
        get: function() {
            return this._content;
        },
        set: function(value) {
            if (value !== this._content) {
                if (value) {
                    this.root = new this.NodeController(this, null, value, 0);

                    var iterations = [this.root];
                    if (this.root.expanded) {
                        iterations.swap(1, 0, this.root.iterations);
                    }
                    this.iterations = iterations;                    
                } else {
                    this.root.destroy();
                    this.root = null;
                    this.iterations = null;
                }
                this._content = value;
                this.handleIterationsChange();
            }
        }
    },
    
    _allExpanded: {
        value: null
    },
    
    allExpanded: {
        get: function() {
            return this._allExpanded;
        },
        set: function(value) {
            if (value !== this._allExpanded) {
                this.preOrderWalk(function(node) {
                    node.expanded = true;
                });
                this._allExpanded = value;
            }
        }
    },
    
    _noneExpanded: {
        value: null
    },

    noneExpanded: {
        get: function() {
            return this._noneExpanded;
        },
        set: function(value) {
            if (value !== this._noneExpanded) {
                if (value) {
                    this.preOrderWalk(function(node) {
                        if (node.expanded) {
                            node._expanded = false;
                        }
                        node.iterations = node.children.slice(0);
                    });
                    this._expandedNodeCount = 0;
                    this.iterations.splice(1, this.iterations.length - 1);
                }
                this._noneExpanded = value;
            }
        }
    },
    
    _changeOwnProperty: {
        value: function(propertyName, value) {
            if (value !== this[propertyName]) {
                this["_"+propertyName] = value;
                this.dispatchOwnPropertyChange(propertyName, value);
            }
        }
    },
    
    handleIterationsChange: {
        value: function() {
            var allExpanded, noneExpanded;
            
            if (this.iterations) {
                this._changeOwnProperty("allExpanded", this.iterations.length === this._nodeCount);
            }
            this._changeOwnProperty("noneExpanded", this._noneExpanded === 0);
        }
    },
    
    NodeController: {
        value: exports.TreeNodeController
    },
    
    /**
     * Finds and returns the node having the given content.
     * Takes an optional second argument to specify the compare function to use.
     * note: If you are doing find operations frequently, it might be better to attach
     * a binding that will facilitate incremental updates and O(1) lookups.
     * `nodeForContent <- nodes{[content, this]}.toMap()`
     */
    findNodeByContent: {
        value: function(content, equals) {
            if (this.root) {
                return  this.root.findNodeByContent(content, equals);
            }
            else {
                return null;
            }
        }
    },

    /**
     * Performs a traversal of the tree, executes the callback function for each node.
     * The callback is called before continuing the walk on its children.
     */
    preOrderWalk: {
        value: function(callback) {
            if (this.root) {
                this.root.preOrderWalk(callback);
            }
        }
    },

    /**
     * Performs a traversal of the tree, executes the callback function for each node.
     * The callback is called after continuing the walk on its children.
     */
    postOrderWalk: {
        value: function(callback) {
            if (this.root) {
                this.root.postOrderWalk(callback);
            }
        }
    }
});
