<?php
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');
include 'JWT.php';

class labelService extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

    }
   

    /**
     * @method to add labels 
     * @param email,label
     * @return void 
     */
    public function labelAdd($email,$label){
        $query = "INSERT into labels (label,email,create_date) values ('$label','$email',now())";
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
     * @method to get the label
     * @param email
     */
    public function labelFetch($email){
        $query = "SELECT * from labels Where email ='$email'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($arr);
    }


    /**
     * @method to delete the label
     * @param email
     */
    public function labeldelete($id){
        $query = "DELETE FROM labels WHERE id= '$id'";
        $statement= $this->db->conn_id->prepare($query);
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
