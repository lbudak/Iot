<?php

require 'database.php';
$db = new Database("db" , "ferit", "user", "test");
$db->Connect();

$myquery = "SELECT * FROM pepper_iot ORDER BY id DESC LIMIT 10"; 
$query = $db->Read($myquery);

$data = array();

for ($x = 0; $x < mysqli_num_rows($query); $x++) {
    $data[] = mysqli_fetch_assoc($query);
}
echo json_encode($data);     

$db->CloseConnection();
?>