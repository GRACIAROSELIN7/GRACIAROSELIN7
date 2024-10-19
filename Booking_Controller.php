<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

class Booking_Controller extends RestApi_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('api_auth');
        $this->load->model('api_model');
    }

    function getbooking()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['isVendor']) {
            $query = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id where b.servicedBy=0 or b.servicedBy={$param['user_id']}");
        } else {
            $query = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id where b.user_id={$param['user_id']}");
        }
        return $this->response($query->result_array(), 200);
    }

    function addbooking()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
       
        $type=$param['type'];
        $category=$param['category'];
        $bookeddate=$param['bookeddate'];
        $contactnumber=$param['contactnumber'];
        $contactname=$param['contactname'];
        $closedDate=null;
        $description=$param['description'];
        $location=$param['location'];


        $data = array(
            'type'=>$param['type'],
            'category'=>$param['category'],
            'bookeddate'=>$param['bookeddate'],
            'contactnumber'=>$param['contactnumber'],
            'contactname'=>$param['contactname'],
            'closedDate'=>null,
            'description'=>$param['description'],
            'location'=>$param['location'],
            'user_id'=>$param['user_id']
        );
        $this->db->insert('booking',$data);
       
        $query = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id");
        return $this->response($query->result_array(), 200);
    }

    function bookingAcceept()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['user_id']) {
            $data = array(
                'servicedBy'=>$param['user_id']
            );
            $this->db->where('id',$param['id']);
            $query = $this->db->update('booking',$data);
        }
        $query1 = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id");
        return $this->response($query1->result_array(), 200);
    }

    function bookingClosed()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['id']) {
            $data = array(
                'isClosed'=>true,
                'closedDate'=>$param['closedDate']
            );
            $this->db->where('id',$param['id']);
            $query = $this->db->update('booking',$data);
        }
        $query1 = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id");
        return $this->response($query1->result_array(), 200);
    }



    function bookingCancel()
    {
        $param = (array) json_decode(file_get_contents("php://input"));
        // print_r($param);
        if ($param['id']) {
            $data = array(
                'id'=>$param['id']
            );
            $this->db->where('id',$param['id']);
            $query = $this->db->delete('booking',$data);
        }
        $query1 = $this->db->query("SELECT * FROM booking as b left join user as u on b.servicedBy = u.user_id");
        return $this->response($query1->result_array(), 200);
    }
}