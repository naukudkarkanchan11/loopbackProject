'use strict';

module.exports = function(Customers) {    
    
    //addCustomer
    
    Customers.addCustomer = function(name, email, password, contactNumber, isAmbassador, referralId, cb){
        var joiningDate = new Date();
        var payback = 0.0;
        var joiningFees = 100.0;
        var level;
        console.log("Date" + joiningDate); 
      Customers.count({}, function(err, count){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("Count"+count);
              console.log("referralId"+referralId);
              if(referralId === undefined){
                  console.log("rId");
                  referralId = 0;
                  level = 0;
                  Customers.create({"customerId": count+1001,
                        "name": name,
                        "email": email,
                        "password": password,
                        "contactNumber": contactNumber,
                        "level": level,            
                        "isAmbassador": isAmbassador,
                        "referralId": referralId,
                        "payback": payback,                
                        "joiningDate": joiningDate,
                        "lastUpdated": joiningDate
      }, function(err, data){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("New Customer is added successfully");
              console.log(data);
              cb(null, data);
          }
      }); 
    }else{  
        
      Customers.find({
          where:{
          "customerId": referralId
      }}, function(err, data){
          if(err){
              console.log("Error"+err);
          }else{   
              console.log(data);
              level = data[0].level;
              console.log(data[0].level);
      Customers.create({"customerId": count+1001,
                        "name": name,
                        "email": email,
                        "password": password,
                        "contactNumber": contactNumber,
                        "level":level+1,
                        "isAmbassador": isAmbassador,
                        "referralId": referralId,
                        "payback": payback,
                        "joiningDate": joiningDate,
                        "lastUpdated": joiningDate
      }, function(err, data1){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("New Customer is added with referralId");
              console.log(data1);
              var x;
              ref_status(referralId, resultCallback);
              
              function resultCallback(result){
                    console.log("Result"+result);
                    x= result;
                    console.log("X"+x);
                    if(x === "NONE")
                        {
                            console.log("Parent upated successfully");
                            cb(null, data1);
                        }else{
                            console.log("inside function else");
                            console.log("input"+x);
                            ref_status(x, resultCallback);                                                            
                            }
                        }            
                      
    function ref_status(referralId,callback){  
          console.log("Inside function");
          Customers.update({"customerId": referralId},                                                       
                           {"lastUpdated": joiningDate}
                          ,function(err, doc2){
                        if(err){
                             console.log("Error"+err);
                        }else{ 
                            console.log("84");
                            Customers.find({"customerId":referralId},function(err, doc10){
                                if(err){console.log("Error"+err);}
                                else{
                                    console.log(103);
                                    if(doc10[0].isAmbassador === true){
                                        console.log("105");
                            
                             Customers.updateAll({"customerId": referralId},                                                           
                                      {$inc: {"payback": 0.4*joiningFees}},
                                             function(err, doc3){ 
                                                    if(err){console.log("Error"+err);}else{
                                                            console.log("Payback updated");                                                                                    
                                                            Customers.find({where:
                                                                            {"customerId":referralId}},function(err,doc6){
                                                                if(err){ console.log("Error"+err);}
                                                                        else{
                                                                            console.log("Doc"+doc6[0].referralId);
                                                                                            if(doc6[0].referralId === 0)
                                                                                                callback("NONE");
                                                                                            else{
                                                                                            rnumber = doc6[0].referralId; 
                                                                                            console.log("R"+rnumber);                                                                                            
                                                                                            callback(rnumber);
                                                                                            }                                                                                                
                                                                                        }
                                                                                    });
                                                                           
                                                                            }
                                                                        });//payback update
                                                                }else{
                                                                    
                                                                    console.log("Non Ambassador");
                                                                    console.log("R"+referralId);
                                                                     Customers.updateAll({"customerId": referralId},                                                           
                                                                                             {$inc: {"payback": 0.3*joiningFees}},                                                                                            
                                             function(err, doc3){ 
                                                    if(err){console.log("Error"+err);}else{
                                                            console.log("Payback updated");                                                                                    
                                                            Customers.find({where:
                                                                            {"customerId":referralId}},function(err,doc6){
                                                                if(err){ console.log("Error"+err);}
                                                                        else{
                                                                            console.log("Doc"+doc6[0].referralId);
                                                                                            if(doc6[0].referralId === 0)
                                                                                                callback("NONE");
                                                                                            else{
                                                                                            var rnumber = doc6[0].referralId; 
                                                                                            console.log("R"+rnumber);                                                                                            
                                                                                            callback(rnumber);
                                                                                            }                                                                                                
                                                                                        }
                                                                                    });
                                                                           
                                                                            }
                                                                        });//payback update
                                                                } //else of isAmbassador 
                                                            }
                                                        });
                                                  }//else
              
          });
                                
                                                }//function status           
              
            
          }
      }); 
          }
      });
      }//no referralId else
      }
     });
    };   
    Customers.remoteMethod("addCustomer",{
        accepts: [{
            arg: "name",
            type: "string"            
        },{
            arg: "email",
            type: "string"
        },{
            arg: "password",
            type: "string"                    
        },{
            arg: "contactNumber",
            type: "number"
        },{
            arg: "isAmbassador",
            type: "boolean"
        },{
            arg: "referralId",
            type: "number" 
        }],
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/addCustomer",
            verb: "post"
        }
    });
    
    
    
    //getCustomerById
    Customers.getCustomerById = function(customerId, cb){
      Customers.find({
          where : {
              customerId: customerId
          }
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("Availabe Customers");
              console.log(data);
              cb(null, data);
          }
      }); 
    };   
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
            verb: "post"
        }
    });
    
   //addReferral
    
    Customers.addReferral = function(customerId, referralId, cb){
      var level;
      var joiningFees = 100.0;    
      var rnumber;    
      Customers.find({
          where : {
              "customerId": customerId
          }
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("L"+ data.length);
              if(data.length !== 0){
                  level = data[0].level;
                  Customers.updateAll({"customerId": customerId},
                                      {"referralId": referralId,
                                       "level": level+1},
                                     function(err, data1){
                                     if(err){
                                         console.log("Error"+err);
                                     }else{
                                         var date = new Date();
                                         console.log("Referral added successfully");
                                          var x;
                                          var y;   
                                         
                                          ref_status(referralId,resultCallback);
                                          ref_level(customerId,resultCallback1);
                                         
                                           function resultCallback(result){
                                                    console.log("Result"+result);
                                                    x= result;
                                                    console.log("X"+x);
                                                    if(x === "NONE")
                                                        {
                                                            console.log("Parent upated successfully");
                                                           
                                                            var status = "Parent upated successfully";
                                                            cb(null, status);
                                                           
                                                        }else{
                                                            console.log("inside function else");
                                                            console.log("input"+x);
                                                            ref_status(x, resultCallback);                                                            
                                                        }
                                                }//result_callback function
                                                
                                                function resultCallback1(result){
                                                    console.log("Result"+result);
                                                    console.log("L"+result.length);
                                                    console.log("Inside level function");
                                                    for(var i=0; i<result.length; i++){
                                                        var x = result[i];
                                                        console.log("X"+x);
                                                   
                                                        ref_level(x, resultCallback1); 
                                                    }
                                                        
                                                }//result_callback function
                                         
                                         
                 function ref_status(referralId,callback){  
          console.log("Inside function");
          Customers.updateAll({"customerId": referralId},                                                
                              {"lastUpdated": date}
                   ,function(err, doc2){
                        if(err){
                             console.log("Error"+err);
                        }else{ 
                            console.log("38");
                            Customers.find({where: {"customerId": referralId}},function(err, doc10){
                                if(err){console.log("Error"+err);}
                                else{
                                    console.log("L"+doc10.length);
                                    console.log("Doc10"+ JSON.stringify(doc10));
                                    console.log("AStatus"+doc10[0].isAmbassador);
                            if(doc10[0].isAmbassador === true){
                             Customers.updateAll({"customerId": referralId},                                                           
                                      {$inc: {"payback": 0.4*joiningFees}},
                                             function(err, doc3){ 
                                                    if(err){console.log("Error"+err);}else{
                                                            console.log("Payback updated");                                                                                    
                                                            Customers.find({where: {"customerId":referralId}},function(err,doc6){
                                                                if(err){ console.log("Error"+err);}
                                                                        else{
                                                                            console.log("Doc"+doc6[0].referralId);
                                                                                            if(doc6[0].referral_id === 0){
                                                                                                console.log("321");
                                                                                                callback("NONE");
                                                                                            }
                                                                                            else{
                                                                                            rnumber = doc6[0].referralId; 
                                                                                            console.log("R"+rnumber);                                                                                            
                                                                                            callback(rnumber);
                                                                                            }                                                                                                
                                                                                        }
                                                                                    });
                                                                           
                                                                            }
                                                                        });///payload
                            }else{
                                console.log("Non Ambassador");
                                Customers.update({"customerId": referralId},                                                           
                                      {$inc: {"payback": 0.3*joiningFees}},
                                             function(err, doc3){ 
                                                    if(err){console.log("Error"+err);}else{
                                                            console.log("Payback updated");                                                                                    
                                                            Customers.find({where: {"customerId":referralId}},function(err,doc6){
                                                                if(err){ console.log("Error"+err);}
                                                                        else{
                                                                            console.log("Doc"+doc6[0].referralId);
                                                                                            if(doc6[0].referralId === 0)
                                                                                                callback("NONE");
                                                                                            else{
                                                                                            rnumber = doc6[0].referralId; 
                                                                                            console.log("R"+rnumber);                                                                                            
                                                                                            callback(rnumber);
                                                                                            }                                                                                                
                                                                                        }
                                                                                    });
                                                                           
                                                                            }
                                                                        });///payload
                                
                            }
                                }
                            });
                                                                }  
                                                    });
                                               }//ref_status function  
                                         
    function ref_level(customerId,callback){  
          console.log("Inside level function");
          Customers.find({where: {"referralId": customerId}}, function(err, doc2){
                   if(err){console.log("Error"+err);}
                    else{
                          var result = [];
                        console.log("371");
                          if(doc2.length !== 0){
                              console.log("Inside level update");
                              doc2.forEach(function(doc3){
                                  console.log("Inside for Each");
                                    Customers.updateAll({"customerId": doc3.customerId},                                                           
                                                     {$inc: 
                                                        {"level": 1}
                                                     },function(err, doc4){
                                                if(err){
                                                        console.log("Error"+err);
                                                }else{ 
                                                    console.log("141");
                                                    result.push(doc3.customerId);
                                                    if(doc2.length === result.length){
                                                        console.log("Result"+result);
                                                        callback(result);
                                                    }
                                                    
                                                     }
                                                 });
                                            });  
                                }
                    }
          });
    }//ref_level function                            
          }
                      
                  });
              }else{
                  console.log("No customer with Id");
                  var r = "No customer with Id";
                  cb(null, r); 
                  
              }
          }
      }); 
    };   
    Customers.remoteMethod("addReferral",{
        accepts: [{
            arg: "customerId",
            type: "number"
        },{
            arg: "referralId",
            type: "number"
        }],
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/addReferral",
            verb: "post"
        }
    });
    
    
    
    
   //fetchAllChildren
    
    Customers.fetchAllChildren = function(customerId, cb){
        
      var result = [];
      var result1 = [];
      var level;
      var rnumber;
      var joiningFees = 0.0;    
      Customers.find({          
              where: {"customerId": customerId}          
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log(data.length);
              if(data.length !== 0){
                  
                   var x;
                    fetch_children(customerId,resultCallback);
                    
                     function resultCallback(result){
                              console.log("Result"+result);
                              console.log("L"+result.length);
                              console.log("Inside level function");
                              if(result === "NONE"){
                                  console.log("Done");
                                
                                  
                              }else{
                              for(var i=0; i<result.length; i++){
                                      var x = result[i];
                                      console.log("X"+x);
                                                   
                                      fetch_children(x, resultCallback); 
                                  }
                                /*res.status(res.statusCode).send({
                                "Result": result
                                });*/
                              }
                     }//result_callback function
                  
                  
                  function fetch_children(customerId,callback){ 
          
          console.log("Inside function");
          console.log("C"+customerId);
          Customers.find({where: {"referralId": customerId}},function(err, doc1){
              if(err){
                  console.log("Error"+err);
              }else{
                  console.log("Inside info stuff");
                  console.log("L"+doc1.length);
                  if(doc1.length !== 0){
                      console.log("Info");
                      doc1.forEach(function(doc2){
                          console.log(91);
                          result.push(doc2);
                          result1.push(doc2.customerId);
                          console.log(result.length);
                          if(doc1.length === result.length){
                              console.log("Result"+JSON.stringify(result));
                              console.log("R1"+JSON.stringify(result1));
                               callback(result1);                                                          
                          }                   
                          
                      });  
                             
                       
                  }else{
                      console.log("No ref");
                      console.log("R"+ JSON.stringify(result));
                      //callback("NONE");
                      cb(null, result);
                  }
                 
                 // callback(result1);
              }
          });
      }//end function                                                                       
     
                  
                  
              }else{
                  console.log("No customer with Id");
                  var r = "No customer with Id";
                  cb(null, r);                    
              }              
          }
      }); 
    };   
    Customers.remoteMethod("fetchAllChildren",{
        accepts: {
            arg: "customerId",
            type: "number"
        },
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/fetchAllChildren",
            verb: "post"
        }
    });
    
    
   //fetchAllCustomersWithReferralCount
    
    Customers.fetchAllCustomersWithReferralCount = function(cb){
        var result = [];
      Customers.find({
         
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("Availabe Customers");
              console.log(data.length);
              if(data.length !== 0){
                  
                  data.forEach(function(doc1){
                                Customers.find({"referralId":doc1.customerId}, function(err, doc2){
                                        if(err){
                                                 console.log("Error"+err);
                                                }else{
                                                    console.log("RL"+doc2.length);
                                                    result.push({"customer_info":doc1, "referal_count":doc2.length});
                                                    console.log("R1"+result.length);
                                                    if(data.length === result.length){
                                                        console.log("hello");
                                                        console.log("Result"+result);
                                                        cb(null, result);
                                                    }
                                                }
                                });
                               });
                  
              }else{
                  console.log("No customer with Id");
                  var r = "No customer with Id";
                  cb(null, r);                   
              }
             
          }
      }); 
    };   
    Customers.remoteMethod("fetchAllCustomersWithReferralCount",{
        
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/fetchAllCustomersWithReferralCount",
            verb: "post"
        }
    });
    
    
    
   //addAmbassador
    
    
    Customers.addAmbassador = function(name, email, password, contactNumber, isAmbassador, referralId, cb){
     var joiningDate = new Date();
        var payback = 0.0;
        var joiningFees = 100.0;
        var level;
        var rnumber;
        console.log("Date" + joiningDate); 
      Customers.count({}, function(err, count){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("Count"+count);
              console.log("referralId"+referralId);
              if(referralId === undefined){
                  console.log("rId");
                  referralId = 0;
                  level = 0;
                  Customers.create({"customerId": count+1001,
                        "name": name,
                        "email": email,
                        "password": password,
                        "contactNumber": contactNumber,
                        "level": level,            
                        "isAmbassador": isAmbassador,
                        "referralId": referralId,
                        "payback": payback,                
                        "joiningDate": joiningDate,
                        "lastUpdated": joiningDate
      }, function(err, data){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("Ambassador is added successfully");
              console.log(data);
              cb(null, data);
          }
      }); 
    }else{  
        
      Customers.find({
          where:{
          "customerId": referralId
      }}, function(err, data){
          if(err){
              console.log("Error"+err);
          }else{   
              console.log(data);
              level = data[0].level;
              console.log(data[0].level);
      Customers.create({"customerId": count+1001,
                        "name": name,
                        "email": email,
                        "password": password,
                        "contactNumber": contactNumber,
                        "level":level+1,
                        "isAmbassador": isAmbassador,
                        "referralId": referralId,
                        "payback": payback,
                        "joiningDate": joiningDate,
                        "lastUpdated": joiningDate
      }, function(err, data1){
          if(err){
              console.log("Error"+err);
          }else{
              console.log("New Customer is added with referralId");
              console.log(data1);
              var x;
              ref_status(referralId, resultCallback);
              
              function resultCallback(result){
                    console.log("Result"+result);
                    x= result;
                    console.log("X"+x);
                    if(x === "NONE")
                        {
                            console.log("Parent upated successfully");
                            cb(null, data1);
                        }else{
                            console.log("inside function else");
                            console.log("input"+x);
                            ref_status(x, resultCallback);                                                            
                            }
                        } 
              
              function ref_status(referralId,callback){  
          console.log("Inside function");
          Customers.updateAll({"customerId": referralId},                                                        
                    {"lastUpdated": joiningDate}
                   ,function(err, doc2){
                        if(err){
                             console.log("Error"+err);
                        }else{ 
                            console.log("38");
                             Customers.updateAll({"customerId": referralId},                                                           
                                      {$inc: {"payback": 0.4*joiningFees}},
                                             function(err, doc3){ 
                                                    if(err){console.log("Error"+err);}else{
                                                            console.log("Payback updated");                                                                                    
                                                            Customers.find({where:{"customerId":referralId}},function(err,doc6){
                                                                if(err){ console.log("Error"+err);}
                                                                        else{
                                                                            console.log("Doc"+doc6[0].referralId);
                                                                                            if(doc6[0].referralId === 0)
                                                                                                callback("NONE");
                                                                                            else{
                                                                                            rnumber = doc6[0].referralId; 
                                                                                            console.log("R"+rnumber);                                                                                            
                                                                                            callback(rnumber);
                                                                                            }                                                                                                
                                                                                        }
                                                                                    });
                                                                           
                                                                            }
                                                                        });
                                                                }  
                                                    });
                                               }//function end
          }
      });
          }
      });
    }
              
          }
      });
                                                  
                      
    };   
    Customers.remoteMethod("addAmbassador",{
         accepts: [{
            arg: "name",
            type: "string"            
        },{
            arg: "email",
            type: "string"
        },{
            arg: "password",
            type: "string"                    
        },{
            arg: "contactNumber",
            type: "number"
        },{
            arg: "isAmbassador",
            type: "boolean"
        },{
            arg: "referralId",
            type: "number" 
        }],       
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/addAmbassador",
            verb: "post"
        }
    });
    
    
    

   //convertCustomerToAmbassador
   Customers.convertCustomerToAmbassador = function(customerId, isAmbassador, cb){
      Customers.updateAll({"customerId": customerId},{
         "isAmbassador": isAmbassador
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("Availabe Customers");
              console.log(data);
              cb(null, data);
          }
      }); 
    };   
    Customers.remoteMethod("convertCustomerToAmbassador",{
        accepts: [{
            arg: "customerId",
            type: "number"
        },{
            arg: "isAmbassador",
            type: "boolean" 
        }],
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/convertCustomerToAmbassador",
            verb: "post"
        }
    });
    
    //fetchAllAmbassadorChildren
    
    Customers.fetchAllAmbassadorChildren = function(customerId, isAmbassador, cb){
        var result = [];
        var result1 = [];
      Customers.find({
          where : {
              "customerId" : customerId,
              "isAmbassador" : isAmbassador              
          }
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("Availabe Customers");
              console.log(data.length);
              if(data.length !== 0){
                  data.forEach(function(doc1){
                                    console.log("Cid"+doc1.customerId);           
                   
                                var x;
                                fetch_children(doc1.customerId,resultCallback1);
                      
                                function resultCallback1(result){
                              console.log("Result"+result);
                              console.log("L"+result.length);
                              console.log("Inside level function");
                              if(result === "NONE"){
                                  console.log("Done");
                                  
                                var r = "No children found";
                                  cb(null, r);                              
                                  
                              }else{
                              for(var i=0; i<result.length; i++){
                                      var x = result[i];
                                      console.log("X"+x);
                                                   
                                      fetch_children(x, resultCallback1); 
                                  }
                                  /* res.status(res.statusCode).send({
                                "Result": result
                                });*/
                              }
                     }//result_callback function
                      
                      function fetch_children(customerId,callback){ 
          
          console.log("Inside function");
          console.log("C"+customerId);
          Customers.find({where: {"referralId": customerId}} ,
                                function(err, doc1){
              if(err){
                  console.log("Error"+err);
              }else{
                  console.log("Inside info stuff");
                  console.log("L"+doc1.length);
                  if(doc1.length !== 0){
                      console.log("Info");
                      doc1.forEach(function(doc2){
                          console.log(91);
                          result.push(doc2);
                          result1.push(doc2.customerId);
                          console.log(result.length);
                          if(doc1.length === result.length){
                              console.log("Result"+JSON.stringify(result));
                              console.log("R1"+JSON.stringify(result1));
                               callback(result1);                             
                             
                          }                        
                          
                      });  
                             
                       
                  }else{
                      console.log("No ref");
                      console.log("Result"+ result);
                      callback("NONE");
                  }
                 
                 // callback(result1);
              }
          });
      }//end function  
                  });
                      
                      
                  
              }else{
                  console.log("No customer with Id");
                  var r = "No customer with Id";
                  cb(null, r);
              }
             
          }
      }); 
    };   
    Customers.remoteMethod("fetchAllAmbassadorChildren",{
        accepts:[ {
            arg: "customerId",
            type: "number"
        },{ arg: "isAmbassador",
            type: "boolean"}],
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/fetchAllAmbassadorChildren",
            verb: "post"
        }
    });
    
    
    
    //fetchChildrenAtNthLEvel
    
    Customers.fetchChildrenAtNthLEvel = function(customerId, level, cb){
        
     var newLevel; 
     var result = [];    
      Customers.find({ 
          where: {
              customerId: customerId  
          }
      }, function(err, data){
          if(err){
              cosnole.log("Error"+err);
          }else{
              console.log("Count"+ data.length);
                  
              if(data.length !== 0){
                  newLevel = data[0].level + level;
                  console.log("nL"+ newLevel);
                  var x;
                  level_child(customerId, resultCallback);
                  
                   function resultCallback(result){
                                console.log("R"+result);
                                console.log(typeof(result));
                                if(typeof(result)=== "object")
                                    {
                                       cb(null, result);
                                    }
                                else{
                                    level_child(result, resultCallback);
                                }                              
                                
                            }//function end
                  
                  
                   function level_child(customerId, callback){
                               console.log("486");
                                Customers.find({
                                    where: {"referralId":customerId}}, function(err, doc1){
                                    if(err){
                                        console.log("Error"+err);
                                    }else{
                                        console.log("L"+doc1.length);
                                        doc1.forEach(function(doc2){
                                            console.log("495");
                                            console.log("Level"+doc2.level);
                                            console.log("nL"+newLevel);
                                            if(doc2.level === newLevel){
                                                console.log("498");
                                                result.push(doc2);
                                                if(doc1.length === result.length){
                                                  callback(result);
                                                }
                                            }else{
                                                callback(doc2.customerId);
                                            }
                                            
                                        });                                      
                                        
                                    }
                                    
                                });
                            }//function end 
                  
                  
                  
                  
                  
                  
              }else{
                  console.log("No customer with Id");
                  var r = "No customer with Id";
                  cb(null, r);                  
              }             
         }
      }); 
    };   
    Customers.remoteMethod("fetchChildrenAtNthLEvel",{
        accepts: [{
            arg: "customerId",
            type: "number"
        },{
            arg: "level",
            type: "number" 
        }],
        returns:{
            arg: "customer",
            type: "object"
        },
        http:{
            path: "/fetchChildrenAtNthLEvel",
            verb: "post"
        }
    });
    

};
