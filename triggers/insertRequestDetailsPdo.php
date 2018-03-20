<?php

$host = "192.168.3.41";
$user = "jojosam";
$pass = "da5rUh_F";
$dbName = "em_db";

try{
    $db = new PDO("mysql:host=$host;dbname=$dbName",$user,$pass);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo $e->getMessage();
}

$eventCode = @@eventCode;


$queryRequest = "INSERT INTO `em_db`.`request` (`requestID`, `eventCode`) VALUES (NULL, ':eventCode');";

$stmt = $db->prepare($queryRequest);
$stmt->bindParam(':eventCode',$eventCode);
$stmt->execute();

?>