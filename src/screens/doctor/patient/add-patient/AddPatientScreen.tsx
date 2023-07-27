import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ArStyles from 'src/components/common/ArStyles';
import Header from 'src/components/common/Header';
import { InfoBox } from 'src/components/common/InfoBox';
import SearchBox from 'src/components/common/SearchBox';
import { DoctorRootStackParamList } from 'src/types/navigation/DoctorNavigation';
import AddPatientFrom from './AddPatientFrom';
import { Container } from 'src/components/containers/home-containers';

const AddPatientScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DoctorRootStackParamList>>();
  return (
    <ScrollView>
      <View style={[ArStyles.safeAreaView, { paddingBottom: 100 }]}>
        <Header HeaderTitle="Add New Patient" onPress={() => navigation.navigate('HomeScreen')} />
        <InfoBox mode="secondary" hasStarBox={true}>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', paddingVertical: 3, color: '#2F5C3D' }}>
              Process
            </Text>
            <Text style={{ fontSize: 12, paddingVertical: 5, color: '#fff' }}>
              To Add New Patient, you have to create a patient entry with the phone number /id. If
              the patient has a profile already, all other information will be populated
              automatically.
            </Text>
          </View>
        </InfoBox>

        <SearchBox Placeholder="01749237060" />

        <View style={[ArStyles.columnCenter, {}]}>
          <Text>No Patient id found with the phone number</Text>
          <Text> ‘01711029090’</Text>
        </View>

        <AddPatientFrom />
      </View>
    </ScrollView>
  );
};

export default AddPatientScreen;
