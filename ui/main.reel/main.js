/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
        }
    },
    
    createDataTree: {
        value: function(treeShape) {
            var treeRoot = {};
            var children = [];
            
        }
    },
    
    createDataTreeNode: {
        value: function(shape) {
            var childrenCount = shape[0];
            var childrenShape;
            var children;

            if (childrenCount) {
                childrenShape = shape.slice(1);
                children = new Array(childrenCount);
                for (var i = 0; i < childrenCount; i++) {
                    children[i] = this.createDataTreeNode(childrenShape);
                }
            }
        }
    },  
    
    handleCreateTreeButtonAction: {
        value: function(event) {
            this.createDataTree(event.detail.get("treeShape"));
        }
    }
});
