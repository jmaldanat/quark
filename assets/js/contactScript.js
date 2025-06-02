// contactScript.js - Real-time validation for the contact form

document.addEventListener('DOMContentLoaded', function () { // Wait for the DOM to be fully loaded
    const form = document.querySelector('form'); // Select the first form on the page
    const fields = [ // Define the fields to validate and their rules
        {
            id: 'name', // Field ID for name
            validate: value => value.trim().length >= 2, // Must be at least 2 characters
            message: 'Please enter your name (at least 2 characters).' // Error message
        },
        {
            id: 'email', // Field ID for email
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Must be a valid email
            message: 'Please enter a valid email address.' // Error message
        },
        {
            id: 'subject', // Field ID for subject
            validate: value => value.trim().length > 0, // Cannot be empty
            message: 'Please enter a subject.' // Error message
        },
        {
            id: 'message', // Field ID for message
            validate: value => value.trim().length > 0, // Cannot be empty
            message: 'Please enter your message.' // Error message
        }
    ];

    // Create or reuse an error element for each field
    function showError(input, message) {
        let error = input.parentElement.querySelector('.invalid-feedback'); // Look for an existing error message
        if (!error) { // If it doesn't exist, create it
            error = document.createElement('div'); // Create a div for the error message
            error.className = 'invalid-feedback d-block'; // Add Bootstrap classes to display the error
            input.parentElement.appendChild(error); // Add it to the DOM as a child of the input's parent
        }
        error.textContent = message; // Set the error message text
        input.classList.add('is-invalid'); // Add Bootstrap class to mark the field as invalid
    }

    function clearError(input) {
        let error = input.parentElement.querySelector('.invalid-feedback'); // Look for the error message
        if (error) error.textContent = ''; // If it exists, clear the error message text
        input.classList.remove('is-invalid'); // Remove the invalid class from the field
    }

    // Real-time validation
    fields.forEach(field => { // For each defined field
        const input = document.getElementById(field.id); // Select the input by its ID
        input.addEventListener('input', function () { // Add an input event listener
            if (field.validate(input.value)) { // If the value is valid
                clearError(input); // Clear any error
            } else {
                showError(input, field.message); // Otherwise, show the error message
            }
        });
    });

    // Validation on form submit
    form.addEventListener('submit', function (e) { // When the form is submitted
        let valid = true; // Flag to check if all fields are valid
        fields.forEach(field => { // For each field
            const input = document.getElementById(field.id); // Select the input by its ID
            if (!field.validate(input.value)) { // If the value is not valid
                showError(input, field.message); // Show the error
                valid = false; // Mark the form as invalid
            } else {
                clearError(input); // If valid, clear the error
            }
        });
        if (!valid) { // If any field is invalid
            e.preventDefault(); // Prevent form submission
        }
    });
});