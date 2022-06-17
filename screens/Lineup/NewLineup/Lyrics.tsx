import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Menu,
  Provider,
  TextInput,
} from 'react-native-paper';
import { TabBarIcon } from '../../../navigation';

type Props = {
  [x: string]: any;
};

const Lyrics = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  console.log({ props });

  return (
    <>
      <Card elevation={0}>
        <Card.Content style={{ zIndex: 1002 }}>
          <Provider>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={{ x: 320, y: 0 }}
              style={{ zIndex: 1003 }}
            >
              <Menu.Item onPress={closeMenu} title='+ Add 2nd Verse' />
              <Menu.Item onPress={closeMenu} title='+ Add 3rd Verse' />
              <Divider />
              <Menu.Item onPress={closeMenu} title='+ Add 2nd Chorus' />
            </Menu>
          </Provider>
        </Card.Content>

        <Card.Content style={{ zIndex: 1001 }}>
          <TextInput multiline mode='flat' label='Verse'></TextInput>
          <TextInput multiline mode='flat' label='Pre-chorus'></TextInput>
          <TextInput multiline mode='flat' label='Chorus'></TextInput>
          <TextInput multiline mode='flat' label='Bridge'></TextInput>
        </Card.Content>

        <Card.Actions style={{ zIndex: 1002 }}>
          <Button>
            <TabBarIcon name='save' color={''} />
          </Button>
          <Button>
            <TabBarIcon name='clear-all' color='orange' />
          </Button>

          <Button onPress={() => setVisible(!visible)}>
            <TabBarIcon name='add' color='orange' />
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

export default Lyrics;

const styles = StyleSheet.create({});
