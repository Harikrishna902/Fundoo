<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
class loginService extends CI_controller{
    /**
     * @method login() login in to fundo logic
     * @return void
     */
    public function login($email, $pass){
        $query     = "SELECT * FROM registration WHERE email='$email',password='$password'";
        $statement = $this->connect->prepare($query);
        $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        if ($arr) {
            $data = array("message" => "200",
            );
            print json_encode($data);
            return "200";
        }
        if ($arr) {
            $data = array("message" => "204",
            );
            print json_encode($data);
            return "204";
        }
        if ($arr) {
            $data = array("message" => "304",
            );
            print json_encode($data);
            return "304";
        }

        return $data;
    }

    }
