<?php
$sql = '';
if(count($keresdolgozo) > 1){
    if(is_int(intval($keresdolgozo))){
        $sql = 'DELETE FROM `dolgozok` WHERE nev=' .$keresdolgozo[1];
    }else{
        http_response_code(404);
        echo 'Nem létező futár';
    }
}
require_once './databaseconnection.php';
$result = $connection->query($sql);
if($result->num_rows > 0){
    $dolgozok = array();
    http_response_code(200);
    echo json_encode($dolgozok);
}else{
    http_response_code(404);
    echo ' Nincs egy ügyfel sem';
}