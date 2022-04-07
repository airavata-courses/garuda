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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 2082.0, "minX": 0.0, "maxY": 22946.0, "series": [{"data": [[0.0, 2082.0], [0.1, 2082.0], [0.2, 2082.0], [0.3, 2082.0], [0.4, 2082.0], [0.5, 2082.0], [0.6, 2082.0], [0.7, 2082.0], [0.8, 2082.0], [0.9, 2082.0], [1.0, 2455.0], [1.1, 2455.0], [1.2, 2455.0], [1.3, 2455.0], [1.4, 2455.0], [1.5, 2455.0], [1.6, 2455.0], [1.7, 2455.0], [1.8, 2455.0], [1.9, 2455.0], [2.0, 2608.0], [2.1, 2608.0], [2.2, 2608.0], [2.3, 2608.0], [2.4, 2608.0], [2.5, 2608.0], [2.6, 2608.0], [2.7, 2608.0], [2.8, 2608.0], [2.9, 2608.0], [3.0, 2795.0], [3.1, 2795.0], [3.2, 2795.0], [3.3, 2795.0], [3.4, 2795.0], [3.5, 2795.0], [3.6, 2795.0], [3.7, 2795.0], [3.8, 2795.0], [3.9, 2795.0], [4.0, 3633.0], [4.1, 3633.0], [4.2, 3633.0], [4.3, 3633.0], [4.4, 3633.0], [4.5, 3633.0], [4.6, 3633.0], [4.7, 3633.0], [4.8, 3633.0], [4.9, 3633.0], [5.0, 3639.0], [5.1, 3639.0], [5.2, 3639.0], [5.3, 3639.0], [5.4, 3639.0], [5.5, 3639.0], [5.6, 3639.0], [5.7, 3639.0], [5.8, 3639.0], [5.9, 3639.0], [6.0, 3989.0], [6.1, 3989.0], [6.2, 3989.0], [6.3, 3989.0], [6.4, 3989.0], [6.5, 3989.0], [6.6, 3989.0], [6.7, 3989.0], [6.8, 3989.0], [6.9, 3989.0], [7.0, 3995.0], [7.1, 3995.0], [7.2, 3995.0], [7.3, 3995.0], [7.4, 3995.0], [7.5, 3995.0], [7.6, 3995.0], [7.7, 3995.0], [7.8, 3995.0], [7.9, 3995.0], [8.0, 4102.0], [8.1, 4102.0], [8.2, 4102.0], [8.3, 4102.0], [8.4, 4102.0], [8.5, 4102.0], [8.6, 4102.0], [8.7, 4102.0], [8.8, 4102.0], [8.9, 4102.0], [9.0, 4446.0], [9.1, 4446.0], [9.2, 4446.0], [9.3, 4446.0], [9.4, 4446.0], [9.5, 4446.0], [9.6, 4446.0], [9.7, 4446.0], [9.8, 4446.0], [9.9, 4446.0], [10.0, 4788.0], [10.1, 4788.0], [10.2, 4788.0], [10.3, 4788.0], [10.4, 4788.0], [10.5, 4788.0], [10.6, 4788.0], [10.7, 4788.0], [10.8, 4788.0], [10.9, 4788.0], [11.0, 5614.0], [11.1, 5614.0], [11.2, 5614.0], [11.3, 5614.0], [11.4, 5614.0], [11.5, 5614.0], [11.6, 5614.0], [11.7, 5614.0], [11.8, 5614.0], [11.9, 5614.0], [12.0, 5657.0], [12.1, 5657.0], [12.2, 5657.0], [12.3, 5657.0], [12.4, 5657.0], [12.5, 5657.0], [12.6, 5657.0], [12.7, 5657.0], [12.8, 5657.0], [12.9, 5657.0], [13.0, 5670.0], [13.1, 5670.0], [13.2, 5670.0], [13.3, 5670.0], [13.4, 5670.0], [13.5, 5670.0], [13.6, 5670.0], [13.7, 5670.0], [13.8, 5670.0], [13.9, 5670.0], [14.0, 5684.0], [14.1, 5684.0], [14.2, 5684.0], [14.3, 5684.0], [14.4, 5684.0], [14.5, 5684.0], [14.6, 5684.0], [14.7, 5684.0], [14.8, 5684.0], [14.9, 5684.0], [15.0, 5808.0], [15.1, 5808.0], [15.2, 5808.0], [15.3, 5808.0], [15.4, 5808.0], [15.5, 5808.0], [15.6, 5808.0], [15.7, 5808.0], [15.8, 5808.0], [15.9, 5808.0], [16.0, 5916.0], [16.1, 5916.0], [16.2, 5916.0], [16.3, 5916.0], [16.4, 5916.0], [16.5, 5916.0], [16.6, 5916.0], [16.7, 5916.0], [16.8, 5916.0], [16.9, 5916.0], [17.0, 7364.0], [17.1, 7364.0], [17.2, 7364.0], [17.3, 7364.0], [17.4, 7364.0], [17.5, 7364.0], [17.6, 7364.0], [17.7, 7364.0], [17.8, 7364.0], [17.9, 7364.0], [18.0, 7385.0], [18.1, 7385.0], [18.2, 7385.0], [18.3, 7385.0], [18.4, 7385.0], [18.5, 7385.0], [18.6, 7385.0], [18.7, 7385.0], [18.8, 7385.0], [18.9, 7385.0], [19.0, 8251.0], [19.1, 8251.0], [19.2, 8251.0], [19.3, 8251.0], [19.4, 8251.0], [19.5, 8251.0], [19.6, 8251.0], [19.7, 8251.0], [19.8, 8251.0], [19.9, 8251.0], [20.0, 8554.0], [20.1, 8554.0], [20.2, 8554.0], [20.3, 8554.0], [20.4, 8554.0], [20.5, 8554.0], [20.6, 8554.0], [20.7, 8554.0], [20.8, 8554.0], [20.9, 8554.0], [21.0, 8610.0], [21.1, 8610.0], [21.2, 8610.0], [21.3, 8610.0], [21.4, 8610.0], [21.5, 8610.0], [21.6, 8610.0], [21.7, 8610.0], [21.8, 8610.0], [21.9, 8610.0], [22.0, 8669.0], [22.1, 8669.0], [22.2, 8669.0], [22.3, 8669.0], [22.4, 8669.0], [22.5, 8669.0], [22.6, 8669.0], [22.7, 8669.0], [22.8, 8669.0], [22.9, 8669.0], [23.0, 9251.0], [23.1, 9251.0], [23.2, 9251.0], [23.3, 9251.0], [23.4, 9251.0], [23.5, 9251.0], [23.6, 9251.0], [23.7, 9251.0], [23.8, 9251.0], [23.9, 9251.0], [24.0, 9546.0], [24.1, 9546.0], [24.2, 9546.0], [24.3, 9546.0], [24.4, 9546.0], [24.5, 9546.0], [24.6, 9546.0], [24.7, 9546.0], [24.8, 9546.0], [24.9, 9546.0], [25.0, 9855.0], [25.1, 9855.0], [25.2, 9855.0], [25.3, 9855.0], [25.4, 9855.0], [25.5, 9855.0], [25.6, 9855.0], [25.7, 9855.0], [25.8, 9855.0], [25.9, 9855.0], [26.0, 10223.0], [26.1, 10223.0], [26.2, 10223.0], [26.3, 10223.0], [26.4, 10223.0], [26.5, 10223.0], [26.6, 10223.0], [26.7, 10223.0], [26.8, 10223.0], [26.9, 10223.0], [27.0, 10279.0], [27.1, 10279.0], [27.2, 10279.0], [27.3, 10279.0], [27.4, 10279.0], [27.5, 10279.0], [27.6, 10279.0], [27.7, 10279.0], [27.8, 10279.0], [27.9, 10279.0], [28.0, 10390.0], [28.1, 10390.0], [28.2, 10390.0], [28.3, 10390.0], [28.4, 10390.0], [28.5, 10390.0], [28.6, 10390.0], [28.7, 10390.0], [28.8, 10390.0], [28.9, 10390.0], [29.0, 10530.0], [29.1, 10530.0], [29.2, 10530.0], [29.3, 10530.0], [29.4, 10530.0], [29.5, 10530.0], [29.6, 10530.0], [29.7, 10530.0], [29.8, 10530.0], [29.9, 10530.0], [30.0, 10929.0], [30.1, 10929.0], [30.2, 10929.0], [30.3, 10929.0], [30.4, 10929.0], [30.5, 10929.0], [30.6, 10929.0], [30.7, 10929.0], [30.8, 10929.0], [30.9, 10929.0], [31.0, 11431.0], [31.1, 11431.0], [31.2, 11431.0], [31.3, 11431.0], [31.4, 11431.0], [31.5, 11431.0], [31.6, 11431.0], [31.7, 11431.0], [31.8, 11431.0], [31.9, 11431.0], [32.0, 11500.0], [32.1, 11500.0], [32.2, 11500.0], [32.3, 11500.0], [32.4, 11500.0], [32.5, 11500.0], [32.6, 11500.0], [32.7, 11500.0], [32.8, 11500.0], [32.9, 11500.0], [33.0, 11521.0], [33.1, 11521.0], [33.2, 11521.0], [33.3, 11521.0], [33.4, 11521.0], [33.5, 11521.0], [33.6, 11521.0], [33.7, 11521.0], [33.8, 11521.0], [33.9, 11521.0], [34.0, 11530.0], [34.1, 11530.0], [34.2, 11530.0], [34.3, 11530.0], [34.4, 11530.0], [34.5, 11530.0], [34.6, 11530.0], [34.7, 11530.0], [34.8, 11530.0], [34.9, 11530.0], [35.0, 11836.0], [35.1, 11836.0], [35.2, 11836.0], [35.3, 11836.0], [35.4, 11836.0], [35.5, 11836.0], [35.6, 11836.0], [35.7, 11836.0], [35.8, 11836.0], [35.9, 11836.0], [36.0, 11958.0], [36.1, 11958.0], [36.2, 11958.0], [36.3, 11958.0], [36.4, 11958.0], [36.5, 11958.0], [36.6, 11958.0], [36.7, 11958.0], [36.8, 11958.0], [36.9, 11958.0], [37.0, 12112.0], [37.1, 12112.0], [37.2, 12112.0], [37.3, 12112.0], [37.4, 12112.0], [37.5, 12112.0], [37.6, 12112.0], [37.7, 12112.0], [37.8, 12112.0], [37.9, 12112.0], [38.0, 12194.0], [38.1, 12194.0], [38.2, 12194.0], [38.3, 12194.0], [38.4, 12194.0], [38.5, 12194.0], [38.6, 12194.0], [38.7, 12194.0], [38.8, 12194.0], [38.9, 12194.0], [39.0, 12648.0], [39.1, 12648.0], [39.2, 12648.0], [39.3, 12648.0], [39.4, 12648.0], [39.5, 12648.0], [39.6, 12648.0], [39.7, 12648.0], [39.8, 12648.0], [39.9, 12648.0], [40.0, 13878.0], [40.1, 13878.0], [40.2, 13878.0], [40.3, 13878.0], [40.4, 13878.0], [40.5, 13878.0], [40.6, 13878.0], [40.7, 13878.0], [40.8, 13878.0], [40.9, 13878.0], [41.0, 13878.0], [41.1, 13878.0], [41.2, 13878.0], [41.3, 13878.0], [41.4, 13878.0], [41.5, 13878.0], [41.6, 13878.0], [41.7, 13878.0], [41.8, 13878.0], [41.9, 13878.0], [42.0, 13900.0], [42.1, 13900.0], [42.2, 13900.0], [42.3, 13900.0], [42.4, 13900.0], [42.5, 13900.0], [42.6, 13900.0], [42.7, 13900.0], [42.8, 13900.0], [42.9, 13900.0], [43.0, 13991.0], [43.1, 13991.0], [43.2, 13991.0], [43.3, 13991.0], [43.4, 13991.0], [43.5, 13991.0], [43.6, 13991.0], [43.7, 13991.0], [43.8, 13991.0], [43.9, 13991.0], [44.0, 14007.0], [44.1, 14007.0], [44.2, 14007.0], [44.3, 14007.0], [44.4, 14007.0], [44.5, 14007.0], [44.6, 14007.0], [44.7, 14007.0], [44.8, 14007.0], [44.9, 14007.0], [45.0, 14034.0], [45.1, 14034.0], [45.2, 14034.0], [45.3, 14034.0], [45.4, 14034.0], [45.5, 14034.0], [45.6, 14034.0], [45.7, 14034.0], [45.8, 14034.0], [45.9, 14034.0], [46.0, 14049.0], [46.1, 14049.0], [46.2, 14049.0], [46.3, 14049.0], [46.4, 14049.0], [46.5, 14049.0], [46.6, 14049.0], [46.7, 14049.0], [46.8, 14049.0], [46.9, 14049.0], [47.0, 14066.0], [47.1, 14066.0], [47.2, 14066.0], [47.3, 14066.0], [47.4, 14066.0], [47.5, 14066.0], [47.6, 14066.0], [47.7, 14066.0], [47.8, 14066.0], [47.9, 14066.0], [48.0, 14751.0], [48.1, 14751.0], [48.2, 14751.0], [48.3, 14751.0], [48.4, 14751.0], [48.5, 14751.0], [48.6, 14751.0], [48.7, 14751.0], [48.8, 14751.0], [48.9, 14751.0], [49.0, 14781.0], [49.1, 14781.0], [49.2, 14781.0], [49.3, 14781.0], [49.4, 14781.0], [49.5, 14781.0], [49.6, 14781.0], [49.7, 14781.0], [49.8, 14781.0], [49.9, 14781.0], [50.0, 14979.0], [50.1, 14979.0], [50.2, 14979.0], [50.3, 14979.0], [50.4, 14979.0], [50.5, 14979.0], [50.6, 14979.0], [50.7, 14979.0], [50.8, 14979.0], [50.9, 14979.0], [51.0, 15016.0], [51.1, 15016.0], [51.2, 15016.0], [51.3, 15016.0], [51.4, 15016.0], [51.5, 15016.0], [51.6, 15016.0], [51.7, 15016.0], [51.8, 15016.0], [51.9, 15016.0], [52.0, 15076.0], [52.1, 15076.0], [52.2, 15076.0], [52.3, 15076.0], [52.4, 15076.0], [52.5, 15076.0], [52.6, 15076.0], [52.7, 15076.0], [52.8, 15076.0], [52.9, 15076.0], [53.0, 15098.0], [53.1, 15098.0], [53.2, 15098.0], [53.3, 15098.0], [53.4, 15098.0], [53.5, 15098.0], [53.6, 15098.0], [53.7, 15098.0], [53.8, 15098.0], [53.9, 15098.0], [54.0, 15216.0], [54.1, 15216.0], [54.2, 15216.0], [54.3, 15216.0], [54.4, 15216.0], [54.5, 15216.0], [54.6, 15216.0], [54.7, 15216.0], [54.8, 15216.0], [54.9, 15216.0], [55.0, 15537.0], [55.1, 15537.0], [55.2, 15537.0], [55.3, 15537.0], [55.4, 15537.0], [55.5, 15537.0], [55.6, 15537.0], [55.7, 15537.0], [55.8, 15537.0], [55.9, 15537.0], [56.0, 15566.0], [56.1, 15566.0], [56.2, 15566.0], [56.3, 15566.0], [56.4, 15566.0], [56.5, 15566.0], [56.6, 15566.0], [56.7, 15566.0], [56.8, 15566.0], [56.9, 15566.0], [57.0, 15662.0], [57.1, 15662.0], [57.2, 15662.0], [57.3, 15662.0], [57.4, 15662.0], [57.5, 15662.0], [57.6, 15662.0], [57.7, 15662.0], [57.8, 15662.0], [57.9, 15662.0], [58.0, 15782.0], [58.1, 15782.0], [58.2, 15782.0], [58.3, 15782.0], [58.4, 15782.0], [58.5, 15782.0], [58.6, 15782.0], [58.7, 15782.0], [58.8, 15782.0], [58.9, 15782.0], [59.0, 16033.0], [59.1, 16033.0], [59.2, 16033.0], [59.3, 16033.0], [59.4, 16033.0], [59.5, 16033.0], [59.6, 16033.0], [59.7, 16033.0], [59.8, 16033.0], [59.9, 16033.0], [60.0, 16165.0], [60.1, 16165.0], [60.2, 16165.0], [60.3, 16165.0], [60.4, 16165.0], [60.5, 16165.0], [60.6, 16165.0], [60.7, 16165.0], [60.8, 16165.0], [60.9, 16165.0], [61.0, 16902.0], [61.1, 16902.0], [61.2, 16902.0], [61.3, 16902.0], [61.4, 16902.0], [61.5, 16902.0], [61.6, 16902.0], [61.7, 16902.0], [61.8, 16902.0], [61.9, 16902.0], [62.0, 17137.0], [62.1, 17137.0], [62.2, 17137.0], [62.3, 17137.0], [62.4, 17137.0], [62.5, 17137.0], [62.6, 17137.0], [62.7, 17137.0], [62.8, 17137.0], [62.9, 17137.0], [63.0, 17163.0], [63.1, 17163.0], [63.2, 17163.0], [63.3, 17163.0], [63.4, 17163.0], [63.5, 17163.0], [63.6, 17163.0], [63.7, 17163.0], [63.8, 17163.0], [63.9, 17163.0], [64.0, 17246.0], [64.1, 17246.0], [64.2, 17246.0], [64.3, 17246.0], [64.4, 17246.0], [64.5, 17246.0], [64.6, 17246.0], [64.7, 17246.0], [64.8, 17246.0], [64.9, 17246.0], [65.0, 18037.0], [65.1, 18037.0], [65.2, 18037.0], [65.3, 18037.0], [65.4, 18037.0], [65.5, 18037.0], [65.6, 18037.0], [65.7, 18037.0], [65.8, 18037.0], [65.9, 18037.0], [66.0, 18316.0], [66.1, 18316.0], [66.2, 18316.0], [66.3, 18316.0], [66.4, 18316.0], [66.5, 18316.0], [66.6, 18316.0], [66.7, 18316.0], [66.8, 18316.0], [66.9, 18316.0], [67.0, 18444.0], [67.1, 18444.0], [67.2, 18444.0], [67.3, 18444.0], [67.4, 18444.0], [67.5, 18444.0], [67.6, 18444.0], [67.7, 18444.0], [67.8, 18444.0], [67.9, 18444.0], [68.0, 18587.0], [68.1, 18587.0], [68.2, 18587.0], [68.3, 18587.0], [68.4, 18587.0], [68.5, 18587.0], [68.6, 18587.0], [68.7, 18587.0], [68.8, 18587.0], [68.9, 18587.0], [69.0, 18970.0], [69.1, 18970.0], [69.2, 18970.0], [69.3, 18970.0], [69.4, 18970.0], [69.5, 18970.0], [69.6, 18970.0], [69.7, 18970.0], [69.8, 18970.0], [69.9, 18970.0], [70.0, 19286.0], [70.1, 19286.0], [70.2, 19286.0], [70.3, 19286.0], [70.4, 19286.0], [70.5, 19286.0], [70.6, 19286.0], [70.7, 19286.0], [70.8, 19286.0], [70.9, 19286.0], [71.0, 19293.0], [71.1, 19293.0], [71.2, 19293.0], [71.3, 19293.0], [71.4, 19293.0], [71.5, 19293.0], [71.6, 19293.0], [71.7, 19293.0], [71.8, 19293.0], [71.9, 19293.0], [72.0, 19592.0], [72.1, 19592.0], [72.2, 19592.0], [72.3, 19592.0], [72.4, 19592.0], [72.5, 19592.0], [72.6, 19592.0], [72.7, 19592.0], [72.8, 19592.0], [72.9, 19592.0], [73.0, 19611.0], [73.1, 19611.0], [73.2, 19611.0], [73.3, 19611.0], [73.4, 19611.0], [73.5, 19611.0], [73.6, 19611.0], [73.7, 19611.0], [73.8, 19611.0], [73.9, 19611.0], [74.0, 19624.0], [74.1, 19624.0], [74.2, 19624.0], [74.3, 19624.0], [74.4, 19624.0], [74.5, 19624.0], [74.6, 19624.0], [74.7, 19624.0], [74.8, 19624.0], [74.9, 19624.0], [75.0, 19684.0], [75.1, 19684.0], [75.2, 19684.0], [75.3, 19684.0], [75.4, 19684.0], [75.5, 19684.0], [75.6, 19684.0], [75.7, 19684.0], [75.8, 19684.0], [75.9, 19684.0], [76.0, 19806.0], [76.1, 19806.0], [76.2, 19806.0], [76.3, 19806.0], [76.4, 19806.0], [76.5, 19806.0], [76.6, 19806.0], [76.7, 19806.0], [76.8, 19806.0], [76.9, 19806.0], [77.0, 20067.0], [77.1, 20067.0], [77.2, 20067.0], [77.3, 20067.0], [77.4, 20067.0], [77.5, 20067.0], [77.6, 20067.0], [77.7, 20067.0], [77.8, 20067.0], [77.9, 20067.0], [78.0, 20253.0], [78.1, 20253.0], [78.2, 20253.0], [78.3, 20253.0], [78.4, 20253.0], [78.5, 20253.0], [78.6, 20253.0], [78.7, 20253.0], [78.8, 20253.0], [78.9, 20253.0], [79.0, 20533.0], [79.1, 20533.0], [79.2, 20533.0], [79.3, 20533.0], [79.4, 20533.0], [79.5, 20533.0], [79.6, 20533.0], [79.7, 20533.0], [79.8, 20533.0], [79.9, 20533.0], [80.0, 20699.0], [80.1, 20699.0], [80.2, 20699.0], [80.3, 20699.0], [80.4, 20699.0], [80.5, 20699.0], [80.6, 20699.0], [80.7, 20699.0], [80.8, 20699.0], [80.9, 20699.0], [81.0, 20771.0], [81.1, 20771.0], [81.2, 20771.0], [81.3, 20771.0], [81.4, 20771.0], [81.5, 20771.0], [81.6, 20771.0], [81.7, 20771.0], [81.8, 20771.0], [81.9, 20771.0], [82.0, 20881.0], [82.1, 20881.0], [82.2, 20881.0], [82.3, 20881.0], [82.4, 20881.0], [82.5, 20881.0], [82.6, 20881.0], [82.7, 20881.0], [82.8, 20881.0], [82.9, 20881.0], [83.0, 21163.0], [83.1, 21163.0], [83.2, 21163.0], [83.3, 21163.0], [83.4, 21163.0], [83.5, 21163.0], [83.6, 21163.0], [83.7, 21163.0], [83.8, 21163.0], [83.9, 21163.0], [84.0, 21269.0], [84.1, 21269.0], [84.2, 21269.0], [84.3, 21269.0], [84.4, 21269.0], [84.5, 21269.0], [84.6, 21269.0], [84.7, 21269.0], [84.8, 21269.0], [84.9, 21269.0], [85.0, 21542.0], [85.1, 21542.0], [85.2, 21542.0], [85.3, 21542.0], [85.4, 21542.0], [85.5, 21542.0], [85.6, 21542.0], [85.7, 21542.0], [85.8, 21542.0], [85.9, 21542.0], [86.0, 21554.0], [86.1, 21554.0], [86.2, 21554.0], [86.3, 21554.0], [86.4, 21554.0], [86.5, 21554.0], [86.6, 21554.0], [86.7, 21554.0], [86.8, 21554.0], [86.9, 21554.0], [87.0, 21624.0], [87.1, 21624.0], [87.2, 21624.0], [87.3, 21624.0], [87.4, 21624.0], [87.5, 21624.0], [87.6, 21624.0], [87.7, 21624.0], [87.8, 21624.0], [87.9, 21624.0], [88.0, 21805.0], [88.1, 21805.0], [88.2, 21805.0], [88.3, 21805.0], [88.4, 21805.0], [88.5, 21805.0], [88.6, 21805.0], [88.7, 21805.0], [88.8, 21805.0], [88.9, 21805.0], [89.0, 21828.0], [89.1, 21828.0], [89.2, 21828.0], [89.3, 21828.0], [89.4, 21828.0], [89.5, 21828.0], [89.6, 21828.0], [89.7, 21828.0], [89.8, 21828.0], [89.9, 21828.0], [90.0, 21943.0], [90.1, 21943.0], [90.2, 21943.0], [90.3, 21943.0], [90.4, 21943.0], [90.5, 21943.0], [90.6, 21943.0], [90.7, 21943.0], [90.8, 21943.0], [90.9, 21943.0], [91.0, 22194.0], [91.1, 22194.0], [91.2, 22194.0], [91.3, 22194.0], [91.4, 22194.0], [91.5, 22194.0], [91.6, 22194.0], [91.7, 22194.0], [91.8, 22194.0], [91.9, 22194.0], [92.0, 22200.0], [92.1, 22200.0], [92.2, 22200.0], [92.3, 22200.0], [92.4, 22200.0], [92.5, 22200.0], [92.6, 22200.0], [92.7, 22200.0], [92.8, 22200.0], [92.9, 22200.0], [93.0, 22901.0], [93.1, 22901.0], [93.2, 22901.0], [93.3, 22901.0], [93.4, 22901.0], [93.5, 22901.0], [93.6, 22901.0], [93.7, 22901.0], [93.8, 22901.0], [93.9, 22901.0], [94.0, 22908.0], [94.1, 22908.0], [94.2, 22908.0], [94.3, 22908.0], [94.4, 22908.0], [94.5, 22908.0], [94.6, 22908.0], [94.7, 22908.0], [94.8, 22908.0], [94.9, 22908.0], [95.0, 22928.0], [95.1, 22928.0], [95.2, 22928.0], [95.3, 22928.0], [95.4, 22928.0], [95.5, 22928.0], [95.6, 22928.0], [95.7, 22928.0], [95.8, 22928.0], [95.9, 22928.0], [96.0, 22931.0], [96.1, 22931.0], [96.2, 22931.0], [96.3, 22931.0], [96.4, 22931.0], [96.5, 22931.0], [96.6, 22931.0], [96.7, 22931.0], [96.8, 22931.0], [96.9, 22931.0], [97.0, 22940.0], [97.1, 22940.0], [97.2, 22940.0], [97.3, 22940.0], [97.4, 22940.0], [97.5, 22940.0], [97.6, 22940.0], [97.7, 22940.0], [97.8, 22940.0], [97.9, 22940.0], [98.0, 22944.0], [98.1, 22944.0], [98.2, 22944.0], [98.3, 22944.0], [98.4, 22944.0], [98.5, 22944.0], [98.6, 22944.0], [98.7, 22944.0], [98.8, 22944.0], [98.9, 22944.0], [99.0, 22946.0], [99.1, 22946.0], [99.2, 22946.0], [99.3, 22946.0], [99.4, 22946.0], [99.5, 22946.0], [99.6, 22946.0], [99.7, 22946.0], [99.8, 22946.0], [99.9, 22946.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 2000.0, "maxY": 7.0, "series": [{"data": [[2000.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [3600.0, 2.0], [3900.0, 2.0], [4100.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [5600.0, 4.0], [5800.0, 1.0], [5900.0, 1.0], [7300.0, 2.0], [8200.0, 1.0], [8500.0, 1.0], [8600.0, 2.0], [9200.0, 1.0], [9500.0, 1.0], [9800.0, 1.0], [10200.0, 2.0], [10300.0, 1.0], [10500.0, 1.0], [10900.0, 1.0], [11400.0, 1.0], [11500.0, 3.0], [11800.0, 1.0], [11900.0, 1.0], [12100.0, 2.0], [12600.0, 1.0], [13800.0, 2.0], [13900.0, 2.0], [14000.0, 4.0], [14700.0, 2.0], [14900.0, 1.0], [15000.0, 3.0], [15200.0, 1.0], [15500.0, 2.0], [15600.0, 1.0], [15700.0, 1.0], [16000.0, 1.0], [16100.0, 1.0], [16900.0, 1.0], [17100.0, 2.0], [17200.0, 1.0], [18000.0, 1.0], [18300.0, 1.0], [18400.0, 1.0], [18500.0, 1.0], [18900.0, 1.0], [19200.0, 2.0], [19500.0, 1.0], [19600.0, 3.0], [19800.0, 1.0], [20000.0, 1.0], [20200.0, 1.0], [20500.0, 1.0], [20600.0, 1.0], [20700.0, 1.0], [20800.0, 1.0], [21100.0, 1.0], [21200.0, 1.0], [21500.0, 2.0], [21600.0, 1.0], [21800.0, 2.0], [21900.0, 1.0], [22100.0, 1.0], [22200.0, 1.0], [22900.0, 7.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 22900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 100.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 100.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 100.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 49.01030927835052, "minX": 1.64920182E12, "maxY": 99.0, "series": [{"data": [[1.64920182E12, 99.0], [1.64920188E12, 49.01030927835052]], "isOverall": false, "label": "Test Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64920188E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 2082.0, "minX": 2.0, "maxY": 22946.0, "series": [{"data": [[2.0, 22942.0], [3.0, 22946.0], [4.0, 22928.0], [5.0, 22908.0], [6.0, 22931.0], [7.0, 22901.0], [8.0, 22200.0], [9.0, 22194.0], [10.0, 21943.0], [11.0, 21828.0], [12.0, 21805.0], [13.0, 21624.0], [14.0, 21554.0], [15.0, 21542.0], [16.0, 21269.0], [17.0, 21163.0], [18.0, 20881.0], [19.0, 20771.0], [20.0, 20699.0], [21.0, 20533.0], [22.0, 20253.0], [23.0, 20067.0], [24.0, 19806.0], [25.0, 19684.0], [26.0, 19611.0], [27.0, 19624.0], [28.0, 19592.0], [29.0, 19293.0], [30.0, 19286.0], [31.0, 18970.0], [33.0, 18444.0], [32.0, 18587.0], [35.0, 18037.0], [34.0, 18316.0], [37.0, 17163.0], [36.0, 17246.0], [39.0, 16902.0], [38.0, 17137.0], [41.0, 16033.0], [40.0, 16165.0], [43.0, 15662.0], [42.0, 15782.0], [45.0, 15537.0], [44.0, 15566.0], [47.0, 15098.0], [46.0, 15216.0], [49.0, 15016.0], [48.0, 15076.0], [51.0, 14781.0], [50.0, 14979.0], [53.0, 14066.0], [52.0, 14751.0], [55.0, 14034.0], [54.0, 14049.0], [57.0, 13991.0], [56.0, 14007.0], [59.0, 13878.0], [58.0, 13900.0], [61.0, 12648.0], [60.0, 13878.0], [63.0, 12112.0], [62.0, 12194.0], [67.0, 11521.0], [66.0, 11530.0], [65.0, 11836.0], [64.0, 11958.0], [71.0, 10530.0], [70.0, 10929.0], [69.0, 11431.0], [68.0, 11500.0], [75.0, 9855.0], [74.0, 10223.0], [73.0, 10279.0], [72.0, 10390.0], [79.0, 8610.0], [78.0, 8669.0], [77.0, 9251.0], [76.0, 9546.0], [83.0, 7364.0], [82.0, 7385.0], [81.0, 8251.0], [80.0, 8554.0], [87.0, 5670.0], [86.0, 5684.0], [85.0, 5808.0], [84.0, 5916.0], [91.0, 4446.0], [90.0, 4788.0], [89.0, 5614.0], [88.0, 5657.0], [95.0, 3639.0], [94.0, 3989.0], [93.0, 3995.0], [92.0, 4102.0], [99.0, 2455.0], [98.0, 2608.0], [97.0, 2795.0], [96.0, 3633.0], [100.0, 2082.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[50.51, 14194.34]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 12.55, "minX": 1.64920182E12, "maxY": 7818890.316666666, "series": [{"data": [[1.64920182E12, 241821.35], [1.64920188E12, 7818890.316666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.64920182E12, 12.55], [1.64920188E12, 405.78333333333336]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64920188E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 2381.6666666666665, "minX": 1.64920182E12, "maxY": 14559.680412371134, "series": [{"data": [[1.64920182E12, 2381.6666666666665], [1.64920188E12, 14559.680412371134]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64920188E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 2250.3333333333335, "minX": 1.64920182E12, "maxY": 14265.57731958763, "series": [{"data": [[1.64920182E12, 2250.3333333333335], [1.64920188E12, 14265.57731958763]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64920188E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.7113402061855667, "minX": 1.64920182E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.64920182E12, 1.6666666666666667], [1.64920188E12, 0.7113402061855667]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64920188E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2082.0, "minX": 1.64920182E12, "maxY": 22946.0, "series": [{"data": [[1.64920182E12, 2608.0], [1.64920188E12, 22946.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.64920182E12, 2608.0], [1.64920188E12, 21993.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.64920182E12, 2608.0], [1.64920188E12, 22946.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.64920182E12, 2608.0], [1.64920188E12, 22928.3]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.64920182E12, 2082.0], [1.64920188E12, 2795.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.64920182E12, 2455.0], [1.64920188E12, 15016.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64920188E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 4788.0, "minX": 1.0, "maxY": 22227.5, "series": [{"data": [[1.0, 4788.0], [2.0, 7818.0], [4.0, 15907.5], [8.0, 16829.0], [9.0, 15076.0], [5.0, 10729.5], [3.0, 10322.5], [6.0, 5677.0], [7.0, 22227.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 9.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 4662.0, "minX": 1.0, "maxY": 21887.5, "series": [{"data": [[1.0, 4662.0], [2.0, 7586.5], [4.0, 15760.0], [8.0, 16305.0], [9.0, 14610.0], [5.0, 10530.5], [3.0, 10169.5], [6.0, 5349.5], [7.0, 21887.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 9.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.64920182E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.64920182E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64920182E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.64920182E12, "maxY": 1.6166666666666667, "series": [{"data": [[1.64920182E12, 0.05], [1.64920188E12, 1.6166666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64920188E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.64920182E12, "maxY": 1.6166666666666667, "series": [{"data": [[1.64920182E12, 0.05], [1.64920188E12, 1.6166666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64920188E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.64920182E12, "maxY": 1.6166666666666667, "series": [{"data": [[1.64920182E12, 0.05], [1.64920188E12, 1.6166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64920188E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

