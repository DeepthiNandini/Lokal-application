import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ActivityIndicator, Card } from 'react-native-paper';

const Jobdetails = ({ route }) => {
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState(null);


  console.log(jobId);
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get('https://testapi.getlokalapp.com/common/jobs?page=1');
      const data = response.data.results;
      const job = data.find(job => job.id === jobId);
      setJobDetails(job);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return (
      <View style={{alignItems:'center'}}>
        <ActivityIndicator size={60} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card  mode='outlined'>
      <Text style={styles.title}>{jobDetails.title} </Text>
      {jobDetails.primary_details?(
        <Card.Content>

         <Text style={styles.contents} >Place:{jobDetails.primary_details.Place}</Text>
         <Text style={styles.contents}>Salary: {jobDetails.primary_details.Salary || "Not Disclosed"}</Text>
         <Text style={styles.contents}>Experience: {jobDetails.primary_details.Experience}</Text>
         <Text style={styles.contents}>Qualification: {jobDetails.primary_details.Qualification}</Text>
         
         </Card.Content>
      ):(<></>)
      }
      <Card.Content style={styles.card}>
      <Text style={styles.contents}>Company Name: {jobDetails.company_name}</Text>
      <Text style={styles.contents}>Contact Number: {jobDetails.whatsapp_no}</Text>
      <Text style={styles.contents}>Job RoleId: {jobDetails.job_role_id}</Text>
      <Text style={styles.contents}>Job Role: {jobDetails.job_role}</Text>
      <Text style={styles.contents}>Updated on: {jobDetails.job_category}</Text>
      <Text style={styles.contents}>Salary-Max: {jobDetails.salary_max || "Not Disclosed"}</Text>
      <Text style={styles.contents}>Salary-Min: {jobDetails.salary_min || "Not Disclosed"}</Text>
      <Text style={styles.contents}>Amount: {jobDetails.amount}</Text>
      <Text style={styles.contents}>Viewed: {jobDetails.views}</Text>
      <Text style={styles.contents}>Updated on: {jobDetails.updated_on}</Text>
      <Text style={styles.contents}>Last Date: {jobDetails.expire_on}</Text>
      <Text style={styles.contents}>Fees Charged: {jobDetails.fees_charged}</Text>
      <Text style={styles.contents}>No.of Openings: {jobDetails.openings_count}</Text>
      </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6b8f8d',
  },
  title: {
      fontStyle:'italic',
      fontWeight: "bold",
      color:'black',
      fontSize: 17,
      paddingBottom:10,
      padding: 15
  },
  contents:{
    fontStyle:'italic',
    fontSize: 15,
    paddingBottom:7,
    color: 'black'
    
  }
});

export default Jobdetails;
