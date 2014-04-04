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
            this.addRangeAtPathChangeListener(childrenPath, this, "handleChildrenContentChange");
            this._content = content;
            childrenContent = this.getPath(childrenPath);

            this.children = childrenContent.map(function(content) {
                var child = new this.constructor(controller, this, content, depth + 1);

                iterations.push(child);
                if (child.expanded) {
                    iterations = iterations.concat(child.iterations);
                }
                return child;
            }, this);

            this.iterations = iterations;
        }
    },

    _content: {
        value: null
    },

    content: {
        get: function() {
            return this._content;
        },
        set: function(value) {
            this._content = value;
        }
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
                //var iterationsIndex = this._findIterationsIndex();
                if (value) {
                    this._expand();
                } else {
                    this._collapse();
                }
                //console.log("iterationsIndex", iterationsIndex);
            }
        }
    },

    _findIterationsIndex: {
        value: function() {
            var node = this;
            var iterationsIndex = 0;

            while (node.parent && node.parent.expanded) {
                iterationsIndex += node.parent.iterations.indexOf(node) + 1;
                node = node.parent;
            }

            if (node.parent) {
                return -1;
            } else {
                return iterationsIndex;
            }
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

    _createChildrenNodes: {
        value: function(childrenContent, iterations) {
            return childrenContent.forEach(function(childContent) {
                var child = new this.constructor(this._controller, this, childContent,
                                                 this.depth + 1);

                iterations.push(child);
                if (child.expanded) {
                    iterations = iterations.concat(child.iterations);
                }
                return child;
            }, this);
        }
    },
    
    handleChildrenContentChange: {
        value: function(plus, minus, index) {
            if (plus.length > 0) {
                var iterations = this.iterations;
                var nextChild = this.children[index];
                var iterationsIndex;
                var newChildren;                
                var newIterations = [];
                
                newChildren = this._createChildrenNodes(plus, newIterations);
                this.children.swap(index, 0, newChildren);
                
                if (nextChild) {
                    iterationsIndex = iterations.indexOf(nextChild);
                } else {
                    iterationsIndex = iterations.length;
                }
                this.iterations.swap(iterationsIndex, 0, newIterations);
                this._addIterationsToParent(newIterations, iterations[iterationsIndex-1]);
            }
            //console.log("change", plus, minus, index);
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
            var iterations;

            this.super();

            this.childrenPath = childrenPath;
            this.expandedPath = expandedPath;
            this.initiallyExpanded = initiallyExpanded;
            this.root = new this.NodeController(this, null, content, 0);

            iterations = this.root.iterations.slice(0);
            iterations.unshift(this.root);
            this.iterations = iterations;
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

    NodeController: {
        value: exports.TreeNodeController
    }
});
