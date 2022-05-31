class errorRules {
    constructor() {
        this.value = '';
        this.hasError = false;

        this.messagesError = {};
    }

    messages = {
        required: 'this field is required',
        isEmail: 'email is not valid',
        minLength: 'this field must be at least *** characters'
    }

    required() {
        if (this.value.trim() === '') {
            this.hasError = true;
            this.messagesError.required = true;
        } else {
            delete this.messagesError.required;
        }
    }

    isEmail() {
        let isValid = String(this.value.trim())
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!isValid) {
            this.hasError = true;
            this.messagesError.isEmail = true;
        } else {
            delete this.messagesError.isEmail;
        }
    }

    minLength(number = 0) {
        if(this.value.length < number) {
            this.hasError = true;
            this.messagesError.minLength = true;
            this.messages.minLength = this.messages.minLength.replace('***', String(number));
        } else {
            delete this.messagesError.minLength;
        }
    }

    getMessagesError() {
        let messages = [];

        for (const [key, value] of Object.entries(this.messagesError)) {
            messages.push(this.messages[key]);
        }

        return messages;
    }
}

export class errorHelper extends errorRules {

    constructor(validators, errorMessages) {
        super();

        this.validators = validators;
        this.errorMessages = errorMessages;
    }

    check = (value) => {
        this.hasError = false;

        this.value = value;
        this.validators.forEach(rule => {

            let number =  parseInt(rule.replaceAll(/\D+/ig, ''));
            rule = rule.replace(/\[\d+\]/, '');

            if(!isNaN(number))
                this[rule](number);
            else
                this[rule]();

        });

        return this.hasError;
    }
}


export const checkEmptyForm = (form) => {
    let isEmpty = false;

    const elements = form.querySelectorAll('input');
    elements.forEach( (element) => {
        if(element.hasAttribute('required') && element.value === '') {
            isEmpty = true;
        }
    });

    return isEmpty;
}


// export const getError = (message) => {
//     return {
//         success: false,
//         errors: [message]
//     }
// }
