<?php
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class login extends TestCase
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
     * testcase for login
     */
    public function testCaseLogin()
    {
        $request = $this->http->post('login', [
            'form_params' => [
                'email' => 'nalluri.harikrishna@gmail.com',
                'password' => '9652612589',
            ],
        ]);

        $stream = $request->getbody();
        $contents = json_decode($stream);
        $res = $contents->message;
        $this->assertEquals("200", $res, 'password incorrect');
    }
}
