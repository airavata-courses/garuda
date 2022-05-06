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

    var data = {"OkPercent": 91.5, "KoPercent": 8.5};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.65375, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.87, 500, 1500, "check user status"], "isController": false}, {"data": [0.5, 500, 1500, "get group "], "isController": false}, {"data": [0.88, 500, 1500, "get user availabilty"], "isController": false}, {"data": [1.0, 500, 1500, "openID configuration"], "isController": false}, {"data": [0.44, 500, 1500, "enable user"], "isController": false}, {"data": [0.49, 500, 1500, "register user"], "isController": false}, {"data": [0.17, 500, 1500, "update user profile"], "isController": false}, {"data": [0.88, 500, 1500, "add user to group"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 400, 34, 8.5, 602.1075000000008, 126, 2338, 381.5, 1424.6000000000001, 1586.8499999999997, 1912.94, 1.6601781371141124, 1.3338372125297795, 0.7146953391536413], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["check user status", 50, 6, 12.0, 330.5999999999999, 207, 1262, 307.0, 405.2, 472.39999999999975, 1262.0, 0.21219979034660713, 0.06644920387943656, 0.08098406061274811], "isController": false}, {"data": ["get group ", 50, 0, 0.0, 1011.0, 834, 1269, 1015.5, 1087.6, 1161.8999999999994, 1269.0, 0.21150055413145183, 0.1206255406482915, 0.08220431693781037], "isController": false}, {"data": ["get user availabilty", 50, 5, 10.0, 353.41999999999996, 215, 1248, 302.5, 426.59999999999997, 848.0499999999984, 1248.0, 0.21219708865594364, 0.06639862416712643, 0.07418609154182405], "isController": false}, {"data": ["openID configuration", 50, 0, 0.0, 139.65999999999997, 126, 238, 135.0, 148.9, 183.29999999999984, 238.0, 0.2123259458059256, 0.7033296954821285, 0.08356187124979299], "isController": false}, {"data": ["enable user", 50, 6, 12.0, 666.8200000000002, 213, 1155, 696.0, 850.7, 946.45, 1155.0, 0.21178633300435856, 0.1446517200227035, 0.08475589771990834], "isController": false}, {"data": ["register user", 50, 6, 12.0, 554.8000000000002, 205, 1049, 531.5, 778.7, 916.6999999999998, 1049.0, 0.21173700569996018, 0.06780960317309077, 0.12493310433976167], "isController": false}, {"data": ["update user profile", 50, 5, 10.0, 1473.7000000000003, 231, 2338, 1525.0, 1896.8, 2070.849999999999, 2338.0, 0.2107605928273955, 0.1269503258358765, 0.09467761005918157], "isController": false}, {"data": ["add user to group", 50, 6, 12.0, 286.86, 211, 1296, 248.5, 346.79999999999995, 459.09999999999934, 1296.0, 0.21219348650873815, 0.06640578582674826, 0.10419031739901713], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 34, 100.0, 8.5], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 400, 34, "500/Internal Server Error", 34, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["check user status", 50, 6, "500/Internal Server Error", 6, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["get user availabilty", 50, 5, "500/Internal Server Error", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["enable user", 50, 6, "500/Internal Server Error", 6, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["register user", 50, 6, "500/Internal Server Error", 6, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["update user profile", 50, 5, "500/Internal Server Error", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["add user to group", 50, 6, "500/Internal Server Error", 6, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
