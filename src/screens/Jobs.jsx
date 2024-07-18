import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import Bookmarks from './Bookmarks';
import axios from 'axios';
import Jobdetails from './Jobdetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-paper';

const response = async () => {
  try {
    const response = await axios.get('https://testapi.getlokalapp.com/common/jobs?page=1')
    const data = response.data.results;
    return data;
  } catch (err) {
    console.log(err);
  }
};


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getJobs = async () => {
      const data = await response();
      setJobs(data);
    };

    getJobs();
  }, []);

  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
const fetchBookmarkedJobs = async () => {
  try {
    const savedJobs = await AsyncStorage.getItem('bookmarkedJobs');
    if (savedJobs !== null) {
      setBookmarkedJobs(JSON.parse(savedJobs));
    }
  } catch (error) {
    console.error('Error fetching bookmarked jobs:', error);
  }
};

useEffect(() => {
  fetchBookmarkedJobs();
}, []);

  const handlejobs =(jobId)=>{
    navigation.navigate('JOBDETAILS',{jobId});
    }
  // const [savedJobs, setSavedJobs] = useState([]);
  const handlesavedjobs =async(job)=>{
    console.log('sending job',job);
  try{
    const savedJobs = await AsyncStorage.getItem('bookmarkedJobs');
    const currentbookmarkedJobs = savedJobs ? JSON.parse(savedJobs) : [];
    if(!currentbookmarkedJobs.some(savedJobs =>  savedJobs.id === job.id))
    {
      const updatedBookmarkedJob =[...currentbookmarkedJobs, job];
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarkedJob));
      console.log('Job saved:', job); // Debugging log
    } else {
      console.log('Job already saved:', job); // Debugging log
    }
    console.log('All bookmarked jobs:', currentbookmarkedJobs);
      }
      catch (error)
    {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Updated bookmarkedJobs:', bookmarkedJobs); // Debugging log
  }, [bookmarkedJobs]);

  return (
    <ScrollView style={styles.container}>
      {jobs?(
      <View style={styles.jobContainer}>
        {jobs.map((job,index) => ( 
          <View style={styles.cardWrapper} key={index}>
            <TouchableOpacity onPress={()=>{handlejobs(job.id)}}>
              {job.id !== 'undefined' || null ?
              <Card mode='outlined' style={styles.card}>
                <Card.Content>
               <Text style={styles.title}>{job.title}</Text>
               <View style={styles.contents}>
                    {job.primary_details?(
                    <View>
                    <Text>Location:{job.primary_details.Place}</Text>
                    <Text>Salary: {job.primary_details.Salary}</Text>
                    </View>
            ):(<></>)
          }
               <Text style={styles.contents}>Contact Number: {job.whatsapp_no}</Text>

               </View>
                </Card.Content>
                <Card.Actions>
                  <Button icon={require('../assests/icons/bookmark.png')} onPress={()=>handlesavedjobs(job)}>Save</Button>
                </Card.Actions>
              </Card>
              :<></>
}
            </TouchableOpacity>
          </View>
        ))}
      </View>
):(<></>)}
      {/* <Bookmarks currentbookmarkedJobs={job} /> */}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#6b8f8d'
  },
  jobContainer: {
    marginTop: 15,
  },
  cardWrapper: {
    marginBottom: 20, // Adjust the gap between cards here
  },
  title:{
    fontStyle:'italic',
    fontWeight: "bold",
    fontSize: 17,
    paddingBottom:10
  },
  card:{
    borderRadius:18,
    borderColor:'black',
    // height:230
  },
  contents:{
    fontStyle:'italic',
    fontSize: 15,
    paddingBottom:7,
    
  }
});

export default Jobs;


