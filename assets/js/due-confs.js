// 1) Convert stored ISO strings to local text
function localizeDeadlines() {
    document.querySelectorAll(".conf-card").forEach(card => {
      // Abstract
      const abstractRawEl = card.querySelector(".abstract-deadline-raw");
      const abstractLocalEl = card.querySelector(".abstract-deadline-local");
      if (abstractRawEl && abstractLocalEl) {
        const d = new Date(abstractRawEl.textContent.trim());
        abstractLocalEl.textContent = d.toLocaleString();
      }
      // Full
      const fullRawEl = card.querySelector(".full-deadline-raw");
      const fullLocalEl = card.querySelector(".full-deadline-local");
      if (fullRawEl && fullLocalEl) {
        const d = new Date(fullRawEl.textContent.trim());
        fullLocalEl.textContent = d.toLocaleString();
      }
    });
  }
  
  // 2) Update countdown text & fade out passed
  function updateCountdowns() {
    document.querySelectorAll(".conf-card").forEach(card => {
      const fullDeadlineStr = card.querySelector(".full-deadline-raw").textContent.trim();
      const fullDiff = new Date(fullDeadlineStr) - new Date(); // ms until deadline
      const fullCountdownEl = card.querySelector(".full-countdown");
  
      if (fullDiff > 0) {
        // Deadline in the future
        const days = Math.floor(fullDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((fullDiff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((fullDiff / (1000 * 60)) % 60);
        fullCountdownEl.textContent = `${days}d ${hours}h ${mins}m`;
        card.style.opacity = 1;
      } else {
        // Deadline passed
        fullCountdownEl.textContent = "⏱ Deadline passed";
        card.style.opacity = 0.5;
      }
    });
  
    // After updating the countdown text, reorder the conferences
    reorderConferences();
  }
  
  // 3) Reorder conferences so upcoming are on top (ascending time left), then passed (ascending time since)
  function reorderConferences() {
    const list = document.getElementById("conference-list");
    // Grab all conf-cards, compute time diff
    const cards = [...document.querySelectorAll(".conf-card")].map(card => {
      const fullDeadlineStr = card.querySelector(".full-deadline-raw").textContent.trim();
      const diff = new Date(fullDeadlineStr) - new Date();  // ms
      return { card, diff };
    });
  
    // Split into upcoming vs passed
    const upcoming = cards.filter(c => c.diff > 0);
    const passed = cards.filter(c => c.diff <= 0);
  
    // Sort each group by ascending diff
    upcoming.sort((a, b) => a.diff - b.diff);
    passed.sort((a, b) => a.diff - b.diff);
  
    // Remove old cards from the DOM
    cards.forEach(c => c.card.remove());
  
    // Append upcoming, then passed
    upcoming.forEach(c => list.appendChild(c.card));
    passed.forEach(c => list.appendChild(c.card));
  }
  
  // 4) Attach filterConfs to the global window object so inline onclick can find it
  window.filterConfs = function(category) {
    document.querySelectorAll(".conf-card").forEach(card => {
      if (category === 'all' || card.classList.contains(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };
  
  // INITIALIZE
  localizeDeadlines();
  updateCountdowns();
  
  // Update countdown every minute
  setInterval(updateCountdowns, 60 * 1000);