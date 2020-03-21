import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    slider: {
        elevation: 3,
        padding: 20,
        borderRadius: 30,
        width: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        shadowColor: '#ccc',
        shadowRadius: 8,
        shadowOpacity: 0.9,
        backgroundColor: 'white'
    },
    topSlider: {
        top: 0,
        paddingTop: 40
    },
    bottomSlider: {
        bottom: 0
    },
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
        paddingTop: 50,
        paddingBottom: 50
    },
    musicControlsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 250
    },
    playButton: {
        backgroundColor: theme.colors.primaryAccent,
        width: 50,
        height: 50,
        borderRadius: 100
    },
    carouselImageView: {
        width: 300,
        height: 300,
        padding: 10
    },
    carouselImage: {
        width: 280,
        height: 280,
        borderRadius: 140
    },
    songDetailsView: {
        marginTop: 30,
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
        marginTop: 40
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
    }
});
