<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Request-Method: POST");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');


include "/var/www/html/codeigniter/application/services/NoteService.php";
class Notes extends CI_Controller
{
    private $serviceReference = "";
    /**
     * @description create an instance of service methods
     * constructor establish DB connection
     */
    public function __construct()
    {
        parent::__construct();
        $this->serviceReference = new NoteService();
    }

    /**
     *@method to create notes
     *@return void
     */
    public function createNotes(){
        $email = $_POST['email'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $reminder =$_POST['reminder'];
        $this->serviceReference->addNotes($email,$title,$description,$reminder);
    }

    /**
     *@method to getNotes
     *@return void
     */
    public function getNotes(){
    $email = $_POST['email'];
    $this->serviceReference->dispalynotes($email);
    }

    public function deleteNote(){
        $id =$_POST['id'];
        $this->serviceReference->deleteNotes($id);
    }
}