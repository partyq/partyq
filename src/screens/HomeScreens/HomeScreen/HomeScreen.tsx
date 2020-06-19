import React from 'react';
import auth from '@react-native-firebase/auth';
import { iUser } from 'src/utility/types';
import { connect } from 'react-redux';

interface iHomeScreenProps {
    user: iUser
}

const HomeScreen = (props: iHomeScreenProps) => {
    const {
        user
    } = props;

    console.log(auth().currentUser);
    console.log(user);

    return (
        <></>
    )
};

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user
});

export default connect(
    mapStateToProps,
    null
)(
    HomeScreen
);