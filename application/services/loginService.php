<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
defined('BASEPATH') or exit('No direct script access allowed');

include_once '/var/www/html/codeigniter/application/static/LinkConstants.php';
include 'JWT.php';

/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
use \Firebase\JWT\JWT;

class loginService extends CI_controller
{
    /**
     * @method login() login in to fundo logic
     * @return void
     */
    public function login($email, $password)
    {
        $redis = new Redis();
        $conn = $redis->connection();
        $conn->set('scretkey', "krishna");
        $key = $conn->get('scretkey');
        $data = [
            'email' => $email,
            'password' => $password,
        ];

        $query = "SELECT * FROM registeruser WHERE email='$email'AND password='$password'";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute($data);
        /**
         * Returns an array indexed by column name as returned in your result set.
         */
        $arr = $statement->rowcount();
        $arrOne = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arrOne as $login) {
            $key = "krishna";
            $id = $login['id'];
            $randomnum = rand(1111111111, 9999999999);
        }
        if ($arr > 0) {
            $token = array(
                "id" => $id,
                "random" => $randomnum,
            );
            $jwt = JWT::encode($token, $key);
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            $redis = new Redis();
            $connection = $redis->connection();
            $connection->set('token', $jwt);
            $response = $connection->get('token');
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
        $query = "SELECT * From registeruser where reset_password ='$token' ";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute();
        $arr = $statement->fetch(PDO::FETCH_ASSOC);
        if ($arr) {
            $data = array(
                'key' => $arr['email'],
                'session' => 'active',
            );
            print json_encode($data);
        } else {
            $data = array(
                'key' => "\n",
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
        $query = "UPDATE registeruser set password = '$password' where reset_password='$token' ";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute();
        $queOne = "SELECT reset_password from registeruser where password ='$password' ";
        $statementOne = $this->db->conn_id->prepare($queOne);
        $statementOne->execute();
        $arr = $statementOne->fetch(PDO::FETCH_ASSOC);
        if ($arr['reset_password'] == null) {
            $data = array(
                'message' => 404,
            );
        } else {
            $queryOne = "UPDATE registeruser set reset_password='' where password='$password'";
            $statementOne = $this->db->conn_id->prepare($queryOne);
            $statementOne->execute();
            $data = array(
                'message' => 200,
            );
        }
        return $data;
    }

    /**
     * @method emailpresent()
     * @param email
     */
    public function emailpresent($email)
    {
        $query = "SELECT * from registeruser WHERE email = '$email'";
        $statement = $this->db->conn_id->prepare($query);

        $statement->execute();

        $count = $statement->rowCount();

        if ($count > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @method social login
     * @param email
     * @param name
     * @return void
     */
    public function socialSigin($email, $name)
    {
        $emailExists = loginService::emailpresent($email);
        $redis = new Redis();
        $conn = $redis->connection();
        $key = $conn->get('scretkey');
        if ($emailExists) {
            $tokenarr = array
            ("email"=>$email);
            $token = JWT::encode($tokenarr , $key);
            $data = array(
                "token" => $token,
                "message" => "200",
            );
            print json_encode($data);
        } else {
            //$uid = uniqid();
            $query = "INSERT into registeruser (FirstName,email) values ('$FirstName','$email')";
            $statement = $this->db->conn_id->prepare($query);
            $res = $statement->execute();
            if ($res) {
                $token = JWT::encode($email, $key);
                $data = array(
                    "token" => $token,
                    "message" => "200",
                );
                print json_encode($data);
            } else {
                $data = array(

                    "message" => "204",
                );
                print json_encode($data);

            }
        }
    }

}
