/**
 * @module tree-controller
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;

exports.TreeNodeController = Montage.specialize({
    constructor: {
        value: function(controller, parent, content, depth, iterationsIndex) {
            var iterations = [this];
            
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
                iterations = child.iterations.concat(iterations);
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
                this._expanded = value;                
            }
        }
    },
    
    _findIterationsIndex: {
        value: function() {
            var node = this;
            var iterationsIndex = 0;
            
            while (node.expanded && node.parent) {
                iterationsIndex += node.parent.children.indexOf(node) + 1;
                node = node.parent;
            }
            if (node.parent) {
                return iterationsIndex;
            } else {
                return -1;
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
