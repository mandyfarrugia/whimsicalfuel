export const convertYouTubeLinkToEmbedLink = (link) => {
    if(!link) return '';

    try {
        const url = new URL(link.trim());
        const hostname = url.hostname.toLowerCase();

        let videoId = '';

        if(hostname === 'www.youtube.com' || hostname === 'youtube.com') {
            if(url.pathname === '/watch') {
                videoId = url.searchParams.get('v') || '';
            }

            if(url.pathname.startsWith('/shorts/')) {
                videoId = url.pathname.split('/shorts/')[1]?.split('/')[0] || '';
            }

            if(url.pathname.startsWith('/embed/')) {
                videoId = url.pathname.split('/embed/')[1]?.split('/')[0] || '';
            }
        }

        if(hostname === 'youtu.be') {
            videoId = url.pathname.replace('/', '').split('/')[0] || '';
        }

        if(!videoId) return '';

        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return '';
    }
};