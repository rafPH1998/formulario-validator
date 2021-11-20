let B7Validator = {
    handleSubmit:(e) => {
        e.preventDefault();
        let send = true;

        let inputs = document.querySelectorAll('input');
        B7Validator.clearError();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                B7Validator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let q in rules) {
                rDetails = rules[q].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value === '') {
                            return 'Campo vazio! Preencha esse campo';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value !== '') {
                            let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido!';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = 'red';
        let elementError = document.createElement('div');
        elementError.classList.add('error');

        elementError.innerHTML = error;
        input.parentElement.insertBefore(elementError, input.ElementSibling);
    },
    clearError() {
        let inputs = form.querySelectorAll('input');
        for(let q in inputs) {
            inputs[q].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);

