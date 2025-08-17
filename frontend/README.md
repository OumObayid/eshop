🛒 eShop

eShop est une plateforme e-commerce moderne permettant aux utilisateurs de parcourir et d’acheter des produits en ligne facilement.
Avec des filtres avancés et une recherche rapide, les utilisateurs trouvent exactement ce qu’ils souhaitent en quelques clics.

✨ Fonctionnalités principales

🔍 Navigation et recherche : filtres avancés (catégorie, prix, popularité) et barre de recherche

🛒 Panier : ajouter, modifier et supprimer des produits avant la commande

❤️ Produits favoris : créer une liste personnalisée de produits favoris

📝 Passage de commandes : finaliser l’achat rapidement

💳 Paiement sécurisé : paiement en ligne par carte bancaire

👤 Compte utilisateur : suivi de l’historique des commandes et gestion des favoris

📊 Suivi des commandes : consultation du statut des commandes passées

📱 Interface responsive : compatible avec ordinateurs, tablettes et mobiles

🛠 Installation et configuration
1️⃣  Cloner le projet
git clone https://github.com/OumObayid/eshop.git
cd eshop

2️⃣  Installer le front-end (React)
cd eshop
npm install
npm start


Accessible à : http://localhost:3000

3️⃣  Configurer le back-end (PHP / XAMPP)

Copier apiEmail/config/config_mail.php propre

Créer apiEmail/config.env avec la clé Sendinblue :

SENDINBLUE_API_KEY=ta_clef_envoyée_par_Brevo


Vérifier que config.env est dans .gitignore

4️⃣  Lancer le back-end

Démarrer XAMPP ou serveur PHP local

Vérifier que apiEmail/ est accessible via http://localhost

🚀 Utilisation

Ouvrir http://localhost:3000

Parcourir les produits, ajouter au panier ou aux favoris

Passer commande et payer via carte bancaire

Créer un compte pour suivre l’historique et gérer les favoris

🌐 Site en ligne

Visitez le site eShop : https://ton-site-heberge.com

👨‍💻 Auteur

Mustapha El-Houbeit

Email : elobayidoumaima@gmail.com

⚠️ Notes importantes

❌ Ne jamais pousser config.env ou config_mail.php avec la clé en dur

🔒 Toutes les clés API doivent être stockées dans config.env et ignorées par Git (.gitignore)