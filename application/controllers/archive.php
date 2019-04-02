<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Request-Method: POST");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');
include '/var/www/html/codeigniter/application/services/archiveService.php';
class archive extends CI_Controller
{
    private $serviceReference = "";
    /**
     * @description create an instance of service methods
     * constructor establish DB connection
     */
    public function __construct()
    {
        parent::__construct();
        $this->serviceReference = new archiveService ();
    }


    public function fetchArchive(){
        $uid =  $_POST['uid'];
        $this->serviceReference->archivednotes($uid);
    }


    public function unarchive(){
        $uid = $_POST['uid'];
        $this->serviceReference->archive($uid);
    }
}
