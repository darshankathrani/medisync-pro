import gsap from "gsap";

export const animateNavbar = (logo, menu, button) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Navbar logo
  tl.fromTo(
    logo,
    { opacity: 0, y: -15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      clearProps: "transform",
    }
  )

    // Menu links
    .fromTo(
      menu.children,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.12,
        clearProps: "transform",
      },
      "-=0.2"
    )

    // CTA button
    .fromTo(
      button,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.4)",
        clearProps: "transform",
      },
      "-=0.15"
    );
};
