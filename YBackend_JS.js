



/////////////////////////Custom Function////////////////////////////
	
var processmaker_error_element = '<div class="pmdynaform-message-error">'+
'<div class="alert alert-danger" role="alert">'+
    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'+
    '<span class="sr-only">Error:</span>'+
        '<span>The password and the confirm password must match</span>'+
    '</div>'+
'</div>';
function password_error(the_element){
      $(the_element).parent().addClass("has-error");
    $(the_element).parent().addClass("has-feedback");
    $(the_element).find("input").eq(1).after(processmaker_error_element);
}
function remove_password_error(the_element){
      $(the_element).parent().removeClass("has-error");
    $(the_element).parent().removeClass("has-feedback");
    $(the_element).find(".pmdynaform-message-error").remove();
}
function add_error(the_element,error_element){
      $(the_element).parent().addClass("has-error");
    $(the_element).parent().addClass("has-feedback");
    $(the_element).find(".pmdynaform-field-control").children().eq(1).after(error_element);
      return true;
}
function remove_error(the_element,remove_feedback=false){
  
      if(!remove_feedback){
        $(the_element).parent().removeClass("has-error");
          $(the_element).parent().removeClass("has-feedback");
    }

    $(the_element).find(".joeven-error").remove();
      return true;
}
function modify_error_message(error_message="Minimum length must be 5"){
      var processmaker_error_elements = 	'<div class="pmdynaform-message-error joeven-error">'+
                                                '<div class="alert alert-danger" role="alert">'+
                                                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'+
                                                    '<span class="sr-only">Error:</span>'+
                                                    '<span>'+error_message+'</span>'+
                                                '</div>'+
                                            '</div>';
      return processmaker_error_elements;
}
function handle_error(this_element,error_element,the_condition=true,remove_feedback=false){
      
      if(!this_element.find(".joeven-error").length){

        if(the_condition){
            remove_error(this_element,remove_feedback);
        }else{
            add_error(this_element,error_element);
        }
        
    }else{
          if(the_condition){
            remove_error(this_element,remove_feedback);
        }
    }
}
function enable_field(the_element){
      $(the_element).find(".pmdynaform-field-control").children().eq(0).removeAttr("disabled");
      return true;
}
function disable_field(the_element){
      
    $(the_element).find(".pmdynaform-field-control").children().eq(0).attr("disabled","");
      return true;
}

//Start Processmaker Functions//////////////////////////////////////////////////////////////////////////////////////

