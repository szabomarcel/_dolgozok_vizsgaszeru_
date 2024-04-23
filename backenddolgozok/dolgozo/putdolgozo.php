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
    $ber = $adatJSON->ber;
    require_once './databaseconnection.php';
    $sql = "UPDATE dolgozok SET neme=?, reszleg=?, belepesev=?, ber=? WHERE nev=?";
    $stml = $connection->prepare($sql);
    $stml->bind_param("ssiis", $neme, $reszleg, $belepesev, $ber, $nev);
    if($stml->execute()){
        http_response_code(201);
        echo "Sikeres módosítás";
    }else{
        http_response_code(404);
        echo "Sikertelen módosítás";
    }