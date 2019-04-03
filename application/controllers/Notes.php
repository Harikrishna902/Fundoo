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
    public function createNotes()
    {
        $email = $_POST['email'];
        $title = $_POST['title'];
        
        $description = $_POST['description'];
        $reminder = $_POST['reminder'];
         // $color = $_POST['color'];
        // if ($title == "null" || $title == "undefined") {
        //     $title = "";
        // }
        // if ($notes == "null" || $notes == "undefined") {
        //     $notes = "";
        // }
        $this->serviceReference->addNotes( $title,$email,$description, $reminder);
    }

    /**
     *@method to getNotes
     *@return void
     */
    public function getNotes()
    {
        $email = $_POST['email'];
        $this->serviceReference->dispalynotes($email);
    }

    /**
     * @method to delete notes
     * @return void
     */
    public function deleteNotes()
    {
        $id = $_POST['id'];
        $this->serviceReference->deleteNotes($id);
    }

    /**
     * @method to update notes
     * @return void
     */
    public function updateNotes()
    {
        $id = $_POST['id'];
        $title =$_POST['title'];
        $description=$_POST['description'];
        $this->serviceReference->updateNotes($id,$title,$description);

    }

    /**
     * @method to change color
     * @return void
     */
    public function changeColor()
    {
        $id = $_POST['id'];
        $color = $_POST['colour'];
        $this->serviceReference->changeColor($id, $color);
    }

    public function archive()
        {
            $id = $_POST['id'];
            $this->serviceReference->archive($id);
        }
}
