document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typing Animation Effect
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ['Frontend Specialist', 'UI/UX Designer', 'Mobile Developer', 'Web Developer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        // Start the typing animation
        setTimeout(type, 1000);
    }

    // 3. Header Scrolled Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Hamburger Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle icon menu / x
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Close menu when clicking navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });

        // Close menu when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }

    // 5. Scrollspy (Highlight Active Nav Link on Scroll)
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // Offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);

    // 6. Skills Tags Fade-in Animation with Intersection Observer
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillsSection = document.getElementById('skills');

    if (skillsSection && skillTags.length > 0) {
        // Set initial state
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(15px)';
            tag.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        if ('IntersectionObserver' in window) {
            const skillsObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Staggered fade in
                        skillTags.forEach((tag, index) => {
                            setTimeout(() => {
                                tag.style.opacity = '1';
                                tag.style.transform = 'translateY(0)';
                            }, index * 45); // 45ms delay between each tag
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            skillsObserver.observe(skillsSection);
        } else {
            // Fallback for older browsers
            skillTags.forEach(tag => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            });
        }
    }

    // 7. Projects Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons, add to current
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Simple animation reflow trigger
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display: none to allow transition
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 350);
                }
            });
        });
    });

    // 8. Experience Tab Switcher (Magang & Organisasi)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show active content
            const activeContent = document.getElementById(`${tabId}-content`);
            if (activeContent) {
                // Ensure display is block before starting animation
                activeContent.classList.add('active');
            }
        });
    });

    // 9. Contact Form Validation & Mock Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation check
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Harap isi semua bidang input!';
                formStatus.className = 'form-status error';
                return;
            }

            // Show loading status
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Mengirim... <i data-lucide="loader" class="animate-spin"></i>';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Send real AJAX request to FormSubmit.co
            fetch("https://formsubmit.co/ajax/putrikurnia197@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Gagal mengirim pesan.');
            })
            .then(data => {
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

                // Show success status
                formStatus.textContent = `Terima kasih, ${name}! Pesan Anda berhasil dikirim. Saya akan segera menghubungi Anda.`;
                formStatus.className = 'form-status success';

                // Reset form
                contactForm.reset();

                // Clear success message after 6 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 6000);
            })
            .catch(error => {
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

                // Show error status
                formStatus.textContent = 'Gagal mengirim pesan. Silakan coba lagi nanti atau hubungi saya langsung via Email/WhatsApp.';
                formStatus.className = 'form-status error';
            });
        });
    }

    // 10. CV Download (Handled natively by HTML5 download attribute)
    // Put your PDF CV file in the project folder and name it 'CV_Putri_Kurnia_Sari.pdf'
});
