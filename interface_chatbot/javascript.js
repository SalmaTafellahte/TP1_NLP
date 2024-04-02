function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");

    // Afficher le message de l'utilisateur dans la boîte de chat
    chatBox.innerHTML += '<div class="user-message">' + userInput + '</div>';

    // Envoyer le message à Rasa
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5005/webhooks/rest/webhook", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var botResponse = response[0].text;

            // Afficher la réponse du chatbot dans la boîte de chat
            chatBox.innerHTML += '<div class="bot-message">' + botResponse + '</div>';
            // Faire défiler vers le bas pour afficher la dernière réponse
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };

    var data = JSON.stringify({"message": userInput});
    xhr.send(data);

    // Effacer le champ de saisie après l'envoi du message
    document.getElementById("user-input").value = "";
}
