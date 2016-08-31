(function() {
    var lunr = require('elasticlunr');

    /*
    *   Define index data for LUNR 
    *   field: Searchable field
    *   ref: The value returned in a search to reference it to the found data
    */
    var index = lunr(function () {
        this.setRef('imageId');
        this.addField('tags')
    })

    /*
    * Array of objects containing our searchable/retrievable data
    */
    var images = [
        {
            imageId: 0,
            tags: ['star', 'astronomy', 'constellation', 'space'],
            extraField: 'should not search (or break)!'
        }, 
        {
            imageId: 1,
            tags: ['nature', 'trees', 'landscape']
        }
    ];

    /*
    * Initializes any search/image related stuff, such as indexing our images
    */
    var initialize = function() {
        for(var i = 0; i < images.length; i++) {
            index.addDoc(images[i]);
        }
    };

    /* 
    * Largely unnecessary wrapper that just makes things more semantically straightforward in result parsing code
    */
    var getImageData = function(id) {
        return images[id];
    };

    /* 
    * Simple wrapper to create a consistent interface
    */
    var search = function(searchTerm) {
        return index.search(searchTerm);
    }

    module.exports = {
        initialize: initialize,
        search: search,
        getImageData: getImageData
    };
}());