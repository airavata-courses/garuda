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
        data: {"result": {"minY": 141.0, "minX": 0.0, "maxY": 566.0, "series": [{"data": [[0.0, 141.0], [0.1, 141.0], [0.2, 141.0], [0.3, 141.0], [0.4, 141.0], [0.5, 141.0], [0.6, 141.0], [0.7, 141.0], [0.8, 141.0], [0.9, 141.0], [1.0, 146.0], [1.1, 146.0], [1.2, 146.0], [1.3, 146.0], [1.4, 146.0], [1.5, 146.0], [1.6, 146.0], [1.7, 146.0], [1.8, 146.0], [1.9, 146.0], [2.0, 158.0], [2.1, 158.0], [2.2, 158.0], [2.3, 158.0], [2.4, 158.0], [2.5, 158.0], [2.6, 158.0], [2.7, 158.0], [2.8, 158.0], [2.9, 158.0], [3.0, 162.0], [3.1, 162.0], [3.2, 162.0], [3.3, 162.0], [3.4, 162.0], [3.5, 162.0], [3.6, 162.0], [3.7, 162.0], [3.8, 162.0], [3.9, 162.0], [4.0, 168.0], [4.1, 168.0], [4.2, 168.0], [4.3, 168.0], [4.4, 168.0], [4.5, 168.0], [4.6, 168.0], [4.7, 168.0], [4.8, 168.0], [4.9, 168.0], [5.0, 172.0], [5.1, 172.0], [5.2, 172.0], [5.3, 172.0], [5.4, 172.0], [5.5, 172.0], [5.6, 172.0], [5.7, 172.0], [5.8, 172.0], [5.9, 172.0], [6.0, 173.0], [6.1, 173.0], [6.2, 173.0], [6.3, 173.0], [6.4, 173.0], [6.5, 173.0], [6.6, 173.0], [6.7, 173.0], [6.8, 173.0], [6.9, 173.0], [7.0, 177.0], [7.1, 177.0], [7.2, 177.0], [7.3, 177.0], [7.4, 177.0], [7.5, 177.0], [7.6, 177.0], [7.7, 177.0], [7.8, 177.0], [7.9, 177.0], [8.0, 180.0], [8.1, 180.0], [8.2, 180.0], [8.3, 180.0], [8.4, 180.0], [8.5, 180.0], [8.6, 180.0], [8.7, 180.0], [8.8, 180.0], [8.9, 180.0], [9.0, 184.0], [9.1, 184.0], [9.2, 184.0], [9.3, 184.0], [9.4, 184.0], [9.5, 184.0], [9.6, 184.0], [9.7, 184.0], [9.8, 184.0], [9.9, 184.0], [10.0, 187.0], [10.1, 187.0], [10.2, 187.0], [10.3, 187.0], [10.4, 187.0], [10.5, 187.0], [10.6, 187.0], [10.7, 187.0], [10.8, 187.0], [10.9, 187.0], [11.0, 189.0], [11.1, 189.0], [11.2, 189.0], [11.3, 189.0], [11.4, 189.0], [11.5, 189.0], [11.6, 189.0], [11.7, 189.0], [11.8, 189.0], [11.9, 189.0], [12.0, 190.0], [12.1, 190.0], [12.2, 190.0], [12.3, 190.0], [12.4, 190.0], [12.5, 190.0], [12.6, 190.0], [12.7, 190.0], [12.8, 190.0], [12.9, 190.0], [13.0, 195.0], [13.1, 195.0], [13.2, 195.0], [13.3, 195.0], [13.4, 195.0], [13.5, 195.0], [13.6, 195.0], [13.7, 195.0], [13.8, 195.0], [13.9, 195.0], [14.0, 206.0], [14.1, 206.0], [14.2, 206.0], [14.3, 206.0], [14.4, 206.0], [14.5, 206.0], [14.6, 206.0], [14.7, 206.0], [14.8, 206.0], [14.9, 206.0], [15.0, 220.0], [15.1, 220.0], [15.2, 220.0], [15.3, 220.0], [15.4, 220.0], [15.5, 220.0], [15.6, 220.0], [15.7, 220.0], [15.8, 220.0], [15.9, 220.0], [16.0, 228.0], [16.1, 228.0], [16.2, 228.0], [16.3, 228.0], [16.4, 228.0], [16.5, 228.0], [16.6, 228.0], [16.7, 228.0], [16.8, 228.0], [16.9, 228.0], [17.0, 232.0], [17.1, 232.0], [17.2, 232.0], [17.3, 232.0], [17.4, 232.0], [17.5, 232.0], [17.6, 232.0], [17.7, 232.0], [17.8, 232.0], [17.9, 232.0], [18.0, 244.0], [18.1, 244.0], [18.2, 244.0], [18.3, 244.0], [18.4, 244.0], [18.5, 244.0], [18.6, 244.0], [18.7, 244.0], [18.8, 244.0], [18.9, 244.0], [19.0, 244.0], [19.1, 244.0], [19.2, 244.0], [19.3, 244.0], [19.4, 244.0], [19.5, 244.0], [19.6, 244.0], [19.7, 244.0], [19.8, 244.0], [19.9, 244.0], [20.0, 248.0], [20.1, 248.0], [20.2, 248.0], [20.3, 248.0], [20.4, 248.0], [20.5, 248.0], [20.6, 248.0], [20.7, 248.0], [20.8, 248.0], [20.9, 248.0], [21.0, 283.0], [21.1, 283.0], [21.2, 283.0], [21.3, 283.0], [21.4, 283.0], [21.5, 283.0], [21.6, 283.0], [21.7, 283.0], [21.8, 283.0], [21.9, 283.0], [22.0, 284.0], [22.1, 284.0], [22.2, 284.0], [22.3, 284.0], [22.4, 284.0], [22.5, 284.0], [22.6, 284.0], [22.7, 284.0], [22.8, 284.0], [22.9, 284.0], [23.0, 284.0], [23.1, 284.0], [23.2, 284.0], [23.3, 284.0], [23.4, 284.0], [23.5, 284.0], [23.6, 284.0], [23.7, 284.0], [23.8, 284.0], [23.9, 284.0], [24.0, 294.0], [24.1, 294.0], [24.2, 294.0], [24.3, 294.0], [24.4, 294.0], [24.5, 294.0], [24.6, 294.0], [24.7, 294.0], [24.8, 294.0], [24.9, 294.0], [25.0, 299.0], [25.1, 299.0], [25.2, 299.0], [25.3, 299.0], [25.4, 299.0], [25.5, 299.0], [25.6, 299.0], [25.7, 299.0], [25.8, 299.0], [25.9, 299.0], [26.0, 312.0], [26.1, 312.0], [26.2, 312.0], [26.3, 312.0], [26.4, 312.0], [26.5, 312.0], [26.6, 312.0], [26.7, 312.0], [26.8, 312.0], [26.9, 312.0], [27.0, 317.0], [27.1, 317.0], [27.2, 317.0], [27.3, 317.0], [27.4, 317.0], [27.5, 317.0], [27.6, 317.0], [27.7, 317.0], [27.8, 317.0], [27.9, 317.0], [28.0, 318.0], [28.1, 318.0], [28.2, 318.0], [28.3, 318.0], [28.4, 318.0], [28.5, 318.0], [28.6, 318.0], [28.7, 318.0], [28.8, 318.0], [28.9, 318.0], [29.0, 321.0], [29.1, 321.0], [29.2, 321.0], [29.3, 321.0], [29.4, 321.0], [29.5, 321.0], [29.6, 321.0], [29.7, 321.0], [29.8, 321.0], [29.9, 321.0], [30.0, 332.0], [30.1, 332.0], [30.2, 332.0], [30.3, 332.0], [30.4, 332.0], [30.5, 332.0], [30.6, 332.0], [30.7, 332.0], [30.8, 332.0], [30.9, 332.0], [31.0, 334.0], [31.1, 334.0], [31.2, 334.0], [31.3, 334.0], [31.4, 334.0], [31.5, 334.0], [31.6, 334.0], [31.7, 334.0], [31.8, 334.0], [31.9, 334.0], [32.0, 338.0], [32.1, 338.0], [32.2, 338.0], [32.3, 338.0], [32.4, 338.0], [32.5, 338.0], [32.6, 338.0], [32.7, 338.0], [32.8, 338.0], [32.9, 338.0], [33.0, 346.0], [33.1, 346.0], [33.2, 346.0], [33.3, 346.0], [33.4, 346.0], [33.5, 346.0], [33.6, 346.0], [33.7, 346.0], [33.8, 346.0], [33.9, 346.0], [34.0, 353.0], [34.1, 353.0], [34.2, 353.0], [34.3, 353.0], [34.4, 353.0], [34.5, 353.0], [34.6, 353.0], [34.7, 353.0], [34.8, 353.0], [34.9, 353.0], [35.0, 356.0], [35.1, 356.0], [35.2, 356.0], [35.3, 356.0], [35.4, 356.0], [35.5, 356.0], [35.6, 356.0], [35.7, 356.0], [35.8, 356.0], [35.9, 356.0], [36.0, 357.0], [36.1, 357.0], [36.2, 357.0], [36.3, 357.0], [36.4, 357.0], [36.5, 357.0], [36.6, 357.0], [36.7, 357.0], [36.8, 357.0], [36.9, 357.0], [37.0, 364.0], [37.1, 364.0], [37.2, 364.0], [37.3, 364.0], [37.4, 364.0], [37.5, 364.0], [37.6, 364.0], [37.7, 364.0], [37.8, 364.0], [37.9, 364.0], [38.0, 375.0], [38.1, 375.0], [38.2, 375.0], [38.3, 375.0], [38.4, 375.0], [38.5, 375.0], [38.6, 375.0], [38.7, 375.0], [38.8, 375.0], [38.9, 375.0], [39.0, 376.0], [39.1, 376.0], [39.2, 376.0], [39.3, 376.0], [39.4, 376.0], [39.5, 376.0], [39.6, 376.0], [39.7, 376.0], [39.8, 376.0], [39.9, 376.0], [40.0, 378.0], [40.1, 378.0], [40.2, 378.0], [40.3, 378.0], [40.4, 378.0], [40.5, 378.0], [40.6, 378.0], [40.7, 378.0], [40.8, 378.0], [40.9, 378.0], [41.0, 379.0], [41.1, 379.0], [41.2, 379.0], [41.3, 379.0], [41.4, 379.0], [41.5, 379.0], [41.6, 379.0], [41.7, 379.0], [41.8, 379.0], [41.9, 379.0], [42.0, 387.0], [42.1, 387.0], [42.2, 387.0], [42.3, 387.0], [42.4, 387.0], [42.5, 387.0], [42.6, 387.0], [42.7, 387.0], [42.8, 387.0], [42.9, 387.0], [43.0, 389.0], [43.1, 389.0], [43.2, 389.0], [43.3, 389.0], [43.4, 389.0], [43.5, 389.0], [43.6, 389.0], [43.7, 389.0], [43.8, 389.0], [43.9, 389.0], [44.0, 410.0], [44.1, 410.0], [44.2, 410.0], [44.3, 410.0], [44.4, 410.0], [44.5, 410.0], [44.6, 410.0], [44.7, 410.0], [44.8, 410.0], [44.9, 410.0], [45.0, 412.0], [45.1, 412.0], [45.2, 412.0], [45.3, 412.0], [45.4, 412.0], [45.5, 412.0], [45.6, 412.0], [45.7, 412.0], [45.8, 412.0], [45.9, 412.0], [46.0, 423.0], [46.1, 423.0], [46.2, 423.0], [46.3, 423.0], [46.4, 423.0], [46.5, 423.0], [46.6, 423.0], [46.7, 423.0], [46.8, 423.0], [46.9, 423.0], [47.0, 430.0], [47.1, 430.0], [47.2, 430.0], [47.3, 430.0], [47.4, 430.0], [47.5, 430.0], [47.6, 430.0], [47.7, 430.0], [47.8, 430.0], [47.9, 430.0], [48.0, 432.0], [48.1, 432.0], [48.2, 432.0], [48.3, 432.0], [48.4, 432.0], [48.5, 432.0], [48.6, 432.0], [48.7, 432.0], [48.8, 432.0], [48.9, 432.0], [49.0, 439.0], [49.1, 439.0], [49.2, 439.0], [49.3, 439.0], [49.4, 439.0], [49.5, 439.0], [49.6, 439.0], [49.7, 439.0], [49.8, 439.0], [49.9, 439.0], [50.0, 442.0], [50.1, 442.0], [50.2, 442.0], [50.3, 442.0], [50.4, 442.0], [50.5, 442.0], [50.6, 442.0], [50.7, 442.0], [50.8, 442.0], [50.9, 442.0], [51.0, 453.0], [51.1, 453.0], [51.2, 453.0], [51.3, 453.0], [51.4, 453.0], [51.5, 453.0], [51.6, 453.0], [51.7, 453.0], [51.8, 453.0], [51.9, 453.0], [52.0, 455.0], [52.1, 455.0], [52.2, 455.0], [52.3, 455.0], [52.4, 455.0], [52.5, 455.0], [52.6, 455.0], [52.7, 455.0], [52.8, 455.0], [52.9, 455.0], [53.0, 458.0], [53.1, 458.0], [53.2, 458.0], [53.3, 458.0], [53.4, 458.0], [53.5, 458.0], [53.6, 458.0], [53.7, 458.0], [53.8, 458.0], [53.9, 458.0], [54.0, 458.0], [54.1, 458.0], [54.2, 458.0], [54.3, 458.0], [54.4, 458.0], [54.5, 458.0], [54.6, 458.0], [54.7, 458.0], [54.8, 458.0], [54.9, 458.0], [55.0, 460.0], [55.1, 460.0], [55.2, 460.0], [55.3, 460.0], [55.4, 460.0], [55.5, 460.0], [55.6, 460.0], [55.7, 460.0], [55.8, 460.0], [55.9, 460.0], [56.0, 461.0], [56.1, 461.0], [56.2, 461.0], [56.3, 461.0], [56.4, 461.0], [56.5, 461.0], [56.6, 461.0], [56.7, 461.0], [56.8, 461.0], [56.9, 461.0], [57.0, 462.0], [57.1, 462.0], [57.2, 462.0], [57.3, 462.0], [57.4, 462.0], [57.5, 462.0], [57.6, 462.0], [57.7, 462.0], [57.8, 462.0], [57.9, 462.0], [58.0, 464.0], [58.1, 464.0], [58.2, 464.0], [58.3, 464.0], [58.4, 464.0], [58.5, 464.0], [58.6, 464.0], [58.7, 464.0], [58.8, 464.0], [58.9, 464.0], [59.0, 464.0], [59.1, 464.0], [59.2, 464.0], [59.3, 464.0], [59.4, 464.0], [59.5, 464.0], [59.6, 464.0], [59.7, 464.0], [59.8, 464.0], [59.9, 464.0], [60.0, 473.0], [60.1, 473.0], [60.2, 473.0], [60.3, 473.0], [60.4, 473.0], [60.5, 473.0], [60.6, 473.0], [60.7, 473.0], [60.8, 473.0], [60.9, 473.0], [61.0, 476.0], [61.1, 476.0], [61.2, 476.0], [61.3, 476.0], [61.4, 476.0], [61.5, 476.0], [61.6, 476.0], [61.7, 476.0], [61.8, 476.0], [61.9, 476.0], [62.0, 482.0], [62.1, 482.0], [62.2, 482.0], [62.3, 482.0], [62.4, 482.0], [62.5, 482.0], [62.6, 482.0], [62.7, 482.0], [62.8, 482.0], [62.9, 482.0], [63.0, 487.0], [63.1, 487.0], [63.2, 487.0], [63.3, 487.0], [63.4, 487.0], [63.5, 487.0], [63.6, 487.0], [63.7, 487.0], [63.8, 487.0], [63.9, 487.0], [64.0, 489.0], [64.1, 489.0], [64.2, 489.0], [64.3, 489.0], [64.4, 489.0], [64.5, 489.0], [64.6, 489.0], [64.7, 489.0], [64.8, 489.0], [64.9, 489.0], [65.0, 490.0], [65.1, 490.0], [65.2, 490.0], [65.3, 490.0], [65.4, 490.0], [65.5, 490.0], [65.6, 490.0], [65.7, 490.0], [65.8, 490.0], [65.9, 490.0], [66.0, 493.0], [66.1, 493.0], [66.2, 493.0], [66.3, 493.0], [66.4, 493.0], [66.5, 493.0], [66.6, 493.0], [66.7, 493.0], [66.8, 493.0], [66.9, 493.0], [67.0, 496.0], [67.1, 496.0], [67.2, 496.0], [67.3, 496.0], [67.4, 496.0], [67.5, 496.0], [67.6, 496.0], [67.7, 496.0], [67.8, 496.0], [67.9, 496.0], [68.0, 499.0], [68.1, 499.0], [68.2, 499.0], [68.3, 499.0], [68.4, 499.0], [68.5, 499.0], [68.6, 499.0], [68.7, 499.0], [68.8, 499.0], [68.9, 499.0], [69.0, 501.0], [69.1, 501.0], [69.2, 501.0], [69.3, 501.0], [69.4, 501.0], [69.5, 501.0], [69.6, 501.0], [69.7, 501.0], [69.8, 501.0], [69.9, 501.0], [70.0, 502.0], [70.1, 502.0], [70.2, 502.0], [70.3, 502.0], [70.4, 502.0], [70.5, 502.0], [70.6, 502.0], [70.7, 502.0], [70.8, 502.0], [70.9, 502.0], [71.0, 503.0], [71.1, 503.0], [71.2, 503.0], [71.3, 503.0], [71.4, 503.0], [71.5, 503.0], [71.6, 503.0], [71.7, 503.0], [71.8, 503.0], [71.9, 503.0], [72.0, 506.0], [72.1, 506.0], [72.2, 506.0], [72.3, 506.0], [72.4, 506.0], [72.5, 506.0], [72.6, 506.0], [72.7, 506.0], [72.8, 506.0], [72.9, 506.0], [73.0, 507.0], [73.1, 507.0], [73.2, 507.0], [73.3, 507.0], [73.4, 507.0], [73.5, 507.0], [73.6, 507.0], [73.7, 507.0], [73.8, 507.0], [73.9, 507.0], [74.0, 508.0], [74.1, 508.0], [74.2, 508.0], [74.3, 508.0], [74.4, 508.0], [74.5, 508.0], [74.6, 508.0], [74.7, 508.0], [74.8, 508.0], [74.9, 508.0], [75.0, 509.0], [75.1, 509.0], [75.2, 509.0], [75.3, 509.0], [75.4, 509.0], [75.5, 509.0], [75.6, 509.0], [75.7, 509.0], [75.8, 509.0], [75.9, 509.0], [76.0, 527.0], [76.1, 527.0], [76.2, 527.0], [76.3, 527.0], [76.4, 527.0], [76.5, 527.0], [76.6, 527.0], [76.7, 527.0], [76.8, 527.0], [76.9, 527.0], [77.0, 532.0], [77.1, 532.0], [77.2, 532.0], [77.3, 532.0], [77.4, 532.0], [77.5, 532.0], [77.6, 532.0], [77.7, 532.0], [77.8, 532.0], [77.9, 532.0], [78.0, 532.0], [78.1, 532.0], [78.2, 532.0], [78.3, 532.0], [78.4, 532.0], [78.5, 532.0], [78.6, 532.0], [78.7, 532.0], [78.8, 532.0], [78.9, 532.0], [79.0, 532.0], [79.1, 532.0], [79.2, 532.0], [79.3, 532.0], [79.4, 532.0], [79.5, 532.0], [79.6, 532.0], [79.7, 532.0], [79.8, 532.0], [79.9, 532.0], [80.0, 532.0], [80.1, 532.0], [80.2, 532.0], [80.3, 532.0], [80.4, 532.0], [80.5, 532.0], [80.6, 532.0], [80.7, 532.0], [80.8, 532.0], [80.9, 532.0], [81.0, 536.0], [81.1, 536.0], [81.2, 536.0], [81.3, 536.0], [81.4, 536.0], [81.5, 536.0], [81.6, 536.0], [81.7, 536.0], [81.8, 536.0], [81.9, 536.0], [82.0, 537.0], [82.1, 537.0], [82.2, 537.0], [82.3, 537.0], [82.4, 537.0], [82.5, 537.0], [82.6, 537.0], [82.7, 537.0], [82.8, 537.0], [82.9, 537.0], [83.0, 540.0], [83.1, 540.0], [83.2, 540.0], [83.3, 540.0], [83.4, 540.0], [83.5, 540.0], [83.6, 540.0], [83.7, 540.0], [83.8, 540.0], [83.9, 540.0], [84.0, 540.0], [84.1, 540.0], [84.2, 540.0], [84.3, 540.0], [84.4, 540.0], [84.5, 540.0], [84.6, 540.0], [84.7, 540.0], [84.8, 540.0], [84.9, 540.0], [85.0, 543.0], [85.1, 543.0], [85.2, 543.0], [85.3, 543.0], [85.4, 543.0], [85.5, 543.0], [85.6, 543.0], [85.7, 543.0], [85.8, 543.0], [85.9, 543.0], [86.0, 543.0], [86.1, 543.0], [86.2, 543.0], [86.3, 543.0], [86.4, 543.0], [86.5, 543.0], [86.6, 543.0], [86.7, 543.0], [86.8, 543.0], [86.9, 543.0], [87.0, 543.0], [87.1, 543.0], [87.2, 543.0], [87.3, 543.0], [87.4, 543.0], [87.5, 543.0], [87.6, 543.0], [87.7, 543.0], [87.8, 543.0], [87.9, 543.0], [88.0, 545.0], [88.1, 545.0], [88.2, 545.0], [88.3, 545.0], [88.4, 545.0], [88.5, 545.0], [88.6, 545.0], [88.7, 545.0], [88.8, 545.0], [88.9, 545.0], [89.0, 547.0], [89.1, 547.0], [89.2, 547.0], [89.3, 547.0], [89.4, 547.0], [89.5, 547.0], [89.6, 547.0], [89.7, 547.0], [89.8, 547.0], [89.9, 547.0], [90.0, 553.0], [90.1, 553.0], [90.2, 553.0], [90.3, 553.0], [90.4, 553.0], [90.5, 553.0], [90.6, 553.0], [90.7, 553.0], [90.8, 553.0], [90.9, 553.0], [91.0, 554.0], [91.1, 554.0], [91.2, 554.0], [91.3, 554.0], [91.4, 554.0], [91.5, 554.0], [91.6, 554.0], [91.7, 554.0], [91.8, 554.0], [91.9, 554.0], [92.0, 554.0], [92.1, 554.0], [92.2, 554.0], [92.3, 554.0], [92.4, 554.0], [92.5, 554.0], [92.6, 554.0], [92.7, 554.0], [92.8, 554.0], [92.9, 554.0], [93.0, 554.0], [93.1, 554.0], [93.2, 554.0], [93.3, 554.0], [93.4, 554.0], [93.5, 554.0], [93.6, 554.0], [93.7, 554.0], [93.8, 554.0], [93.9, 554.0], [94.0, 554.0], [94.1, 554.0], [94.2, 554.0], [94.3, 554.0], [94.4, 554.0], [94.5, 554.0], [94.6, 554.0], [94.7, 554.0], [94.8, 554.0], [94.9, 554.0], [95.0, 555.0], [95.1, 555.0], [95.2, 555.0], [95.3, 555.0], [95.4, 555.0], [95.5, 555.0], [95.6, 555.0], [95.7, 555.0], [95.8, 555.0], [95.9, 555.0], [96.0, 559.0], [96.1, 559.0], [96.2, 559.0], [96.3, 559.0], [96.4, 559.0], [96.5, 559.0], [96.6, 559.0], [96.7, 559.0], [96.8, 559.0], [96.9, 559.0], [97.0, 560.0], [97.1, 560.0], [97.2, 560.0], [97.3, 560.0], [97.4, 560.0], [97.5, 560.0], [97.6, 560.0], [97.7, 560.0], [97.8, 560.0], [97.9, 560.0], [98.0, 561.0], [98.1, 561.0], [98.2, 561.0], [98.3, 561.0], [98.4, 561.0], [98.5, 561.0], [98.6, 561.0], [98.7, 561.0], [98.8, 561.0], [98.9, 561.0], [99.0, 566.0], [99.1, 566.0], [99.2, 566.0], [99.3, 566.0], [99.4, 566.0], [99.5, 566.0], [99.6, 566.0], [99.7, 566.0], [99.8, 566.0], [99.9, 566.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 12.0, "minX": 100.0, "maxY": 31.0, "series": [{"data": [[300.0, 18.0], [100.0, 14.0], [200.0, 12.0], [400.0, 25.0], [500.0, 31.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 31.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 69.0, "series": [{"data": [[0.0, 69.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 31.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 50.59000000000002, "minX": 1.6492038E12, "maxY": 50.59000000000002, "series": [{"data": [[1.6492038E12, 50.59000000000002]], "isOverall": false, "label": "Test Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6492038E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 141.0, "minX": 1.0, "maxY": 566.0, "series": [{"data": [[2.0, 561.0], [3.0, 559.0], [4.0, 554.0], [5.0, 555.0], [6.0, 554.0], [7.0, 553.0], [9.0, 548.5], [10.0, 543.0], [11.0, 536.0], [12.0, 537.0], [14.0, 546.0], [15.0, 540.0], [16.0, 532.0], [17.0, 560.0], [18.0, 540.0], [19.0, 543.0], [20.0, 554.0], [21.0, 532.0], [22.0, 532.0], [23.0, 532.0], [24.0, 527.0], [25.0, 502.0], [26.0, 507.0], [27.0, 501.0], [28.0, 509.0], [30.0, 498.5], [31.0, 503.0], [32.0, 499.0], [35.0, 493.0], [34.0, 501.0], [37.0, 487.0], [36.0, 490.0], [39.0, 476.0], [38.0, 482.0], [41.0, 464.0], [40.0, 473.0], [43.0, 462.0], [42.0, 464.0], [45.0, 460.5], [47.0, 458.0], [46.0, 458.0], [49.0, 453.0], [48.0, 455.0], [51.0, 439.0], [50.0, 442.0], [53.0, 430.0], [52.0, 432.0], [55.0, 412.0], [54.0, 423.0], [57.0, 379.0], [56.0, 410.0], [59.0, 387.0], [58.0, 389.0], [61.0, 378.0], [60.0, 376.0], [63.0, 364.0], [62.0, 375.0], [67.0, 346.0], [66.0, 357.0], [65.0, 353.0], [64.0, 356.0], [71.0, 333.0], [69.0, 321.0], [68.0, 338.0], [75.0, 299.0], [74.0, 312.0], [73.0, 318.0], [72.0, 317.0], [79.0, 283.6666666666667], [76.0, 294.0], [83.0, 232.0], [82.0, 244.0], [81.0, 244.0], [80.0, 248.0], [87.0, 195.0], [86.0, 206.0], [85.0, 220.0], [84.0, 228.0], [91.0, 184.0], [90.0, 187.0], [89.0, 189.0], [88.0, 190.0], [95.0, 172.0], [94.0, 173.0], [93.0, 177.0], [92.0, 180.0], [99.0, 146.0], [98.0, 158.0], [97.0, 162.0], [96.0, 168.0], [100.0, 141.0], [1.0, 566.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[50.59000000000002, 399.63]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 418.3333333333333, "minX": 1.6492038E12, "maxY": 796.6666666666666, "series": [{"data": [[1.6492038E12, 796.6666666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6492038E12, 418.3333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6492038E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 399.63, "minX": 1.6492038E12, "maxY": 399.63, "series": [{"data": [[1.6492038E12, 399.63]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6492038E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 399.59000000000015, "minX": 1.6492038E12, "maxY": 399.59000000000015, "series": [{"data": [[1.6492038E12, 399.59000000000015]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6492038E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 1.2700000000000007, "minX": 1.6492038E12, "maxY": 1.2700000000000007, "series": [{"data": [[1.6492038E12, 1.2700000000000007]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6492038E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 141.0, "minX": 1.6492038E12, "maxY": 566.0, "series": [{"data": [[1.6492038E12, 566.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6492038E12, 552.4000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6492038E12, 565.9499999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6492038E12, 554.95]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6492038E12, 141.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6492038E12, 440.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6492038E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 143.5, "minX": 2.0, "maxY": 447.5, "series": [{"data": [[2.0, 143.5], [98.0, 447.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 98.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 143.5, "minX": 2.0, "maxY": 447.5, "series": [{"data": [[2.0, 143.5], [98.0, 447.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 98.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.6492038E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.6492038E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6492038E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.6492038E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.6492038E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6492038E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.6492038E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.6492038E12, 1.6666666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6492038E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.6492038E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.6492038E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6492038E12, "title": "Total Transactions Per Second"}},
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

