<<<<<<< HEAD
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
=======
import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
<<<<<<< HEAD
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
=======
import ButtonCameraLarge from '../components/ButtonCameraLarge'
import Card from '../components/Card';
import axios from 'axios';
import vocabDictionary from '../data/vocabDictionary';

export default class DiscoveryModeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: false,
            Guesses: [],
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    };

    static navigationOptions = {
        headerTransparent: true,
    };

<<<<<<< HEAD


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
=======
    handleNextButton () {
        this.setState({correct: false});
    }

    handleTryAgain () {
        this.setState({incorrect: false});
    }

    handleCameraClick = async () => {
        try {
            setTimeout(()=>this.setState({results: false}), 1000);
            result = getPermsAsync();
            setTimeout(()=>this.setState({loading: true}), 1000);
            let response = await takePhotoAsync();
            if (response !== 0){
                let temp = response.data.replace(/'/g, '"');
                temp = temp.replace(/\\"/g, '\\\'');
                let Guesses = JSON.parse(temp);
                this.setState({
                    loading: false,
                    results: true,
                    Guesses, 
                });
            } else {
                this.setState({loading: false});
                return;
            }
        } catch(error){
            this.setState({loading: false});
            alert('Could Not Classify Image 💩');
            // alert(error);
        };

    };

    render() {
        let screen = (
            <ScrollView style={styles.container}>
                <Card>
                    <View style={styles.Header}>
                        <FontAwesome name="globe" size={30} style={styles.MagnifyingGlass} />
                        <Text style={styles.TileHeaderText}> Discovery Mode </Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.Results}> Take a picture and we can translate </Text>
                        <Text style={styles.Results}> the object for you.</Text>
                    </View>
                </Card>
            <View style={styles.Options}>
                <ButtonCameraLarge clickHandler={this.handleCameraClick}/>
            </View>
        </ScrollView>
        );
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
        if (this.state.loading) {
            screen = (
                <ScrollView style={styles.container}>
                    <View style={styles.containerLoading}>
<<<<<<< HEAD
                        <Animated.View style={{transform: [{rotate}]}}>
                            <FontAwesome name="spinner" size={100} style={styles.Loading} spin/>
                        </Animated.View>
=======
                        <ActivityIndicator size="large" color="#0000ff" />
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
                    </View>
                </ScrollView>
            )
        };
<<<<<<< HEAD
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
=======

        if (this.state.results) {
            let indents = [];
            for (var i = 0; i < this.state.Guesses[0].length; i++) {
                // console.log(this.state.incorrectGuesses[0][i]);
                indents.push(
                <View className='parentResults' key={i}> 
                    <Text style={styles.GuessResults} className='guess'> - {this.state.Guesses[0][i]} </Text> 
                    <Text style={styles.GuessResultsTranslate} className='translate'> {this.state.Guesses[1][i]}</Text>
                </View>
                );
            }
            screen = (
                <ScrollView style={styles.container}>
                    <CardScroll>
                        <View>
                            <Text style={styles.ResultHeaderText}> Our Guesses </Text>
                        </View> 
                        <View style={styles.SubHeader}>
                            {indents}
                        </View>
                    </CardScroll>
                    <View style={styles.Options}>
                        <ButtonCameraLarge clickHandler={this.handleCameraClick}/>
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
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
<<<<<<< HEAD
	/*Take Photo Async
	* Uses Imagepicker to take a photo with camera
	* Sends the photo via post request to server to get analyzed
	* Retrieves data back from get request */
=======
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
     });

    if (result.cancelled) {
        return 0;
    }
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
<<<<<<< HEAD

=======
    
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });
<<<<<<< HEAD

    return axios({
        method: 'post',

        url: 'http://fbf3eaea.ngrok.io/post',
=======
    let language = await AsyncStorage.getItem('CurrentLanguage');
    formData.append(language);
    return axios({
        method: 'post',
        url: vocabDictionary.urlApi + '/post',
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
        data: formData,
        headers: {
            'contentt-type': 'multipart/form-data',
        },
      });

<<<<<<< HEAD

//	return response;//state is over, save data before leaving this function


}
=======
}

>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
<<<<<<< HEAD
        paddingTop: 65,
=======
        paddingTop: 60,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
<<<<<<< HEAD
        height: 100,
=======
    },
    ResultHeader:{
        flex: 1,
        flexDirection: 'row',
        height: 30,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
<<<<<<< HEAD
=======
    ResultHeaderText:{
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 10,
    },
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    Check: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    SubHeader: {
<<<<<<< HEAD
        flex: 3,
        flexDirection: 'row',
=======
        flex: 1,
        paddingLeft: 10,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
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
<<<<<<< HEAD
        paddingTop: 10,
=======
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Results: {
        fontSize: 17,
        marginLeft: 5,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    GuessResults: {
        fontSize: 20,
        paddingTop: 25,
        paddingLeft: 20,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
<<<<<<< HEAD
    Options: {
        flex: 3,
=======
    GuessResultsTranslate: {
        fontSize: 17,
        paddingTop: 5,
        paddingLeft: 33, 
        color: '#75a3e7',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Options: {
        flex: 1,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    containerLoading: {
<<<<<<< HEAD
=======
        paddingTop: 100,
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
        alignItems: 'center',
    },
    Loading: {
        margin: 40,
        padding: 10,
        color: 'rgba(102,180,32, 1)',
    }
});
