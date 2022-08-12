export function RetrieveMarkdownDirectory() {
    var glob = require("glob");

    let output;
    glob("./contents/*.js", (er, files) => {
        output = files;
    });
    return output;
}

export function ReadFile(filename) {
    let output;
    fetch(filename)
        .then(row => row.text())
        .then(text => {
            output = text;
        });
    return output;
}