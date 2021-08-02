import React, { useState,useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button, ThemeProvider } from 'react-native-elements';
import Spacer from '../../component/Spacer';
import connectionApi from '../../api/connection';
import { TextInput, Card, RadioButton, Title } from 'react-native-paper';
const SignupScreen = ({ navigation,route }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [teacherId, setTeacherId] = useState('');
    //const [teacher, setTeacher] = useState(false);
    const [checked, setChecked] = React.useState('second');
    const [img,setImage] = useState('');
    useEffect(()=>{
        if(!route.params){
            console.log('yes');
        }else{
            const img=setImage(route.params.data)
        }
    })
    //console.log('Signup = ');
    //console.log(img);
    //are you a teacher if yes 2 option
    //create a post method to send data 
    const Signup = async () => {
        const isTeacher = radiostate();
        const data={
            phone: phone,
            name: name,
            email_id: email,
            isTeacher: isTeacher,
            profile_image:img,
            teacher_id:teacherId,
        };
        console.log(JSON.stringify(data));
        try {
            const resp = await connectionApi.post('/signup',  data );
            console.log(resp.data);
        } catch (err) {
            console.log(err);
        }
        navigation.navigate('Login');
    }
    const radiostate = () => {
        if (checked === 'first') {
            return (true);
        } else {
            return (false);
        }
    }
    //else 
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.containerkey}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ThemeProvider>
                    <Card>
                            <Spacer>
                                <Text h3>Sign Up for App</Text>
                            </Spacer>
                            <Spacer />
                            <TextInput
                                label="Name"
                                mode="outlined"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                          <TextInput
                                mode="outlined"
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                mode="outlined"
                                label="Phone"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="number-pad"
                            />
                            <Spacer />
                            <Button
                                title="Submit"
                                onPress={() => { Signup() }}
                            />
                            <Title>
                                Are you a teacher ?
                            </Title>
                            <View style={styles.AreYouTechContainer}>
                                <View style={styles.RadioButtonViewContainer}>
                                    <Title>
                                        Yes
                                </Title>
                                    <RadioButton
                                        value="first"
                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('first')}
                                    />
                                </View>
                                <View style={styles.RadioButtonViewContainer}>
                                    <Title>
                                        No
                                </Title>
                                    <RadioButton
                                        value="second"
                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('second')}
                                    />
                                </View>
                            </View>
                            {radiostate() ?
                                <View>
                                    <TextInput
                                        mode="outlined"
                                        label="Teacher Id"
                                        value={teacherId}
                                        onChangeText={setTeacherId}
                                    />
                                    <Button
                                title="Upload photo"
                                onPress={() => { navigation.navigate('Camera',{"client":"Signup"}); }}
                            />
                                </View>
                                : null}
                        </Card>

                    </ThemeProvider>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    btnContainer: {
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    AreYouTechContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    RadioButtonViewContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    containerkey: {
        flex: 1
    },
    inner: {
        padding: 16,
        flex: 1,
        justifyContent: "space-around"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250,
    },
});

export default SignupScreen;
