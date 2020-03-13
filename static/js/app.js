// from data.js
let tableData = data;

// YOUR CODE HERE!

// select the ufo_data section and add the table
let ufoSection = d3.select('#UFO_data');
ufoSection.append('table').attr('id', 'data_table');
ufoTable = d3.select('#data_table');

// make header row
ufoTable.append('tr').attr('id', 'UFO_header_row');
var data_header = ['Date/Time', 'City', 'State', 'Country', 'Shape', 'Duration (Minutes)', 'Comments'];
let data_keys = Object.keys(tableData[0]);

data_header.forEach(column_name => {
    let header = d3.select('#UFO_header_row').append('th');
    header.text(column_name);
}
);

// nested loop to add initial entries
let sightingIndex = 0;

tableData.forEach(sighting => {
    let row = ufoTable.append('tr');

    // id each row as an index
    row.attr('id', `sighting_${sightingIndex}`);
    sightingIndex++;

    data_keys.forEach(data_value => {
        let entry = row.append('td');
        entry.text(sighting[data_value]);
        entry.attr('class', `${data_value}`)
    }
        );
});

// search function based on date/time
function searchUFO() {
    // set function query and create array of rows
    
    let query = d3.select('#dateSearch').property('value');
    let searchDate = new Date(query);
    // let searchDate = new Date(`${query[2]}/${query[1]}/${query[0]}`);
    // loop through each row in table
    for (let i = 0; i < data.length; i++){
        let row = d3.select(`#sighting_${i}`);

        // compare dates using Date()
        let rowDate = row.select('.datetime').text();
        if (rowDate != searchDate) {
            row.style('display', 'none');
            console.log(searchDate);
            console.log(rowDate);
        }
        else {
            row.style('display', 'table-row');
            // console.log(searchDate);
            // console.log(rowDate);
        }
    }

}

//listener for date/time query
d3.select('#UFO_search_button').on('click', searchUFO);

