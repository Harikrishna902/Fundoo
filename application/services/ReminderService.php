<?php
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');
include 'JWT.php';
use \Firebase\JWT\JWT;

class ReminderService extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

    }

    
    public function reminderNotesFetch($id){
        $query = "SELECT * from notes Where email='$email' AND reminder <> '' ";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($arr);
    }


}