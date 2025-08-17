<?php
// Lecture du fichier config.env
$lines = file(__DIR__ . '/../config.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0) continue; // ignorer les commentaires
    list($name, $value) = explode('=', $line, 2);
    putenv(trim($name) . '=' . trim($value));
}
