<!DOCTYPE html>
<html lang="en">
<body>
<?php
require 'database.php';

$moist = $_POST["moist"];
$tempC = $_POST["tempC"];
$intenz = $_POST["intenz"];


$db = new Database("db" , "ferit", "user", "test");
$db->Connect();

$query = "INSERT INTO pepper_iot (moist, tempC, intenz, time) VALUES ('". $moist ."', '". $tempC ."', '". $intenz ."', sysdate())";
$db->Update($query);
 
$db->CloseConnection();

echo "ajmooo"
?>
</body>
</html>
