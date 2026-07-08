<script setup>
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthenticationPiniaStore } from '../../stores/authenticationPiniaStore.js';

    const authenticationPiniaStore = useAuthenticationPiniaStore();
    const router = useRouter();

    const fullName = computed(() => {
        const firstName = authenticationPiniaStore.userProfile?.firstName || '';
        const lastName = authenticationPiniaStore.userProfile?.lastName || '';

        return `${firstName} ${lastName}`.trim() || 'User';
    });

    const username = computed(() => {
        return authenticationPiniaStore.userProfile?.username || 'user';
    });

    const role = computed(() => {
        return authenticationPiniaStore.userProfile?.role || 'User';
    });

    const profilePicture = computed(() => {
        return authenticationPiniaStore.userProfile?.profilePicture || null;
    });

    const emailAddress = computed(() => {
        return authenticationPiniaStore.userProfile?.emailAddress
            || authenticationPiniaStore.userAccount?.email
            || 'Not available';
    });

    const formattedDateOfBirth = computed(() => {
        const dateOfBirthValue = authenticationPiniaStore.userProfile?.dateOfBirth;

        if (!dateOfBirthValue) {
            return 'Not available';
        }

        const dateOfBirth = new Date(dateOfBirthValue);

        return dateOfBirth.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    });

    const age = computed(() => {
        const dateOfBirthValue = authenticationPiniaStore.userProfile?.dateOfBirth;

        if (!dateOfBirthValue) {
            return null;
        }

        const dateOfBirth = new Date(dateOfBirthValue);
        const today = new Date();

        let calculatedAge = today.getFullYear() - dateOfBirth.getFullYear();

        const hasBirthdayPassedThisYear =
            today.getMonth() > dateOfBirth.getMonth()
            || (
                today.getMonth() === dateOfBirth.getMonth()
                && today.getDate() >= dateOfBirth.getDate()
            );

        if (!hasBirthdayPassedThisYear) {
            calculatedAge--;
        }

        return calculatedAge;
    });

    const formattedCreatedAt = computed(() => {
        const createdAtValue = authenticationPiniaStore.userProfile?.createdAt;

        if (!createdAtValue) {
            return 'Not available';
        }

        const createdAtDate = createdAtValue.toDate
            ? createdAtValue.toDate()
            : new Date(createdAtValue);

        return createdAtDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    });

    const getRoleChipColour = (roleValue) => {
        return roleValue === 'Administrator' ? 'primary' : 'secondary';
    };

    const logout = async () => {
        await authenticationPiniaStore.logout();
        await router.push('/login');
    };
</script>

