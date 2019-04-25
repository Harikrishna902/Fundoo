<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once '/var/www/html/codeigniter/application/rabbitMq/sender.php';
include_once '/var/www/html/codeigniter/application/static/LinkConstants.php';

/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
class forgotService extends CI_controller
{
    /**
     * @method forgot() login in to fundo logic
     * @return void
     */

    public function forgot($email)
    {
        
        if (forgotService::checkEmail($email)) {
            $ref = new Send();
            $token = md5($email);
            $query = "UPDATE registeruser SET reset_password= '$token' where email='$email'";
            $statement = $this->db->conn_id->prepare($query);
            $statement->execute();
            $sub = 'password recovery mail';
            $body = "click here to reset password http://localhost:4200/reset?token=$token";
            // $body = "click here to " . $this->constants->resetLink . $token;
            $response = $ref->sendEmail($email, $sub, $body);
            if (response == "sent") {
                $data = array("message" =>"200");
                echo json_encode($data);
                return "200";

            } else {
                $data = array(
                    "message" => "400",
                );
                print json_encode($data);
                return "400";

            }

        }
    }

    /**
     * function for checkEmail()
     */
    public function checkEmail($email)
    {
        $query = "SELECT * FROM registeruser WHERE email='$email'";
        $statement = $this->db->conn_id->prepare($query);
        $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $titleData) {
            if ($titleData['email'] == $email) {
                return true;
            }
        }

        return false;
    }
}
