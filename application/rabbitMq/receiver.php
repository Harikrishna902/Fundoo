<?php

require_once '/var/www/html/codeigniter/application/rabbitMq/vendor/autoload.php';
//require_once "C:/xampp/htdocs/php_CodeIgniter/CodeIgniter/application/static/RabbitMQConstants.php";
/**
 * allows to create new connection to rabbitmq server
 */
use PhpAmqpLib\Connection\AMQPStreamConnection;


class Receiver
{
    /*
    name: hello
    type: direct
    passive: false
    durable: true // the exchange will survive server restarts
    auto_delete: false //the exchange won't be deleted once the channel is closed.
     */
    public function receiverMail()
    {   
        $RabbitMQConstantsObj = new RabbitMQConstants();
        
        $connection = new AMQPStreamConnection($RabbitMQConstantsObj->host,$RabbitMQConstantsObj->port,$RabbitMQConstantsObj->username,$RabbitMQConstantsObj->password);
        $channel    = $connection->channel();
         /**
          * ddeclaring a queue
          */
        $channel->queue_declare($RabbitMQConstantsObj->queuename, false, false, false, false);
        $email=$RabbitMQConstantsObj->senderEmailID;
        $pass=$RabbitMQConstantsObj->senderPassword;
        $callback = function ($msg) {

            $RabbitMQConstantsObj = new RabbitMQConstants();
            $data = json_decode($msg->body, true);
            $to_email   = $data['to_email'];
            $subject    = $data['subject'];
            $message    = $data['message'];
            /**
             * Create the Transport
             * @param host,port,encrypt
             */
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
                ->setUsername($RabbitMQConstantsObj->senderEmailID)
                ->setPassword($RabbitMQConstantsObj->senderPassword);
            /**
             * Create the Mailer using your created Transport
             * The Transport used to send messages
             */
            $mailer = new Swift_Mailer($transport);

            /**
             * Create a message
             * and to buils emails
             */
            $message = (new Swift_Message($subject))
                ->setFrom($RabbitMQConstantsObj->senderEmailID)
                ->setTo([$to_email])
                ->setBody($message);
            /**
             * Send the message
             */
            $result = $mailer->send($message);
            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };

        $channel->basic_consume($RabbitMQConstantsObj->queuename, '', false, false, false, false, $callback);

        $channel->basic_qos(null, 1, null);
        while (count($channel->callbacks)) {
            $channel->wait();
        }
    }
}
