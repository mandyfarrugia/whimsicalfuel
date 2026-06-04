<script setup>
    import { ref } from 'vue';

    defineProps({
        videoUrl: {
            type: String,
            required: true
        }
    });

    const isVideoLoading = ref(true);

    const onVideoLoaded = () => {
        isVideoLoading.value = false;
    }
</script>
<template>
    <div class="video-placeholder">
        <div v-if="isVideoLoading" class="video-skeleton"></div>
        <iframe
            v-show="!isVideoLoading"
            class="iframe-video"
            :src="videoUrl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            @load="onVideoLoaded">
        </iframe>
    </div>
</template>
<style>
    .video-placeholder {
        width: 100%;
        aspect-ratio: 16 / 9; /* Video area should retain the same shape as a YouTube video, irrespective of the width of the card. */
        /* Anything outside the element's box should be clipped/hidden.
         * Ensure the video/skeleton stays neatly inside the 16:9 box. */
        overflow: hidden;
        background-color: #F0E9DF;
    }

    .iframe-video {
        border: 0;
        width: 100%;
        height: 100%;
        display: block;
    }

    .video-skeleton {
        /* Skeleton fills the full area where the video resides. 
         * Therefore, if the parent is a 16:9 rectangle, the skeleton also becomes a 16:9 rectangle. */
        width: 100%;
        height: 100%;

        /* The gradient runs horizontally from left to right. 
         * Shimmer will move sideways across the video placeholder. */
        background: linear-gradient(
            90deg,
            #F0E9DF 25%,
            #FAF8F4 50%,
            #F0E9DF 75%
        );
        /* The animation moves the background from one side to the other.
         * Ensure there is enough extra gradient to slide smoothly. */

        /* 200% width - extra room for the shimmer to move.
         * 100% height - same height as the element. */
        background-size: 200% 100%;

        /* A full shimmer movement should take 1.3 seconds,
         * repeat the animation until the video loads. */
        animation: shimmer 1.3s infinite;
    }

    @keyframes shimmer {
        from {
            background-position: 200% 0; /* Position the gradient far to the right at the start. */
        }

        to {
            background-position: -200% 0; /* Position the gradient far to the left at the end. */
        }
    }
</style>