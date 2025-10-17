(function ($) {
  "use strict";
  var sparkline_chart = {
    init: function () {
      setTimeout(function () {
        $("#simple-line-chart-sparkline").sparkline([5, 10, 20, 14, 17, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20], {
          type: 'line',
          width: '100%',
          height: '150',
          tooltipClassname: 'chart-sparkline',
          lineColor: '#0da487',
          fillColor: 'transparent',
          highlightLineColor: '#0da487',
          highlightSpotColor: '#0da487',
          targetColor: '#0da487',
          performanceColor: '#0da487',
          boxFillColor: '#0da487',
          medianColor: '#0da487',
          minSpotColor: '#0da487'
        });
      })
    }
  };
  sparkline_chart.init()
})(jQuery);
