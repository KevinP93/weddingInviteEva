const weddingDate = new Date(2026, 4, 8, 13, 30, 0);
function updateCountdown() {
    const now = new Date();
    const totalMs = weddingDate - now;

    if (totalMs <= 0) {
        document.getElementById('daysCounter').textContent = '0';
        document.getElementById('hoursCounter').textContent = '0';
        document.getElementById('minutesCounter').textContent = '0';
        return;
    }

    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    document.getElementById('daysCounter').textContent = days;
    document.getElementById('hoursCounter').textContent = hours;
    document.getElementById('minutesCounter').textContent = minutes;
}

// Mets à jour l'affichage toutes les 30 secondes
setInterval(updateCountdown, 30000);
updateCountdown(); 

// Language data
const translations = {
    fr: {
        openInvitation: "Vous avez une invitation",
        clickToOpen: "Cliquez ci-dessous pour ouvrir l'invitation de mariage",
        open: "Ouvrir",
        saveTheDate: "Réservez la date",
        wereGettingMarried: "Nous nous marions!",
        weddingDate: "08 mai 2026",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        churchLocation: "Emplacement de l'église",
        receptionLocation: "Emplacement de la réception",
        rsvp: "Confirmation de présence",
        theCouple: "Le Couple",
        theGroom: "Le Marié",
        kevinBio: "Wendy est impatient de celebrer cette belle journee avec ses proches.",
        theBride: "La Mariée",
        gabriellaBio: "Eva Nwge a hâte de partager ce moment unique avec sa famille et ses amis.",
        weddingSchedule: "Programme du Mariage",
        ceremony: "Cérémonie",
        ceremonyTime: "13h30",
        churchName: "Église",
        churchAddress: "26 avenue Jacques Anquetil 95190 Goussainville",
        cocktailHour: "Vin d'honneur",
        cocktailTime: "18h00",
        restaurantName: "Les Salons d'Elyssa",
        restaurantAddress: "4 rue Louis Braille 77178 Saint-Pathus",
        reception: "Réception",
        receptionTime: "20h00",
        rsvpForm: "Formulaire RSVP",
        firstName: "Prénom",
        lastName: "Nom de famille",
        phoneNumber: "Numéro de téléphone",
        numberOfAttendees: "Nombre de participants",
        selectNumber: "Sélectionnez un nombre",
        additionalGuestsLabel: "Noms des invités supplémentaires",
        submitRsvp: "Soumettre RSVP",
        declineRsvp: "Je ne viens pas",
        thankYou: "Merci!",
        rsvpConfirmed: "Votre RSVP a été confirmé. Nous avons hâte de célébrer avec vous!",
        rsvpDeclined: "Nous sommes tristes de ne pas vous voir ce jour-là.",
        close: "Fermer",
        thankYouForCelebrating: "Merci de célébrer avec nous!",
    },
    pt: {
        openInvitation: "Recebeu um convite",
        clickToOpen: "Clique abaixo para abrir o convite de casamento",
        open: "Abrir",
        saveTheDate: "Reserve a Data",
        wereGettingMarried: "Nós vamos nos casar!",
        weddingDate: "08 de maio de 2026",
        days: "Dias",
        hours: "Horas",
        minutes: "Minutos",
        churchLocation: "Local da Cerimônia",
        receptionLocation: "Local da Recepção",
        rsvp: "Confirmar Presença",
        theCouple: "O Casal",
        theGroom: "O Noivo",
        kevinBio: "Wendy mal pode esperar para celebrar este dia especial com todos.",
        theBride: "A Noiva",
        gabriellaBio: "Eva Nwge está ansiosa para viver este momento inesquecível com a família e os amigos.",
        weddingSchedule: "Programa do Casamento",
        ceremony: "Cerimônia",
        ceremonyTime: "13:30",
        churchName: "Igreja",
        churchAddress: "26 avenue Jacques Anquetil 95190 Goussainville",
        cocktailHour: "Vinho de honra",
        cocktailTime: "18:00",
        restaurantName: "Les Salons d'Elyssa",
        restaurantAddress: "4 rue Louis Braille 77178 Saint-Pathus",
        reception: "Recepção",
        receptionTime: "20:00",
        rsvpForm: "Formulário RSVP",
        firstName: "Primeiro Nome",
        lastName: "Sobrenome",
        phoneNumber: "Número de Telefone",
        numberOfAttendees: "Número de Convidados",
        selectNumber: "Selecione um número",
        additionalGuestsLabel: "Nomes dos convidados adicionais",
        submitRsvp: "Enviar Confirmação",
        declineRsvp: "Não posso vir",
        thankYou: "Obrigado!",
        rsvpConfirmed: "Sua confirmação foi recebida. Estamos ansiosos para celebrar com você!",
        rsvpDeclined: "Estamos tristes por não podermos celebrar com você nesse dia.",
        close: "Fechar",
        thankYouForCelebrating: "Obrigado por celebrar conosco!",
        contactInfoPrefix: "Para qualquer dúvida ou RSVP, entre em contato conosco em "
    }
};

