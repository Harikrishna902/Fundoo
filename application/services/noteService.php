<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
defined('BASEPATH') or exit('No direct script access allowed');
include 'JWT.php';
class NoteService extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        
    }
    public function addNotes($email,$title,$desc){
        $query = "INSERT into notes (title,description,email) values ('$title','$description','$email')";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);
            return "204";
        }
    }
    public function dispalynotes($email){
        $query = "SELECT * from notes Where email ='$email' ORDER BY id DESC ";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $$statement->fetchAll(PDO::FETCH_ASSOC);
        foreach($arr as $notes){
            $title = $notes['title'];
            $description = $notes['description'];
        }
        print json_encode($arr);
    }
}