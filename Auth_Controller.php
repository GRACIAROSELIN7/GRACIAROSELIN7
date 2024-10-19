<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class Auth_Controller extends RestApi_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('api_auth');
        $this->load->model('api_model');
    }

    function register()
    {
        $username = $this->input->post('name');
        $email = $this->input->post('email');
        $password = $this->input->post('password');

        $this->form_validation->set_rules('name', 'Name', 'required');
        $this->form_validation->set_rules('email', 'Email', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');
        if ($this->form_validation->run()) {
            $data = array(
                'name' => $username,
                'email' => $email,
                'password' => sha1($password),
            );
            $this->db->insert('users', $data);
            //$this->api_model->registerUser($data);
            $responseData = array(
                'status' => true,
                'message' => 'Successfully Registerd',
                'data' => []
            );
            return $this->response($responseData, 200);
        } else {
            $responseData = array(
                'status' => false,
                'message' => 'fill all the required fields',
                'data' => []
            );
            return $this->response($responseData);
        }
    }

    function login()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        $email = $param['user_name'];
        $password = $param['user_password'];
        // $email = $this->input->post('email');
        // $password = $this->input->post('password');

        // $email = $this->input->post('email');
        // $password = $this->input->post('password');  


        // $this->form_validation->set_rules('email','Email','required');
        // $this->form_validation->set_rules('password','Pasword','required');
        if ($email && $password) {
            $this->db->select('*');
            $this->db->where(['user_name' => $email,'user_password'=>$password]);
            $query = $this->db->get('user');
            return $this->response($query->result_array(), 200);
        } else {
            $responseData = array(
                'status' => false,
                'message' => 'Email Id and password is required',
                'data' => []
            );
            return $this->response($responseData);
        }
    }


}