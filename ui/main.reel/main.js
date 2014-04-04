/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var TreeController = require("montage/core/tree-controller").TreeController;
var NewTreeController = require("./tree-controller").TreeController;

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
                name: this.generateName(),
                children: children
            };
        }
    },  
    
    generateName: {
        value: function() {
            var name = "";
            
            for (var i = 0; i < 5; i++) {
                // 97 - char code for "a"
                name += String.fromCharCode(Math.random()*25 + 97);
            }
            
            return name;
        }
    },
    
    runTest: {
        value: function(treeShape, initiallyExpanded) {
            console.log("runTest", treeShape);
            var startTime, currentTime;
            var rootNode = this.createDataTreeNode(treeShape);
            var Controller;
            
            if (this.templateObjects.useNewTreeController.checked) {
                Controller = NewTreeController;
            } else {
                Controller = TreeController;
            }

            startTime = window.performance.now();
            
            treeController = new Controller(rootNode, "children", initiallyExpanded);
            
            currentTime = window.performance.now();
            console.log("new TreeController()", rootNode, currentTime - startTime);
            startTime = currentTime;
            
            this.templateObjects.tree.treeController = treeController;
            
            currentTime = window.performance.now();
            console.log("tree.treeController", currentTime - startTime);
        }
    },
    
    handleCreateTreeButtonAction: {
        value: function(event) {
            this.runTest(JSON.parse(event.detail.get("treeShape")),
                         this.templateObjects.initiallyExpanded.checked);
        }
    }
});
