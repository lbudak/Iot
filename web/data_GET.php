<!DOCTYPE html>
<html lang="en">
<body>
<?php
require 'database.php';

$moist = $_GET["moist"];
$tempC = $_GET["tempC"];
$intenz = $_GET["intenz"];


$db = new Database("db" , "ferit", "user", "test");
$db->Connect();

$query = "INSERT INTO pepper_iot (moist, tempC, intenz) VALUES ('". $moist ."', '". $tempC ."', '". $intenz ."')";
$db->Update($query);
 
$db->CloseConnection();
?>
</body>
</html>
