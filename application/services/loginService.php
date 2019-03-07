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
}
       
   



    
  