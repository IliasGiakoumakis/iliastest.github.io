window.addEventListener('scroll', function() {
    const tunnel = document.querySelector('.scroll-tunnel');
    const zoomTarget = document.getElementById('zoom-target');
    const actualSite = document.getElementById('actual-site');

    // Πόσο έχουμε κατέβει με το scroll
    const scrollPosition = window.scrollY;
    // Πόσο είναι το συνολικό διαθέσιμο scroll (ύψος τούνελ - ύψος οθόνης)
    const maxScroll = tunnel.offsetHeight - window.innerHeight;

    // Υπολογίζουμε ένα ποσοστό από το 0.00 (αρχή) έως το 1.00 (τέλος)
    let percent = scrollPosition / maxScroll;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    // --- ΡΥΘΜΙΣΗ ZOOM ---
    // Πόσο πολύ θέλουμε να μεγεθυνθεί η εικόνα (π.χ. 30 φορές για να μπούμε στην οθόνη)
    const maxScale = 30; 
    const currentScale = 1 + (percent * maxScale);
    
    // Εφαρμόζουμε το Zoom
    zoomTarget.style.transform = `scale(${currentScale})`;

    // --- ΡΥΘΜΙΣΗ ΕΜΦΑΝΙΣΗΣ ΤΟΥ SITE (FADE IN) ---
    // Όταν το scroll φτάσει στο 70% (0.7), αρχίζει να εμφανίζεται το site
    if (percent > 0.7) {
        // Υπολογισμός για το fade (από το 0.7 έως το 1.0 γίνεται πλήρως ορατό)
        let opacityValue = (percent - 0.7) / 0.3;
        actualSite.style.opacity = opacityValue;
        
        // Όταν εμφανιστεί πλήρως, να επιτρέπονται τα κλικ
        if(percent > 0.95) {
             actualSite.style.pointerEvents = 'auto';
        } else {
             actualSite.style.pointerEvents = 'none';
        }
    } else {
        // Αν πάμε προς τα πάνω, το ξανακρύβουμε
        actualSite.style.opacity = 0;
        actualSite.style.pointerEvents = 'none';
    }
});
