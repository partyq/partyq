import React, { useState, useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: any) => {
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useValueUpdateEffect = (callback: any, input: any) => {
  const initialValueRef = useRef(input);
  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    if (input !== initialValueRef.current || hasUpdatedRef.current) {
      hasUpdatedRef.current = true;
      callback();
    }
  }, [input]);
};