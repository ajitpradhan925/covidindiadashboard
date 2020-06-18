import React from 'react';
import { StyleSheet,ToolbarAndroid, Text, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    return fetch('https://api.covid19india.org/data.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.statewise,
          update_date:''
        })
      })
      .catch((error) => {
        console.log(error);
      })

      
  }

  
  render() {

    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

      let data_cases = this.state.dataSource.map((val, key) => {
        return <View style={styles.main_layout}> 

              
                <Text style={{marginLeft:10,marginTop:5, color:'#fff'}}>Last Updated: {val.lastupdatedtime}</Text>


                {/* First Row */}
                <View style={{width: '100%',marginTop:20, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                  <View style={styles.card_inner}>
                    <Text style={{color:'#FF073A', fontSize:15}}>Confirmed</Text>
                    <Text style={{color: '#FF7D98', marginTop:10}}>{"[ +" + val.deltaconfirmed +" ]"}</Text>
                     <Text style={{color: '#FF073A',fontSize:30, marginTop:10}}>{val.confirmed}</Text>
                  </View>

                  <View style={styles.card_inner_1}>
                    <Text style={{color:'#1485FF', fontSize:15}}>Active</Text>
                     <Text style={{color: '#1485FF',fontSize:30, marginTop:10}}>{val.active}</Text>
                  </View>

                </View>


                {/* Second Row */}


                <View style={{width: '100%',marginTop:20,marginBottom:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                    <View style={styles.card_inner}>
                      <Text style={{color:'#4db665', fontSize:15}}>Recovered</Text>
                      <Text style={{color: '#63bf77', marginTop:10}}>{"[ +" + val.deltarecovered +" ]"}</Text>
                      <Text style={{color: '#4db665',fontSize:30, marginTop:10}}>{val.recovered}</Text>
                    </View>

                    <View style={styles.card_inner_1}>
                      <Text style={{color:'#788087', fontSize:15}}>Death</Text>
                      <Text style={{color: '#B7BBBF', marginTop:10}}>{"[ +" + val.deltadeaths +" ]"}</Text>
                      <Text style={{color: '#B7BBBF',fontSize:30, marginTop:10}}>{val.deaths}</Text>
                    </View>

              </View>
            </View>

      });
    

    return (

      <View style={styles.container}>
        <Text style={{marginBottom:20, fontSize:30, textAlign:'center',color: "#4caf50",}}>India Covid19 Cases Dashboard</Text>


        {data_cases[0]}
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    
  },
  main_layout: {
    width:'100%',
    padding:10,
    borderRadius:5,
    backgroundColor: "#4caf50",
    elevation: 4,
  },

  card_inner: {
    backgroundColor: '#fff',
    width:150,
    height:150,
    borderRadius:5,
    elevation: 4,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center'
  },
  card_inner_1: {
    backgroundColor: '#fff',
    width:150,
    height:150,
    borderRadius:5,
    elevation: 4,
    marginLeft:10,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center'
  }
});
