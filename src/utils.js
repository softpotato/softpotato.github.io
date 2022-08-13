export function ReadFile(filename) {
    let output;
    fetch(filename)
        .then(row => row.text())
        .then(text => {
            output = text;
        });
    return output;
}