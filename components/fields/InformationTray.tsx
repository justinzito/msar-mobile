import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { elements } from '../../styles/elements';
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';

type InformationTrayProps = {
    title: string,
    titleBarColor: string,
    editButton?: boolean,
    onEditPress?: () => void,
    children: React.ReactNode
}

const InformationTray = ({ title, titleBarColor, editButton, onEditPress, children }: InformationTrayProps) => {

    return (
        <View style={[elements.tray, {overflow: "hidden", margin: 20}]}>
            <View style={[styles.titleBar, { backgroundColor: titleBarColor }]}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
                {onEditPress &&
                    <TouchableOpacity activeOpacity={0.5} style={styles.editButton} onPress={onEditPress}>
                        {editButton == true &&
                            <Image source={require('../../assets/icons/pencil.png')} style={styles.editImage} />}
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    );

}

const styles = StyleSheet.create({
    titleBar: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 8,
        paddingVertical: 8
    },
    titleText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: colors.primaryText
    },
    editButton: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    editImage: {
        resizeMode: "contain",
        width: 30,
        height: 30
    }
});

export default InformationTray;