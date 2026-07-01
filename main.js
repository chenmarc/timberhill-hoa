/**
 * Timberhill Homeowners Association — main.js
 *
 * Features:
 *  - Tab switching (top nav + left sidebar links share data-tab attributes)
 *  - Accordion expand/collapse for Owner Rules
 *  - Mobile hamburger menu
 *  - Left-menu active state tracking
 *  - Session persistence (remembers which tab you were on)
 */

(function () {
  "use strict";

  function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn[data-tab]");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const leftLinks = document.querySelectorAll("#left-menu a[data-tab]");
    const dataTabLinks = document.querySelectorAll("a[data-tab]");

    function activateTab(tabId) {
      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === tabId);
      });

      tabBtns.forEach((btn) => {
        const active = btn.dataset.tab === tabId;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });

      leftLinks.forEach((link) => {
        link.classList.toggle("current", link.dataset.tab === tabId);
      });

      const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
      const label = document.querySelector(".nav-current-label");
      if (label && activeBtn) label.textContent = activeBtn.textContent.trim();

      closeMobileMenu();
      try { sessionStorage.setItem("tha-tab", tabId); } catch (_) {}
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    });

    leftLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        activateTab(link.dataset.tab);
      });
    });

    dataTabLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.closest("#left-menu")) return;
        e.preventDefault();
        activateTab(link.dataset.tab);
      });
    });

    leftLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const activeId = getActiveTabId();
        leftLinks.forEach((l) => {
          if (l.dataset.tab !== activeId) l.classList.remove("current");
        });
        link.classList.add("current");
      });
      link.addEventListener("mouseleave", () => {
        if (link.dataset.tab !== getActiveTabId()) {
          link.classList.remove("current");
        }
      });
    });

    function getActiveTabId() {
      const activeBtn = document.querySelector(".tab-btn.active");
      return activeBtn ? activeBtn.dataset.tab : "tab-home";
    }

    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector("#top-nav ul");

    function closeMobileMenu() {
      if (hamburger) hamburger.classList.remove("open");
      if (navList) navList.classList.remove("open");
      if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    }

    if (hamburger && navList) {
      hamburger.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        hamburger.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
          closeMobileMenu();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
      });
    }

    const saved = (() => {
      try { return sessionStorage.getItem("tha-tab"); } catch (_) { return null; }
    })();
    const defaultTab = (saved && document.getElementById(saved)) ? saved : "tab-home";
    activateTab(defaultTab);
  }

  function initAccordions() {
    document.querySelectorAll(".accordion-item").forEach((item, index) => {
      const btn = item.querySelector(".accordion-btn");
      const body = item.querySelector(".accordion-body");
      if (!btn || !body) return;

      btn.type = "button";
      if (!body.id) body.id = `accordion-body-${index + 1}`;
      btn.setAttribute("aria-controls", body.id);
      btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") === "true" ? "true" : "false");

      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".accordion-btn").forEach((otherBtn) => {
          const otherItem = otherBtn.closest(".accordion-item");
          const otherBody = otherItem ? otherItem.querySelector(".accordion-body") : null;
          otherBtn.setAttribute("aria-expanded", "false");
          if (otherBody) otherBody.classList.remove("accordion-open");
        });

        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          body.classList.add("accordion-open");
        }
      });
    });
  }

  function initFooter() {
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initAccordions();
    initFooter();
  });
})();
