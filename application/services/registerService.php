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
        $dataOne = [
            'FirstName' => $FirstName,
            'Lastname' => $LastName,
            'email' => $email,
            'password' => $password,
        ];
        /**
         * query to insert the data
         */
        $query = "INSERT INTO registeruser(FirstName,Lastname,email,password) VALUES ('$FirstName','$LastName','$email','$password')";
        $stat = $this->db->conn_id->prepare($query);
        $statement = $stat->execute($dataOne);
        if ($statement) {
            $data = array("message" => "200",
            );
            print json_encode($data);
            return "200";
        }
        if ($statement) {
            $data = array("message" => "204",
            );
            print json_encode($data);
            return "204";
        }
        if ($statement) {
            $data = array("message" => "304",
            );
            print json_encode($data);
            return "304";
        }

        return $data;
    }

    /**
     * @var string $email
     * @var string $image
     * @method to add image
     * @return void
     */
    public function addUImage($image, $email)
    {
        $query = "UPDATE registeruser SET image = '$image' WHERE id = '$email'";
        $statement = $this->db->conn_id->prepare($query);
        $res = $statement->execute();
        if ($res) {
            $result = array(
                "message" => "200",
            );
            print json_encode($result);
            return "200";
        } else {
            $result = array(
                "message" => "204",
            );
            print json_encode($result);
            return "204";

        }
    }

    /**
     * @var email
     * @method to getimage
     * @return void
     */
    public function getImage($email)
    {
        $query = "SELECT FirstName,Lastname,image FROM registeruser WHERE id = '$email'";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
 
        print json_encode($arr);
       
    }

}
