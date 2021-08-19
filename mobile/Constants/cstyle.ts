import { StyleSheet } from "react-native";

const COLORS = {
    PRIMARY: '#763AFF',
    TEXT: '#172866',
    RED: "#FD5E5A",
    WHITE: '#FFFFFF',
    YELLOW: '#F9B406'
};

const FONTS = {
    BOLD: 'avenir-heavy',
    MEDIUM: 'avenir-medium',
    REGULAR: 'avenir-roman',
    LIGHT: 'avenir-light'
};

const STYLES = {
    BORDERRADIUS: 15,
    PAGEPADDING: 10,
};

const CSTYLE = StyleSheet.create({
    bigTitle: {
        fontFamily: 'avenir-heavy',
        fontSize: 50,
        color: COLORS.TEXT
    },
    title: {
        fontFamily: 'avenir-heavy',
        fontSize: 22,
        color: COLORS.TEXT
    },
    page: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 80
    }
});

export { COLORS, FONTS, STYLES, CSTYLE };