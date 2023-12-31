import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { calloutSummary, colorForResponseType, colorForTypeAndStatus, imageForType, textForResponseType } from '../../types/calloutSummary';
import { responseType } from "../../types/enums"
import { elements } from '../../styles/elements';
import colors from '../../styles/colors';
import { getConditionalTimeString } from '../../utility/dateHelper';
import { locationToShortString } from '../../types/location';
import { respondedItem } from '../../types/respondedItem';

type CalloutCellProps = {
    summary: calloutSummary,
    onPress: (calloutSummary: calloutSummary) => void
}

const CalloutCell = ({summary, onPress}: CalloutCellProps) => {

    const cellPressed = () => {
        onPress(summary);
    }

    const calculateResponseCount = (): number => {
        if (!summary.responded) {
            return 0;
        }

        var total = 0;
        let responded = summary.responded as respondedItem[]
        responded.forEach((item: respondedItem) => {
            if (item.response != responseType.TEN7) {
                total += item.total;
            }
        })

        return total;
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={cellPressed}>
            <View style={[elements.tray,styles.container]}>
                <View style={[styles.sideBar, {backgroundColor: colorForTypeAndStatus(summary.operation_type, summary.status)}]}>
                    <Image source={imageForType(summary.operation_type)} style={styles.sideBarImage} />
                    <View style={styles.sideBarDiv} />
                    <Text style={styles.sideBarNumber}>{calculateResponseCount()}</Text>
                </View>
                <View style={styles.contentBar}>
                    <View style={styles.contentTop}>
                        <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode='tail'>{summary.title}</Text>
                        <Text style={[styles.responseText, {color: colorForResponseType(summary.my_response)}]}>{textForResponseType(summary.my_response)}</Text>
                    </View>
                    <View style={styles.contentMiddle}>
                        <Text style={styles.locationText} numberOfLines={1} ellipsizeMode='tail'>{locationToShortString(summary.location)}</Text>
                        <Image source={require('assets/icons/forward_narrow.png')} style={styles.arrowImage} />
                    </View>
                    <View style={styles.contentBottom}>
                        <View style={[elements.capsule]}>
                            <Text style={elements.smallYellowText}>{getConditionalTimeString(summary.created_at)}</Text>
                        </View>
                        <View style={[elements.capsule, { marginLeft: 10}]}>
                            <Image source={require('assets/icons/log_yellow.png')} style={styles.logImage} />
                            <Text style={elements.smallYellowText}>{summary.log_count}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 100,
        marginHorizontal: 20,
        marginVertical: 10,
        overflow: "hidden"
    },
    sideBar: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 50
    },
    sideBarImage: {
        resizeMode: "contain",
        width: 30,
        height: 30
    },
    sideBarDiv: {
        height: 0.5,
        width: "70%",
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#00000033"
    },
    sideBarNumber: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.primaryBg
    },
    contentBar: {
        flex: 1,
        flexDirection: "column"
    },
    contentTop: {
        flexDirection: "row",
        margin: 10
    },
    subjectText: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.primaryText,
        flex: 1,
    },
    responseText: {
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
        marginRight: 20
    },
    contentMiddle: {
        flexDirection: "row",
        marginHorizontal: 10,
        alignItems: "center"
    },
    locationText: {
        flex: 1,
        fontSize: 12,
        fontWeight: "200",
        color: colors.primaryText
    },
    arrowImage: {
        resizeMode: "contain",
        width: 20,
        height: 20,
        marginLeft: 10
    },
    contentBottom: {
        flexDirection: "row",
        margin: 10
    },
    logImage: {
        resizeMode: "contain",
        width: 14,
        height: 14,
        marginRight: 4
    }
})

export default CalloutCell;
