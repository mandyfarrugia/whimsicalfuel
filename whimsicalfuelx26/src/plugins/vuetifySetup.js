import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const mediterraneanTheme = {
    dark: false,
    colors: {
        primary: '#7A9E7E',
        primaryDark: '#2F4F3A',
        secondary: '#D97B4A',
        background: '#FAF8F4',
        surface: '#FFFCF8',
        text: '#2A2A2A',
        textLight: '#5C5C5C',
        border: '#E7E2DA',
        success: '#5C8A5C',
        warning: '#D9A441',
        error: '#C65B4B'
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'mediterraneanTheme',
        themes: {
            mediterraneanTheme
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    }
});