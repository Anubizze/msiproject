document.addEventListener("DOMContentLoaded", () => {
  // === Переключение grid/list с сохранением ===
  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");
  const gridView = document.querySelector(".products-cards.grid-view");
  const listView = document.getElementById("listView");

  function activateView(viewType) {
    if (viewType === "grid") {
      gridView.classList.add("active");
      listView.classList.remove("active");
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
    } else {
      gridView.classList.remove("active");
      listView.classList.add("active");
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    }
    localStorage.setItem("viewType", viewType);
  }

  const savedView = localStorage.getItem("viewType") || "grid";
  activateView(savedView);

  if (gridBtn && listBtn && gridView && listView) {
    gridBtn.addEventListener("click", () => activateView("grid"));
    listBtn.addEventListener("click", () => activateView("list"));
  }

  // === Управление dropdown-меню ===
  function setupDropdown(toggleId, dropdownId, initiallyOpen = false) {
    const toggleBtn = document.getElementById(toggleId);
    const dropdown = document.getElementById(dropdownId);

    if (!toggleBtn || !dropdown) return;

    if (initiallyOpen) {
      dropdown.classList.add("open");
      toggleBtn.classList.add("active");
    } else {
      dropdown.classList.remove("open");
      toggleBtn.classList.remove("active");
    }

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("open");
      toggleBtn.classList.toggle("active");
    });

    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Здесь добавим true, чтобы меню были открыты изначально
  setupDropdown("categoryToggle", "categoryDropdown", true);
  setupDropdown("priceToggle", "priceDropdown", true);
  setupDropdown("colorToggle", "colorDropdown", true);
  setupDropdown("filterNameToggle", "filterNameDropdown", true);

  // === "More"/"Less" для текста ===
  const textBlock = document.querySelector(".page-text");
  const moreBtn = document.querySelector(".more-button button");

  if (textBlock && moreBtn) {
    moreBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      textBlock.classList.toggle("expanded");
      moreBtn.textContent = textBlock.classList.contains("expanded") ? "Less" : "More";
    });
  }

  // === Закрытие dropdown при клике вне ===
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
    document.querySelectorAll(".dropdown-toggle.active").forEach((btn) => {
      btn.classList.remove("active");
    });
  });
});
