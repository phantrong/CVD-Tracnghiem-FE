import React, { useEffect, useState, memo } from 'react';

interface TimeProps {
  startTime: number;
}

const CountDowntime = (props: TimeProps) => {
  const [time, setTime] = useState<number>(props.startTime);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hours > 0 && (hours < 10 ? '0' + hours : hours) + ':'}
      {(minutes < 10 ? '0' + minutes : minutes) + ':'}
      {seconds < 10 ? '0' + seconds : seconds}
    </>
  );
};

export default memo(CountDowntime);
