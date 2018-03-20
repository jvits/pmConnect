<?php
$date = DateTime::createFromFormat('U.u', microtime(TRUE));

$curFracSecond = $date->format('u');
$curDate = date("ymdhms").$date->format('u');
echo "EVENT".$curDate;




?>