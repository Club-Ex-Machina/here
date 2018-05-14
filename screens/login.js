import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet, AppRegistry, StatusBar, Image } from 'react-native';
import { Input, Button, FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
// import { Image } from 'react-native-svg';

//Definir la taille de l'ecran
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Definir la photo de background
const BG_IMAGE = require('../assets/spqr4.png')

//definir la photo de login avec le QR code
const QR_IMAGE = require('../assets/QR_IMAGE.png')


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        //definir les etats de depart(initialisation)
        this.state = {
            fontLoaded: false,
            username: '',
            usernameValid: true,
            password: '',
            login_failed: false,
            showLoading: false
        };
    }

    //Verifier si les components sont bien loader avec une fonction asynchrone
    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('../assets/fonts/Georgia.ttf'),
            'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            'light': require('../assets/fonts/Montserrat-Light.ttf'),
            'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    //Code de validation regex pour verifer le format du username (11(xx)1111(11))
    validateUsername(username) {
        var re = /\d{2}\D{1,2}\d{4,6}/;

        return re.test(username);
    }

    //En attendant que les informations soient validé, cette partie montre un loading icon
    submitLoginCredentials() {
        const { showLoading } = this.state;

        this.setState({
            showLoading: !showLoading
        });
    }

    render() {
        
        const { username, password, usernameValid, showLoading } = this.state;

        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                />
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                <Image
                    source={QR_IMAGE}
                    style={{flexDirection: 'row', right: 110, left: -110, bottom: 18, width: 80, height: 80}}
                />
                    {this.state.fontLoaded ?
                        <View style={styles.loginView}>
                            <View style={styles.loginTitle}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.titleText}>I'm HERE</Text>
                                </View>
                            </View>
                            <View style={styles.loginInput}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name='user'
                                            color='rgba(255, 255, 255, 1)'
                                            size={35}
                                        />
                                    }
                                    inputContainerStyle={styles.borderInput}
                                    containerStyle={{ marginVertical: 15 }}
                                    onChangeText={username => this.setState({ username })}
                                    value={username}
                                    inputStyle={{ marginLeft: 15, color: 'white', fontSize: 22, }}
                                    keyboardAppearance="light"
                                    placeholder="Nom d'utilisateur"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    ref={input => this.emailInput = input}
                                    onSubmitEditing={() => {
                                        this.setState({ usernameValid: this.validateUsername(username) });
                                        this.passwordInput.focus();
                                    }}
                                    blurOnSubmit={true}
                                    placeholderTextColor="white"
                                    errorStyle={{ textAlign: 'center', fontSize: 12 }}
                                    errorMessage={usernameValid ? null : "Veuillez entrer un nom d\'utilisateur qui soit valide"}
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name='lock'
                                            color='rgba(255, 255, 255, 1)'
                                            size={35}
                                        />
                                    }
                                    inputContainerStyle={styles.borderInput}
                                    containerStyle={{ marginVertical: 15 }}
                                    onChangeText={(password) => this.setState({ password })}
                                    value={password}
                                    inputStyle={{ marginLeft: 15, color: 'white',fontSize: 22, }}
                                    secureTextEntry={true}
                                    keyboardAppearance="light"
                                    placeholder="Mot de passe"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    ref={input => this.passwordInput = input}
                                    blurOnSubmit={true}
                                    placeholderTextColor="white"
                                />
                            </View>
                            <Button
                                title='SE CONNECTER'
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={this.submitLoginCredentials.bind(this)}
                                loading={showLoading}
                                loadingProps={{ size: 'small', color: 'white' }}
                                disabled={!usernameValid && password.length < 8}
                                buttonStyle={{ height: 65, width: 265, backgroundColor: 'transparent', borderWidth: 3, borderColor: 'white', borderRadius: 33, shadowColor: '#0039CB', shadowRadius: 2, shadowOpacity: 2, shadowOffset: { width: 2, height: 2 }}}
                                containerStyle={{ marginVertical: 10, alignItems: 'center' }}
                                titleStyle={{ fontWeight: 'bold', color: 'white' }}
                            />
                        </View> :
                        <Text>En chargement...</Text>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrImage:{
        width: 40,
        height: 40
    },
    loginView: {
        marginTop: -150,
        backgroundColor: 'transparent',
        width: 300,
        height: 450,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 40,
        left: 44,
        fontFamily: 'bold'
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderInput: {
        borderColor: 'white',
    }
});
