<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class Cart_Controller extends RestApi_Controller
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
        if ($param['user_id']) {
            $this->db->select('*');
            $this->db->where(['user_id' => $param['user_id']]);
            $query = $this->db->get('cart');
            return $this->response($query->result_array(), 200);
        } 
        
    }

    function post()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['user_id']) {

            $data = array(
                'user_id'=>$param['user_id'],
                'product_id'=>$param['product_id'],
                'count'=>$param['count']
            );
            $this->db->insert('cart',$data);

            $this->db->select('*');
            $this->db->where(['user_id' => $param['user_id']]);
            $query = $this->db->get('cart');
            return $this->response($query->result_array(), 200);
        } 
       
    }

    function delete()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['id']) {

            $this->db->where(['id' => $param['id']]);
            $query = $this->db->delete('cart');
            
            return $this->response($query, 200);
        } 
       
    }

    function getCartProduct()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['user_id']) {
            $query = $this->db->query("select * from shopping as s inner join cart as c on s.id=c.product_id where c.user_id={$param['user_id']}");
            return $this->response($query->result_array(), 200);
        } 
        
    }

    

}