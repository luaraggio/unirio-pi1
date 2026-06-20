document.addEventListener(
    "DOMContentLoaded",
    loadProfile
);

function loadProfile() {

    const session =
        JSON.parse(
            localStorage.getItem(
                "session"
            )
        );

    if (!session) {
        return;
    }

    document.getElementById(
        "profile-name"
    ).textContent =
        `${session.firstName} ${session.lastName}`;

    document.getElementById(
        "profile-student-id"
    ).textContent =
        session.studentId;

    document.getElementById(
        "profile-course"
    ).textContent =
        session.course;

    document.getElementById(
        "profile-email"
    ).textContent =
        session.email;

}
