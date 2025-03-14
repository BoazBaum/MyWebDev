import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import the EmailJS package
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css']
})
export class HomeContactComponent implements OnInit {

  contactForm!: FormGroup;
  selectedLanguage = 'he';
  // Replace with your actual IDs/Keys from EmailJS
  serviceID = 'service_89i1u2i';
  templateID = 'template_ugyy3qa';
  publicKey = 'VFIJRQaRkwwpWX5Yq'; // Sometimes referred to as User ID

  constructor(
    private fb: FormBuilder
  ) { }

  onLanguageSelect(lang: string) {
    this.selectedLanguage = lang;
    // ... any other logic for switching languages
  }
  
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['']
    });

    // (Optional) Initialize emailjs with your public key once, e.g. in ngOnInit
    emailjs.init(this.publicKey);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // We can simply gather the form values:
      const formValues = this.contactForm.value;

      // EmailJS needs data in a specific format.
      // Common approach: match your EmailJS template variable names:
      const templateParams = {
        user_name: formValues.name,
        user_phone: formValues.phone,
        message: formValues.message
      };

      // Send the email
      emailjs.send(this.serviceID, this.templateID, templateParams)
        .then((response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('הודעה נשלחה בהצלחה!');
          this.contactForm.reset();
        }, (error) => {
          console.error('FAILED...', error);
          alert('שליחת הטופס נכשלה. נסה/י שוב מאוחר יותר.');
        });
    }
  }
}
