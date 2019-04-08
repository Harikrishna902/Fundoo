<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
include '/var/www/html/codeigniter/application/services/registerService.php';
include '/var/www/html/codeigniter/application/services/loginService.php';
include '/var/www/html/codeigniter/application/services/forgotService.php';

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
        //$confirm = $_POST["confirm password"];
      $sdf=  $this->serviceReference->registration($FirstName, $LastName, $email, $password);
      return $sdf;
    }
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
        
        public function socialLogin(){
            $email = $_POST['email'];
            $name = $_POST['name'];
    
            $this->loginservice->socialSigin($email,$name);
        }
        



}
