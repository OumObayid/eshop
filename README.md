[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) 
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/) 
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

# 🛒 eShop

**eShop** est une **plateforme e-commerce moderne** permettant aux utilisateurs de parcourir et d’acheter des produits en ligne facilement.  
Avec des filtres avancés et une recherche rapide, les utilisateurs trouvent exactement ce qu’ils souhaitent en quelques clics.

---

## ✨ Fonctionnalités principales

- 🔍 **Navigation et recherche** : filtres avancés (catégorie, prix, popularité) et barre de recherche  
- 🛒 **Panier** : ajouter, modifier et supprimer des produits avant la commande  
- ❤️ **Produits favoris** : créer une liste personnalisée de produits favoris  
- 📝 **Passage de commandes** : finaliser l’achat rapidement  
- 💳 **Paiement sécurisé** : paiement en ligne par carte bancaire via Stripe/Node.js  
- 👤 **Compte utilisateur** : suivi de l’historique des commandes et gestion des favoris  
- 📊 **Suivi des commandes** : consultation du statut des commandes passées  
- 📱 **Interface responsive** : compatible avec ordinateurs, tablettes et mobiles  

---

## 🛠 Installation et configuration

### 1️⃣ Cloner le projet
git clone https://github.com/OumObayid/eshop.git

### 2️⃣ Installer le front-end (React)
cd eshop

npm install
npm start
- Accessible à : `http://localhost:3000`

### 3️⃣ Configurer le back-end (PHP / XAMPP)
1. Copier `apiEmail/config/config_mail.php` **propre**  
2. Créer `apiEmail/config.env` avec la clé Sendinblue :  
SENDINBLUE_API_KEY=ta_clef_envoyée_par_Brevo
3. Vérifier que `config.env` est dans `.gitignore`  

### 4️⃣ Lancer le back-end
- Démarrer XAMPP ou serveur PHP local  
- Vérifier que `apiEmail/` est accessible via `http://localhost`  

---

## 🚀 Utilisation

- Ouvrir `http://localhost:3000` dans le navigateur  
- Parcourir les produits, ajouter au panier ou aux favoris  
- Passer commande et payer via carte bancaire  
- Créer un compte pour suivre l’historique et gérer les favoris  

### Exemple de code PHP pour la config mail
`<?php 
   return [ 
         'brevo' => [ 
                   'api_key' => getenv("SENDINBLUE_API_KEY"), 
                   'from_email' => 'elobayidoumaima@gmail.com', 
                   'from_name' => 'eShop.ma' 
                   ] 
          ];` 
          
### Exemple de commande pour React 
``` npm install npm start ``` 

## 🌐 Site en ligne Visitez le site eShop : 
   [https://ton-site-heberge.com](https://ton-site-heberge.com) 
   
## 👨‍💻 Auteur :
    - **Oumaima El Obayid** 
    - Email : elobayidoumaima@gmail.com --- 
## ⚠️ Notes importantes 
    - ❌ Ne jamais pousser `config.env` ou `config_mail.php` avec la clé en dur 
    - 🔒 Toutes les clés API doivent être stockées dans `config.env` et ignorées par Git (`.gitignore`) --- 💡