let currentLanguage = 'fr';

const EMAILJS_PUBLIC_KEY = 'oonFNHC8cWMgY602n';
const EMAILJS_SERVICE_ID = 'service_6cg8nrq';
const EMAILJS_TEMPLATE_ID = 'template_x9zsf4p';
const RSVP_EMAIL = 'ladyva95@hotmail.fr';
const RSVP_CONFIRM_SUBJECT = '[ Réponse mariage POSITIVE]';
const RSVP_DECLINE_SUBJECT = '[ Réponse mariage NEGATIVE ]';

// DOM Elements
const envelopeScreen = document.getElementById('envelopeScreen');
const mainContent = document.getElementById('mainContent');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const churchBtn = document.getElementById('churchBtn');
const restaurantBtn = document.getElementById('restaurantBtn');
const rsvpBtn = document.getElementById('rsvpBtn');
const rsvpModal = document.getElementById('rsvpModal');
const closeRsvpModal = document.getElementById('closeRsvpModal');
const rsvpForm = document.getElementById('rsvpForm');
const declineButton = document.getElementById('declineButton');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const successMessage = document.getElementById('successMessage');
const attendeesSelect = document.getElementById('attendees');
const additionalGuestsContainer = document.getElementById('additionalGuestsContainer');
const additionalGuestsField = document.getElementById('additionalGuests');

const activeModals = new Set();
const updateBodyScrollLock = () => {
    if (activeModals.size > 0) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
};

const isEmailJsConfigured = () => (
    EMAILJS_PUBLIC_KEY && !EMAILJS_PUBLIC_KEY.includes('YOUR_EMAILJS_PUBLIC_KEY') &&
    EMAILJS_SERVICE_ID && !EMAILJS_SERVICE_ID.includes('YOUR_EMAILJS_SERVICE_ID') &&
    EMAILJS_TEMPLATE_ID && !EMAILJS_TEMPLATE_ID.includes('YOUR_EMAILJS_TEMPLATE_ID')
);

let emailJsReady = false;

