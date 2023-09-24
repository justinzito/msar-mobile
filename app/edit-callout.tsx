import { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, ScrollView, TouchableOpacity, Text, View, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';
import colors from '../styles/colors';
import { elements } from '../styles/elements';
import { router, useLocalSearchParams } from 'expo-router';
import { calloutType } from '../types/enums';
import DropdownSelector from '../components/inputs/DropdownSelector';
import FormTextInput from '../components/inputs/FormTextInput';
import FormTextArea from '../components/inputs/FormTextArea';
import FormCheckbox from '../components/inputs/FormCheckbox';

const Page = () => {


    const [ten22, setTen22] = useState(false);
    const [locationText, setLocationText] = useState('');

    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
    } else if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(colors.primaryBg);
    }

    const params = useLocalSearchParams();
    var calloutId: number = null;
    var headerTitle: string = "Create Callout";

    let callOutTypeSelect = [
        { label: "Search", enum: calloutType.SEARCH, value: '0' },
        { label: "Rescue", enum: calloutType.RESCUE, value: '1' },
        { label: "Information", enum: calloutType.INFORMATION, value: '2' }
    ]

    let radioFrequencySelect = [
        { label: "LHS Metro", value: '0' },
        { label: "Malibu Metro", value: '1' },
        { label: "L-Tac", value: '2' },
        { label: "MRA MAL", value: '3' }
    ]

    if (params.calloutId && typeof params.calloutId === 'string') {
        calloutId = parseInt(params.calloutId, 10);
        headerTitle = "Update Callout";
    }

    const createCallout = () => {

    }

    const calloutTypeSelected = (item: any) => {
        console.log(item.enum);
    }

    const locationChanged = (text: string) => {
        setLocationText(text);
    }

    const locationButtonPressed = () => {
        router.push({ pathname: 'edit-location', params: { locationDescription: locationText } })
    }

    const subjectChanged = (text: string) => {
        console.log(text);
    }

    const informantChanged = (text: string) => {
        console.log(text);
    }

    const informantContactChanged = (text: string) => {
        console.log(text);
    }

    const radioFreqSelected = (item: any) => {
        console.log(item.label);
    }

    const on1022Toggle = (checked: boolean) => {
        setTen22(checked);
        if (!checked) {
            //clear 10-22 reason
        }
    }

    const ten22NoteChanged = (text: string) => {
        console.log(text);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={headerTitle} backButton={true} timestamp={new Date()} />
            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust the offset as needed
            >
                <ScrollView style={styles.scrollView}>
                    <DropdownSelector
                        title={'Callout Type'}
                        options={callOutTypeSelect}
                        placeholder={'Select type'}
                        onSelect={calloutTypeSelected} />
                    <FormTextInput
                        title={'Location'}
                        rightButton={require('../assets/icons/map.png')}
                        onRightPress={locationButtonPressed}
                        onChange={locationChanged}
                        placeholder='Location' />
                    <FormTextInput
                        title={'Subject'}
                        onChange={subjectChanged}
                        placeholder='Subject' />
                    <FormTextInput
                        title={'Informant'}
                        onChange={informantChanged}
                        placeholder='Informant' />
                    <FormTextInput
                        icon={require('../assets/icons/phone.png')}
                        onChange={informantContactChanged}
                        placeholder='Informant Contact' />
                    <FormTextArea
                        title={'Circumstances'}
                        height={100}
                        onChange={informantContactChanged}
                        placeholder='Circumstances' />
                    <DropdownSelector
                        title={'Radio Frequency'}
                        options={radioFrequencySelect}
                        placeholder={'Select Frequency'}
                        onSelect={radioFreqSelected} />
                    <FormCheckbox
                        title={'10-22'}
                        checked={ten22}
                        onToggle={on1022Toggle} />
                    {ten22 &&
                        <FormTextArea
                            height={100}
                            onChange={informantContactChanged}
                            placeholder='10-22 Notes' />
                    }
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[elements.capsuleButton, styles.submitCalloutButton]}
                        onPress={() => createCallout()}>
                        <Text style={[elements.whiteButtonText, { fontSize: 18 }]}>{headerTitle}</Text>
                    </TouchableOpacity>
                    <View style={{height: 40}} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBg
    },
    contentContainer: {
        flex: 1,
    },
    scrollView: {
        marginTop: 0,
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20
    },
    submitCalloutButton: {
        marginVertical: 20,
        height: 60,
        left: 0,
        right: 0,
    }
});

export default Page;