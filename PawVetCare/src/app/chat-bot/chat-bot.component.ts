import { Component, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'app-chat-bot',
    templateUrl: './chat-bot.component.html',
    styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements AfterViewChecked {
    messages: { text: string, type: 'user' | 'bot', options?: { text: string, link?: string, action?: () => void }[] }[] = [];
    userInput: { name: string, phone: string, email: string, query: string } = { name: '', phone: '', email: '', query: '' };
    inputDisabled: boolean = true; // Campo de texto inicialmente deshabilitado
    nameReceived: boolean = false;
    emailReceived: boolean = false;
    phoneReceived: boolean = false;

    constructor() {
        this.showInitialOptions();
    }

    ngAfterViewChecked() {
        this.scrollToBottom(); // Llamamos a la función de scroll cada vez que se actualiza el componente
    }

    showInitialOptions() {
        this.messages.push({
            text: 'Wauw, ¡hola humano! ¿Qué necesitas? Selecciona una opción:',
            type: 'bot',
            options: [
                { text: 'Saber más sobre nuestros servicios', link: 'http://localhost:4200/home' },
                { text: 'Conocer al equipo (Miaw)', link: 'http://localhost:4200/equipo' },
                { text: 'Otras consultas', action: () => this.showOtherOptions() }
            ]
        });
    }

    showOtherOptions() {
        this.messages.push({
            text: 'Miaw, elige una opción:',
            type: 'bot',
            options: [
                { text: 'Iniciar Sesión', action: () => this.showLoginOptions() },
                { text: 'Otra consulta (Wauw)', action: () => this.showConsultationForm() },
                { text: 'Volver al menú principal', action: () => this.resetToMainMenu() },
            ]
        });
    }

    showLoginOptions() {
        this.messages.push({
            text: '¿Cómo deseas iniciar sesión? Wuff, ¡elige una opción!',
            type: 'bot',
            options: [
                { text: '¡Ya cuido a mi Mascota!', link: 'http://localhost:4200/iniciarSesion/cliente' },
                { text: '¡Soy Vet!', link: 'http://localhost:4200/iniciarSesion/veterinario' },
                { text: '¡Soy Admin!', link: 'http://localhost:4200/iniciarSesion/administrador' }
            ]
        });
    }

    showConsultationForm() {
        this.messages.push({
            text: 'Por favor, ingresa tu nombre:',
            type: 'bot'
        });
        this.inputDisabled = false; // Habilitar el campo de texto para ingresar nombre
    }

    handleNameInput() {
        if (this.userInput.name.trim() !== '') {
            this.messages.push({
                text: this.userInput.name, // El nombre del usuario se agrega como mensaje
                type: 'user'
            });
            this.messages.push({
                text: `Gracias ${this.userInput.name}, ahora ingresa tu correo electrónico:`,
                type: 'bot'
            });
            this.nameReceived = true;
            this.inputDisabled = false; // Habilitar el campo de correo
        } else {
            this.messages.push({
                text: 'Por favor, ingresa tu nombre.',
                type: 'bot'
            });
        }
    }

    handleEmailInput() {
        if (this.userInput.email.trim() !== '') {
            this.messages.push({
                text: this.userInput.email, // El correo del usuario se agrega como mensaje
                type: 'user'
            });
            this.messages.push({
                text: `Genial, ahora ingresa tu número de teléfono:`,
                type: 'bot'
            });
            this.emailReceived = true;
            this.inputDisabled = false; // Habilitar el campo de teléfono
        } else {
            this.messages.push({
                text: 'Por favor, ingresa tu correo electrónico.',
                type: 'bot'
            });
        }
    }

    handlePhoneInput() {
        if (this.userInput.phone.trim() !== '') {
            this.messages.push({
                text: this.userInput.phone, // El teléfono del usuario se agrega como mensaje
                type: 'user'
            });
            this.messages.push({
                text: `Perfecto, ahora escribe tu consulta:`,
                type: 'bot'
            });
            this.phoneReceived = true;
            this.inputDisabled = false; // Habilitar el campo de consulta
        } else {
            this.messages.push({
                text: 'Por favor, ingresa tu número de teléfono.',
                type: 'bot'
            });
        }
    }

    handleQuerySubmit() {
        if (this.userInput.query.trim() !== '') {
            this.messages.push({
                text: this.userInput.query, // La consulta del usuario se agrega como mensaje
                type: 'user'
            });
            this.messages.push({
                text: `Gracias por escribirnos ${this.userInput.name}, te contactaremos pronto por ${this.userInput.email} o tu celular ${this.userInput.phone}.`,
                type: 'bot'
            });
            this.resetConsultationForm();
            this.inputDisabled = true;
        } else {
            this.messages.push({
                text: 'Por favor, ingresa tu consulta.',
                type: 'bot'
            });
        }
    }

    resetConsultationForm() {
        this.userInput = { name: '', phone: '', email: '', query: '' };
        this.nameReceived = false;
        this.emailReceived = false;
        this.phoneReceived = false;
    }

    resetToMainMenu() {
        this.messages = [];
        this.showInitialOptions();
        this.inputDisabled = true;
        this.resetConsultationForm();
    }

    handleOptionSelect(option: { text: string, link?: string, action?: () => void }) {
        if (option.link) {
            this.messages.push({ text: "Dame un momento... te redirigiré, Wauw!", type: 'bot' });
            setTimeout(() => {
                window.location.href = option.link!;
            }, 2000); // 2 segundos de retraso
        } else if (option.action) {
            option.action();
        }
    }

    // Función para hacer scroll hacia el final del chat
    scrollToBottom() {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
}
