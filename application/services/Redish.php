<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once ('/var/www/html/codeigniter/application/predis-1.1/autoload.php');
class Redis
{
    public function connection()
    {
        $client = new Predis\Client(array(
            'host' => '127.0.0.1',
            'port' => 6379,
            'password' => null,
        ));
        return $client;
    }
}
