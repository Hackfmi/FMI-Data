$(document).ready(function() {
  var allRows = $("table tr");
  var groupsInProgram = 5;

  var getDay = window.getDay = function(startFromIndex, groupsInProgram) {
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

  var monday = window.monday = function() {
    return getDay(1, 5);
  };

  var tuesday = window.tuesday = function() {
    return getDay(6, 5);
  };

  var wednesday = window.wednesday = function() {
    return getDay(11, 5);
  };

  var thursday = window.thursday = function() {
    return getDay(16, 5);
  };

  var friday = window.friday = function() {
    // it's friday, friday, friday !

    return getDay(21, 5);
  };

  var saturday = window.saturday = function() {
    return getDay(26, 5);
  };

  var extractTableData = window.extractTableData = function(rows) {
    var result = [];

    $(rows).children("td").each(function(index, item){
      result.push(item);
    });

    return result;
  };

  var extractCellHtml = function(cell) {
    cell = $(cell);
    var cellLabel = "";
    if(cell.has("font").length !== 0) {
      cellLabel = cell.children("font").html();
    } else {
      cellLabel = cell.html();
    }

    cellLabel = cellLabel.trim().replace(/(\r\n|\n|\r)/gm,"");
    return cellLabel;
  };

  var extractRoomFromlabel = function(cell) {

  };

  var isCellGroupLabel = window.isCellGroupLabel = function(cell) {
    if(_.isUndefined(cell)) {
      return false;
    }

    var htmlContent = $(cell).children("font").html();

    if(_.isUndefined(htmlContent)) {
      return false;
    }

    return (htmlContent.indexOf("гр") !== -1);
  };

  var filterEmptyCells = window.filterEmptyCells = function(row) {
    var result = [];
    $(row).each(function(index, item) {
      // fuck clean code
      var td = $(item);
      if (td.text !== '' && td.text() !== ' ' && td.html() !== '&nbsp;' && index != 0) {
          if(!isCellGroupLabel(item)) {
            result.push({
              index : index,
              item : item
            });
          }
      }
    });

    return result;
  };

  var fixIndex = window.fixIndex = function(filteredGroup) {
    for(var i = 0, n = filteredGroup.length; i < n; i ++) {
      for(var j = i + 1; j < n; j++) {
        var current = filteredGroup[i];
        var next = filteredGroup[j];
        // console.log(current, next);
        if(_.isUndefined(next)) {
          // we have reached the end;
          break;
        }

        next.index = next.index + parseInt($(current.item).attr("colSpan"), 10) - 1;
      }
    }

    return filteredGroup;
  };

  var getStartTime = window.getStartTime = function(cell, index, offset) {
    if(_.isUndefined(offset)) {
      offset = 5;
    }
    // console.log($(cell).attr("colSpan"));
    return parseInt(index, 10) + parseInt(offset, 10);
  };

  var getEndTime = window.getEndTime = function(cell, index, offset) {
    return getStartTime(cell, index, offset) + parseInt($(cell).attr("colSpan"), 10);
  };

  var getType = window.getType = function(cell) {
    if($(cell).attr("rowspan") > 1) {
      return "lecture"
    }

    return "lab";
  };

  var getLabel = function(cellHtml) {
    return cellHtml.split("/")[0];
  };

  var getRoom = function(cellHtml) {
    return _.last(cellHtml.split("/"));
  }

  var testData = function(allGroupsInGivenDay, label) {
    console.log("----- TESTING ", label.toUpperCase(), " -----");
    _.each(allGroupsInGivenDay, function(item) {
      // console.log(item);
      var currentGroup = fixIndex(filterEmptyCells(extractTableData($(item))));

      var groupWithLabels = currentGroup.map(function(x) {
        return {
          "label" : getLabel(extractCellHtml(x.item)).trim(),
          "room" : getRoom(extractCellHtml(x.item)).trim(),
          "start" : getStartTime(x.item, x.index, 5),
          "end" : getEndTime(x.item, x.index, 5),
          "type" : getType(x.item)
        };
      });
      console.log(JSON.stringify(groupWithLabels, null, 4));
    });
  };

  testData(monday(), "monday");
  testData(tuesday(), "tuesday");
  testData(wednesday(), "wednesday");
  testData(thursday(), "thursday");
  testData(friday(), "friday");
  testData(saturday(), "saturday");

  // var group1 = extractTableData([0]);
  // var g1Filtered = fixIndex(filterEmptyCells(group1));

  // var g1StartTimes = g1Filtered.map(function(x) {
  //   return getStartTime(x.item, x.index, 5);
  // });

  // console.log(g1Filtered);
  // console.log(g1StartTimes);

});