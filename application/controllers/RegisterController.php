<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
include '/var/www/html/codeigniter/application/services/registerService.php';
include '/var/www/html/codeigniter/application/services/loginService.php';
include '/var/www/html/codeigniter/application/services/forgotService.php';
use \Firebase\JWT\JWT;
class RegisterController extends CI_Controller
{
    /**
     * @var string $serviceReference serviceReference
     */
    public $serviceReference = "";
    public $loginservice = "";
    public $forgotservice = "";
    /**
     * constructor establish DB connection
     */
    public function __construct()
    {
        parent::__construct();
        //$this->load->library('doctrine');

        $this->serviceReference = new registerService();
        $this->loginservice = new loginService();
        $this->forgotservice = new forgotService();
    }
    /**
     * @method registration() Adds data into the database
     * @return void
     */
    public function registration()
    {
        $FirstName = $_POST["FirstName"];
        $LastName = $_POST["Lastname"];
        $email = $_POST["email"];
        $password = $_POST["password"];

      $sdf=  $this->serviceReference->registration($FirstName, $LastName, $email, $password);
      return $sdf;

    }

    // public function registration()
    // {
    //     $fname = $_POST['FirstName'];
    //     $lname = $_POST['Lastname'];
    //     $email = $_POST['email'];
    //     $password = $_POST['password'];

    //     $em = $this->doctrine->em;
    //     $uid = uniqid();
    //     $user = new Entity\Users;
    //     $user->getId();
	// 	$user->setFname($FirstName);
    //     $user->setLname($Lastname);
    //     $user->setEmail($email);
    //     $user->setPassword($password);
        
    //     $notes = new Entity\Notes;
    //   /**
    //    *  the entity manager to track changes to the object.
    //    */
    //     $em->persist($user);
    //     /**
    //      *the em will push the changes of the entity objects the em tracks to the database in single transaction. 
    //      * Most often em have to manage multiple objects.
    //      */
    //     $em->flush();
    //     $res = $user;
    //     if(is_null($res)){
    //         $data = array(
    //             "status" => "204",
    //         );
    //         print json_encode($data);
           
    //     }else{
    //         $data = array(  
    //             "status" => "200",
    //         );
    //         print json_encode($data);
    //     }
    // }


 
    
    /**
     * @method login() login in to fundo logic
     * @return void
     */
    public function login()
    {
        $email = $_POST["email"];
        $password = $_POST["password"];
        $this->loginservice->login($email, $password);
    }

    //     public function login(){
    //     $email = $_POST['email'];
    //     $password = $_POST['password'];
    //     $em = $this->doctrine->em;
    //     $users = new Entity\Users;
    //     //u acts as alias
    //     $query = $em->createQuery('SELECT u FROM Entity\Users u WHERE u.email=?1 AND u.password =?2 ');
    //     $query->setParameter(1, $email);
    //     $query->setParameter(2, $password);
    //     $loginArr = $query->getScalarResult();
    //     $res = $users;
    //     $key = "krishna";
    //     $redis = new Redis();
    //     $conn = $redis->connection();
    //      if(is_null($res)){
    //         $data = array(
    //             "status" => "204",
    //         );
    //         print json_encode($data);
           
    //     }else{
    //         $token = array(
    //             "id"=>$uid,
    //             "email" => $email,
                
    //         );
    //         $jwt = JWT::encode($token, $key);
          
    //         $decoded = JWT::decode($jwt, $key, array('HS256'));
    //         $conn->set('token'.$email, $jwt);
    //         $response = $conn->get('token'.$email);

    //         $data = array(
    //             "token" => $response,
    //             "message" => "200",
    //         );
           
    //         print json_encode($data);
    //     }
    // }

    /**
     * @method  for forgotpassword
     * @return void
     */
    public function forgot()
    {
        $email = $_POST["email"];
        $this->forgotservice->forgot($email);

    }

        /**
        * function to fetchmail
        */
    
        public function fetchemail(){
            $email = $_POST['token'];
            $res = $this->loginservice->fetchemailid($email);
        }   
        
        /**
         * function to reset password 
         */
        public function resetpassword(){
            $password = $_POST['password'];
            $token = $_POST['token'];
            $res = $this->loginservice->resetpass($password,$token);
        }   
        
        /**
         * function to login socially
         */
        public function socialLogin(){
            $email = $_POST['email'];
            $name = $_POST['name'];
    
            $this->loginservice->socialSigin($email,$name);
        }
        

        /**
         * function to addprofile pic 
         */
        public function addUImage()
        {
            $image = $_POST['image'];
            $email = $_POST['email'];
            $this->serviceReference->addUImage($image,$email);
        }


        /**
         * function to getimage
         */
        public function getImage()
        {
            $email = $_POST['email'];
            return $this->serviceReference->getImage($email);
        }


}
