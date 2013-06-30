json2csv
========

This is a simple node.js program I created out of necessity to convert a file with JSON data (created by Parse.com data export) to a CSV. The file I built this for only had "flat" objects in it - no objects or arrays as values for keys - so this program (for now) only handles such files. This program expects the first element in the JSON file to be an array, and the CSV would be created from the objects within that array. The array name is currently hard-coded as "results" (which is what Parse.com puts in their data export files). (A sample JSON file is included in the repository.)

I upload this to Github just in case it turns out to be useful for anyone.