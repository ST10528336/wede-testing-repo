/* ========================================
   UNCLE'S WIFE CLEANING DETERGENTS
   JAVASCRIPT FILE
   ======================================== */


/* ================= HOME PAGE ================= */

/*
   Displays a message when the Learn More button is clicked.
*/
function showMessage() {

    alert("Thank you for visiting Uncle's Wife Cleaning Detergents!");

}


/* ================= FOOTER YEAR ================= */

/*
   Updates the footer year automatically.
*/
const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ================= ENQUIRY FORM SUBMISSION =================

const enquiryForm = document.getElementById("enquiryForm");
const enquiryResponse = document.getElementById("enquiryResponse");

if (enquiryForm && enquiryResponse) {

    enquiryForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        enquiryResponse.textContent = "Sending your enquiry...";

        const submitButton = enquiryForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;

        try {

            const formData = new FormData(enquiryForm);

            const response = await fetch(enquiryForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                enquiryResponse.textContent =
                    "Thank you! Your enquiry has been sent successfully.";

                enquiryForm.reset();

            } else {

                enquiryResponse.textContent =
                    "Sorry, your enquiry could not be sent. Please try again.";

            }

        } catch (error) {

            enquiryResponse.textContent =
                "A connection error occurred. Please check your internet connection and try again.";

        } finally {

            submitButton.disabled = false;

        }

    });

}

/* ================= CONTACT FORM ================= */

/*
   Submits the contact form to Formspree using AJAX.
   The email application will not open.
*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const reason = document.getElementById("contactReason").value;
        const message = document.getElementById("contactMessage").value.trim();

        const response = document.getElementById("contactResponse");
        const submitButton = contactForm.querySelector('button[type="submit"]');

        response.textContent = "";

        // Check the form fields.
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (
            name === "" ||
            email === "" ||
            reason === "" ||
            message.length < 10
        ) {
            response.textContent =
                "Please complete all fields correctly. Your message must contain at least 10 characters.";
            return;
        }

        // Prevent multiple submissions while the request is processing.
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

            const formData = new FormData(contactForm);

            // Set the subject of the email received by the business.
            formData.append(
                "_subject",
                reason + " - Website Contact Form"
            );

            const result = await fetch(
                "https://formspree.io/f/mvkkqden",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (result.ok) {

                response.textContent =
                    "Thank you, " + name +
                    "! Your message has been submitted successfully. We will get back to you as soon as possible.";

                contactForm.reset();

            } else {

                const data = await result.json();

                if (data.errors) {
                    response.textContent =
                        "Your message could not be submitted. " +
                        data.errors.map(function(error) {
                            return error.message;
                        }).join(" ");
                } else {
                    response.textContent =
                        "Sorry, your message could not be submitted. Please try again.";
                }

            }

        } catch (error) {

            response.textContent =
                "Unable to send your message. Please check your internet connection and try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        }

    });

}
/* ================= SERVICE SEARCH ================= */

const serviceSearch = document.getElementById("serviceSearch");
const servicesContainer = document.getElementById("servicesContainer");
const serviceSearchMessage = document.getElementById("serviceSearchMessage");

if (serviceSearch && servicesContainer && serviceSearchMessage) {

    const serviceCards = servicesContainer.querySelectorAll(".service-card");

    serviceSearch.addEventListener("input", function () {

        const searchText = serviceSearch.value.trim().toLowerCase();

        let visibleServices = 0;

        serviceCards.forEach(function (service) {

            const serviceText = service.textContent.toLowerCase();

            if (serviceText.includes(searchText)) {

                service.style.display = "";
                visibleServices++;

            } else {

                service.style.display = "none";

            }

        });

        if (visibleServices === 0) {

            serviceSearchMessage.textContent =
                "No services found. Please try another search.";

        } else {

            serviceSearchMessage.textContent =
                "Showing " + visibleServices +
                (visibleServices === 1 ? " service." : " services.");

        }

    });

}

