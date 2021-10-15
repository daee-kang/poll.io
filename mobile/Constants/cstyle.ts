import { StyleSheet } from "react-native";

const COLORS = {
    PRIMARY: '#763AFF',
    TEXT: '#172866',
    RED: "#FD5E5A",
    WHITE: '#FFFFFF',
    YELLOW: '#F9B406',
    LIGHTGRAY: '#F8F8FB',
};

const FONTS = {
    BOLD: 'avenir-heavy',
    MEDIUM: 'avenir-medium',
    REGULAR: 'avenir-roman',
    LIGHT: 'avenir-light'
};

const STYLES = {
    BORDERRADIUS: 10,
    PAGEMARGIN: 16,
    PADDING: 20,
};

const CSTYLE = StyleSheet.create({
    bigTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 50,
        color: COLORS.TEXT
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: 28,
        color: COLORS.TEXT
    },
    bold: {
        fontFamily: FONTS.BOLD,
        color: COLORS.TEXT
    },
    regular: {
        fontFamily: FONTS.REGULAR,
        fontSize: 14,
        color: COLORS.TEXT,
    },
    normal: {
        fontFamily: FONTS.LIGHT,
        fontSize: 14,
        color: COLORS.TEXT
    },
    page: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 80
    },
    textInput: {
        backgroundColor: COLORS.LIGHTGRAY,
        height: 48,
        borderRadius: STYLES.BORDERRADIUS,
        marginVertical: 10,
        paddingHorizontal: 15,
        fontFamily: FONTS.REGULAR
    }
});

export { COLORS, FONTS, STYLES, CSTYLE };