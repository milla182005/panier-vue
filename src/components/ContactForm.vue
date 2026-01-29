<template>
  <div class="contact-container">
    <h1>Contactez-nous</h1>
    <p class="subtitle">Une question ? Un problème ? N'hésitez pas à nous écrire !</p>

    <!-- Message de succès -->
    <div v-if="messageSuccess" class="success-box">
      <p>Votre message a été envoyé avec succès !</p>
    </div>

    <!-- Le formulaire -->
    <form @submit.prevent="envoyerFormulaire" class="formulaire">
      
      <!-- Nom -->
      <div class="champ">
        <label>Nom *</label>
        <input 
          type="text" 
          v-model="nom"
          @input="verifierNom"
          placeholder="Votre nom"
        />
        <p v-if="erreurNom" class="erreur">{{ erreurNom }}</p>
      </div>

      <!-- Email -->
      <div class="champ">
        <label>Email *</label>
        <input 
          type="email" 
          v-model="email"
          @input="verifierEmail"
          placeholder="votre.email@exemple.com"
        />
        <p v-if="erreurEmail" class="erreur">{{ erreurEmail }}</p>
      </div>

      <!-- Sujet -->
      <div class="champ">
        <label>Sujet *</label>
        <select v-model="sujet">
          <option value="">-- Choisissez un sujet --</option>
          <option value="Question sur un produit">Question sur un produit</option>
          <option value="Problème de commande">Problème de commande</option>
          <option value="Demande de partenariat">Demande de partenariat</option>
          <option value="Bug technique">Bug technique</option>
          <option value="Autre">Autre</option>
        </select>
        <p v-if="erreurSujet" class="erreur">{{ erreurSujet }}</p>
      </div>

      <!-- Message -->
      <div class="champ">
        <label>Message *</label>
        <textarea 
          v-model="message"
          @input="verifierMessage"
          rows="6"
          placeholder="Écrivez votre message ici (minimum 20 caractères)..."
        ></textarea>
        <p class="compteur">{{ message.length }} / 20 caractères minimum</p>
        <p v-if="erreurMessage" class="erreur">{{ erreurMessage }}</p>
      </div>

      <!-- Bouton -->
      <button 
        type="submit" 
        :disabled="!formulaireValide || enCoursEnvoi"
        class="bouton-envoyer"
      >
        {{ enCoursEnvoi ? '📤 Envoi en cours...' : '📨 Envoyer le message' }}
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Les données du formulaire
const nom = ref('')
const email = ref('')
const sujet = ref('')
const message = ref('')

// Les erreurs
const erreurNom = ref('')
const erreurEmail = ref('')
const erreurSujet = ref('')
const erreurMessage = ref('')

// États
const enCoursEnvoi = ref(false)
const messageSuccess = ref(false)

// Vérifier le nom (minimum 2 caractères)
function verifierNom() {
  if (nom.value.length === 0) {
    erreurNom.value = ''
  } else if (nom.value.length < 2) {
    erreurNom.value = 'Le nom doit avoir au moins 2 caractères'
  } else {
    erreurNom.value = ''
  }
}

// Vérifier l'email
function verifierEmail() {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (email.value.length === 0) {
    erreurEmail.value = ''
  } else if (!regexEmail.test(email.value)) {
    erreurEmail.value = 'Veuillez entrer un email valide'
  } else {
    erreurEmail.value = ''
  }
}

// Vérifier le message (minimum 20 caractères)
function verifierMessage() {
  if (message.value.length === 0) {
    erreurMessage.value = ''
  } else if (message.value.length < 20) {
    erreurMessage.value = `Il manque ${20 - message.value.length} caractères`
  } else {
    erreurMessage.value = ''
  }
}

// Vérifier si tout le formulaire est valide
const formulaireValide = computed(() => {
  return (
    nom.value.length >= 2 &&
    email.value.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
    sujet.value !== '' &&
    message.value.length >= 20
  )
})

// Sauvegarder dans un fichier JSON
function sauvegarderJSON() {
  const contact = {
    nom: nom.value,
    email: email.value,
    sujet: sujet.value,
    message: message.value,
    date: new Date().toLocaleString('fr-FR')
  }

  const jsonTexte = JSON.stringify(contact, null, 2)
  
  const blob = new Blob([jsonTexte], { type: 'application/json' })
  const lien = document.createElement('a')
  lien.href = URL.createObjectURL(blob)
  lien.download = `contact-${Date.now()}.json`
  lien.click()
}

// Envoyer le formulaire
async function envoyerFormulaire() {
  verifierNom()
  verifierEmail()
  verifierMessage()
  
  // Vérifier le sujet
  if (sujet.value === '') {
    erreurSujet.value = 'Veuillez choisir un sujet'
    return
  } else {
    erreurSujet.value = ''
  }

  // Si le formulaire n'est pas valide on arrête
  if (!formulaireValide.value) {
    return
  }

  // Simulation envoi
  enCoursEnvoi.value = true
  messageSuccess.value = false

  try {
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Sauvegarder dans un fichier JSON
    sauvegarderJSON()
    
    // Afficher le message de succès
    messageSuccess.value = true
    
    // Attendre 3 secondes puis réinitialiser le formulaire
    setTimeout(() => {
      viderFormulaire()
    }, 3000)
    
  } catch (erreur) {
    alert('Une erreur est survenue lors de l\'envoi du message')
    console.error(erreur)
  } finally {
    enCoursEnvoi.value = false
  }
}

// Vider le formulaire
function viderFormulaire() {
  nom.value = ''
  email.value = ''
  sujet.value = ''
  message.value = ''
  
  erreurNom.value = ''
  erreurEmail.value = ''
  erreurSujet.value = ''
  erreurMessage.value = ''
  
  messageSuccess.value = false
}
</script>

<style scoped>
.contact-container {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(123, 74, 226, 0.15);
}

h1 {
  text-align: center;
  color: #7b4ae2;
  margin-bottom: 10px;
  font-size: 32px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

/* Message de succès */
.success-box {
  background: linear-gradient(135deg, #7b4ae2 0%, #5e35c7 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-box p {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

/* Formulaire */
.formulaire {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.champ {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 15px;
}

input,
select,
textarea {
  padding: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Segoe UI', sans-serif;
  transition: all 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #7b4ae2;
  box-shadow: 0 0 0 3px rgba(123, 74, 226, 0.1);
}

textarea {
  resize: vertical;
  min-height: 140px;
}

/* Compteur de caractères */
.compteur {
  font-size: 13px;
  color: #999;
  margin-top: 5px;
  text-align: right;
}

/* Messages d'erreur */
.erreur {
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
}

/* Bouton */
.bouton-envoyer {
  background: linear-gradient(135deg, #7b4ae2 0%, #5e35c7 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.bouton-envoyer:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(123, 74, 226, 0.4);
}

.bouton-envoyer:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    margin: 20px;
    padding: 30px;
  }
  
  h1 {
    font-size: 26px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>