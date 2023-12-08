import React from 'react';
import Video from './Video';

export default function VideoList(props) {
  return props.list.map(item => <Video key={item.date} url={item.url} date={item.date} />);
}