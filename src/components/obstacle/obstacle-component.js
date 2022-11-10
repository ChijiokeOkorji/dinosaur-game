import React, { useCallback, useLayoutEffect, useRef } from 'react';

import styles from './obstacle-style.module.scss';

const Obstacle = ({ cactusShow, onAnimationIteration, setBounds, isRunning, isContact }) => {
  const obstacleRef = useRef(null);

  const contactPoints = useRef([
    [
      useRef(null),
      useRef(null),
      useRef(null)
    ],
    [
      useRef(null),
      useRef(null),
      useRef(null)
    ],
    [
      useRef(null),
      useRef(null),
      useRef(null)
    ]
  ]);

  const timerRefreshFrame = useRef(null);

  const getObjectBound = useCallback(() => {
    let objectBounds = cactusShow.reduce((total, item, index) => {
      if (item) {
        let cactusBounds = contactPoints.current[index].map(item => {
          let bound = item.current.getBoundingClientRect();

          return {
            left: bound.left,
            top: bound.top
          };
        });

        return [
          ...total,
          ...cactusBounds
        ];
      }

      return total;
    }, []);

    setBounds(objectBounds);

    timerRefreshFrame.current = requestAnimationFrame(getObjectBound);
  }, [cactusShow, setBounds]);

  useLayoutEffect(() => {
    if (isRunning && !isContact) {
      timerRefreshFrame.current = requestAnimationFrame(getObjectBound);
    } else {
      cancelAnimationFrame(timerRefreshFrame.current);
    }
    
    return () => cancelAnimationFrame(timerRefreshFrame.current);
  }, [isRunning, isContact, getObjectBound]);

  useLayoutEffect(() => {
    if (!isRunning || isContact) {
      obstacleRef.current.style.animationPlayState = 'paused';
    } else {
      obstacleRef.current.style.animationPlayState = 'running';
    }
  }, [isRunning, isContact]);

  return (
    <div
      className={`${isRunning ? `${styles.obstacleMotion} ` : ''}${styles.obstacle}`}
      onAnimationIteration={onAnimationIteration}
      ref={obstacleRef}
    >
      <div
        className={`${!cactusShow[0] ? `${styles.hide} ` : ''}${styles.shortCactus} grid`}
      >
        <div className={styles.os1}></div>
        <div className={styles.os2} ref={contactPoints.current[0][0]}></div>
        <div className={styles.os3}></div>
        <div className={styles.os4} ref={contactPoints.current[0][1]}></div>
        <div className={styles.os5}></div>
        <div className={styles.os6}></div>
        <div className={styles.os7} ref={contactPoints.current[0][2]}></div>
        <div className={styles.os8}></div> 
      </div>

      <div
        className={`${!cactusShow[1] ? `${styles.hide} ` : ''}${styles.tallCactus} grid`}
      >
        <div className={styles.ot1}></div>
        <div className={styles.ot2} ref={contactPoints.current[1][0]}></div>
        <div className={styles.ot3}></div>
        <div className={styles.ot4} ref={contactPoints.current[1][1]}></div>
        <div className={styles.ot5}></div>
        <div className={styles.ot6}></div>
        <div className={styles.ot7} ref={contactPoints.current[1][2]}></div>
        <div className={styles.ot8}></div> 
      </div>

      <div
        className={`${!cactusShow[2] ? `${styles.hide} ` : ''}${styles.shortCactus} grid`}
      >
        <div className={styles.os1}></div>
        <div className={styles.os2} ref={contactPoints.current[2][0]}></div>
        <div className={styles.os3}></div>
        <div className={styles.os4} ref={contactPoints.current[2][1]}></div>
        <div className={styles.os5}></div>
        <div className={styles.os6}></div>
        <div className={styles.os7} ref={contactPoints.current[2][2]}></div>
        <div className={styles.os8}></div> 
      </div>
    </div>
  );
};

export { Obstacle };
