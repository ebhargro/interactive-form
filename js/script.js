//Treehouse Techdegree Unit 3 Project by Ebony Hargro

// Aiming for 'Exceeds Expectations'

//setting up all my variables

const form = document.querySelector('form');
const nameBox = document.getElementById('name');
const email = document.getElementById('email');
const role = document.getElementById('other-job-role');
const job = document.getElementById('title');
const design = document.getElementById('design');
const color = document.getElementById('color');
const activities = document.getElementById('activities'); 
const allCheckboxes = document.querySelectorAll('[type="checkbox"]');
const cost = document.getElementById('activities-cost');
const payment = document.getElementById('payment');
const ccnum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

//Name field section! On page load, the cursor appears in the "Name" field, ready for a user to type.
nameBox.focus();

role.style.display='none';

//Making the "Color" field  disabled when the page loads
color.disabled = true;

//Job role section!
//"Other job role" text field displays/hides when a user selects/deselects "Other" from the Job Role menu.

job.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        role.style.display = 'inherit';
    }
    else { 
        role.style.display = 'none';
    }
    }
);

//T-shirt section!
//The "Color" field is enabled when a "Theme" is selected.
// The "Color" field updates correctly when a T-Shirt theme is selected or changed.
// The "Color" drop down menu updates correctly when a T-Shirt theme is selected or changed.

design.addEventListener('change', (e) => {
    color.disabled = false;
    const styling = e.target.value;
    if(styling === 'js puns'){
        color[1].selected = true;
        for (let i = 0; i < color.length; i++){
            if(color[i].getAttribute('data-theme') === 'js puns') {
                color[i].hidden = false;
            } else {
                color[i].hidden = true;
            }
            }
        } else {
            color[4].selected = true;
            for (let i = 0; i < color.length; i++) {
                if(color[i].getAttribute('data-theme') === 'heart js') {
                    color[i].hidden = false;
                } else {
                    color[i].hidden = true;
        }
    }};

// The total cost of selected activities correctly updates in the form when users select or deselect activities. 
// Aiming for "exceeds" -> The user is prevented from selecting two activities that are at the same day and time.

let costTotal = 0;

activities.addEventListener('change', (e) => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if(e.target.checked){
        costTotal += dataCost;
        cost.innerHTML = `Total: \$${costTotal}`;
    } else {
        costTotal -= dataCost;
        cost.innerHTML = `Total: \$${costTotal}`
    }

});
})

for(let i = 0; i < allCheckboxes.length; i++){ 
    allCheckboxes[i].addEventListener('focus', (e) => {
        e.target.parentNode.className = 'focus';
    });

    allCheckboxes[i].addEventListener('blur', (e) => {
        if(allCheckboxes[i].parentNode.className === 'focus') {
            allCheckboxes[i].parentNode.className = '';
        }
    });
}
    activities.addEventListener('change', (e) => { 
        const selectedEvent = e.target; 
        const dataDayTime = e.target.getAttribute('data-day-and-time');

        if (selectedEvent.checked) {for(let i = 0; i < allCheckboxes.length; i++){
            if(allCheckboxes[i].getAttribute('data-day-and-time') === dataDayTime && allCheckboxes[i] !== selectedEvent) {
                allCheckboxes[i].disabled = true; 
                allCheckboxes[i].parentElement.classList.add('disabled');
            }
        }
        } else {
            for(let i = 0; i < allCheckboxes.length; i++) {
                if(allCheckboxes[i].getAttribute('data-day-and-time') === dataDayTime && allCheckboxes[i] !== selectedEvent) {allCheckboxes[i].disabled = false; allCheckboxes[i].parentElement.classList.remove('disabled');
                
            }
        }
    }
});

//When the page loads, "Credit Card" is selected in the payment field, and the credit card section is the only payment section displayed in the form’s UI.
let paymentMethods = [];
paymentMethods.push(document.getElementById('credit-card'));
paymentMethods.push(document.getElementById('paypal'));
paymentMethods.push(document.getElementById('bitcoin'));

payment[1].selected = true;
makePaymentHidden(paymentMethods, 'credit-card');

function makePaymentHidden(paymentTypes, idName) {
    for(let i = 0; i < paymentTypes.length; i++) {
        if(paymentTypes[i].getAttribute('id') === idName) {
            paymentTypes[i].hidden = false;
        } else {
            paymentTypes[i].hidden = true;
        }
        }
    }
//The payment section updates correctly when the user changes the selected payment method in the drop down menu.

    payment.addEventListener('change', (e) => {
 if(e.target.value === 'credit-card'){
     makePaymentHidden(paymentMethods, 'credit-card');
 } else if(e.target.value === 'bitcoin') 
    {
     makePaymentHidden(paymentMethods, 'bitcoin');
 } else { 
     makePaymentHidden(paymentMethods, 'paypal');
 }
 });

