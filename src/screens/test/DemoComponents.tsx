import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container } from 'src/components/containers/home-containers';
import { DateField, TextAreaField, TextField } from 'src/components/elements/inputs';
import { AppointmentListItem } from 'src/components/patients/AppointmentListItem';

import ArStyles from 'src/components/common/ArStyles';
import { InfoBox } from 'src/components/common/InfoBox';
import SearchBox from 'src/components/common/SearchBox';
import AddNewPatient from 'src/components/doctors/AddNewPatient';
import SelectField from 'src/components/elements/inputs/SelectField';
import { ToggleField } from 'src/components/elements/inputs/ToggleField';
import CreateAppointmentCard from 'src/components/patients/CreateAppointmentCard';
import DoctorsCard from 'src/components/patients/DoctorsCard';
import MyReport from 'src/components/patients/MyReport';
import { NotificationListItem } from 'src/components/patients/NotificationListItem';
import { PatientServiceCard } from 'src/components/patients/PatientServiceCard';
import PrescriptionList from 'src/components/patients/PrescriptionList';
import { utcNow } from 'src/utils/helper';
import * as yup from 'yup';
import AddNewFamilyMemberForm from '../patient/family-member/add-family-member/AddNewFamilyMemberForm';

const DemoComponents = () => {
  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };

  const validatioinSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    address: yup.string().required(),
    dob: yup.date().required(),
    city: yup.string().required(),
  });
  return (
    <Container>
      <SearchBox />
      <Text>Test Filed</Text>
      <Formik
        initialValues={{ email: '', password: '', city: '' }}
        onSubmit={handleSubmit}
        validationSchema={validatioinSchema}>
        {({ handleSubmit }) => (
          <View style={{ flex: 1 }}>
            <Field
              component={TextField}
              icon={<Icon style={{ color: '#999' }} name="email" size={21} />}
              name="email"
              label="Email"
              placeholder="name@domain.com"
            />
            <Field component={TextField} name="password" label="Password" />
            <Field component={TextAreaField} name="address" label="text area" />
            <Field
              component={DateField}
              name="dob"
              label="Birth Date"
              placeholder="DOB"
              maxDate={utcNow}
            />
            <Field component={ToggleField} name="premium" label="Premium Service" />
            <Field
              component={SelectField}
              name="city"
              label="City"
              placeholder="Select ..."
              data={[
                { label: 'Dhaka', value: 1 },
                { label: 'Sylhet', value: 3 },
              ]}
            />

            <Button onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
      <Feather name="activity" size={23} />
      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <DoctorsCard
        name="Dr. Syed Uddin Helal"
        designation="Consultant, Neurosurgery"
        department="Neurosurgery"
        onlineAppointmentAllow={false}
        userAvatar={
          <Avatar.Image size={60} source={require('../../assets/images/patient/service1.png')} />
        }
      />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <MyReport />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <AppointmentListItem />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <NotificationListItem />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Find Patient History</Text>
      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Todays Patients Appointment</Text>

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Add New Patient</Text>
      <AddNewPatient />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>My Chamber Details collapsible</Text>

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Patient Service Card</Text>
      <View style={[ArStyles.rowSpaceBetween, { width: '100%' }]}>
        <View style={{ width: '48%' }}>
          <PatientServiceCard />
        </View>
        <View style={{ width: '48%' }}>
          <PatientServiceCard />
        </View>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>My Prescription List</Text>
      <PrescriptionList />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>My Reports</Text>
      <MyReport />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Appointment List</Text>
      <AppointmentListItem />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Notification List</Text>
      <NotificationListItem />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>InfoBox</Text>
      <InfoBox hasStarBox={true} mode="secondary">
        <View style={{ paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', paddingVertical: 3, color: '#2F5C3D' }}>
            Process
          </Text>
          <Text style={{ fontSize: 12, paddingVertical: 5, color: '#fff' }}>
            Select Available Doctors {'>'} Filter Doctor {'>'} Create Appointment
          </Text>
        </View>
      </InfoBox>

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Add New Family Member Form</Text>
      <AddNewFamilyMemberForm />

      <View style={{ paddingVertical: 10 }}>
        <Divider style={{ height: 2 }} />
      </View>
      <Text>Create Appointment Card</Text>
      <CreateAppointmentCard />
    </Container>
  );
};

export default DemoComponents;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
// });
