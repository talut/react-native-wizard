import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

class Step2 extends Component {
  state = {
    showNextButton: false
  };

  render() {
    return (
        <View style={{
          flex  : 1,
          height: '100%',
          flexDirection:'row',
          alignContent:'center',
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{fontSize:24, fontWeight: 'bold'}}>
            {this.props.title}
          </Text>
        </View>
    );
  }
}

export default Step2