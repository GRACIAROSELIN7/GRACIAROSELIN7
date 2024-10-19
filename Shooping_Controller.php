<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class Shopping_Controller extends RestApi_Controller
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
        if (!empty($param['id'])) {
            $this->db->select('*');
            $this->db->where(['id' => $param['id']]);
            $query = $this->db->get('shopping');
            return $this->response($query->row_array(), 200);
        } else {
            $query = $this->db->get('shopping');
            return $this->response($query->result_array(), 200);
        }
    }

    function createshopping()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->db->insert('shopping', $data);
        $insert_id = $this->db->insert_id();
        return $this->response(['id' => $insert_id, 'message' => 'Item created successfully'], 201);
    }

    function updateshopping($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->db->where('id', $id);
        $this->db->update('shopping', $data);
        return $this->response(['id' => $id, 'message' => 'Item updated successfully'], 200);
    }
    
    function deletesopping($id)
    {
        $this->db->where('id', $id);
        $this->db->delete('shopping');
        return $this->response(['id' => $id, 'message' => 'Item deleted successfully'], 200);
    }
}
