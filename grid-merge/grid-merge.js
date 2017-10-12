// 参数说明：
// element：该表格要挂载的父元素节点；
// gridOptions:创建表格;
// var gridOptions = {
//     columnDefs: [
//                 {field:'year', headerName:'数据年份'},
//                 {field:'用水量', headerName:'用水量'},
//                 {field:'用电量', headerName:'用电量'},
//                 ],
//     rowData: [{year:'2015',用水量:'0.00000000000000000',用电量:'3.4'},
//                 {year:'2015',用水量:'0.0',用电量:'13.4'},
//                 {year:'2016',用水量:'0.0',用电量:'13.4'}],
//     //enableColResize: true,
//     //enableSorting: true,
//     rowHeight: 40,
//     headerHeight: 26,
//     tableHeight:300
// };
// ifMerge：是否合并单元格;



function fixMergeGridInit(element,gridOptions){ 
    element.style.overflow = 'hidden';
    initDOM();

    var headThead = document.getElementById(element.id + 'Head'); // 头部的thead
    var bodyThead = document.getElementById(element.id + 'BodyThead'); // 身体的thead
    var bodyTbody = document.getElementById(element.id + 'BodyTbody'); // 身体的身体
    var gridBody = document.getElementById(element.id + 'GridBody'); // 身体div
    var gridHead = document.getElementById(element.id + 'GridHead'); // 头部div
    var bodyTable = gridBody.getElementsByClassName('fix-grid-table'); // table元素
    bodyTbody.addEventListener('click',selectRow);
    drawThead();            
    drawBodyTbody();
    function selectRow(ev){
        var oldSelectRow = document.getElementsByClassName('selectedRow');
        if(oldSelectRow.length > 0){
            var oldSelectRow0 = oldSelectRow[0];
            oldSelectRow0.setAttribute('class', ''); 
            var oldPreSibling = oldSelectRow0.previousSibling;
            if(oldPreSibling){
                oldPreSibling.setAttribute('class','');
            }
        }
        var event = ev || window.event;
        var target = event.target || event.srcElement;
        var selectedRow;
        if(target.parentNode.trType == 'bodytr'){
            selectedRow = target;
        }else if(target.parentNode.getAttribute('trType') == 'bodytr' && target.nodeName == 'TD'){
            selectedRow = target.parentNode;
        }
        var preSibling = selectedRow.previousSibling;
        if(preSibling){
            preSibling.setAttribute('class','preSelectedRow')    
        }        
        selectedRow.setAttribute('class','selectedRow')
    }
    function initDOM(){
        var thead1 = document.createElement('thead');
        thead1.setAttribute('id',element.id + 'Head');
        var table1 = document.createElement('table');
        table1.setAttribute('class','fix-grid-table');
        table1.appendChild(thead1);
        var thead2 = document.createElement('thead');
        thead2.setAttribute('id',element.id + 'BodyThead');
        var table2 = document.createElement('table');
        table2.setAttribute('class','fix-grid-table');
        table2.appendChild(thead2);
        var tbody = document.createElement('tbody');
        tbody.setAttribute('id',element.id + 'BodyTbody');
        table2.appendChild(tbody);
        var div1 = document.createElement('div');
        div1.setAttribute('class','fix-grid-head');
        div1.setAttribute('id',element.id + 'GridHead');
        div1.appendChild(table1);
        var div2 = document.createElement('div');
        div2.setAttribute('class','fix-grid-body');
        div2.setAttribute('id',element.id + 'GridBody');
        div2.appendChild(table2);        
        var divBox = document.createElement('div');
        divBox.setAttribute('class', 'fix-grid-container');
        if(gridOptions.title || gridOptions.CanDownload){
            var headerBox = document.createElement('div');
            headerBox.setAttribute('class','headerBox');
            if(gridOptions.title){
                var nodeTitle = document.createTextNode(gridOptions.title);
                // var divTitle = document.createElement('div');
                // divTitle.setAttribute('class','fix-gird-title')
                // divTitle.appendChild(nodeTitle);
                // headerBox.appendChild(divTitle);
                headerBox.appendChild(nodeTitle);
            } 
            if(gridOptions.CanDownload){
                var divDownload = document.createElement('div');
                divDownload.setAttribute('class','divDownload');
                var text = '<?xml version="1.0" encoding="utf-8"?>'
                + '<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->'
                + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                + '<svg version="1.1" id="Layer_6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"    width="100%" height="100%" viewBox="-2 0 32 32" enable-background="new -2 0 32 32" xml:space="preserve">'
                    + '<path d="M15.7,20.8l-4.1-5.3l3.6-4.7h-3.5L10,13.4l-1.6-2.5H5l3.4,4.7l-4.2,5.3h3.4l2.4-3.3l2.3,3.3H15.7l13-13.3 l-5.5-6.3l-1.1-1.3H9.3c-1.7,0-3.1,1.4-3.1,3.1v4h1.9l0-3.2c0-1,0.8-1.8,1.8-1.8l11,0v5.2c0,1.9,1.6,3.5,3.5,3.5h3.8L28,25.9 c0,1-0.8,1.8-1.8,1.8l-16.6,0c-0.9,0-1.6-0.9-1.6-1.9v-1.3H6.1v1.9c0,1.9,1.3,3.5,2.9,3.5l17.8,0c1.7,0,3.1-1.4,3.1-3.1V9l-1.3-1.5 " style="fill:white;stroke:#34c9ca;stroke-width:2"/>'
                + '</svg>'
                var svgBox = document.createElement('div');
                svgBox.setAttribute('class','svgBox');
                svgBox.innerHTML = text;
                divDownload.appendChild(svgBox);
                divDownload.addEventListener('click',downloanExcel);
                headerBox.appendChild(divDownload)
            }  
            divBox.appendChild(headerBox)  
        }
        
        divBox.appendChild(div1);
        divBox.appendChild(div2);
        element.appendChild(divBox)
    }
    function createDownloadData(){
        var results = [];
        for(var i = 0, length = gridOptions.rowData.length; i < length; i++){
            var itemRowData = [];
            for(var key in gridOptions.rowData[i]){
                itemRowData.push(gridOptions.rowData[i][key]);
            }
            results.push(itemRowData)
        }
        var excelData = {
            columnMetas:gridOptions.columnDefs,
            results:results
        }
        return excelData;
    }
    // 下载数据（excel格式）
    var excelData;
    function downloanExcel() {
        if(!excelData){
            excelData = createDownloadData()
        }
        // excelData = typeof excelData == 'string' ? JSON.parse(excelData) : excelData;
        var headers = {};
        var _data = [];
        var times = parseInt(excelData.columnMetas.length - 1 / 26);
        // 小于等于26列
        if (times == 0) {
            for (var i = 0; i < excelData.columnMetas.length; i++) {
                var tempArr = {};
                tempArr['v'] = excelData.columnMetas[i].field;
                headers[String.fromCharCode(65 + i) + 1] = tempArr;
            }
            for (i = 0; i < excelData.results.length; i++) {
                for (var j = 0; j < excelData.results[i].length; j++) {
                    var tempdict = {};
                    tempdict['v'] = excelData.results[i][j];
                    tempdict['position'] = String.fromCharCode(65 + j) + (i + 2);
                    _data.push(tempdict);
                }
            }
        } else if (times > 0 && times < 27) { // 小于等于26*26列
            for (i = 0; i < excelData.columnMetas.length; i++) {
                var beforestr = '';
                if (parseInt(i / 26) == 0) {
                    beforestr = '';
                } else {
                    beforestr = String.fromCharCode(65 + parseInt(i / 26) - 1);
                }
                tempArr = {};
                tempArr['v'] = excelData.columnMetas[i].field;
                headers[beforestr + String.fromCharCode(65 + i % 26) + 1] = tempArr;
            }
            for (i = 0; i < excelData.results.length; i++) {
                for (j = 0; j < excelData.results[i].length; j++) {
                    beforestr = '';
                    if (parseInt(j / 26) == 0) {
                        beforestr = '';
                    } else {
                        beforestr = String.fromCharCode(65 + parseInt(j / 26) - 1);
                    }
                    tempdict = {};
                    tempdict['v'] = excelData.results[i][j];
                    tempdict['position'] = String.fromCharCode(65 + j % 26) + (i + 2);
                    _data.push(tempdict);
                }
            }
        } else { // 大于26*26列,暂不支持
            alert('超出676列,暂不支持')
            return;
        }
        // 合并 headers 和 data
        var alldata = headers;
        for (i = 0; i < _data.length; i++) {
            tempdict = {};
            tempdict['v'] = _data[i]['v'];
            alldata[_data[i]['position']] = tempdict;
        }
        // 获取所有单元格的位置
        var outputPos = Object.keys(alldata);
        // 计算出范围
        var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
        // 构建 workbook 对象
        var workbook = {
            SheetNames: ['mySheet'],
            Sheets: {
                'mySheet': Object.assign({}, alldata, { '!ref': ref })
            }
        };

        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };

        var wbout = XLSX.write(workbook, wopts);

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), '未命名.xlsx');

    }



    // 绘制 thead
    function drawThead(){
        // 添加表头th节                     
        var theadtr = document.createElement('tr');
        for(var i = 0;i < gridOptions.columnDefs.length;i++){                                    
            var TextNode = document.createTextNode(gridOptions.columnDefs[i].headerName);                    
            var thNode = document.createElement('th');
            thNode.setAttribute('index',i)
            thNode.appendChild(TextNode);
            thNode.setAttribute('class','thDragble');
            // 排序图片添加
            if(gridOptions.ifSort && gridOptions.sortList[i]){
                var sortBox = document.createElement('span');
                var text = '<?xml version="1.0" encoding="iso-8859-1"?>'
                + '<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->'
                + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                + '<svg version="1.1" class="sortSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 401.998 401.998" style="enable-background:new 0 0 401.998 401.998;" xml:space="preserve">'
                    + '<g>'
                            + '<g>'
                                + '<path class="sortPath currentHide" d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847 c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331 c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z" style="fill:#555759"/>'
                                + '<path class="sortPath currentShow" d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847 c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906 c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z" style="fill:#555759;"/>'
                            + '</g>'
                        + '</g>'
                    + '</svg>'
                sortBox.innerHTML = text;
                sortBox.setAttribute('class','sort-box')
                thNode.appendChild(sortBox);
            }
            // 设置调整宽度的拖拽件
            if(gridOptions.enableColResize){
                var dragSpan = document.createElement('span');
                dragSpan.setAttribute('class','dragSpan');
                thNode.appendChild(dragSpan);
                dragSpan.addEventListener('mousedown',dragStart,true)
            }
            theadtr.appendChild(thNode);
        }
        // 设置调整宽度基准线
        if(gridOptions.enableColResize){
            var dragLine = document.createElement('div');
            dragLine.style.display = 'none';            
            dragLine.setAttribute('class','dragLine');
            gridBody.appendChild(dragLine);
        }
        headThead.appendChild(theadtr);
        var newTrNode = theadtr.cloneNode(true);
        bodyThead.appendChild(newTrNode);
        if(gridOptions.ifSort){
            headThead.firstElementChild.addEventListener('click',sortEvent,false);  
        }
        
    }

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

    
    // 调整宽度初始化
    function dragStart(ev){
        // 调整宽度，拖拽
        var dragLine = gridBody.getElementsByClassName('dragLine')[0];
        var event = ev || window.event;
        if(gridOptions.ifSort){
            headThead.firstElementChild.removeEventListener('click',sortEvent,false);    
        }
               
        var currentLeft = getElementLeft(gridBody);
        dragLine.style.left = event.clientX - currentLeft + 'px';
        dragLine.style.display = 'block';
        var dragOriginX = event.clientX;
        var resizeElement = event.target.parentNode;
        var resizeIndex = resizeElement.getAttribute('index');
        var bodyresizeElement = bodyThead.firstElementChild.children[resizeIndex];
        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mouseup',resizeTable,false);
        document.addEventListener('mousemove',resizeing,false);   
        // 拖拽中的基准线的变化
        function resizeing(ev){
            var event = ev || window.event;   
            event.preventDefault();   
            dragLine.style.left = event.clientX - currentLeft + 'px';
        } 
        // 调整结束后，开始排布表格
        function resizeTable(ev){
            var event = ev || window.event;
            var currentX = event.clientX;
            var offsetX = currentX - dragOriginX;
            var width = parseInt(window.getComputedStyle(resizeElement).width) + offsetX + 'px';
            resizeElement.style.width = width;
            resizeElement.style.minWidth = width;
            bodyresizeElement.style.width = width;
            bodyresizeElement.style.minWidth = width;
            document.removeEventListener('mouseup',resizeTable,false);
            document.removeEventListener('mousemove',resizeing,false);
            dragLine.style.display = 'none';
            document.body.style.cursor = 'default';           
            if(gridOptions.ifSort){
                setTimeout(function(){
                    headThead.firstElementChild.addEventListener('click',sortEvent,false)
                },10);   
            }
            // bodyresizeElement.addEventListener('click',sortEvent,false)
        }    
    }
    
    



    // 点击升序降序图标后图标变换
    function sortEvent(e){
        var event = e || window.event;
        var originTarget = event.target;      
        if(!(originTarget.nodeName == 'TH' || (originTarget.nodeName == 'SPAN' && originTarget.className != 'dragSpan'))){
            return false;
        }
        var TargetEle;
        while(originTarget){
            if (originTarget.nodeName == 'TH') {
                TargetEle = originTarget;
                break;
            }
            originTarget = originTarget.parentNode;
        }
        if(!TargetEle){
            return false;
        }
        var index = TargetEle.getAttribute('index');
        var targetshow = TargetEle.getElementsByClassName('currentHide');
        var targetHide = TargetEle.getElementsByClassName('currentShow')[0];
        var showClass = targetshow[0].getAttribute('class');
        var newShowClass = showClass.replace(/currentHide/,'currentShow');
        targetshow[0].setAttribute('class',newShowClass);
        var hideClass = targetHide.getAttribute('class');
        var newHideClass = hideClass.replace(/currentShow/,'currentHide');
        targetHide.setAttribute('class',newHideClass);
        gridOptions.sortList[index] = !gridOptions.sortList[index];
        drawBodyTbody();

    }
    var chinaeseSort;
    // 排序
    function sortRowData(){
        if(!chinaeseSort){
            chinaeseSort = new SortConstructor()  
        }
        
        var arr = ['内蒙古自治区' ,'北京市', '浙江省','广西省','辽宁省','浙江省']
        chinaeseSort.startSort(arr);
        var newRowDate = [];
        newRowDate.push(gridOptions.rowData[0]);  
        var length =  gridOptions.rowData.length;     
        for(var i = 1 ; i < length; i++){
            var result = false;                      
            for ( var k = 0; k < newRowDate.length && !result;  k++) {                         
                for(var j = 0; j < gridOptions.columnDefs.length;j++){                    
                    var keyName = gridOptions.columnDefs[j].field;
                    if(gridOptions.columnDefs[j].sortBy == 'string'){
                        var sortResult = chinaeseSort.charComp(gridOptions.rowData[i][keyName],newRowDate[k][keyName])
                        if(gridOptions.sortList[j] == true){
                            // 升序
                            if(sortResult == -1){
                                result = true;
                                break;
                            }else if(sortResult == 1){
                                break;
                            }  
                        }else if(gridOptions.sortList[j] == false){
                            // 降序
                            if(sortResult == 1){
                                result = true;
                                break;
                            }else if(sortResult == -1){
                                break;
                            }  
                        }                                
                    }else if(gridOptions.columnDefs[j].sortBy == 'num'){
                        if(gridOptions.sortList[j] == true){
                            // 升序
                            if(parseFloat(gridOptions.rowData[i][keyName]) < parseFloat(newRowDate[k][keyName])){
                                result = true;
                                break;
                            }else if(parseFloat(gridOptions.rowData[i][keyName]) > parseFloat(newRowDate[k][keyName])){
                                break;
                            }
                        }else if(gridOptions.sortList[j] == false){
                            // 降序
                            if(parseFloat(gridOptions.rowData[i][keyName]) > parseFloat(newRowDate[k][keyName])){
                                result = true;
                                break;
                            }else if(parseFloat(gridOptions.rowData[i][keyName]) < parseFloat(newRowDate[k][keyName])){
                                break;
                            }
                        }
                    }    
                }
            }
            if(result){
                var oldRowDatesItem = Object.assign({},newRowDate[k - 1]);
                newRowDate[k - 1] = gridOptions.rowData[i];                                       
                for(var x = i; x > k; x--){
                    newRowDate[x] = newRowDate[x - 1]
                }
                newRowDate[k] = oldRowDatesItem;                           
            }else{
                newRowDate.push(gridOptions.rowData[i])
            }

        }
        return newRowDate;
    }
    // 绘制tbody
    function drawBodyTbody(){
        bodyTbody.innerHTML = ''
        // 数据排序    
        var newRowDate = [];        
        if(gridOptions.ifSort){                    
            // 升序排序
            newRowDate = sortRowData()                    
        }
        if(newRowDate.length == 0){
            newRowDate = gridOptions.rowData;
        }
        // 添加td节点   
                        
        for (var i = 0; i < newRowDate.length; i++) {
            var bodytr = document.createElement('tr');
            bodytr.setAttribute('trType','bodytr')   
            for(var j = 0;j < gridOptions.columnDefs.length;j++){
                var keyName = gridOptions.columnDefs[j].field;
                var bodyTextNode = document.createTextNode(newRowDate[i][keyName]);
                var tdNode = document.createElement('td');
                tdNode.appendChild(bodyTextNode);
                bodytr.appendChild(tdNode); 
            }
            bodyTbody.appendChild(bodytr)                             
        } 
        // 表格样式配置
        if(gridOptions.headerHeight){
            var table = element.getElementsByClassName('fix-grid-table');
            for( i = 0;i < table.length;i++){
                var thead = table[i].getElementsByTagName('thead');
                thead[0].getElementsByTagName('tr')[0].style.height = gridOptions.headerHeight + 'px';
            }
        }
        // 配置行表身 行高度
        
        if(gridOptions.rowHeight){
            var trItemsBodyTbody = bodyTbody.getElementsByTagName('tr')
            for( i = 0;i < newRowDate.length;i++){
                trItemsBodyTbody[i].style.height = gridOptions.rowHeight + 'px';
            }
        }
        // 配置表格高度
        if(gridOptions.tableHeight){
            gridBody.style.height = gridOptions.tableHeight + 'px';
        }
        // 表头宽度处理
        var trItemsBodyThead = bodyThead.getElementsByTagName('tr');
        var thItemsBodyThead = trItemsBodyThead[0].getElementsByTagName('th');
        var trItemsHead = headThead.getElementsByTagName('tr');
        var thItemsHead = trItemsHead[0].getElementsByTagName('th')
        var gridBodyWidth;
        headResize()

        // 添加resize的事件监听宽度变化
        window.addEventListener('resize', headResize,false);
        
        
        // 添加滚动事件监听
        // 使表头跟随表身左右滚动；
        gridBody.addEventListener('scroll', bodyScroll,false);
        
        // 合并单元格           
        if(gridOptions.ifMerge){
            mergeTable();    
        } 
        function bodyScroll(){
            if(gridBody.offsetHeight <= parseFloat(window.getComputedStyle(bodyTable[0]).height)){
                gridHead.style.overflowY = 'scroll';
            }else{
                gridHead.style.overflowY = 'hidden';
            }            
            var scrollLeft = gridBody.scrollLeft;
            gridHead.style.marginLeft = -scrollLeft + 'px';                  
            var gridBodyWidth = window.getComputedStyle(gridBody).width;
            gridHead.style.width = parseInt(gridBodyWidth) + scrollLeft + 'px';         

        }
        function headResize(){
            // 清空之前js设置的所有th的样式
            for(var i = 0; i < gridOptions.columnDefs.length; i++){
                thItemsBodyThead[i].style = '';
                thItemsHead[i].style = '';
            }
            
            for(var i = 0; i < gridOptions.columnDefs.length; i++){
                var width = window.getComputedStyle(thItemsBodyThead[i]).width;
                var headThFontSize = window.getComputedStyle(thItemsHead[i]).fontSize;
                var thText = thItemsHead[i].childNodes[0].nodeValue;
                var imgItems = thItemsHead[i].getElementsByClassName('grid-show-img')
                var imgWidth = 0;
                if(imgItems.length > 0){
                    imgWidth = window.getComputedStyle(imgItems[0]).width;
                }
                        
                var headTextWidth = thText.length * (parseFloat(headThFontSize) + 1) + 2 + parseFloat(imgWidth) + 10;
                // 单元格宽度处理，让表头不换行                 
                if(headTextWidth > parseFloat(width)){
                    thItemsBodyThead[i].style.width = headTextWidth + 'px';
                    thItemsBodyThead[i].style.minWidth = headTextWidth + 'px';
                    thItemsHead[i].style.width = headTextWidth + 'px';
                    thItemsHead[i].style.minWidth = headTextWidth + 'px';
                }else{
                    thItemsBodyThead[i].style.width = width;
                    thItemsBodyThead[i].style.minWidth = width;
                    thItemsHead[i].style.width = width;
                    thItemsHead[i].style.minWidth = width;
                }
                // 表头重叠处处理
                var height = window.getComputedStyle(gridHead).height;
                gridBody.style.marginTop = -parseFloat(height) + 'px'; 
            }
             // 处理因为滚动条影响的样式问题  
            gridBodyWidth = window.getComputedStyle(gridBody).width;
            // if(gridBody.offsetHeight <= parseFloat(window.getComputedStyle(bodyTable[0]).height)){
            //     gridHead.style.overflowY = 'scroll';
            // }
            var headTable = gridHead.getElementsByClassName('fix-grid-table');
            headTable[0].style.width = window.getComputedStyle(bodyTable[0]).width;    
            bodyScroll()
        }
        // 合并表格
        function mergeTable(){
            var colLengthOfString = 0;                                        
            if(gridOptions.mergeColumn){
                colLengthOfString = gridOptions.mergeColumn;
            }else{
                for (var i = 0; i < gridOptions.columnDefs.length; i++) {                        
                    if(gridOptions.columnDefs[i].sortBy == 'string'){
                        colLengthOfString++
                    }
                }
            }
            for(i = 0;i < colLengthOfString;i++){
                for(var j = 0; j < (newRowDate.length - 1); j++){
                    var keyName = gridOptions.columnDefs[i].field;
                    if(newRowDate[j][keyName] == newRowDate[j + 1][keyName]){
                        var trItem = bodyTbody.getElementsByTagName('tr')[j];
                        var tdItem = trItem.getElementsByTagName('td')[i];
                        var TdItemOfNextTr = trItem.nextSibling.getElementsByTagName('td')[i];
                        if(i == 0){
                            // 第一列直接合并；
                            tdItem.style.borderBottom = 'none';
                            TdItemOfNextTr.childNodes[0].nodeValue = '';
                            TdItemOfNextTr.style.background = 'none';
                            tdItem.style.background = 'none';
                        }else{
                            var result = false;
                            var k = i - 1;
                            while(k >= 0){
                                var keyNamek = gridOptions.columnDefs[k].field;
                                if(newRowDate[j][keyNamek] == newRowDate[j + 1][keyNamek]){
                                    result = true;
                                    k--;
                                }else{
                                    result = false;
                                    break;
                                }

                            }
                            if(result){
                                tdItem.style.borderBottom = 'none';
                                TdItemOfNextTr.childNodes[0].nodeValue = '';
                                TdItemOfNextTr.style.background = 'none';
                                tdItem.style.background = 'none';
                            }
                        } 
                    }
                }
            }
        }

           
    }
}

