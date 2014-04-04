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
        value: undefined
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
            var node = this;
            var iterationsIndex = 0;
            var iterationsCount = this.iterations.length;

            while (node.parent && node.parent.expanded) {
                iterationsIndex = node.parent.iterations.indexOf(this);
                node.parent.iterations.splice(iterationsIndex + 1, iterationsCount);
                node = node.parent;
            }

            if (!node.parent) {
                iterationsIndex = this._controller.iterations.indexOf(this);
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
                iterationsIndex = iterations.indexOf(this);
                iterations.swap(iterationsIndex + 1, 0, this.iterations);
                node = node.parent;
            }

            if (!node.parent) {
                iterations = this._controller.iterations
                iterationsIndex = iterations.indexOf(this);
                iterations.swap(iterationsIndex + 1, 0, this.iterations);
            }
        }
    },

    handleChildrenContentChange: {
        value: function(plus, minus, index) {
            debugger
            console.log("change", plus, minus, index);
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
