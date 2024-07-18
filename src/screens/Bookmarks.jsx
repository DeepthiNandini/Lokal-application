import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

 useEffect(() =>{
  const getjobs = async ()=>{
    try{
      const savedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      setBookmarkedJobs(savedJobs);
      console.log("recieving jobs",savedJobs);
      if (savedJobs !== null) {
        setBookmarkedJobs(JSON.parse(savedJobs));
        console.log("bookmarked",setBookmarkedJobs);
      } else {
        setBookmarkedJobs([]);
      }

    }
    catch(error){
      console.log(error);
    }  
  };
  getjobs();
 },[]);

 useEffect(() => {
  console.log('Updated bookmarkedJobs:', bookmarkedJobs); // Debugging log
}, [bookmarkedJobs]);
  return (
    <ScrollView>
    <View style={styles.container}>
    {!bookmarkedJobs? (
      <Text>No saved jobs</Text>
    ) : (
      <FlatList
      
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.list} >
          <Card mode='outlined' style={styles.card}>
           <Card.Content>
            <Text style={styles.title}>{item.title || item.company_name || "No Data"}</Text>
            <Text>{item.id}</Text>
            {item.primary_details?(
                    <View>
                    <Text style={styles.contents}>Location:{item.primary_details.Place}</Text>
                    <Text style={styles.contents}>Salary: {item.primary_details.Salary}</Text>
                    </View>
            ):(<></>)
          }
               <View style={styles.contents}>
                  <Text style={styles.contents}>Contact Number: {item.whatsapp_no ||"No Number"}</Text>
                  <Text style={styles.contents}>{item.button_text}</Text>
               </View>
               </Card.Content>
          </Card>
          </View>
        )}
      />
    )}
  </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
     backgroundColor:'#6b8f8d'
  },
  cardWrapper: {
    marginBottom: 20,
  },
  list:{
    marginTop:10,
    paddingBottom: 20,
  },
  title:{
    fontStyle:'italic',
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom:10
  },
  contents:{
    fontStyle:'italic',
    fontSize: 15,
    paddingBottom:7,
    
  }
});


export default Bookmarks;
