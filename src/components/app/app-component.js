import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { Dinosaur } from '../dinosaur';
import { Obstacle } from '../obstacle';

import styles from './app-style.module.scss';

const App = () => {
  const [dinoBounds, setDinoBounds] = useState([]);
  const [obstacleBounds, setObstacleBounds] = useState([]);
  const [playerJump, setPlayerJump] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isContact, setIsContact] = useState(true);
  const [score, setScore] = useState(0);

  const generateLevel = useCallback(() => {
    return [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())];
  }, []);

  const [level, setLevel] = useState(() => generateLevel());

  const vibrate = useCallback(() => {
    try {
      navigator.vibrate(100);
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handleAnimationIteration = useCallback(() => {
    setLevel(generateLevel());
  }, [generateLevel]);

  const handleDinoBoundChange = useCallback((dataFromChild) => {
    setDinoBounds(dataFromChild);
  }, []);

  const handleObstacleBoundChange = useCallback((dataFromChild) => {
    setObstacleBounds(dataFromChild);
  }, []);

  useLayoutEffect(() => {
    let dP1 = dinoBounds[0];
    let dP2 = dinoBounds[1];
    let dP3 = dinoBounds[2];

    for (let value of obstacleBounds) {
      if (((value.left >= dP1.left) && (value.left <= dP1.right) && (value.top <= dP1.bottom)) ||
        ((value.left >= dP2.left) && (value.left <= dP2.right) && (value.top <= dP2.bottom)) ||
        ((value.left >= dP3.left) && (value.left <= dP3.right) && (value.top <= dP3.bottom))
      ) {
        setIsContact(true);
        setObstacleBounds([]);
        vibrate();
      }
    }

    setScore(prev => prev + 0.1);
  }, [isRunning, dinoBounds, obstacleBounds, vibrate]);

  const handleClick = useCallback(() => {
    if (isContact) {
      setScore(0);
      setIsRunning(false);
      setIsContact(false);
    }

    setPlayerJump(true);
  }, [isContact]);

  const handleKeyPress = useCallback(({ key }) => {
    if ((key === ' ') || (key === 'ArrowUp')) {
      handleClick();
    }
  }, [handleClick]);

  const handleJumpEnd = useCallback(() => {
    setPlayerJump(false);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);

    return function() {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleClick, handleKeyPress]);

  return (
    <div
      className={styles.child}
    >
      <Dinosaur
        setBounds={handleDinoBoundChange}
        onAnimationEnd={handleJumpEnd}
        playerJump={playerJump}
        isRunning={isRunning}
        isContact={isContact}
      />
      <Obstacle
        cactusShow={level}
        onAnimationIteration={handleAnimationIteration}
        setBounds={handleObstacleBoundChange}
        isRunning={isRunning}
        isContact={isContact}
      />
      {isContact &&
        <div className={styles.message}>Click to play</div>
      }
      <div className={styles.score}>Score: {parseInt(score)}</div>
    </div>
  );
};

export { App };
