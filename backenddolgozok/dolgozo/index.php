<?php
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        require_once 'dolgozo/getdolgozo.php';
        break;
    case "POST":
        require_once 'dolgozo/postdolgozo.php';
        break;
    case "DELETE":
        require_once 'dolgozo/deletedolgozo.php';
        break;
    case "PUT":
        require_once 'dolgozo/putdolgozo.php';
        break;
    default:
        break;
}