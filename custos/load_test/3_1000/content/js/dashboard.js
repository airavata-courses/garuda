/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 39.042821158690174, "KoPercent": 60.957178841309826};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.348551637279597, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.1919191919191919, 500, 1500, "check user status"], "isController": false}, {"data": [0.9924242424242424, 500, 1500, "get group "], "isController": false}, {"data": [0.1919191919191919, 500, 1500, "get user availabilty"], "isController": false}, {"data": [1.0, 500, 1500, "openID configuration"], "isController": false}, {"data": [0.09798994974874371, 500, 1500, "enable user"], "isController": false}, {"data": [0.11194029850746269, 500, 1500, "register user"], "isController": false}, {"data": [0.010101010101010102, 500, 1500, "update user profile"], "isController": false}, {"data": [0.19696969696969696, 500, 1500, "add user to group"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1588, 968, 60.957178841309826, 322.3362720403024, 123, 3924, 226.0, 508.3000000000004, 816.2999999999997, 1797.7699999999993, 9.281122150789013, 7.086921482320281, 3.835299395455874], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["check user status", 198, 159, 80.3030303030303, 264.4747474747475, 180, 1211, 218.0, 349.0, 435.69999999999976, 1171.3999999999996, 1.1944188066670285, 0.40461973897726383, 0.4332619434340144], "isController": false}, {"data": ["get group ", 198, 0, 0.0, 340.580808080808, 260, 551, 336.0, 381.1, 416.2499999999999, 547.04, 1.1946854598332266, 0.6813440513111371, 0.4643406377086174], "isController": false}, {"data": ["get user availabilty", 198, 159, 80.3030303030303, 276.8787878787879, 180, 1184, 221.0, 377.7999999999999, 519.0999999999999, 1171.1299999999999, 1.194735921123293, 0.409476597808444, 0.4176908786739638], "isController": false}, {"data": ["openID configuration", 198, 0, 0.0, 148.31818181818184, 123, 266, 143.5, 167.0, 181.14999999999995, 253.12999999999988, 1.1954644802144592, 3.959981986901211, 0.47048064992815136], "isController": false}, {"data": ["enable user", 199, 160, 80.40201005025126, 371.71356783919595, 182, 3551, 223.0, 786.0, 933.0, 1218.0, 1.1698725485585288, 0.49143304426997597, 0.44382315377651316], "isController": false}, {"data": ["register user", 201, 161, 80.09950248756219, 318.08955223880605, 187, 1211, 229.0, 592.8, 652.0999999999998, 1156.7199999999984, 1.1747516072472237, 0.43440193965517243, 0.598328599868498], "isController": false}, {"data": ["update user profile", 198, 170, 85.85858585858585, 568.6212121212121, 180, 3924, 221.5, 1699.5, 2003.0999999999997, 3749.7599999999984, 1.1822730692525407, 0.5021418436593144, 0.5310992303282898], "isController": false}, {"data": ["add user to group", 198, 159, 80.3030303030303, 289.8282828282829, 192, 1251, 235.5, 329.9, 829.2999999999979, 1086.6599999999985, 1.194894541504481, 0.4032604062943182, 0.5641261013548172], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 954, 98.55371900826447, 60.075566750629726], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, 0.30991735537190085, 0.1889168765743073], "isController": false}, {"data": ["499/Unknown", 11, 1.1363636363636365, 0.6926952141057935], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1588, 968, "500/Internal Server Error", 954, "499/Unknown", 11, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["check user status", 198, 159, "500/Internal Server Error", 159, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["get user availabilty", 198, 159, "500/Internal Server Error", 159, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["enable user", 199, 160, "500/Internal Server Error", 159, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null], "isController": false}, {"data": ["register user", 201, 161, "500/Internal Server Error", 159, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, null, null, null, null, null, null], "isController": false}, {"data": ["update user profile", 198, 170, "500/Internal Server Error", 159, "499/Unknown", 11, null, null, null, null, null, null], "isController": false}, {"data": ["add user to group", 198, 159, "500/Internal Server Error", 159, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
