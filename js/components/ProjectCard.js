export const ProjectCard = (project) => {
  `
   <div class="project-card">
     <div class="project-card-video">
     </div>
     <div class="project-card-info">
       <div class="project-card-header">
         <h1 class="project-card-title">
           ${project.title}
         </h1>
         <p class="project-card-date">
           ${project.date}
         </p>  
       </div>
       <p class="project-card-description">
         ${project.description}
       </p>
       <div class="project-card-tags">
         
       </div>
     </div>
   </div>`;
  const card = document.createElement("div");
  const video = document.createElement("div");
  const info = document.createElement("div");
  const header = document.createElement("div");
  const title = document.createElement("h1");
  const date = document.createElement("p");
  const description = document.createElement("p");
  const tags = document.createElement("div");

  card.classList.add("project-card");
  video.classList.add("project-card-video");
  info.classList.add("project-card-info");
  header.classList.add("project-card-header");
  title.classList.add("project-card-title");
  date.classList.add("project-card-date");
  description.classList.add("project-card-description");
  tags.classList.add("project-card-tags");

  title.textContent = project.title;
  date.textContent = project.date;
  description.textContent = project.description;

  info.appendChild(header);
  info.appendChild(description);
  header.appendChild(title);
  header.appendChild(date);

  card.appendChild(video);
  card.appendChild(info);

  return card;
};
