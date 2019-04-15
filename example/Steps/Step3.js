import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Step3 extends Component {

  render() {
    return (
        <View style={{
          backgroundColor:this.props.color,
          flex  : 1/2,
          height: '100%',
          flexDirection:'row',
          alignContent:'center',
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{fontSize:24, fontWeight: 'bold', color:'#fff'}}>
            {this.props.step3Special}
          </Text>
        </View>
    );
  }
}

export default Step3