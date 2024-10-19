<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class User_Controller extends RestApi_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('api_auth');
        $this->load->model('api_model');
    }

    function get()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['id']) {
            $this->db->select('*');
            $this->db->where(['user_id' => $param['id']]);
            $query = $this->db->get('user');
        } else {
            $query = $this->db->get('user');
        }
        return $this->response($query->result_array(), 200);
    }


}