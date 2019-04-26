<?php
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class register extends TestCase
{
    protected $client;

    public function setUp()
    {
        /**
         * Guzzle is a PHP HTTP client that makes it easy to send HTTP requests and trivial to integrate with web services.
         */
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://localhost/codeigniter/'], array(
            'request.options' => array(
                'exceptions' => false,
            ),
        ));

    }

    /**
     * testcase for Register
     */
    public function testCaseRegister()
    {
        $request = $this->http->post('register', [
            /**
             * used send an application
             * Associative array of form field names to values 
             * where each value is a string or array of strings
             */
            'form_params' => [ 
                'FirstName' => 'Harry',
                'Lastname' => 'krishnan',
                'email' => 'nalluri.kitt8@gmail.com',
                'password' => 'password',
            ],
        ]);

        $stream = $request->getBody();
        $contents = json_decode($stream); 
        $res = $contents->message;

        $this->assertEquals("200", $res);

    }
}
