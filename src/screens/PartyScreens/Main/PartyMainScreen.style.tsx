import { StyleSheet, Dimensions } from 'react-native';

export default (theme: any) => StyleSheet.create({
    // slider: {
    //     elevation: 3,
    //     padding: 20,
    //     width: '100%',
    //     position: 'absolute',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     shadowColor: '#ccc',
    //     shadowRadius: 8,
    //     shadowOpacity: 0.9,
    //     backgroundColor: 'white'
    // },
    // topSlider: {
    //     top: 0,
    //     paddingTop: 40,
    //     borderBottomLeftRadius: 30,
    //     borderBottomRightRadius: 30,
    // },
    // bottomSlider: {
    //     bottom: 0,
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    // },
    edgeRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexGrow: 1
    },
    pageTitle: {
        fontWeight: '700',
        fontSize: 18
    },
    partyId: {
        fontWeight: '600'
    },
    main: {
        marginTop: 130,
        paddingTop: 10,
    },
    musicControlsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 250
    },
    playButton: {
        backgroundColor: theme.colors.primary,
        width: 50,
        height: 50,
        borderRadius: 100
    },
    carouselImageView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * .6,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    carouselImage: {
        width: Dimensions.get('window').width * .5,
        height: Dimensions.get('window').width * .5,
        borderRadius: 140
    },
    carouselImageActive: {
        borderWidth: 5,
        borderColor: theme.colors.primary,
    },
    songDetailsView: {
        padding: 20
    },
    songTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    songArtist: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.5
    },
    songProgressView: {
        marginTop: 30
    },
    progressBar: {
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginTop: 15
    },
    leaveText: {
        fontWeight: '700'
    },
    sliderExpanded: {
        height: '95%'
    },
    overlayView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
});
