import { FieldProps } from 'formik';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HelperText, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomDateInputProps extends FieldProps {
  label: string;
  icon?: React.ReactNode;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
  [x: string]: any; // for other props
}

export const DateField = ({
  label,
  placeholder = 'Select date',
  mode = 'date',
  maxDate = undefined,
  minDate = undefined,
  field: { name, onBlur, onChange, value },
  form: { errors, touched: touchedFields, setFieldTouched, setFieldValue },
  ...rest
}: CustomDateInputProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (touchedFields[name]) {
      setTouched(true);
      setError(errors[name] as string | undefined);
    }
  }, [touchedFields, errors, name]);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={{ marginVertical: 5 }}>
        {label && <Text>{label}</Text>}
        <TextInput
          placeholder={placeholder}
          mode={'outlined'}
          value={value?.toLocaleDateString('en-GB') || ''}
          editable={true}
          onPressIn={() => setOpen(true)}
          onChangeText={onChange(name)}
          onBlur={() => {
            onBlur(name);
            setFieldTouched(name, true);
          }}
          theme={{ roundness: 25 }}
          placeholderTextColor={'#999'}
          right={<TextInput.Icon icon={() => <Icon name="calendar" size={21} />} />}
          {...rest}
        />
        {touched && error && <HelperText type="error">{error}</HelperText>}
      </TouchableOpacity>

      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        maximumDate={maxDate}
        minimumDate={minDate}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setFieldValue(name, date);
          Keyboard.dismiss();
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