(function( $ ){
     
      $.fn.addRegex = function(data={regex:["*"]}){
      
        var this_element = this;
          var the_field = this.find("input").eq(0);
          var the_error = modify_error_message("The text must not contain the following characters "+data.regex.join());
                       
          $(the_field).blur(function(){
              var checker_default = 1;
              $.each(data.regex,function(index,value){
                  //exist
                  if(this_element.getValue().indexOf(value)>-1){
                    checker_default = checker_default*0;
                }else{
                    checker_default = checker_default*1;
                }
            });
              
              if(checker_default==0){
                  handle_error(this_element,the_error,false);
            }else{
                handle_error(this_element,the_error,true);
            }
          });
          
          
          return this;
        
       };
  
      $.fn.agencyPicker = function(options={
                                      name:{id:"#agency_name",provide_value:false},
                                    abbreviation:{id:"#agency_abbreviation",provide_value:true},
                                    classification:{id:"#agency_classification",provide_value:true},
                                      location:{id:"#agency_address",provide_value:true},data:{}}
                                 ){
        var settings = $.extend({
            name:{id:"#agency_name",provide_value:false},
            abbreviation:{id:"#agency_abbreviation",provide_value:true},
            classification:{id:"#agency_classification",provide_value:true},
               location:{id:"#agency_address",provide_value:true},
        }, options );
          
        var this_element = this;
          var the_field = this.find("input").eq(0);
          
          
        if(the_field.length){
              $(this).setOnchange(function(new_value, old_value){
                  //console.log("agency picker");
                   setProject("middleware");
                  setRun("get_agency_data");
                  var data_to_send = {new_value: new_value}
                 
                  var retrieved_data = run(data_to_send);
                  if(retrieved_data){
                      
                      retrieved_data = JSON.parse(retrieved_data);
                    remove_error(this_element);
                  
                      for (var key in settings) {
                        // skip loop if the property is from prototype
                        if (!settings.hasOwnProperty(key)) continue;

                        var obj = settings[key];
                        for (var prop in obj) {
                            // skip loop if the property is from prototype
                            if(!obj.hasOwnProperty(prop)) continue;
                            
                               
                        }
                          if(obj.provide_value){
                              if(retrieved_data[key]!="null"){
                                  $(obj.id).setValue(retrieved_data[key]);
                                  //disable_field($(obj.id));
                                  remove_error($(obj.id));
                            }else{
                                enable_field($(obj.id));
                                  $(obj.id).setValue("");
                            }
                          }
                    }
                      
                }else{
                      
                  
                      for (var key in settings) {
                        // skip loop if the property is from prototype
                        if (!settings.hasOwnProperty(key)) continue;

                        var obj = settings[key];
                        $(obj.id).setValue("");
                        enable_field($(obj.id));
                    }
                }
                  
                  
            });
        }else{
              console.error("Joeven: "+this.selector+" does not exist! Check the ID onegaishimasu");
        }
          
        return this;
       };

    $.fn.pmPassword = function(d_confirm_password="#confirm_password") {
          var this_element = this;
        if($(this).hasClass("pmdynaform-view-label")){
            //$(this).find("input").eq(0).hide();
              $(this).find("span").eq(1).text("****");
        }else{
              $(this).setOnchange(function(newVal, oldVal){
                var password = newVal;
                  var confirm_password = $(d_confirm_password).getValue();
                  
                  if(password){
                    if(password==confirm_password){
                          remove_password_error(this_element);
                          remove_password_error($(d_confirm_password));
                    }else{
                      
                          if(confirm_password){
                              remove_password_error(this_element);
                            password_error(this_element);
                        }else{
                            remove_password_error(this_element);
                        }
                          
                    }
                }else{
                    
                }
                  
            });
            $(this).find("input").eq(0).attr("type","password");
        }
          
        return this;
       };
  
      $.fn.pmConfirmPassword = function(d_password="#password") {
          var this_element = this;
        if($(this).hasClass("pmdynaform-view-label")){
            //$(this).find("input").eq(0).hide();
              $(this).find("span").eq(1).text("****");
        }else{
            $(this).setOnchange(function(newVal, oldVal){
                var password = $(d_password).getValue();
                  var confirm_password = newVal;
                  
                  if(password){
                    if(password==confirm_password){
                          remove_password_error(this_element);
                          remove_password_error($(d_password));
                    }else{
                      
                          if(confirm_password){
                              remove_password_error(this_element);
                            password_error(this_element);
                        }else{
                            remove_password_error(this_element);
                        }
                          
                    }
                }else{
                    
                }
                  
            });
              
            $(this).find("input").eq(0).attr("type","password");
        }
      
        return this;
       };
      
      $.fn.pmApprove = function(remark = "#remarks",vtrue = "1",vfalse = "0") {
          var this_element = this;
          $(remark).disableValidation();
          $(this).setOnchange(function(newVal, oldVal){
              if(newVal==vtrue){
                $(remark).disableValidation();
            }else if(newVal==vfalse){
                $(remark).enableValidation();
            }else{
                  console.error("Joeven:Your true or false may not be 1 or 0, Please check your key value on "+remark+". Change the key value to 1 or 0 or define the value on the function.");
            }
                  
        });
        return this;
       };
  
      $.fn.pmCheckgroupWithGrid = function(checkbox="1",grid="#checkbox_grid",value="Others") {
          var this_element = this;
          var this_grid = $(grid);
          this_grid.hide();
      
          if(this_element.hasClass("pmdynaform-view-label")){
              
              if(this_element.find(".pmdynaform-label-options").eq(0).find("input[value='"+checkbox+"']").length){
                this_grid.show();
            }else{
                this_grid.hide();
            }
                
        }else{
                  
                //initial_check
                    var initial_checked = $(this_element).find(".pmdynaform-control-checkgroup:checked");
                    var initial_current_checked = [];
                    $.each(initial_checked,function(key,value){

                        initial_current_checked.push($(value).val());
                    });

                    if($.inArray(checkbox,initial_current_checked)>=0){
                        this_grid.show();
                        this_grid.enableValidation();
                    }else{
                        this_grid.hide();
                          $("#rf_request_details_options").clearGrid();
                        this_grid.disableValidation();
                    }
                //initial_check
                $(this_element).find(".pmdynaform-control-checkgroup").click(function(){
                    if($(this).val()==checkbox){
                        //$(this_element).find(".pmdynaform-control-checkgroup:checked").length;
                        var checked = $(this_element).find(".pmdynaform-control-checkgroup:checked");
                        var current_checked = [];
                        $.each(checked,function(key,value){
                            //console.log($(value).val());
                            current_checked.push($(value).val());
                        });

                        if($.inArray(checkbox,current_checked)>=0){
                            this_grid.show();
                              
                            this_grid.enableValidation();
                        }else{
                            this_grid.hide();
                            if(this_grid.getNumberRows()<=0){
                                this_grid.addRow();
                            }
                              $("#rf_request_details_options").clearGrid();
                            this_grid.disableValidation();
                        }


                    }
                });
        }

        return this;
       };
  
      $.fn.pmField1 = function() {
          var this_element = this;
          //`&()-./
          this.find("input").eq(0).attr("pattern",'^[a-zA-Z 0-9\`\&\(\)\.\/\-]*$');
          this.find("input").eq(0).attr("oninvalid","setCustomValidity('Only alpha numeric and \\'\\`\\&\\(\\)\\-\\.\\/\\' characters are accepted')");
          
        return this;
       };
  
      $.fn.minMax = function(min = 5,max = 255) {
          var this_element = this;
          var this_field = this.find(".pmdynaform-field-control").children().eq(0);

          this_field.blur(function(){
              var current_value = this_field.val();
              var the_error = modify_error_message("The minimum length must be "+min);
              if(!current_value){
                handle_error(this_element,the_error,true,true);
            }else if(current_value.length<min&&min==0){
                  handle_error(this_element,the_error,true);
            }else if(current_value.length<min&&min!=0){
                handle_error(this_element,the_error,true);
                  the_error = modify_error_message("The minimum length must be "+min);
                handle_error(this_element,the_error,false);
            }else if(current_value.length>max&&max==0){
                  handle_error(this_element,the_error,true);
            }else if(current_value.length>max&&max!=0){
                handle_error(this_element,the_error,true);
                the_error = modify_error_message("The maximum length must be "+max);
                handle_error(this_element,the_error,false);
            }else if(current_value.length<=max&&current_value.length>=min){
                  handle_error(this_element,the_error,true);
            }
        });
          
        return this;
       };
  
      $.fn.disableSpace = function() {
          var this_element = this;
          var this_field = this.find("input").eq(0);
        
          this_field.keydown(function(e){
              var current_value = this_field.val();
              if (e.keyCode == 32) return false;
              
        });
          
       };
  
      $.fn.clearGrid = function() {
       var nRow = $(this).getNumberRows();
       for (; nRow >= 1; nRow--) {
          //Can't delete the first row, so clear all its fields
          if (nRow == 1) {
             var aCols = $(this).getInfo().columns;
             for (nField in aCols) {
                var val = '';
                if (aCols[nField].type == 'checkbox') {
                   val = "0";
                }
                //workaround to clear date fields. See: https://processmaker.atlassian.net/browse/TRI-1280
                if (aCols[nField].type == 'datetime') {
                   var gridFieldId = 'form[' + gridName + '][1][' + aCols[nField].id;
                   $("[id='"+gridFieldId+"]']").val('');
                   $("[id='"+gridFieldId+"_label]']").val('');
                }
                else if (aCols[nField].type != 'link') {
                   $(this).setValue(val, 1, parseInt(nField)+1);
                }

             }
          }
          else {
             $(this).deleteRow(nRow);
          }      
       }
    }
    
    
      
            
})( jQuery );

