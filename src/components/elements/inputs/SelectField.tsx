import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { FieldProps } from 'formik';
import React, { useRef } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HelperText, TouchableRipple, useTheme } from 'react-native-paper';
import { SelectItem } from 'src/types/common/others';

interface SelectFieldProps extends FieldProps {
  label: string;
  mode?: 'flat' | 'outlined';
  placeholder?: string;
  data: SelectItem[];
  [x: string]: any; // for other props
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  field,
  form,
  placeholder = 'Choose...',
  data,
  ...rest
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['40%', '70%', '90%'], []);
  const [selectedValue, setSelectedValue] = React.useState<string | number>('');
  const [selectedLabel, setSelectedLabel] = React.useState<string | number>('');
  const theme = useTheme();

  // formik
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { name, value, onBlur, onChange } = field;
  const { touched: touchedFields, errors, setFieldTouched } = form;

  React.useEffect(() => {
    if (touchedFields[name]) {
      setTouched(true);
      setError(errors[name] as string | undefined);
    }
  }, [touchedFields, errors, name]);

  const handlePresentModalPress = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  };

  const handleClosingModal = () => {
    bottomSheetModalRef.current?.close();
    form.setFieldValue(name, selectedValue);
  };

  return (
    <View>
      <Text style={{ color: '#222', marginBottom: 5 }}>{label}</Text>

      <TouchableWithoutFeedback onPress={handlePresentModalPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 50,
            borderWidth: 1,
            borderColor: '#666',
            borderRadius: 25,
            paddingHorizontal: 10,
          }}>
          <Text style={{ color: '#111', padding: 5 }}>{selectedLabel || placeholder}</Text>
          <Text style={{ fontSize: 20 }}>{'>'}</Text>
        </View>
      </TouchableWithoutFeedback>
      {touched && error && <HelperText type="error">{error}</HelperText>}

      <BottomSheetModal
        backgroundComponent={({ style }) => (
          <View style={[style, { backgroundColor: '#fff', borderRadius: 25 }]} />
        )}
        style={{
          borderRadius: 25,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5,
        }}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={0}
        animateOnMount={true}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={o => o.value.toString()}
          renderItem={item => (
            <TouchableRipple
              onPress={() => {
                setSelectedValue(item.item.value);
                setSelectedLabel(item.item.label);

                console.log('Selected value:', item.item.value);
                handleClosingModal();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                backgroundColor: item.item.value === selectedValue ? '#259376' : '',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: item.item.value === selectedValue ? '#fff ' : '#222',
                }}>
                {item.item.label}
              </Text>
            </TouchableRipple>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 2, backgroundColor: '#259376', opacity: 0.3 }} />
          )}
        />
      </BottomSheetModal>
    </View>
  );
};

export default SelectField;
