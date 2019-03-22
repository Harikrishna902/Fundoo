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
    
    /**
     * @method to addnotes
     * @param email,title,desc
     *@return void
     *@desc Function to send email to server
     */
    public function addNotes($email,$title,$description,$reminder){

        // $flag = 0;        
        // if(empty($title)||empty($desc)){
        //     $flag = 1;
        // }
        // if($flag == 0){
        //     $redis = new RedisConn();
        //     $connection = $redis->connection();
        //     $response = $client->get('token');
        // }

        $query = "INSERT into notes (title,description,email,reminder) values ('$title','$description','$email','$reminder')";
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

    /**
     * @method to displaynotes
     * @param email
     */
    public function dispalynotes($email){
        $query = "SELECT * from notes Where email ='$email' ORDER BY id DESC ";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach($arr as $notes){
            $title = $notes['title'];
            $description = $notes['description'];
        }
        print json_encode($arr);
    }
}
