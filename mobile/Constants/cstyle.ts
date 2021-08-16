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

const preStyles = StyleSheet.create({
    bigTitle: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 30,
    },
    title: {
        fontFamily: 'roboto-slab',
        fontSize: 22,
    }
});

export { COLORS, FONTS, STYLES, preStyles };