// require underscore.js and file system
var _ = require('underscore')._;
var fs = require('fs');

// read the name of the input file (3rd object in process.args would be the first command line argument (first two are "node" and name of .js file))
var inFilename = process.argv[2];
// if 4th object in process.args exists it's the name of the output file; otherwise add a .csv extension to the name of the input file
var outFilename = (process.argv.length>3) ? process.argv[3] : process.argv[2]+'.csv';

// read input file into a JS object
var data = JSON.parse(fs.readFileSync(inFilename).toString());

// placeholder for columns
var columns = [];

// get all the columns by reading the keys from each object and creating a union out of them with _.union

_.each(data.results, function(obj) {
	// returns all the keys of the object obj
	keys = Object.keys(obj);
	// creates a union (unique values only) of the current columns array and the list of keys for the current object
	columns = _.union(columns, keys);
});


// create a write stream
var out = fs.createWriteStream(outFilename);

// ONCE the stream (out) is 'open' (event emitted), do function. fd = file descriptor
out.once('open', function(fd) {
	// write column headers line
	_.each(columns, function(column) {
		out.write(column);
		out.write(',');
	});

	out.write('\n');

	// iterate through objects
	_.each(data.results, function(obj) {
		// write the value for each column, writing '' when the object doesn't have that column
		_.each(columns, function(column) {
			out.write((client[column] ? client[column] : ''));
			out.write(',');
		});

		out.write('\n');
	});	
});

