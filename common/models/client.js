'use strict';

/**
  * decode the csv string into array of dataSamples
  * @param {string} bleAddress
  * @param {Array<string>} datatypes
  * @param {Array<string>} sensorIds
  * @param {string} csvStr
  * @param {Function(Error, string)} callback
  * @return {Array<dataSamples>}
**/

function decodecsvDataSamples(bleAddress, datatypes, sensorIds, csvStr, callback){
  if(datatypes.length != sensorIds.length)
  {
    callback(new Error("wrong array length in datatypes and sensorIds"));
    return;
  }

  let rowsOfcsv = csvStr.split(';');

  if(rowsOfcsv[0].split(",").length != datatypes.length +1){
      callback(new Error("wrong array length in datatypes || sensorIds with csv data"));
      return;
  }

  let resultDataSamples = [];
  for(let row of rowsOfcsv){
    resultDataSamples = resultDataSamples.concat( csvStrToDataSamples(
      bleAddress,
      datatypes,
      sensorIds,
      row
    ) );
  }
  callback(null, resultDataSamples);
}


function csvStrToDataSamples(bleAddress, datatypes, sensorIds, csvStr){
  let csvCol = csvStr.split(',');
  let result = [];
  let tmpSample, tempDateTime;
  for(let index in csvCol){
    if(index == 0 ) {
      tempDateTime = csvCol[index];
      continue;
    }
    tmpSample = {};
    tmpSample.dateTime = tempDateTime;
    tmpSample.bleAddress = bleAddress;
    tmpSample.sensorType = datatypes[index-1];
    tmpSample.value=[ csvCol[index-1] ];
    tmpSample.sensorId=sensorIds[index-1];
    result.push(tmpSample);
  }

  return result;
}

/**
For test

sampleCsv = "2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6;2016-10-11T17:10:01.000Z,1,2,3,4,5,6"


sampleBleAddress = "15:sd:fe:34:4d:05"
sampleDatatypes = ["s1Type","s2Type","s3Type","s4Type","s5Type","s6Type"]
sampleSensorIds = ["S1Id","S2Id","S3Id","S4Id","S5Id","S6Id"]

decodecsvDataSamples(sampleBleAddress, sampleDatatypes, sampleSensorIds, sampleCsv, (err, samples)=>{console.dir(samples); console.log(err)});


**/

/**
Ffor testing only

sampleStr = "2016-10-11T17:10:01.000Z,1,2,3,4,5,6"
sampleBleAddress = "15:sd:fe:34:4d:05"
sampleDatatypes = ["s1Type","s2Type","s3Type","s4Type","s5Type","s6Type"]
sampleSensorIds = ["S1Id","S2Id","S3Id","S4Id","S5Id","S6Id"]
console.dir(csvStrToDataSamples(sampleBleAddress, sampleDatatypes, sampleSensorIds, sampleStr))




**/

module.exports = function(Client) {
  /**
   * uplaod a record with all dataSamples
   * @param {string} id of record
   * @param {date} dateTime date time
   * @param {number} duration the duration of the game
   * @param {string} ip ip
   * @param {string} location
   * @param {string} deviceId
   * @param {string} clientId
   * @param {string} bleAddress
   * @param {string} sensor1ID
   * @param {string} sensor2ID
   * @param {string} sensor3ID
   * @param {string} sensor4ID
   * @param {string} sensor5ID
   * @param {string} sensor6ID
   * @param {string} sensor1SensorType
   * @param {string} sensor2SensorType
   * @param {string} sensor3SensorType
   * @param {string} sensor4SensorType
   * @param {string} sensor5SensorType
   * @param {string} sensor6SensorType
   * @param {string} data the data string dateTime,s1,s2,s3,s4,s5,s6;        the date format is 2016-10-11T17:10:01.000Z
   * @param {Function(Error, string)} callback
   */

  Client.csvRecord = function(recordId, dateTime, duration, ip, location, deviceId, clientId, bleAddress, sensor1ID, sensor2ID, sensor3ID, sensor4ID, sensor5ID, sensor6ID, sensor1SensorType, sensor2SensorType, sensor3SensorType, sensor4SensorType, sensor5SensorType, sensor6SensorType, data, callback) {

    let startTime = Date.now();
    //get client instance
    Client.findById(clientId, (err, client)=>{
      if(err){
        callback(err, "failt to find client." + err.toString() ) ;
        return;
      }

      if(!client){
        callback(new Error("please inpuit correct client id"),"input error") ;
        return;
      }
      let t_foundclient = Date.now();
      console.log("I found a client with " + (t_foundclient-startTime) +"ms");

      //find record from record id

      // //record object
      // let recordData = {
      //   dateTime: dateTime,
      //   duration: duration,
      //   ip: ip,
      //   location: location,
      //   deviceId: deviceId
      // }

      //create record
      client.records.findById(recordId,(err, record)=>{
        if(err) {
          callback(err,"fail to create record " + err.toString() );
          return;
        }


        let t_foundRecord = Date.now();
        console.log("I t_foundRecord with " + (t_foundRecord -t_foundclient) +"ms");

        //decode data from client
        decodecsvDataSamples(
          bleAddress,
          [sensor1SensorType,sensor2SensorType,sensor3SensorType,sensor4SensorType,sensor5SensorType,sensor6SensorType],
          [sensor1ID, sensor2ID, sensor3ID, sensor4ID, sensor5ID, sensor6ID],
          data,
          (err, clientDataSamples)=>{
            if(err) {
              callback(err,"fail to decode the string");
              return;
            }

            let t_decodecsvDataSamples= Date.now();
            console.log("decodecsvDataSamples with " + (t_decodecsvDataSamples - t_foundRecord) +"ms");
            //create dataSamples
            record.dataSamples.create(clientDataSamples, (err, result)=>{
                if(err) {
                  callback(err,"fail to create record " + err.toString() );
                }else{
                  callback(null,{clientId: clientId, recordId: recordId});
                }
                let t_createRecord= Date.now();
                console.log("decodecsvDataSamples with " + (t_createRecord-t_decodecsvDataSamples) +"ms");
                console.log("total time with " + (t_createRecord - startTime) +"ms");
            });
            //end of dataSamples create
          }
          //end of decodecsvDataSamples callback
        );
        //end of decodecsvDataSamples
      });
      //end of record create
    });
    //end of client find
  }
  //end of csvRecord
};
