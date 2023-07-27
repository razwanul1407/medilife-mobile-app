import { FieldProps } from 'formik';
import React, { useEffect } from 'react';
import { HelperText, Switch, Text, TouchableRipple } from 'react-native-paper';

interface ToggleFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  errorText?: string;
  disabled?: boolean;
  style?: any;
  [x: string]: any; // for other props
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  label,
  placeholder,
  field: { name, value },
  form: { errors, touched, setFieldValue },
  errorText,
  disabled,
  style,
  ...props
}) => {
  const toggleValue = (value: boolean) => {
    setFieldValue(name, value);
  };

  useEffect(() => {
    // update component when error and touched changes
  }, [name, errors[name], touched[name]]);

  return (
    <TouchableRipple
      onPress={() => {
        setFieldValue(name, !value);
      }}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
      }}>
      <>
        <Text>
          {label} ({value ? 'Yes' : 'No'})
        </Text>
        <Switch
          value={value}
          disabled={disabled}
          onValueChange={toggleValue}
          style={style}
          {...props}
        />
        {errors[name] ? <HelperText type="error">{errors[name] as string}</HelperText> : null}
      </>
    </TouchableRipple>
  );
};
