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

    var data = {"OkPercent": 95.60833333333333, "KoPercent": 4.391666666666667};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.23141666666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.359, 500, 1500, "getAllInfo"], "isController": false}, {"data": [0.239, 500, 1500, "getAllStatus"], "isController": false}, {"data": [0.21716666666666667, 500, 1500, "postNewRequest"], "isController": false}, {"data": [0.1105, 500, 1500, "getDataOfRequestID"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 12000, 527, 4.391666666666667, 11904.265666666677, 0, 382404, 3876.5, 24584.399999999998, 35419.849999999955, 275843.36999999965, 11.558433177326593, 7383.950343466066, 2.5443988690675137], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["getAllInfo", 3000, 124, 4.133333333333334, 6194.317000000002, 0, 318224, 2019.0, 15094.7, 23797.299999999996, 50127.32999999994, 2.899800300419311, 16.559274689564294, 0.3854997540002745], "isController": false}, {"data": ["getAllStatus", 3000, 114, 3.8, 9842.805333333321, 0, 335204, 3387.0, 20891.100000000006, 28657.199999999983, 78755.59999999998, 2.897954334035604, 8.110694029574107, 0.5092824571489153], "isController": false}, {"data": ["postNewRequest", 3000, 105, 3.5, 12923.402999999998, 0, 347715, 3682.5, 24245.500000000004, 35510.74999999996, 302624.9799999998, 2.8979179425555386, 4.298839584605197, 0.9602183182705998], "isController": false}, {"data": ["getDataOfRequestID", 3000, 184, 6.133333333333334, 18656.537333333345, 0, 382404, 7982.0, 35698.6, 49703.099999999904, 322970.08999999997, 2.8898393249335337, 7355.6634764420905, 0.6950289345162409], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 242, 45.920303605313094, 2.0166666666666666], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 191, 36.24288425047438, 1.5916666666666666], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 1,601; received: 0)", 1, 0.18975332068311196, 0.008333333333333333], "isController": false}, {"data": ["500/INTERNAL SERVER ERROR", 10, 1.8975332068311195, 0.08333333333333333], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 82, 15.559772296015181, 0.6833333333333333], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 3,343; received: 0)", 1, 0.18975332068311196, 0.008333333333333333], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 12000, 527, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 242, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 191, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 82, "500/INTERNAL SERVER ERROR", 10, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 1,601; received: 0)", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["getAllInfo", 3000, 124, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 60, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 59, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 5, null, null, null, null], "isController": false}, {"data": ["getAllStatus", 3000, 114, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 63, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 41, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 8, "500/INTERNAL SERVER ERROR", 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 3,343; received: 0)", 1], "isController": false}, {"data": ["postNewRequest", 3000, 105, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 50, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 46, "500/INTERNAL SERVER ERROR", 5, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 3, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 1,601; received: 0)", 1], "isController": false}, {"data": ["getDataOfRequestID", 3000, 184, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 69, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: 172.18.0.2:30000 failed to respond", 66, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 172.18.0.2:30000 [/172.18.0.2] failed: Connection refused (Connection refused)", 45, "500/INTERNAL SERVER ERROR", 4, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
