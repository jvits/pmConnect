$(document).ready(function(){
    alert($("#eventCode").getValue());

$("#memoEventCode").setValue("Event Code: "+$("#eventCode").getText());

$("#eventCode").setOnchange(function(){
    $("#memoEventCode").setValue("Event Code: "+$("#eventCode").getText());
});


$("#eventTitle").setOnchange(function(){
    $("#memoWhat").setValue("What: "+$("#eventTitle").getText()+" "+$("#description").getText());
});

$("#description").setOnchange(function(){
    $("#memoWhat").setValue("What: "+$("#eventTitle").getText()+": "+$("#description").getText());
});

alert('sample');

});
