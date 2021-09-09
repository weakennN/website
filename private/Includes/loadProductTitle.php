<?php

use private\Classes\Database\UserManagement;
use private\Classes\Loader\ProductLoader\PTitleLoader;

if (isset($_GET["id"]) && UserManagement::doesProductExist($_GET["id"])) {
    $pTitleLoader = new PTitleLoader();
    $pTitleLoader->load($_GET["id"]);
}
