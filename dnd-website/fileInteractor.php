<?php
// If GET variable(s) exist
if (sizeOf($_GET) > 0) {
    // - open questions and respond with question data
    $fileContent = file_get_contents("data.json");
    echo $fileContent;
} else {
    $myfile = fopen("data.json", "w") or die("Unable to open file!");
    fwrite($myfile, file_get_contents("php://input"));
    fclose($myfile);
}
