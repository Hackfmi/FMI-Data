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
        var replaceWith = "text/html; charset=utf-8";
        $("meta").attr("content", replaceWith);
        $("script").remove();
        $("body").append('<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>');
        $("body").append('<script src="http://underscorejs.org/underscore.js" type="text/javascript"></script>');
        $("body").append('<script src="../../../../parse_programs_include.js" type="text/javascript"></script>');
        fs.writeFileSync(buildPathToFile(item), $.html());
    });
});