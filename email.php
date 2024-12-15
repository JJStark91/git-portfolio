<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Adresse e-mail de destination
    $to = "jeanjulesamela@gmail.com";

    // Sujet de l'email
    $email_subject = "Nouveau message de contact : " . $subject;

    // Contenu de l'email
    $email_body = "Vous avez reçu un nouveau message.\n\n";
    $email_body .= "Nom : $name\n";
    $email_body .= "Email : $email\n";
    $email_body .= "Message :\n$message\n";

    // En-têtes
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";

    // Envoi de l'email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi du message.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
