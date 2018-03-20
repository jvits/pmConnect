<?php
$db = "1734546835aa7329a4f44c8008622192";

$eventCode = @@eventCode;
$eventTitle = @@eventTitle;
$description = @@description;
$withinOrOutsideMetromanila = @@bolMetromanila_label;
$proposedLocation = @@proposedLocation;
$dateStart = @@dateStart_label;
$dateEnd = @@dateEnd_label;
$startTime = @@startTime_label;
$endTime = @@endTime_label;
$eNoP = @@eNoP;
$estimatedBudget = @@estimatedBudget;
$eventCodeID = @@uniqueEventCode;

$logistic = json_decode(@@logistic_label);

$withinOrOutsideMetromanila = mysql_real_escape_string($withinOrOutsideMetromanila);
$dateStart = mysql_real_escape_string($dateStart);
$dateEnd = mysql_real_escape_string($dateEnd);
$startTime = mysql_real_escape_string($startTime);
$endTime = mysql_real_escape_string($endTime);


//INSERTING REQUEST FORM DETAILS
$queryRequest = "INSERT INTO `em_db`.`request` (`requestID`,`eventCodeID`, `eventCode`, `requestTitle`, `requestDescription`, `withinOrOutsideMetroManila`, `proposedLocation`, `dateStart`, `dateEnd`, `startTime`, `endTime`,`estimatedNoOfParticipants`,`estimatedBudget`) VALUES (NULL,'$eventCodeID', '$eventCode', '$eventTitle', '$description','$withinOrOutsideMetromanila', '$proposedLocation', '$dateStart', '$dateEnd', '$startTime', '$endTime','$eNoP','$estimatedBudget');";
$insertRequest = executeQuery($queryRequest,$db);

//GETTING LAST INSERTED ID
$lastIdQuery = executeQuery("SELECT MAX(requestID) rID FROM request",$db);
$lastId = ($lastIdQuery[1]['rID']);

//INSERTING LOGISTIC ARRAY TO LOGISTIC ARRAY
for($i = 0; $i < count($logistic); $i++){
    $logisticItem = json_encode($logistic[$i]);
    $queryLogistic = "INSERT INTO `em_db`.`logistic`(`requestID`,`logisticOption`) VALUES('$lastId',$logisticItem)";
    executeQuery($queryLogistic,$db);
}
?>