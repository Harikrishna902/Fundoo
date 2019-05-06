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
    public function addLabel()
    {
        $uid = $_POST['uid'];
        $label = $_POST['label'];

        $secretkey = "krishna";
        $channel = new Redis();
        $client = $channel->connection();
        $token = $client->get('token');

        $array = array(
            'HS256',
        );
        $payload = JWT::decode($token, $secretkey, $array);

        $uid = $payload->id;

        $this->load->library('doctrine');

        $em = $this->doctrine->em;

        $group = new Entity\Labels();
        $group->setLabelName($label);
        $group->setUid($uid);

        /**
         * the entity manager to track changes to the object.
         */
        $em->persist($group);
        /**
         *the em will push the changes of the entity objects the em tracks to the database in single transaction.
         * Most often em have to manage multiple objects.
         */
        $em->flush();

    }

    // public function getLabel()
    // {
    //     $email = $_POST['email'];
    //     $this->serviceReference->labelFetch($email);
    // }

    /**
     * @method to fetch/display the labels
     */
    public function getLabel()
    {

        $uid = $_POST['uid'];
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

    /**
     * @method to delete the labels
     */
    public function deleteLabel()
    {
        $id = $_POST['uid'];
        $label = $_POST['labelname'];
        $this->load->library('doctrine');
        $em = $this->doctrine->em;
        $query = $em->createQuery("DELETE \Entity\Labels u WHERE u.id = '$id'");
        $labelobj = $query->getResult();
    }
     


   /**
   * @method to edit the labels
   */
    public function updateLabel()
    {

        $id = $_POST["id"];
        $newLabel = $_POST["newLabel"];
        $labId = $_POST["labId"];

        // $secretkey = "krishna";

        // $channel = new  Redis();
        // $client = $channel->connection();
        // $token = $client->get('token');

        // $array = array(
        //     'HS256',
        // );
        // $payload = JWT::decode($token, $sekretkey, $array);

        // $userId = $payload->userId;

        $this->load->library('doctrine');
        $em = $this->doctrine->em;

        $query = $em->createQuery("UPDATE \Entity\Labels u SET u.labelname = '$newLabel' WHERE u.id = '$labId' AND u.uid ='$uid'");
        $users = $query->getResult();
    }


    /**
     * @method to get all the labeled notes
     * 
     */
    public function getAllLabeledNotes()
    {

        $labelname = $_POST["labelname"];
        $uid = $_POST["uid"];
        $secretkey = "krishna";
        $channel = new Redis();
        $client = $channel->connection();
        $token = $client->get('token');
        $array = array(
            'HS256',
        );
        // $payload = JWT::decode($token, $secretkey, $array);

        // $uid = $payload->uid;
        $query = "SELECT n.title, n.id, n.description, n.reminder, n.colour,n.image,ln.note_id,l.labelname from Fnotes n JOIN label_notes ln ON ln.note_id=n.id JOIN Labels l on ln.label_id=l.id  where n.uid ='$uid' AND l.id='$labelname' ORDER BY n.id DESC";
         $statement = $this->db->conn_id->prepare($query);

        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

            print json_encode($arr);
        }

    }

}
