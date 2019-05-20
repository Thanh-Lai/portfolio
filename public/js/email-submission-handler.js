export default (function () {
    function validEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }
  
    //Validates human.
    function validateHuman(honeypot) {
      if (honeypot) {  
        disablebuttons()
        console.log("Spam alert! Your email has not been sent!");
        alert("Please stop trying to spam me!")
        return true;
      }
    }
  
    // Get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      }).filter(function (item, pos, self) {
        return self.indexOf(item) === pos && item;
      });
  
      var formData = {};
      fields.forEach(function (name) {
        var element = elements[name];
  
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          let data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      // default sheet name
      formData.formGoogleSheetName = form.dataset.sheet || "responses";
      // no email by default
      formData.formGoogleSendEmail = form.dataset.email || "";
  
      return formData;
    }
  
    // handles form submit
    function handleFormSubmit(event) {
      event.preventDefault();
      let form = event.target;
      // get the values submitted in the form
      let data = getFormData(form);
  
      //if form is filled, form will not be submitted
      if (validateHuman(data.honeypot)) {
        return false;
      }
      // if email is not valid show error
      if (data.email && !validEmail(data.email)) {
        var invalidEmail = form.querySelector(".email-invalid");
        if (invalidEmail) {
          console.log("Invalid-Email")
          invalidEmail.style.display = "block";
          return false;
        }
      } else {
        let invalidEmail = document.getElementById("invalid-email");
        if (invalidEmail) {
          invalidEmail.style.display = "none";
        }
        // If email is valid, sends form vs XMLHttpRequest
        disablebuttons();
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          console.log(xhr.status, 'OK', xhr.statusText);
          console.log("Email Sent Sucessfully")
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
      }
    }
  
    function loaded() {
      console.log("Contact form submission handler loaded successfully.");
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    }
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disablebuttons() {
      let buttons = document.getElementsByClassName("email-btn")
  
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
        buttons[i].style.backgroundColor = "red"
      }
      console.log("Buttons Locked");
    }
  
  })();