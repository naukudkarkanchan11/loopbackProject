'use strict';

module.exports = function(Customers) {
    
    Customers.getCustomerById = function(value, cb){
      Customers.find({
          where : {
              customerId: value
          }
      }, cb); 
    };
    // /api/customers/getCustomerById
    Customers.remoteMethod("getCustomerById",{
        accepts: {
            arg: "customerId",
            type: "number"
        },
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/getCustomerById",
            verb: "get"
        }
    });
};
