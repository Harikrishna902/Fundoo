<?php
/**
 * autoload is used to load all dependencies
 * AMQPCONNECTION if for crete new connection 
 * AMQPMessage is for creating message that can be push to queue
 */
require_once_DIR.'/vendor/autoload.php';
use PhpAmqpLib\connection\AMQPConnection;
use PhpAmqpLib\message\AMQPMessage;
/**
 * creating new instance with 
 * @param host,port,username,password
 * 
 */
connection -new AMQPConnection ('localhost','5672','guest','guest');
$channel = $connection->channel();

/**
 * declaring the queue with
 * @param queuename,passive,durable,exclusive,autoload
 */
$channel->queue_declare('email_queue',false,false,false,false);

/**
 * used to store data
 */
$data=json_encode($_POST);
$msg= new AMQPMessage($data, array('delivery_mode'=>2));

/**
 * to publish the message
 */
$channel->basic_publish($msg,"",'email_queue');
header('Location: form.php? sent =true');

