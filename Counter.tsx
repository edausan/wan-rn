import React from 'react';
import { RootState } from './redux/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slice/counterSlice';
import { View } from './components/Themed';
import { Button, Text } from 'react-native-paper';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  console.log({ count });

  return (
    <View>
      <View>
        <Button
          aria-label='Increment value'
          onPress={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Text>{count}</Text>
        <Button
          aria-label='Decrement value'
          onPress={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </View>
    </View>
  );
}
