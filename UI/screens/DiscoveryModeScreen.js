/*****************************************************************************************
 * Team: Language Scavengers
 * Date: 11/13/2018
 * Description: This screen will be for Scavenger Mode.
 * Display:
 *      - Word to find
 *      - points at stake
 *      - Current score
 *
 * Buttons:
 *      - Camera Button
 *          -goes to camera
 *      - Skip Button
 *          -finds another word to be found
 *
 *****************************************************************************************/
import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
import ButtonCamera from '../components/ButtonCamera';
import ButtonSkip from '../components/ButtonSkip';
import ButtonNextWord from '../components/ButtonNextWord';
import Card from '../components/Card';
import vocabDictionary from '../data/vocabDictionary';
import axios from 'axios';

export default class DiscoveryMode extends React.Component {
    /*Constructor*/
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            previousWordIndex: 0,
            foundWord: '',
            correct: false,
            incorrect: false,
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
        this.spinValue = new Animated.Value(0)
    };

    static navigationOptions = {
        headerTransparent: true,
    };



    handleCameraClick = async () => {
        try {
			//ask to use the camera
            result = getPermsAsync();
			//Loading screen
            setTimeout(()=>this.setState({loading: true}, () => this.spin()), 1000);
			//Take photo and Identify objects in photo
            let response = await takePhotoAsync();
            if (response !== 0){
                console.log(response.data);
				this.setState({
                        loading: false,
                        correct: true,
						foundWord: response.data,
                })

            }
			this.setState({
					loading: false,
					correct: true,
					foundWord: response.data,
				})
			console.log(this.foundWord)
			return;
        } catch(error){
            alert(error);
        };


    };

    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => this.spin());
    };

/////////////////////////////////////
    render() {
        const rotate = this.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})
        let screen = (
            <ScrollView style={styles.container}>
            <CardScroll>
                <View style={styles.Header}>

                    <FontAwesome name="rocket" size={30} style={styles.MagnifyingGlass} />
                    <Text style={styles.TileHeaderText}> Discovery mode</Text>
				</View>
				<View style= {styles.SubHeader}>
					<Text style={styles.SubText}>
						Discover how to say a variety of new words throughout the world in a new language. Click the camera button when you want to begin.
					</Text>
				</View>
				<View style={styles.Options}>
					<ButtonCamera clickHandler = {this.handleCameraClick}/>
				</View>
            </CardScroll>
        </ScrollView>
        );

////////////////////////////////////
        if (this.state.loading) {
            screen = (
                <ScrollView style={styles.container}>
                    <View style={styles.containerLoading}>
                        <Animated.View style={{transform: [{rotate}]}}>
                            <FontAwesome name="spinner" size={100} style={styles.Loading} spin/>
                        </Animated.View>
                    </View>
                </ScrollView>
            )
        };
        if (this.state.correct) {
            screen = (
                <ScrollView style={styles.container}>
					/*Print out the item found and the translation */
                    <CardScroll>
						<Text style={styles.SubText}> You Found {this.foundWord} </Text>
                    </CardScroll>
                    <View style={styles.Options}>
                        <ButtonNextWord clickHandler = {this.handleNextButton}/>
                    </View>
                </ScrollView>
            )
        };
        if (this.state.incorrect) {
            screen = (
                <ScrollView style={styles.container}>
                    <Card>
                        <FontAwesome name="times-circle" size={60} style={styles.Check} />
                        <Text style={styles.TileHeaderText}> Try Again </Text>
                    </Card>
                    <View style={styles.Options}>
                        <ButtonCamera clickHandler = {this.handleCameraClick}/>
                        <ButtonSkip clickHandler = {this.handleSkipClick}/>
                    </View>
                </ScrollView>
            )
        };
        return (
            screen
        )
    }

}

async function getPermsAsync(){
	const { status } = await Permissions.askAsync( Permissions.CAMERA, Permissions.CAMERA_ROLL );
	if( status === 'granted' ) {
		return status;
	}
	else
		return 69;

}

async function takePhotoAsync(){
	/*Take Photo Async
	* Uses Imagepicker to take a photo with camera
	* Sends the photo via post request to server to get analyzed
	* Retrieves data back from get request */
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
     });

    if (result.cancelled) {
        return 0;
    }
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });

    return axios({
        method: 'post',

        url: 'http://fbf3eaea.ngrok.io/post',
        data: formData,
        headers: {
            'contentt-type': 'multipart/form-data',
        },
      });


//	return response;//state is over, save data before leaving this function


}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        paddingTop: 65,
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    Check: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    SubHeader: {
        flex: 3,
        flexDirection: 'row',
    },
    SubText: {
        fontSize: 20,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    CurrentWord: {
        fontSize: 20,
        paddingTop: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Options: {
        flex: 3,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    containerLoading: {
        alignItems: 'center',
    },
    Loading: {
        margin: 40,
        padding: 10,
        color: 'rgba(102,180,32, 1)',
    }
});
