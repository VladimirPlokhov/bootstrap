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

function stringStartsWith(substr) {
    return function(element) {
        return element.indexOf(substr) === 0;
    }
}

function compareFilesInFolder(path, refFilePrefix, newFilePrefix) {
    var files = fs.list(path),
        newFiles = files.filter(stringStartsWith(newFilePrefix)),
        refFiles = files.filter(stringStartsWith(refFilePrefix));
    for (var i = 0, len = refFiles.length; i < len; i++) {
        var referenceImageContent = fs.read(path + refFiles[i]),
            newImageContent = fs.read(path + newFiles[i]);
        casper.test.assert(newImageContent == referenceImageContent, 'File: ' + path + refFiles[i]);
    }
}

casper.start();
casper.each(viewports, function(casper, viewport) {
    casper.wait(1000, function() {
        this.echo("Wait for Jekyll server");
    });
    casper.thenOpen('http://0.0.0.0:9001/examples/grid/');
    casper.then(function() {
        this.viewport(viewport.viewport.width, viewport.viewport.height);
    });
    casper.then(function() {
        casper.test.comment('Capture mode: Normal Grid, Viewport: ' + viewport.name);
        captureInVP('.test-three-equal-columns', 'normal-grid-three-equal-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-three-unequal-columns', 'normal-grid-three-unequal-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-two-columns', 'normal-grid-two-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-two-columns-with-two-nested-columns', 'normal-grid-two-columns-with-two-nested-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-mixed-mobile-desktop', 'normal-grid-mixed-mobile-desktop.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-mixed-mobile-tablet-desktop', 'normal-grid-mixed-mobile-tablet-desktop.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-clearing', 'normal-grid-column-clearing.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-offset-push-pull', 'normal-grid-offset-push-pull.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-wrapping', 'normal-grid-column-wrapping.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-nesting-columns', 'normal-grid-nesting-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-ordering', 'normal-grid-column-ordering.png', viewport.name, SNAPSHOT_FOLDER);
    });
    casper.thenOpen('http://0.0.0.0:9001/examples/flex-grid/');
    casper.then(function() {
        casper.test.comment('Capture mode: Flex Grid, Viewport: ' + viewport.name);
        captureInVP('.test-three-equal-columns', 'flex-grid-three-equal-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-three-unequal-columns', 'flex-grid-three-unequal-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-two-columns', 'flex-grid-two-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-two-columns-with-two-nested-columns', 'flex-grid-two-columns-with-two-nested-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-mixed-mobile-desktop', 'flex-grid-mixed-mobile-desktop.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-mixed-mobile-tablet-desktop', 'flex-grid-mixed-mobile-tablet-desktop.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-clearing', 'flex-grid-column-clearing.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-offset-push-pull', 'flex-grid-offset-push-pull.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-wrapping', 'flex-grid-column-wrapping.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-nesting-columns', 'flex-grid-nesting-columns.png', viewport.name, SNAPSHOT_FOLDER);
        captureInVP('.test-column-ordering', 'flex-grid-column-ordering.png', viewport.name, SNAPSHOT_FOLDER);
    });
    casper.then(function() {
        casper.test.comment('Image comparison... Viewport: ' + viewport.name);
        compareFilesInFolder(SNAPSHOT_FOLDER + viewport.name + '/', 'flex', 'normal');
    });
});

casper.run(function() {
    this.test.done();
    this.test.renderResults(true);
});