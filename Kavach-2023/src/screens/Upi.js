import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ImageBackground, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

const Upi = () => {
  const [upiinput, setupiInput] = useState('');
  const [upiresult, setupiResult] = useState(null);
  const [error_upi, setErrorUpi] = useState('');
  const [spamUPIs, setSpamUPIs] = useState([]);

  useEffect(() => {
    fetchSpamUPIs();
  }, []);

  const fetchSpamUPIs = () => {
    axios.get('http://192.168.0.107:3000/api/get-spam-upi')
      .then(response => {
        // console.log('Spam UPIs:', response.data);
        setSpamUPIs(response.data);
      })
      .catch(error => {
        console.error('Error fetching spam UPIs:', error);
      });
  };

  const upihandle = () => {
    setErrorUpi('');
    axios.get(`https://kavachallapi-production.up.railway.app/upi/${upiinput}`)
      .then(response => {
        console.log('API Response:', response.data);
        setupiResult(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
        setupiResult(false);
        setErrorUpi('Something went wrong. Please try again.');
      });
  };

  const handleMarkSpamUPI = () => {
    setErrorUpi('');

    // Request for marking as spam
    const markSpamRequest = axios.post('http://192.168.0.107:3000/api/mark-spam-upi', { type: 'upi', data: upiinput });

    // Concurrent requests to flag as ham and spam (replace {upiid} with the actual upi id)
    const flagHamRequest = axios.put(`https://kavachallapi-production.up.railway.app/upi/flag_ham/${upiinput}`);
    const flagSpamRequest = axios.put(`https://kavachallapi-production.up.railway.app/upi/flag_spam/${upiinput}`);

    // Send all requests together using axios.all
    axios.all([markSpamRequest, flagHamRequest, flagSpamRequest])
      .then(axios.spread((markSpamResponse, flagHamResponse, flagSpamResponse) => {
        console.log('Spam Marking Response:', markSpamResponse.data);
        console.log('Flag Ham Response:', flagHamResponse.data);
        console.log('Flag Spam Response:', flagSpamResponse.data);
        fetchSpamUPIs(); // Fetch updated spam UPIs after marking spam
      }))
      .catch(errors => {
        console.error('Error in one or more requests:', errors);
      });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.tableCellIndex , {right:40 , top:10}]}>{index + 1}</Text>
      <Text style={[styles.tableCell, styles.tableCellData , {right:50 , top:10}]}>{item.data}</Text>
      <Pressable style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Report</Text>
      </Pressable>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableCell, styles.tableHeaderCell]}>S.No.</Text>
      <Text style={[styles.tableCell, styles.tableHeaderCell]}>UPI ID</Text>
      <Text style={[styles.tableCell, styles.tableHeaderCell , {right:-10}]}>Report</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>FOR UPI RESULTS</Text>
        <TextInput
          style={styles.input}
          value={upiinput}
          onChangeText={text => setupiInput(text)}
          placeholder="Enter UPI"
          placeholderTextColor="#666"
        />
        <View style={styles.buttonCont}>
        <Pressable style={styles.button} onPress={upihandle}>
          <Text style={styles.buttonText}>Submit UPI</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={handleMarkSpamUPI}>
          <Text style={styles.buttonText}>Mark as Spam</Text>
        </Pressable>
        </View>
        {error_upi ? (
          <Text style={styles.errorText}>{error_upi}</Text>
        ) : null}
        {upiresult !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Name: {upiresult.name !== undefined ? upiresult.name : 'N/A'}</Text>
            <Text style={styles.resultText}>UPI ID: {upiresult.upi_id}</Text>
            <Text style={styles.resultText}>Spam_Mark: {upiresult.spam_mark !== undefined ? upiresult.spam_mark : 'N/A'}</Text>
            <Text style={styles.resultText}>Ham_Mark: {upiresult.ham_mark !== undefined ? upiresult.ham_mark : 'N/A'}</Text>
          </View>
        )}
      
        <FlatList
          data={spamUPIs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          style={styles.tableContainer}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "black",
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingHorizontal: 10,
    color: "black",
    marginBottom: 20,
    fontSize: 16,
  },
  buttonCont: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#112244",
    width: "48%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,

    marginTop: 0,
    fontWeight: "bold",
  },
  button2: {
    backgroundColor: "#B80F0A",
    width: "48%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,

    marginTop: 0,
    fontWeight: "bold",
    marginLeft: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    display: "flex",
  },
  resultText: {
    margin: 5,
    fontSize: 18,
  },
  resultIcon: {
    position: "relative",
    top: 2.5,
  },
  resultText1: {
    position: "relative",
    top: 3.5,
    marginLeft: 3,
  },

  tableScrollView: {
    flex: 1,
    width: "100%", // Set the width to 100% to occupy the entire container
  },
  tableContainer: {
    flexGrow: 1,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    backgroundColor: "white",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    width:"100%"
  },
  tableCell: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    position:"relative",
    right:20
  },
  tableCellIndex: {
    width: "15%",
  },
  tableCellDataContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableCellData: {
    fontSize: 14,
  },
  reportButton: {
  
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#007BFF",
    position:"relative",
    right:10
  },
  reportButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Upi;
