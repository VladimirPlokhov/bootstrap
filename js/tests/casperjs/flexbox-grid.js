var fs = require('fs');

casper.start('http://0.0.0.0:9001/examples/grid/');

casper.then(function(){
    this.captureSelector('normal-grid-example-basics.png', '.test-three-equal-columns');
    this.captureSelector('normal-grid-example-basics.png', '.test-three-unequal-columns');
});

casper.thenOpen('http://0.0.0.0:9001/examples/flex-grid/');

casper.then(function(){
    this.captureSelector('flex-grid-example-basics.png', '.test-three-equal-columns');
    this.captureSelector('flex-grid-example-basics.png', '.test-three-unequal-columns');
});

casper.then(function(){
    var referenceImageContent = fs.read('./normal-grid-example-basics.png'),
        newImageContent = fs.read('./flex-grid-example-basics.png');
    this.test.assert(newImageContent == referenceImageContent);
});


casper.run(function(){
    this.echo('finished');
    this.test.done();
    this.test.renderResults(true);
});