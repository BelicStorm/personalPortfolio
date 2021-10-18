window.onload = async () => {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit");
  const thanks = document.getElementById("thanks-container");
  submitBtn.addEventListener("click", async () => {
    thanksFunction();
    await postData("https://formspree.io/f/mgerqenw");
  });
  function thanksFunction() {
    form.style.display = "none";
    let msgP = document.createElement("p");
    let msg = document.createTextNode(
      "Mensaje recibido. Gracias por tu tiempo."
    );
    msgP.appendChild(msg);
    thanks.appendChild(msgP);
  }
  async function postData(url) {
    let formData = new FormData();
    formData.append("name", document.getElementsByName("name")[0].value);
    formData.append("email", document.getElementsByName("email")[0].value);
    formData.append("message", document.getElementsByName("message")[0].value);
    await fetch(url, {
      method: "POST",
      body: formData
    });
  }
};
