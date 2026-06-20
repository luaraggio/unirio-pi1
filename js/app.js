document.addEventListener(
    "DOMContentLoaded",
    () => {

        const session =
            JSON.parse(
                localStorage.getItem(
                    "session"
                )
            );

        const currentPage =
            window.location.pathname;

        const isLoginPage =
            currentPage.includes(
                "login.html"
            );

        const isRegisterPage =
            currentPage.includes(
                "register.html"
            );

        if (
            !session &&
            !isLoginPage &&
            !isRegisterPage
        ) {

            const insidePages =
                currentPage.includes(
                    "/pages/"
                );

            window.location.href =
                insidePages
                    ? "login.html"
                    : "pages/login.html";

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

    }
);
