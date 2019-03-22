<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include '/var/www/html/codeigniter/application/services/JWT.php';
include '/var/www/html/codeigniter/application/predis-1.1/autoload.php';
include '/var/www/html/codeigniter/application/services/Redish.php';
/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
use \Firebase\JWT\JWT;
class loginService extends CI_controller{
    /**
     * @method login() login in to fundo logic
     * @return void
     */
    public function login($email, $password){
        $data = [
            'email' => $email,
            'password' => $password,
        ];

        $query = "SELECT * FROM registrations WHERE email='$email'AND password='$password'";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute($data);
        /**
         * Returns an array indexed by column name as returned in your result set.
         */
        $arr = $statement->rowcount();
        $arrOne = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach($arrOne as $login){
            $key = $login['email'];
            $email = $login['email'];
            $randomnum = rand(1111111111,9999999999);
        }
        if ($arr>0) {
            $token = array(
                "email" =>$email,
                "random" => $randomnum
            );
            $jwt = JWT::encode($token, $key);
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            $redis = new Redis();
            $connection = $redis->connection();
            $client->set('token',$jwt);
              $response = $client->get('token');
              $data = array(
                "token" => $jwt,  
                "message" => "200",
            );
            print json_encode($data);
            
        } else {
            $data = array(
                "message" => "204",
            );
            print json_encode($data);
            return "204";
        }
        return $data;
    }


    public function fetchemailid($token)
{
    $query = "SELECT * From registrations where reset_password ='$token' ";
    $statement = $this->db->conn_id->prepare($query);
    $statement->execute();
    $arr = $statement->fetch(PDO::FETCH_ASSOC);
    if ($arr) {
        $data = array(
            'key'     => $arr['email'],
            'session' => 'active',
        );
        print json_encode($data);
    } else {
        $data = array(
            'key'     => "\n",
            'session' => 'reset link has been expired',
        );
        print json_encode($data);
        return "reset link has been expired";
    }
    return $data;
}

/**
 * function to reset password
 * @param password,token
 */
    public function resetpass($password, $token)
{
    $query = "UPDATE registrations set password = '$password' where reset_password='$token' ";
    $statement = $this->db->conn_id->prepare($query);
    $statement->execute();
    $queOne = "SELECT reset_password from registrations where password ='$password' ";
    $statementOne= $this->db->conn_id->prepare($queOne);
    $statementOne->execute();
    $arr = $statementOne->fetch(PDO::FETCH_ASSOC);
    if($arr['reset_password']==null){
        $data = array(
            'message'=>404
        );
    }else{
        $queryOne = "UPDATE registrations set reset_password='' where password='$password'";
        $statementOne = $this->db->conn_id->prepare($queryOne);
        $statementOne->execute();
        $data = array(
            'message'=>200
        );
    }
    return $data;
}

}


       
   



    
  