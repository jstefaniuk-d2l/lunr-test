const repl = require('repl');
const imageProvider = require('./imageProvider');

imageProvider.initialize();

const replServer = repl.start({
    prompt: 'Enter search term> ',
    eval: eval
});

function eval(searchTerm) {
    search(searchTerm.trim());
};

function search(searchTerm) {
    var results = imageProvider.search('en', searchTerm);
    
    if(results && results.length > 0) {
        console.log('Results for "' + searchTerm + '":\n');
        for(var i = 0; i < results.length; i++) {
            console.log(
                JSON.stringify(
                    imageProvider.getImageData(results[i].ref), 
                    null, 
                    4)
                );
        }
    } else {
        console.log('No results.');
    }

    replServer.displayPrompt();
}
