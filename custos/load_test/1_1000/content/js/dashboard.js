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

    var data = {"OkPercent": 45.47075606276748, "KoPercent": 54.52924393723252};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3619828815977175, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.25925925925925924, 500, 1500, "check user status"], "isController": false}, {"data": [0.7678062678062678, 500, 1500, "get group "], "isController": false}, {"data": [0.2742857142857143, 500, 1500, "get user availabilty"], "isController": false}, {"data": [1.0, 500, 1500, "openID configuration"], "isController": false}, {"data": [0.13675213675213677, 500, 1500, "enable user"], "isController": false}, {"data": [0.16381766381766383, 500, 1500, "register user"], "isController": false}, {"data": [0.018571428571428572, 500, 1500, "update user profile"], "isController": false}, {"data": [0.2757142857142857, 500, 1500, "add user to group"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2804, 1529, 54.52924393723252, 362.9229671897294, 117, 10540, 224.0, 640.5, 1028.75, 1882.5499999999984, 2.7531601447667375, 2.103599271784723, 1.1422164252414906], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["check user status", 351, 254, 72.36467236467236, 261.20227920227927, 181, 1236, 218.0, 354.0000000000001, 484.9999999999999, 902.6800000000044, 0.3455203921016598, 0.11601077111833433, 0.12575275733394103], "isController": false}, {"data": ["get group ", 351, 1, 0.2849002849002849, 487.4529914529912, 292, 1616, 481.0, 615.0, 648.1999999999999, 747.5600000000009, 0.3454469404325468, 0.19927036174741036, 0.13388298723027334], "isController": false}, {"data": ["get user availabilty", 350, 250, 71.42857142857143, 278.87428571428563, 178, 1190, 220.5, 357.7000000000001, 566.4999999999999, 1129.8000000000002, 0.34522927662630115, 0.11699361677232327, 0.12069539163302326], "isController": false}, {"data": ["openID configuration", 350, 0, 0.0, 142.90571428571423, 117, 366, 137.0, 159.90000000000003, 174.5999999999999, 256.96000000000004, 0.3453130657584604, 1.1438504938100167, 0.13589957568423786], "isController": false}, {"data": ["enable user", 351, 254, 72.36467236467236, 408.92877492877517, 179, 10540, 219.0, 805.2, 935.9999999999998, 1449.4, 0.34536366498740556, 0.1498772455402826, 0.13210383110142473], "isController": false}, {"data": ["register user", 351, 253, 72.07977207977208, 340.76923076923083, 189, 1320, 224.0, 633.6000000000001, 765.5999999999998, 1158.9200000000023, 0.3449895913396801, 0.11790004694463065, 0.1791474478510392], "isController": false}, {"data": ["update user profile", 350, 265, 75.71428571428571, 686.2228571428568, 183, 3334, 220.0, 1746.6000000000001, 2079.35, 2740.9500000000016, 0.34533827857748256, 0.15255684607236908, 0.1551324298297285], "isController": false}, {"data": ["add user to group", 350, 252, 72.0, 296.89428571428573, 191, 1981, 234.0, 396.9000000000004, 851.2999999999998, 1428.6900000000007, 0.34527286914848804, 0.11565677743513555, 0.16342658906905555], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 1516, 99.14977109221714, 54.06562054208274], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, 0.06540222367560497, 0.03566333808844508], "isController": false}, {"data": ["499/Unknown", 12, 0.7848266841072596, 0.42796005706134094], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2804, 1529, "500/Internal Server Error", 1516, "499/Unknown", 12, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["check user status", 351, 254, "500/Internal Server Error", 254, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["get group ", 351, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["get user availabilty", 350, 250, "500/Internal Server Error", 250, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["enable user", 351, 254, "500/Internal Server Error", 254, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["register user", 351, 253, "500/Internal Server Error", 253, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["update user profile", 350, 265, "500/Internal Server Error", 253, "499/Unknown", 12, null, null, null, null, null, null], "isController": false}, {"data": ["add user to group", 350, 252, "500/Internal Server Error", 252, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
