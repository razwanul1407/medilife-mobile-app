import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import ArStyles from 'src/components/common/ArStyles';
import { ShadowBox } from 'src/components/common/ShadowBox';
import { TextField } from 'src/components/elements/inputs/TextField';
import { useDoctorAppointmentCreate } from 'src/hooks/doctor/appointment';
import { useDoctorGetAllChamber } from 'src/hooks/doctor/chamber';
import { AppointmentCreate } from 'src/types/doctor';
import { DoctorRootStackParamList } from 'src/types/navigation/DoctorNavigation';
import * as yup from 'yup';

// interface Props {
//   patientName: '';
//   address: '';
//   mobileNo: '';
//   ageYear: '';
//   genderName: '';
//   consultancyFees?: '';
//   chamberId: '';
//   shiftId: '';
//   appointmentDate: '';
// }
const validationSchema = yup.object().shape({
  patientName: yup
    .string()
    .typeError('Please insert valid Patient Name')
    .min(3)
    .required('Patient Name is required'),
  address: yup
    .string()
    .typeError('Please insert valid Address')
    .min(3)
    .required('Address is required'),
  mobileNo: yup
    .string()
    .typeError('Please insert valid Mobile Number')
    .required('Mobile Number is required'),
  ageYear: yup.string().typeError('Please insert valid Age').required('Age is required'),
  //   consultancyFees: yup
  //     .string()
  //     .typeError('Please insert valid Consultancy Fee')
  //     .required('Consultancy Fee is required'),
  chamberId: yup.string().typeError('Please insert valid Chamber').required('Chamber is required'),
  shiftId: yup.string().typeError('Please insert valid Shift').required('Shift is required'),
  appointmentDate: yup
    .string()
    .typeError('Please insert valid Appointment Date')
    .required('Appointment Date is required'),
});

const AddPatientFrom = () => {
  const initialValues: AppointmentCreate = {
    patientName: '',
    address: '',
    mobileNo: '',
    ageYear: '',
    genderName: '',
    consultancyFees: 0,
    chamberId: 0,
    shiftId: 0,
    appointmentDate: '',
  };
  const AddPatient = useDoctorAppointmentCreate();
  const chamberList = useDoctorGetAllChamber();

  //   const handleFormSubmit = (values: Props) => {
  //     console.log(values);
  //   };
  const navigation = useNavigation<StackNavigationProp<DoctorRootStackParamList>>();
  return (
    <ShadowBox>
      <View style={ArStyles.columnCenter}>
        <Text style={{ color: '#667080', fontSize: 17, marginTop: 5 }}>
          Create A New Patient Entry & Appointment
        </Text>
      </View>
      <View style={{ paddingVertical: 10, marginTop: 5 }}>
        <Divider style={{ height: 4, backgroundColor: '#259376' }} />
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          try {
            //handleFormSubmit(values);
            AddPatient.mutate(values);
            navigation.navigate('HomeScreen');
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}>
        {({ handleSubmit, isSubmitting }) => (
          <>
            <View style={{ flexDirection: 'column', width: '100%', padding: 5 }}>
              <Field
                component={TextField}
                name="patientName"
                label="Patient Name"
                placeholder="enter name"
              />
              <Field
                component={TextField}
                name="ageYear"
                label="Age"
                placeholder="Patient Age"
                keyboardType="numeric"
              />
              <Field
                component={TextField}
                name="genderName"
                label="Gender"
                //dataArray={genderList}
                placeholder={'Gender'}
                // title={(item: { Name: any }) => item?.Name}
                // value={(item: { Name: any }) => item?.Name}
              />
              <Field
                component={TextField}
                name="mobileNo"
                label="Contact Number"
                placeholder="01xxxxxxxxx"
                keyboardType="phone-pad"
              />
              <Field
                component={TextField}
                name="consultancyFees"
                label="Consultancy Fee"
                placeholder="00.00"
                keyboardType="numeric"
              />
              <Field
                component={TextField}
                name="address"
                label="Address"
                placeholder="Gulshan, Dhaka"
              />
              <Field
                component={TextField}
                name="appointmentDate"
                label="Appointment Date"
                placeholder="Choose Date"
              />
              <Field
                component={TextField}
                name="chamberId"
                label="Appointment Chamber"
                // dataArray={chamberList.data?.data.Data}
                placeholder={'Select Chamber'}
                // title={(item: { ChamberName: any }) => item?.ChamberName}
                // value={(item: { Id: any }) => item?.Id}
              />
              <Field
                component={TextField}
                name="shiftId"
                label="Appointment Shift"
                // dataArray={shiftId}
                placeholder={'Choose Shift'}
                // title={(item: { Name: any }) => item?.Name}
                // value={(item: { Id: any }) => item?.Id}
              />
              <View style={{ marginVertical: 3, alignSelf: 'center' }}>
                <Button
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  mode="contained"
                  buttonColor="#259376">
                  Continue
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ShadowBox>
  );
};

export default AddPatientFrom;
