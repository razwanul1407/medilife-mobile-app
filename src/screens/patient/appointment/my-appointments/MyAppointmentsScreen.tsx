import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ArStyles from 'src/components/common/ArStyles';
import Header from 'src/components/common/Header';
import { InfoBox } from 'src/components/common/InfoBox';
import { AppointmentListItem } from 'src/components/patients/AppointmentListItem';
import { usePatientGetAllAppointment } from 'src/hooks/patient';
import { PatientRootStackParamList } from 'src/types/navigation/PatientNavigation';

const MyAppointmentsScreen = () => {
  const { data } = usePatientGetAllAppointment();
  const navigation = useNavigation<StackNavigationProp<PatientRootStackParamList>>();

  return (
    // <ScrollView>
    //   <Text style={styles.headLine}>MyAppointmentsScreen</Text>
    //   <Text style={styles.dataField}>{JSON.stringify(data?.data.Data, null, 2)}</Text>
    // </ScrollView>

    <View style={ArStyles.safeAreaView}>
      <Header
        HeaderTitle="List Of Appointments"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <InfoBox mode="secondary" hasStarBox={true}>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ fontSize: 12, paddingVertical: 10, color: '#fff' }}>
            All your Appointments are listed here. You can sort the appointments by type.
          </Text>
        </View>
      </InfoBox>
      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Appointment Type</Text>
      </View>
      <AppointmentListItem />
    </View>
  );
};

export default MyAppointmentsScreen;

// const styles = StyleSheet.create({
//   headLine: {
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//   dataField: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 25,
//   },
// });
