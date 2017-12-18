'use strict';
var moment = require('moment');
var dateRangesCalculator = require('./../lib/calculate_dateranges');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = function(Daterange) {

  Daterange.getDateRanges = function (data, cb) {
    var startDate = moment(data.startDate).utc().add(330,'minutes').format();
    var endDate = moment(data.endDate).utc().add(330,'minutes').format();
    var dateRanges = [
      {
        "date" : startDate,
        "value" : getRandomInt(1,1000)
      }
    ];
    while(moment(endDate).isAfter(startDate)) {
      startDate = moment(startDate).add(1, 'seconds');
      dateRanges.push(
          {
              "date" : startDate,
              "value" : getRandomInt(1,1000)
          }
        );
    }
    cb(null, dateRanges);
  };

  Daterange.remoteMethod('getDateRanges', {
    http: {
      path: '/get/dateRanges',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'object', required: true, http: {source: 'body'}},
    returns: {arg: 'dateRanges', type: 'object', root: true}
  });
};
