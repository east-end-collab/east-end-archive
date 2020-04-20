const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const csvSource='./allrecords.csv';
const allRecordsDest = './_data/all_records.json';
const fullBioRecordsDest = './_data/full_records.json';
const testRecordsDest = './_data/test_records.json';

const readStream = fs.createReadStream(csvSource)
  .pipe(csv({
    mapHeaders: ({ header, index }) => header.replace(/\[\d*\]/g, '').replace(/[^a-zA-Z\d\s_]/g, '').replace(/\s/g, '_')
  }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
      let resultString = JSON.stringify(results)
      
    fs.writeFile(allRecordsDest, resultString, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`>>> ${csvSource} converted to json here: ${allRecordsDest}`)
        }
    });

    let fullBioRecords = [];
    results.forEach(record => {
        if (record.Full_Biography_Record === 'TRUE') {
            const getDecade = year => year ? `${year.slice(0,3)}0s` : '[unknown]';
            let deathDecade = getDecade(record.Death_Year);
            let birthDecade = getDecade(record.Birth_Year);
            record['Death_Decade'] = deathDecade
            record['Birth_Decade'] = birthDecade
            fullBioRecords.push(record);
        }       
    });
        
    fs.writeFile(fullBioRecordsDest, JSON.stringify(fullBioRecords), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`>>> Full bio records generated here: ${fullBioRecordsDest}`)
        }
    })

    fs.writeFile(testRecordsDest, JSON.stringify(fullBioRecords.slice(0, 9)), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`>>> Test bio records generated here: ${testRecordsDest}`)
        }
    })
    

  });