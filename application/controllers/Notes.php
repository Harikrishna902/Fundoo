<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/NoteService.php";
class Notes extends CI_Controller
{
    private $serviceReference = "";
    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->serviceReference = new NoteService();
    }
    public function createNotes(){
        $email = $_POST['email'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $this->serviceReference->addNotes($email,$title,$description);
    }
    public function getNotes(){
        $email = $_POST['email'];
        $this->serviceReference->displaynotes($email);
    }
}