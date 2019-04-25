<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Request-Method: POST");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');
include '/var/www/html/codeigniter/application/services/Redish.php';
//include '/var/www/html/codeigniter/application/services/labelService.php';
include '/var/www/html/codeigniter/application/services/JWT.php';
use \Firebase\JWT\JWT;

class labels extends CI_Controller
{
   // private $serviceReference = "";
    /**
     * @description create an instance of service methods
     * constructor establish DB connection
     */
    public function __construct()
    {
        parent::__construct();
        //$this->serviceReference = new labelService ();
    }

    
    // public function addLabel(){
    //     $uid= $_POST['uid'];
    //     $label = $_POST['label'];

    //     $this->serviceReference->labelAdd($uid,$label);
    // }

    // public function addLabel(){
    //     $uid = $_POST['uid'];
    //     $label = $_POST['label'];
    //     $em = $this->doctrine->em;
    //     $labels = new Entity\Labels;

        
    //     $article2 = $em->find('Entity\Users', $uid);
    //     $labels->setLuid($article);

    //     $labels->setLabelname($label);

    //     $em->persist($labels);

    //     $em->flush();
    // }


     /**
     * @method to add the labels
     */
    public function addLabel(){
        $uid = $_POST['uid'];
        $label = $_POST['label'];

        $secretkey = "krishna";
        $channel = new  Redis();
        $client = $channel->connection();
        $token = $client->get('token');

        $array = array(
            'HS256',
        );
        $payload = JWT::decode($token, $secretkey, $array);

        $uid= $payload->id;



        $this->load->library('doctrine');

        $em = $this->doctrine->em;


        $group = new Entity\Labels();
		$group->setLabelName($label);
        $group-> setUid($uid);

       
		$em->persist($group);
        $em->flush();
        

    }
  /**
   * @method to fetch/display the labels
   */
  
    // public function getLabel()
    // {
    //     $email = $_POST['email'];
    //     $this->serviceReference->labelFetch($email);
    // }

    public function getLabel()
    {

        $uid =  $_POST['uid'];
    //    $secretkey = "krishna";
    //     $channel = new  Redis();
    //     $client = $channel->connection();
    //     $token = $client->get('token');


    //     $array = array(
    //         'HS256',
    //     );
    //     $payload = JWT::decode($token, $secretkey, $array);

    //     $userId = $payload->userId;

        $this->load->library('doctrine');

        $em = $this->doctrine->em;

        $query = $em->createQuery("SELECT u.id,u.uid,u.labelname FROM \Entity\Labels u WHERE u.uid = '$uid'");
        
        $users = $query->getScalarResult();


        print json_encode($users);
        

    }

    // public function getLabel(){
    //     $em = $this->doctrine->em;
    //     $query = $em->createQuery('SELECT u.id,u.labelname FROM Entity\Labels u ');
    //     $results = $query->getResult();
    //     print json_encode($results);
    // }
    // public function deleteLabel()
    // {
    //     $id = $_POST['id'];
    //     $this->serviceReference->labeldelete($id);
    // }

    public function deleteLabel(){
        $id = $_POST['uid'];
        $label = $_POST['labelname'];

        // $secretkey = "krishna";

        // $channel = new  Redis();
        // $client = $channel->connection();
        // $token = $client->get('token');

        // $array = array(
        //     'HS256',
        // );
        // $payload = JWT::decode($token, $secretkey, $array);

        // $userId = $payload->userId;



        $this->load->library('doctrine');

        $em = $this->doctrine->em;
        $query = $em->createQuery("DELETE \Entity\Labels u WHERE u.id = '$id'");

        
        $labelobj = $query->getResult();
 }



    public function updateLabel(){

        $id = $_POST["id"];
        $newLabel =  $_POST["newLabel"];
        $labId =    $_POST["labId"];

        $secretkey = "krishna";

        $channel = new  Redis();
        $client = $channel->connection();
        $token = $client->get('token');

        $array = array(
            'HS256',
        );
        $payload = JWT::decode($token, $sekretkey, $array);

        $userId = $payload->userId;

        $this->load->library('doctrine');
        $em = $this->doctrine->em;

        $query = $em->createQuery("UPDATE \Entity\Labels u SET u.labelname = '$newLabel' WHERE u.id = '$labId' AND u.uid ='$uid'");
        $users = $query->getResult();
    }




    public function getAllLabeledNotes(){

        $labelname = $_POST["labelname"];
        $id= $_POST["id"];
    
        $secretkey = "krishna";
    
        $channel = new  Redis();
        $client = $channel->connection();
        $token = $client->get('token');
    
        $array = array(
            'HS256',
        );
        $payload = JWT::decode($token, $secretkey, $array);
    
        $userId = $payload->userId;
    
        // SELECT n.title, n.id, n.takeANote, n.dateAndTime, n.color,n.image,l.labelname from userNotes n right JOIN labelNoteMap ln ON ln.noteId=n.id right JOIN doc_label l on ln.labelId=l.id where n.userId =36 and l.id =3 and archive = 0 and deleteNote = 0 and pin = 0 ORDER by n.id DESC
        $query ="SELECT n.title, n.id, n.description, n.currentdateAnd, n.colour,n.image,l.labelname from userNotes n Left JOIN labelNoteMap ln ON ln.noteid=n.id left JOIN labels l on ln.labelid=l.id where n.uid ='$uid' and l.labelname ='$labelname'  and archive = 0 and deleteNote = 0 ORDER BY n.id DESC";
    
    
        $statement = $this->db->conn_id->prepare($query);
    
        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            
            print json_encode($arr);
        }
    
    }
    

} 