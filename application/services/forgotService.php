<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
/*********************************************************************
 * @discription  Controller API
 *********************************************************************/
class forgotService extends CI_controller{
    /**
     * @method forgot() login in to fundo logic
     * @return void
     */
    public function forgot($email){
        $data = [
            'email' => $email
            ];
        }

    }