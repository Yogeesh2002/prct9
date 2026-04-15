const form = document.getElementById("userForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: form.name.value,
        email: form.email.value,
        age: form.age.value,
        gender: form.gender.value
    };

    try {
        const res = await axios.post("http://localhost:5000/api/users", userData);
        message.innerText = res.data.message;
        message.style.color = "green";
        form.reset();
    } catch (err) {
        console.error(err);
        message.innerText = "Error submitting form";
        message.style.color = "red";
    }
});