document.addEventListener('DOMContentLoaded', () => {

    updateLanguage('fr');

    if (typeof emailjs !== 'undefined' && isEmailJsConfigured()) {
        try {
            emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });
            emailJsReady = true;
        } catch (error) {
            console.error('Unable to initialize EmailJS:', error);
        }
    } else {
        console.warn('EmailJS SDK missing or configuration incomplete. RSVP emails will not be sent until configured.');
    }

    if (openEnvelopeBtn && envelopeScreen && mainContent) {
        openEnvelopeBtn.addEventListener('click', () => {
            const envelope = document.querySelector('.card-envelope');
            if (envelope) {
                envelope.classList.add('open');
            }
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                mainContent.classList.add('show');
            }, 800);
        });
    }

    if (churchBtn) {
        churchBtn.addEventListener('click', () => {
            window.open('https://www.google.com/maps/search/?api=1&query=26+avenue+Jacques+Anquetil+95190+Goussainville', '_blank');
        });
    }

    if (restaurantBtn) {
        restaurantBtn.addEventListener('click', () => {
            window.open('https://www.google.com/maps/search/?api=1&query=les+salons+d%27elyssa+4+rue+Louis+Braille+77178+Saint-Pathus', '_blank');
        });
    }

    // RSVP modal
    rsvpBtn.addEventListener('click', () => {
        showModal(rsvpModal);
    });

    closeRsvpModal.addEventListener('click', () => {
        hideModal(rsvpModal);
    });

    if (attendeesSelect) {
        attendeesSelect.addEventListener('change', handleAttendeesChange);
        handleAttendeesChange();
    }

    // RSVP form submission
    const handleRsvpSubmission = async (declined) => {
        const formData = new FormData(rsvpForm);
        const firstName = (formData.get('firstName') || '').trim();
        const lastName = (formData.get('lastName') || '').trim();
        const phone = (formData.get('phone') || '').trim();
        const attendeesValue = formData.get('attendees') || '';
        const attendeesCount = parseInt(attendeesValue, 10);
        const additionalGuests = (formData.get('additionalGuests') || '').trim();
        const submitButton = rsvpForm.querySelector('button[type="submit"]');

        [submitButton, declineButton].forEach(button => {
            if (button) {
                button.disabled = true;
            }
        });

        if (!emailJsReady || typeof emailjs === 'undefined') {
            const setupMessage = currentLanguage === 'fr'
                ? "La configuration EmailJS n'est pas terminée. Merci d'ajouter vos identifiants EmailJS pour activer le formulaire."
                : 'A configuração do EmailJS não está concluída. Adicione suas credenciais do EmailJS para ativar o formulário.';
            alert(setupMessage);
            [submitButton, declineButton].forEach(button => {
                if (button) {
                    button.disabled = false;
                }
            });
            return;
        }

        function formatFrenchDate() {
            const now = new Date();
            return now.toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Paris"
            }).replace(",", " à");
        }

        const payload = {
            prenom: firstName,
            nom: lastName,
            telephone: phone,
            nombre_participants: attendeesValue,
            presence: declined ? 'non' : 'oui',
            subject: declined ? RSVP_DECLINE_SUBJECT : RSVP_CONFIRM_SUBJECT,
            to_email: RSVP_EMAIL,
            to: RSVP_EMAIL,
            email: RSVP_EMAIL,
            recipient: RSVP_EMAIL,
            recipient_email: RSVP_EMAIL,
            reply_to: RSVP_EMAIL,
            message: declined
                ? 'RSVP négatif - l\'invité a indiqué ne pas venir.'
                : 'RSVP positif - l\'invité a confirmé sa présence.',
                
            timestamp: new Date().toISOString()
        };

        if (!Number.isNaN(attendeesCount) && attendeesCount > 1) {
            payload.invites_supplementaires = additionalGuests || 'Non précisé';
        } else {
            payload.invites_supplementaires = 'Aucun';
        }

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);

            const successMessageKey = declined ? 'rsvpDeclined' : 'rsvpConfirmed';
            const translationsForLang = translations[currentLanguage] || {};
            if (successMessage && translationsForLang[successMessageKey]) {
                successMessage.setAttribute('data-lang-key', successMessageKey);
                successMessage.textContent = translationsForLang[successMessageKey];
            }

            hideModal(rsvpModal);
            setTimeout(() => {
                showModal(successModal);
                rsvpForm.reset();
                handleAttendeesChange();
            }, 300);
        } catch (error) {
            console.error('RSVP submission error:', error);
            const errorMessage = currentLanguage === 'fr'
                ? "Impossible d'envoyer votre réponse pour le moment. Merci de réessayer plus tard."
                : 'Não foi possível enviar a sua resposta. Tente novamente mais tarde.';
            alert(errorMessage);
        } finally {
            [submitButton, declineButton].forEach(button => {
                if (button) {
                    button.disabled = false;
                }
            });
        }
    };

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleRsvpSubmission(false);
    });

    if (declineButton) {
        declineButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formIsValid = typeof rsvpForm.reportValidity === 'function'
                ? rsvpForm.reportValidity()
                : rsvpForm.checkValidity();
            if (!formIsValid) {
                return;
            }
            handleRsvpSubmission(true);
        });
    }

    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', () => {
            hideModal(successModal);
        });
    }

    [rsvpModal, successModal].forEach(modal => {
        if (!modal) {
            return;
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
});


// Update language across the site
function updateLanguage(lang) {
    currentLanguage = translations[lang] ? lang : 'fr';

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
}

function handleAttendeesChange() {
    if (!attendeesSelect || !additionalGuestsContainer || !additionalGuestsField) {
        return;
    }

    const count = parseInt(attendeesSelect.value, 10);

    if (!Number.isNaN(count) && count > 1) {
        additionalGuestsContainer.classList.remove('hidden');
        additionalGuestsField.required = true;
    } else {
        additionalGuestsContainer.classList.add('hidden');
        additionalGuestsField.required = false;
        additionalGuestsField.value = '';
    }
}

// Show modal with animation
function showModal(modal) {
    activeModals.add(modal);
    updateBodyScrollLock();
    modal.classList.remove('hidden');
    setTimeout(() => {
        const modalContent = modal.querySelector('div > div');
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

// Hide modal with animation
function hideModal(modal) {
    const modalContent = modal.querySelector('div > div');
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
        activeModals.delete(modal);
        updateBodyScrollLock();
    }, 300);
}

