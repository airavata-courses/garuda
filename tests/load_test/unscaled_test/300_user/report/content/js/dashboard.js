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

    var data = {"OkPercent": 6.008333333333334, "KoPercent": 93.99166666666666};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.012625, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.040916666666666664, 500, 1500, "getAllInfo"], "isController": false}, {"data": [0.00375, 500, 1500, "getAllStatus"], "isController": false}, {"data": [0.004083333333333333, 500, 1500, "postNewRequest"], "isController": false}, {"data": [0.00175, 500, 1500, "getDataOfRequestID"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 24000, 22558, 93.99166666666666, 3411.706541666657, 0, 349801, 0.0, 4.0, 6271.750000000004, 40455.0, 47.46018782369331, 534.1561717648466, 0.6231602225042367], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["getAllInfo", 6000, 5503, 91.71666666666667, 1004.6921666666677, 0, 321568, 0.0, 40.0, 1589.8499999999995, 31734.659999999993, 11.865070419192937, 34.42949319402258, 0.1362899543886918], "isController": false}, {"data": ["getAllStatus", 6000, 5607, 93.45, 4767.060666666662, 0, 329771, 0.0, 45.900000000000546, 7788.399999999998, 316892.16, 11.86610289493357, 31.272362891507232, 0.14193550909042366], "isController": false}, {"data": ["postNewRequest", 6000, 5618, 93.63333333333334, 3382.539666666655, 0, 349746, 0.0, 1424.6000000000186, 20751.09999999999, 38821.0, 11.865117346010551, 30.31278704932329, 0.2589353294250955], "isController": false}, {"data": ["getDataOfRequestID", 6000, 5830, 97.16666666666667, 4492.533666666673, 0, 349801, 0.0, 13.0, 11895.649999999987, 62489.0, 11.86636104194561, 438.1930851005971, 0.08602339205863566], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer (connect failed)", 2, 0.0088660342228921, 0.008333333333333333], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 390, 1.7288766734639596, 1.625], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 21526, 95.42512634098767, 89.69166666666666], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 637, 2.823831899991134, 2.654166666666667], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 2,575; received: 0)", 1, 0.00443301711144605, 0.004166666666666667], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 2,767; received: 0)", 1, 0.00443301711144605, 0.004166666666666667], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer (Write failed)", 1, 0.00443301711144605, 0.004166666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 24000, 22558, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 21526, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 637, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 390, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer (connect failed)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 2,575; received: 0)", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["getAllInfo", 6000, 5503, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 5331, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 123, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 49, null, null, null, null], "isController": false}, {"data": ["getAllStatus", 6000, 5607, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 5353, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 129, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 123, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 2,575; received: 0)", 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 2,767; received: 0)", 1], "isController": false}, {"data": ["postNewRequest", 6000, 5618, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 5370, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 243, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 5, null, null, null, null], "isController": false}, {"data": ["getDataOfRequestID", 6000, 5830, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 5472, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 222, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 133, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer (connect failed)", 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer (Write failed)", 1], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
