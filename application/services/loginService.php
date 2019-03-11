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
        $arr = $statement->fetchColumn();
        $arr1 = $statement->fetchAll(PDO::FETCH_ASSOC);
        if ($arr>0) {
            $data = array("message" => "200",
            );
            print json_encode($data);
            
        }
        else {
            $data = array("message" => "204",
            );
            print json_encode($data);
           
        }
        return $data;
    }


    public function fetchemailid($token)
{
    $query = "SELECT email From registrations where reset_passowrd ='$token' ";
    $stmt = $this->db->conn_id->prepare($query);
    $stmt->execute();
    $arr = $stmt->fetch(PDO::FETCH_ASSOC);
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
    public function resetpass($password, $token)
{
    $query = "UPDATE registerations set password = '$password' where reset_password='$token' ";
    $stmt = $this->db->conn_id->prepare($query);
    $stmt->execute();
    $que1 = "SELECT reset_password from registerations where password ='$password' ";
    $stmt1 = $this->db->conn_id->prepare($que1);
    $stmt1->execute();
    $arr = $stmt1->fetch(PDO::FETCH_ASSOC);
    if($arr['reset_password']==null){
        $data = array(
            'message'=>404
        );
    }else{
        $data = array(
            'message'=>200
        );
    }
    return $data;
}

}


       
   



    
  