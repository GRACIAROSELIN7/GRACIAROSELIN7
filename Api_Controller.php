<?php 


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
  }

class Api_Controller extends RestApi_Controller 
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('api_auth');
        if($this->api_auth->isNotAuthenticated())
        {
            $err = array(
                'status'=>false,
                'message'=>'unauthorised',
                'data'=>[]
            );
            $this->response($err);
        }

        
    }

    function getProfile()
    {
         $userId = $this->api_auth->getUserId();
         $this->load->model('api_model');
         $profileData = $this->api_model->getProfile($userId);
         $err = array(
            'status'=>true,
            'message'=>'successfully fetched profile',
            'data'=>$profileData
        );
        $this->response($err,200);
    }


}