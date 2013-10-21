var
    wrench = require("wrench"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    parseHelper = require("./parse_programs_helper.js"),
    $ = null,
    rawDataFolder = "program-raw-data";

var matchFileName = function(currentFile, fileNameToMatch) {
    return currentFile.match(fileNameToMatch);
};

var buildPathToFile = function(file) {
    return [__dirname, rawDataFolder, file].join("/");
};

var testData = function($, allGroupsInGivenDay, label) {
  console.log("----- TESTING ", label.toUpperCase(), " -----");
  allGroupsInGivenDay.forEach(function(item) {
    // console.log(item);
    // var currentGroup = fixIndex(filterEmptyCells(extractTableData($(item))));

    var currentGroup = parseHelper.extractTableData($, $(item));
    console.log(currentGroup);

    // var groupWithLabels = currentGroup.map(function(x) {
    //   return {
    //     "label" : getLabel(extractCellHtml(x.item)).trim(),
    //     "room" : getRoom(extractCellHtml(x.item)).trim(),
    //     "start" : getStartTime(x.item, x.index, 5),
    //     "end" : getEndTime(x.item, x.index, 5),
    //     "type" : getType(x.item)
    //   };
    // });
    // console.log(JSON.stringify(groupWithLabels, null, 4));
  });
};

wrench.readdirRecursive(rawDataFolder, function(error, curFiles) {
    if(!curFiles) {
        return false;
    }

    curFiles = curFiles.filter(function(item) {
        return matchFileName(item, "sheet001.htm");
    });

    curFiles.forEach(function(item) {
        // console.log();
        $ = cheerio.load(
                        fs.readFileSync(
                                        buildPathToFile(item)));

        var allRows = $("table tr");
        testData($, parseHelper.monday(allRows), "monday");
    });
});