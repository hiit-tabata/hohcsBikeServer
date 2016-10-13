'use strict';

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
   * @param {array} data the data string dateTime,s1,s2,s3,s4,s5,s6;        the date format is 2016-10-11T17:10:01.000Z
   * @param {Function(Error, string)} callback
   */

  Client.csvRecord = function(recordId, dateTime, duration, ip, location, deviceId, clientId, bleAddress, sensor1ID, sensor2ID, sensor3ID, sensor4ID, sensor5ID, sensor6ID, sensor1SensorType, sensor2SensorType, sensor3SensorType, sensor4SensorType, sensor5SensorType, sensor6SensorType, data, callback) {
    // let clientInstance = { };
    // Client.create();

    callback(null, "dffff" );
  };


};
