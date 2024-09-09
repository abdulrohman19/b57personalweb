document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fileInput = document.querySelector("#upload");
  const projectList = document.createElement("div");
  const projectHeader = document.createElement("div");

  // Create a header for "MY PROJECT" and append it to the body
  projectHeader.id = "project-header";
  // projectHeader.innerHTML = "<h1>MY PROJECT</h1>";
  document.querySelector("body").appendChild(projectHeader);

  // Create a section to display the list of projects
  projectList.id = "project-list";
  document.querySelector("body").appendChild(projectList);

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const projectName = document.querySelector("#project").value;
    const startDate = new Date(document.querySelector("#start-date").value);
    const endDate = new Date(document.querySelector("#end-date").value);
    const description = document.querySelector("#description").value;

    // Validation
    if (!projectName || !startDate || !endDate || !description) {
      alert("Kolom ini tidak boleh kosong boskuh");
      return;
    }

    // Get selected technologies
    const technologies = Array.from(document.querySelectorAll('input[name="technology"]:checked'))
      .map(checkbox => checkbox.nextElementSibling.textContent)
      .join(', ');

    // Calculate duration
    const duration = calculateDuration(startDate, endDate);

    // Handle file upload
    let fileInfo = "";
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        fileInfo = `<img src="${e.target.result}" alt="${file.name}" style="max-width: 300px; max-height: 300px;"/>`;

        createProjectCard(projectName, duration, description, technologies, fileInfo);

        // Clear form inputs
        form.reset();
      };

      reader.readAsDataURL(file);
    } else {
      createProjectCard(projectName, duration, description, technologies, fileInfo);

      // Clear form inputs
      form.reset();
    }
  });

  function createProjectCard(projectName, duration, description, technologies, fileInfo) {
    const projectCard = document.createElement("a");
    projectCard.className = "project-card";
    const projectKey = `project_${Date.now()}`;
    projectCard.href = `project-detail.html?key=${projectKey}`; // Link to project-detail.html with key

    // Save project data to localStorage
    const projectData = {
      projectName,
      duration,
      description,
      technologies,
      fileInfo
    };
    localStorage.setItem(projectKey, JSON.stringify(projectData));

    projectCard.dataset.projectKey = projectKey;

    // Shorten description to 10 words
    const shortDescription = getShortDescription(description);

    projectCard.innerHTML = fileInfo + `
      <p><strong>Project Name:</strong> ${projectName}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Description:</strong> ${shortDescription}</p>
      <p><strong>Technologies:</strong> ${technologies}</p>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    projectList.appendChild(projectCard);
  }

  function getShortDescription(description) {
    // Split description into words
    const words = description.split(' ');
    // Join the first 10 words with a space and add ellipsis if there are more
    return words.length > 10
      ? words.slice(0, 10).join(' ') + '......'
      : description;
  }

  function calculateDuration(startDate, endDate) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((endDate - startDate) / millisecondsPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
    const totalYears = Math.floor(totalMonths / 12);

    let duration = "";
    if (totalYears > 0) {
      duration += `${totalYears} year${totalYears > 1 ? 's' : ''}`;
    }
    if (totalMonths % 12 > 0) {
      duration += `${totalYears > 0 ? ' and ' : ''}${totalMonths % 12} month${totalMonths % 12 > 1 ? 's' : ''}`;
    }
    if (totalWeeks > 0) {
      duration += `${totalYears > 0 || totalMonths % 12 > 0 ? ' and ' : ''}${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`;
    }
    if (totalDays > 0) {
      duration += `${totalYears > 0 || totalMonths % 12 > 0 || totalWeeks > 0 ? ' and ' : ''}${totalDays} day${totalDays > 1 ? 's' : ''}`;
    }
    return duration || "0 days";
  }
});
