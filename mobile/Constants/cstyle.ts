import { StyleSheet } from "react-native";

const COLORS = {
    PRIMARY: '#FFBC42',
    SECONDARY: '#0496FF',
    RED: "#e74645",
    GREEN: 'green',
    DARKBLUE: '#023e8a',
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

export { COLORS, STYLES, preStyles };