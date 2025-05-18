// 1. Збереження інформації про систему
const info = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language
};

localStorage.setItem("userInfo", JSON.stringify(info));

const footer = document.getElementById("footerInfo");
footer.textContent = `OS: ${info.platform}, Browser: ${info.userAgent}, Language: ${info.language}`;

// 2. Завантаження коментарів і показ їх на сторінці
fetch("https://jsonplaceholder.typicode.com/posts/6/comments")
  .then(res => res.json())
  .then(comments => {
    const section = document.createElement("section");
    section.innerHTML = "<h2>Comments</h2>";
    comments.forEach(comment => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${comment.name}</strong> (${comment.email}): <p>${comment.body}</p>`;
      section.appendChild(div);
    });
    document.body.appendChild(section);
  });

// 3. Модальне вікно через 1 хв
setTimeout(() => {
  document.getElementById("modal").style.display = "flex";
}, 60000);

// 4. Темна/світла тема вручну (через кнопку)
const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Зміна тексту кнопки
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "Light Theme";
  } else {
    themeToggleBtn.textContent = "Dark Theme";
  }
});

// 5. Автоматичне перемикання теми за годиною (якщо ще не активовано)
const hour = new Date().getHours();
if (hour < 7 || hour >= 21) {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "Light Mode";
}
