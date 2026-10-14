/* ========================================
   UNCLE'S WIFE CLEANING DETERGENTS
   JAVASCRIPT FILE
   ======================================== */


/*HOME PAGE*/

/*
   This function displays a message
   when the Learn More button is clicked.
*/
function showMessage() {

    alert("Thank you for visiting Uncle's Wife Cleaning Detergents!");

}


/*ENQUIRY FORM*/

/*
   Gets the enquiry form from the HTML page.
*/
const enquiryForm = document.getElementById("enquiryForm");


/*
   Checks if the enquiry form exists
   before adding the submit event.
*/
if (enquiryForm) {

    /*
       Runs when the user submits
       the enquiry form.
    */
    enquiryForm.addEventListener("submit", function(event) {

        /*
           Stops the page from refreshing
           when the form is submitted.
        */
        event.preventDefault();


        /*
           Gets the information entered
           into the form.
        */
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;


        /*
           Checks if any field is empty.
        */
        if (name === "" || email === "" ||
            phone === "" || message === "") {

            alert("Please complete all the fields.");

        } else {

            /*
               Displays a message when
               the form is completed.
            */
            alert("Thank you " + name +
                  "! Your enquiry has been received.");

            /*
               Clears the form after submission.
            */
            enquiryForm.reset();

        }

    });

}