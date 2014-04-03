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
    
    createDataTreeNode: {
        value: function(shape) {
            var childrenCount = shape[0] || 0;
            var childrenShape;
            var children = new Array(childrenCount);

            if (childrenCount) {
                childrenShape = shape.slice(1);
                for (var i = 0; i < childrenCount; i++) {
                    children[i] = this.createDataTreeNode(childrenShape);
                }
            }
            
            return {
                children: children
            };
        }
    },  
    
    runTest: {
        value: function(treeShape) {
            var rootNode = this.createDataTreeNode(treeShape);
        }
    },
    
    handleCreateTreeButtonAction: {
        value: function(event) {
            this.runTest(event.detail.get("treeShape"));
        }
    }
});