//Form validation section
// Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:
//"Name" field isn’t blank.
//"Email" field contains a correctly formatted email address.
//At least one activity has been selected.


 let nameInvalid = document.createElement('SPAN');
 nameInvalid.innerHTML = 'Name field can only be made up of letters';
 nameInvalid.className = 'hint';
 nameBox.parentNode.insertBefore(nameInvalid,nameBox.nextElementSibling);
 
 function validName(){
     const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameBox.value);
     if(nameBox.value === ''){
         validationEmpty(nameBox);
         return nameIsValid;
     }
     if(!nameIsValid){
         validationFail(nameBox);
         return nameIsValid;
     }
     if(nameIsValid) {
         validationPass(nameBox);
         return nameIsValid;
     }
 }

 let emptyEmail = document.createElement('SPAN');
emptyEmail.innerHTML = 'Email field cannot be blank';
emptyEmail.className = 'hint';
email.parentElement.appendChild(emptyEmail);

function validEmail() {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if(email.value === ''){
        validationEmpty(email);
        return emailIsValid;
    } 
    if(!emailIsValid){
        validationFail(email);
        return emailIsValid;
    } 
    if(emailIsValid){
        validationPass(email);
        return emailIsValid;
    }
}

function validActivity(){
    const activityIsValid = costTotal > 0;
    if(activityIsValid){
        validationPass(cost);
    }
    if(!activityIsValid){
        validationEmpty(cost)
    }
    else return activityIsValid;
}

//If "Credit Card" is the selected payment option, the three credit card fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-digit CVV value.

const regexNum = /^\d{13,16}$/;
let emptyCardNum = document.createElement('SPAN');
emptyCardNum.innerHTML = 'Card number cannot be blank';
emptyCardNum.className = 'hint';
ccnum.parentElement.appendChild(emptyCardNum);

function cardIsValid(){
    let valid = regexNum.test(ccnum.value);
    if(payment.value === 'credit-card') {
        if(ccnum.value === '') {
            validationEmpty(ccnum);
            return valid;
        }
        if(!valid) {
            validationFail(ccnum);
            return valid;
        }
        if(valid){
            validationPass(ccnum);
            return valid;
        }
    } else {
        valid = true;
        return valid;
    }
}

const zipcodeRegex = /^\d{5}$/;
let blankZip = document.createElement('SPAN');
blankZip.innerHTML = 'Zip code field cannot be blank';
blankZip.className = 'hint';
zip.parentElement.appendChild(blankZip);

function zipcodeIsValid (){
    let valid = zipcodeRegex.test(zip.value);
    if(payment.value === 'credit-card'){
        if (zip.value === '') {
            validationEmpty(zip)
            return valid;
        }
    if(!valid){
        validationFail(zip);
        return valid;
    }
    if(valid){
        validationPass(zip);
        return valid;
    }
} else {
    valid = true;
    return valid;
}}

const regexcc = /^\d{3}$/;
let emptyCcv = document.createElement('SPAN');
emptyCcv.innerHTML = 'CVV field cannot be left blank';
emptyCcv.className - 'hint';
cvv.parentElement.appendChild(emptyCcv);

function cvvisValid(){
    let valid = regexcc.test(cvv.value);
    if(payment.value === 'credit-card') {
        if(cvv.value === ''){
            validationEmpty(cvv);
            return valid;
        }
        if(!valid){
            validationFail(cvv);
            return valid;
        }
        if(valid){
            validationPass(cvv);
            return valid;
        }
    } else {
        valid = true;
        return valid;
    }
}

function paymentValid(){
    let validCard = cardIsValid();
    let validZip = zipcodeIsValid();
    let validcvv = cvvisValid();
    let valid = cardIsValid && zipcodeIsValid && cvvisValid;
    return valid;
}

function validationEmpty(element){
    let parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'inherit';
    element.nextElementSibling.style.display = 'none';
}

function validationPass(element){
    let parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    element.nextElementSibling.style.display = 'none';
    parent.lastElementChild.style.display = 'none';
}

function validationFail(element){
    let parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    element.nextElementSibling.style.display = 'inherit';
    parent.lastElementChild.style.display = 'none';
}
//Aiming for 'Exceeds'
//At least one required field validates user input in real time as the user interacts with the field.
//At least one required form field provides validation error messages that differ depending on the reason the field is invalid.

nameBox.addEventListener('keyup', validName);
email.addEventListener('keyup', validEmail);
payment.addEventListener('keyup', paymentValid);
activities.addEventListener('keyup', validActivity);
ccnum.addEventListener('keyup', cardIsValid);
zip.addEventListener('keyup', zipcodeIsValid);
cvv.addEventListener('keyup', cvvisValid);

form.addEventListener('submit', (e) => {
    if (!validName()) {
        e.preventDefault();
    }

    if (!validEmail()) {
        e.preventDefault();
    }

    if (!validActivity()) {
        e.preventDefault();
    }

    if (!paymentValid()) {
        e.preventDefault();
    }
});