var
    wrench = require("wrench"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    $ = null,
    rawDataFolder = "program-raw-data";

var matchFileName = function(currentFile, fileNameToMatch) {
    return currentFile.match(fileNameToMatch);
};

var buildPathToFile = function(file) {
    return [__dirname, rawDataFolder, file].join("/");
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
        console.log($("table").html());
    });
});