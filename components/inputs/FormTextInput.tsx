import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageRequireSource, Image, TouchableOpacity, Keyboard } from 'react-native';
import { elements } from '../../styles/elements';
import colors from '../../styles/colors'

type FormTextInputProps = {
    title?: string,
    icon?: ImageRequireSource
    placeholder: string,
    rightButton?: ImageRequireSource,
    onRightPress?: (value: any) => void,
    onChange: (text: string) => void
}

const FormTextInput = ({ title, placeholder, icon, rightButton, onRightPress, onChange }: FormTextInputProps) => {

    const [text, setText] = useState('');

    const textChanged = (text: string) => {
        setText(text);
        onChange(text);
    }

    const handleDoneButtonPress = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            {title &&
                <Text style={elements.fieldTitle}>{title}</Text>
            }
            <View style={[elements.inputContainer, { height: 50 }]}>
                {icon &&
                    <Image source={icon} style={elements.fieldImage} />
                }
                <TextInput
                    style={[elements.fieldText, { flex: 1, padding: 8 }]}
                    onChangeText={textChanged}
                    value={text}
                    returnKeyType='done'
                    onSubmitEditing={handleDoneButtonPress}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grayText} />
                {onRightPress &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onRightPress}>
                        {rightButton &&
                            <Image source={rightButton} style={elements.fieldImage} />
                        }
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: "column"
    }
});

export default FormTextInput;