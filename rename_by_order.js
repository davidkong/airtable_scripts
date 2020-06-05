// This script runs inside the Airtable Script Block and prefixes all of the records in the view
// with their rank in the current view (for manual sorting)

let table = base.getTable("Feature Requests");
let view = table.getView("Grid view");
let query = await view.selectRecordsAsync();

var records = query.records;

function renameByOrder(records) {

    var newRecords = [];
    for (var i = 0; i < records.length; i++) {

        var recordName = records[i].name;

        // split based on .
        var items = recordName.split('.');

        // if the first item is a number, remove it
        if (/^\d+$/.test(items[0])) {
            // strip off everything before the first period, the period, and the space
            recordName = recordName.slice(recordName.indexOf('.') + 2);
        }

        // add on the new number
        recordName = i + ". " + recordName;
        newRecords.push({name:recordName});
        table.updateRecordAsync(records[i],{"Name":recordName});

       
    }
    return newRecords;
}

output.table(renameByOrder(records));
