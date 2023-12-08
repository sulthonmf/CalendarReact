import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import PaddingWrapper from '../components/Wrapper/Wrapper';
import Card from '../components/Card/Card';
import CardDate from '../components/CardDate/CardDate';
import {useSelector} from 'react-redux';
import RootState from '../interface/RootState';

const Home = ({navigation}: any) => {
  const start = useSelector((state: RootState) => state.dates.start);
  const end = useSelector((state: RootState) => state.dates.end);

  const [buttonDisable, setButtonDisable] = useState(true);

  const validateTimes = () => {
    if (start && end) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  useEffect(() => {
    validateTimes();
  }, [start, end]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PaddingWrapper>
          <Card title="LOCATION">
            <Text style={styles.head}>PICKUP & RETURN</Text>
          </Card>
        </PaddingWrapper>
        <PaddingWrapper
          style={{
            backgroundColor: '#D6D6D6',
          }}>
          <Text style={{paddingTop: 10}}>DATES & TIME</Text>
          <View style={styles.cardWrapper}>
            <CardDate
              onPress={() => navigation.navigate('DatePicker')}
              title="PICK UP"
              subtitle={start.date ? start.date : 'SELECT DATES & TIMES'}
              subtitle2={start.time ? start.time : ''}
              subtitleStyle={{color: '#A2402A', textAlign: 'center'}}
            />
            <Text style={{fontSize: 30, fontWeight: '200'}}>{'>'}</Text>
            <CardDate
              onPress={() => navigation.navigate('DatePicker')}
              title="RETURN"
              subtitle={end.date ? end.date : 'SELECT DATES & TIMES'}
              subtitle2={end.time ? end.time : ''}
              subtitleStyle={{color: '#A2402A', textAlign: 'center'}}
            />
          </View>
        </PaddingWrapper>
      </ScrollView>
      <TouchableHighlight
        disabled={buttonDisable}
        style={[
          styles.button,
          {backgroundColor: buttonDisable ? '#A2402A' : '#C09180'},
        ]}>
        <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: '#D6D6D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '400',
  },
});

export default Home;
