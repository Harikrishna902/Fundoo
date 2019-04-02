<?php
//header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
//include '/var/www/html/codeigniter/application/services/Redish.php';

defined('BASEPATH') or exit('No direct script access allowed');
include 'JWT.php';
use \Firebase\JWT\JWT;

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
     */
    public function addNotes($title, $email, $description, $reminder)
    { 
        $reference = new JWT();
        $flag = 0;
        if (empty($title) || empty($description)) {
            $flag = 1;

        }
        if ($flag == 0) {
            $headers = apache_request_headers();
            $token = $headers['Authorization'];
            $redis = new Redis();
            $checktoken = JWT::verifytoken($token);
            if ($checktoken) {
                $connection = $redis->connection();
                $response = $connection->get('token');

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
        }
    }

    /**
     * @method to displaynotes
     * @param email
     */
    public function dispalynotes($email)
    {
        $query = "SELECT * from notes Where email ='$email' ORDER BY id DESC ";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $notes) {
            $title = $notes['title'];
            $description = $notes['description'];
        }
        print json_encode($arr);
    }

    /**
     * function to deletenotes
     * @param id
     */
    public function deleteNotes($id){
     $query ="DELETE from notes where id='$id'";
     $statement=$this->db->conn_id->prepare($query);
     $res=$statement->execute();
     if ($res) 
            {
                $data = array(
                    "message" => "200",
                );
                print json_encode($data);
                return "200";
            } 
            else 
            {
                $data = array(
                    "message" => "204",
                );
                print json_encode($data);
                return "204";

            }
    }


       
    /**
     * function to change color
     * @param id,colour
     * @return void
     */
    public function changeColor($id,$colour){
        $query="UPDATE  notes SET colour = '$colour' WHERE id ='$id'";
        $statement=$this->db->conn_id->prepare($query);
        $res=$statement->execute();
        if($res)
        {
            $data=array(
                "message"=>"200",

            );
            print json_encode($data);
            return "200";
        }
        else{
            $data = array(
                "message" => "204",
            );
            print json_encode($data);
            return "204";

        }
    }

    /**
     * @method to update notes
     * @param title,description,id
     * @return void
     */
    public function updateNotes($id,$title,$description){
        $flag = 0;
        if(empty($title)||empty($description)){
            $flag = 1;
        }
        if($flag==0){
            $query="UPDATE notes SET title = '$title', description ='$description' where id = '$id'";
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
       
    }



    public function archive($id)
    {
    
        $query = "UPDATE notes SET archive = '1' where id = '$id'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) 
            {
                $result = array(
                    "message" => "200",
                );
                print json_encode($result);
                return "200";
            } 
            else 
            {
                $result = array(
                    "message" => "204",
                );
                print json_encode($result);
                return "204";

            }
    }




}
