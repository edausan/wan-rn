import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Chip,
  TextInput,
  Text,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { LineupModel } from '../../../Types/Lineup';
import { TabBarIcon } from '../../../navigation';
import { LineupCtx } from '../../../App';
import { NewLineupCtx } from '../NewLineup';

type Props = {
  song: LineupModel;
  songs: LineupModel[];
  setSongs: React.Dispatch<React.SetStateAction<LineupModel[]>>;
};

const SongCard = (props: Props) => {
  const { song, songs, setSongs } = props;
  const { data, setData, isSaving } = useContext(LineupCtx);
  const { navigation } = useContext(NewLineupCtx);
  const [title, setTitle] = useState<string | any>('');
  const [artist, setArtist] = useState<string | any>('');
  const [album, setAlbum] = useState<string | any>('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(song.tags);
  }, [song.tags]);

  useEffect(() => {
    const idx = songs.findIndex((s) => s.id === song.id);

    if (idx === -1) {
      setSongs([...songs, { ...song, value: title, artist, album }]);
    } else {
      setSongs((songs) =>
        songs.map((s) => {
          if (s.id === song.id) {
            return {
              ...s,
              album,
              artist,
              value: title,
            };
          }

          return s;
        })
      );
    }
  }, [title, artist, album]);

  return (
    <>
      <Card
        style={{
          marginBottom: 16,
          padding: 0,
        }}
        mode='outlined'
      >
        <Card.Content>
          <TextInput
            label={song.label}
            value={song.value || title}
            onChangeText={(text) => setTitle(text)}
            disabled={isSaving}
            mode='flat'
            dense
            clearButtonMode='while-editing'
          />
        </Card.Content>

        <Card.Content
          style={{ display: 'flex', flexDirection: 'row', marginTop: 6 }}
        >
          <TextInput
            label='Artist'
            value={song.artist || artist}
            onChangeText={(text) => setArtist(text)}
            mode='flat'
            dense
            style={{ flex: 1, marginRight: 6 }}
            disabled={isSaving}
            clearButtonMode='while-editing'
          />
          <TextInput
            label='Album'
            value={song.album || album}
            onChangeText={(text) => setAlbum(text)}
            mode='flat'
            dense
            style={{ flex: 1 }}
            disabled={isSaving}
            clearButtonMode='while-editing'
          />
        </Card.Content>

        <Card.Actions>
          <Button
            onPress={() => navigation.navigate('Lyrics', { song })}
            disabled={isSaving}
          >
            <TabBarIcon name='speaker-notes' color='orange' />
          </Button>
          <Button
            onPress={() => navigation.navigate('Chords', { song })}
            disabled={isSaving}
          >
            <TabBarIcon name='music-note' color='purple' />
          </Button>
          <Button
            onPress={() => navigation.navigate('Media', { song })}
            disabled={isSaving}
          >
            <TabBarIcon name='ondemand-video' color='red' />
          </Button>
        </Card.Actions>

        <Divider />

        <Card.Content
          style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {song.tags.map((tag) => (
            <Chip
              key={tag}
              style={{
                alignSelf: 'flex-start',
                height: 36,
                marginRight: 6,
                padding: 0,
              }}
              onClose={() => {}}
            >
              <Text style={{ fontSize: 12 }}>{tag}</Text>
            </Chip>
          ))}
          <Chip
            icon=''
            mode='flat'
            onPress={() => console.log('Pressed')}
            style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            <Text style={{ fontSize: 12 }}>+ New</Text>
          </Chip>
        </Card.Content>
      </Card>
    </>
  );
};

export default SongCard;
