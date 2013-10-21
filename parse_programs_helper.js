(function() {

    var getDay = function(allRows, startFromIndex, groupsInProgram) {
      var dayRows = [];
      var counter = 0;

      allRows.each(function(index, item){
        if(index >= startFromIndex && counter < groupsInProgram) {
          dayRows.push(item);
          counter++
        }
      });

      return dayRows;
    };

    exports.extractTableData =  function($, rows) {
      var result = [];

      $(rows).children("td").each(function(index, item){
        result.push(item);
      });

      return result;
    };

    exports.monday = function(allRows) {
      return getDay(allRows, 1, 5);
    };

    exports.tuesday = function(allRows) {
      return getDay(allRows, 6, 5);
    };

    exports.wednesday = function(allRows) {
      return getDay(allRows, 11, 5);
    };

    exports.thursday = function(allRows) {
      return getDay(allRows, 16, 5);
    };

    exports.friday = function(allRows) {
      // it's friday, friday, friday !

      return getDay(allRows, 21, 5);
    };

    exports.saturday = function(allRows) {
      return getDay(allRows, 26, 5);
    };
})();