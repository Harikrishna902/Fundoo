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
        $query = "SELECT * from notes Where user_id ='$uid' AND archived = '1' ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();
        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($arr);
    }


    /**
     * function to archive notes
     * @param id,
     * @return void
     */
    public function archive($uid){
        $query = "UPDATE notes SET archived = '0'  where id = '$uid'";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();
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
    
   
    


