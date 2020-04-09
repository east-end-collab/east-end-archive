const csvInput='./allrecords.csv';
const allRecordsOutput = './_data/all_records.json';
const fullRecordsOutput = './_data/full_records.json';
const csv=require('csvtojson')
const fs = require('fs');

csv()
.fromFile(csvInput)
.then((jsonObj)=>{    
    let stringifiedJson = JSON.stringify(jsonObj);
    // Adds new lines after commas and } to make the following regex work
    let jsonWithNewlines = stringifiedJson.replace(/(?<=("|}),)/g, '\n')
    let cleanedJson = jsonWithNewlines.replace(/(?<=")(.+)(?=":)/g, m => {
        let newString = ''
        // replaces spaces or forward slashes with underscores
        newString = m.replace(/([\s]+|\/)/g, '_');
        // Removes bracketed numbers (e.g., [12345])
        newString = newString.replace(/\[\d*\]/g, '')
        return newString;
    })    
    
    fs.writeFile(allRecordsOutput, cleanedJson, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`${csvInput} converted to json here: ${allRecordsOutput}`)
        }
    });

    return cleanedJson

}).then((cleanedJson)=> {
    let fullBioRecords = [];
    JSON.parse(cleanedJson).forEach(record => {
        if (record.Full_Biography_Record === 'TRUE') {
            const getDecade = year => year ? `${year.slice(0,3)}0's` : '[unknown]';
            let deathDecade = getDecade(record.Death_Year);
            let birthDecade = getDecade(record.Birth_Year);
            record['Death_Decade'] = deathDecade
            record['Birth_Decade'] = birthDecade
            fullBioRecords.push(record);
        }       
    });
    
    fs.writeFile(fullRecordsOutput, JSON.stringify(fullBioRecords), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`full bio records generated here: ${fullRecordsOutput}`)
        }
    });
})