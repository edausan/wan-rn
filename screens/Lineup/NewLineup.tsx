import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState, createContext } from 'react';
import { LineupModel } from '../../Types/Lineup';
import SongCard from './NewLineup/SongCard';
import LINEUP from '../../constants/Lineup';
import { Card, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import Lyrics from './NewLineup/Lyrics';
import Chords from './NewLineup/Chords';
import Media from './NewLineup/Media';
import { LineupCtx } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/app/store';
import { addLineup, setSaving } from '../../redux/slice/lineupSlice';

type btn = {
  btn: string;
};

type Modal = {
  id: LineupModel;
  status: boolean;
  btn: string | null;
};

const initialValue = {
  id: 0,
  label: '',
  album: null,
  artist: null,
  chords: null,
  disabled: false,
  lyrics: null,
  value: null,
  media: null,
  is_solemn: false,
  tags: [],
};

type Props = {
  navigation: any;
};

type NewLineupCtxModel = {
  navigation: any;
};

export const NewLineupCtx = createContext<NewLineupCtxModel>({
  navigation: null,
});

const NewLineup = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { isSaving } = useContext(LineupCtx);
  const { lineup, is_saving } = useSelector((state: RootState) => state.lineup);

  const [songs, setSongs] = useState<LineupModel[]>([]);

  useEffect(() => {
    // console.log({ songs });
  }, [songs]);

  useEffect(() => {
    is_saving && console.log({ is_saving });

    is_saving && handleSave();
  }, [is_saving]);

  const handleSave = () => {
    dispatch(
      addLineup({
        id: `lu-${lineup.length + 1}`,
        date_created: new Date().toISOString(),
        Lineup: songs.filter((song) => song.value),
        worship_leader: {
          id: 'wan-via-1',
          is_available: true,
          is_wl: true,
          name: 'Nikki Cueno',
        },
        likes: 0,
      })
    );

    dispatch(setSaving(false));

    navigation.navigate('Lineup');
  };

  const Songs = LINEUP.LINEUP.map((l) => {
    return <SongCard key={l.id} song={l} songs={songs} setSongs={setSongs} />;
  });

  return (
    <NewLineupCtx.Provider value={{ navigation }}>
      <Provider>
        <ScrollView style={styles.scrollView}>
          <Card style={{ marginBottom: 16 }}>
            <Card.Content>
              <TextInput
                label='Worship Leader'
                value={''}
                // onChangeText={(text) => setTitle(text)}
                disabled={isSaving}
                mode='flat'
                dense
                clearButtonMode='while-editing'
              />
            </Card.Content>
          </Card>

          {Songs}
        </ScrollView>
      </Provider>
    </NewLineupCtx.Provider>
  );
};

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
    width: '100%',
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
});

export default NewLineup;