<template>
    <div class="w-100 pa-4 pt-10 profile-page">
        <v-card
            color="surface"
            rounded="xl"
            elevation="4"
            class="profile-card mx-auto overflow-hidden"
        >
            <div class="profile-banner">
                <div class="profile-banner-content">
                    <v-avatar
                        size="150"
                        color="primary"
                        variant="tonal"
                        class="profile-avatar"
                    >
                        <v-img
                            v-if="profilePicture"
                            :src="profilePicture"
                            cover
                            draggable="false"
                            @dragstart.prevent
                            @drag.prevent
                        />

                        <v-icon
                            v-else
                            icon="mdi-account"
                            size="76"
                        />
                    </v-avatar>
                </div>
            </div>

            <div class="profile-main-content">
                <div class="text-center mb-6">
                    <h1 class="text-h5 font-weight-bold mb-1">
                        {{ fullName }}
                    </h1>

                    <p class="profile-username mb-3">
                        @{{ username }}
                    </p>

                    <v-chip
                        :color="getRoleChipColour(role)"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-shield-account"
                    >
                        {{ role }}
                    </v-chip>
                </div>

                <v-divider class="mb-6" />

                <v-row>
                    <v-col cols="12" md="6">
                        <v-card
                            rounded="xl"
                            elevation="0"
                            class="profile-detail-card"
                        >
                            <div class="profile-detail-icon email-icon">
                                <v-icon icon="mdi-email-outline" />
                            </div>

                            <div>
                                <p class="profile-detail-label">
                                    Email Address
                                </p>

                                <p class="profile-detail-value">
                                    {{ emailAddress }}
                                </p>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card
                            rounded="xl"
                            elevation="0"
                            class="profile-detail-card"
                        >
                            <div class="profile-detail-icon birthday-icon">
                                <v-icon icon="mdi-cake-variant-outline" />
                            </div>

                            <div>
                                <p class="profile-detail-label">
                                    Date of Birth
                                </p>

                                <p class="profile-detail-value">
                                    {{ formattedDateOfBirth }}
                                </p>

                                <p
                                    v-if="age !== null"
                                    class="profile-detail-subvalue"
                                >
                                    {{ age }} years old
                                </p>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card
                            rounded="xl"
                            elevation="0"
                            class="profile-detail-card"
                        >
                            <div class="profile-detail-icon username-icon">
                                <v-icon icon="mdi-at" />
                            </div>

                            <div>
                                <p class="profile-detail-label">
                                    Username
                                </p>

                                <p class="profile-detail-value">
                                    @{{ username }}
                                </p>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card
                            rounded="xl"
                            elevation="0"
                            class="profile-detail-card"
                        >
                            <div class="profile-detail-icon member-icon">
                                <v-icon icon="mdi-calendar-heart" />
                            </div>

                            <div>
                                <p class="profile-detail-label">
                                    Member Since
                                </p>

                                <p class="profile-detail-value">
                                    {{ formattedCreatedAt }}
                                </p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

                <div class="profile-actions">
                    <v-btn
                        color="warning"
                        variant="tonal"
                        rounded="pill"
                        prepend-icon="mdi-pencil"
                    >
                        Edit Profile
                    </v-btn>

                    <v-btn
                        color="error"
                        variant="tonal"
                        rounded="pill"
                        prepend-icon="mdi-logout"
                        @click="logout"
                    >
                        Logout
                    </v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
    .profile-page {
        min-height: 100%;
    }

    .profile-card {
        max-width: 860px;
    }

    .profile-banner {
        min-height: 190px;
        background:
            radial-gradient(circle at 15% 20%, rgba(122, 158, 126, 0.32), transparent 30%),
            radial-gradient(circle at 85% 15%, rgba(217, 123, 74, 0.26), transparent 28%),
            linear-gradient(135deg, #FAF8F4 0%, #F0E9DF 100%);
        position: relative;
    }

    .profile-banner-content {
        height: 190px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    .profile-avatar {
        border: 6px solid #FFFCF8;
        transform: translateY(58px);
        box-shadow: 0 12px 32px rgba(47, 79, 58, 0.22);
    }

    .profile-main-content {
        padding: 78px 32px 32px;
    }

    .profile-username {
        font-size: 0.9rem;
        color: rgba(var(--v-theme-on-surface), 0.58);
    }

    .profile-detail-card {
        height: 100%;
        padding: 18px;
        display: flex;
        align-items: center;
        gap: 16px;
        background-color: #FAF8F4;
        border: 1px solid #E7E2DA;
    }

    .profile-detail-icon {
        width: 46px;
        height: 46px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .email-icon {
        background-color: rgba(122, 158, 126, 0.16);
        color: #7A9E7E;
    }

    .birthday-icon {
        background-color: rgba(217, 123, 74, 0.16);
        color: #D97B4A;
    }

    .username-icon {
        background-color: rgba(217, 164, 65, 0.18);
        color: #D9A441;
    }

    .member-icon {
        background-color: rgba(92, 138, 92, 0.16);
        color: #5C8A5C;
    }

    .profile-detail-label {
        font-size: 0.76rem;
        color: rgba(var(--v-theme-on-surface), 0.55);
        margin-bottom: 2px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    .profile-detail-value {
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 0;
        word-break: break-word;
    }

    .profile-detail-subvalue {
        font-size: 0.8rem;
        color: rgba(var(--v-theme-on-surface), 0.6);
        margin-bottom: 0;
        margin-top: 2px;
    }

    .profile-actions {
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 32px;
    }

    @media (max-width: 600px) {
        .profile-main-content {
            padding: 76px 20px 24px;
        }

        .profile-avatar {
            transform: translateY(54px);
        }

        .profile-detail-card {
            align-items: flex-start;
        }
    }
</style>