//End Processmaker Functions//////////////////////////////////////////////////////////////////////////////////////

var request_key = new Date().getTime();
$("#request_key").setValue(request_key);

/////////////////////////Custom Function////////////////////////////

/////////////////////////General CSS////////////////////////////
    $(".pmdynaform-view-form").find(".pmdynaform-field-required").hide();
    $("form").css("border","0px");
    $( "div[role='form']" ).css("border","0px solid black");
    $(".pmdynaform-field-title").css("background-color","#333");
      $(".pmdynaform-field-title").find("span").css({"color":"white","font-size":"120%"});
      $(".pmdynaform-field-title").css({"border-radius": "5px","margin-bottom":"1%"});
      $(".pmdynaform-field-subtitle").css("background-color","#f1f1f1");
      $(".pmdynaform-field-subtitle").find("span").css("font-size","18px");
      $(".pmdynaform-field-subtitle").find("span").css("font-weight","bold");
    $(".pmdynaform-file-control").css("border","0px");
      $(".pmdynaform-file-control").children().eq(0).attr("class","pmdynaform-file-container");
      $(".pmdynaform-file-control").children().eq(0).css("text-align","left");
      $( "button[type='submit']" ).addClass("btn btn-primary");
      $("#dyn_forward").parent().hide(); 
    $(".pmdynaform-field-file").find("a").css("text-align","left");
    
    $('.control-label').on('click', function(event) {
      event.preventDefault();
    });

/////////////////////////General CSS////////////////////////////
$("#eventTitle").minMax();
$("#eventTitle").addRegex("@");


