document.addEventListener("DOMContentLoaded", () => {

    const session = JSON.parse(
        localStorage.getItem("session")
    );

    const currentPage =
        window.location.pathname;

    const isLoginPage =
        currentPage.includes("login.html");

    const isRegisterPage =
        currentPage.includes("register.html");

    if (
        !session &&
        !isLoginPage &&
        !isRegisterPage
    ) {

        window.location.href =
            "pages/login.html";

        return;
    }

    const welcomeMessage =
        document.getElementById(
            "welcome-message"
        );

    if (
        session &&
        welcomeMessage
    ) {

        welcomeMessage.textContent =
            `Bem-vindo(a), ${session.firstName}!`;

    }

});
