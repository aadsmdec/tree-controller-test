/**
 * @module tree-controller
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;

exports.TreeNodeController = Montage.specialize({
    constructor: {
        value: function(controller, parent, content, depth, iterationsIndex) {
            var iterations = [];
            
            this._controller = controller;
            this.parent = parent;
            this.content = content;
            this.depth = depth;
            
            if (controller.expandedPath && content[controller.expandedPath] !== undefined) {
                this._expanded = content[controller.expandedPath];
            } else {
                this._expanded = controller.initiallyExpanded || false;
            }
            
            this._childrenContent = this.getPath("content." + (controller.childrenPath||"children"));
            
            if (this.expanded) {
                controller.iterations.splice(iterationsIndex, 0, this);
            }
            
            this.children = this._childrenContent.map(function(content) {
                var child = new this.constructor(
                    controller, this, content, depth + 1,
                    controller.iterations.length);
                iterations.push(child);
                iterations = iterations.concat(child.iterations);
                return child;
            }, this);
            
            this.iterations = iterations;
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
                //this._expanded = value;
                var startTime = window.performance.now();
                var iterationsIndex = this._findIterationsIndex();
                var currentTime = window.performance.now();
                console.log("expanded", currentTime - startTime);
                console.log("iterationsIndex", iterationsIndex);
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
            var node = this;
            var iterationsIndex = 0;
            var iterationsCount = this.iterations.length;

            while (node.parent && node.parent.expanded) {
                iterationsIndex = node.parent.iterations.indexOf(node);
                node.parent.iterations.splice(iterationsIndex + 1, iterationsCount);
                node = node.parent;
            }
            
            if (!node.parent) {
                iterationsIndex = this._controller.iterations.indexOf(node);
                this._controller.iterations.splice(iterationsIndex + 1, iterationsCount);
            }
        }
    },
    
    _expand: {
        value: function() {
            var node = this;
            var iterationsIndex = 0;
            var iterations;

            while (node.parent && node.parent.expanded) {
                iterations = node.parent.iterations;
                iterationsIndex = iterations.indexOf(node);
                node.parent.iterations = iterations.slice(0, iterationsIndex)
                    .concat(this.iterations)
                    .concat(iterations.slice(iterationsIndex + 1);
                node = node.parent;
            }

            if (!node.parent) {
                iterations = this._controller.iterations
                iterationsIndex = iterations.indexOf(node);
                this._controller.iterations = iterations.slice(0, iterationsIndex)
                    .concat(this.iterations)
                    .concat(iterations.slice(iterationsIndex + 1));
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
            this.expandedPath = expandedPath;
            this.initiallyExpanded = initiallyExpanded;
            this.iterations = [];
            this.root = new this.NodeController(this, null, content, 0);
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
