// 获取一个元素距离根节点的左侧距离
function getElementLeft(elem){
    var resultLeft = elem.offsetLeft;
    var current = elem.offsetParent;
    while(current != null){
        resultLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return resultLeft;
}