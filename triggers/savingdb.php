<?php

$db = "5660150455a7d0a89a440e1020910370";

$dateEncoded = date("Y-m-d H:i:s");

$agencyName = @@coverPage_text_agencyName;
$mandate = @@mandate;
$ra_no = @@ra_no;
$startYear = @@startYearValue;
$endYear = @@endYearValue;
$encoderName = @@encoderName;

$agencyName = mysql_real_escape_string($agencyName);
$mandate = mysql_real_escape_string($mandate);
$ra_no = mysql_real_escape_string($ra_no);
$startYear = mysql_real_escape_string($startYear);
$endYear = mysql_real_escape_string($endYear);
$agency_id = date("y-mdhis");

$query_agencyDetails = "INSERT INTO agency_details (
      agency_id,
      agency_name, 
      mandate, 
      ra_no,
      start_year, 
      end_year) 
      VALUES (
      '$agency_id',
      '$agencyName',
      '$mandate',
      '$ra_no',
      '$startYear',
      '$endYear'
    )";

executeQuery($query_agencyDetails, $db);


$query_encoderDetails = "INSERT INTO encoder_details (
      encoder_name,
      agency_id, 
      date_encoded) 
      VALUES (
      '$encoderName',
      '$agency_id',
      '$dateEncoded'
      )";

executeQuery($query_encoderDetails, $db);

function savePLDB_details($is_code,$is_id,$agency_id,$name,$envi,$type,$db1){
  $query_PLDB_details = "INSERT INTO ".$type."_details (
    ".$type."_name,
    ".$type."_envi,
    is_code,
    is_id,
    agency_id)
    VALUES (
    '$name',
    '$envi',
    '$is_code',
    '$is_id',
    '$agency_id'
  )";

  executeQuery($query_PLDB_details, $db1);


}


function saveISDetails($isType, $isTypeDetails, $is, $agency_id, $db1){
  $index = 1;
  foreach ($isType as $row_PFIS){
    $is_code = $is;
    $is_name = mysql_real_escape_string($row_PFIS['txt_'.$is]);
    $is_desc  = mysql_real_escape_string($row_PFIS['txt_'.$is.'_description']);
    $is_existing  = mysql_real_escape_string($row_PFIS['txt_'.$is.'_existing']);
    $is_id = $agency_id.$index;

    $query_PFIS = "INSERT INTO is_details (
          is_code,
          is_id,
          is_name, 
          is_description, 
          is_existing, 
          agency_id) 
          VALUES (
          '$is_code',
          '$is_id',
          '$is_name',
          '$is_desc',
          '$is_existing',
          '$agency_id'
        )";
    
    executeQuery($query_PFIS, $db1);

    $pl_details = $isTypeDetails[$index]['txt_'.$is.'_PL_details'];
    $db_details = $isTypeDetails[$index]['txt_'.$is.'_DB_details'];

    if($pl_details != "0" || $db_details != "0"){

      $pl_array = json_decode( $pl_details, true );
      $db_array = json_decode( $db_details, true );

      foreach ($pl_array as $key => $pl_details) { 
        $pl_name = $pl_details[0];
        $pl_envi = $pl_details[1];
        savePLDB_details($is,$is_id,$agency_id,$pl_name,$pl_envi,'pl',$db1);
      }
      foreach ($db_array as $key => $db_details) { 
        $db_name = $db_details[0];
        $db_envi = $db_details[1];
        savePLDB_details($is,$is_id,$agency_id,$db_name,$db_envi,'db',$db1);
      }  

    } else{
      savePLDB_details($is,$is_id,$agency_id,null,null,'pl',$db1);
      savePLDB_details($is,$is_id,$agency_id,null,null,'db',$db1);
    }
    

    $index++;

  }

}



saveISDetails(@=grid_PFIS,@=grid_PFIS_details,"PFIS", $agency_id,$db);
saveISDetails(@=grid_OVIS,@=grid_OVIS_details,"OVIS", $agency_id,$db);
saveISDetails(@=grid_IEIS,@=grid_IEIS_details,"IEIS", $agency_id,$db);

?>