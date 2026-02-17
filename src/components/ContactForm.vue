<template>
  <div class="formulaire-contact">
    <h1>Contactez-nous</h1>
    <p class="sous-titre">Une question ? Écrivez-nous !</p>

    <!-- Message de succès -->
    <div v-if="messageSucces" class="succes">
      ✅ Votre message a été envoyé avec succès !
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="envoyerFormulaire" class="form">

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
          placeholder="votre@email.com"
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
          placeholder="Minimum 20 caractères..."
        ></textarea>
        <p class="compteur">{{ message.length }} / 20 caractères minimum</p>
        <p v-if="erreurMessage" class="erreur">{{ erreurMessage }}</p>
      </div>

      <!-- Bouton d'envoi -->
      <button
        type="submit"
        :disabled="!formulaireValide || enCoursEnvoi"
        class="btn-envoyer"
      >
        {{ enCoursEnvoi ? 'Envoi en cours...' : 'Envoyer le message' }}
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Données du formulaire
const nom = ref('')
const email = ref('')
const sujet = ref('')
const message = ref('')

// Messages d'erreur
const erreurNom = ref('')
const erreurEmail = ref('')
const erreurSujet = ref('')
const erreurMessage = ref('')

// États
const enCoursEnvoi = ref(false)
const messageSucces = ref(false)

// Vérification du nom (minimum 2 caractères)
function verifierNom() {
  if (nom.value.length === 0) {
    erreurNom.value = ''
  } else if (nom.value.length < 2) {
    erreurNom.value = 'Le nom doit avoir au moins 2 caractères'
  } else {
    erreurNom.value = ''
  }
}

// Vérification de l'email
function verifierEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (email.value.length === 0) {
    erreurEmail.value = ''
  } else if (!regex.test(email.value)) {
    erreurEmail.value = 'Email invalide'
  } else {
    erreurEmail.value = ''
  }
}

// Vérification du message (minimum 20 caractères)
function verifierMessage() {
  if (message.value.length === 0) {
    erreurMessage.value = ''
  } else if (message.value.length < 20) {
    erreurMessage.value = `Il manque ${20 - message.value.length} caractères`
  } else {
    erreurMessage.value = ''
  }
}

// Computed : est-ce que le formulaire est complet ?
const formulaireValide = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return (
    nom.value.length >= 2 &&
    regex.test(email.value) &&
    sujet.value !== '' &&
    message.value.length >= 20
  )
})

// Sauvegarder les données dans un fichier JSON
function sauvegarderJSON() {
  const contact = {
    nom: nom.value,
    email: email.value,
    sujet: sujet.value,
    message: message.value,
    date: new Date().toLocaleString('fr-FR')
  }

  const json = JSON.stringify(contact, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const lien = document.createElement('a')
  lien.href = URL.createObjectURL(blob)
  lien.download = `contact-${Date.now()}.json`
  lien.click()
}

// Envoi du formulaire
async function envoyerFormulaire() {
  // Revérifier les champs
  verifierNom()
  verifierEmail()
  verifierMessage()

  if (sujet.value === '') {
    erreurSujet.value = 'Veuillez choisir un sujet'
    return
  } else {
    erreurSujet.value = ''
  }

  if (!formulaireValide.value) return

  enCoursEnvoi.value = true
  messageSucces.value = false

  try {
    // Simulation d'un envoi (2 secondes)
    await new Promise(resolve => setTimeout(resolve, 2000))

    sauvegarderJSON()

    messageSucces.value = true

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      viderFormulaire()
    }, 3000)

  } catch (erreur) {
    alert('Une erreur est survenue')
    console.error(erreur)
  } finally {
    enCoursEnvoi.value = false
  }
}

// Réinitialiser le formulaire
function viderFormulaire() {
  nom.value = ''
  email.value = ''
  sujet.value = ''
  message.value = ''
  erreurNom.value = ''
  erreurEmail.value = ''
  erreurSujet.value = ''
  erreurMessage.value = ''
  messageSucces.value = false
}
</script>

<style scoped>
.formulaire-contact {
  max-width: 650px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

h1 {
  text-align: center;
  color: #6c5ce7;
  margin-bottom: 8px;
  font-size: 1.8rem;
}

.sous-titre {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

/* Message de succès */
.succes {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  text-align: center;
  font-weight: bold;
}

/* Formulaire */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #333;
  font-size: 0.95rem;
}

input,
select,
textarea {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #6c5ce7;
}

textarea {
  resize: vertical;
  min-height: 130px;
}

.compteur {
  font-size: 0.8rem;
  color: #999;
  text-align: right;
}

.erreur {
  color: #dc3545;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Bouton */
.btn-envoyer {
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.btn-envoyer:hover:not(:disabled) {
  background-color: #5b4ccc;
}

.btn-envoyer:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .formulaire-contact {
    padding: 25px;
    margin: 0 10px;
  }
}
</style>