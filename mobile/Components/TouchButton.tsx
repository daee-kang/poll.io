import React, { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../Constants';

interface Props {
    onPress: () => void;
    label: string;
    invert?: boolean;
}

export default function TouchButton({ onPress, label, invert = false }: Props): ReactElement {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                backgroundColor: invert ? 'white' : COLORS.PRIMARY,
                borderStyle: invert ? 'solid' : undefined,
                borderWidth: invert ? 1 : undefined,
                borderColor: invert ? COLORS.PRIMARY : undefined,
                borderRadius: 25,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            }}
        >
            <Text
                style={{
                    textAlign: 'center',
                    color: invert ? COLORS.TEXT : 'white',
                    fontFamily: FONTS.BOLD,
                    fontSize: 16
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
