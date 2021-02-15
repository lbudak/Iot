<?php

/* Require the database abstract and interface file */
require 'interface.php';

class Database implements DBInterface
{
    private $host;
    private $db;
    private $username;
    private $password;
    public $connectionString;
    
    public function __construct($host, $db, $username, $password) { 
        
        $this->host     = $host;
        $this->db       = $db;
        $this->username = $username;
        $this->password = $password;
    } 
    
    public function Connect() {
        /* Make Connection String */
        $this->connectionString = new mysqli($this->host, $this->username, $this->password, $this->db);
    }
    
    public function Create($query) {
        /* Execute Query to create data*/
        $this->connectionString->query($query);
    }
    
    public function Read($query) {
        /* Execute $query to read data*/
        $results = $this->connectionString->query($query);
        return $results;
    }
  
    public function Update($query) {
        /* Execute query to update data */
        $this->connectionString->query($query);
    }
    
    public function Delete($id) {
        /* Delete Query */
        $query = "DELETE FROM pepper_iot WHERE id=" . $id;
        /* Execute query to delete data */
        $this->connectionString->query($query);
       
    }
    
    public function CloseConnection() {
        /* Close the mysqli connection */
        mysqli_close($this->connectionString);
    }
} 