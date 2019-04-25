<?php
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');
include 'JWT.php';

class archiveService extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

    }
    /**
     * function to 
     * @param id,
     * @return void
     */
    public function archivednotes($uid){
        $query = "SELECT * from Fnotes Where uid ='$uid' AND archive= '1' ";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($arr);
    }


    /**
     * function to archive notes
     * @param id,
     * @return void
     */
    public function archive($uid){
        $query = "UPDATE Fnotes SET archive = 1  where uid = '$uid'";
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
    
   
    


