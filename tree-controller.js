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
            this.parent = parent;
            this.depth = depth;
            if (controller.expandedPath && content[controller.expandedPath] !== undefined) {
                this._expanded = content[controller.expandedPath];
            } else {
                this._expanded = controller.initiallyExpanded || false;
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
            }
        }
    },

    _createChildren: {
        value: function(childrenContent, iterations) {
            return childrenContent.map(function(childContent) {
                this._controller._nodeCount++;
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
            this._removeIterationsFromParent(this.iterations.length, this);            
        }
    },

    _expand: {
        value: function() {
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

    handleChildrenContentChange: {
        value: function(plus, minus, index) {
            var iterations = this.iterations,
                iterationsIndex,
                nextIterationsIndex,
                iterationsCount,
                child,
                nextChild,
                newChildren,
                newIterations;
            
            if (this._ignoreChildrenContentChange) {
                return;
            }
            
            if (minus.length > 0) {    
                child = this.children[index];
                iterationsIndex = iterations.indexOf(child);
                nextChild = this.children[index + minus.length];
                nextIterationsIndex = iterations.indexOf(nextChild);
                
                if (iterationsIndex < 0) {
                    iterationsIndex = 0;
                }
                if (nextIterationsIndex < 0) {
                    nextIterationsIndex = iterations.length;
                }
                
                iterationsCount = nextIterationsIndex - iterationsIndex;
                this.children.splice(index, minus.length);
                iterations.splice(iterationsIndex, iterationsCount);
                this._removeIterationsFromParent(iterationsCount, iterations[iterationsIndex - 1] || this);
                for (var i = 0; i < minus.length; i++) {
                    minus[i]._destroy();
                }
            }
            
            if (plus.length > 0) {
                nextChild = this.children[index];
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
                    this.root = null;
                    this.iterations = null;
                }
                this._content = value;
            }
        }
    },
    
    NodeController: {
        value: exports.TreeNodeController
    }
});
