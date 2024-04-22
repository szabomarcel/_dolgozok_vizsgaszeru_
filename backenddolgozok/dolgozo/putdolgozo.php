<?php
$putadat = fopen('php://input', "r");
$raw_data = "";
while($chunk = fread($putadat, 1024)){
    $raw_data .=$chunk;
}
fclose($putadat);
$adatJSON = json_decode($raw_data);
$nev = $adatJSON->nev;
$neme = $adatJSON->neme;
$reszleg = $adatJSON->reszleg;
$belepesev = $adatJSON->belepesev;
$reszleg = $adatJSON->reszleg;
require_once './databaseconnection.php';
$sql = "UPDATE `dolgozok` SET `nev`='?',`neme`='?',`reszleg`='?',`belepesev`='?',`ber`='?' WHERE 1";
$stml = $connection->prepare($sql);
$stml->bind_param("sssss", $neme, $reszleg, $belepesev, $ber, $nev);
if($stml->execute()){
    http_response_code(201);
    echo "Sikeres módosítás";
}else{
    http_response_code(404);
    echo "Sikertelen módosítás";
}