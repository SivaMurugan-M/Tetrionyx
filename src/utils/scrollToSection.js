export function scrollToSection(sectionId, behavior = 'smooth') {
  const section = document.getElementById(sectionId);

  if (!section) {
    return false;
  }

  const headerHeight = document.querySelector('.header')?.offsetHeight || 84;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(0, sectionTop - headerHeight),
    behavior,
  });

  return true;
}

