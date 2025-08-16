<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Charger la configuration
$config = include('../config/config_mail.php');

// Récupérer les données envoyées via la requête
$data = json_decode(file_get_contents("php://input"));
file_put_contents('data_received.txt', $data);
if (!empty($data->to) && !empty($data->subject) && !empty($data->message)) {

    // Préparer les données pour l'API Brevo
    $postData = [
        "sender" => [
            "name" => $config['brevo']['from_name'],
            "email" => $config['brevo']['from_email']
        ],
        "to" => [
            ["email" => $data->to]
        ],
        "subject" => $data->subject,
        "htmlContent" => $data->message
    ];

    // Initier cURL
    $ch = curl_init("https://api.brevo.com/v3/smtp/email");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "accept: application/json",
        "api-key: " . $config['brevo']['api_key'],
        "content-type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpcode == 201) {
        echo json_encode(["success" => true, "message" => "L'email a été envoyé avec succès via Brevo."]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'envoi via Brevo.", "response" => $response]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Données manquantes. Veuillez fournir 'to', 'subject', et 'message'."]);
}
?>
