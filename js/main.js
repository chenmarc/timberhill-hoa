/**
 * Meadowridge at Timberhill HOA — Main Script
 * Handles:
 *  - Tab switching (top nav & left menu)
 *  - Accordion for Owner Rules
 *  - Mobile hamburger menu
 *  - Contact form submission (client-side demo)
 *  - Left-menu active state tracking
 */

(function () {
  "use strict";

  /* ================================================================
     TAB SWITCHING
     Each top-nav button has data-tab="tab-id".
     Left-menu links also carry data-tab="tab-id".
     The matching .tab-panel gets class "active".
  ================================================================ */
  const tabBtns  = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function activateTab(tabId) {
    // Update panels
    tabPanels.forEach(panel => {
      panel.classList.toggle("active", panel.id === tabId);
    });

    // Update top-nav buttons
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    // Update left-menu links
    document.querySelectorAll("#left-menu a[data-tab]").forEach(link => {
      link.classList.toggle("current", link.dataset.tab === tabId);
    });

    // Update mobile label
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const label = document.querySelector(".nav-current-label");
    if (label && activeBtn) {
      label.textContent = activeBtn.textContent.trim();
    }

    // Close mobile menu if open
    closeMobileMenu();

    // Persist selection in sessionStorage so refreshing keeps context
    try { sessionStorage.setItem("mrh-tab", tabId); } catch (e) {}
  }

  // Wire up top-nav tab buttons
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // Wire up left-menu links
  document.querySelectorAll("#left-menu a[data-tab]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      activateTab(link.dataset.tab);
    });
  });

  // Restore last tab (or default to "tab-home")
  const savedTab = (() => {
    try { return sessionStorage.getItem("mrh-tab"); } catch (e) { return null; }
  })();
  activateTab(savedTab && document.getElementById(savedTab) ? savedTab : "tab-home");


  /* ================================================================
     LEFT MENU — hover 'current' state
     On desktop the left menu shows which tab is active via data-tab.
     The activateTab function already handles this; the mouseenter
     adds a visual hover effect without interfering.
  ================================================================ */
  const leftLinks = document.querySelectorAll("#left-menu a");
  leftLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      leftLinks.forEach(l => {
        // Only remove current if it's not the truly active tab
        const lTab = l.dataset.tab;
        const activeTabId = (() => {
          const active = document.querySelector(".tab-btn.active");
          return active ? active.dataset.tab : "tab-home";
        })();
        if (lTab !== activeTabId) l.classList.remove("current");
      });
      link.classList.add("current");
    });
    link.addEventListener("mouseleave", () => {
      const activeTabId = (() => {
        const active = document.querySelector(".tab-btn.active");
        return active ? active.dataset.tab : "tab-home";
      })();
      if (link.dataset.tab !== activeTabId) {
        link.classList.remove("current");
      }
    });
  });


  /* ================================================================
     MOBILE HAMBURGER MENU
  ================================================================ */
  const hamburger = document.querySelector(".hamburger");
  const navList   = document.querySelector("#top-nav ul");

  function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove("open");
    if (navList)   navList.classList.remove("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMobileMenu();
    });
  }


  /* ================================================================
     ACCORDION — Owner Rules
  ================================================================ */
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const body    = btn.nextElementSibling;   // .accordion-body
      const isOpen  = btn.getAttribute("aria-expanded") === "true";
      const inner   = body.querySelector(".accordion-body-inner");

      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        body.style.maxHeight = "0";
      } else {
        btn.setAttribute("aria-expanded", "true");
        body.style.maxHeight = inner.scrollHeight + "px";
      }
    });
  });


  /* ================================================================
     CONTACT FORM — client-side demo
     Swap this section for a real form handler (Formspree, Netlify
     Forms, EmailJS) when deploying to production.
  ================================================================ */
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.querySelector(".form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      // In production: send data to your form service here
      contactForm.style.display = "none";
      if (formSuccess) formSuccess.style.display = "block";
    });
  }

  /* ================================================================
     CURRENT YEAR in footer
  ================================================================ */
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
