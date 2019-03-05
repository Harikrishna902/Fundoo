<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
/*********************************************************************
 * @discription  Controller API
 *********************************************************************/

/**
 * @var string $firstname
 * @var string $lastname
 * @var string $email
 * @var string $pass
 * @method registration() Adds data into the database
 * @return void
 */

class registerService extends CI_controller
{
    public function registration($FirstName, $LastName, $email, $password)
    { 
        $data=[
        'FirstName'=> $FirstName,
        'Lastname'=> $Lastname,
        'email'=>$email,
        'password'=>$password
        ];

        $query = "INSERT INTO registrations(FirstName,Lastname,email,password) VALUES ('$FirstName','$LastName','$email','$password')";
       $stat = $this->db->conn_id->prepare($query);
       $statement=$stat->execute($data);
        if (statement) {
            $data = array("message" => "200",
            );
            print jason_encode()($data);
            return "200";
        }
        if (statement) {
            $data = array("message" => "204",
            );
            print jason_encode()($data);
            return "204";
        }
        if (statement) {
            $data = array("message" => "304",
            );
            print jason_encode()($data);
            return "304";
        }
    }

}
