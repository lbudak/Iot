<?php

interface DBInterface
{
    public function Connect();          
    public function Create($query);     
    public function Read($query);       
    public function Update($query);
    public function Delete($id);
    public function CloseConnection();
}