<?php
require_once '/var/www/html/codeigniter/application/rabbitMq/vendor/autoload.php';
/**
 * allows to create new connection to rabbitmq server
 */
use PhpAmqpLib\Connection\AMQPStreamConnection;
/**
 * allows to create new message to rabbitmq server
 */
use PhpAmqpLib\Message\AMQPMessage;

include "/var/www/html/codeigniter/application/rabbitMq/receiver.php";
include "/var/www/html/codeigniter/application/static/RabbitMQConstants.php";

class Send
{
 /**
 * @method sendEmail()
 * @var connection creates the AMPQSTREAMconnection
 * @return void
 */

    public function sendEmail($toEmail, $subject, $body)
    {
        
        $RabbitMQConstantsObj = new RabbitMQConstants();
        /**
         * creates a new instance of AMQP with arguments(host,port,user,password)
         */
        $connection = new AMQPStreamConnection($RabbitMQConstantsObj->host,$RabbitMQConstantsObj->port,$RabbitMQConstantsObj->username,$RabbitMQConstantsObj->password);
       //  $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');

       /**
        * creating a channel by calling channel method
        */
        $channel    = $connection->channel();
        /*
        declaring a queue with aurguments
        name: hello
        passive: false
        durable: true // the queue will survive server restarts
        exclusive: false // the queue can be accessed in other channels
        auto_delete: false //the queue won't be deleted once the channel is closed.
         */
        $channel->queue_declare($RabbitMQConstantsObj->queuename, false, false, false, false);
       
        $data = json_encode(array(
            "from"       => $RabbitMQConstantsObj->senderEmailID,
            "from_email" => $RabbitMQConstantsObj->senderEmailID,
            "to_email"   => $toEmail,
            "subject"    => $subject,
            "message"    => $body,
        ));
      
        /**
         * creating a message with aurguments data and array
         * delivery_mode=>2 means message is persistent
         */
        $msg = new AMQPMessage($data, array('delivery_mode' => 2));

        $channel->basic_publish($msg, '',$RabbitMQConstantsObj->queuename );
        /**
         * calling the receiver
         */
        $obj = new Receiver();

        $obj->receiverMail();
        $channel->close();
        $connection->close();
        return "sent";
    }
}
