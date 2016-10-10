'use strict';

module.exports = function(Record) {
  Record.beforeCreate = function(next, modelInstance){
    Record.count({dateTime: this.dateTime, },function(err,count){
      if(err) next(err);
      else {
        if(count >0)
          next(new Error("duplicate record"));
        else
          next();
      }
    });
  }
};
