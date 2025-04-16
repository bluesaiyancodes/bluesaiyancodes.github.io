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
      <!-- The inline onclick requires filterConfs to be global, see script below -->
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

<!-- Reference to the conferences js code  -->
<script src="/assets/js/due-confs.js"></script>


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
