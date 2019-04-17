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
        $this->serviceReference->addNotes($title, $email, $description, $reminder);
    }


    public function insertNotes(){
        
        $id = $_POST['id'];
        $title = $_POST['title'];
        $desc = $_POST['description'];
        $rem = $_POST['reminder'];
        $color = $_POST['colour'];
        $labelid = $_POST['labelid'];
        $em = $this->doctrine->em;
        $notes = new Entity\Notes;
    
        $article = $em->find('Entity\Users', $id);
        
        $notes->setTitle($title);
        $notes->setDescription($description);
        $notes->setColor($colour);
        $notes->setArchive($archive);
        $notes->setTrash(0);
        $notes->setImage(0);
        $notes->setArchive(0);
        $notes->setReminder($rem);
        $notes->setUid($article);
        
        if($labelid !="undefined" && $labelid !="null"){
            $labels = new Entity\Labels;
            $labeldata = $em->find('Entity\Labels',$labelid);
            $notes->addLabel($labeldata);
        }
     
        $article2 = $em->find('Entity\Users', $id);

        $notes->setUid($article);
       $em->persist($notes);
       $em->flush();
       $res = $notes;
        if(is_null($res)){
            $data = array(
                "status" => "204",
            );
            print json_encode($data);
           
        }else{
            $data = array(  
                "status" => "200",
            );
            print json_encode($data);
        }

      


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
        $title = $_POST['title'];
        $description = $_POST['description'];
        $reminder = $_POST['reminder'];
        $this->serviceReference->updateNotes($id, $title, $description, $reminder);

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

    /**
     * @method to archive
     */
    public function archive()
    {
        $id = $_POST['id'];
        $this->serviceReference->archive($id);
    }

    /**
     * @method to storenotes in trash
     * @return void
     */
    public function noteTrash()
    {
        $id = $_POST['id'];
        $this->serviceReference->trashNote($id);
    }

    public function notefetch()
    {
        $id = $_POST['id'];
        $this->serviceReference->fetchnote($id);
    }

    /**
     * @method to restore the notes
     *@return void
     */
    public function restoreDeletedNote()
    {
        $id = $_POST['id'];
        $this->serviceReference->restoreDeletedNote($id);
    }

    public function noteimage()
    { 
        $base64 = $_POST['base64']; 
        $email = $_POST['email'];
        $id = $_POST['noteid'];
        $this->serviceReference->imageNote($base64,$email,$id);
    }

}
