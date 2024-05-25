document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("counter-section");
  const counters = section.querySelectorAll('.counter');

  const options = {
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCountersAnimation(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(section);

  function startCountersAnimation(section) {
    counters.forEach(counter => {
      const targetValue = parseInt(counter.textContent);
      let currentValue = 0;
      const animationDuration = 4000; // milliseconds
      const interval = 50; // milliseconds
      const increment = (targetValue / (animationDuration / interval));

      const updateCounter = () => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(currentValue);
      };

      const timer = setInterval(updateCounter, interval);
      counter.style.opacity = 1; // Show the counter
    });
    section.style.opacity = 1; // Show the section
  }
});