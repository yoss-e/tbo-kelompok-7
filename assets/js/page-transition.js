const transitionDuration = 280;
let isTransitioning = false;

function navigateWithTransition(url) {
    if (!url || isTransitioning) return;

    isTransitioning = true;
    document.body.classList.add('page-leaving');

    window.setTimeout(() => {
        window.location.href = url;
    }, transitionDuration);
}

function showPage() {
    document.body.classList.add('page-ready');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showPage);
} else {
    showPage();
}

document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModifiedClick || link.target === '_blank' || link.hasAttribute('download')) return;

    const nextUrl = new URL(link.getAttribute('href'), window.location.href);
    const currentUrl = new URL(window.location.href);
    const samePageHash = nextUrl.pathname === currentUrl.pathname && nextUrl.hash;

    if (nextUrl.origin !== currentUrl.origin || samePageHash) return;

    if (nextUrl.pathname.endsWith('/index.html')) {
        sessionStorage.setItem('kalimatkuStartAudio', 'true');
    }

    event.preventDefault();
    navigateWithTransition(nextUrl.href);
});

window.navigateWithTransition = navigateWithTransition;
