/**
 * @module tree-controller
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;

exports.TreeNodeController = Montage.specialize({
    constructor: {
        value: function(controller, parent, content, depth, iterationsIndex) {
            this._controller = controller;
            this.parent = parent;
            this.content = content;
            this.depth = depth;
            
            if (controller.expandedPath && content[controller.expandedPath] !== undefined) {
                this.expanded = content[controller.expandedPath];
            } else {
                this.expanded = controller.initiallyExpanded || false;
            }
            
            this._childrenContent = this.getPath("content." + (controller.childrenPath||"children"));
            
            if (this.expanded) {
                controller.iterations.splice(iterationsIndex, 0, this);
            }
            
            this.children = this._childrenContent.map(function(content) {
                return new this.constructor(controller, this, content, depth + 1,
                                            controller.iterations.length);
            }, this);
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
