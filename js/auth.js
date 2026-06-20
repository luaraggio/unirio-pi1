document.addEventListener("DOMContentLoaded", () => {

    setupRegister();
    setupLogin();
    setupLogout();

});

function setupRegister() {

    const registerForm =
        document.getElementById("register-form");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearErrors();

            const firstName =
                document
                    .getElementById("first-name")
                    .value
                    .trim();

            const lastName =
                document
                    .getElementById("last-name")
                    .value
                    .trim();

            const studentId =
                document
                    .getElementById("student-id")
                    .value
                    .trim();

            const course =
                document
                    .getElementById("course")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirm-password")
                    .value;

            if (firstName.length < 2) {

                document
                    .getElementById("first-name-error")
                    .textContent =
                    "Nome inválido.";

                return;
            }

            if (lastName.length < 2) {

                document
                    .getElementById("last-name-error")
                    .textContent =
                    "Sobrenome inválido.";

                return;
            }

            if (!/^\d{8,12}$/.test(studentId)) {

                document
                    .getElementById("student-id-error")
                    .textContent =
                    "Matrícula inválida.";

                return;
            }

            if (!course) {

                document
                    .getElementById("course-error")
                    .textContent =
                    "Informe o curso.";

                return;
            }

            if (!isValidEmail(email)) {

                document
                    .getElementById("email-error")
                    .textContent =
                    "Use um email institucional válido.";

                return;
            }

            if (!isValidPassword(password)) {

                document
                    .getElementById("password-error")
                    .textContent =
                    "Senha deve conter no mínimo 8 caracteres, letra maiúscula, minúscula, número e símbolo.";

                return;
            }

            if (password !== confirmPassword) {

                document
                    .getElementById("confirm-password-error")
                    .textContent =
                    "As senhas não coincidem.";

                return;
            }

            const passwordHash =
                await hashPassword(password);

            const user = {
                firstName,
                lastName,
                studentId,
                course,
                email,
                passwordHash
            };

            localStorage.setItem(
                "registeredUser",
                JSON.stringify(user)
            );

            alert(
                "Cadastro realizado com sucesso."
            );

            window.location.href =
                "login.html";

        }
    );
}

function setupLogin() {

    const loginForm =
        document.getElementById("login-form");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearErrors();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            if (!isValidEmail(email)) {

                document
                    .getElementById("email-error")
                    .textContent =
                    "Email inválido.";

                return;
            }

            const registeredUser =
                JSON.parse(
                    localStorage.getItem(
                        "registeredUser"
                    )
                );

            if (!registeredUser) {

                document
                    .getElementById("email-error")
                    .textContent =
                    "Nenhum usuário cadastrado.";

                return;
            }

            const passwordHash =
                await hashPassword(password);

            const validEmail =
                registeredUser.email === email;

            const validPassword =
                registeredUser.passwordHash ===
                passwordHash;

            if (!validEmail || !validPassword) {

                document
                    .getElementById("password-error")
                    .textContent =
                    "Email ou senha inválidos.";

                return;
            }

            localStorage.setItem(
                "session",
                JSON.stringify({
                    email: registeredUser.email,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    studentId: registeredUser.studentId,
                    course: registeredUser.course
                })
            );

            window.location.href =
                "../index.html";

        }
    );
}

function setupLogout() {

    const logoutButton =
        document.getElementById("logout-btn");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            localStorage.removeItem(
                "session"
            );

            window.location.href =
                "pages/login.html";

        }
    );
}

function clearErrors() {

    const errors =
        document.querySelectorAll("small");

    errors.forEach(error => {
        error.textContent = "";
    });

}
