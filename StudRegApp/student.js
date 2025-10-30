document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const recordsContainer = document.getElementById('recordsContainer');

    // Retrieving existing students or initializing an empty array
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to save students to localStorage
    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    // Function to render student records into the table
    function renderStudents() {
        recordsContainer.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            recordsContainer.appendChild(row);
        });
    }

    // Validation functions for each input field
    const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
    const isValidId = (id) => /^\d{4,10}$/.test(id);
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidContact = (contact) => /^\d{10}$/.test(contact);

    // Function to show error messages for invalid inputs
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.classList.add('error');
        const small = formControl.querySelector('small');
        if (small) {
            small.innerText = message;
        }
    }

    // Function to show success for valid inputs
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className='form-control success';  
    }

    // Form submission event
    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('studentName').value.trim();
        const id = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contactNo').value.trim();

       

        let valid = true;

        // Validate each input
        if (!isValidName(name)) {
            showError(document.getElementById('studentName'), 'Name should contain only alphabetic characters.');
            valid = false;
        } else {
            showSuccess(document.getElementById('studentName'));
        }

        if (!isValidId(id)) {
            showError(document.getElementById('studentId'), 'Student ID should contain only numeric values (4–10 digits).');
            valid = false;
        } else {
            showSuccess(document.getElementById('studentId'));
        }

        if (!isValidEmail(email)) {
            showError(document.getElementById('email'), 'Please enter a valid email address.');
            valid = false;
        } else {
            showSuccess(document.getElementById('email'));
        }

        if (!isValidContact(contact)) {
            showError(document.getElementById('contactNo'), 'Contact number should be exactly 10 digits.');
            valid = false;
        } else {
            showSuccess(document.getElementById('contactNo'));
        }

        // If valid, add to list, save, render, and reset
        if (valid) {
            students.push({ name, id, email, contact });
            saveStudents();
            renderStudents();
            studentForm.reset();
            document.querySelectorAll('.form-control').forEach(control => control.classList.remove('success'));
        }
    });

    // Event listener for Edit and Delete buttons
    recordsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.index;
            const student = students[index];

            document.getElementById('studentName').value = student.name;
            document.getElementById('studentId').value = student.id;
            document.getElementById('emailId').value = student.email;
            document.getElementById('contactNo').value = student.contact;

            students.splice(index, 1);
            saveStudents();
            renderStudents();
        }

        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            students.splice(index, 1);
            saveStudents();
            renderStudents();
        }
    });

    // Initial render on load
    renderStudents();
});
