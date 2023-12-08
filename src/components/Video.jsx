import React from 'react';
import DateTimeWithWrapper from './myWrapper';

export default function Video(props) {
      return (
        <div className="video">
          <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <DateTimeWithWrapper date={props.date} />
        </div>
      )
    }