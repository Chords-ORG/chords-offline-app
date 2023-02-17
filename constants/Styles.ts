import { StyleSheet } from 'react-native';

export const light_style = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF'
    },
    bold: {
        fontWeight: 'bold',
    },
    primary_color: {
        color: '#333333'
    },
    secondary_color: {
        color: '#828282'
    },
    active_color: {
        color: '#2F80ED'
    },
    tint_color: {
        color: '#FFFFFF'
    },
    h1: {
        fontFamily: 'roboto',
        fontSize: 18,
    },
    h2: {
        fontFamily: 'roboto',
        fontSize: 16,
    },
    h3: {
        fontFamily: 'roboto',
        fontSize: 14,
    },
    h4: {
        fontFamily: 'roboto',
        fontSize: 12,
    },
    big_card: {
        height: 70,
        width: '100%',
        backgroundColor: '#F2F2F2',
        marginBottom:10,
        marginTop:10,
        padding: 10,
        borderRadius: 5,
    },
    medium_card: {
        height: 60,
        width: '100%',
        backgroundColor: '#F2F2F2',
        marginBottom:10,
        marginTop:10,
        padding: 10,
        borderRadius: 5,
    },
    small_card: {
        height: 50,
        width: '100%',
        backgroundColor: '#F2F2F2',
        marginBottom:10,
        marginTop:10,
        padding: 10,
        borderRadius: 5,
    },
    horizontal_separator: {
        width:'100%',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    vertical_separator: {
        height: '100%',
        borderLeftColor: '#E4E4E4',
        borderLeftWidth: 1,
        marginRight: 10,
        marginLeft: 10
    },
    selected_line:{ 
        width:'100%', 
        borderBottomWidth:2, 
        borderBottomColor: '#2F80ED',
        marginTop:5,
        marginBottom:5,
    }
})

export const dark_style = StyleSheet.create({
    container:{
        backgroundColor:'#1E201D'
    },
    bold: {
        fontWeight: 'bold',
    },
    primary_color: {
        color: '#FFFFFF'
    },
    secondary_color: {
        color: '#BDBDBD'
    },
    active_color: {
        color: '#2F80ED'
    },
    tint_color: {
        color: '#FFFFFF'
    },
    h1: {
        fontFamily: 'roboto',
        fontSize: 18,
    },
    h2: {
        fontFamily: 'roboto',
        fontSize: 16,
    },
    h3: {
        fontFamily: 'roboto',
        fontSize: 14,
    },
    h4: {
        fontFamily: 'roboto',
        fontSize: 12,
    },
    big_card: {
        height: 70,
        width: '100%',
        backgroundColor: '#313337',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    medium_card: {
        height: 60,
        width: '100%',
        backgroundColor: '#313337',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    small_card: {
        height: 50,
        width: '100%',
        backgroundColor: '#313337',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    horizontal_separator: {
        width:'100%',
        borderBottomColor: '#828282',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    vertical_separator: {
        height: '100%',
        borderLeftColor: '#828282',
        borderLeftWidth: 1,
        marginRight: 10,
        marginLeft: 10
    },
    selected_line:{ 
        width:'100%', 
        borderBottomWidth:2, 
        borderBottomColor: '#2F80ED',
        marginTop:5,
        marginBottom:5,
    }
})