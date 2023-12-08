import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card/Card';
import CardDate from '../components/CardDate/CardDate';
import PaddingWrapper from '../components/Wrapper/Wrapper';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import TimePicker from '@react-native-community/datetimepicker';
import { setStart, setEnd } from '../hooks/dateSlice';
import RootState from '../interface/RootState';

const DatePicker = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const start = useSelector((state: RootState) => state.dates.start);
  const end = useSelector((state: RootState) => state.dates.end);

  const [dateRange, setDateRange] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

  const handleSelect = (value: string) => {
    if (!start.date || (start.date && end.date)) {
      dispatch(setStart({ date: value, time: '' }));
      dispatch(setEnd({ date: '', time: '' }));
      setDateRange({});
    } else {
      dispatch(setEnd({ ...end, date: value }));
    }
  };

  const handleRange = () => {
    const range: any = {};
    let currentDate = moment(start.date);

    while (currentDate.isSameOrBefore(end.date)) {
      range[currentDate.format('YYYY-MM-DD')] = {
        selected: true,
        color: '#A2402A',
        textColor: 'white',
        startingDay: currentDate.isSame(start.date),
        endingDay: currentDate.isSame(end.date),
      };
      currentDate.add(1, 'days');
    }

    setDateRange(range);
  };

  useEffect(() => {
    if (start.date && end.date) {
      handleRange();
    }
  }, [start.date, end.date]);

  const handleTime = (value: any) => {
    if (!start.time) {
      dispatch(setStart({ ...start, time: value }));
    } else {
      dispatch(setEnd({ ...end, time: value }));
    }
  };

  const validateDate = () => {
    start.date && end.date ? setShowTimePicker(true) : Alert.alert(
      'Error',
      'Please choose dates',
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PaddingWrapper>
          <Card>
            <Calendar
              onDayPress={(day) => {
                handleSelect(day.dateString);
              }}
              minDate={
                start.date ? moment(start.date).toString() : moment().toString()
              }
              maxDate={moment().add(100, 'days').format().toString()}
              allowSelectionOutOfRange={true}
              markingType={'period'}
              markedDates={{
                ...dateRange,
                [start.date]: {
                  startingDay: true,
                  color: '#A2402A',
                  textColor: 'white',
                },
                [end.date]: {
                  endingDay: true,
                  color: '#A2402A',
                  textColor: 'white',
                },
              }}
              theme={{ arrowColor: '#A2402A', todayTextColor: '#A2402A' }}
            />
          </Card>
        </PaddingWrapper>
        <PaddingWrapper>
          <View style={styles.cardWrapper}>
            <View>
              <CardDate
                title="PICK UP"
                subtitle={start.date ? start.date : 'SELECT DATE'}
                subtitleStyle={{ color: '#A2402A', textAlign: 'center' }}
              />
              <CardDate
                onPress={() => validateDate()}
                subtitle={start.time ? `${'@ ' + start.time}` : 'SELECT TIMES'}
                subtitleStyle={{ color: '#A2402A', textAlign: 'center' }}
              />
            </View>
            <Text style={{ fontSize: 30, fontWeight: '200' }}>{'>'}</Text>
            <View>
              <CardDate
                title="RETURN"
                subtitle={end.date ? end.date : 'SELECT DATE'}
                subtitleStyle={{ color: '#A2402A', textAlign: 'center' }}
              />
              <CardDate
                onPress={() => validateDate()}
                subtitle={end.time ? `${'@ ' + end.time}` : 'SELECT TIMES'}
                subtitleStyle={{ color: '#A2402A', textAlign: 'center' }}
              />
            </View>
          </View>
        </PaddingWrapper>
        {showTimePicker && (
          <PaddingWrapper style={{ width: '100%' }}>
            <Card>
              <TimePicker
                display={'spinner'}
                mode="time"
                value={moment(selectedTime).toDate()}
                minuteInterval={30}
                onChange={(even) => setSelectedTime(even.nativeEvent.timestamp)}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowTimePicker(!showTimePicker);
                  handleTime(moment(selectedTime).format('HH:mm'));
                }}
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  backgroundColor: '#A2402A',
                }}>
                <Text style={{ color: 'white' }}>Done</Text>
              </TouchableOpacity>
            </Card>
          </PaddingWrapper>
        )}
      </ScrollView>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          if (start.date && start.time && end.date && end.time) {
            navigation.navigate('Home');
          } else {
            Alert.alert(
              'Error',
              'Please choose both start and end dates and times',
            );
          }
        }}>
        <Text style={styles.buttonText}>Set Dates & Times</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  head: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#A2402A',
    paddingVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '400',
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A2402A',
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DatePicker;
