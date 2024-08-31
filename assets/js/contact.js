function sendEmail(event) {
  event.preventDefault();
   
  const inputName = document.getElementById("name").value;
  const inputEmail = document.getElementById("email").value;
  const inputPhoneNumber = document.getElementById("phoneNumber").value;
  const inputSubject = document.getElementById("subject").value;
  const inputMessage = document.getElementById("message").value;

  if(!inputName.length) {
    return alert(`Nama tidak boleh kosong!`)
  } else if(!inputEmail) {
    return alert(`Email tidak boleh kosong!`) 
  } else if(!inputPhoneNumber) {
    return alert(`Phone number tidak boleh kosong!`)
  } else if(!inputSubject) {
    return alert(`Silahkan pilih role anda terlebih dahulu, Tidak boleh kosong!`)
  } else if(!inputMessage) {
    return alert(`Message tidak boleh kosong!`)
  }

  // alert(
  //   `Name: ${inputName}\nEmail: ${inputEmail}\nPhone Number: ${inputPhoneNumber}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`
  // );

  const link = document.createElement("a");
  link.href = `mailto:${inputEmail}?subject=${encodeURIComponent(inputSubject)}&body= ${encodeURIComponent(`Nama: ${inputName}\nNomor HP: ${inputPhoneNumber}\nMessage: ${inputMessage}`)}`;

  link.click();

  const contact = {
    name: inputName,
    email:inputEmail,
    phoneNumber: inputPhoneNumber,
    subject: inputSubject,
    message: inputMessage,
  };

  console.log(contact);
}
