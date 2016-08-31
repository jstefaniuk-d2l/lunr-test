(function() {
    var lunr = require('lunr');
    require('lunr-languages/lunr.stemmer.support.js')(lunr);
    require('lunr-languages/lunr.fr.js')(lunr);

    /*
    *   Define index data for LUNR 
    *   field: Searchable field
    *   ref: The value returned in a search to reference it to the found data
    */
    var indexes = {
        en: lunr(function () {
            this.ref('imageId')
            this.field('tags_en')
        }),

        fr: lunr(function () {
            this.use(lunr.fr);
            this.ref('imageId')
            this.field('tags_fr')
        })
    }

    /*
    * Array of objects containing our searchable/retrievable data
    */
    var images = [
        {
            imageId: 0,
            tags_en: ['star', 'astronomy', 'constellation', 'space'],
            tags_fr: ['étoile', 'astronomie', 'cosmos'],
            extraField: 'should not search (or break)!'
        }, 
        {
            imageId: 1,
            tags_en: ['nature', 'trees', 'landscape'],
            tags_fr: ['la nature', 'arbre', 'paysage']
        }
    ];

    /*
    * Initializes any search/image related stuff, such as indexing our images
    */
    var initialize = function() {
        for(var i = 0; i < images.length; i++) {
            indexes.en.add(images[i]);
            indexes.fr.add(images[i]);
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
    var search = function(language, searchTerm) {
        return indexes[language].search(searchTerm);
    }

    module.exports = {
        initialize: initialize,
        search: search,
        getImageData: getImageData
    };
}());