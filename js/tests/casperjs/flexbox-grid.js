var fs = require('fs');
var SNAPSHOT_FOLDER = 'test-snapshots/';
var viewports = [
    {
        'name': 'bootstrap-screen-xs',
        'viewport': {width: 480, height: 1024}
    },
    {
        'name': 'bootstrap-screen-sm',
        'viewport': {width: 768, height: 1024}
    },
    {
        'name': 'bootstrap-screen-md',
        'viewport': {width: 992, height: 1024}
    },
    {
        'name': 'bootstrap-screen-lg',
        'viewport': {width: 1200, height: 1024}
    }
];

function captureInVP(selector, image, viewport, snapshotFolder) {
    var imagePath = snapshotFolder + viewport + '/' + image;
    casper.captureSelector(imagePath, selector);
}

function compareFilesInFolder(path) {
    var files = fs.list(path);
    var referenceImageContent = fs.read(path + files[2]),
        newImageContent = fs.read(path + files[3]);
    casper.test.assert(newImageContent == referenceImageContent);

}

casper.start('http://0.0.0.0:9001/examples/grid/');
casper.each(viewports, function(casper, viewport) {
    this.then(function() {
        this.viewport(viewport.viewport.width, viewport.viewport.height);
    });
    casper.then(function(){
        captureInVP('.test-three-equal-columns', 'normal-grid-example-basics.png', viewport.name, SNAPSHOT_FOLDER);
    });
    casper.thenOpen('http://0.0.0.0:9001/examples/flex-grid/');
    casper.then(function(){
        captureInVP('.test-three-equal-columns', 'flex-grid-example-basics.png', viewport.name, SNAPSHOT_FOLDER);
    });
    casper.then(function(){
        compareFilesInFolder(SNAPSHOT_FOLDER + viewport.name + '/');
    });
});

casper.run(function(){
    this.echo('finished');
    this.test.done();
    this.test.renderResults(true);
});