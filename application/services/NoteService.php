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
    public function addNotes($title, $uid, $description, $reminder,$labelid)
    {
        $reference = new JWT();
        $flag = 0;
        if (empty($title) || empty($description)) {
            $flag = 1;

        }
        if ($reminder == "undefined") {
            $reminder = "";
        }
        if ($flag == 0) {
            $headers = apache_request_headers();
            $token = $headers['Authorization'];
            $redis = new Redis();
            $checktoken = JWT::verifytoken($token);
            if ($checktoken) {
                $connection = $redis->connection();
                $response = $connection->get('token');

                $query = "INSERT into Fnotes (title,description,uid,reminder,archive,trash) values ('$title','$description','$uid','$reminder',0,0)";
                $statement = $this->db->conn_id->prepare($query);
                $res = $statement->execute();



              
                if ($res) {

                    if($res){
                        $query="INSERT into label_notes (note_id,label_id) values (LAST_INSERT_ID(),'$labelid')";
                        $statement= $this->db->conn_id->prepare($query);
                        $res = $statement->execute();
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
}

    /**
     * @method to displaynotes
     * @param email
     */
    public function dispalynotes($uid)
    {
        $query = "SELECT n.title, n.id, n.description, n.reminder, n.colour,n.image,l.labelname from Fnotes n Left JOIN label_notes ln ON ln.note_id=n.id left JOIN Labels l on ln.label_id=l.id where n.uid = '$uid'   And archive=0 AND trash=0 ORDER BY n.id DESC";
        
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $notes) {
            $title = $notes['title'];
            $description = $notes['description'];
            // $colour=$notes['colour'];
             //$date=$notes['date'];
        }
        print json_encode($arr);
    }

    /**
     * function to deletenotes
     * @param id
     */
    public function deleteNotes($id)
    {
        $query = "DELETE from Fnotes where id='$id'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) {
            $data = array(
                "message" => "200",
            );
            print json_encode($data);
            return "200";
        } else {
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
    public function changeColor($id, $colour)
    {
        $query = "UPDATE  Fnotes SET colour = '$colour' WHERE id ='$id'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) {
            $data = array(
                "message" => "200",

            );
            print json_encode($data);
            return "200";
        } else {
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
    public function updateNotes($id, $title, $description, $reminder)
    {
        $flag = 0;
        if (empty($title) || empty($description || empty($reminder))) {
            $flag = 1;
        }
        if ($flag == 0) {
            $query = "UPDATE Fnotes SET title = '$title', description ='$description',reminder='$reminder' where id = '$id'";
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

     /**
     * @method for archive notes
     * @param id
     * @return void
     */
    public function archive($id)
    {

        $query = "UPDATE Fnotes SET archive = '1' where id = '$id'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) {
            $result = array(
                "message" => "200",
            );
            print json_encode($result);
            return "200";
        } else {
            $result = array(
                "message" => "204",
            );
            print json_encode($result);
            return "204";

        }
    }

    /**
     * @method for trash notes
     * @param id
     * @return void
     */
    public function trashNote($id)
    {
        $query = "UPDATE Fnotes set trash='1'  WHERE id = '$id'";
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
     * @method restore notes
     * @param id
     * @return void
     */
    public function restoreDeletedNote($id)
    {
        $query = "UPDATE Fnotes set trash='0'  WHERE id = '$id'";
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
    * @method to fetch notes from trash
    * @param email
    *@return void
    */
    public function fetchnote($email){
        $query = "SELECT * from Fnotes where trash =1 And uid='$email'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();


        if ($res) {
            $trashArr = $statement->fetchAll(PDO::FETCH_ASSOC);
            $data = array(

                "status" => "200",
            );
            print json_encode($trashArr);

        } else {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);
            return "204";

        }
    }

    /**
     * @method imagenote
     * @param base64,email,noteid
     * @return void
     */
    public function imageNote($base64,$uid,$noteid){
        $query = "UPDATE Fnotes SET image = '$base64'  where uid = '$uid' AND id='$noteid'";
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
