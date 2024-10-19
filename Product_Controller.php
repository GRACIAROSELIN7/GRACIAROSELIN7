<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class Product_Controller extends RestApi_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('api_auth');
        $this->load->model('api_model');
    }

    function getshopping()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['id']) {
            $this->db->select('*');
            $this->db->where(['id' => $param['id']]);
            $query = $this->db->get('shopping');
        } else {
            $query = $this->db->query('SELECT * FROM shopping as s left join (select sum(rating)/COUNT(*) as rating, booking_id from review GROUP by booking_id) r on s.id = r.booking_id');
        }
        return $this->response($query->result_array(), 200);
    }


}