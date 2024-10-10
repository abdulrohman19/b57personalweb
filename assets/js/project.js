document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const fileInput = document.getElementById("upload");
  const projectList = document.getElementById("project-list");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const projectName = document.getElementById("project").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const description = document.getElementById("description").value;

    // Validasi
    if (!projectName || !startDate || !endDate || !description) {
      alert("Kolomnya engga boleh kosong boskuh");
      return;
    }

    // Mendapatkan teknologi yang dipilih
    const technologies = Array.from(document.querySelectorAll('input[name="technology"]:checked'))
      .map(checkbox => checkbox.value)
      .join(', ');

    // Menghitung durasi
    const duration = calculateDuration(startDate, endDate);

    // Menghandle file upload
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;

        // Membuat data proyek
        const projectData = {
          projectName,
          duration,
          description,
          technologies,
          imageSrc
        };

        // Menyimpan data proyek ke localStorage
        const projectKey = `project_${Date.now()}`;
        localStorage.setItem(projectKey, JSON.stringify(projectData));

        // Redirect ke /
        window.location.href = '/';
      };

      reader.readAsDataURL(file);
    } else {
      alert("Silakan upload file gambar.");
    }
  });

  function calculateDuration(startDate, endDate) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((endDate - startDate) / millisecondsPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let duration = '';
    if (totalWeeks > 0) {
      duration += `${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`;
    }
    if (remainingDays > 0) {
      duration += `${duration ? ' and ' : ''}${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    return duration || '0 days';
  }
});
