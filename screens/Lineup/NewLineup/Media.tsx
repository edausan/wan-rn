import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Searchbar, TextInput } from 'react-native-paper';
import Youtube from '../../../Youtube';
import { TabBarIcon } from '../../../navigation';
import { WebView } from 'react-native-webview';

type Props = {};

const Media = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    console.log({ selectedVideo });
  }, [selectedVideo]);

  const handleSearch = async () => {
    try {
      console.log({ searchQuery });
      const res = await Youtube.get('/search', {
        params: {
          q: searchQuery,
        },
      });

      console.log({ res: res.data.items });

      setResults(res.data.items);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      {/* <View> */}
      <Card.Content>
        {/* <Image
          source={require('../../../assets/images/youtube.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            height: 30,
            marginBottom: 10,
          }}
        /> */}
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          onIconPress={handleSearch}
          value={searchQuery}
        />
      </Card.Content>

      <Card.Content>
        <WebView
          allowsFullscreenVideo
          source={{ uri: `https://www.youtube.com/embed/${selectedVideo}` }}
        />
      </Card.Content>

      <Card.Content style={{ paddingBottom: 130 }}>
        <ScrollView style={styles.scrollView}>
          {[...results, ...results, ...results, ...results, ...results].map(
            (res: any) => {
              return (
                <TouchableHighlight
                  onPress={() => setSelectedVideo(res.id.videoId)}
                >
                  <Card style={{ marginBottom: 16 }} mode='outlined'>
                    <Card.Title
                      titleStyle={{ fontSize: 14 }}
                      titleNumberOfLines={2}
                      title={res.snippet.title}
                    />

                    <Card.Cover
                      key={res.id.videoId}
                      source={{
                        uri: res.snippet.thumbnails.high.url,
                        height: res.snippet.thumbnails.high.height,
                      }}
                    ></Card.Cover>

                    <Card.Actions>
                      <Button>
                        <TabBarIcon name='speaker-notes' color='orange' />
                      </Button>
                    </Card.Actions>
                  </Card>
                </TouchableHighlight>
              );
            }
          )}
        </ScrollView>
      </Card.Content>
      {/* </View> */}
    </Card>
  );
};

export default Media;

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
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
});
