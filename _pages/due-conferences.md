---
layout: archive
title: ""
permalink: /due-conferences/
author_profile: true
redirect_from:
  - /publications
---

<div class="page-content">
  <div class="wrapper">
    <h1>🎓 Upcoming Conference Deadlines</h1>

    <!--     reference - https://nunoduarte.github.io/deadlines/         -->

    <p>Below are selected deadlines for upcoming CV/ML/Medical Imaging conferences.</p>

    <!-- Filter Buttons -->
    <div class="filter-bar">
      <button class="filter-btn" onclick="filterConfs('all')">All</button>
      <button class="filter-btn" onclick="filterConfs('CV')">Computer Vision</button>
      <button class="filter-btn" onclick="filterConfs('ML')">Machine Learning</button>
      <button class="filter-btn" onclick="filterConfs('Med')">Medical Imaging</button>
    </div>

    <!-- Conference Cards Container -->
    <div id="conference-list">
      {% for conf in site.data.conferences %}
      <div class="conf-card {{ conf.category }}">
        <h2><a href="{{ conf.url }}">{{ conf.name }}</a></h2>
        <p class="location">
          <span class="icon">&#x1F4CD;</span> {{ conf.location }}
          — <span class="icon">&#x1F4C5;</span> {{ conf.date }}
        </p>

        <!-- Show Abstract Deadline (no countdown) -->
        <p>
          <strong>Abstract Deadline (Local):</strong>
          <span class="abstract-deadline-raw" style="display:none;">{{ conf.abstract_deadline }}</span>
          <span class="abstract-deadline-local"></span>
        </p>

        <!-- Show Full Paper Deadline (WITH countdown) -->
        <p>
          <strong>Full Paper Deadline (Local):</strong>
          <span class="full-deadline-raw" style="display:none;">{{ conf.full_deadline }}</span>
          <span class="full-deadline-local"></span>
        </p>
        <p>
          <strong>Countdown:</strong>
          <span class="full-countdown"></span>
        </p>
      </div>
      {% endfor %}
    </div>
  </div>
</div>

<!-- Script Section -->
{% raw %}
<script>
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
  // (So smaller positive -> soonest deadline is top,
  //  and among passed: the earliest-passed conf is first.)
  upcoming.sort((a, b) => a.diff - b.diff);
  passed.sort((a, b) => a.diff - b.diff);

  // Remove old cards from the DOM
  cards.forEach(c => c.card.remove());

  // Append upcoming, then passed
  upcoming.forEach(c => list.appendChild(c.card));
  passed.forEach(c => list.appendChild(c.card));
}

// 4) Filter function remains unchanged
function filterConfs(category) {
  document.querySelectorAll(".conf-card").forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// INITIALIZE
localizeDeadlines();
updateCountdowns();

// Update countdown every minute
setInterval(updateCountdowns, 60 * 1000);
</script>
{% endraw %}

<!-- CSS Styles -->
<style>
/* Overall container */
.page-content .wrapper {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}
.filter-btn {
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.filter-btn:hover {
  background-color: #007bff;
  color: #fff;
}

/* Conference Card */
.conf-card {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.conf-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.conf-card h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}
.conf-card h2 a {
  color: #007bff;
  text-decoration: none;
}
.conf-card h2 a:hover {
  text-decoration: underline;
}

/* Location line */
.location {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #555;
}
.icon {
  margin-right: 4px;
}
</style>
