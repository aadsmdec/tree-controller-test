montageDefine("4511b85","ui/tree.reel/tree.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <link rel=stylesheet type=text/css href=tree.css>\n    <script type=text/montage-serialization>{"owner":{"properties":{"element":{"#":"owner"}}},"indent":{"prototype":"ui/tree.reel[Indent]","properties":{"element":{"#":"indent"}},"bindings":{"iteration":{"<-":"@repetition:iteration.object"}}},"rangeController":{"prototype":"montage/core/range-controller","bindings":{"content":{"<-":"@owner.treeController.iterations"}}},"repetition":{"prototype":"montage/ui/repetition.reel","properties":{"element":{"#":"repetition"},"contentController":{"@":"rangeController"},"isSelectionEnabled":true}},"treeNode":{"prototype":"montage/ui/text.reel","properties":{"element":{"#":"treeNode"},"value":"Text"},"bindings":{"value":{"<-":"@repetition:iteration.object.content.name"}}}}</script>\n</head>\n<body>\n    <div data-montage-id=owner class=Tree>\n        <div data-montage-id=repetition class=Tree-list>\n            <div data-montage-id=indent class=Tree-list-row>\n                <div data-montage-id=treeNode></div>\n            </div>\n        </div>\n    </div>\n</body>\n</html>'});