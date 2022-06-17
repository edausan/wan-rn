import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import LineupItem from './Lineup/LineupItem';
import { LineupCtx } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/app/store';

type Props = {
  navigation: any;
  animatedValue: any;
  visible: any;
  extended: any;
  label: any;
  animateFrom: any;
  style: any;
  iconMode: any;
};

export default function Lineup({ navigation, animateFrom, style }: Props) {
  const { lineup, is_saving } = useSelector((state: RootState) => state.lineup);
  const [isExtended, setIsExtended] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    console.log({ lineup, is_saving });
  }, [lineup]);

  const onScroll = ({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} onScroll={onScroll}>
          {lineup.map((l, idx) => {
            return (
              <LineupItem
                key={`${l.date_created}~${idx}`}
                lineup={l}
                lineupList={lineup}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>

      <AnimatedFAB
        icon={'plus'}
        label={'Set New Lineup'}
        extended={isExtended}
        onPress={() => navigation.navigate('NewLineup', { navigation })}
        visible={!isOpen}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 40,
    paddingBottom: 500,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
