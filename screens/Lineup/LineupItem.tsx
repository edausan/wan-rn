import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Text,
  List,
  Divider,
} from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { LineupStateModel, updateLineup } from '../../redux/slice/lineupSlice';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '../../navigation';

const avatar_url =
  'https://scontent.fmnl8-2.fna.fbcdn.net/v/t39.30808-6/280194017_7362509033822685_908075910970226655_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7uZOrEvaygMAX_gt8ZW&_nc_ht=scontent.fmnl8-2.fna&oh=00_AT8yHI4Ps0WBFxq1pLmV6C1OUnXdTgT2JDT4rG0GvaYO9w&oe=62AE53AB';

type Props = {
  lineup: LineupStateModel;
  lineupList: LineupStateModel[];
};

const LineupItem = ({ lineup, lineupList }: Props) => {
  const dispatch = useDispatch();
  const { Lineup, date_created, worship_leader } = lineup;

  const handleLike = () => {
    console.log('LIKE');

    dispatch(
      updateLineup({
        ...lineup,
        likes: lineup.likes + 1,
      })
    );
  };

  return (
    <View
      style={{
        marginBottom: 16,
        paddingBottom:
          lineup.id === lineupList[lineupList.length - 1].id ? 35 : 0,
      }}
    >
      <Card>
        <Card.Title
          subtitleStyle={{ marginTop: -6 }}
          title={worship_leader.name}
          subtitle={`Date Created: ${date_created}`}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: avatar_url }} />
          )}
          right={() => <TabBarIcon name='more-vert' color={'#fff'} />}
          rightStyle={{ alignItems: 'flex-start', paddingRight: 10 }}
        />
        <Card.Cover
          source={{
            uri: 'https://jilworldwide.org/wp-content/uploads/2022/05/wallpaper-hd.jpg',
          }}
          style={{ height: 85 }}
          resizeMode='repeat'
        />
        <Card.Content>
          {Lineup.map((lineup) => {
            return (
              <List.Item
                key={lineup.id}
                title={lineup.value}
                description={`${lineup.label}${
                  lineup.artist
                    ? `  / ${lineup.artist}`
                    : lineup.album
                    ? `  / ${lineup.album}`
                    : ''
                }`}
              />
            );
          })}
        </Card.Content>

        <Divider />

        <Card.Actions>
          <Button onPress={handleLike}>
            <AntDesign
              name={lineup.likes > 0 ? 'heart' : 'hearto'}
              size={30}
              color='red'
            />
          </Button>
          <Text>{lineup.likes}</Text>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default LineupItem;

const styles = StyleSheet.create({});
