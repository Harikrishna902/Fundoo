<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class ProductModel extends CI_Model{
    /**
     * function to write query for get method
     */
    public function findall(){
        // $qe = "SELECT * FROM employees ";
       $data = $this->db->query("SELECT * FROM employees ")->result();
        print_r($data);
        foreach ($data as $record) {
            echo $record->id."   ";
            echo $record->name."   ";
            echo $record->salary."   ";
            echo $record->desg."\n";
            
            // echo $row['name']."<br />\n";
        }
    }
    /**
     * function to write query for get method
     */
    public function find($id){
       $data =  $this->db->query("SELECT * FROM employees WHERE id = '$id'")->row(); 
        // $this->db->where('id',$id);
        // return $this->db->get('product')->row();
        return $data;
       
    }
    /**
     * function to write query for post method
     */
    public function insert($data){
        print_r($data);
        $id = $data[0];
        $name = $data[1];
        $salary = $data[2];
        $desg = $data[3];
        $query = $this->db->query("INSERT INTO employees (id,name,salary,desg) VALUES ('" . $id . "','" . $name . "'," . $salary . ",'" . $desg . "')");
        ProductModel::queryRun($query);        
    }
    /**
     * function to write query for put method
     */
    public function update($id,$data){
        print_r($data);
        $name = $data[0];
        $salary = $data[1];
        $desg = $data[2];
        $query = $this->db->query("UPDATE employees SET name='".$name."', salary='".$salary."', desg='".$desg."' where id='".$id ."'");
        ProductModel::queryRun($query); 
    }
    /**
     * function to delete by id
     */
    public function delete($id){
        $query = $this->db->query("DELETE from employees where id='".$id ."'  ");
        ProductModel::queryRun($query);
    }
    /**
     * function to run query and return status to the user 
     * 
     * @return json the json data of the sql query 
     */
    public function queryRun($res)
    {
        
            if (is_bool($res))
                echo json_encode(array("status" => 200, "message" => "succes"), JSON_PRETTY_PRINT);
            else
                echo json_encode(array("status" => 200, "message" => "fail"), JSON_PRETTY_PRINT);
        
    }
}
?>