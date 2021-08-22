<?php

include_once $_SERVER["HOME"] . "/private/AutoLoad/autoLoader.php";

$email = $_POST["email"];
$password = $_POST["password"];

$logger = new \private\Classes\LoginSystem\Logger(array(new \private\Classes\LoginSystem\Validators\LoginPasswordValidator($password, $email),
    new \private\Classes\LoginSystem\Validators\LoginEmailValidator($email)));

if ($logger->verify()) {
    $logger->logInUser($email, $password);
} else {
    // header("Location: " . $_SERVER['HTTP_REFERER']);
}
